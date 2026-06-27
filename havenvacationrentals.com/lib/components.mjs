import { icon } from "./icons.mjs";
import { escapeHtml, escapeAttr, paragraphs } from "./util.mjs";
import { SITE, NAV, SERVICE_AREA_NAV, FOOTER_GROUPS, CTA_PRIMARY } from "../content/site.mjs";

/* ---- Brand mark (real Haven logo; CSS inverts it to white on dark surfaces) */
export function brandMark({ onDark = false } = {}) {
  return `<a class="brand${onDark ? " brand--on-dark" : ""}" href="/" aria-label="${escapeAttr(SITE.name)} home">
    <img class="brand__logo" src="${SITE.logo.dark}" alt="${escapeAttr(SITE.name)}" height="38" decoding="async">
  </a>`;
}

/* ---- Header ---- */
export function header(currentPath = "") {
  const navLinks = NAV.map((n) => {
    const current = n.href === currentPath ? ' aria-current="page"' : "";
    return `<a href="${n.href}"${current}>${escapeHtml(n.label)}</a>`;
  }).join("");
  return `<header class="site-header">
  <div class="container site-header__inner">
    ${brandMark()}
    <nav class="nav" aria-label="Primary">${navLinks}</nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })}<span>${escapeHtml(SITE.phone)}</span></a>
      <a class="btn btn--accent" href="${CTA_PRIMARY.href}">Book a Call</a>
    </div>
    <button class="nav-toggle" data-drawer-open aria-label="Open menu" aria-controls="mobile-drawer" aria-expanded="false">${icon("menu")}</button>
  </div>
</header>`;
}

/* ---- Mobile drawer + backdrop (portaled to end of <body>) ---- */
export function drawer(currentPath = "") {
  const navLinks = NAV.map((n) => {
    const current = n.href === currentPath ? ' aria-current="page"' : "";
    return `<a href="${n.href}"${current} data-drawer-close>${escapeHtml(n.label)}</a>`;
  }).join("");
  const areaLinks = SERVICE_AREA_NAV.map((n) => {
    const current = n.href === currentPath ? ' aria-current="page"' : "";
    return `<a href="${n.href}"${current} data-drawer-close>${escapeHtml(n.label)}</a>`;
  }).join("");
  return `<div class="drawer-backdrop" data-drawer-close hidden-fallback></div>
<aside class="drawer" id="mobile-drawer" aria-hidden="true" aria-label="Menu">
  <div class="drawer__head">
    ${brandMark()}
    <button class="drawer__close" data-drawer-close aria-label="Close menu">${icon("close")}</button>
  </div>
  <nav aria-label="Mobile">${navLinks}</nav>
  <p class="drawer__group-label">Service areas</p>
  <nav aria-label="Service areas">${areaLinks}</nav>
  <div class="drawer__cta">
    <a class="btn btn--accent btn--block" href="${CTA_PRIMARY.href}" data-drawer-close>${escapeHtml(CTA_PRIMARY.label)}</a>
    <a class="drawer__phone" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} ${escapeHtml(SITE.phone)}</a>
  </div>
</aside>`;
}

/* ---- Sticky mobile CTA ---- */
export function stickyCta() {
  return `<div class="sticky-cta" aria-hidden="false">
    <a class="btn btn--accent" href="${CTA_PRIMARY.href}">Book a Call About Your Property</a>
    <a class="btn btn--ghost btn--call" href="tel:${SITE.phoneTel}" aria-label="Call ${escapeAttr(SITE.phone)}">${icon("phone", { width: 20, height: 20 })}</a>
  </div>`;
}

