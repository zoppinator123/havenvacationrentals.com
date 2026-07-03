import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml } from "../util.mjs";
import {
  breadcrumbs, sectionHead, testimonial, videoTestimonials, ctaBand, leadForm,
} from "../components.mjs";
import {
  organizationLd, websiteLd, localBusinessLd, breadcrumbLd,
} from "../seo.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_META } from "../../content/google-reviews.mjs";
import { PHOTOS, PHOTO_FALLBACK } from "../../content/photos.mjs";

const WP = "https://havenvacationrentals.com/wp-content/uploads";

/* Real, attributed owner/industry endorsements (same as the homepage). */
const OWNER_STORIES = [
  {
    quote: "After switching to Haven, his revenue was way up and his guests were leaving glowing reviews. They are by far the best property management company in the Smokies.",
    name: "Avery Carl", role: "The Short Term Shop", avatar: `${WP}/2021/07/avery-150x150.png`,
  },
  {
    quote: "Working with Haven was an excellent decision. They save us tons of time and headaches, and generate much more revenue than we could managing ourselves. Honest and trustworthy.",
    name: "Alexis King", role: "Terminus Real Estate", avatar: `${WP}/2020/10/Alexis-Haven-Testimonial-circle.png`,
  },
];

/* Owner video testimonials (YouTube, click-to-load; same as the homepage). */
const VIDEOS = [
  { id: "iiEjEci1IlA", title: "Owner story", caption: "A Smoky Mountain owner on why they trust Haven with their cabin." },
  { id: "w_My74hQY_Y", title: "Owner story", caption: "An owner shares what changed after switching to Haven." },
];

export function renderReviews() {
  const path = "/reviews/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Reviews", href: path },
  ];
  const title = "Reviews of Haven Vacation Rentals | 4.9★ on Google";
  const description =
    "Real reviews of Haven Vacation Rentals: 4.9 stars across 4,000+ Google reviews, plus owner stories from Smoky Mountain cabin owners who switched to Haven.";

  const head = {
    title,
    description,
    path,
    ogImage: "/assets/og/home.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      /* This page carries the full review markup: AggregateRating (sitewide)
         plus the individual verified Google reviews as Review objects. */
      localBusinessLd({ path, cityName: "Sevierville", region: "TN", description, reviews: GOOGLE_REVIEWS }),
      breadcrumbLd(crumbs),
    ],
  };

  const guestCards = GOOGLE_REVIEWS.map((r) =>
    testimonial({ quote: r.text, name: r.name, role: "Verified Google review" })
  ).join("");

  const body = `
${breadcrumbs(crumbs)}

<!-- HERO -->
<section class="hero photo-hero" style="--photo-hero:url('${PHOTOS.heroExterior}'),${PHOTO_FALLBACK}">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:720px">
        <span class="eyebrow hero__eyebrow">Guest &amp; owner reviews</span>
        <h1>What guests and owners say about Haven</h1>
        <p class="hero__sub" style="max-width:62ch">The five-star guest experience is the engine behind every Haven owner's revenue. Here is what it looks like in the words of real guests and real owners.</p>
        <div class="rating-row">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <b>${escapeHtml(GOOGLE_REVIEWS_META.rating)} · ${escapeHtml(GOOGLE_REVIEWS_META.countLabel)} on ${escapeHtml(GOOGLE_REVIEWS_META.source)}</b>
          <span class="sep" aria-hidden="true"></span>
          <b>Airbnb Superhost</b>
        </div>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHY REVIEWS MATTER TO OWNERS -->
<section class="section">
  <div class="container">
    <div class="prose stack">
      <span class="eyebrow">Why this page exists</span>
      <h2>Reviews are not a vanity metric. They are your revenue engine.</h2>
      <p>Five-star reviews lift a listing's search ranking on Airbnb, Vrbo, and Google, and a higher ranking fills more nights at a stronger rate. That is why Haven is guest-obsessed: happy guests write reviews like the ones below, rebook, and refer their friends, and your cabin earns the compounding benefit. Every review here is a real, attributed review of a Haven-managed stay or of working with our team.</p>
    </div>
  </div>
</section>

<!-- GUEST REVIEWS -->
<section class="section section--alt">
  <div class="container">
    ${sectionHead({ eyebrow: "From guests", title: "Verified five-star Google reviews", intro: `A sample of recent reviews from the ${GOOGLE_REVIEWS_META.countLabel} Haven guests have left on ${GOOGLE_REVIEWS_META.source}.`, center: true })}
    <div class="grid grid--3">${guestCards}</div>
  </div>
</section>

<!-- OWNER STORIES -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "From owners", title: "Hear it from Haven owners", intro: "Owners and industry professionals on what changed when a local team took over the day-to-day.", center: true })}
    ${videoTestimonials(VIDEOS)}
    <div class="grid grid--2" style="margin-top:var(--space-lg)">
      ${OWNER_STORIES.map((t) => `<figure class="quote" reveal>
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>${escapeHtml(t.quote)}</blockquote>
        <figcaption>
          <span class="quote__avatar has-img" aria-hidden="true" style="background-image:url('${t.avatar}'),linear-gradient(135deg,var(--gold-400),var(--gold-600))"></span>
          <span><b>${escapeHtml(t.name)}</b><span>${escapeHtml(t.role)}</span></span>
        </figcaption>
      </figure>`).join("")}
    </div>
    <p class="center" style="margin-top:var(--space-md)"><a class="link-arrow" href="/about-us/">Meet the team behind the reviews ${icon("arrowRight", { width: 16, height: 16 })}</a></p>
  </div>
</section>

<!-- CTA BAND -->
<section class="section--tight"><div class="container">${ctaBand({
    title: "Want reviews like these on your cabin?",
    body: "Book a no-pressure call with a local Haven advisor and see what a five-star operation can do for your revenue.",
  })}</div></section>

<!-- FINAL CTA + FORM -->
<section class="section section--dark">
  <div class="container">
    <div class="snapshot" style="align-items:center">
      <div class="stack">
        <span class="eyebrow">Your cabin could be next</span>
        <h2>Put a five-star operation behind your property</h2>
        <p class="lede">Tell us a little about your cabin and a local Haven advisor will show you what it can earn with the guest experience that produces reviews like these.</p>
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
