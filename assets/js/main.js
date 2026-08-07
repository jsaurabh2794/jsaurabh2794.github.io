/* Saurabh Kumar — portfolio interactions. No dependencies. */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("site-header");

  function syncHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var desktopQuery = window.matchMedia("(min-width: 861px)");

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  navToggle.addEventListener("click", function () {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNav(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      navToggle.focus();
    }
  });

  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) setNav(false);
  });

  /* ---------- Scrollspy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function syncActiveLink() {
    var line = window.scrollY + window.innerHeight * 0.32;
    var activeId = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= line) activeId = section.id;
    });

    // Last section can be too short to ever cross the line; force it at page bottom.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      activeId = sections[sections.length - 1].id;
    }

    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + activeId);
    });
  }

  /* ---------- Scroll listener (rAF-throttled) ---------- */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      syncHeader();
      syncActiveLink();
      ticking = false;
    });
  }, { passive: true });

  syncHeader();
  syncActiveLink();

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealables.forEach(function (el, index) {
      el.style.transitionDelay = Math.min(index % 6, 5) * 60 + "ms";
      observer.observe(el);
    });
  }

  /* ---------- Years of experience, computed so it never goes stale ---------- */
  document.querySelectorAll("[data-years-since]").forEach(function (el) {
    var start = new Date(el.getAttribute("data-years-since"));
    var now = new Date();
    var months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    el.textContent = String(Math.round(months / 12));
  });

  document.getElementById("footer-year").textContent = String(new Date().getFullYear());

  /* ---------- Email assembled at runtime to blunt naive scrapers ---------- */
  var emailLink = document.getElementById("email-link");
  if (emailLink) {
    var address = emailLink.dataset.user + "@" + emailLink.dataset.domain;
    emailLink.href = "mailto:" + address + "?subject=" + encodeURIComponent("Hello Saurabh");
    emailLink.setAttribute("aria-label", "Send an email to " + address);
  }

  /* ---------- Hero terminal typing ---------- */
  var typedTarget = document.getElementById("typed-target");
  var phrases = [
    "building agentic workflows with LangChain",
    "grounding LLMs in real data with RAG",
    "shipping Spring Boot & Node.js microservices",
    "crafting React interfaces that scale",
    "deploying it all on Azure"
  ];

  if (typedTarget) {
    if (prefersReducedMotion) {
      typedTarget.textContent = phrases[0];
      var caret = document.getElementById("typed-caret");
      if (caret) caret.remove();
    } else {
      var phraseIndex = 0;
      var charIndex = 0;
      var deleting = false;

      (function tick() {
        var phrase = phrases[phraseIndex];
        charIndex += deleting ? -1 : 1;
        typedTarget.textContent = phrase.slice(0, charIndex);

        var delay = deleting ? 28 : 58;

        if (!deleting && charIndex === phrase.length) {
          deleting = true;
          delay = 1900;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 380;
        }

        window.setTimeout(tick, delay);
      })();
    }
  }
})();
