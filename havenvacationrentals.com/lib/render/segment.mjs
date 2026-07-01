import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import {
  breadcrumbs, sectionHead, serviceGrid, pillars, steps,
  faqAccordion, crossLinks, ctaBand, leadForm, channelStrip,
} from "../components.mjs";
import {
  serviceLd, faqLd, breadcrumbLd, organizationLd, websiteLd,
} from "../seo.mjs";
import { SITE, SERVICES, PILLARS, PROCESS, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, coverPhoto } from "../../content/photos.mjs";

function pointCards(points) {
  return `<div class="grid grid--3">
    ${points.map((p) => `<div class="card card--accent" reveal>
      <span class="card__icon">${icon(p.icon, { width: 26, height: 26 })}</span>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.body)}</p>
    </div>`).join("")}
  </div>`;
}

export function renderSegmentPage(seg) {
  const path = `/${seg.slug}/`;
  const heroPhoto = PHOTOS[seg.heroPhoto] || PHOTOS.heroExterior;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Property Management", href: "/property-management/" },
    { label: seg.name, href: path },
  ];
  const description = seg.metaDescription;

  const head = {
    title: seg.metaTitle,
    description,
    path,
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      serviceLd({ path, cityName: "the Smoky Mountains", description }),
      faqLd(seg.faqs),
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<!-- HERO -->
<section class="hero photo-hero" style="--photo-hero:url('${heroPhoto}'),linear-gradient(150deg,#3c4143,#1d2327)">
  <div class="container">
    <div class="hero__inner">
      <div class="stack">
        <span class="eyebrow hero__eyebrow">${escapeHtml(seg.heroEyebrow)}</span>
        <h1>${escapeHtml(seg.h1)}</h1>
        <p class="hero__sub">${escapeHtml(seg.heroSubhead)}</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
        <div class="hero__trust">
          <div class="hero__trust-item"><b>Airbnb</b><span>Superhost guest care</span></div>
          <div class="hero__trust-item"><b>4.9★</b><span>4,000+ Google reviews</span></div>
          <div class="hero__trust-item"><b>Local team</b><span>Based in the Smokies since ${SITE.foundingYear}</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="channel-band"><div class="container">${channelStrip()}</div></section>

<!-- INTRO -->
<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Smoky Mountains</span>
      <h2>${escapeHtml(seg.introHeading)}</h2>
      ${paragraphs(seg.introParagraphs)}
    </div>
  </div>
</section>

<!-- POINTS -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "How we help", title: seg.pointsHeading })}
    ${pointCards(seg.points)}
  </div>
</section>

<!-- FULL-SERVICE -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Full-service management", title: "Everything handled, by one local team", intro: "Bookings and pricing, marketing, housekeeping, guest communication, maintenance, and compliance. You hand us the keys and we run the operation." })}
    ${serviceGrid(SERVICES)}
  </div>
</section>

<!-- DETAIL -->
<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: "What owners should know", title: seg.detailHeading })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(seg.detailParagraphs)}</div>
    ${pillars(PILLARS)}
  </div>
</section>

<!-- CTA #2 -->
<section class="section--tight"><div class="container">${ctaBand({
    title: "See what your cabin can earn",
    body: "Book a quick call with a local Haven advisor for a realistic revenue estimate, with no obligation.",
  })}</div></section>

<!-- GETTING STARTED -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Getting started", title: "Switching to Haven is simple", intro: "We handle the heavy lifting so the transition is painless.", center: true })}
    ${steps(PROCESS)}
  </div>
</section>

<!-- FAQ -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: "Questions, answered", center: true })}
    ${faqAccordion(seg.faqs, `faq-${seg.slug}`)}
  </div>
</section>

<!-- CROSS-LINKS -->
<section class="section section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "By market", title: "Explore management where you own", center: true })}
    ${crossLinks(MARKETS.map((m) => ({ label: `${m.city} vacation rental management`, href: `/vacation-rental-management-${m.slug}/` })))}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/service-areas/">See all Haven service areas ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- FINAL CTA + FORM -->
<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(seg.closingHeading)}</span>
        <h2>Let's talk about your property</h2>
        <p class="lede">${escapeHtml(seg.closingParagraph)}</p>
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
