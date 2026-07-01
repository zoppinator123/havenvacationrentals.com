import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, escapeAttr, paragraphs } from "../util.mjs";
import { ridgeStrip } from "../art.mjs";
import {
  breadcrumbs, sectionHead, statsRow, serviceGrid, pillars, steps,
  callout, faqAccordion, crossLinks, ctaBand, leadForm, channelStrip,
} from "../components.mjs";
import {
  localBusinessLd, serviceLd, faqLd, breadcrumbLd, organizationLd, websiteLd,
} from "../seo.mjs";
import { SITE, SERVICES, PILLARS, PROCESS, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKET_BY_SLUG } from "../../content/markets.mjs";
import { PHOTOS, coverPhoto } from "../../content/photos.mjs";

function snapshotTable(rows, name) {
  return `<table class="data-table">
    <caption>${escapeHtml(name)} market snapshot. Public market metrics and sources are noted below.</caption>
    <tbody>
      ${rows.map((r) => `<tr><th scope="row">${escapeHtml(r.label)}</th><td>${escapeHtml(r.value)}</td></tr>`).join("")}
    </tbody>
  </table>`;
}

function characterGrid(highlights) {
  return `<div class="reg-grid">
    ${highlights.map((h) => `<div class="reg" reveal>
      <h3>${icon(h.icon || "star", { width: 18, height: 18 })}${escapeHtml(h.title)}</h3>
      <p>${escapeHtml(h.body)}</p>
    </div>`).join("")}
  </div>`;
}

/* Cross-links: parent city (for neighborhoods) + the primary markets. */
function areaCrossLinks(area) {
  const links = [];
  const seen = new Set();
  const push = (slug) => {
    if (seen.has(slug)) return;
    const m = MARKET_BY_SLUG[slug];
    if (!m) return;
    seen.add(slug);
    links.push({ label: `${m.city} vacation rental management`, href: `/vacation-rental-management-${m.slug}/` });
  };
  (area.relatedCities || []).forEach(push);
  return links;
}

