# JNFC — Landing Page

One-page, mobile-first landing page for **JNFC (Jordan's Nutrition & Fitness Coaching)** —
a faith-rooted 1:1 health coaching program for women.

**Single conversion goal:** click **“Apply for a Strategy Call.”**

## Stack

No build step, no dependencies — plain HTML + CSS + a little vanilla JS.

```
index.html    — all content & structure
styles.css    — design system (colors, type, layout)
main.js       — nav, sticky CTA, apply modal, video modal
favicon.svg
images/       — AI-generated PLACEHOLDER photos (swap before launch)
```

## Run locally

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

(Any static host works — Netlify, Vercel, GitHub Pages, Squarespace code block, etc.)

## Brand system

| Token      | Value                 | Use                          |
| ---------- | --------------------- | ---------------------------- |
| Ink        | `#171110`             | dark sections, text          |
| Warm white | `#FDFAF7` / `#FFFFFF` | light section backgrounds    |
| Blush      | `#F4DCD6` (+ `#E5B9B1` deep) | accents, icons, section bg |
| Maroon     | `#701C27` (+ `#54101A` deep) | **CTA buttons only** + accents |

- Headlines: **Fraunces** 900, uppercase, serif
- Body/UI: **Manrope** 400–800, sans
- Every CTA on the page uses the same `.btn-cta` class and the same copy — **“Apply for a Strategy Call.”**

## ✅ Content swap checklist (placeholders are tagged in the code)

Every placeholder is marked with a `PLACEHOLDER` comment in the HTML and a small
“Placeholder” chip on the page itself.

1. **Hero photo** — replace `images/hero.jpg` (keep the filename).
2. **Credential badges** — confirm exact certification names in the `#credentials` strip.
3. **Transformation gallery** — replace `images/transform-1/2/3.jpg` with **real client
   before/afters** and update the captions with **real, verified results** (first name +
   specific result, e.g. “Amara, down 15 lbs in 10 weeks”). Do not publish invented results.
4. **Video testimonials** — replace `images/video-1/2/3.jpg` with well-chosen video stills
   (eyes open, good posture, no mid-word frames) and swap the placeholder modal in `main.js`
   (`▼ PLACEHOLDER EMBEDS`) for real YouTube/Vimeo embeds.
5. **Application form** — the form in the apply modal is a demo. Wire it to your real
   endpoint in `main.js` under `▼ PLACEHOLDER ENDPOINT` (Formspree / Typeform / Jotform /
   CRM), or redirect to a booking link.
6. **Footer** — set the real email address and social URLs (currently `#`).
7. **Stats** — “100+ women coached” in the hero needs to be a real number.
8. **Meta** — update `<title>`, meta description, and `og:image` if desired.

## Notes on the conversion design

- **One CTA style, one message.** Maroon pill button, identical copy, used in the header,
  hero, call section, FAQ, footer, and the sticky bar. Nothing else on the page uses maroon
  fills, so the button is always the loudest element.
- **Sticky CTA.** A bottom bar (desktop: floating pill, bottom-right) slides in after the
  hero so the CTA is always reachable on a long phone scroll.
- **Single gallery.** Transformations appear once, in one consolidated grid — no repeated
  photo strips.
- **Objection handling.** FAQ answers cost, time, beginner-fit, faith fit, and what happens
  post-apply, right before the footer CTA.
