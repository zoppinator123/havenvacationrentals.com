import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import { ridgeStrip } from "../art.mjs";
import {
  breadcrumbs, sectionHead, statsRow, serviceGrid, pillars, steps,
  regulations, callout, faqAccordion, testimonial, crossLinks, ctaBand, leadForm, channelStrip,
} from "../components.mjs";
import {
  localBusinessLd, serviceLd, faqLd, breadcrumbLd, organizationLd, websiteLd,
} from "../seo.mjs";
import { SITE, SERVICES, PILLARS, PROCESS, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { MARKET_PHOTOS, PHOTOS, coverPhoto } from "../../content/photos.mjs";

function galleryStrip(market) {
  const set = (MARKET_PHOTOS[market.slug] && MARKET_PHOTOS[market.slug].gallery) ||
    [PHOTOS.interiorLiving, PHOTOS.deckView, PHOTOS.interiorKitchen];
  const labels = [
    `Interior of a Haven-managed ${market.city} cabin`,
    `Mountain-view deck on a ${market.city} rental`,
    `Kitchen in a ${market.city} vacation rental`,
  ];
  return `<div class="gallery">
    ${set.slice(0, 3).map((src, i) => coverPhoto(src, { ratio: "4 / 3", cls: `gallery__img gallery__img--${i}`, label: labels[i] || "" })).join("")}
  </div>`;
}

function snapshotTable(rows, city) {
  return `<table class="data-table">
    <caption>${escapeHtml(city)} market snapshot. Public market metrics and sources are noted below.</caption>
    <tbody>
      ${rows.map((r) => `<tr><th scope="row">${escapeHtml(r.label)}</th><td>${escapeHtml(r.value)}</td></tr>`).join("")}
    </tbody>
  </table>`;
}

function crossLinksFor(market) {
  return MARKETS.filter((m) => m.slug !== market.slug).map((m) => ({
    label: `${m.city} vacation rental management`,
    href: `/vacation-rental-management-${m.slug}/`,
  }));
}

export function renderGeoPage(market, copy) {
  const path = `/vacation-rental-management-${market.slug}/`;
  const heroPhoto = (MARKET_PHOTOS[market.slug] && MARKET_PHOTOS[market.slug].hero) || PHOTOS.heroExterior;
  const heroAlt = `Luxury cabin rental managed by Haven in ${market.city}, TN, set in the Smoky Mountains`;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Property Management", href: "/property-management/" },
    { label: market.city, href: path },
  ];

  const description = copy.metaDescription;

  const head = {
    title: copy.metaTitle,
    description,
    path,
    ogType: "website",
    ogImage: `/assets/og/${market.slug}.png`,
    jsonLd: [
      organizationLd(),
      websiteLd(),
      localBusinessLd({ path, cityName: market.city, region: market.region, description }),
      serviceLd({ path, cityName: market.city, description }),
      faqLd(copy.faqs),
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<!-- 1. HERO [LOCAL] -->
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
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
        <div class="hero__trust">
          <div class="hero__trust-item"><b>Airbnb</b><span>Superhost guest care</span></div>
          <div class="hero__trust-item"><b>4.9★</b><span>4,000+ Google reviews</span></div>
          <div class="hero__trust-item"><b>One flat fee</b><span>No hidden booking fees</span></div>
        </div>
      </div>
      <div class="hero__media">
        ${coverPhoto(heroPhoto, { ratio: "4 / 3", label: heroAlt })}
        <div class="hero__badge">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span><b>Top 1% of Airbnb listings worldwide</b><small>Locally owned in the Smokies since ${SITE.foundingYear}</small></span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 1b. CHANNEL / TRUST STRIP -->
<section class="channel-band"><div class="container">${channelStrip()}</div></section>

<!-- 2. INTRO / PROBLEM-AGITATE [LOCAL] -->
<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">${escapeHtml(market.city)}, Tennessee</span>
      <h2>${escapeHtml(copy.introHeading)}</h2>
      ${paragraphs(copy.introParagraphs)}
    </div>
  </div>
</section>

<!-- 3. LOCAL MARKET SNAPSHOT [LOCAL] -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Local market snapshot", title: copy.snapshotHeading })}
    ${statsRow(market.snapshotStats, { count: 4 })}
    <div class="snapshot" style="margin-top:var(--space-lg)">
      <div class="prose stack">${paragraphs(copy.snapshotParagraphs)}</div>
      ${snapshotTable(market.snapshotTable, market.city)}
    </div>
  </div>
</section>

<!-- 3b. PROPERTY GALLERY [LOCAL] -->
<section class="section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "The Haven standard", title: `What a professionally managed ${market.city} cabin looks like`, center: true })}
    ${galleryStrip(market)}
  </div>
</section>

<!-- 4. WHAT FULL-SERVICE MANAGEMENT INCLUDES [SHARED + local intro] -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Full-service management", title: "Everything your cabin needs, handled by one local team", intro: copy.servicesIntro })}
    ${serviceGrid(SERVICES)}
  </div>
</section>

<!-- 5. WHY OWNERS CHOOSE HAVEN [pillars + local framing + proof] -->
<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: `Why ${market.city} owners choose Haven`, title: copy.whyHeading })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(copy.whyParagraphs)}</div>
    ${pillars(PILLARS)}
    <div style="margin-top:var(--space-xl);max-width:760px;margin-inline:auto">
      <!-- PLACEHOLDER testimonial: replace with a real, verifiable owner testimonial before publishing (see README open items). -->
      ${testimonial(copy.testimonial)}
    </div>
  </div>
