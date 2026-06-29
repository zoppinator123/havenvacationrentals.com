import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, escapeAttr, paragraphs } from "../util.mjs";
import {
  sectionHead, serviceGrid, pillars, faqAccordion, leadForm, videoTestimonials,
} from "../components.mjs";
import { organizationLd, websiteLd, localBusinessLd, faqLd } from "../seo.mjs";
import { SITE, SERVICES, PILLARS, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, MARKET_PHOTOS, coverPhoto, PHOTO_FALLBACK } from "../../content/photos.mjs";

/* Real Haven photography, resolved by content/photos.mjs (self-hosted file if
   present in assets/photos/, else the live WordPress URL). Rendered as a
   background-image with a gradient fallback so a missing asset never shows a
   broken-image icon. */
const WP = "https://havenvacationrentals.com/wp-content/uploads"; // testimonial avatars
const FALLBACK = PHOTO_FALLBACK;
const photo = coverPhoto;
const PHOTO = {
  hero:  PHOTOS.homeHero,        // supplied cabin-at-dusk hero
  howBg: PHOTOS.heroExterior,
  difA:  PHOTOS.interiorLiving,  // great room
  difB:  PHOTOS.interiorDetail,
  step1: PHOTOS.deckView,
  step2: PHOTOS.interiorLiving,
  step3: PHOTOS.interiorKitchen,
  step4: PHOTOS.interiorDetail,
  contact: PHOTOS.contactBg,
  aboutA: PHOTOS.aboutFamily,
  aboutB: PHOTOS.aboutFamilyAlt,
  aboutC: PHOTOS.aboutBedroom,
};

/* Per-market hero photo + one-line angle for the Service Areas cards. */
const MARKET_CARD = {
  gatlinburg: { photo: MARKET_PHOTOS.gatlinburg.hero, blurb: "In-town walkability and the zoning angle that protects rentals." },
  "pigeon-forge": { photo: MARKET_PHOTOS["pigeon-forge"].hero, blurb: "High demand, occupancy caps, and grandfathering you need to know." },
  sevierville: { photo: MARKET_PHOTOS.sevierville.hero, blurb: "The emerging value market with room to run on revenue." },
  "wears-valley": { photo: MARKET_PHOTOS["wears-valley"].hero, blurb: "County rules, the Three Strikes policy, and an uncontested gap." },
};

const HOW = [
  { photo: PHOTO.step1, title: "We rent it out", body: "Professional listings and marketing across Airbnb, Vrbo, Booking.com, and direct." },
  { photo: PHOTO.step2, title: "We manage it", body: "Inspected turnovers, trusted local maintenance, and smart human pricing every day." },
  { photo: PHOTO.step3, title: "We wow guests", body: "24/7 communication and five-star care that earns reviews, rebookings, and referrals." },
  { photo: PHOTO.step4, title: "You get paid", body: "Clean monthly statements and direct-deposit payouts. The math is always honest." },
];

const NUMBERS = [
  { value: "Airbnb", label: "Superhost" },
  { value: "+30%", label: "Revenue ahead of the market" },
  { value: "4.9★", label: "Across 4,000+ Google reviews" },
  { value: "Top 1%", label: "Of Airbnb listings worldwide" },
];

/* Owner video testimonials (YouTube, click-to-load). */
const VIDEOS = [
  { id: "iiEjEci1IlA", title: "Owner story", caption: "A Smoky Mountain owner on why they trust Haven with their cabin." },
  { id: "w_My74hQY_Y", title: "Owner story", caption: "An owner shares what changed after switching to Haven." },
];

/* Real, attributed owner/industry testimonials (from the live Haven site). */
const STORIES = [
  {
    quote: "After switching to Haven, his revenue was way up and his guests were leaving glowing reviews. They are by far the best property management company in the Smokies.",
    name: "Avery Carl", role: "The Short Term Shop", avatar: `${WP}/2021/07/avery-150x150.png`,
  },
  {
    quote: "Working with Haven was an excellent decision. They save us tons of time and headaches, and generate much more revenue than we could managing ourselves. Honest and trustworthy.",
    name: "Alexis King", role: "Terminus Real Estate", avatar: `${WP}/2020/10/Alexis-Haven-Testimonial-circle.png`,
  },
];

/* Wrap a key phrase of the H1 in the coral accent, keeping everything escaped. */
function accentH1(h1) {
  const safe = escapeHtml(h1);
  const phrase = "earns more";
  return safe.includes(phrase)
    ? safe.replace(phrase, `<span class="accent-text">${phrase}</span>`)
    : safe;
}

