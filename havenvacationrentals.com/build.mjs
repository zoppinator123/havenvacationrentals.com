/* Haven Vacation Rentals — static site generator (zero dependencies).
   Run: node build.mjs   →   outputs to dist/
   Preview: node serve.mjs */
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { SITE } from "./content/site.mjs";
import { MARKETS } from "./content/markets.mjs";
import { geoFallback, homeFallback, hubFallback } from "./content/fallback.mjs";
import { renderGeoPage } from "./lib/render/geo.mjs";
import { renderHub } from "./lib/render/hub.mjs";
import { renderHome } from "./lib/render/home.mjs";
import { renderContact } from "./lib/render/contact.mjs";
import { renderAbout } from "./lib/render/about.mjs";
import { renderAreaPage } from "./lib/render/area.mjs";
import { renderSegmentPage } from "./lib/render/segment.mjs";
import { renderComparisonPage } from "./lib/render/comparison.mjs";
import { renderServiceAreas } from "./lib/render/service-areas.mjs";
import { AREAS } from "./content/areas.mjs";
import { SEGMENTS } from "./content/segments.mjs";
import { COMPARISONS } from "./content/comparisons.mjs";
import { renderBookCall } from "./lib/render/book-call.mjs";
import { renderBlog } from "./lib/render/blog.mjs";
import { renderPost } from "./lib/render/post.mjs";
import { renderRegGuide } from "./lib/render/regguide.mjs";
import { renderListings } from "./lib/render/listings.mjs";
import { renderNotFound } from "./lib/render/notfound.mjs";
import { renderLlmsTxt } from "./content/llms.mjs";
import { wordCount, findEmDashes } from "./lib/util.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist");
const GEN = join(__dirname, "content", "generated");
const GEN_BLOG = join(GEN, "blog");

/* ---- load imported blog posts (newest-first per _index.json) ---- */
function loadPosts() {
  const idxFile = join(GEN_BLOG, "_index.json");
  if (!existsSync(idxFile)) return [];
  try {
    const order = JSON.parse(readFileSync(idxFile, "utf8"));
    return order
      .map((slug) => {
        const f = join(GEN_BLOG, `${slug}.json`);
        return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : null;
      })
      .filter(Boolean);
  } catch (e) {
    console.warn(`! blog index failed to load (${e.message})`);
    return [];
  }
}

/* ---- load generated copy, fall back if missing ---- */
function loadCopy(slug, fallback) {
  const file = join(GEN, `${slug}.json`);
  if (existsSync(file)) {
    try {
      const parsed = JSON.parse(readFileSync(file, "utf8"));
      return { copy: { ...fallback, ...parsed }, generated: true };
    } catch (e) {
      console.warn(`! ${slug}.json failed to parse (${e.message}); using fallback`);
    }
  }
  return { copy: fallback, generated: false };
}

/* ---- write a page to dist with clean directory URLs ---- */
function writePage(path, html) {
  const rel = path === "/"
    ? "index.html"
    : path.endsWith(".html")
      ? path.replace(/^\//, "")
      : join(path.replace(/^\/|\/$/g, ""), "index.html");
  const out = join(DIST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  return rel;
}

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry), d = join(dest, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

/* ---- QA: lightweight per-page audit ---- */
function audit(label, html, copy, { keyword } = {}) {
  const issues = [];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) issues.push(`H1 count = ${h1s} (expect 1)`);

  const titleM = html.match(/<title>([^<]*)<\/title>/);
  const title = titleM ? titleM[1] : "";
  if (title.length < 40 || title.length > 65) issues.push(`title ${title.length} chars (target 50-60)`);

  const descM = html.match(/<meta name="description" content="([^"]*)"/);
  const desc = descM ? descM[1] : "";
  if (desc.length < 140 || desc.length > 165) issues.push(`meta desc ${desc.length} chars (target 150-160)`);

  if (!/rel="canonical"/.test(html)) issues.push("missing canonical");
  if (!/application\/ld\+json/.test(html)) issues.push("missing JSON-LD");

  const em = findEmDashes(copy);
  if (em.length) issues.push(`${em.length} em/en dash(es) in copy: ${em[0].path}`);

  const words = wordCount(copy);

  if (keyword) {
    const hay = (copy.h1 + " " + (copy.introParagraphs || []).join(" ") + " " + JSON.stringify(copy)).toLowerCase();
    if (!hay.includes(keyword.toLowerCase())) issues.push(`primary keyword "${keyword}" not found in copy`);
  }

  return { label, words, titleLen: title.length, descLen: desc.length, h1s, issues };
}

/* ---- build ---- */
console.log("Building Haven site...\n");
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });

const reports = [];
const sitemapUrls = [];
const today = new Date().toISOString().slice(0, 10);

/* market copies first (needed for hub/home cross-link blurbs) */
const marketCopies = {};
for (const m of MARKETS) marketCopies[m.slug] = loadCopy(m.slug, geoFallback(m)).copy;

