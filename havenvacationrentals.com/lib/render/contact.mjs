import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml } from "../util.mjs";
import { breadcrumbs, sectionHead, leadForm, crossLinks } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";
import { PHOTOS, PHOTO_FALLBACK } from "../../content/photos.mjs";

export function renderContact() {
  const path = "/contact-us/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: path },
  ];
  const title = "Book a Call About Your Property | Haven Vacation Rentals";
  const description =
    "Talk to a local Haven advisor about managing your Smoky Mountain cabin. Get a no-pressure revenue estimate and see what one flat-fee, full-service team can do.";

  const head = {
    title,
    description,
    path,
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

  const xlinks = MARKETS.map((m) => ({
    label: `${m.city} management`,
    href: `/vacation-rental-management-${m.slug}/`,
  }));

  const body = `
${breadcrumbs(crumbs)}
<section class="hero photo-hero" style="--photo-hero:url('${PHOTOS.heroExterior}'),${PHOTO_FALLBACK}">
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4.5rem)">
      <div class="stack" style="max-width:680px">
        <span class="eyebrow hero__eyebrow">Book a call</span>
        <h1>Let's talk about your property</h1>
        <p class="hero__sub" style="max-width:60ch">Tell us a little about your cabin and a local Haven advisor will reach out with a realistic look at what it can earn. No pressure, no obligation, and no national call center.</p>
        <div class="cta-row hero__cta">
          <a class="btn btn--accent btn--lg" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} Call ${escapeHtml(SITE.phone)}</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="mailto:${SITE.email}">${icon("mail", { width: 18, height: 18 })} Email us</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="snapshot" style="align-items:start">
      <div class="stack">
        <span class="eyebrow">What happens next</span>
        <h2>Three simple steps</h2>
        <ul class="bullet-list" style="margin-top:1rem">
          <li>${icon("checkCircle", { width: 22, height: 22 })}<span><b>You reach out.</b> Send the form or call us directly. It takes two minutes.</span></li>
          <li>${icon("checkCircle", { width: 22, height: 22 })}<span><b>We review your property and market.</b> A local advisor builds a realistic revenue estimate for your specific cabin.</span></li>
          <li>${icon("checkCircle", { width: 22, height: 22 })}<span><b>You decide.</b> If Haven is the right fit, we handle the switch end to end. If not, you keep the estimate, free.</span></li>
        </ul>
        <div class="note-box" style="margin-top:1.25rem">
          Prefer to talk to a person right now? Call <a href="tel:${SITE.phoneTel}"><b>${escapeHtml(SITE.phone)}</b></a>. We are based right here in the Smoky Mountains.
        </div>
      </div>
      ${leadForm({ heading: "Book a call about your property" })}
    </div>
  </div>
</section>

<section class="section section--tint section--tight">
  <div class="container">
    ${sectionHead({ eyebrow: "Service areas", title: "Where we manage", center: true })}
    ${crossLinks(xlinks)}
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: path, stickyCTA: false }) };
}