const COMPARE = [
  { label: "Local team, minutes from your cabin", self: false, national: false, haven: true },
  { label: "Rates set by a real revenue manager", self: false, national: "Algorithm", haven: true },
  { label: "24/7 five-star guest communication", self: false, national: true, haven: true },
  { label: "Time you spend each week", self: "All of it", national: "Some", haven: "Almost none" },
  { label: "Revenue vs. the market", self: "At or below", national: "About market", haven: "~30% ahead" },
];

function compareCell(v) {
  if (v === true) return `<td class="yes">${icon("check", { width: 20, height: 20 })}<span class="visually-hidden">Yes</span></td>`;
  if (v === false) return `<td class="no">${icon("close", { width: 18, height: 18 })}<span class="visually-hidden">No</span></td>`;
  return `<td>${escapeHtml(String(v))}</td>`;
}

function comparisonTable() {
  return `<div class="compare-wrap">
    <table class="compare">
      <thead>
        <tr><th scope="col"><span class="visually-hidden">Capability</span></th>
          <th scope="col">Self-managing</th>
          <th scope="col">National manager</th>
          <th scope="col" class="compare__haven">Haven</th></tr>
      </thead>
      <tbody>
        ${COMPARE.map((r) => `<tr><th scope="row">${escapeHtml(r.label)}</th>${compareCell(r.self)}${compareCell(r.national)}<td class="compare__haven">${typeof r.haven === "boolean" ? (r.haven ? `${icon("check", { width: 20, height: 20 })}<span class="visually-hidden">Yes</span>` : "") : escapeHtml(String(r.haven))}</td></tr>`).join("")}
      </tbody>
    </table>
  </div>`;
}

function marketCards() {
  return `<div class="grid grid--4">
    ${MARKETS.map((m) => {
      const c = MARKET_CARD[m.slug] || {};
      const href = `/vacation-rental-management-${m.slug}/`;
      return `<a class="area-card" href="${href}" reveal aria-label="${escapeAttr(m.city)} vacation rental management">
        ${photo(c.photo, { ratio: "4 / 5", cls: "area-card__art", label: `${m.city} cabin managed by Haven` })}
        <div class="area-card__body">
          <h3>${escapeHtml(m.city)}</h3>
          <p>${escapeHtml(c.blurb || `Full-service vacation rental management in ${m.city}.`)}</p>
          <span class="link-arrow">Explore ${icon("arrowRight", { width: 16, height: 16 })}</span>
        </div>
      </a>`;
    }).join("")}
  </div>`;
}

