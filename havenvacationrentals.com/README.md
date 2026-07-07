# Haven Vacation Rentals — SEO Site Rebuild

A standalone, self-contained, **SEO-first rebuild** of the public Haven Vacation
Rentals marketing site, focused on the four geo-specific property-management
landing pages from the build spec and an upgraded `/property-management/` hub.

Built as static HTML by a **zero-dependency Node generator** so it scores
perfectly on Core Web Vitals (no framework JS, no render-blocking, no layout
shift), is trivially portable, and ports cleanly into WordPress later.

> **Why a fresh build, not a pixel copy?** The brief asked to *significantly
> improve* design and *maximize SEO*, so this is a ground-up, premium,
> performance-first build. It now uses Haven's **real brand identity** (coral +
> charcoal + sage, Futura PT headings, Raleway body, coral pill buttons) applied
> through CSS design tokens (see [Brand tokens](#brand-tokens)).

---

## Quick start

```bash
cd haven-site
node build.mjs      # generate dist/ (prints a QA report)
node serve.mjs      # preview at http://localhost:4321
```

No `npm install` needed. Node 18+ (the VM ships Node 22).

To regenerate the social-share (Open Graph) images after a title change:

```bash
node scripts/gen-og.mjs   # rasterizes assets/og/*.png via headless Chromium
```

---

## What got built

| Page | URL | Notes |
|---|---|---|
| Home | `/` | Overview that funnels to the hub + 4 markets |
| **Hub** | `/property-management/` | Upgraded per spec §9: 1,500+ words, Service Areas cards, fees section, general FAQ + schema |
| Gatlinburg | `/vacation-rental-management-gatlinburg/` | Spoke (in-town / zoning angle) |
| Pigeon Forge | `/vacation-rental-management-pigeon-forge/` | Spoke (occupancy cap / grandfathering) |
| Sevierville | `/vacation-rental-management-sevierville/` | Spoke (emerging value market) |
| Wears Valley | `/vacation-rental-management-wears-valley/` | Spoke (county rules / Three Strikes) — the uncontested gap |
| Contact | `/contact-us/` | Book-a-Call form destination |
| Blog | `/blog/` | Category stub for the §10 bottom-funnel content plan |
| | `/sitemap.xml`, `/robots.txt` | Generated automatically |

Hub-and-spoke internal linking is wired exactly as the spec requires: the hub
links **down** to all four spokes (descriptive anchors), each spoke links **up**
to the hub and **across** to the other three, and the footer links to all four
from every page.

---

## Architecture

```
haven-site/
├── build.mjs                 # generator entry point (+ built-in QA report)
├── serve.mjs                 # zero-dep static preview server (clean URLs)
├── content/
│   ├── site.mjs              # global config: brand, NAP, nav, services, pillars, process, proof
│   ├── markets.mjs           # VERIFIED per-market facts (permits/taxes/zoning) from spec §8
│   ├── fallback.mjs          # safety-net copy so the build always renders
│   └── generated/<slug>.json # AI-written UNIQUE prose per page (edit these to revise copy)
├── lib/
│   ├── layout.mjs            # full HTML shell
│   ├── seo.mjs               # <head> builder + JSON-LD (Org, WebSite, LocalBusiness, Service, FAQPage, Breadcrumb)
│   ├── components.mjs        # header, footer, hero, stats, services, pillars, regs, FAQ, forms, CTAs
│   ├── icons.mjs, art.mjs, og.mjs, util.mjs
│   └── render/               # one renderer per page type (geo, hub, home, contact, blog)
├── assets/                   # styles.css, main.js, favicon.svg, og/*.png
├── scripts/
│   ├── gen-copy.workflow.mjs # multi-agent copywriting workflow (see below)
│   └── gen-og.mjs            # OG image rasterizer
└── dist/                     # generated output (committed so you can open it directly)
```

### How the copy is produced

Facts and prose are deliberately separated so facts stay correct and prose stays
unique:

- **Facts** (permit fees, taxes, zoning, inspection checklists) are authored by
  hand in `content/markets.mjs`, straight from spec §8.
- **Unique narrative prose** (intros, market snapshots, regulation explanations,
  FAQs, meta tags, closings) was written by a multi-agent **workflow**
  (`scripts/gen-copy.workflow.mjs`): one writer per page in parallel, each fed
  that market's exact facts, then a code-checked verify/refine loop enforcing the
  no-em-dash rule, the 1,500+ word target, primary-keyword usage, and meta-tag
  lengths, plus a cross-page duplication report. Output lands in
  `content/generated/*.json`.

**To edit any copy**, change the relevant `content/generated/<slug>.json` (or the
facts in `markets.mjs`) and re-run `node build.mjs`. To regenerate everything
from scratch, re-run the workflow.

---

## SEO features (mapped to the spec)

- **One page = one market.** Single `<h1>` per page, exactly one city per title.
- **Title tags** 50–60 chars, brand at the end; **meta descriptions** 150–160
  chars, owner-focused, city + soft CTA. Enforced by the build QA.
- **Self-referencing canonical**, robots `index, follow, max-image-preview:large`,
  full **Open Graph + Twitter** tags with a **per-page OG image**.
- **JSON-LD** on every page: `Organization`, `WebSite`, `LocalBusiness`
  (area-served = the city), `Service`, `FAQPage` (mirrors the on-page FAQ), and
  `BreadcrumbList`. Validate with Google's Rich Results Test after deploy.
- **1,500+ words** of unique, non-boilerplate body copy per geo page and the hub.
- **Heading hierarchy**: one H1, H2 per section, H3 for sub-points.
- **CTA above the fold** + repeated 3–4× down each page + a sticky mobile CTA;
  phone rendered as a `tel:` link everywhere.
- **Core Web Vitals**: system-font stack with progressive web-font enhancement
  (no render-blocking font request, graceful fallback), all imagery is inline SVG
  with explicit aspect ratios (zero CLS), JS is deferred and purely progressive.
- **Sitemap + robots** generated; internal hub-and-spoke linking wired.
- **Mobile-first**, works at 375px, single shared header/footer, portaled drawer.

---

## Brand tokens

All colors/fonts are CSS custom properties in `assets/styles.css` (`:root`).
Change them there and the whole site re-skins. These match Haven's live brand:

- Primary action / accent: **coral `#FF564E`** (buttons, eyebrows, stat figures,
  links) with darker red `#D63838` on hover.
- Charcoal `#424242` (body + heading ink), near-black `#1D2327` (dark hero /
  footer bands), white, and pale sage `#EDF0EE` (alternating section bg).
- Headings: **Futura PT** (Adobe Fonts), bold, uppercase, with letter-spacing.
  Body + buttons: **Raleway** (Google Fonts); buttons are coral pills, Raleway
  900, uppercase, 14px.

> **Futura PT note:** It is an Adobe Fonts (Typekit) family, which can't be
> self-hosted here, so the free geometric **Jost** (Google Fonts) is loaded as a
> visual stand-in. The font stack lists `"futura-pt"` first, so the moment you
> add your Adobe Fonts kit `<link>` (in `lib/seo.mjs` `renderHead`), real Futura
> PT takes over automatically with no other change.

The legacy token names `--forest-*` and `--gold-*` are retained but now carry
the **charcoal** and **coral** ramps respectively, so every component reads the
brand without renaming.

## Images / photography

Imagery is currently polished inline **SVG scenery** so the site is fully
self-contained and CLS-free. For production, drop in real, compressed photos of
Haven-managed cabins in each market:

- Look for `data-photo-slot="..."` on hero/area media — the value is the
  ready-written, keyword-rich **alt text**. Replace the SVG with
  `<img src="..." alt="(that text)" width="..." height="..." loading="lazy" decoding="async">`.
- Convert to **WebP**, compress, set explicit width/height, and lazy-load
  below-the-fold images (the spec's CLS/LCP requirement).
- The real Haven logo PNG is referenced in `content/site.mjs` (`SITE.logo`); the
  header/footer currently use an always-renders SVG wordmark. Swap if you prefer
  the exact PNG (self-host it for performance).

## The Book-a-Call form

`components.leadForm()` validates the lead fields client-side, posts the lead to
`/api/lead`, then redirects the visitor to `/book-a-call/`, which embeds the
Haven Calendly scheduler. The API route creates/uses the Haven `Warm Leads`
stage in StaydOS Supabase, inserts a `deals` row with the submitted contact and
property context, and sends a notification email to `sales@havenvacationrentals.com`.

Required Vercel env vars for the API route:

| Name | Purpose |
| --- | --- |
| `STAYDOS_SUPABASE_SERVICE_ROLE_KEY` | Server-only key for the StaydOS Supabase project. |
| `RESEND_API_KEY` | Sends the sales notification email. |

Optional env vars: `STAYDOS_SUPABASE_URL`, `HAVEN_STAYDOS_COMPANY_ID`,
`HAVEN_LEAD_NOTIFY_TO`, `HAVEN_LEAD_NOTIFY_FROM`.

---

## Open items (confirm before publishing)

From spec §13, plus build notes:

- [ ] **Business street address** for `LocalBusiness` schema + NAP consistency
      (currently locality/region only).
- [ ] **Confirm proof-point figures** (70% occupancy, ~30% above market, 3,400+
      reviews) before they go live. They live in `content/site.mjs` (`PROOF`).
- [ ] **Real owner testimonials** per market. The current testimonials are
      clearly-marked **placeholders** (see the HTML comment in each geo page and
      `content/generated/*.json` → `testimonial`). Replace with verifiable quotes.
- [ ] **Confirm current per-market ADR** (AirDNA / Key Data); the snapshot uses
      the ~$321 Smokies average with a per-market caption flagging this.
- [ ] **Add the Adobe Fonts Futura PT kit** `<link>` for exact heading fidelity
      (Jost is the current stand-in; see Brand tokens above).
- [ ] **Verify fast-moving fees/taxes** against each city/county source.
- [ ] Decide production host + deploy (this is plain static files; any static
      host or your WordPress works).
```
