import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { ridgeStrip } from "../art.mjs";
import { crossLinks } from "../components.mjs";
import { SITE, CTA_PRIMARY } from "../../content/site.mjs";
import { MARKETS } from "../../content/markets.mjs";

export function renderNotFound() {
  const head = {
    title: "Page Not Found | Haven Vacation Rentals",
    description: "That page could not be found. Explore Haven's Smoky Mountain vacation rental management or book a call about your property.",
    path: "/404.html",
    robots: "noindex, follow",
    jsonLd: [],
  };
  const xlinks = MARKETS.map((m) => ({ label: `${m.city} management`, href: `/vacation-rental-management-${m.slug}/` }));
  const body = `
<section class="hero" style="padding-block:0">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(3rem,9vw,5rem)">
      <div class="stack center" style="margin-inline:auto;max-width:640px">
        <span class="eyebrow hero__eyebrow" style="justify-content:center">404</span>
        <h1>This trail does not lead anywhere</h1>
        <p class="hero__sub" style="margin-inline:auto">The page you were looking for moved or never existed. Let's get you back on track.</p>
        <div class="cta-row center hero__cta">
          <a class="btn btn--accent btn--lg" href="/">Back to home</a>
          <a class="btn btn--ghost-on-dark btn--lg" href="${CTA_PRIMARY.href}">${CTA_PRIMARY.label}</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section"><div class="container">${crossLinks(xlinks)}</div></section>
`;
  return { path: "/404.html", html: page({ head, body, currentPath: "", stickyCTA: false }) };
}
