/* Self-contained SVG scenery. Used as decorative/illustrative imagery so the
   site is fully portable and scores perfectly on Core Web Vitals (no external
   image fetches, no layout shift). Replace any [data-photo-slot] with real,
   compressed WebP photography for production — alt text is already authored. */

let UID = 0;
const uid = (p) => `${p}${++UID}`;

/* A layered Smoky Mountains scene with mist, a cabin, and a warm window glow.
   `palette` lets each market read a little differently. */
export function mountainScene({
  sky = ["#2f3335", "#1d2327"],
  ridges = ["#3c4143", "#2f3335", "#262a2c", "#1d2327"],
  glow = "#ff7a73",
  time = "day", // "day" | "dusk"
  ratio = "16 / 9",
} = {}) {
  const g = uid("sky"), m = uid("mist"), sun = uid("sun");
  const orb = time === "dusk"
    ? `<circle cx="660" cy="150" r="46" fill="url(#${sun})" opacity="0.9"/>`
    : `<circle cx="690" cy="120" r="40" fill="url(#${sun})" opacity="0.85"/>`;
  return `
<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" role="img" style="aspect-ratio:${ratio}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/>
    </linearGradient>
    <radialGradient id="${sun}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.95"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${m}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#${g})"/>
  ${orb}
  <path d="M0 250 L120 160 L210 220 L320 130 L430 215 L540 150 L660 225 L800 165 L800 450 L0 450 Z" fill="${ridges[0]}" opacity="0.55"/>
  <rect y="225" width="800" height="60" fill="url(#${m})"/>
  <path d="M0 300 L130 215 L250 285 L360 205 L470 290 L600 220 L720 295 L800 250 L800 450 L0 450 Z" fill="${ridges[1]}" opacity="0.8"/>
  <path d="M0 350 L150 285 L280 345 L410 280 L540 350 L680 295 L800 345 L800 450 L0 450 Z" fill="${ridges[2]}"/>
  <path d="M0 400 L180 345 L340 400 L500 350 L660 405 L800 360 L800 450 L0 450 Z" fill="${ridges[3]}"/>
  <!-- pines -->
  <g fill="${ridges[3]}" opacity="0.9">
    <path d="M120 400 l14 0 l-7 -34 z"/><path d="M150 405 l18 0 l-9 -44 z"/><path d="M610 405 l16 0 l-8 -40 z"/>
  </g>
  <!-- cabin -->
  <g transform="translate(360 360)">
    <path d="M0 18 L26 0 L52 18 L52 46 L0 46 Z" fill="#241a12"/>
    <path d="M-4 20 L26 -3 L56 20 L52 20 L26 2 L0 20 Z" fill="#3a2a1c"/>
    <rect x="19" y="26" width="14" height="20" fill="#120c08"/>
    <rect x="6" y="26" width="9" height="9" fill="#ffd29a" opacity="0.95"/>
    <rect x="37" y="26" width="9" height="9" fill="#ffd29a" opacity="0.95"/>
  </g>
</svg>`;
}

/* Decorative ridgeline strip for the bottom of the hero. */
export function ridgeStrip(color = "#0e211a") {
  return `
<svg class="hero__ridge" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 120 L160 60 L320 110 L480 40 L640 100 L800 50 L960 110 L1120 55 L1280 105 L1440 60 L1440 200 L0 200 Z" fill="${color}" opacity="0.5"/>
  <path d="M0 160 L200 100 L380 150 L560 90 L740 150 L920 95 L1100 150 L1280 100 L1440 145 L1440 200 L0 200 Z" fill="${color}"/>
</svg>`;
}

/* Market palettes — charcoal ridges with a coral/peach dusk glow (brand). Each
   market reads slightly differently while staying in the Haven palette. */
export const MARKET_PALETTES = {
  gatlinburg:    { sky: ["#33383a", "#1d2327"], ridges: ["#444a4c", "#3c4143", "#2b2f31", "#1d2327"], glow: "#ff7a73", time: "day" },
  "pigeon-forge":{ sky: ["#363a3c", "#202528"], ridges: ["#454a4c", "#383d3f", "#2a2f31", "#202528"], glow: "#ffb3ad", time: "dusk" },
  sevierville:   { sky: ["#313638", "#1d2327"], ridges: ["#3f4446", "#343939", "#272b2d", "#1d2327"], glow: "#ff8a82", time: "day" },
  "wears-valley":{ sky: ["#34383a", "#1f2426"], ridges: ["#43484a", "#363b3d", "#282d2f", "#1f2426"], glow: "#ff7a73", time: "dusk" },
  smokies:       { sky: ["#33383a", "#1d2327"], ridges: ["#444a4c", "#3c4143", "#2b2f31", "#1d2327"], glow: "#ff7a73", time: "day" },
};
