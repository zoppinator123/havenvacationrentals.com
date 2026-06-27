import { SITE } from "../content/site.mjs";
import { escapeAttr, jsonLdScript } from "./util.mjs";

const abs = (path) => (path.startsWith("http") ? path : SITE.baseUrl + path);

/* ---- <head> builder -------------------------------------------------------
   Produces title, description, canonical, robots, OG/Twitter, theme-color,
   font preconnect, and any JSON-LD blocks. */
export function renderHead({
  title,
  description,
  path = "/",
  ogImage = SITE.ogImageDefault,
  ogType = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  jsonLd = [],
  modified,
}) {
  const canonical = abs(path);
  const img = abs(ogImage);
  const parts = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`,
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    `<meta name="robots" content="${escapeAttr(robots)}">`,
    `<meta name="theme-color" content="#1d2327">`,
    `<meta name="format-detection" content="telephone=yes">`,
    // Open Graph
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}">`,
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    `<meta property="og:image" content="${escapeAttr(img)}">`,
    `<meta property="og:locale" content="en_US">`,
    modified ? `<meta property="article:modified_time" content="${escapeAttr(modified)}">` : "",
    // Twitter
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(img)}">`,
    // Icons
    `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="/assets/favicon.svg">`,
    // Fonts — progressive enhancement; CSS has full system fallbacks if these
    // do not load, so there is no hard dependency and no blocking request.
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,500;1,700&family=Raleway:wght@400;500;600;700;900&display=swap" media="print" onload="this.media='all'">`,
    `<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400..700;1,500..700&family=Raleway:wght@400..900&display=swap"></noscript>`,
    `<link rel="stylesheet" href="/assets/styles.css">`,
  ];
  const ld = jsonLd.filter(Boolean).map(jsonLdScript).join("\n");
  return parts.filter(Boolean).join("\n") + (ld ? "\n" + ld : "");
}

/* ---- JSON-LD builders ----------------------------------------------------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.baseUrl}/#organization`,
    name: SITE.name,
    url: SITE.baseUrl + "/",
    logo: SITE.logo.dark,
    telephone: SITE.phoneTel,
    foundingDate: SITE.foundingYear,
    areaServed: "Smoky Mountains, Tennessee",
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.baseUrl}/#website`,
    url: SITE.baseUrl + "/",
    name: SITE.name,
    publisher: { "@id": `${SITE.baseUrl}/#organization` },
    inLanguage: "en-US",
  };
}

/* LocalBusiness for a geo page (or the region for the hub/home). */
export function localBusinessLd({ path, cityName, region = "TN", description, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${abs(path)}#business`,
    name: SITE.name,
    description,
    url: abs(path),
    telephone: SITE.phoneTel,
    image: image || SITE.logo.dark,
    logo: SITE.logo.dark,
    priceRange: "$$",
    areaServed: { "@type": "City", name: `${cityName}, Tennessee` },
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: region,
      addressCountry: "US",
    },
    parentOrganization: { "@id": `${SITE.baseUrl}/#organization` },
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

/* Service schema ties the offering to the served city for richer local intent. */
export function serviceLd({ path, cityName, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vacation rental property management",
    provider: { "@id": `${SITE.baseUrl}/#organization` },
    areaServed: { "@type": "City", name: `${cityName}, Tennessee` },
    url: abs(path),
    description,
  };
}

export function faqLd(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: Array.isArray(f.a) ? f.a.join(" ") : f.a },
    })),
  };
}

export function breadcrumbLd(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: abs(it.href),
    })),
  };
}
