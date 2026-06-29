import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml } from "../util.mjs";
import { breadcrumbs } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { SITE } from "../../content/site.mjs";
import { PHOTOS, PHOTO_FALLBACK } from "../../content/photos.mjs";

const CALENDLY_URL = "https://calendly.com/havenvacationrentals-sales/let-s-look-at-your-property";

export function renderBookCall() {
  const path = "/book-a-call/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Book a Call", href: path },
  ];
  const title = "Schedule Your Haven Property Call | Haven Vacation Rentals";
  const description = "Pick a time to talk with Haven Vacation Rentals after submitting your property details. Schedule a no-pressure Calendly call with our local Smoky Mountain team.";

  const head = {
    title,
    description,
    path,
    robots: "noindex,follow",
    ogImage: "/assets/og/contact.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: SITE.baseUrl + path,
        name: title,
        description,
      },
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}
<section class="hero photo-hero" style="--photo-hero:url('${PHOTOS.heroExterior}'),${PHOTO_FALLBACK}">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:760px">
        <span class="eyebrow hero__eyebrow">Next step</span>
        <h1>Choose a time to talk through your property</h1>
        <p class="hero__sub" style="max-width:62ch">Thanks for sharing your details. Grab a time below and a local Haven advisor will walk through your cabin, market, and realistic earning potential.</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="${CALENDLY_URL}" target="_blank" rel="noopener">Open Calendly ${icon("arrowRight", { width: 18, height: 18 })}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} Call ${escapeHtml(SITE.phone)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="note-box" style="margin-bottom:1.25rem">
      If the scheduler does not load, <a href="${CALENDLY_URL}" target="_blank" rel="noopener"><b>open Calendly in a new tab</b></a>.
    </div>
    <div class="calendly-inline-widget" data-url="${CALENDLY_URL}" style="min-width:320px;height:760px;border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;background:#fff;box-shadow:var(--shadow-sm)"></div>
    <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: "/contact-us/", stickyCTA: false }) };
}
