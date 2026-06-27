/* Import a WordPress WXR export into content/generated/blog/<slug>.json.
   Zero-dependency parser tolerant of the standard WXR shape.
   Run: node scripts/import-wxr.mjs <path-to-export.xml>

   Only published posts (wp:post_type=post, wp:status=publish) are imported.
   Featured images are resolved via _thumbnail_id -> attachment wp:attachment_url.
   Each post keeps its original permalink path so existing URLs/rankings hold. */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "content", "generated", "blog");

/* Slugs already owned by curated/static pages: never overwrite these. */
const RESERVED = new Set([
  "sevier-county-short-term-rental-regulations-2026-guide",
  "property-management", "contact-us", "blog",
  "smoky-mountain-str-investment-listings",
  "vacation-rental-management-gatlinburg",
  "vacation-rental-management-pigeon-forge",
  "vacation-rental-management-sevierville",
  "vacation-rental-management-wears-valley",
]);

const src = process.argv[2];
if (!src || !existsSync(src)) {
  console.error("Usage: node scripts/import-wxr.mjs <export.xml>");
  process.exit(1);
}
const xml = readFileSync(src, "utf8");

const stripCdata = (s) =>
  s == null ? "" : s.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "");

function tag(block, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`);
  const m = block.match(re);
  return m ? stripCdata(m[1]) : "";
}
function tagRaw(block, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`);
  const m = block.match(re);
  return m ? m[1] : "";
}

/* Decode the handful of XML entities that appear outside CDATA (titles, etc.). */
const decode = (s) =>
  String(s)
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#8217;/g, "’")
    .replace(/&amp;/g, "&");

const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

/* Pass 1: attachment id -> URL map (for featured images). */
const attachments = {};
for (const it of items) {
  if (tag(it, "wp:post_type") !== "attachment") continue;
  const id = tag(it, "wp:post_id");
  const url = tag(it, "wp:attachment_url") || tag(it, "guid");
  if (id && url) attachments[id] = url.trim();
}

/* Re-create the paragraph wrapping WordPress applies via wpautop() at render
   time: the export stores block tags (h2/ul/li/strong/a) but NOT <p> tags, and
   some posts use bare ALL-CAPS lines as section headings. */
const BLOCK_START = /^<(h[1-6]|ul|ol|li|table|thead|tbody|tr|td|blockquote|pre|figure|figcaption|div|hr|img|p|section|article|aside|iframe)\b/i;
function autop(html) {
  const blocks = html.replace(/\r\n?/g, "\n").trim().split(/\n{2,}/);
  const out = [];
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    if (BLOCK_START.test(b)) { out.push(b); continue; }
    const bare = b.replace(/<[^>]+>/g, "");
    if (!b.includes("\n") && bare.length >= 2 && bare.length <= 80 && /[A-Z]/.test(bare) && !/[a-z]/.test(bare)) {
      out.push(`<h2>${b}</h2>`);          // bare ALL-CAPS line -> section heading
      continue;
    }
    out.push(`<p>${b.replace(/\n/g, "<br>")}</p>`);
  }
  return out.join("\n");
}

/* Sanitize imported HTML to clean, semantic markup. Posts were authored in
   mixed editors (Gutenberg, classic, ClickUp/Quill paste), so they carry div/
   span wrappers and class/style/data attributes we strip out. Keeps href on
   links and src/alt/dimensions on images; everything else loses its attrs. */
