/* ════════════════════════════════════════════════════════════════
   JNFC — landing page interactions
   1. Mobile nav toggle
   2. Sticky "Apply for a Strategy Call" bar (appears after hero)
   3. Apply modal + placeholder form (wire to real endpoint here)
   4. Video testimonial placeholder modal (wire real embeds here)
   ════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── 1 · Mobile nav ─────────────────────────────────────────── */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", function () {
    const open = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // close the panel when a nav link is chosen
  mainNav.addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ── 2 · Sticky CTA bar ─────────────────────────────────────── */
  const sticky = document.getElementById("stickyCta");
  const hero = document.getElementById("hero");

  const showBar = () => {
    const past = window.scrollY > hero.offsetTop + hero.offsetHeight - 80;
    sticky.classList.toggle("is-visible", past);
    sticky.setAttribute("aria-hidden", String(!past));
  };
  showBar();
  window.addEventListener("scroll", showBar, { passive: true });

  /* ── Modals: shared open/close plumbing ─────────────────────── */
  let lastFocus = null;

  function openModal(modal, focusEl) {
    lastFocus = document.activeElement;
    document.body.classList.add("modal-open");
    modal.hidden = false;
    (focusEl || modal.querySelector("button, input, select, a")).focus();
    document.addEventListener("keydown", onEsc);
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onEsc);
    if (lastFocus) lastFocus.focus();
  }

  function onEsc(e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal:not([hidden])").forEach(closeModal);
    }
  }

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".modal:not([hidden])").forEach(closeModal);
    });
  });

  /* ── 3 · Apply modal ────────────────────────────────────────── */
  const applyModal = document.getElementById("applyModal");
  const applyForm = document.getElementById("applyForm");
  const formView = document.getElementById("applyFormView");
  const successView = document.getElementById("applySuccessView");
  const successMsg = document.getElementById("successMsg");

  document.querySelectorAll("[data-apply]").forEach((btn) => {
    btn.addEventListener("click", () => {
      formView.hidden = false;
      successView.hidden = true;
      openModal(applyModal, document.getElementById("fName"));
    });
  });

  applyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // light validation
    const name = document.getElementById("fName");
    const email = document.getElementById("fEmail");
    const goal = document.getElementById("fGoal");
    let ok = true;
    [name, email, goal].forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) return;

    /* ▼▼▼ PLACEHOLDER ENDPOINT ──────────────────────────────────
       Connect this to your real application tool before launch, e.g.:

         await fetch("https://formspree.io/f/XXXX", {
           method: "POST",
           headers: { "Content-Type": "application/json", Accept: "application/json" },
           body: JSON.stringify(Object.fromEntries(new FormData(applyForm)))
         });

       …then keep the success view below (or redirect to your
       Typeform / Calendly booking link).
    ───────────────────────────────────────────────────────────── */
    console.log("[JNFC demo] Application payload:", Object.fromEntries(new FormData(applyForm)));

    successMsg.textContent =
      "Thanks, " + name.value.trim().split(" ")[0] +
      " — check your inbox. Next steps are on the way.";
    formView.hidden = true;
    successView.hidden = false;
  });

  applyForm.addEventListener("input", (e) => e.target.classList.remove("invalid"));

  /* ── 4 · Video testimonial placeholders ─────────────────────── */
  const videoModal = document.getElementById("videoModal");
  const videoName = document.getElementById("videoName");

  /* ▼▼▼ PLACEHOLDER EMBEDS ───────────────────────────────────────
     Replace this handler's contents with your real players, e.g.:
     frame.innerHTML = '<iframe src="https://www.youtube.com/embed/ID"
        title="Maya testimonial" allowfullscreen></iframe>';
  ─────────────────────────────────────────────────────────────── */
  document.querySelectorAll(".vid-card").forEach((card) => {
    card.addEventListener("click", () => {
      videoName.textContent = card.dataset.name;
      openModal(videoModal, videoModal.querySelector(".modal-x"));
    });
  });
})();
