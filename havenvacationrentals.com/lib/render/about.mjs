import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import {
  breadcrumbs, sectionHead, statsRow, crossLinks, leadForm, ctaBand,
} from "../components.mjs";
import {
  organizationLd, websiteLd, localBusinessLd, breadcrumbLd,
} from "../seo.mjs";
import { SITE, PROOF, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, PHOTO_FALLBACK, coverPhoto } from "../../content/photos.mjs";

/* Five core values, straight from "The Haven Standard" (blog). */
const VALUES = [
  { icon: "shield", title: "Faithful Stewardship", desc: "We treat your property as a sacred trust. Your investment is not a line item on a spreadsheet, it is someone's livelihood, and we manage it that way." },
  { icon: "award", title: "Excellence", desc: "We hold ourselves to a higher standard on every clean, every price change, and every guest message. Good enough is never the goal." },
  { icon: "leaf", title: "Humility", desc: "We stay coachable, own our mistakes, and put the owner and the guest ahead of our ego. The work speaks louder than we do." },
  { icon: "users", title: "Teamwork", desc: "Pricing, cleaning, maintenance, and guest care are one connected operation. When your cabin needs something, the whole team moves." },
  { icon: "chartUp", title: "Continuous Improvement", desc: "We iterate on our operations every single week. What worked last season is the floor, not the ceiling." },
];

/* Third-party recognition, from "Haven Joins Comparent's Top 1% and Top 100 List". */
const RECOGNITION = [
  { icon: "award", title: "Comparent Market Leader", desc: "Ranked in the top 1% of the more than 6,200 vacation rental managers Comparent tracks, scored on verified guest and owner reviews." },
  { icon: "star", title: "Comparent 100", desc: "Named to the annual ranking of the largest professional vacation rental management companies in the United States, while managing only in the Smokies." },
  { icon: "mapPin", title: "Airbnb Superhost, top 1% worldwide", desc: "Haven listings hold Superhost status and consistently rank in the top 1%, 5%, and 10% of Airbnb homes worldwide." },
];

/* Two operating principles, from the homepage About section. */
const PRINCIPLES = [
  { title: "Run it like we own it", body: "Keep costs low. Fix issues fast. Book it full." },
  { title: "Wow our guests", body: "Anticipate their needs. Communicate clearly. Make them want to come back." },
];

function iconCards(items) {
  return `<div class="grid grid--3">
    ${items.map((c) => `<div class="card card--accent" reveal>
      <span class="card__icon">${icon(c.icon, { width: 26, height: 26 })}</span>
      <h3>${escapeHtml(c.title)}</h3>
      <p>${escapeHtml(c.desc)}</p>
    </div>`).join("")}
  </div>`;
}

export function renderAbout() {
  const path = "/about-us/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: path },
  ];
  const title = "About Haven Vacation Rentals | Smoky Mountain Team";
  const description =
    "Meet Haven Vacation Rentals, a local, top 1% Smoky Mountain property management team. Our story, mission, core values, and how we help cabin owners earn more.";

  const head = {
    title,
    description,
    path,
    ogImage: "/assets/og/home.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      localBusinessLd({ path, cityName: "Sevierville", region: "TN", description }),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: SITE.baseUrl + path,
        name: title,
        description,
      },
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<!-- HERO -->
<section class="hero photo-hero" style="--photo-hero:url('${PHOTOS.heroExterior}'),${PHOTO_FALLBACK}">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:720px">
        <span class="eyebrow hero__eyebrow">About Haven</span>
        <h1>The local team behind your Smoky Mountain cabin</h1>
        <p class="hero__sub" style="max-width:62ch">Haven is a local, full-service vacation rental management company built to do right by owners and guests in the Smoky Mountains. Here is who we are, what we believe, and how we operate.</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- OUR STORY -->
