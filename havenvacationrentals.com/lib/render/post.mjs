import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, escapeAttr } from "../util.mjs";
import { breadcrumbs, ctaBand } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { SITE } from "../../content/site.mjs";

const AUTHORS = { havenadmin: "The Haven Team" };
const authorName = (a) => AUTHORS[a] || "The Haven Team";

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
const readingTime = (wc) => `${Math.max(1, Math.round((wc || 0) / 200))} min read`;

function relatedCard(p) {
  const media = p.featuredImage
    ? `<div class="ph blog-card__art" aria-hidden="true" style="aspect-ratio:16 / 10;background-image:url('${p.featuredImage}'),linear-gradient(150deg,#3c4143,#1d2327)"></div>`
    : `<div class="blog-card__art blog-card__art--plain" aria-hidden="true" style="aspect-ratio:16 / 10"></div>`;
  return `<a class="area-card blog-card" href="${p.route}" reveal>
    ${media}
    <div class="area-card__body">
      <h3>${escapeHtml(p.title)}</h3>
      <span class="link-arrow">Read more ${icon("arrowRight", { width: 16, height: 16 })}</span>
    </div>
  </a>`;
}

export function renderPost(post, allPosts = []) {
  const path = post.route;
  const description = (post.excerpt || `${post.title} — from the Haven Vacation Rentals blog.`).slice(0, 158);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: post.title, href: path },
  ];
  const img = post.featuredImage || SITE.baseUrl + "/assets/og/blog.png";
  const author = authorName(post.author);

  const head = {
    title: `${post.title} | Haven Vacation Rentals`.slice(0, 65),
    description,
    path,
    ogType: "article",
    ogImage: post.featuredImage || "/assets/og/blog.png",
    modified: post.modified || post.date || undefined,
    jsonLd: [
      organizationLd(),
      websiteLd(),
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        image: img,
        datePublished: post.date || undefined,
        dateModified: post.modified || post.date || undefined,
        author: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl + "/" },
        publisher: { "@id": `${SITE.baseUrl}/#organization` },
        mainEntityOfPage: SITE.baseUrl + path,
      },
      breadcrumbLd(crumbs),
    ],
  };

  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const body = `
${breadcrumbs(crumbs)}
<article>
  <header class="post-head">
    <div class="container post-head__inner">
      <span class="eyebrow">${escapeHtml(post.categories && post.categories[0] ? post.categories[0] : "Owner Resources")}</span>
      <h1>${escapeHtml(post.title)}</h1>
      <div class="post-meta">
        ${post.date ? `<time datetime="${escapeAttr(post.date)}">${escapeHtml(fmtDate(post.date))}</time><span class="dot">·</span>` : ""}
        <span>${escapeHtml(author)}</span><span class="dot">·</span>
        <span>${readingTime(post.wordCount)}</span>
      </div>
    </div>
  </header>

  ${post.featuredImage
    ? `<div class="container"><div class="post-hero-img" role="img" aria-label="${escapeAttr(post.title)}" style="background-image:url('${post.featuredImage}'),linear-gradient(150deg,#3c4143,#1d2327)"></div></div>`
    : ""}

  <div class="container">
    <div class="article">
      ${post.content}
    </div>
  </div>
</article>

<section class="section section--tight">
  <div class="container">
    ${ctaBand({
      title: "Want results like this for your cabin?",
      body: "Book a no-pressure call with a local Haven advisor and see what your Smoky Mountain rental can earn.",
    })}
  </div>
</section>

${related.length ? `<section class="section section--alt">
  <div class="container">
    <div class="section-head center"><span class="eyebrow">More from the blog</span><h2>Keep reading</h2></div>
    <div class="grid grid--3">${related.map(relatedCard).join("")}</div>
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/blog/">See all owner guides ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>` : ""}
`;

  return { path, html: page({ head, body, currentPath: "/blog/" }) };
}