/* geo pages */
for (const m of MARKETS) {
  const { copy } = loadCopy(m.slug, geoFallback(m));
  const { path, html } = renderGeoPage(m, copy);
  writePage(path, html);
  sitemapUrls.push({ path, priority: "0.9", changefreq: "monthly" });
  reports.push(audit(`geo:${m.slug}`, html, copy, { keyword: m.primaryKeyword }));
}

/* hub */
{
  const { copy } = loadCopy("hub", hubFallback());
  const { path, html } = renderHub(copy, marketCopies);
  writePage(path, html);
  sitemapUrls.push({ path, priority: "0.9", changefreq: "monthly" });
  reports.push(audit("hub", html, copy));
}

/* home */
{
  const { copy } = loadCopy("home", homeFallback());
  const { path, html } = renderHome(copy, marketCopies);
  writePage(path, html);
  sitemapUrls.push({ path, priority: "1.0", changefreq: "weekly" });
  reports.push(audit("home", html, copy));
}

/* supporting static pages */
const staticPages = [
  { r: renderAbout(), priority: "0.8" },
  { r: renderContact(), priority: "0.8" },
  { r: renderBookCall(), sitemap: false },
  { r: renderRegGuide(), priority: "0.7" },
  { r: renderListings(), priority: "0.6" },
];
for (const { r, priority, sitemap = true } of staticPages) {
  writePage(r.path, r.html);
  if (sitemap) sitemapUrls.push({ path: r.path, priority, changefreq: "monthly" });
}

/* extended service-area pages (Townsend + cabin communities) */
for (const a of AREAS) {
  const { path, html } = renderAreaPage(a);
  writePage(path, html);
  sitemapUrls.push({ path, priority: a.kind === "city" ? "0.7" : "0.6", changefreq: "monthly" });
  reports.push(audit(`area:${a.slug}`, html, a, { keyword: a.primaryKeyword }));
}

/* property-type (segment) pages */
for (const s of SEGMENTS) {
  const { path, html } = renderSegmentPage(s);
  writePage(path, html);
  sitemapUrls.push({ path, priority: "0.7", changefreq: "monthly" });
  reports.push(audit(`segment:${s.slug}`, html, s, { keyword: s.primaryKeyword }));
}

/* category-level comparison pages */
for (const c of COMPARISONS) {
  const { path, html } = renderComparisonPage(c);
  writePage(path, html);
  sitemapUrls.push({ path, priority: "0.7", changefreq: "monthly" });
  reports.push(audit(`compare:${c.slug}`, html, c, { keyword: c.primaryKeyword }));
}

/* service-areas index */
{
  const r = renderServiceAreas();
  writePage(r.path, r.html);
  sitemapUrls.push({ path: r.path, priority: "0.7", changefreq: "monthly" });
}

/* blog index + imported posts */
const posts = loadPosts();
{
  const r = renderBlog(posts);
  writePage(r.path, r.html);
  sitemapUrls.push({ path: r.path, priority: "0.7", changefreq: "weekly" });
}
for (const post of posts) {
  const { path, html } = renderPost(post, posts);
  writePage(path, html);
  sitemapUrls.push({ path, priority: "0.6", changefreq: "monthly" });
}
console.log(`Blog: ${posts.length} imported post(s).`);

/* 404 (not in sitemap) */
{
  const nf = renderNotFound();
  writePage(nf.path, nf.html);
}

/* assets */
copyDir(join(__dirname, "assets"), join(DIST, "assets"));

/* sitemap.xml */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map((u) => `  <url>\n    <loc>${SITE.baseUrl}${u.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

/* llms.txt — structured AI crawler / assistant guidance */
writeFileSync(join(DIST, "llms.txt"), renderLlmsTxt(posts));

/* robots.txt */
writeFileSync(
  join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}/sitemap.xml\nLLMs: ${SITE.baseUrl}/llms.txt\n`
);

/* ---- report ---- */
console.log("Pages written to dist/:");
for (const u of sitemapUrls) console.log("  " + (u.path === "/" ? "/ (home)" : u.path));

console.log("\nQA report");
console.log("─".repeat(72));
console.log("page".padEnd(16), "words".padStart(6), "title".padStart(6), "desc".padStart(6), "  issues");
let totalIssues = 0;
for (const r of reports) {
  totalIssues += r.issues.length;
  console.log(
    r.label.padEnd(16),
    String(r.words).padStart(6),
    String(r.titleLen).padStart(6),
    String(r.descLen).padStart(6),
    "  " + (r.issues.length ? "⚠ " + r.issues.join("; ") : "ok")
  );
}
console.log("─".repeat(72));
console.log(`${reports.length} audited pages, ${totalIssues} issue(s).`);
const lowWords = reports.filter((r) => r.words < 1500 && /geo|hub/.test(r.label));
if (lowWords.length) console.log(`Note: ${lowWords.map((r) => r.label).join(", ")} under 1,500 words of generated copy (will pass once AI copy lands).`);
console.log("\nDone. Preview with: node serve.mjs");
