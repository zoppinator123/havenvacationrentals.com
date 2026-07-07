/* Haven Vacation Rentals — progressive enhancement only.
   The site is fully readable and navigable with JS disabled; this adds
   the mobile drawer, FAQ accordion, sticky CTA, scroll reveal, and a
   client-side success state for the Book a Call form. */
(function () {
  "use strict";
  var doc = document;

  /* ---- Header scroll state ---- */
  var header = doc.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    var sticky = doc.querySelector(".sticky-cta");
    if (sticky) sticky.classList.toggle("is-visible", window.scrollY > 520);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile drawer ---- */
  var drawer = doc.querySelector(".drawer");
  var backdrop = doc.querySelector(".drawer-backdrop");
  var openBtns = doc.querySelectorAll("[data-drawer-open]");
  var closeBtns = doc.querySelectorAll("[data-drawer-close]");
  var lastFocus = null;
  function openDrawer() {
    lastFocus = doc.activeElement;
    if (drawer) { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); }
    if (backdrop) backdrop.classList.add("is-open");
    doc.body.style.overflow = "hidden";
    var first = drawer && drawer.querySelector("a, button");
    if (first) first.focus();
  }
  function closeDrawer() {
    if (drawer) { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); }
    if (backdrop) backdrop.classList.remove("is-open");
    doc.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  openBtns.forEach(function (b) { b.addEventListener("click", openDrawer); });
  closeBtns.forEach(function (b) { b.addEventListener("click", closeDrawer); });
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

  /* ---- FAQ accordion ---- */
  doc.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = doc.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.style.maxHeight = expanded ? "0px" : panel.scrollHeight + "px";
    });
  });
  // keep open panels sized correctly on resize
  window.addEventListener("resize", function () {
    doc.querySelectorAll('.faq__q[aria-expanded="true"]').forEach(function (btn) {
      var panel = doc.getElementById(btn.getAttribute("aria-controls"));
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });

  /* ---- Scroll reveal ---- */
  var revealEls = doc.querySelectorAll("[reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Live listings iframe loading + browser-fit sizing ---- */
  var listingsFrameWraps = doc.querySelectorAll(".live-listings__frame-wrap");
  function fitListingsFrames() {
    if (!listingsFrameWraps.length) return;
    var viewport = window.visualViewport || window;
    var vh = viewport.height || window.innerHeight || doc.documentElement.clientHeight;
    var vw = viewport.width || window.innerWidth || doc.documentElement.clientWidth;
    var isMobile = vw < 720;
    var reservedChrome = isMobile ? 76 : 88;
    var min = isMobile ? 520 : 640;
    var max = isMobile ? 820 : 1120;
    var height = Math.min(max, Math.max(min, Math.round(vh - reservedChrome)));
    listingsFrameWraps.forEach(function (wrap) {
      wrap.style.setProperty("--live-listings-frame-height", height + "px");
    });
  }
  fitListingsFrames();
  window.addEventListener("resize", fitListingsFrames, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener("resize", fitListingsFrames, { passive: true });

  doc.querySelectorAll("[data-listings-frame]").forEach(function (frame) {
    function loaded() {
      frame.classList.add("is-loaded");
      if (frame.parentElement) frame.parentElement.classList.add("is-loaded");
    }
    frame.addEventListener("load", loaded, { once: true });
    // If the browser restores the iframe from cache before this script runs,
    // remove the skeleton shortly after hydration instead of leaving a blank shell.
    window.setTimeout(function () {
      if (!frame.classList.contains("is-loaded")) loaded();
    }, 3500);
  });

  /* ---- Lead form -> StaydOS CRM + Calendly scheduling page ----
     Once a visitor fills out a lead form, post the lead to the Vercel API
     route. The API creates a StaydOS Haven CRM deal and emails Sales, then
     sends the visitor to the booking page with Calendly embedded. */
  doc.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var submit = form.querySelector('button[type="submit"]');
      var originalText = submit ? submit.textContent : "";
      if (submit) { submit.disabled = true; submit.textContent = "Sending..."; }

      var success = form.parentNode.querySelector(".form-success");
      var redirect = form.getAttribute("data-calendly-redirect") || "/book-a-call/";
      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });
      payload.page = window.location.href;

      fetch(form.getAttribute("action") || "/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin"
      }).then(function (res) {
        if (!res.ok) throw new Error("Lead submission failed");
        return res.json();
      }).then(function () {
        form.style.display = "none";
        if (success) { success.classList.add("is-visible"); success.focus && success.focus(); }
        window.dataLayer && window.dataLayer.push({ event: "book_a_call_submit" });
        window.location.href = redirect;
      }).catch(function (err) {
        console.error(err);
        alert("Sorry, we couldn't submit the form. Please call Haven at 865-205-4650 or email sales@havenvacationrentals.com.");
        if (submit) { submit.disabled = false; submit.textContent = originalText; }
      });
    });
  });

  /* ---- YouTube facade: load the iframe only when the user clicks play ----
     Keeps the page fast (no YouTube JS until requested) and privacy-friendly. */
  doc.querySelectorAll("[data-yt-id]").forEach(function (el) {
    function load() {
      if (el.classList.contains("yt--loaded")) return;
      var id = el.getAttribute("data-yt-id");
      var frame = doc.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      frame.title = el.getAttribute("aria-label") || "Video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.setAttribute("allowfullscreen", "");
      frame.loading = "lazy";
      el.innerHTML = "";
      el.appendChild(frame);
      el.classList.add("yt--loaded");
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
    }
    el.addEventListener("click", load);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); load(); }
    });
  });

  doc.querySelectorAll("[data-loom-id]").forEach(function (el) {
    function load() {
      if (el.classList.contains("yt--loaded")) return;
      var id = el.getAttribute("data-loom-id");
      var frame = doc.createElement("iframe");
      frame.src = "https://www.loom.com/embed/" + id;
      frame.title = el.getAttribute("aria-label") || "Loom video";
      frame.setAttribute("allowfullscreen", "");
      frame.loading = "lazy";
      el.innerHTML = "";
      el.appendChild(frame);
      el.classList.add("yt--loaded");
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
    }
    el.addEventListener("click", load);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); load(); }
    });
  });
})();