const ALLOWED_ATTRS = { a: ["href"], img: ["src", "alt", "width", "height"] };
function cleanContent(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, "")                                  // all comments (incl. Gutenberg)
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, "")          // scripts/styles
    .replace(/\[\/?[a-z][^\]]*\]/gi, "")                              // shortcodes
    .replace(/<\/?(?:div|section|article|figure|figcaption|main|header|footer|table|thead|tbody|tr|td)\b[^>]*>/gi, "\n\n") // block wrappers -> breaks
    .replace(/<\/?(?:span|font|small)\b[^>]*>/gi, "");                // inline wrappers -> unwrap

  // Strip attributes from opening tags except the allowlist.
  s = s.replace(/<([a-zA-Z0-9]+)\b([^>]*)>/g, (_m, tag, attrs) => {
    tag = tag.toLowerCase();
    const keep = ALLOWED_ATTRS[tag];
    if (!keep) return `<${tag}>`;
    let out = "";
    for (const a of keep) {
      const r = new RegExp(`\\b${a}\\s*=\\s*"([^"]*)"`, "i").exec(attrs);
      if (r) out += ` ${a}="${r[1]}"`;
    }
    return `<${tag}${out}>`;
  });

  s = s.replace(/&nbsp;/g, " ");
  s = autop(s);
  s = s.replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, "");                   // drop empty paragraphs
  return s.trim();
}

function textExcerpt(html, n = 160) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= n) return text;
  return text.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

function routeFrom(link, slug) {
  try {
    const u = new URL(link);
    let p = u.pathname;
    if (!p || p === "/" || u.search) return `/${slug}/`;
    if (!p.endsWith("/")) p += "/";
    return p;
  } catch {
    return `/${slug}/`;
  }
}

/* Pass 2: published posts. */
mkdirSync(OUT, { recursive: true });
for (const f of existsSync(OUT) ? readdirSync(OUT) : []) {
  if (f.endsWith(".json")) rmSync(join(OUT, f));
}

const posts = [];
const skipped = [];
for (const it of items) {
  if (tag(it, "wp:post_type") !== "post") continue;
  const status = tag(it, "wp:status");
  const slug = tag(it, "wp:post_name");
  const title = decode(tag(it, "title")).trim();
  if (status !== "publish") { skipped.push(`${slug || title} (status: ${status})`); continue; }
  if (RESERVED.has(slug)) { skipped.push(`${slug} (reserved/curated route)`); continue; }

  const contentRaw = stripCdata(tagRaw(it, "content:encoded"));
  const content = cleanContent(contentRaw);
  const excerptRaw = cleanContent(stripCdata(tagRaw(it, "excerpt:encoded")));
  const excerpt = (excerptRaw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) || textExcerpt(content);

  const date = tag(it, "wp:post_date_gmt") || tag(it, "wp:post_date");
  const iso = date && date !== "0000-00-00 00:00:00" ? date.replace(" ", "T") + "Z" : null;
  const modified = tag(it, "wp:post_modified_gmt") || tag(it, "wp:post_modified");
  const isoMod = modified && modified !== "0000-00-00 00:00:00" ? modified.replace(" ", "T") + "Z" : iso;

  const thumbId = (it.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]><\/wp:meta_value>/) || [])[1];
  const featuredImage = thumbId && attachments[thumbId] ? attachments[thumbId] : null;

  const categories = [...it.matchAll(/<category domain="category"[^>]*>([\s\S]*?)<\/category>/g)]
    .map((m) => decode(stripCdata(m[1])).trim())
    .filter((c) => c && c.toLowerCase() !== "uncategorized");

  posts.push({
    id: tag(it, "wp:post_id"),
    slug,
    title,
    route: routeFrom(tag(it, "link"), slug),
    date: iso,
    modified: isoMod,
    author: tag(it, "dc:creator"),
    categories,
    featuredImage,
    excerpt,
    content,
    wordCount: content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
  });
}

/* Newest first. */
posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

for (const p of posts) writeFileSync(join(OUT, `${p.slug}.json`), JSON.stringify(p, null, 2));
writeFileSync(join(OUT, "_index.json"), JSON.stringify(posts.map((p) => p.slug), null, 2));

console.log(`Imported ${posts.length} published posts -> content/generated/blog/`);
for (const p of posts) console.log(`  ${p.route.padEnd(60)} ${String(p.wordCount).padStart(5)}w  img:${p.featuredImage ? "y" : "n"}  [${p.categories.join(", ")}]`);
if (skipped.length) { console.log(`\nSkipped ${skipped.length}:`); skipped.forEach((s) => console.log("  - " + s)); }
