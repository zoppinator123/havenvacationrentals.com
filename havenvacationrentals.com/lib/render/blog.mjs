import { page } from "../layout.mjs";
import { icon } from "../icons.mjs";
import { escapeHtml } from "../util.mjs";
import { ridgeStrip } from "../art.mjs";
import { breadcrumbs, sectionHead, ctaBand } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { CTA_PRIMARY } from "../../content/site.mjs";

/* Bottom-funnel content plan (spec Section 10). This stands up the URL/category
   so the content team can publish into it; each post links into a geo page. */
const PLANNED = [
  { title: "How much do vacation rental property managers charge in the Smoky Mountains?", tag: "Cost", desc: "A plain-English breakdown of management fees, what is and is not included, and how a flat fee compares to a percentage model." },
  { title: "Best vacation rental management companies in the Smoky Mountains (2026)", tag: "Comparison", desc: "An honest look at how to compare Smoky Mountain property managers, and the questions every owner should ask." },
  { title: "Should you self-manage or hire a property manager for your Smoky Mountain cabin?", tag: "Guide", desc: "The real cost of self-management in time, money, and missed revenue, and when hiring a pro pays for itself." },
  { title: "What does a Gatlinburg, Pigeon Forge, or Sevierville cabin actually earn?", tag: "Earnings", desc: "Per-market revenue expectations, what drives them, and how professional management changes the math." },
  { title: "Haven vs the national property managers: how to choose", tag: "Comparison", desc: "Why a smaller, local, guest-obsessed team often outperforms a national manager on net owner revenue." },
];

export function renderBlog() {
  const path = "/blog/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: path },
  ];
  const title = "Owner Resources & Smoky Mountain STR Guides | Haven";
  const description =
    "Guides for Smoky Mountain cabin owners: management costs, earnings by market, regulations, and how to choose a vacation rental manager in Gatlinburg, Pigeon Forge, Sevierville, and Wears Valley.";

  const head = {
    title,
    description,
    path,
    ogImage: "/assets/og/blog.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      { "@context": "https://schema.org", "@type": "CollectionPage", url: "https://havenvacationrentals.com" + path, name: title, description },
      breadcrumbLd(crumbs),
    ],
  };

  const cards = PLANNED.map(
    (p) => `<article class="card" reveal>
      <span class="tag">${icon("doc", { width: 14, height: 14 })} ${escapeHtml(p.tag)}</span>
      <h3 style="margin-top:.75rem">${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.desc)}</p>
      <p style="margin-top:.85rem"><span class="link-arrow">Coming soon ${icon("arrowRight", { width: 16, height: 16 })}</span></p>
    </article>`
  ).join("");

  const body = `
${breadcrumbs(crumbs)}
<section class="hero" style="padding-block:0">
  ${ridgeStrip("#15181a")}
  <div class="container">
    <div class="hero__inner" style="grid-template-columns:1fr;padding-block:clamp(2.5rem,7vw,4rem)">
      <div class="stack" style="max-width:680px">
        <span class="eyebrow hero__eyebrow">Owner resources</span>
        <h1>Smoky Mountain owner guides</h1>
        <p class="hero__sub" style="max-width:60ch">Straight, useful answers for cabin owners weighing management, comparing companies, or trying to understand local rules and earnings.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: "Coming soon", title: "Guides we are publishing for owners" })}
    <div class="grid grid--3">${cards}</div>
    <p class="note-box" style="margin-top:var(--space-lg)">This category is live so new owner-intent guides can publish here and link directly into the relevant market page. Have a question you want answered? <a href="${CTA_PRIMARY.href}"><b>Ask us on a call.</b></a></p>
  </div>
</section>

<section class="section section--tight"><div class="container">${ctaBand({
    title: "Have a question about your cabin?",
    body: "A local Haven advisor can answer it on a quick call and show you what your property can earn.",
  })}</div></section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}