export function renderAreaPage(area) {
  const path = `/vacation-rental-management-${area.slug}/`;
  const heroPhoto = PHOTOS[area.heroPhoto] || PHOTOS.heroExterior;
  const areaName = area.kind === "neighborhood" && area.associatedCity
    ? `${area.name}, ${area.associatedCity}`
    : `${area.name}, TN`;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas/" },
    { label: area.name, href: path },
  ];
  const description = area.metaDescription;

  /* Regulation reference links: neighborhoods point to the parent city page and
     the Sevier County guide; Townsend (Blount County) points to contact only. */
  const regLinks = [];
  if (area.associatedCitySlug && MARKET_BY_SLUG[area.associatedCitySlug]) {
    regLinks.push({
      label: `See our ${MARKET_BY_SLUG[area.associatedCitySlug].city} management page`,
      href: `/vacation-rental-management-${area.associatedCitySlug}/`,
    });
  }
  if (area.county === "Sevier County") {
    regLinks.push({ label: "Read the Sevier County short-term rental rules guide", href: SITE.links.regulationsGuide });
  }

  const head = {
    title: area.metaTitle,
    description,
    path,
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      localBusinessLd({ path, cityName: area.name, region: "TN", description }),
      serviceLd({ path, cityName: area.name, description }),
      faqLd(area.faqs),
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<!-- HERO -->
<section class="hero">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner">
      <div class="stack">
        <span class="eyebrow hero__eyebrow">${escapeHtml(area.heroEyebrow)}</span>
        <h1>${escapeHtml(area.h1)}</h1>
        <p class="hero__sub">${escapeHtml(area.heroSubhead)}</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
        <div class="hero__trust">
          <div class="hero__trust-item"><b>Airbnb</b><span>Superhost guest care</span></div>
          <div class="hero__trust-item"><b>4.9★</b><span>4,000+ Google reviews</span></div>
          <div class="hero__trust-item"><b>One flat fee</b><span>No hidden booking fees</span></div>
        </div>
      </div>
      <div class="hero__media">
        ${coverPhoto(heroPhoto, { ratio: "4 / 3", label: `Haven-managed cabin in ${escapeAttr(area.name)}` })}
        <div class="hero__badge">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span><b>Top 1% of Airbnb listings worldwide</b><small>Locally owned in the Smokies since ${SITE.foundingYear}</small></span>
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
      <span class="eyebrow">${escapeHtml(area.associatedCity ? `${area.name}, ${area.associatedCity}` : `${area.name}, Tennessee`)}</span>
      <h2>${escapeHtml(area.introHeading)}</h2>
      ${paragraphs(area.introParagraphs)}
    </div>
  </div>
</section>

${area.snapshot ? `<!-- MARKET SNAPSHOT (city-tier) -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Local market snapshot", title: area.snapshot.heading })}
    ${statsRow(area.snapshot.stats, { count: 4 })}
    <div class="snapshot" style="margin-top:var(--space-lg)">
      <div class="prose stack">${paragraphs(area.snapshot.paragraphs)}</div>
      ${snapshotTable(area.snapshot.table, area.name)}
    </div>
  </div>
</section>` : ""}

${area.character ? `<!-- COMMUNITY CHARACTER (neighborhood) -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "The local read", title: area.character.heading })}
    ${characterGrid(area.character.highlights)}
  </div>
</section>` : ""}

<!-- FULL-SERVICE -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Full-service management", title: "Everything your cabin needs, handled by one local team", intro: "One flat fee covers the entire operation. From listing and pricing to cleaning, guest care, and maintenance, we run the day to day so you do not have to." })}
    ${serviceGrid(SERVICES)}
  </div>
</section>

<!-- WHY LOCAL -->
<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: `Why ${area.name} owners choose Haven`, title: area.whyHeading })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(area.whyParagraphs)}</div>
    ${pillars(PILLARS)}
  </div>
</section>

<!-- CTA #2 -->
<section class="section--tight"><div class="container">${ctaBand({
    title: `See what your ${area.name} cabin can earn`,
    body: "Book a quick call with a local Haven advisor. We will walk through your property, your market, and a realistic revenue estimate, with no obligation.",
  })}</div></section>

<!-- REGULATIONS / JURISDICTION -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Rules & jurisdiction", title: area.regHeading })}
    <div class="prose stack">${paragraphs(area.regParagraphs)}</div>
    ${regLinks.length ? `<div class="prose stack" style="margin-top:var(--space-md)">
      ${regLinks.map((l) => `<p><a class="link-arrow" href="${l.href}">${escapeHtml(l.label)} ${icon("arrowRight", { width: 16, height: 16 })}</a></p>`).join("")}
    </div>` : ""}
    <p class="form-disclaimer" style="margin-top:1rem">${escapeHtml(area.regDisclaimer)}</p>
  </div>
</section>

<!-- GETTING STARTED -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Getting started", title: "Switching to Haven is simple", intro: "We handle the heavy lifting so the transition is painless.", center: true })}
    ${steps(PROCESS)}
  </div>
</section>

<!-- FAQ -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: `${area.name} vacation rental management, answered`, center: true })}
    ${faqAccordion(area.faqs, `faq-${area.slug}`)}
  </div>
</section>

<!-- CROSS-LINKS -->
<section class="section section--tint section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "More service areas", title: "We manage vacation rentals across the Smokies", center: true })}
    ${crossLinks(areaCrossLinks(area))}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/service-areas/">See all Haven service areas ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- FINAL CTA + FORM -->
<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(area.closingHeading)}</span>
        <h2>${escapeHtml(`Ready to earn more from your ${area.name} cabin?`)}</h2>
        <p class="lede">${escapeHtml(area.closingParagraph)}</p>
        <div class="cta-row">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
      ${leadForm({ heading: `Talk to a local advisor about your ${area.name} property` })}
    </div>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