export function renderHome(copy) {
  const path = "/";
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
<!-- HERO -->
<section class="hero hero--light" style="--home-hero-bg:url('${PHOTOS.wearsValleyCabin}')">
  <div class="container">
    <div class="hero__inner">
      <div class="stack">
        <span class="eyebrow hero__eyebrow">${escapeHtml(copy.heroEyebrow)}</span>
        <h1>${accentH1(copy.h1)}</h1>
        <p class="hero__sub">${escapeHtml(copy.heroSubhead)} One honest flat fee.</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost btn--lg" href="#how">See how it works</a>
        </div>
        <div class="rating-row">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <b>4.9 · 4,000+ Google reviews</b>
          <span class="sep" aria-hidden="true"></span>
          <b>Airbnb Superhost</b>
        </div>
      </div>
      <div class="home-hero-photo" role="img" aria-label="Smoky Mountain cabin managed by Haven" style="background-image:url('${PHOTO.hero}'),${FALLBACK}">
        <div class="home-hero-stat">
          <b>Airbnb</b>
          <span>Superhost</span>
          <small>Local guest care</small>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CHANNEL STRIP -->
<section class="channel-band">
  <div class="container channel-strip">
    <span class="label">Listed &amp; ranked across</span>
    <span class="ch">airbnb</span>
    <span class="ch">Vrbo</span>
    <span class="ch">Booking.com</span>
    <span class="ch">Marriott</span>
    <span class="ch">Google</span>
  </div>
</section>

<!-- THE HAVEN DIFFERENCE -->
<section class="section section--alt">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="collage" reveal>
        ${photo(PHOTO.difA, { ratio: "5 / 6", cls: "collage__main", label: "Interior of a Haven-managed cabin" })}
        ${photo(PHOTO.difB, { ratio: "1 / 1", cls: "collage__sub" })}
      </div>
      <div class="prose stack">
        <span class="eyebrow">The Haven difference</span>
        <h2>${escapeHtml(copy.introHeading)}</h2>
        ${paragraphs(copy.introParagraphs)}
        <div class="local-proof">
          <span>${icon("mapPin", { width: 18, height: 18 })}</span>
          <b>Locally owned and operated</b>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT HAVEN -->
<section id="about" class="section about-section">
  <div class="container">
    <div class="snapshot about-snapshot" style="align-items:center">
      <div class="prose stack">
        <span class="eyebrow">About us</span>
        <h2>Owning a profitable vacation rental should be easy</h2>
        <p>Most vacation rentals never live up to their potential. They are underbooked, take too much time to manage, or just cause too many headaches. Sometimes even the property management companies that promise to make you more profitable end up charging so much that you lose the additional profit they helped create.</p>
        <p>At Haven Vacation Rentals, we believe making passive income from vacation rentals should feel a lot more passive. As property owners ourselves, we know how important it is for each property to earn as much as it possibly can without taking up a bunch of your time.</p>
        <div class="about-principles">
          <div><b>Run it like we own it.</b><span>Keep costs low. Fix issues fast. Book it full.</span></div>
          <div><b>Wow our guests.</b><span>Anticipate their needs. Communicate clearly. Make them want to come back.</span></div>
        </div>
      </div>
      <div class="about-collage about-collage--pair">
        ${photo(PHOTO.aboutA, { ratio: "4 / 3", cls: "about-collage__photo about-collage__family", label: "Jack and Sarah Zoppa with their family" })}
        ${photo(PHOTO.aboutB, { ratio: "4 / 3", cls: "about-collage__photo about-collage__family", label: "Jack and Sarah Zoppa with their family" })}
      </div>
    </div>
  </div>
</section>

<!-- FULL-SERVICE -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Full-service management", title: "We handle everything. You earn more.", intro: copy.servicesIntro })}
    ${serviceGrid(SERVICES)}
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how" class="section how-section" style="--how-bg:url('${PHOTO.howBg}')">
  <div class="container">
    ${sectionHead({ eyebrow: "How it works", title: "Hassle-free from day one", intro: "You hand us the keys. We run the day-to-day operation and the income lands in your account.", center: true })}
    <div class="how-grid">
      ${HOW.map((s, i) => `<div class="how-step" reveal>
        <div class="how-step__media">
          ${photo(s.photo, { ratio: "4 / 5", cls: "how-step__photo", label: s.title })}
          <span class="how-step__num">${i + 1}</span>
        </div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.body)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<!-- THE NUMBERS -->
<section class="section section--dark">
  <div class="container">
    ${sectionHead({ eyebrow: "By the numbers", title: "The numbers behind the difference", intro: "Gross figures from Haven-managed homes. Your net is protected by one flat fee.", center: true })}
    <div class="numbers">
      ${NUMBERS.map((n) => `<div reveal><b>${escapeHtml(n.value)}</b><span>${escapeHtml(n.label)}</span></div>`).join("")}
    </div>
  </div>
</section>

<!-- WHY OWNERS SWITCH -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Why owners switch", title: copy.valueHeading })}
    <div class="prose stack" style="margin-bottom:var(--space-lg)">${paragraphs(copy.valueParagraphs)}</div>
    ${pillars(PILLARS)}
  </div>
</section>

<!-- OWNER STORIES -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Owner stories", title: "Hear it from Haven owners", intro: "Real owners on what changed when a local team took over the day-to-day.", center: true })}
    ${videoTestimonials(VIDEOS)}
    <div class="grid grid--2" style="margin-top:var(--space-lg)">
      ${STORIES.map((t) => `<figure class="quote" reveal>
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>${escapeHtml(t.quote)}</blockquote>
        <figcaption>
          <span class="quote__avatar has-img" aria-hidden="true" style="background-image:url('${t.avatar}'),linear-gradient(135deg,var(--gold-400),var(--gold-600))"></span>
          <span><b>${escapeHtml(t.name)}</b><span>${escapeHtml(t.role)}</span></span>
        </figcaption>
      </figure>`).join("")}
    </div>
  </div>
</section>

<!-- THE HAVEN DIFFERENCE: COMPARISON -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "The honest comparison", title: "Self-managing vs. a national manager vs. Haven", intro: "Where your time and your revenue actually go.", center: true })}
    ${comparisonTable()}
  </div>
</section>

<!-- SERVICE AREAS -->
<section id="markets" class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Where we manage", title: "Four Smoky Mountain markets", intro: "Each market has its own rules, demand patterns, and guest profile. We have a dedicated page for every one.", center: true })}
    ${marketCards()}
  </div>
</section>

<!-- FAQ -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Questions", title: "What owners ask first", center: true })}
    ${faqAccordion(copy.faqs, "faq-home")}
  </div>
</section>

<!-- CONTACT / FINAL CTA -->
<section class="section photo-cta">
  <div class="photo-cta__bg" aria-hidden="true" style="background-image:url('${PHOTO.contact}'),${FALLBACK}"></div>
  <div class="photo-cta__veil" aria-hidden="true"></div>
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">${escapeHtml(copy.closingHeading)}</span>
        <h2>Make your passive income more passive, with more income</h2>
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
