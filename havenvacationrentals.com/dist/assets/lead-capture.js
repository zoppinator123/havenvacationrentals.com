/* StaydOS lead capture — Haven.
   Non-blocking: hooks every form on the page (capture phase) and dual-sends the
   lead to the StaydOS inbound endpoint. The form's own submit/redirect still runs. */
(function () {
  // ===== per-brand config (only BRAND_ID matters) =====
  var BRAND_ID = 'haven';    // Haven — StaydOS leaf brand id
  var CHANNEL  = '';          // blank = auto-detect from UTMs
  var ENDPOINT = 'https://stayd-os-rho.vercel.app/api/leads/inbound';
  var COOKIE_DOMAIN = '.' + location.hostname.split('.').slice(-2).join('.'); // e.g. .havenvacationrentals.com
  // ====================================================

  var CLICK_KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'];

  function readStore() {
    var m = document.cookie.match(/(?:^|;\s*)sc_attr=([^;]+)/);
    try { return m ? JSON.parse(decodeURIComponent(m[1])) : {}; } catch (e) { return {}; }
  }
  function writeStore(obj) {
    document.cookie = 'sc_attr=' + encodeURIComponent(JSON.stringify(obj)) +
      ';domain=' + COOKIE_DOMAIN + ';path=/;max-age=' + (90 * 86400) + ';samesite=lax';
  }

  // Merge this page's UTMs into the shared cookie (first-touch wins).
  var qs = new URLSearchParams(location.search), store = readStore(), changed = false;
  CLICK_KEYS.forEach(function (k) { var v = qs.get(k); if (v && !store[k]) { store[k] = v; changed = true; } });
  if (changed) writeStore(store);
  function attr(k) { return qs.get(k) || store[k] || null; }

  function channel() {
    if (CHANNEL) return CHANNEL;
    var s = ((attr('utm_source') || '') + ' ' + (attr('utm_medium') || '')).toLowerCase();
    if (/direct[-_ ]?mail|mailer|postcard|eddm/.test(s)) return 'direct_mail';
    if (attr('gclid') || /google|adwords|gads/.test(s)) return 'google_ads';
    if (attr('fbclid') || /facebook|meta|instagram|\bfb\b|\big\b/.test(s)) return 'meta_ads';
    if (/email|newsletter|klaviyo|mailchimp/.test(s)) return 'inbound';
    return 'website';
  }

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

  function send(form) {
    var name  = pick(form, null, /(full[\s_-]?name|your[\s_-]?name|^name$|contact|\bname\b)/) ||
                [pick(form, null, /(first[\s_-]?name|fname|given)/),
                 pick(form, null, /(last[\s_-]?name|lname|surname|family)/)].filter(Boolean).join(' ').trim() || null;
    var email = pick(form, 'email', /e-?mail/);
    var phone = pick(form, 'tel', /(phone|tel|mobile|cell)/);
    if (!name && !email && !phone) return; // not a lead form — skip

    var payload = {
      brandId: BRAND_ID, channel: channel(), campaign: attr('utm_campaign'),
      name: name, email: email, phone: phone,
      message: pick(form, null, /(message|comment|note|details|tell us)/),
      property_address: pick(form, null, /(address|street|property)/),
      management_situation: pick(form, null, /(manage|management|managed)/),
      landing_page: location.origin + location.pathname,
      referrer: document.referrer || null
    };
    CLICK_KEYS.forEach(function (k) { var v = attr(k); if (v) payload[k] = v; });
    // Forward EVERY named field too, so nothing is lost (stored in raw_payload).
    try { new FormData(form).forEach(function (v, k) { if (payload[k] === undefined) payload[k] = v; }); } catch (e) {}

    fetch(ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), keepalive: true
    }).catch(function (err) { console.error('lead capture failed', err); });
  }

  // Hook every form — capture phase, non-blocking (the form still submits/redirects).
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.tagName === 'FORM') { try { send(e.target); } catch (err) {} }
  }, true);
})();
