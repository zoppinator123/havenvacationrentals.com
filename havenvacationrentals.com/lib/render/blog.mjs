import { page } from "../layout.mjs";
import { escapeHtml, escapeAttr } from "../util.mjs";
import { breadcrumbs, sectionHead, ctaBand, crossLinks } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, PHOTO_FALLBACK } from "../../content/photos.mjs";

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d) ? "" : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

function postCard(p) {
  const cat = p.categories && p.categories[0];
  return `<a class="area-card blog-card" href="${p.route}" aria-label="${escapeAttr(p.title)}">
    <div class="area-card__body">
      <span class="blog-card__meta">${cat ? `<span class="blog-card__cat">${escapeHtml(cat)}</span> · ` : ""}${escapeHtml(fmtDate(p.date))}</span>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.excerpt || "")}</p>
      <span class="link-arrow">Read more <span aria-hidden="true">→</span></span>
    </div>
  </a>`;
}

export function renderBlog(posts = []) {
  const path = "/blog/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: path },
  ];
  const title = "Smoky Mountain Owner Guides & STR Insights | Haven";
  const description =
    "Data-backed guides and market updates for Smoky Mountain cabin owners: revenue strategy, dynamic pricing, regulations, and what the booking data shows.";

  const head = {
    title,
    description,
    path,
    ogImage: "/assets/og/blog.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        url: "https://havenvacationrentals.com" + path,
        name: title,
        description,
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: "https://havenvacationrentals.com" + p.route,
          datePublished: p.date || undefined,
        })),
      },
      breadcrumbLd(crumbs),
    ],
  };

  const cards = posts.length
    ? posts.map(postCard).join("")
    : `<p class="note-box">New owner guides are publishing here soon.</p>`;

  const body = `
${breadcrumbs(crumbs)}
<section class="hero photo-hero" style="--photo-hero:url('${PHOTOS.heroFall}'),${PHOTO_FALLBACK}">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4rem)">
      <div class="stack" style="max-width:680px">
        <span class="eyebrow hero__eyebrow">Owner resources</span>
        <h1>Smoky Mountain owner guides</h1>
        <p class="hero__sub" style="max-width:60ch">Straight, data-backed answers for cabin owners: revenue strategy, pricing, local regulations, and what the latest booking data shows.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Latest", title: "From the Haven blog" })}
    <div class="grid grid--3 blog-grid">${cards}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "By market", title: "Local management where you own", center: true })}
    ${crossLinks(MARKETS.map((m) => ({ label: `${m.city} vacation rental management`, href: `/vacation-rental-management-${m.slug}/` })))}
  </div>
</section>

<section class="section section--tight"><div class="container">${ctaBand({
    title: "Have a question about your cabin?",
    body: "A local Haven advisor can answer it on a quick call and show you what your property can earn.",
  })}</div></section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
