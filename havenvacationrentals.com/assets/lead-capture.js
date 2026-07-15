/* StaydOS unified tracker — lead capture + form funnel (Haven, v2).
   Non-blocking: hooks every form (capture phase), sends the lead to the StaydOS inbound
   endpoint, AND tracks the form-funnel session (start / step / drop / submit) so
   Marketing -> Funnels and the Website (SEO) funnel populate. The form's own submit/redirect
   still runs.
   v2: first-touch attribution (external referrer + landing persisted; internal navigation never
   overwrites it) and SPA-aware drop detection (client-side route change fires `dropped`). */
(function () {
  // ===== per-brand config (only BRAND_ID matters) =====
  var BRAND_ID    = 'haven';   // Haven — StaydOS leaf brand id
  var CHANNEL     = '';         // blank = auto-detect from UTMs
  var LEAD_URL    = 'https://stayd-os-rho.vercel.app/api/leads/inbound';
  var SESSION_URL = 'https://stayd-os-rho.vercel.app/api/forms/session';
  var COOKIE_DOMAIN = '.' + location.hostname.split('.').slice(-2).join('.'); // e.g. .havenvacationrentals.com
  // ====================================================

  var CLICK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

  // ---- attribution (persisted 90d, first-touch wins) ----
  function readStore() {
    var m = document.cookie.match(/(?:^|;\s*)sc_attr=([^;]+)/);
    try { return m ? JSON.parse(decodeURIComponent(m[1])) : {}; } catch (e) { return {}; }
  }
  function writeStore(obj) {
    document.cookie = 'sc_attr=' + encodeURIComponent(JSON.stringify(obj)) +
      ';domain=' + COOKIE_DOMAIN + ';path=/;max-age=' + (90 * 86400) + ';samesite=lax';
  }
  var qs = new URLSearchParams(location.search), store = readStore(), changed = false;
  CLICK_KEYS.forEach(function (k) { var v = qs.get(k); if (v && !store[k]) { store[k] = v; changed = true; } });

  // First-touch referrer + landing page: recorded once, from the first page whose referrer is
  // external or empty. Internal (same-host) referrers never set it, so navigating within the
  // site can't rewrite "arrived via Google / direct" into a same-site "referral".
  if (!store.rt) {
    var ref = document.referrer || '';
    var internal = false;
    try { internal = !!ref && new URL(ref).host === location.host; } catch (e) {}
    if (!internal) { store.ref = ref; store.land = location.origin + location.pathname; store.rt = 1; changed = true; }
  }
  if (changed) writeStore(store);

  function attr(k) { return qs.get(k) || store[k] || null; }
  function firstRef() { return store.ref || null; }                                   // '' (direct) -> null
  function firstLand() { return store.land || (location.origin + location.pathname); }

  function channel() {
    if (CHANNEL) return CHANNEL;
    var s = ((attr('utm_source') || '') + ' ' + (attr('utm_medium') || '')).toLowerCase();
    if (/direct[-_ ]?mail|mailer|postcard|eddm/.test(s)) return 'direct_mail';
    if (attr('gclid') || /google|adwords|gads/.test(s)) return 'google_ads';
    if (attr('fbclid') || /facebook|meta|instagram|\bfb\b|\big\b/.test(s)) return 'meta_ads';
    if (/email|newsletter|klaviyo|mailchimp/.test(s)) return 'inbound';
    return 'website';
  }

  // ---- form-session funnel (start / step / drop / submit) ----
  function sessionKey() {
    try {
      var k = sessionStorage.getItem('sc_fs_key');
      if (!k) { k = 'fs_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10); sessionStorage.setItem('sc_fs_key', k); }
      return k;
    } catch (e) { return 'fs_' + Date.now(); }
  }
  var sessions = new WeakMap();
  var startedForms = [];
  function st(form) { var s = sessions.get(form); if (!s) { s = { started: false, submitted: false, dropped: false, lastStep: null }; sessions.set(form, s); } return s; }
  function formName(form) { return form.getAttribute('data-stayd-form') || form.getAttribute('name') || form.id || 'website-form'; }
  function sessPayload(form, extra) {
    var p = {
      sessionKey: sessionKey(), brandId: BRAND_ID, form: formName(form), channel: channel(),
      campaign: attr('utm_campaign'), page: location.pathname, landingPage: firstLand(),
      referrer: firstRef(), utmSource: attr('utm_source'), utmMedium: attr('utm_medium'), utmCampaign: attr('utm_campaign')
    };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  function sendSession(form, extra, beacon) {
    var body = JSON.stringify(sessPayload(form, extra));
    if (beacon && navigator.sendBeacon) { navigator.sendBeacon(SESSION_URL, new Blob([body], { type: 'application/json' })); return; }
    fetch(SESSION_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
  }
  // Fire `dropped` for started, non-submitted forms. force=true (real unload) drops all;
  // otherwise only forms no longer in the DOM (unmounted by a client-side route change).
  function flushDrops(force) {
    for (var i = 0; i < startedForms.length; i++) {
      var form = startedForms[i], s = sessions.get(form);
      if (s && s.started && !s.submitted && !s.dropped && (force || !document.contains(form))) {
        s.dropped = true;
        sendSession(form, { status: 'dropped', lastStep: s.lastStep, droppedAt: new Date().toISOString() }, force);
      }
    }
  }
  document.addEventListener('focusin', function (e) {
    var form = e.target && e.target.form; if (!form) return;
    var s = st(form); if (s.started) return; s.started = true;
    if (startedForms.indexOf(form) < 0) startedForms.push(form);
    sendSession(form, { status: 'in_progress' });
  }, true);
  document.addEventListener('change', function (e) {
    var form = e.target && e.target.form; if (!form) return;
    var name = e.target.name || e.target.id; if (!name) return;
    var s = st(form); if (s.lastStep === name) return; s.lastStep = name;
    if (s.started) sendSession(form, { status: 'in_progress', lastStep: name });
  }, true);
  window.addEventListener('pagehide', function () { flushDrops(true); });
  // SPA route changes: patch pushState + listen to popstate; a short delay lets the framework
  // unmount the old page's forms before we check document.contains().
  (function () {
    var _push = history.pushState;
    history.pushState = function () { var r = _push.apply(this, arguments); setTimeout(function () { flushDrops(false); }, 400); return r; };
    window.addEventListener('popstate', function () { setTimeout(function () { flushDrops(false); }, 400); });
  })();

  // ---- lead capture ----
  function pick(form, type, re) {
    var el = type && form.querySelector('input[type="' + type + '"]');
    if (el && el.value.trim()) return el.value.trim();
    var inputs = form.querySelectorAll('input, textarea, select');
    for (var i = 0; i < inputs.length; i++) {
      var f = inputs[i];
      var hay = [f.name, f.id, f.placeholder, f.getAttribute('autocomplete'), f.getAttribute('aria-label')]
        .join(' ').toLowerCase();
      if (re.test(hay) && f.value.trim()) return f.value.trim();
    }
    return null;
  }
  function sendLead(form) {
    var name = pick(form, null, /(full[\s_-]?name|your[\s_-]?name|^name$|contact|\bname\b)/) ||
      [pick(form, null, /(first[\s_-]?name|fname|given)/),
       pick(form, null, /(last[\s_-]?name|lname|surname|family)/)].filter(Boolean).join(' ').trim() || null;
    var email = pick(form, 'email', /e-?mail/);
    var phone = pick(form, 'tel', /(phone|tel|mobile|cell)/);
    if (!name && !email && !phone) return Promise.resolve(null); // not a lead form — skip

    var payload = {
      brandId: BRAND_ID, channel: channel(), campaign: attr('utm_campaign'),
      name: name, email: email, phone: phone,
      message: pick(form, null, /(message|comment|note|details|tell us)/),
      property_address: pick(form, null, /(address|street|property)/),
      management_situation: pick(form, null, /(manage|management|managed)/),
      form: formName(form),
      landing_page: firstLand(),
      referrer: firstRef()
    };
    CLICK_KEYS.forEach(function (k) { var v = attr(k); if (v) payload[k] = v; });
    try { new FormData(form).forEach(function (v, k) { if (payload[k] === undefined) payload[k] = v; }); } catch (e) {}

    return fetch(LEAD_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), keepalive: true
    }).then(function (r) { return r.json(); }).then(function (j) { return (j && j.id) || null; })
      .catch(function (err) { console.error('lead capture failed', err); return null; });
  }

  document.addEventListener('submit', function (e) {
    var form = e.target; if (!form || form.tagName !== 'FORM') return;
    var s = st(form); s.submitted = true;
    // completion — sent immediately so it survives the form's own redirect
    sendSession(form, { status: 'submitted', lastStep: s.lastStep });
    // capture the lead, then link its id back to the session (best-effort)
    try { sendLead(form).then(function (leadId) { if (leadId) sendSession(form, { status: 'submitted', lastStep: s.lastStep, leadId: leadId }); }); } catch (err) {}
  }, true);
})();
