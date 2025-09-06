<p align="right" dir="ltr">
  <a href="./README.md" lang="fr" hreflang="fr" rel="alternate" title="Lire la doc en français" aria-label="Lire la doc en français">Français</a> · 🇬🇧 <strong>English</strong>
</p>

# Frontend Mentor – Stats preview card component (solution)

[![Vite](https://img.shields.io/badge/Vite-⚡-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Netlify](https://img.shields.io/badge/Netlify-deploy-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/) [![Live](https://img.shields.io/badge/Live-jb--fem--stats--preview--card.netlify.app-brightgreen)](https://jb-fem-stats-preview-card.netlify.app/)

This repo contains my solution to **[Stats preview card component](https://www.frontendmentor.io/challenges/stats-preview-card-component-8JqbgoU62)** by Frontend Mentor.

> 🎯 Personal goal: build an **a11y‑friendly, semantic, performant and modern** component, with special care for typography (locally hosted fonts), images (color overlay), and clean HTML structure. The tech choices (Vite + Tailwind v4) are intentional to strengthen my mastery of this stack.

---

## 🔎 Overview

### The challenge

- Build a responsive card that adapts **mobile → desktop**.
- Follow the provided **palette** and **typography**.
- Highlight the **statistics** (Companies / Templates / Queries).

### Screenshot

![Solution screenshot](https://jb-fem-stats-preview-card.netlify.app/og.jpg)

### Links

- Live: https://jb-fem-stats-preview-card.netlify.app/

---

## 🚀 Running the project

```bash
npm install
npm run dev      # local server
npm run build    # production build (dist/)
npm run preview  # preview the build locally
```

---

## 🧱 Built with

- **Semantic HTML5** (`main`, `article`, `figure/picture/img`, `dl/dt/dd` for the stats)
- **Tailwind CSS v4** (_CSS‑first_ approach with `@theme` tokens)
- **Flexbox & CSS Grid** (two‑column desktop layout, stats pinned to the bottom of the text panel)
- **Mobile‑first workflow**
- **Locally hosted WOFF2** fonts (Inter 400/700, Lexend Deca 400) + `font-display: swap`
- **Vite** (fast build, strips console/debugger, fingerprinted assets)
- **Netlify** (security & caching headers via `netlify.toml`)

---

## 🧭 Approach & implementation choices

### HTML structure

- Stats as a **definition list** `dl` with **visually hidden** `dt` (full semantic meaning without visual noise).
- Media block using `<picture>` (desktop source + mobile fallback) and a **purple overlay** via CSS (`mix-blend`/opacity) to match the art direction.
- **Responsive**: mobile‑first, switch to `lg:grid-cols-2`; the text column becomes `flex` on desktop (justify-between) to stick the **stats to the bottom**.

### Design System (Tailwind v4)

- **Tokens** declared in `@theme`: colors (`--color-*`), font families (`--font-*`), radius (`--radius-\*`), breakpoint (`--breakpoint-lg`).
- Automatic mapping tokens → utilities (`--color-accent` → `text-accent`, `bg-accent`, etc.).
- Reusable `.link` component for readable links: always‑visible underline, larger offset on hover, and an accessible **focus ring**.

### Fonts

- **Locally hosted** in `public/fonts`, and preload **only** the above‑the‑fold weights (Inter 700/400) to avoid _preloaded but not used quickly_ warnings.
- `font-synthesis-weight: none`: none to avoid fake bolding.

### Images

- Hero image **above the fold**: `loading="eager"`, `decoding="async"`, `fetchpriority="high"`.
- Overlay via **CSS** (no heavy filter).

> Next step: generate **AVIF/WebP** with `srcset`/`sizes` to pass audits and further improve LCP.

---

## ♿ Accessibility (a11y)

- **Solid semantics**: `dl/dt/dd`, `figure/picture/img` with descriptive `alt`.
- **Contrast checked** (dark card background, purple overlay, white/attenuated text).
- **Visible focus** states on links (`focus-visible` + ring).
- Logical DOM order and full keyboard support.

---

## ⚡ Performance

- **Tailwind v4 JIT** → minimal CSS.
- **WOFF2 fonts** + targeted `preload` + `swap`.
- **Vite**: `sourcemap: false`, `drop: ["console","debugger"]`, `assetsInlineLimit: 0` to avoid useless inlining.
- **Netlify**: long‑term caching for fingerprinted assets/fonts, production security headers.

> Improvement idea: inline **critical CSS** with [`vite-plugin-beasties`](https://github.com/danielroe/beasties) for better FCP/LCP.

---

## 🧪 My process

### Technologies used

- **Semantic HTML5 markup**
- **CSS custom properties** (via Tailwind v4 tokens in @theme)
- **Flexbox**
- **CSS Grid**
- **Mobile‑first workflow**
- **Vite** (bundler/build)
- **Tailwind CSS v4**
- **Netlify** (hosting & headers)

### What I learned

A few representative snippets:

**1. Stats with `dl/dt/dd` (semantics + a11y)**

```html
<dl class="mt-8 grid gap-6 sm:grid-cols-3">
  <div>
    <dt class="sr-only">Companies</dt>
    <dd class="mb-1 text-2xl font-bold text-white">10k+</dd>
    <dd class="font-lexend text-white-stat text-sm tracking-widest uppercase">
      Companies
    </dd>
  </div>
  <!-- ... -->
</dl>
```

The `dl/dt/dd` tags offer a **native, SEO-friendly, semantic solution** for this type of common layout.

**2. Tailwind v4 tokens (`@theme`) → theming & auto‑generated utilities**

```css
@import "tailwindcss";
@theme {
  --color-dark: hsl(233, 47%, 7%);
  --color-card: hsl(244, 37%, 16%);
  --color-accent: hsl(277, 64%, 61%);
  --color-white-paragraph: hsla(0, 0%, 100%, 0.75);
  --color-white-stat: hsl(0 0% 100% / 0.6);
  --font-sans:
    "Inter", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-lexend: "Lexend Deca", var(--font-sans);
  --radius-card: 8px;
  --breakpoint-lg: 1024px;
}
/* ... then I use text-white-paragraph, text-accent, rounded-card, lg:... */
```

Tailwind reads the token prefix and generates the corresponding utilities (JIT):

- `--color-*` → color utilities (`text-_`, `bg-_`, `border-_`, `ring-_`, `fill-_`, `stroke-_`)
- `--font-*` → font family utilities (`font-\*`)
- `--radius-*` → radius utilities (`rounded-_`, `rounded-t-_`, etc.)
- `--breakpoint-*` → responsive prefixes (`sm:`, `md:`, `lg:`, ...)

This v4 model keeps the source of truth in CSS (no `tailwind.config.js` required for these fundamentals).

**3. Readable & accessible links (underline offset + focus ring)**

```css
@layer components {
  .link {
    @apply focus-visible:ring-accent focus-visible:ring-offset-dark rounded-[2px] underline decoration-white/60 decoration-1 underline-offset-2 transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
    text-decoration-skip-ink: auto;
  }

  @media (hover: hover) {
    .link:hover {
      @apply decoration-accent text-white underline-offset-4;
    }
  }
}
```

Like theming, Tailwind v4 makes it straightforward to create reusable, accessible UI components.

### Continued development

- **Next‑gen & responsive images**: integrate `vite-imagetools` to generate AVIF/WebP + `srcset`/`sizes` automatically.
- **Critical CSS**: try `vite-plugin-beasties` to inline critical rules for larger pages.
- **Automated OG**: generalize a Sharp (or Puppeteer+Sharp) script to produce share images across projects.
- **SSG**: explore Astro/Eleventy to factor a layout and emit zero‑JS static HTML where appropriate.
- **Lighthouse CI**: automate perf/a11y checks on each PR.

### Useful resources

- Tailwind v4 – `@theme` & tokens : https://tailwindcss.com/docs/theme
- MDN – Responsive images (`<picture>`, `srcset`, `sizes`) : https://developer.mozilla.org/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- vite-imagetools : https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite
- Beasties (Critters) – Vite plugin : https://github.com/danielroe/beasties

---

## 👤 Author

- Website (preview) — https://www.julienborgeon.fr

---

## 🙌 Acknowledgments

Thanks to **Frontend Mentor** for the design and the community for feedback.
Shout‑out to MDN & Tailwind for their excellent documentation.

---

## 📁 Project structure

```bash
public/
  assets/
    favicon-32x32.png
    image-header-desktop.jpg
    image-header-mobile.jpg
  fonts/
    inter-v19-latin-700.woff2
    inter-v19-latin-regular.woff2
    lexend-deca-v24-latin-regular.woff2
    og.jpg
src/
  main.css
.gitattributes
.gitignore
.prettierrc     → Tailwind IntelliSense + Prettier (VSC)
index.html
netlify.toml
package-lock.json
package.json
README.md
vite.config.js
```
