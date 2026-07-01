import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import {
  breadcrumbs, sectionHead, faqAccordion, crossLinks, leadForm,
} from "../components.mjs";
import {
  faqLd, breadcrumbLd, organizationLd, websiteLd,
} from "../seo.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, PHOTO_FALLBACK } from "../../content/photos.mjs";

function compareCell(v, isHaven = false) {
  const cls = isHaven ? " class=\"compare__haven\"" : "";
  if (v === true) return `<td${isHaven ? " class=\"compare__haven yes\"" : " class=\"yes\""}>${icon("check", { width: 20, height: 20 })}<span class="visually-hidden">Yes</span></td>`;
  if (v === false) return `<td${isHaven ? " class=\"compare__haven no\"" : " class=\"no\""}>${icon("close", { width: 18, height: 18 })}<span class="visually-hidden">No</span></td>`;
  return `<td${cls}>${escapeHtml(String(v))}</td>`;
}

function comparisonTable(table) {
  return `<div class="compare-wrap">
    <table class="compare">
      <thead>
        <tr>
          <th scope="col"><span class="visually-hidden">Capability</span></th>
          <th scope="col">${escapeHtml(table.colA)}</th>
          <th scope="col" class="compare__haven">${escapeHtml(table.colHaven)}</th>
        </tr>
      </thead>
      <tbody>
        ${table.rows.map((r) => `<tr><th scope="row">${escapeHtml(r.label)}</th>${compareCell(r.a)}${compareCell(r.haven, true)}</tr>`).join("")}
      </tbody>
    </table>
  </div>`;
}

export function renderComparisonPage(cmp) {
  const path = `/${cmp.slug}/`;
  const heroPhoto = PHOTOS[cmp.heroPhoto] || PHOTOS.contactBg;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Property Management", href: "/property-management/" },
    { label: cmp.name, href: path },
  ];
  const description = cmp.metaDescription;

  const head = {
    title: cmp.metaTitle,
    description,
    path,
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      faqLd(cmp.faqs),
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<!-- HERO -->
<section class="hero photo-hero" style="--photo-hero:url('${heroPhoto}'),${PHOTO_FALLBACK}">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:720px">
        <span class="eyebrow hero__eyebrow">${escapeHtml(cmp.heroEyebrow)}</span>
        <h1>${escapeHtml(cmp.h1)}</h1>
        <p class="hero__sub" style="max-width:62ch">${escapeHtml(cmp.heroSubhead)}</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- INTRO -->
<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Smoky Mountains</span>
      <h2>${escapeHtml(cmp.introHeading)}</h2>
      ${paragraphs(cmp.introParagraphs)}
    </div>
  </div>
</section>

<!-- COMPARISON TABLE -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Side by side", title: "How the two approaches compare", intro: "Where your time, your revenue, and your peace of mind actually go.", center: true })}
    ${comparisonTable(cmp.table)}
  </div>
</section>

<!-- PROSE SECTIONS -->
${cmp.sections.map((s, i) => `<section class="section${i % 2 === 1 ? " section--tint" : ""}">
  <div class="container">
    <div class="prose stack">
      <h2>${escapeHtml(s.heading)}</h2>
      ${paragraphs(s.paragraphs)}
    </div>
    ${i === 0 && cmp.relatedPost ? `<p class="prose" style="margin-top:var(--space-md)"><a class="link-arrow" href="${cmp.relatedPost.href}">${escapeHtml(cmp.relatedPost.label)} ${icon("arrowRight", { width: 16, height: 16 })}</a></p>` : ""}
  </div>
</section>`).join("")}

<!-- FAQ -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: "Common questions", center: true })}
    ${faqAccordion(cmp.faqs, `faq-${cmp.slug}`)}
  </div>
</section>

<!-- CROSS-LINKS -->
<section class="section section--tint section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "By market", title: "Local management where you own", center: true })}
    ${crossLinks(MARKETS.map((m) => ({ label: `${m.city} vacation rental management`, href: `/vacation-rental-management-${m.slug}/` })))}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/property-management/">See all Smoky Mountain property management ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- FINAL CTA + FORM -->
<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(cmp.closingHeading)}</span>
        <h2>Let's talk about your property</h2>
        <p class="lede">${escapeHtml(cmp.closingParagraph)}</p>
        <div class="cta-row">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
      ${leadForm({ heading: "Book a call about your property" })}
    </div>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
