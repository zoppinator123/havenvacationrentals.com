import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import { ridgeStrip } from "../art.mjs";
import { breadcrumbs, sectionHead, faqAccordion, ctaBand, leadForm, callout, crossLinks } from "../components.mjs";
import { organizationLd, websiteLd, localBusinessLd, serviceLd, faqLd, breadcrumbLd } from "../seo.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";

const REG_DETAIL = {
  "gatlinburg": {
    title: "Gatlinburg STR Permits, Inspections, Taxes & Rules",
    metaTitle: "Gatlinburg STR Permits, Taxes & Inspections | Haven",
    metaDescription: "Gatlinburg STR permit, inspection, tax, zoning, and renewal guide for cabin owners. See what to check before renting or buying.",
    h1: "Gatlinburg short-term rental permits, inspections, taxes, and rules",
    subhead: "A deeper owner guide to the compliance side of operating a Gatlinburg cabin, including the Tourist Residency Permit, fire and building inspection, lodging tax, zoning, stay limits, and the paperwork Haven manages for owners.",
    overview: [
      "Gatlinburg is one of the most established short-term rental markets in the Smokies, but it is still a city-regulated market. Owners need to confirm that the property is in a permitted zoning district, apply for the correct city permit, pass the inspection, keep renewals current, and collect and remit lodging taxes correctly across every booking channel.",
      "The biggest mistake owners make is assuming a Gatlinburg mailing address means the same rule set applies to every cabin. Some properties with Gatlinburg addresses sit outside city limits, which can put them under Sevier County rules instead. Before a purchase or management switch, jurisdiction and zoning should be confirmed first."
    ],
    permit: [
      "Gatlinburg requires a Tourist Residency Permit before a property can be operated as a short-term rental inside city limits. The current cited fee structure is $200 for a one or two bedroom unit, plus $75 for each additional bedroom. Applications are handled through the Gatlinburg Customer Service Center at 912 East Parkway or by mail to City Hall.",
      "For an owner, the practical work is not just filling out the form. The property needs to be correctly identified, the bedroom count has to match how the cabin will be marketed, inspection requirements need to be ready before the city visit, and the renewal calendar needs to be tracked so the permit does not lapse."
    ],
    inspection: [
      "Gatlinburg requires a fire and building inspection before the city issues the Tourist Residency Permit, and the permit renews annually. Inspectors are focused on life safety, access, and whether the home is being used in the way represented on the application.",
      "Before inspection, owners should review smoke and carbon monoxide protection, fire extinguishers, address visibility, parking layout, sleeping-room egress, decks and railings, electrical hazards, hot tub safety, and any obvious maintenance condition that could delay approval. Haven prepares the home, schedules the visit, handles access, and coordinates any corrections."
    ],
    taxes: [
      "Plan around a combined lodging tax burden of roughly 12.75% across Sevier County. The working breakdown is 9.75% state and local sales tax plus a 3% county lodging tax. Airbnb generally collects the 9.75% sales tax side automatically, but the 3% Sevier County lodging tax is self-remitted monthly to the Sevier County Trustee by the 20th. Vrbo and direct bookings can require the owner or manager to remit the full amount.",
      "The channel matters. A compliant setup has to map each booking source, confirm what that channel collects, collect the remaining tax where needed, and remit on schedule. Haven handles the channel-by-channel collection logic so owners are not left reconciling Airbnb, Vrbo, and direct reservations by hand."
    ],
    zoning: [
      "Short-term rentals are prohibited in Gatlinburg R-1A and R-2A zones. They are allowed in R-3 high-density residential, tourism development zones, and commercial C-1 and C-2 districts. That makes zoning one of the first items to verify before buying a cabin or assuming a property can be rented nightly.",
      "Gatlinburg also limits each short-term stay to 89 days or fewer, but there is no annual cap on the number of nights a compliant property can be rented. For revenue planning, that means the rule usually affects use classification more than nightly-rental earning potential."
    ],
    operating: [
      "An STR that is not the owner's principal residence can be reclassified from residential to commercial for property tax assessment purposes. A residential assessment ratio is generally 25%, while commercial is 40%, which can materially change the owner's tax bill. That should be modeled before purchase and reviewed after the cabin starts operating.",
      "The compliance rhythm is annual: keep the Tourist Residency Permit active, pass required inspections, renew business-related filings if applicable, keep accurate tax records, and watch for state or local rule changes. Gatlinburg remains STR-friendly, but owners should not treat compliance as a one-time setup."
    ],
    checklist: ["Confirm the parcel is inside Gatlinburg city limits", "Verify zoning before purchase or listing", "Apply for the Tourist Residency Permit", "Prepare for fire and building inspection", "Set up channel-specific lodging tax collection", "Track monthly county lodging tax remittance", "Calendar annual renewal and inspection dates", "Model possible commercial property tax treatment"],
    faqs: [
      { q: "What permit does Gatlinburg require for a cabin rental?", a: "Inside Gatlinburg city limits, owners need a Tourist Residency Permit before renting short term. The cited fee is $200 for one or two bedrooms plus $75 for each additional bedroom." },
      { q: "Can every Gatlinburg cabin be rented nightly?", a: "No. Zoning matters. STRs are prohibited in R-1A and R-2A and generally allowed in R-3, tourism development, and C-1 or C-2 commercial districts." },
      { q: "Does Gatlinburg have an annual night cap?", a: "No annual rental-night cap is cited here, but each individual stay must be 89 days or fewer." },
      { q: "Who handles the county lodging tax?", a: "Airbnb usually collects the 9.75% sales tax side, but the 3% Sevier County lodging tax is self-remitted monthly by the 20th. Haven handles that collection and remittance workflow for managed owners." }
    ]
  },
  "pigeon-forge": {
    title: "Pigeon Forge STR Permits, Inspections, Taxes & Rules",
    metaTitle: "Pigeon Forge STR Permits, Taxes & Rules | Haven",
    metaDescription: "Pigeon Forge STR guide for cabin owners: permits, inspections, occupancy caps, R-1 grandfathering, business license, and lodging taxes.",
    h1: "Pigeon Forge short-term rental permits, inspections, taxes, and rules",
    subhead: "A practical guide to the compliance work behind a Pigeon Forge cabin, including transient rental registration, STRU permitting, occupancy limits, R-1 grandfathering, business license requirements, and tax handling.",
    overview: [
      "Pigeon Forge is a powerful family and group-travel market, but the city has specific operating rules that affect how a cabin can be marketed and how much revenue it can safely pursue. The headline items are the Transient Rental Registration, city permit requirements, occupancy limits, business license, lodging taxes, and zoning restrictions in R-1 residential districts.",
      "The highest-risk issue is R-1 grandfathering. If a property is in R-1, do not assume it can operate as a new short-term rental. The status of the pre-2018 permit, whether it has remained active, and whether it transfers with the sale are all deal-level questions."
    ],
    permit: [
      "Pigeon Forge requires Transient Rental Registration, cited at $125 initially and $75 for annual renewal. The current site copy also cites a Short-Term Rental Unit permit application fee of $300. Owners should expect both the initial setup and annual renewal process to be tracked carefully.",
      "For Haven-managed homes, the permit process is treated as part of onboarding, not as a side project for the owner. We confirm the jurisdiction, collect property details, align the bedroom and occupancy setup with city rules, prepare the operating file, and keep renewal dates from being missed."
    ],
    inspection: [
      "Pigeon Forge compliance is not just paperwork. A rental has to be safe, correctly described, and ready for city review. The exact inspection path can depend on property type and city processing, but owners should prepare for life-safety review similar to the rest of Sevier County's STR environment.",
      "Before listing, the property should be reviewed for smoke alarms, CO alarms, extinguishers, egress, decks and rails, address visibility, parking, hot tub and grill safety, and maximum occupancy alignment. A failed or delayed inspection can stop revenue before the first booking lands."
    ],
    taxes: [
      "Pigeon Forge properties should be modeled with the roughly 12.75% combined lodging tax that applies across Sevier County: 9.75% state and local sales tax plus 3% county lodging tax. Airbnb often collects the sales tax portion, while the county lodging tax usually has to be self-remitted monthly. Vrbo and direct bookings require closer handling because the collection split can differ.",
      "The city business license is separate from lodging tax. The cited structure is a $35 base plus $3 per $1,000 of gross receipts. That means owners need clean gross-receipts records, not just payout deposits, because platform fees, taxes, and cleaning pass-throughs can make bookkeeping messy."
    ],
    zoning: [
      "New short-term rental development is restricted in R-1 residential districts. Properties operating as STRs before August 13, 2018 with a valid permit at that time may be grandfathered, but that status should be verified before purchase. A grandfathered property is only useful if the permit is active, transferable, and not at risk because of lapse or noncompliance.",
      "Outside R-1, STRs are generally permitted in R-2 and higher residential districts and in commercial zones. That still does not remove the need for registration, occupancy compliance, inspection readiness, taxes, and local management discipline."
    ],
    operating: [
      "Pigeon Forge caps occupancy at 2 guests per bed, 2 beds per room, and a total property maximum of 12 people. This directly affects listing setup, guest screening, pricing, and owner expectations. A cabin that physically sleeps more people cannot simply be marketed above the city cap.",
      "The operating risk is overpromising. If marketing photos, listing copy, bed counts, or pricing assumptions imply more occupancy than the city allows, the property can create compliance exposure and guest-service issues. Haven configures listings around legal occupancy first, then prices intelligently inside that limit."
    ],
    checklist: ["Confirm the parcel's Pigeon Forge zoning district", "If R-1, verify active grandfathered STR status before buying", "Confirm whether grandfathered rights transfer with the sale", "Complete Transient Rental Registration and STRU paperwork", "Set listing occupancy at or below the city cap", "Obtain or renew the city business license", "Set up lodging tax collection and monthly remittance", "Keep renewal dates and gross-receipts records organized"],
    faqs: [
      { q: "What is the Pigeon Forge occupancy cap?", a: "The city limits occupancy to 2 guests per bed, 2 beds per room, and 12 total guests per property." },
      { q: "Can a new STR operate in Pigeon Forge R-1 zoning?", a: "New STR development is restricted in R-1. Some properties operating before August 13, 2018 with valid permits may be grandfathered, but that status has to be verified." },
      { q: "Does Pigeon Forge require a business license?", a: "Yes. The cited city business license structure is $35 base plus $3 per $1,000 of gross receipts." },
      { q: "Why does grandfathering matter when buying?", a: "Because a grandfathered R-1 permit is only valuable if it is active, valid, and transferable. It should be verified before closing, not after." }
    ]
  },
  "sevierville": {
    title: "Sevierville STR Permits, Inspections, Taxes & Rules",
    metaTitle: "Sevierville STR Permits, Taxes & Rules | Haven",
    metaDescription: "Sevierville STR permit guide for cabin owners covering operational permits, fire inspections, business licenses, lodging taxes, and renewals.",
    h1: "Sevierville short-term rental permits, inspections, taxes, and rules",
    subhead: "A deeper compliance guide for Sevierville cabin owners, including the Short-Term Rental Operational Permit, annual fire inspection, city business license, lodging taxes, and the local process Haven manages.",
    overview: [
      "Sevierville is one of the strongest value markets in the Smokies because it combines newer construction, better entry pricing, and access to the same demand drivers that feed Gatlinburg and Pigeon Forge. The compliance path is manageable, but owners still need to file the operational permit, pass fire inspection, maintain a city business license when applicable, and handle lodging taxes correctly.",
      "The key first step is jurisdiction. A Sevierville mailing address can refer to the city or to unincorporated Sevier County. If the property sits inside Sevierville city limits, the city operational permit and fire department inspection apply. If it sits outside city limits, the county STRU permit program may apply instead."
    ],
    permit: [
      "Sevierville requires a Short-Term Rental Operational Permit for STRs inside city limits. The current cited fee is $150 for the initial application and $50 for annual renewal. The permit should be in place before operating, and the renewal should be tracked as part of the property's annual compliance calendar.",
      "Owners should expect the application to align with the property's legal use, bedroom setup, safety readiness, and contact information. Haven handles the filing and renewal management so the owner is not chasing city forms during peak booking season."
    ],
    inspection: [
      "A life-safety inspection by the Sevierville Fire Department is required before approval and again every year. The inspection is one of the most important operating gates because a property that cannot pass cannot move cleanly through permit approval.",
      "Preparation should cover working smoke alarms, CO alarms where needed, tagged extinguishers, safe egress from sleeping rooms, address visibility, clear access, safe deck and stair conditions, electrical hazards, hot tub safety, and grill placement. Haven prepares the home, schedules the inspection, and coordinates fixes before small issues become failed inspections."
    ],
    taxes: [
      "Sevierville cabins should be set up for the roughly 12.75% combined lodging tax that applies across Sevier County: 9.75% state and local sales tax plus 3% county lodging tax. Airbnb commonly collects the 9.75% piece, while the 3% county lodging tax is self-remitted monthly by the 20th. Vrbo and direct bookings can require owner or manager remittance of the entire tax stack.",
      "The compliance issue is not only the rate. It is knowing which platform collected what, collecting any missing tax from the guest, separating tax funds from owner revenue, and remitting accurately on schedule. Haven handles that setup across Airbnb, Vrbo, direct, and other channels."
    ],
    zoning: [
      "Compared with Gatlinburg and Pigeon Forge, Sevierville's headline compliance story is less about grandfathering and more about getting the operational permit and fire inspection right. Still, zoning and jurisdiction should be confirmed before purchase or launch because a property just outside city limits can fall under the county program instead.",
      "Owners buying newer cabins should also verify that the intended sleeping-room count, parking layout, septic capacity, and guest occupancy plan match what will be safe and defensible during review. A beautiful new build still needs to operate inside the rules."
    ],
    operating: [
      "Sevierville owners should keep four compliance calendars: operational permit renewal, annual fire inspection, business license renewal when applicable, and monthly lodging tax remittance. Missing any one of those creates avoidable risk.",
      "For a managed property, compliance should sit next to revenue management. Listing copy, maximum occupancy, cleaning standards, maintenance response, guest rules, and tax setup all support the permit file. Haven keeps those pieces together instead of treating compliance as a once-a-year scramble."
    ],
    checklist: ["Confirm whether the parcel is inside Sevierville city limits", "Apply for the Short-Term Rental Operational Permit", "Prepare for the Sevierville Fire Department inspection", "Obtain and maintain the city business license if required", "Set up lodging tax collection by channel", "Calendar monthly county lodging tax remittance", "Track annual permit renewal and inspection dates", "Keep owner records organized for gross receipts and filings"],
    faqs: [
      { q: "What STR permit does Sevierville require?", a: "Inside city limits, Sevierville requires a Short-Term Rental Operational Permit. The cited fee is $150 initially and $50 for annual renewal." },
      { q: "Does Sevierville require a fire inspection?", a: "Yes. A Sevierville Fire Department life-safety inspection is required before approval and again annually." },
      { q: "Does a Sevierville address always mean city rules apply?", a: "No. Confirm the parcel's actual jurisdiction. Some properties with Sevierville mailing addresses can sit outside city limits and fall under county rules instead." },
      { q: "What taxes apply to a Sevierville STR?", a: "Plan around the same roughly 12.75% combined lodging tax stack used across Sevier County, with channel-specific collection and remittance responsibilities." }
    ]
  },
  "wears-valley": {
    title: "Wears Valley STR Permits, Inspections, Taxes & Rules",
    metaTitle: "Wears Valley STR Permits, Taxes & Rules | Haven",
    metaDescription: "Wears Valley STR compliance guide for cabin owners: county permits, inspections, Three Strikes, transfer rules, taxes, and safety checklist.",
    h1: "Wears Valley short-term rental permits, inspections, taxes, and county rules",
    subhead: "A deep owner guide to the Sevier County permit program that applies across much of Wears Valley, including STRU permits, annual inspections, life-safety requirements, Three Strikes, transferability, and tax handling.",
    overview: [
      "Wears Valley is usually an unincorporated Sevier County market, which means county rules apply instead of Gatlinburg, Pigeon Forge, or Sevierville city rules. That is good for many owners, but it also means you need to understand the county Short-Term Rental Unit permit program and the life-safety inspection process that has been in effect since January 1, 2024.",
      "The first rule is simple: do not rely on the mailing address. A cabin can show a Pigeon Forge, Gatlinburg, or Sevierville address and still sit outside city limits. In Wears Valley, confirm the parcel on the Sevier County GIS map before you file paperwork, buy a property, or assume which ordinance applies."
    ],
    permit: [
      "Unincorporated Sevier County requires an annual Short-Term Rental Unit permit from the Sevier County Fire Marshal's Office. The cited permit cost is $250 per year for properties sleeping 12 or fewer, and $250 plus $25 per additional occupant for properties sleeping 13 or more. Operating without the permit can trigger a $50 per day penalty.",
      "County permits can transfer with a sale if they are kept current and do not lapse. That makes permit discipline a resale-value issue, not just an operating issue. A buyer will care whether the permit is active, whether inspection history is clean, and whether there are unresolved violations."
    ],
    inspection: [
      "The county permit is issued only after the property passes a life-safety inspection. Sevier County hired full-time inspectors working by district, and the inspection checklist is detailed enough that owners should prepare before the visit rather than reacting afterward.",
      "Key inspection items include interconnected UL-217 smoke alarms, carbon monoxide alarms within 15 feet of every bedroom door, at least one tagged 2A:10BC fire extinguisher on every level, proper egress from every sleeping room, street numbers at least four inches tall and visible from the road, gas grills on 60-minute timers and at least 18 inches from the structure, and sprinklers for homes sleeping more than 12. Sleeping rooms can include rooms with sofa beds if they are marketed or used that way."
    ],
    taxes: [
      "Wears Valley rentals should be set up for roughly 12.75% combined lodging tax across Sevier County: 9.75% state and local sales tax plus the 3% county lodging tax. Airbnb often collects the sales tax portion automatically, while the 3% county lodging tax is self-remitted monthly to the Sevier County Trustee by the 20th. Vrbo and direct bookings require closer setup because the host or manager may need to remit everything.",
      "The safest tax workflow is channel-specific. Identify what each platform collects, collect anything missing from the guest, reserve those funds outside owner revenue, and remit on schedule. Haven handles the setup and ongoing remittance discipline for managed homes."
    ],
    zoning: [
      "Wears Valley's compliance question is usually jurisdiction first, then county permit status. Because the area is unincorporated, owners are generally dealing with Sevier County rather than a city zoning department. But parcel specifics still matter, especially for access, fire safety, sleeping capacity, septic capacity, parking, and whether the cabin has any HOA or deed restrictions.",
      "For buyers, the underwriting question is not just what the cabin earned last year. It is whether the property can keep earning under the current county permit program, pass inspection, support the advertised occupancy, and avoid violations that could threaten the permit."
    ],
    operating: [
      "Sevier County has a Three Strikes policy under T.C.A. 13-7-604. A permit can be revoked after three documented violations for noise, trash, or parking. For out-of-state owners, that makes local response time more than a guest-service feature. It is a compliance protection.",
      "Haven's role is to keep the home inspection-ready, maintain the permit, answer guest and neighbor issues quickly, and prevent ordinary operating problems from becoming documented violations. In Wears Valley, fast local management is part of the regulatory moat."
    ],
    checklist: ["Verify jurisdiction on the Sevier County GIS map", "Apply for the county STRU operational permit", "Confirm legal sleeping capacity before marketing", "Prepare the full life-safety inspection checklist", "Install required smoke, CO, extinguisher, grill, egress, and address-number items", "Set up lodging tax collection and remittance", "Create a guest-rule plan for noise, trash, and parking", "Keep the permit current so it remains transferable"],
    faqs: [
      { q: "Does Wears Valley follow city or county STR rules?", a: "Most Wears Valley cabins are in unincorporated Sevier County, so county rules apply. Always confirm the parcel's actual jurisdiction instead of relying on the mailing address." },
      { q: "What does the county STRU permit cost?", a: "The cited county permit cost is $250 per year for properties sleeping 12 or fewer, and $250 plus $25 per additional occupant for 13 or more." },
      { q: "What is the Three Strikes policy?", a: "Under T.C.A. 13-7-604, the county can revoke a permit after three documented violations for noise, trash, or parking." },
      { q: "Can a Wears Valley STR permit transfer when the cabin sells?", a: "County permits can transfer if they are kept current and do not lapse, which makes permit management important for resale value." }
    ]
  }
};

