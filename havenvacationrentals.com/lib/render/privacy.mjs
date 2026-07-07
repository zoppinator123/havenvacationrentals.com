import { page } from "../layout.mjs";
import { escapeHtml, paragraphs } from "../util.mjs";
import { breadcrumbs, sectionHead } from "../components.mjs";
import { organizationLd, websiteLd, breadcrumbLd } from "../seo.mjs";
import { SITE } from "../../content/site.mjs";

export function renderPrivacy(copy) {
  const path = "/privacy-policy/";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: path },
  ];
  const description = copy.metaDescription;

  const head = {
    title: copy.metaTitle,
    description,
    path,
    ogImage: "/assets/og/hub.png",
    jsonLd: [
      organizationLd(),
      websiteLd(),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: SITE.baseUrl + path,
        name: copy.h1,
        description,
      },
      breadcrumbLd(crumbs),
    ],
  };

  const body = `
${breadcrumbs(crumbs)}

<section class="section">
  <div class="container">
    <div class="prose stack" style="max-width:800px;margin-inline:auto">
      <h1>${escapeHtml(copy.h1)}</h1>
      <p><strong>Last updated:</strong> ${escapeHtml(copy.lastUpdated)}</p>
      
      ${copy.sections.map((section) => `
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      `).join("")}
    </div>
  </div>
</section>
`;

  return { path, html: page({ head, body, currentPath: path }) };
}