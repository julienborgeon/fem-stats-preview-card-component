<p align="right" dir="ltr">
  🇫🇷 <strong>Français</strong> ·
  <a href="./README.en.md" lang="en" hreflang="en" rel="alternate" title="Read this doc in English" aria-label="Read this doc in English">English</a>
</p>

# Frontend Mentor – Stats preview card component (solution)

[![Vite](https://img.shields.io/badge/Vite-⚡-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Netlify](https://img.shields.io/badge/Netlify-deploy-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/) [![Live](https://img.shields.io/badge/Live-jb--fem--stats--preview--card.netlify.app-brightgreen)](https://jb-fem-stats-preview-card.netlify.app/)

Ce repo contient ma solution au défi **[Stats preview card component](https://www.frontendmentor.io/challenges/stats-preview-card-component-8JqbgoU62)** de Frontend Mentor.

> 🎯 Objectif personnel : produire un **composant accessible (Ay11 friendly), sémantique, performant et moderne**, avec une attention particulière à la typographie (polices locales), aux images (overlay colorimétrique), et à la structure HTML. Le choix des technologies (Vite + Tailwind v4) est arbitraire et a pour but de peaufiner ma maîtrise du framework.

---

## 🔎 Aperçu

### Le challenge

- Afficher une carte responsive qui s’adapte automatiquement au device **mobile → desktop**.
- Respecter la **palette** et la **typographie** fournies.
- Mettre en valeur les **statistiques** (Companies / Templates / Queries).

### Capture

![Screenshot de la solution](https://jb-fem-stats-preview-card.netlify.app/og.jpg)

### Liens

- Live : https://jb-fem-stats-preview-card.netlify.app/

---

## 🚀 Lancer le projet

```bash
npm install
npm run dev      # serveur local
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualisation du build
```

---

## 🧱 Construit avec

- **HTML5 sémantique** (`main`, `article`, `figure/picture/img`, `dl/dt/dd` pour les stats)
- **Tailwind CSS v4** (approche _CSS-first_ avec `@theme` pour définir des tokens)
- **Flexbox & CSS Grid** (layout 2 colonnes en desktop, stats plaquées en bas du panneau texte)
- **Mobile-first workflow**
- **Polices locales WOFF2** (Inter 400/700, Lexend Deca 400) + `font-display: swap`
- **Vite** (build performant, purge console/debugger, assets fingerprintés)
- **Netlify** (headers de sécurité & cache via `netlify.toml`)

---

## 🧭 Démarche & choix d’implémentation

### Structure HTML

- Stats en **liste de définitions** `dl` avec `dt` **visuellement masqués** (sens sémantique complet sans bruit visuel).
- Bloc médias en `<picture>` (source desktop + fallback mobile) et **overlay violet** via CSS (`mix-blend`/opacité) pour respecter la DA.
- **Responsive** : mobile-first, passage en grille `lg:grid-cols-2`; la colonne texte devient `flex` en desktop (`justify-between`) pour **coller les stats en bas**.

### Design System (Tailwind v4)

- **Tokens** déclarés dans `@theme` : couleurs (`--color-*`), familles (`--font-*`), radius (`--radius-*`), breakpoint (`--breakpoint-lg`).
- Mapping auto des tokens → utilitaires (`--color-accent` → `text-accent`, `bg-accent`, etc.).
- Composant `.link` pour des liens lisibles : soulignement toujours visible, offset plus grand au hover, **focus ring** accessible.

### Polices

- **Auto‑hébergées** dans `public/fonts`, préchargement **uniquement** des poids critiques (Inter 700/400) pour éviter les warnings _preloaded but not used quickly_; des audits web.
- `font-synthesis-weight: none` pour éviter les faux graissages.

### Images

- Image du hero **au-dessus de la ligne de flottaison** : `loading="eager"`, `decoding="async"`, `fetchpriority="high"`.
- Overlay via **CSS** (pas de filtre coûteux).

> Piste à explorer : génération automatique aux formats modernes **AVIF/WebP** + `srcset`/`sizes` pour passer les tests d'audits.

---

## ♿ Accessibilité (A11y)

- Sémantique soignée : `dl/dt/dd`, `figure/picture/img` avec `alt` descriptif.
- **Contrastes** vérifiés (fond card sombre, overlay violet, texte blanc/atténué).
- **Focus visible** sur les liens (`focus-visible` + anneau).
- Ordre du DOM logique et support clavier.

---

## ⚡ Performance

- **Tailwind v4 JIT** → CSS minimal.
- **Polices WOFF2** + `preload` ciblé + `swap`.
- **Vite** : `sourcemap: false`, `drop: ["console","debugger"]`, `assetsInlineLimit: 0` pour éviter l’inlining d’assets.
- **Netlify** : cache long sur assets fingerprintés/polices, en-têtes de sécurité pour la version en prod publiée pour la preview.

> Piste à explorer : inliner le **critical CSS** via [`vite-plugin-beasties`](https://github.com/danielroe/beasties) pour gagner en FCP/LCP.

---

## 🧪 Ma démarche

### Technologies utilisées

- **Semantic HTML5 markup**
- **CSS custom properties** (via tokens Tailwind v4 dans `@theme`)
- **Flexbox**
- **CSS Grid**
- **Mobile-first workflow**
- **Vite** (bundler/build)
- **Tailwind CSS v4**
- **Netlify** (hébergement & headers)

### Ce que j'ai appris

Quelques extraits représentatifs :

**1) Stats en `dl/dt/dd` (sémantique + a11y)**

```html
<dl class="grid gap-6 sm:grid-cols-3">
  <div>
    <dt class="sr-only">Companies</dt>
    <dd class="text-2xl font-bold">10k+</dd>
    <dd
      class="font-lexend text-white-stat-heading text-sm tracking-widest uppercase"
    >
      Companies
    </dd>
  </div>
  <!-- ... -->
</dl>
```

Les balises `dl/dt/dd` offrent une **solution sémantique native**, SEO friendly, pour ce genre de mise en page courante.

**2) Tokens Tailwind v4 (`@theme`) → theming & utilitaires générés automatiquement**

```css
@import "tailwindcss";
@theme {
  --color-card: #1b1938;
  --color-accent: #aa5cdb;
  --color-white-paragraph: #ffffffbf;
  --color-white-stat-heading: hsl(0 0% 100% / 0.6);
  --font-sans:
    "Inter", system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  --font-lexend: "Lexend Deca", var(--font-sans);
  --radius-card: 12px;
  --breakpoint-lg: 1024px;
}
/* ... puis j’utilise text-white-paragraph, text-accent, rounded-card, lg:... */
```

Tailwind lit le préfixe du token et génère des utilitaires correspondants (JIT) :

- `--color-*` → couleurs (`text-_`, `bg-_`, `border-_`, `ring-_`, `fill-_`, `stroke-_`)
- `--font-*` → familles (`font-\*`)
- `--radius-*` → arrondis (`rounded-_`, `rounded-t-_`, etc.)
- `--breakpoint-*` → préfixes responsive (`sm:`, `md:`, `lg:`, ...)

C'est une découverte du fonctionnement de Tailwind v4, vraiment utile, car la source de vérité demeure le CSS (pas besoin d'un `tailwind.config.js`).

**3) Liens lisibles & accessibles (offset d’underline + focus ring)**

```css
@layer components {
  .link {
    @apply focus-visible:ring-accent focus-visible:ring-offset-card rounded-[2px] underline decoration-white/60 decoration-1 underline-offset-2 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
    text-decoration-skip-ink: auto;
  }
  @media (hover: hover) {
    .link:hover {
      @apply decoration-accent underline-offset-4;
    }
  }
}
```

Comme pour le theming, Tailwind v4 permet de créer facilement de nouveaux composants. Celui-ci est visuellement attractif et reste parfaitement accessible.

### Pistes d’amélioration

- **Images next‑gen & responsive** : intégrer `vite-imagetools` pour générer AVIF/WebP + `srcset`/`sizes` automatiquement.
- **Critical CSS** : tester `vite-plugin-beasties` pour inliner le CSS critique sur des pages plus grosses.
- **OG automatique** : généraliser le script Sharp (ou Puppeteer+Sharp) pour des vignettes partage multi‑projets (indépedant du composant - réflexion sur la preview).
- **SSG** : explorer Astro/Eleventy pour factoriser un layout et générer un HTML statique zéro JS (indépedant du composant - réflexion sur la preview).
- **Lighthouse CI** : automatiser un check de perf/a11y à chaque PR.

### Ressources utiles

- Tailwind v4 – `@theme` & tokens : https://tailwindcss.com/docs/theme
- MDN – Images responsives (`<picture>`, `srcset`, `sizes`) : https://developer.mozilla.org/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- vite-imagetools : https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite
- Beasties (Critters) – Vite plugin : https://github.com/danielroe/beasties

---

## 👤 Auteur

- Website (preview) — https://www.julienborgeon.fr

---

## 🙌 Remerciements

Merci à **Frontend Mentor** pour le design du challenge et à la communauté pour les retours.  
Un clin d’œil aux ressources MDN & Tailwind pour la clarté de leur doc.

---

## 📁 Structure du projet

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
