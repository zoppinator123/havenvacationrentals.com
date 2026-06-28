import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml } from "../util.mjs";
import { ridgeStrip, mountainScene, MARKET_PALETTES } from "../art.mjs";
import { breadcrumbs, sectionHead, ctaBand, crossLinks, leadForm } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd, serviceLd } from "../seo.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";

const LIVE_LISTINGS_URL = "https://zillowtohavensite.vercel.app/";

/* /smoky-mountain-str-investment-listings/
   Landing for investors looking to buy a Smoky Mountain STR. Live investment
   listings are embedded from the Zillow-to-Haven Vercel app. */
export function renderListings() {
  const path = "/smoky-mountain-str-investment-listings/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "STR Investment Listings", href: path },
  ];
  const title = "Smoky Mountain STR Investment Listings | Haven";
  const description =
    "Browse live Smoky Mountain STR investment listings and buy with a local operating team. Haven helps investors find cabins that pencil, run the numbers, and manage them to outperform.";

  const head = {
    title,
    description,
    path,
    ogImage: "/assets/og/home.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      serviceLd({ path, cityName: "the Smoky Mountains", description }),
      breadcrumbLd(crumbs),
    ],
  };

  const helps = [
    { icon: "compass", title: "Find cabins that pencil", desc: "We know which streets, views, and floor plans actually rent. We help you filter past the listings that look good but earn poorly." },
    { icon: "chartUp", title: "Run the real numbers", desc: "A grounded revenue projection for any property you are considering, based on this market, not a generic national estimate." },
    { icon: "scale", title: "Check the rules before you buy", desc: "Zoning, permits, and jurisdiction can make or break a deal. We verify a parcel's STR eligibility before you commit." },
    { icon: "key", title: "Manage it to outperform", desc: "Close the deal and hand us the keys. Haven owners target around 70% occupancy and run roughly 30% ahead of the market." },
  ];

  const body = `
${breadcrumbs(crumbs)}
<section class="hero">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner">
      <div class="stack">
        <span class="eyebrow hero__eyebrow">For investors</span>
        <h1>Smoky Mountain STR investment, done with a local team</h1>
        <p class="hero__sub">Buying a cabin to rent is a real estate decision and an operating decision. Haven helps you get both right, from finding a property that pencils to managing it once you own it.</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">Talk to a local advisor</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
      <div class="hero__media" data-photo-slot="Smoky Mountain investment cabin for sale, managed by Haven">
        ${mountainScene({ ...MARKET_PALETTES.sevierville, ratio: "4 / 3" })}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Why buy with Haven in the loop</span>
      <h2>The cabin that looks best online is not always the one that earns best</h2>
      <p>The Smoky Mountains are one of the strongest short-term rental markets in the country, but returns vary enormously from one cabin to the next. Location, layout, views, access, and compliance all move the numbers. As a local manager that runs hundreds of stays, Haven sees which properties actually perform, and we put that knowledge to work for you before you buy.</p>
      <p>With supply growth across the Smokies cooled to about 1% year over year, 2026 rewards buying the right asset and operating it well, not simply riding a rising market. That is exactly where a local partner earns its keep.</p>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "How we help", title: "From offer to operating, with one local team" })}
    <div class="grid grid--4">
      ${helps.map((h) => `<div class="card card--accent" reveal><span class="card__icon">${icon(h.icon, { width: 26, height: 26 })}</span><h3>${escapeHtml(h.title)}</h3><p>${escapeHtml(h.desc)}</p></div>`).join("")}
    </div>
    <div class="live-listings">
      <div class="live-listings__head">
        <div>
          <span class="eyebrow">Live listings</span>
          <h3>Browse active Smoky Mountain STR opportunities</h3>
          <p>These properties are pulled from the Zillow-to-Haven investment listings app. Use this to scan live inventory, then talk with Haven before you write an offer so we can pressure-test the numbers and operating plan.</p>
        </div>
        <a class="btn btn--ghost" href="${LIVE_LISTINGS_URL}" target="_blank" rel="noopener">Open full-screen ${icon("arrowRight", { width: 18, height: 18 })}</a>
      </div>
      <div class="live-listings__frame-wrap">
        <iframe
          class="live-listings__frame"
          title="Live Smoky Mountain STR investment listings"
          src="${LIVE_LISTINGS_URL}"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </div>
      <p class="note-box live-listings__note">If the live listings do not load, <a href="${LIVE_LISTINGS_URL}" target="_blank" rel="noopener">open them in a new tab</a>. Listing data is provided by the embedded Zillow-to-Haven app and should be verified before making an offer.</p>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">Start the conversation</span>
        <h2>Tell us what you are looking for</h2>
        <p class="lede">Budget, target market, and goals. A local Haven advisor will help you find a cabin that fits and show you what it can earn.</p>
        <div class="cta-row">
          <a class="btn btn--accent btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} Call ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
      ${leadForm({ heading: "Find a Smoky Mountain investment cabin" })}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "By market", title: "Explore management by market", center: true })}
    ${crossLinks(MARKETS.map((m) => ({ label: `${m.city} management`, href: `/vacation-rental-management-${m.slug}/` })))}
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
