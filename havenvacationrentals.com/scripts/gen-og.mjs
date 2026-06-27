/* Rasterize Open Graph images to assets/og/<key>.png using headless Chromium.
   Run once (and after copy/title changes): node scripts/gen-og.mjs
   The generated PNGs are committed and copied into dist/ on every build, so the
   build itself stays dependency-free. */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { ogHtml, OG_SPECS } from "../lib/og.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "assets", "og");
const CHROME = process.env.CHROME_BIN || "/opt/pw-browsers/chromium";

if (!existsSync(CHROME)) {
  console.error(`Chromium not found at ${CHROME}. Set CHROME_BIN. Skipping OG generation.`);
  process.exit(0);
}
mkdirSync(OUT, { recursive: true });

for (const spec of OG_SPECS) {
  const htmlPath = join(tmpdir(), `og-${spec.key}.html`);
  const pngPath = join(OUT, `${spec.key}.png`);
  writeFileSync(htmlPath, ogHtml(spec));
  execFileSync(CHROME, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--window-size=1200,630",
    `--screenshot=${pngPath}`, `file://${htmlPath}`,
  ], { stdio: "ignore" });
  console.log("OG ->", `assets/og/${spec.key}.png`);
}
console.log(`\nGenerated ${OG_SPECS.length} OG images.`);
