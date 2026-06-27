/* Curated real Haven photography (hosted on the live WordPress media library).
   Rendered as background-image with an on-brand gradient fallback, so a missing
   asset degrades gracefully instead of showing a broken-image icon. Swap any of
   these for self-hosted WebP in /assets/photos/ for best Core Web Vitals. */

const WP = "https://havenvacationrentals.com/wp-content/uploads";

/* Hero / showcase exteriors and interiors (real Haven-managed cabins). */
export const PHOTOS = {
  // Marquee aerial exterior at golden hour
  heroExterior: `${WP}/2025/09/DJI_20250606153127_0461_D-scaled.jpg`,
  exteriorDusk: `${WP}/2020/03/cabin.jpg`,
  exteriorAlt: `${WP}/2025/12/04-DJI_0038.jpg`,
  threePines: `${WP}/2025/11/Three-Pines-110-1-1-scaled.jpg`,
  // Interiors / lifestyle
  interiorLiving: `${WP}/2020/03/2.jpg`,
  interiorDetail: `${WP}/2020/03/4.jpg`,
  interiorKitchen: `${WP}/2020/03/3.jpg`,
  deckView: `${WP}/2020/03/1.jpg`,
  contactBg: `${WP}/2020/05/IMG_2853.jpg`,
  smokiesStock: `${WP}/2025/10/AdobeStock_115261749-scaled.jpeg`,
};

/* Per-market hero + supporting photos for the geo pages. */
export const MARKET_PHOTOS = {
  gatlinburg: { hero: PHOTOS.exteriorDusk, gallery: [PHOTOS.interiorLiving, PHOTOS.deckView, PHOTOS.interiorKitchen] },
  "pigeon-forge": { hero: PHOTOS.threePines, gallery: [PHOTOS.interiorDetail, PHOTOS.interiorLiving, PHOTOS.exteriorAlt] },
  sevierville: { hero: PHOTOS.exteriorAlt, gallery: [PHOTOS.interiorKitchen, PHOTOS.interiorLiving, PHOTOS.deckView] },
  "wears-valley": { hero: PHOTOS.heroExterior, gallery: [PHOTOS.deckView, PHOTOS.interiorDetail, PHOTOS.interiorKitchen] },
};

export const PHOTO_FALLBACK = "linear-gradient(150deg, #3c4143, #1d2327)";

/* Render a cover-photo box. `label` gives an accessible name (decorative photos
   pass aria-hidden); the page text carries the semantics for SEO. */
export function coverPhoto(url, { ratio = "4 / 5", cls = "", label = "", fallback = PHOTO_FALLBACK } = {}) {
  const a = label
    ? ` role="img" aria-label="${label.replace(/"/g, "&quot;")}"`
    : ' aria-hidden="true"';
  return `<div class="ph ${cls}"${a} style="aspect-ratio:${ratio};background-image:url('${url}'),${fallback}"></div>`;
}