function tableRows(items = []) {
  return `<div class="steps">
    ${items.map((item, i) => `<div class="step" reveal><h3>${String(i + 1).padStart(2, "0")}</h3><p>${escapeHtml(item)}</p></div>`).join("")}
  </div>`;
}

function detailSection({ eyebrow, title, paragraphs: ps }) {
  return `<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">${escapeHtml(eyebrow)}</span>
      <h2>${escapeHtml(title)}</h2>
      ${paragraphs(ps)}
    </div>
  </div>
</section>`;
}

function siblingRegLinks(currentSlug) {
  return MARKETS.filter((m) => m.slug !== currentSlug).map((m) => ({
    label: `${m.city} STR regulations`,
    href: `/vacation-rental-management-${m.slug}-regulations-permits-taxes/`,
  }));
}

export function renderMarketRegulationPage(market) {
  const copy = REG_DETAIL[market.slug];
  if (!copy) throw new Error(`Missing regulation detail copy for ${market.slug}`);

  const path = `/vacation-rental-management-${market.slug}-regulations-permits-taxes/`;
  const marketPath = `/vacation-rental-management-${market.slug}/`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Property Management", href: "/property-management/" },
    { label: market.city, href: marketPath },
    { label: "Permits, taxes, and rules", href: path },
  ];

  const head = {
    title: copy.metaTitle,
    description: copy.metaDescription,
    path,
    ogType: "article",
    ogImage: `/assets/og/${market.slug}.png`,
    jsonLd: [
      organizationLd(),
      websiteLd(),
      localBusinessLd({ path, cityName: market.city, region: market.region, description: copy.metaDescription }),
      serviceLd({ path, cityName: market.city, description: copy.metaDescription }),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: copy.title,
        description: copy.metaDescription,
        author: { "@id": `${SITE.baseUrl}/#organization` },
        publisher: { "@id": `${SITE.baseUrl}/#organization` },
        mainEntityOfPage: SITE.baseUrl + path,
        articleSection: `${market.city} short-term rental regulations`,
        inLanguage: "en-US",
      },
      faqLd(copy.faqs),
      breadcrumbLd(crumbs),
    ],
  };

  const currentSummary = market.regItems.map((item) => `<div class="reg" reveal><h3>${icon(item.icon || "scale", { width: 18, height: 18 })}${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></div>`).join("");

  const body = `
${breadcrumbs(crumbs)}
<section class="hero" style="padding-block:0">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.75rem,7vw,5rem)">
      <div class="stack" style="max-width:840px">
        <span class="eyebrow hero__eyebrow">${escapeHtml(market.city)} owner compliance guide</span>
        <h1>${escapeHtml(copy.h1)}</h1>
        <p class="hero__sub" style="max-width:68ch">${escapeHtml(copy.subhead)}</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="${marketPath}">${escapeHtml(`${market.city} management page`)} ${icon("arrowRight", { width: 16, height: 16 })}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="snapshot" style="align-items:start">
      <div class="prose stack">
        <span class="eyebrow">Compliance overview</span>
        <h2>${escapeHtml(`What ${market.city} owners need to know first`)}</h2>
        ${paragraphs(copy.overview)}
      </div>
      <div class="card" reveal>
        <span class="tag">${icon("clipboardCheck", { width: 14, height: 14 })} Owner checklist</span>
        <ul style="margin:1rem 0 0;padding-left:1.1rem;display:grid;gap:.55rem">
          ${copy.checklist.slice(0, 6).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Current summary", title: `The short version for ${market.city}` })}
    <div class="reg-grid">${currentSummary}</div>
    <div style="margin-top:var(--space-md)">${callout(market.regCallout)}</div>
  </div>
</section>

${detailSection({ eyebrow: "Permits", title: `${market.city} permit and registration requirements`, paragraphs: copy.permit })}
${detailSection({ eyebrow: "Inspections", title: "Inspection readiness and life-safety items", paragraphs: copy.inspection })}
${detailSection({ eyebrow: "Taxes", title: "Lodging tax, sales tax, and remittance workflow", paragraphs: copy.taxes })}
${detailSection({ eyebrow: "Zoning", title: "Jurisdiction, zoning, and buying diligence", paragraphs: copy.zoning })}
${detailSection({ eyebrow: "Operations", title: "How to stay compliant after launch", paragraphs: copy.operating })}

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Checklist", title: `${market.city} STR compliance checklist`, intro: "Use this as a practical starting point before purchase, onboarding, or annual renewal." })}
    ${tableRows(copy.checklist)}
  </div>
</section>

<section class="section section--tight"><div class="container">${ctaBand({
    title: `Want Haven to handle ${market.city} compliance?`,
    body: "We manage permits, inspections, tax setup, renewals, guest rules, and the local response system that keeps your cabin compliant and earning.",
  })}</div></section>

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: "FAQ", title: `${market.city} STR permits and rules, answered`, center: true })}
    ${faqAccordion(copy.faqs, `faq-${market.slug}-reg`)}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">Next step</span>
        <h2>${escapeHtml(`Talk to Haven about your ${market.city} property`)}</h2>
        <p class="lede">We will review your market, your permit situation, and what needs to happen before or after launch.</p>
        <p><a class="link-arrow" href="${marketPath}">Back to ${escapeHtml(market.city)} vacation rental management ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
      </div>
      ${leadForm({ heading: `Ask about ${market.city} permits, taxes, or management`, marketDefault: market.city })}
    </div>
  </div>
</section>

<section class="section section--tint section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "Other markets", title: "Compare STR rules across the Smokies", center: true })}
    ${crossLinks(siblingRegLinks(market.slug))}
    <p class="form-disclaimer center" style="margin-top:var(--space-md)">This guide is general information current as of mid-2026, not legal advice. Rules and fees change. Confirm details with the relevant city or county office, or let Haven handle compliance for you.</p>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: marketPath }) };
}
