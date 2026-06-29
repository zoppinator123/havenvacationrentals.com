/* Curated real Haven photography.

   SELF-HOSTING (recommended): drop optimized files into assets/photos/ using the
   basenames below (see assets/photos/README.md). The build prefers a local file
   if present and otherwise falls back to the live WordPress media URL. Self-hosted
   files load faster, never break on cross-origin hotlink rules, and are best for
   Core Web Vitals. No code change needed once the files are added.

   Photos render as background-image with an on-brand gradient fallback, so a
   missing asset degrades to a tasteful brand backdrop, never a broken-image icon. */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS_DIR = join(__dirname, "..", "assets", "photos");
const EXTS = ["webp", "avif", "jpg", "jpeg", "png"];
const WP = "https://havenvacationrentals.com/wp-content/uploads";

/* Prefer assets/photos/<name>.<ext> if it exists; else use the WordPress URL. */
function resolve(name, fallbackUrl) {
  for (const e of EXTS) {
    if (existsSync(join(PHOTOS_DIR, `${name}.${e}`))) return `/assets/photos/${name}.${e}`;
  }
  return fallbackUrl;
}

export const PHOTOS = {
  // Homepage hero — A-frame cabin image supplied by Jack
  homeHero:        resolve("front-hero-aframe",       `${WP}/2025/09/DJI_20250606153127_0461_D-scaled.jpg`),
  // Marquee fall A-frame (portfolio image)
  heroFall:        resolve("cabin-fall-aframe",       `${WP}/2025/10/AdobeStock_115261749-scaled.jpeg`),
  // Twilight aerial of the big multi-gable cabin — portfolio image
  heroExterior:    resolve("cabin-aerial-dusk",        `${WP}/2025/09/DJI_20250606153127_0461_D-scaled.jpg`),
  // Green craftsman at sunset (wrap porch) — portfolio image
  exteriorCraftsman: resolve("cabin-craftsman-sunset", `${WP}/2025/11/Three-Pines-110-1-1-scaled.jpg`),
  exteriorDusk:    resolve("cabin-exterior-dusk",      `${WP}/2020/03/cabin.jpg`),
  exteriorAlt:     resolve("cabin-exterior-alt",       `${WP}/2025/12/04-DJI_0038.jpg`),
  wearsValleyCabin: resolve("wears-valley-cabin",      `${WP}/2020/04/chair-view.jpg`),
  threePines:      resolve("cabin-craftsman-sunset",   `${WP}/2025/11/Three-Pines-110-1-1-scaled.jpg`),
  // Great room with blue sofa + stone fireplace — portfolio image
  interiorLiving:  resolve("interior-great-room",      `${WP}/2020/03/2.jpg`),
  interiorDetail:  resolve("interior-detail",          `${WP}/2020/03/4.jpg`),
  interiorKitchen: resolve("interior-kitchen",         `${WP}/2020/03/3.jpg`),
  deckView:        resolve("deck-view",                `${WP}/2020/03/1.jpg`),
  contactBg:       resolve("contact-bg",               `${WP}/2020/05/IMG_2853.jpg`),
  smokiesStock:    resolve("smokies-stock",            `${WP}/2025/10/AdobeStock_115261749-scaled.jpeg`),
  aboutFamily:     resolve("about-zoppa-family",       `${WP}/2020/04/about-header.jpg`),
  aboutDillon:     resolve("about-dillon-family",      `${WP}/2024/08/Screenshot-2024-08-20-at-9.47.29%E2%80%AFAM-1.png`),
  aboutHeader:     resolve("about-header",             `${WP}/2020/04/about-header.jpg`),
  aboutTeam:       resolve("about-team-dylan-suzanne", `${WP}/2024/08/Screenshot-2024-08-20-at-9.47.29%E2%80%AFAM-1.png`),
  aboutBedroom:    resolve("about-cabin-bedroom",      `${WP}/2020/05/IMG_2855.jpg`),
};

/* Per-market hero + supporting photos for the geo pages. */
export const MARKET_PHOTOS = {
  gatlinburg:    { hero: PHOTOS.exteriorCraftsman, gallery: [PHOTOS.interiorLiving, PHOTOS.deckView, PHOTOS.interiorKitchen] },
  "pigeon-forge":{ hero: PHOTOS.heroExterior,      gallery: [PHOTOS.interiorDetail, PHOTOS.interiorLiving, PHOTOS.exteriorAlt] },
  sevierville:   { hero: PHOTOS.exteriorAlt,       gallery: [PHOTOS.interiorKitchen, PHOTOS.interiorLiving, PHOTOS.deckView] },
  "wears-valley":{ hero: PHOTOS.wearsValleyCabin, gallery: [PHOTOS.deckView, PHOTOS.interiorDetail, PHOTOS.interiorKitchen] },
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