<section class="section about-section">
  <div class="container">
    <div class="snapshot about-snapshot" style="align-items:center">
      <div class="prose stack">
        <span class="eyebrow">Our story</span>
        <h2>We built Haven to fix property management</h2>
        ${paragraphs([
          "If you own a vacation rental in the Smoky Mountains, you have probably been pitched by a dozen management companies. Big names, slick websites, and promises of top-tier revenue with zero effort. We started Haven because we saw a massive problem behind those promises. Owners were being treated like account numbers, with national companies managing their properties from thousands of miles away.",
          "On the other side, local options often had good intentions but lacked the systems, data, and strategy to actually drive revenue. There was a gap between what owners were promised and what they experienced, and it was costing them real money. Haven was built to close that gap with execution, not just promises.",
          "As property owners ourselves, we know how important it is for each home to earn as much as it can without taking up a bunch of your time. We are based right here in Sevier County, we charge one simple flat fee, and when something needs a person on-site, we are minutes from your door, not three time zones away in a national call center.",
        ])}
        <div class="local-proof">
          <span>${icon("mapPin", { width: 18, height: 18 })}</span>
          <b>Locally owned and operated in the Smokies since ${SITE.foundingYear}</b>
        </div>
      </div>
      <div class="about-collage about-collage--pair">
        ${coverPhoto(PHOTOS.aboutFamily, { ratio: "4 / 3", cls: "about-collage__photo about-collage__family", label: "The Zoppa family, owners of Haven Vacation Rentals" })}
        ${coverPhoto(PHOTOS.aboutDillon, { ratio: "4 / 3", cls: "about-collage__photo about-collage__family", label: "The Dillon family, part of the Haven team" })}
      </div>
    </div>
  </div>
</section>

<!-- BY THE NUMBERS -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "By the numbers", title: "What execution actually looks like", intro: "The Smoky Mountains are one of the strongest vacation rental markets in the country. Market-wide occupancy sits near 55%. Haven's portfolio runs at roughly 70%, and revenue runs about 30% ahead of the market.", center: true })}
    ${statsRow(PROOF.map((p) => ({ value: p.value, label: p.label })), { count: 4 })}
  </div>
</section>

<!-- MISSION -->
<section class="section">
  <div class="container">
    <div class="prose stack" style="text-align:center;max-width:820px;margin-inline:auto">
      <span class="eyebrow">Our mission</span>
      <h2>Why Haven exists</h2>
      <p class="lede">Haven exists to honor Christ by serving and blessing people. That purpose drives every operational decision we make, from who we hire to how we price your property to what happens when an AC unit goes out at 2 AM.</p>
      <p>It does not mean we are soft. It means we hold ourselves to a higher standard, and we treat your property as a sacred trust. Five core values are the filter for every process change and every hard conversation.</p>
    </div>
  </div>
</section>

<!-- CORE VALUES -->
<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: "Core values", title: "The standard behind every decision" })}
    ${iconCards(VALUES)}
  </div>
</section>

<!-- HOW WE OPERATE -->
<section class="section">
  <div class="container">
    <div class="prose stack" style="margin-bottom:var(--space-lg)">
      <span class="eyebrow">How we operate</span>
      <h2>Two rules run everything we do</h2>
      <p>We price your property every single day, not weekly and not monthly. We run a professional-grade cleaning operation held to our exact standards, with a see-it-clean photo protocol before every check-in. We manage proactive maintenance in-house so we can catch issues before they become bad reviews. And we communicate with data, so you hear from us with real performance updates, not just when something goes wrong.</p>
    </div>
    <div class="about-principles">
      ${PRINCIPLES.map((p) => `<div><b>${escapeHtml(p.title)}.</b><span>${escapeHtml(p.body)}</span></div>`).join("")}
    </div>
  </div>
</section>

<!-- CTA BAND -->
<section class="section--tight"><div class="container">${ctaBand({
    title: "See what a top 1% local team can do for your cabin",
    body: "Book a no-pressure call with a local Haven advisor for an honest look at your property, your market, and what it can realistically earn.",
  })}</div></section>

<!-- RECOGNITION -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Recognition", title: "Independently ranked in the top 1%", intro: "We do not just say we are good at this. Comparent, the largest independent directory of vacation rental managers in the country, scores companies on verified guest and owner reviews. Here is where Haven lands.", center: true })}
    ${iconCards(RECOGNITION)}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/haven-joins-comparents-top-1-and-top-100-list/">Read how the Comparent rankings work ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- SERVICE AREAS -->
<section class="section section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "Where we manage", title: "Local management across the Smokies", center: true })}
    ${crossLinks(MARKETS.map((m) => ({ label: `${m.city} vacation rental management`, href: `/vacation-rental-management-${m.slug}/` })))}
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/property-management/">See all Smoky Mountain property management ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- FINAL CTA + FORM -->
<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">Let's talk</span>
        <h2>Meet the team that treats your cabin like our own</h2>
        <p class="lede">Tell us a little about your property and a local Haven advisor will reach out with a realistic look at what it can earn. No pressure, no obligation, and no national call center.</p>
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
