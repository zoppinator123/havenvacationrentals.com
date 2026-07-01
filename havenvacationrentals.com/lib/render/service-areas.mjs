import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, escapeAttr } from "../util.mjs";
import { breadcrumbs, sectionHead, ctaBand } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { SITE } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { AREAS } from "../../content/areas.mjs";
import { SEGMENTS } from "../../content/segments.mjs";
import { COMPARISONS } from "../../content/comparisons.mjs";
import { PHOTOS, MARKET_PHOTOS, coverPhoto } from "../../content/photos.mjs";

/* Short index blurbs (kept here so the data files stay lean). */
const MARKET_BLURB = {
  gatlinburg: "In-town walkability, National Park gateway demand, and the zoning that protects rentals.",
  "pigeon-forge": "Dollywood and family travel, a 12-guest occupancy cap, and grandfathered permits.",
  sevierville: "The emerging value market: newer builds, friendlier entry prices, strong revenue.",
  "wears-valley": "Unincorporated county rules, the Three Strikes policy, and a quieter, view-driven market.",
};
const AREA_BLURB = {
  townsend: "The peaceful side of the Smokies and gateway to Cades Cove. Blount County rules, handled.",
  "chalet-village": "Premium view chalets on Ski Mountain in Gatlinburg, with real winter demand.",
  "sky-harbor": "A central cabin community on the Spur between Pigeon Forge and Gatlinburg.",
  "english-mountain": "Secluded, gated, value-priced cabins on the Sevierville side of the Smokies.",
};

function marketCard(m) {
  const photo = (MARKET_PHOTOS[m.slug] && MARKET_PHOTOS[m.slug].hero) || PHOTOS.heroExterior;
  const href = `/vacation-rental-management-${m.slug}/`;
  return `<a class="area-card" href="${href}" reveal aria-label="${escapeAttr(m.city)} vacation rental management">
    ${coverPhoto(photo, { ratio: "16 / 9", cls: "area-card__art", label: `${m.city} cabin managed by Haven` })}
    <div class="area-card__body">
      <h3>${escapeHtml(m.city)}</h3>
      <p>${escapeHtml(MARKET_BLURB[m.slug] || `Full-service vacation rental management in ${m.city}.`)}</p>
      <span class="link-arrow">${escapeHtml(m.city)} management ${icon("arrowRight", { width: 16, height: 16 })}</span>
    </div>
  </a>`;
}

function areaCard(a) {
  const photo = PHOTOS[a.heroPhoto] || PHOTOS.heroExterior;
  const href = `/vacation-rental-management-${a.slug}/`;
  const tag = a.kind === "neighborhood" && a.associatedCity ? `${a.associatedCity} area` : `${a.county}`;
  return `<a class="area-card" href="${href}" reveal aria-label="${escapeAttr(a.name)} vacation rental management">
    ${coverPhoto(photo, { ratio: "16 / 9", cls: "area-card__art", label: `${a.name} cabin managed by Haven` })}
    <div class="area-card__body">
      <span class="blog-card__meta">${escapeHtml(tag)}</span>
      <h3>${escapeHtml(a.name)}</h3>
      <p>${escapeHtml(AREA_BLURB[a.slug] || a.heroSubhead)}</p>
      <span class="link-arrow">${escapeHtml(a.name)} management ${icon("arrowRight", { width: 16, height: 16 })}</span>
    </div>
  </a>`;
}

function linkRow(items) {
  return `<div class="xlinks">
    ${items.map((l) => `<a class="xlink" href="${l.href}">${escapeHtml(l.label)} ${icon("arrowRight", { width: 18, height: 18 })}</a>`).join("")}
  </div>`;
}

export function renderServiceAreas() {
  const path = "/service-areas/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: path },
  ];
  const title = "Smoky Mountain Service Areas | Haven Vacation Rentals";
  const description =
    "Every Smoky Mountain market and cabin community Haven manages: Gatlinburg, Pigeon Forge, Sevierville, Wears Valley, Townsend, and top resort communities. Find yours.";

  const cities = MARKETS.map((m) => ({
    "@type": "ListItem",
    name: `${m.city} vacation rental management`,
    url: `${SITE.baseUrl}/vacation-rental-management-${m.slug}/`,
  }));
  const extras = AREAS.map((a) => ({
    "@type": "ListItem",
    name: `${a.name} vacation rental management`,
    url: `${SITE.baseUrl}/vacation-rental-management-${a.slug}/`,
  }));

  const head = {
    title,
    description,
    path,
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        url: SITE.baseUrl + path,
        name: title,
        description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [...cities, ...extras].map((it, i) => ({ ...it, position: i + 1 })),
        },
      },
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}
<section class="hero photo-hero" style="--photo-hero:url('${PHOTOS.heroExterior}'),linear-gradient(150deg,#3c4143,#1d2327)">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:720px">
        <span class="eyebrow hero__eyebrow">Where we manage</span>
        <h1>Haven service areas across the Smoky Mountains</h1>
        <p class="hero__sub" style="max-width:62ch">We manage cabins and vacation rentals across Sevier County and the greater Smokies. Find your market or cabin community below, each with its own local rules, demand, and plan.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Primary markets", title: "The four core Smoky Mountain markets", intro: "Each has a dedicated page covering local rules, demand, and what your cabin can earn." })}
    <div class="grid grid--4">${MARKETS.map(marketCard).join("")}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "More areas & communities", title: "Additional markets and cabin communities", intro: "Beyond the four core cities, we manage the quiet-side Townsend market and the Smokies' best-known cabin communities." })}
    <div class="grid grid--4">${AREAS.map(areaCard).join("")}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Specialized management", title: "By property type", center: true })}
    ${linkRow(SEGMENTS.map((s) => ({ label: s.name, href: `/${s.slug}/` })))}
  </div>
</section>

<section class="section section--tint section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "Still deciding?", title: "Compare your options", center: true })}
    ${linkRow(COMPARISONS.map((c) => ({ label: c.name, href: `/${c.slug}/` })))}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/property-management/">See our full Smoky Mountain property management overview ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<section class="section section--tight"><div class="container">${ctaBand({
    title: "Not sure which applies to your cabin?",
    body: "Tell us where your property is and a local Haven advisor will walk through the local rules and what it can earn.",
  })}</div></section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