/* ---- Footer ---- */
export function footer() {
  const groups = FOOTER_GROUPS.map(
    (g) => `<div class="footer-col">
      <h4>${escapeHtml(g.heading)}</h4>
      <ul>${g.links.map((l) => `<li><a href="${l.href}">${escapeHtml(l.label)}</a></li>`).join("")}</ul>
    </div>`
  ).join("");
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        ${brandMark({ onDark: true })}
        <p>${escapeHtml(SITE.tagline)} Full-service property management for cabin and vacation rental owners across Gatlinburg, Pigeon Forge, Sevierville, and Wears Valley.</p>
        <div class="footer-contact" style="margin-top:1rem;display:grid;gap:.5rem;font-size:var(--step--1)">
          <a href="tel:${SITE.phoneTel}">${icon("phone", { width: 16, height: 16 })} ${escapeHtml(SITE.phone)}</a>
          <a href="mailto:${SITE.email}">${icon("mail", { width: 16, height: 16 })} ${escapeHtml(SITE.email)}</a>
        </div>
        <div class="footer-social">
          <a href="${SITE.social.facebook}" aria-label="Haven on Facebook" rel="noopener" target="_blank">${icon("facebook", { width: 18, height: 18 })}</a>
          <a href="${SITE.social.instagram}" aria-label="Haven on Instagram" rel="noopener" target="_blank">${icon("instagram", { width: 18, height: 18 })}</a>
        </div>
      </div>
      ${groups}
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(SITE.name)}. Locally owned in the Smoky Mountains since ${SITE.foundingYear}.</span>
      <a href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)} →</a>
    </div>
  </div>
</footer>`;
}

/* ---- Breadcrumbs ---- */
export function breadcrumbs(items = []) {
  const lis = items
    .map((it, i) => {
      const last = i === items.length - 1;
      return last
        ? `<li><span aria-current="page">${escapeHtml(it.label)}</span></li>`
        : `<li><a href="${it.href}">${escapeHtml(it.label)}</a></li>`;
    })
    .join("");
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>${lis}</ol></div></nav>`;
}

/* ---- Generic section head ---- */
export function sectionHead({ eyebrow, title, intro, center = false } = {}) {
  return `<div class="section-head${center ? " center" : ""}">
    ${eyebrow ? `<span class="eyebrow">${escapeHtml(eyebrow)}</span>` : ""}
    ${title ? `<h2>${escapeHtml(title)}</h2>` : ""}
    ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
  </div>`;
}

/* ---- Stats row ---- */
export function statsRow(items = [], { count = 4 } = {}) {
  const cells = items
    .map(
      (s) => `<div class="stat" reveal>
        <b>${escapeHtml(s.value)}${s.unit ? `<span class="stat__unit">${escapeHtml(s.unit)}</span>` : ""}</b>
        <span>${escapeHtml(s.label)}</span>
      </div>`
    )
    .join("");
  return `<div class="stats${count === 3 ? " stats--3" : ""}">${cells}</div>`;
}

/* ---- Service grid ---- */
export function serviceGrid(services) {
  return `<div class="grid grid--4">
    ${services
      .map(
        (s) => `<div class="service" reveal>
        <span class="service__icon">${icon(s.icon, { width: 22, height: 22 })}</span>
        <div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.desc)}</p></div>
      </div>`
      )
      .join("")}
  </div>`;
}

/* ---- Pillars ---- */
export function pillars(items) {
  return `<div class="grid grid--3">
    ${items
      .map(
        (p, i) => `<div class="pillar card" reveal>
        <span class="pillar__num">0${i + 1}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
      </div>`
      )
      .join("")}
  </div>`;
}

/* ---- Process steps ---- */
export function steps(items) {
  return `<div class="steps">
    ${items
      .map(
        (s) => `<div class="step" reveal>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.body)}</p>
      </div>`
      )
      .join("")}
  </div>`;
}

/* ---- Regulations grid ---- */
export function regulations(items) {
  return `<div class="reg-grid">
    ${items
      .map(
        (r) => `<div class="reg" reveal>
        <h3>${icon(r.icon || "scale", { width: 18, height: 18 })}${escapeHtml(r.title)}</h3>
        <p>${escapeHtml(r.body)}</p>
      </div>`
      )
      .join("")}
  </div>`;
}

export function callout({ title, body }) {
  return `<div class="callout" reveal>
    ${icon("alert", { width: 24, height: 24 })}
    <p><strong>${escapeHtml(title)}.</strong> ${escapeHtml(body)}</p>
  </div>`;
}

/* ---- FAQ accordion (+ markup is schema-mirrored separately) ---- */
export function faqAccordion(faqs, idPrefix = "faq") {
  return `<div class="faq">
    ${faqs
      .map((f, i) => {
        const aId = `${idPrefix}-a-${i}`;
        const ans = Array.isArray(f.a) ? f.a : [f.a];
        return `<div class="faq__item">
        <button class="faq__q" id="${idPrefix}-q-${i}" aria-expanded="false" aria-controls="${aId}">
          <span>${escapeHtml(f.q)}</span>
          <span class="faq__icon">${icon("plus", { width: 16, height: 16 })}</span>
        </button>
        <div class="faq__a" id="${aId}" role="region" aria-labelledby="${idPrefix}-q-${i}">
          <div class="faq__a-inner">${paragraphs(ans)}</div>
        </div>
      </div>`;
      })
      .join("")}
  </div>`;
}

