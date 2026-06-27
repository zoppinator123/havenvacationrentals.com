import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml } from "../util.mjs";
import { ridgeStrip } from "../art.mjs";
import { breadcrumbs, sectionHead, faqAccordion, ctaBand, crossLinks } from "../components.mjs";
import { organizationLd, websiteLd, faqLd, breadcrumbLd } from "../seo.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";

/* /sevier-county-short-term-rental-regulations-2026-guide/
   A county-level reference hub that links into each market page for detail.
   Summary-level prose (kept distinct from the geo pages to avoid duplication). */

const FAQS = [
  { q: "Do I need a permit to run a short-term rental in Sevier County?", a: ["Yes. Every short-term rental in the area needs a permit, but which one depends on jurisdiction. Inside city limits you apply to the city (Gatlinburg, Pigeon Forge, or Sevierville). In unincorporated areas like Wears Valley you apply to Sevier County. A passed life-safety inspection is part of every process."] },
  { q: "How do I know if my cabin is inside city limits or in the county?", a: ["A mailing address does not decide it. A cabin with a Pigeon Forge or Gatlinburg address can still sit in unincorporated Sevier County, which means county rules apply instead of city rules. Check the parcel on the Sevier County GIS map before you file any paperwork, or let Haven confirm it for you."] },
  { q: "What taxes apply to a Smoky Mountain vacation rental?", a: ["Combined lodging tax runs about 12.75% across Sevier County: 9.75% state and local sales tax plus a 3% county lodging tax. Airbnb collects the 9.75% automatically, but the 3% county lodging tax is self-remitted monthly to the Sevier County Trustee by the 20th. On Vrbo and direct bookings the host remits everything. Haven handles collection and remittance on every channel."] },
  { q: "What does a short-term rental inspection check?", a: ["Inspectors focus on life safety: interconnected smoke alarms, carbon monoxide alarms near every bedroom, a tagged fire extinguisher on each level, proper egress from every sleeping room, clearly visible street numbers, safe gas-grill placement, and fire sprinklers for larger homes. Haven prepares your cabin and stands in for the inspection so it passes the first time."] },
  { q: "What is the Three Strikes policy?", a: ["In unincorporated Sevier County, a Three Strikes policy (T.C.A. 13-7-604) allows a permit to be revoked after three documented violations for noise, trash, or parking. That makes a responsive local manager who can act fast genuinely valuable. Haven monitors and responds so small issues never become strikes."] },
  { q: "Does my permit transfer if I sell the property?", a: ["In the county program, a permit that has been kept current and never lapsed can pass with the sale of the property. Keeping your permit and inspection in good standing protects both your income and your resale value. Haven keeps yours active and inspection-ready."] },
];

