import { renderHead } from "./seo.mjs";
import { header, drawer, footer, stickyCta } from "./components.mjs";

/* Full HTML document. `head` is the object passed to renderHead(); `body` is
   the inner main markup. Header/footer/drawer/sticky-CTA are shared chrome. */
export function page({ head, body, currentPath = "", stickyCTA = true }) {
  return `<!doctype html>
<html lang="en">
<head>
${renderHead(head)}
</head>
<body${stickyCTA ? ' class="has-sticky-cta"' : ""}>
<a class="skip-link" href="#main">Skip to content</a>
${header(currentPath)}
<main id="main">
${body}
</main>
${footer()}
${drawer(currentPath)}
${stickyCTA ? stickyCta() : ""}
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}