/* ---- Testimonial ---- */
export function testimonial(t) {
  const initials = (t.name || "H").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return `<figure class="quote" reveal>
    <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>${escapeHtml(t.quote)}</blockquote>
    <figcaption>
      <span class="quote__avatar" aria-hidden="true">${escapeHtml(initials)}</span>
      <span><b>${escapeHtml(t.name)}</b><span>${escapeHtml(t.role)}${t.location ? ` · ${escapeHtml(t.location)}` : ""}</span></span>
    </figcaption>
  </figure>`;
}

/* ---- Distribution / trust channel strip (social proof) ---- */
export function channelStrip() {
  const channels = ["airbnb", "Vrbo", "Booking.com", "Marriott", "Google"];
  return `<div class="channel-strip">
    <span class="label">Listed &amp; ranked across</span>
    ${channels.map((c) => `<span class="ch">${escapeHtml(c)}</span>`).join("")}
  </div>`;
}

/* ---- Cross-links to other markets ---- */
export function crossLinks(links) {
  return `<div class="xlinks">
    ${links
      .map(
        (l) => `<a class="xlink" href="${l.href}">${escapeHtml(l.label)} ${icon("arrowRight", { width: 18, height: 18 })}</a>`
      )
      .join("")}
  </div>`;
}

/* ---- CTA band ---- */
export function ctaBand({ title, body, showPhone = true }) {
  return `<div class="cta-band" reveal>
    <h2>${escapeHtml(title)}</h2>
    <p>${escapeHtml(body)}</p>
    <div class="cta-row center">
      <a class="btn btn--accent btn--lg" href="${CTA_PRIMARY.href}">${escapeHtml(CTA_PRIMARY.label)}</a>
    </div>
    ${showPhone ? `<a class="phone-link" href="tel:${SITE.phoneTel}">${icon("phone", { width: 18, height: 18 })} Prefer to talk now? Call ${escapeHtml(SITE.phone)}</a>` : ""}
  </div>`;
}

/* ---- Lead form (Book a Call) ---- */
export function leadForm({ heading = "Book a call about your property", marketDefault = "" } = {}) {
  const opts = ["Gatlinburg", "Pigeon Forge", "Sevierville", "Wears Valley", "Townsend", "Other / not sure"]
    .map((m) => `<option value="${escapeAttr(m)}"${m === marketDefault ? " selected" : ""}>${escapeHtml(m)}</option>`)
    .join("");
  return `<div>
  <form class="lead-form" data-lead-form action="https://havenvacationrentals.com/contact-us/" method="post" novalidate>
    <h3>${escapeHtml(heading)}</h3>
    <p class="form-note">Tell us about your cabin and we will show you what it can earn with Haven. No pressure, no obligation.</p>
    <div class="field-row">
      <div class="field"><label for="lf-name">Name <span class="req">*</span></label><input id="lf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="lf-phone">Phone <span class="req">*</span></label><input id="lf-phone" name="phone" type="tel" autocomplete="tel" required></div>
    </div>
    <div class="field"><label for="lf-email">Email <span class="req">*</span></label><input id="lf-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label for="lf-market">Where is your property?</label><select id="lf-market" name="market">${opts}</select></div>
    <div class="field"><label for="lf-msg">Anything we should know? (optional)</label><textarea id="lf-msg" name="message" placeholder="Bedrooms, current management, questions..."></textarea></div>
    <button class="btn btn--accent btn--block btn--lg" type="submit">${escapeHtml(CTA_PRIMARY.label)}</button>
    <p class="form-disclaimer">By submitting you agree to be contacted by Haven about managing your property. We never share your information.</p>
  </form>
  <div class="form-success" tabindex="-1" role="status">Thanks. Your request is in. A local Haven advisor will reach out shortly to talk through your property. Prefer to talk now? Call <a href="tel:${SITE.phoneTel}">${escapeHtml(SITE.phone)}</a>.</div>
</div>`;
}