export function renderRegGuide() {
  const path = "/sevier-county-short-term-rental-regulations-2026-guide/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: "Sevier County STR Regulations (2026)", href: path },
  ];
  const title = "Sevier County Short-Term Rental Regulations: 2026 Guide";
  const description =
    "The 2026 guide to short-term rental rules in Sevier County, TN: permits, taxes, zoning, and inspections for Gatlinburg, Pigeon Forge, Sevierville, and Wears Valley.";

  const head = {
    title: `${title} | Haven`,
    description,
    path,
    ogType: "article",
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: { "@id": `${SITE.baseUrl}/#organization` },
        publisher: { "@id": `${SITE.baseUrl}/#organization` },
        mainEntityOfPage: SITE.baseUrl + path,
        articleSection: "Short-term rental regulations",
      },
      faqLd(FAQS),
      breadcrumbLd(crumbs),
    ],
  };

  const cityCards = MARKETS.map((m) => {
    const href = `/vacation-rental-management-${m.slug}/`;
    const top = m.regItems[0];
    return `<div class="card" reveal>
      <span class="tag">${icon("mapPin", { width: 14, height: 14 })} ${escapeHtml(m.city)}</span>
      <h3 style="margin-top:.6rem">${escapeHtml(m.city)} rules in brief</h3>
      <p>${escapeHtml(top.body)}</p>
      <p style="margin-top:.85rem"><a class="link-arrow" href="${href}">Full ${escapeHtml(m.city)} guide and management ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
    </div>`;
  }).join("");

  const body = `
${breadcrumbs(crumbs)}
<section class="hero" style="padding-block:0">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:760px">
        <span class="eyebrow hero__eyebrow">Owner guide · Updated 2026</span>
        <h1>Sevier County Short-Term Rental Regulations: 2026 Guide</h1>
        <p class="hero__sub" style="max-width:62ch">Permits, taxes, zoning, and inspections for Gatlinburg, Pigeon Forge, Sevierville, and Wears Valley, in plain English for owners. The rules differ by jurisdiction, so start by confirming where your cabin actually sits.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Start here</span>
      <h2>City limits or county? It changes everything</h2>
      <p>Sevier County has two layers of short-term rental rules. Properties inside Gatlinburg, Pigeon Forge, or Sevierville follow that city's ordinance. Properties in unincorporated areas, including Wears Valley, follow Sevier County rules instead. A mailing address does not decide which applies. A cabin can have a Pigeon Forge or Gatlinburg address and still sit in the county.</p>
      <p>Before you buy, file, or switch managers, confirm the parcel's jurisdiction on the Sevier County GIS map. Get this one fact right and the rest of the process is straightforward. Get it wrong and you can apply for the wrong permit entirely.</p>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "By market", title: "The rules in brief, market by market" })}
    <div class="grid grid--2">${cityCards}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">County-wide</span>
      <h2>What applies almost everywhere</h2>
      <p><strong>Taxes.</strong> Combined lodging tax runs about 12.75% across Sevier County: 9.75% state and local sales tax plus a 3% county lodging tax. Airbnb collects the 9.75% automatically. The 3% county lodging tax is self-remitted monthly to the Sevier County Trustee by the 20th, and on Vrbo or direct bookings the host remits all of it.</p>
      <p><strong>The county permit program.</strong> Since January 1, 2024, unincorporated Sevier County requires an annual Short-Term Rental Unit permit from the Fire Marshal's Office. It is $250 per year for properties sleeping 12 or fewer, and $250 plus $25 per additional occupant for 13 or more. Operating without one carries a $50 per day penalty.</p>
      <p><strong>Life-safety inspections.</strong> Every jurisdiction requires a passed life-safety inspection before issuing a permit, then annually. The county hired eight full-time inspectors working by district to keep up. Inspectors look for interconnected UL-217 smoke alarms, carbon monoxide alarms within 15 feet of every bedroom door, at least one tagged 2A:10BC fire extinguisher per level, proper egress from every sleeping room (including rooms with sofa beds), street numbers at least four inches tall, gas grills on a 60-minute shut-off timer placed at least 18 inches from any structure, and fire sprinklers for homes sleeping more than 12.</p>
      <p><strong>Three Strikes.</strong> In the county, a Three Strikes policy (T.C.A. 13-7-604) allows permit revocation after three documented violations for noise, trash, or parking. A responsive local manager is the best protection against ever reaching a strike.</p>
    </div>
  </div>
</section>

<section class="section section--tight"><div class="container">${ctaBand({
    title: "Let Haven handle compliance for you",
    body: "Permits, inspections, taxes, and the fast local response the county expects. We manage all of it so your cabin stays compliant and earning.",
  })}</div></section>

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: "Common owner questions", center: true })}
    ${faqAccordion(FAQS, "faq-regguide")}
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "Local management", title: "Get the full guide for your market", center: true })}
    ${crossLinks(MARKETS.map((m) => ({ label: `${m.city} management`, href: `/vacation-rental-management-${m.slug}/` })))}
    <p class="form-disclaimer center" style="margin-top:var(--space-md)">This guide is general information current as of mid-2026, not legal advice. Rules change. Confirm details with the relevant city or county office, or let Haven handle compliance for you.</p>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: "/blog/" }) };
}
