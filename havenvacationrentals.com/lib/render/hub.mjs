import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import {
  breadcrumbs, sectionHead, statsRow, serviceGrid, pillars, steps,
  faqAccordion, ctaBand, leadForm, loomEmbed,
} from "../components.mjs";
import {
  localBusinessLd, serviceLd, faqLd, breadcrumbLd, organizationLd, websiteLd,
} from "../seo.mjs";
import { SITE, SERVICES, PILLARS, PROCESS, HUB_PROOF, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, MARKET_PHOTOS, coverPhoto, heroScenicMountains } from "../../content/photos.mjs";

function areaCards(marketCopies) {
  return `<div class="grid grid--4">
    ${MARKETS.map((m) => {
      const photo = (MARKET_PHOTOS[m.slug] && MARKET_PHOTOS[m.slug].hero) || PHOTOS.heroExterior;
      const blurb = (marketCopies[m.slug] && marketCopies[m.slug].crossLinkBlurb) ||
        `Full-service vacation rental management in ${m.city}.`;
      const href = `/vacation-rental-management-${m.slug}/`;
      return `<a class="area-card" href="${href}" aria-label="${escapeHtml(m.city)} vacation rental management">
        ${coverPhoto(photo, { ratio: "16 / 9", cls: "area-card__art", label: `${m.city} cabin managed by Haven` })}
        <div class="area-card__body">
          <h3>${escapeHtml(m.city)}</h3>
          <p>${escapeHtml(blurb)}</p>
          <span class="link-arrow">${escapeHtml(m.city)} property management ${icon("arrowRight", { width: 16, height: 16 })}</span>
        </div>
      </a>`;
    }).join("")}
  </div>`;
}

export function renderHub(copy, marketCopies = {}) {
  const path = "/property-management/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Property Management", href: path },
  ];
  const description = copy.metaDescription;

  const head = {
    title: copy.metaTitle,
    description,
    path,
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      localBusinessLd({ path, cityName: "Sevierville", region: "TN", description }),
      serviceLd({ path, cityName: "the Smoky Mountains", description }),
      faqLd(copy.faqs),
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<section class="hero">
  ${heroScenicMountains()}
  <div class="container">
    <div class="hero__inner">
      <div class="stack">
        <span class="eyebrow hero__eyebrow">${escapeHtml(copy.heroEyebrow)}</span>
        <h1>${escapeHtml(copy.h1)}</h1>
        <p class="hero__sub">${escapeHtml(copy.heroSubhead)}</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
        <div class="hero__trust">
          ${HUB_PROOF.slice(0, 3).map((p) => `<div class="hero__trust-item"><b>${escapeHtml(p.value)}</b><span>${escapeHtml(p.label)}</span></div>`).join("")}
        </div>
      </div>
      <div class="hero__visual">
        <div class="hero__media">
          ${coverPhoto(PHOTOS.heroExterior, { ratio: "4 / 3", label: "Haven-managed Smoky Mountain cabin at dusk" })}
        </div>
        <div class="hero__badge hero__badge--below">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span><b>4.9 stars, 4,000+ Google reviews</b><small>Top 1% of Airbnb listings worldwide</small></span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Smoky Mountain property management</span>
      <h2>${escapeHtml(copy.introHeading)}</h2>
      ${paragraphs(copy.introParagraphs)}
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({
      eyebrow: "See how we work",
      title: "Explore our offer",
      intro: "A quick walkthrough of full-service Haven management for Smoky Mountain cabin owners.",
      center: true,
    })}
    <div class="loom-feature" style="max-width:min(960px,100%);margin-inline:auto">
      ${loomEmbed(SITE.links.loomOffer, {
        title: "Explore our offer",
        thumbnail: SITE.links.loomOfferThumb,
      })}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${statsRow(HUB_PROOF.map((p) => ({ value: p.value, label: p.label })), { count: 4 })}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Full-service management", title: "What full-service vacation rental management includes", intro: copy.servicesIntro })}
    ${serviceGrid(SERVICES)}
    <div class="prose stack" style="margin-top:var(--space-lg)">${paragraphs(copy.servicesDetail)}</div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: "Why owners choose Haven", title: copy.whyHeading })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(copy.whyParagraphs)}</div>
    ${pillars(PILLARS)}
  </div>
</section>

<!-- SERVICE AREAS (hub -> spokes) -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Service areas", title: "Local vacation rental management across the Smokies", intro: copy.areasIntro })}
    ${areaCards(marketCopies)}
    <p class="note-box" style="margin-top:var(--space-md)">${escapeHtml(copy.areasNote || "We also manage cabins in Townsend and around Knoxville. If your property is anywhere in or near Sevier County, we would love to talk.")}</p>
  </div>
</section>

<section class="section--tight"><div class="container">${ctaBand({
    title: "Find out what your cabin can earn with Haven",
    body: "Book a call with a local advisor for a straight, no-pressure look at your property's revenue potential.",
  })}</div></section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Fees and earnings", title: copy.feesHeading })}
    <div class="prose stack">${paragraphs(copy.feesParagraphs)}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Getting started", title: "How switching to Haven works", center: true })}
    ${steps(PROCESS)}
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: "Smoky Mountain property management questions, answered", center: true })}
    ${faqAccordion(copy.faqs, "faq-hub")}
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(copy.closingHeading)}</span>
        <h2>Let's talk about your property</h2>
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

  return { path, html: page({ head, body, currentPath: path }) };
}