</section>

<!-- CTA #2 -->
<section class="section--tight"><div class="container">${ctaBand({
    title: `See what your ${market.city} cabin can earn`,
    body: `Book a quick call with a local Haven advisor. We will walk through your property, your market, and a realistic revenue estimate, with no obligation.`,
  })}</div></section>

<!-- 6. LOCAL REGULATIONS & COMPLIANCE [LOCAL] -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Regulations & compliance", title: copy.regHeading, intro: null })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(copy.regIntro)}</div>
    ${regulations(market.regItems)}
    <div style="margin-top:var(--space-md)">${callout(market.regCallout)}</div>
    <div class="prose stack" style="margin-top:var(--space-lg)">
      <p>${escapeHtml(copy.regClosing)}</p>
      <p><a class="link-arrow" href="${SITE.links.regulationsGuide}">Read our full Sevier County short-term rental regulations guide ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
    </div>
    <p class="form-disclaimer" style="margin-top:1rem">This summary is for general guidance and is current as of mid-2026. Rules change. Confirm details with the relevant city or county office, or let Haven handle it for you.</p>
  </div>
</section>

<!-- 7. HOW GETTING STARTED WORKS [SHARED] -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Getting started", title: "Switching to Haven is simple", intro: copy.processIntro, center: true })}
    ${steps(PROCESS)}
  </div>
</section>

<!-- 8. FAQ [LOCAL] -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: `${market.city} vacation rental management, answered`, center: true })}
    ${faqAccordion(copy.faqs, `faq-${market.slug}`)}
  </div>
</section>

<!-- 9. CROSS-LINKS TO OTHER MARKETS [SHARED] -->
<section class="section section--tint section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "More service areas", title: "We also manage vacation rentals across the Smokies", center: true })}
    ${crossLinks(crossLinksFor(market))}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/property-management/">See all Smoky Mountain property management ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- 10. FINAL CTA [SHARED] + lead form -->
<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(copy.closingHeading)}</span>
        <h2>${escapeHtml(`Ready to earn more from your ${market.city} cabin?`)}</h2>
        <p class="lede">${escapeHtml(copy.closingParagraph)}</p>
        <div class="cta-row">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
      ${leadForm({ heading: `Talk to a local advisor about your ${market.city} property`, marketDefault: market.city })}
    </div>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
