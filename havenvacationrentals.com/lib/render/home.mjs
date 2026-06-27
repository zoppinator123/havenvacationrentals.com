import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml, escapeAttr, paragraphs } from "../util.mjs";
import {
  sectionHead, serviceGrid, pillars, faqAccordion, leadForm,
} from "../components.mjs";
import { organizationLd, websiteLd, localBusinessLd, faqLd } from "../seo.mjs";
import { SITE, SERVICES, PILLARS, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";

/* Real Haven photography (hosted on the live WordPress media library). Each
   photo is rendered as a background-image with an on-brand gradient fallback
   layered underneath, so a missing asset degrades to a tasteful brand backdrop
   rather than a broken-image icon. */
const WP = "https://havenvacationrentals.com/wp-content/uploads";
const PHOTO = {
  hero: `${WP}/2020/03/cabin.jpg`,
  difA: `${WP}/2020/03/2.jpg`,
  difB: `${WP}/2020/03/4.jpg`,
  step1: `${WP}/2020/03/1.jpg`,
  step2: `${WP}/2020/03/2.jpg`,
  step3: `${WP}/2020/03/3.jpg`,
  step4: `${WP}/2020/03/4.jpg`,
  contact: `${WP}/2020/05/IMG_2853.jpg`,
};
const FALLBACK = "linear-gradient(150deg, #3c4143, #1d2327)";

/* A cover-photo box with a gradient fallback. `label` gives it an accessible
   name (these are decorative; page text carries the semantics/SEO). */
function photo(url, { ratio = "4 / 5", cls = "", label = "" } = {}) {
  const a = label ? ` role="img" aria-label="${escapeAttr(label)}"` : ' aria-hidden="true"';
  return `<div class="ph ${cls}"${a} style="aspect-ratio:${ratio};background-image:url('${url}'),${FALLBACK}"></div>`;
}

/* Per-market hero photo + one-line angle for the Service Areas cards. */
const MARKET_CARD = {
  gatlinburg: { photo: `${WP}/2020/03/cabin.jpg`, blurb: "In-town walkability and the zoning angle that protects rentals." },
  "pigeon-forge": { photo: `${WP}/2020/03/2.jpg`, blurb: "High demand, occupancy caps, and grandfathering you need to know." },
  sevierville: { photo: `${WP}/2020/03/3.jpg`, blurb: "The emerging value market with room to run on revenue." },
  "wears-valley": { photo: `${WP}/2020/03/1.jpg`, blurb: "County rules, the Three Strikes policy, and an uncontested gap." },
};

const PROBLEMS = [
  { icon: "chartUp", title: "Underbooked", body: "Empty nights pile up when listings are not marketed and priced by someone who actually knows the local season." },
  { icon: "tag", title: "Overcharged", body: "Hidden booking fees and padded cleaning charges quietly widen the gap between what a cabin earns and what you keep." },
  { icon: "alert", title: "Too many headaches", body: "Guest messages at midnight, last-minute turnovers, maintenance calls. The passive income turns into a second job." },
];

const HOW = [
  { photo: PHOTO.step1, title: "We rent it out", body: "Professional listings and marketing across Airbnb, Vrbo, Booking.com, and direct." },
  { photo: PHOTO.step2, title: "We manage it", body: "Inspected turnovers, trusted local maintenance, and smart human pricing every day." },
  { photo: PHOTO.step3, title: "We wow guests", body: "24/7 communication and five-star care that earns reviews, rebookings, and referrals." },
  { photo: PHOTO.step4, title: "You get paid", body: "Clean monthly statements and direct-deposit payouts. The math is always honest." },
];

const NUMBERS = [
  { value: "70%", label: "Avg. occupancy vs. ~55% market" },
  { value: "+30%", label: "Revenue ahead of the market" },
  { value: "4.9★", label: "Across 3,400+ five-star reviews" },
  { value: "Top 1%", label: "Of Airbnb listings worldwide" },
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
<section class="hero hero--light">
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
          <b>4.9 · 3,400+ reviews</b>
          <span class="sep" aria-hidden="true"></span>
          <b>Airbnb Superhost</b>
        </div>
      </div>
      <div class="home-hero-photo" role="img" aria-label="Smoky Mountain cabin managed by Haven" style="background-image:url('${PHOTO.hero}'),${FALLBACK}">
        <div class="home-hero-stat">
          <b>70%</b>
          <span>Avg. occupancy</span>
          <small>vs. ~55% market</small>
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
        <div class="minstats">
          <div><b>2016</b><span>Local since</span></div>
          <div><b>1 fee</b><span>Flat, all-in</span></div>
          <div><b>4 markets</b><span>Sevier County</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- THE PROBLEM -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "The problem", title: "Most cabins never meet their potential", intro: "You bought a cabin to build wealth and enjoy the mountains, not to chase cleaners and second-guess your nightly rate. Three things quietly hold most rentals back." })}
    <div class="grid grid--3">
      ${PROBLEMS.map((p) => `<div class="card card--soft" reveal>
        <span class="card__icon">${icon(p.icon, { width: 24, height: 24 })}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
      </div>`).join("")}
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
<section id="how" class="section">
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

<!-- SERVICE AREAS -->
<section id="markets" class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "Where we manage", title: "Four Smoky Mountain markets", intro: "Each market has its own rules, demand patterns, and guest profile. We have a dedicated page for every one.", center: true })}
    ${marketCards()}
  </div>
</section>

<!-- OWNER STORIES -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Owner stories", title: "Owners who made the switch", center: true })}
    <div class="grid grid--2">
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
