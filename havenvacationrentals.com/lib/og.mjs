/* Self-contained Open Graph image template (1200x630).
   Rendered to PNG by scripts/gen-og.mjs via headless Chromium. Uses a system
   serif so it rasterizes identically without any web font dependency. */
export function ogHtml({ eyebrow = "Smoky Mountain property management", title = "" }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;position:relative;
    font-family:"Helvetica Neue",Arial,sans-serif;
    background:radial-gradient(120% 120% at 85% -10%, #2f3335 0%, #23282a 45%, #15181a 100%);color:#fff}
  .ridge{position:absolute;left:0;right:0;bottom:0;width:100%}
  .pad{position:absolute;inset:0;padding:64px 80px 92px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:16px;font-size:27px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
  .mark{width:56px;height:56px;border-radius:50%;background:#ff564e;display:grid;place-items:center}
  .eyebrow{font-size:21px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ff564e;margin-bottom:20px}
  h1{font-size:64px;line-height:1.08;font-weight:800;letter-spacing:.01em;text-transform:uppercase;max-width:17ch}
  .foot{display:flex;align-items:center;gap:28px;font-size:23px;color:#c3c4c7;font-weight:500}
  .pill{background:rgba(255,255,255,.1);padding:10px 20px;border-radius:999px;font-weight:700;color:#fff}
  .star{color:#ff564e}
  </style></head><body>
  <svg class="ridge" viewBox="0 0 1200 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 130 L180 70 L360 120 L560 50 L760 115 L960 60 L1200 120 L1200 220 L0 220 Z" fill="#1d2327" opacity=".6"/>
    <path d="M0 170 L220 110 L430 165 L640 100 L850 165 L1050 110 L1200 160 L1200 220 L0 220 Z" fill="#0f1213"/>
  </svg>
  <div class="pad">
    <div class="brand"><span class="mark">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 18.5 l3.2 0 l-1.6 -6.4 z" fill="#fff" opacity="0.85"/>
        <path d="M16.3 18.5 l3.2 0 l-1.6 -6.4 z" fill="#fff" opacity="0.85"/>
        <path d="M6 18.5 L12 6.5 L18 18.5 Z" fill="#fff"/>
      </svg></span><span>Haven Vacation Rentals</span></div>
    <div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1></div>
    <div class="foot"><span class="pill"><span class="star">★</span> 4.9 stars from 4,000+ Google reviews</span><span>865-263-7366</span><span>havenvacationrentals.com</span></div>
  </div>
  </body></html>`;
}

export const OG_SPECS = [
  { key: "home", eyebrow: "Smoky Mountain vacation rental management", title: "Your cabin, managed to earn more." },
  { key: "hub", eyebrow: "Full-service property management", title: "Smoky Mountain Vacation Rental Management" },
  { key: "gatlinburg", eyebrow: "Gatlinburg, Tennessee", title: "Vacation Rental Management in Gatlinburg" },
  { key: "pigeon-forge", eyebrow: "Pigeon Forge, Tennessee", title: "Vacation Rental Management in Pigeon Forge" },
  { key: "sevierville", eyebrow: "Sevierville, Tennessee", title: "Vacation Rental Management in Sevierville" },
  { key: "wears-valley", eyebrow: "Wears Valley, Sevier County", title: "Vacation Rental Management in Wears Valley" },
  { key: "contact", eyebrow: "Book a call", title: "Let's talk about your property." },
  { key: "blog", eyebrow: "Owner resources", title: "Smoky Mountain owner guides" },
];
