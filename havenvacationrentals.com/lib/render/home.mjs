import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import { mountainScene, MARKET_PALETTES, ridgeStrip } from "../art.mjs";
import {
  sectionHead, statsRow, serviceGrid, pillars, steps, faqAccordion, ctaBand, leadForm,
} from "../components.mjs";
import { organizationLd, websiteLd, localBusinessLd, faqLd } from "../seo.mjs";
import { SITE, SERVICES, PILLARS, PROCESS, PROOF, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";

function areaCards(marketCopies) {
  return `<div class="grid grid--4">
    ${MARKETS.map((m) => {
      const pal = MARKET_PALETTES[m.palette] || MARKET_PALETTES.smokies;
      const blurb = (marketCopies[m.slug] && marketCopies[m.slug].crossLinkBlurb) ||
        `Full-service vacation rental management in ${m.city}.`;
      const href = `/vacation-rental-management-${m.slug}/`;
      return `<a class="area-card" href="${href}" aria-label="${escapeHtml(m.city)} vacation rental management">
        <div class="area-card__art" aria-hidden="true">${mountainScene({ ...pal, ratio: "16 / 9" })}</div>
        <div class="area-card__body">
          <h3>${escapeHtml(m.city)}</h3>
          <p>${escapeHtml(blurb)}</p>
          <span class="link-arrow">${escapeHtml(m.city)} management ${icon("arrowRight", { width: 16, height: 16 })}</span>
        </div>
      </a>`;
    }).join("")}
  </div>`;
}

export function renderHome(copy, marketCopies = {}) {
  const path = "/";
  const pal = MARKET_PALETTES.smokies;
  const description = copy.metaDescription;

  const head = {
    title: copy.metaTitle,
    description,
    path,
    ogImage: "/assets/og/home.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      localBusinessLd({ path, cityName: "Sevierville", region: "TN", description }),
      faqLd(copy.faqs),
    ],
  };

  const body = `
<section class="hero">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner">
      <div class="stack">
        <span class="eyebrow hero__eyebrow">${escapeHtml(copy.heroEyebrow)}</span>
        <h1>${escapeHtml(copy.h1)}</h1>
        <p class="hero__sub">${escapeHtml(copy.heroSubhead)}</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="/property-management/">How it works</a>
        </div>
        <div class="hero__trust">
          ${PROOF.slice(0, 3).map((p) => `<div class="hero__trust-item"><b>${escapeHtml(p.value)}</b><span>${escapeHtml(p.label)}</span></div>`).join("")}
        </div>
      </div>
      <div class="hero__media" data-photo-slot="Haven-managed luxury cabin in the Smoky Mountains at golden hour">
        ${mountainScene({ ...pal, ratio: "4 / 3" })}
        <div class="hero__badge">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span><b>4.9 stars, 3,400+ reviews</b><small>Locally owned in the Smokies since ${SITE.foundingYear}</small></span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Vacation rental management, done right</span>
      <h2>${escapeHtml(copy.introHeading)}</h2>
      ${paragraphs(copy.introParagraphs)}
    </div>
  </div>
</section>

<section class="section section--tint section--tight">
  <div class="container">
    ${statsRow(PROOF.map((p) => ({ value: p.value, label: p.label })), { count: 4 })}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Full-service management", title: "We handle everything. You earn more.", intro: copy.servicesIntro })}
    ${serviceGrid(SERVICES)}
    <p class="center" style="margin-top:var(--space-lg)"><a class="btn btn--ghost btn--lg" href="/property-management/">See everything we manage ${icon("arrowRight", { width: 18, height: 18 })}</a></p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Why owners choose Haven", title: copy.valueHeading })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(copy.valueParagraphs)}</div>
    ${pillars(PILLARS)}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Service areas", title: "Local management across the Smoky Mountains", intro: "Choose your market for local rates, regulations, and what your cabin can earn." })}
    ${areaCards(marketCopies)}
  </div>
</section>

<section class="section--tight"><div class="container">${ctaBand({
    title: "Curious what your cabin could earn?",
    body: "Book a no-pressure call with a local Haven advisor for a realistic revenue estimate on your property.",
  })}</div></section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Getting started", title: "Three steps to earning more", center: true })}
    ${steps(PROCESS)}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: "Questions owners ask us", center: true })}
    ${faqAccordion(copy.faqs, "faq-home")}
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(copy.closingHeading)}</span>
        <h2>Let's make your cabin work harder</h2>
        <p class="lede">${escapeHtml(copy.closingParagraph)}</p>
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

  return { path, html: page({ head, body, currentPath: "/" }) };
}
