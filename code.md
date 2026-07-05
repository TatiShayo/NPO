# AquaHope Foundation — Complete Frontend Codebase

Below is the complete, working Vite + React project. Every file is included in full.

---

## `package.json`

```json
{
  "name": "aquahope-foundation",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

---

## `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
```

---

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>AquaHope Foundation — Clean Water. Strong Communities. Lasting Change.</title>
    <meta name="title" content="AquaHope Foundation — Clean Water. Strong Communities. Lasting Change." />
    <meta name="description" content="AquaHope Foundation provides safe water, sustainable agriculture, quality education, and community health across East Africa. Your generosity changes everything." />
    <meta name="keywords" content="clean water, water charity, East Africa, Kenya, nonprofit, sanitation, borehole, donation, water access" />
    <meta name="author" content="AquaHope Foundation" />

    <!-- Canonical -->
    <link rel="canonical" href="https://aquahope.org/" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aquahope.org/" />
    <meta property="og:title" content="AquaHope Foundation — Clean Water. Strong Communities. Lasting Change." />
    <meta property="og:description" content="Providing safe water, sustainable agriculture, quality education, and community health across East Africa. Your generosity changes everything." />
    <meta property="og:image" content="https://aquahope.org/og-image.jpg" />
    <meta property="og:site_name" content="AquaHope Foundation" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://aquahope.org/" />
    <meta property="twitter:title" content="AquaHope Foundation — Clean Water. Strong Communities. Lasting Change." />
    <meta property="twitter:description" content="Providing safe water, sustainable agriculture, quality education, and community health across East Africa." />
    <meta property="twitter:image" content="https://aquahope.org/og-image.jpg" />

    <!-- Favicon placeholder -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230E6BA8'/%3E%3Cstop offset='1' stop-color='%232ECC71'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='45' fill='url(%23g)'/%3E%3Cpath d='M50 25 C35 45, 35 60, 50 75 C65 60, 65 45, 50 25 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

    <!-- NonprofitOrganization JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NonprofitOrganization",
      "name": "AquaHope Foundation",
      "alternateName": "AquaHope",
      "url": "https://aquahope.org",
      "logo": "https://aquahope.org/logo.png",
      "description": "AquaHope Foundation provides safe water, sustainable agriculture, quality education, and community health across East Africa.",
      "slogan": "Clean Water. Strong Communities. Lasting Change.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      },
      "email": "hello@aquahope.org",
      "telephone": "+254700000000",
      "areaServed": "East Africa",
      "knowsAbout": ["Water Access", "Sanitation", "Agriculture", "Education", "Community Health"]
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## `src/styles/variables.css`

```css
/* ============================================
   AquaHope Foundation — Design Tokens
   ============================================ */

:root {
  /* ---- Color Palette ---- */
  --color-primary: #0E6BA8;
  --color-primary-light: #36A2EB;
  --color-primary-dark: #083D61;

  --color-secondary: #2ECC71;
  --color-secondary-dark: #1A8A4E;

  --color-accent: #F39C12;
  --color-accent-bright: #F1C40F;

  --color-dark-bg: #0A1628;
  --color-dark-surface: #111D2E;

  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0AEC0;
  --color-text-on-light: #1A202C;

  --color-success: #2ECC71;
  --color-warning: #F39C12;
  --color-danger: #E74C3C;

  /* ---- Glassmorphism ---- */
  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-bg-strong: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: blur(16px);

  /* ---- Gradients ---- */
  --gradient-hero: linear-gradient(135deg, #0A1628 0%, #0E6BA8 50%, #2ECC71 100%);
  --gradient-accent: linear-gradient(135deg, #0E6BA8, #2ECC71);
  --gradient-warm: linear-gradient(135deg, #F39C12, #E74C3C);
  --gradient-text: linear-gradient(135deg, #36A2EB, #2ECC71);

  /* ---- Typography ---- */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;

  --fs-hero: clamp(2.5rem, 5vw, 4.5rem);
  --fs-section: clamp(1.8rem, 3vw, 3rem);
  --fs-body: clamp(0.95rem, 1.2vw, 1.1rem);
  --fs-caption: 0.85rem;
  --fs-small: 0.75rem;

  --fw-light: 300;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;

  /* ---- Spacing ---- */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 3rem;
  --space-xl: 5rem;
  --space-2xl: 8rem;

  /* ---- Shadows ---- */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.3);
  --shadow-glow-primary: 0 0 30px rgba(14, 107, 168, 0.4);
  --shadow-glow-accent: 0 0 30px rgba(243, 156, 18, 0.4);
  --shadow-glow-secondary: 0 0 30px rgba(46, 204, 113, 0.4);

  /* ---- Border Radius ---- */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* ---- Transitions ---- */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  /* ---- Layout ---- */
  --max-width: 1280px;
  --nav-height: 72px;
}
```

---

## `src/styles/animations.css`

```css
/* ============================================
   AquaHope Foundation — Keyframe Animations
   ============================================ */

/* ---- Fade In ---- */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ---- Slide Up ---- */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---- Slide In Left ---- */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ---- Slide In Right ---- */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ---- Scale In ---- */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ---- Pulse ---- */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.4);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 0 12px rgba(243, 156, 18, 0);
  }
}

/* ---- Bounce ---- */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ---- Float ---- */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

/* ---- Shimmer (skeleton loading) ---- */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ---- Wave ---- */
@keyframes wave {
  0% { transform: translateX(0) translateZ(0) scaleY(1); }
  50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
  100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
}

/* ---- Gradient Shift (hero background) ---- */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ---- Spin ---- */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ---- Marquee (partner logos) ---- */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ---- Typing dots ---- */
@keyframes typingDot {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* ---- Slide Up (modal) ---- */
@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ---- Notification dot pulse ---- */
@keyframes notifPulse {
  0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(231, 76, 60, 0); }
  100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
}

/* ============================================
   Animation Utility Classes
   ============================================ */

/* Base hidden state for scroll-triggered animations */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays */
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.stagger-5 { transition-delay: 0.5s; }
.stagger-6 { transition-delay: 0.6s; }

/* Applied animations */
.anim-fade-in { animation: fadeIn 0.6s ease forwards; }
.anim-slide-up { animation: slideUp 0.6s ease forwards; }
.anim-scale-in { animation: scaleIn 0.4s ease forwards; }
.anim-float { animation: float 4s ease-in-out infinite; }
.anim-pulse { animation: pulse 2s infinite; }
.anim-bounce { animation: bounce 1.5s infinite; }

/* Shimmer skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* ============================================
   Reduced Motion
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-on-scroll {
    opacity: 1;
    transform: none;
  }
}
```

---

## `src/styles/global.css`

```css
/* ============================================
   AquaHope Foundation — Global Stylesheet
   ============================================ */

/* ---- Reset & Base ---- */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  font-weight: var(--fw-regular);
  color: var(--color-text-primary);
  background-color: var(--color-dark-bg);
  line-height: 1.6;
  overflow-x: hidden;
}

/* ---- Typography Defaults ---- */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h1 { font-size: var(--fs-hero); font-weight: var(--fw-extrabold); }
h2 { font-size: var(--fs-section); }
h3 { font-size: clamp(1.3rem, 2vw, 1.8rem); }
h4 { font-size: 1.2rem; }

p { margin-bottom: var(--space-sm); }

a {
  color: var(--color-primary-light);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover { color: var(--color-secondary); }

img { max-width: 100%; display: block; }

button { font-family: inherit; cursor: pointer; border: none; background: none; }

ul { list-style: none; }

/* ---- Accessibility Utilities ---- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px 16px;
  z-index: 10000;
  transition: top var(--transition-fast);
}

.skip-link:focus { top: 0; }

:focus-visible {
  outline: 2px solid var(--color-accent-bright);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ---- Layout Utilities ---- */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.section {
  padding: var(--space-2xl) 0;
  position: relative;
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-xl);
}

.section-header h2 {
  margin-bottom: var(--space-sm);
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-header p {
  color: var(--color-text-secondary);
  font-size: 1.05rem;
}

.section-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: var(--fs-caption);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent-bright);
  margin-bottom: var(--space-xs);
}

.gradient-text {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-center { text-align: center; }
.text-secondary { color: var(--color-text-secondary); }

/* ---- Background Patterns ---- */
.bg-dark-surface { background-color: var(--color-dark-surface); }

.bg-gradient-overlay {
  position: relative;
}

.bg-gradient-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top, rgba(14, 107, 168, 0.15), transparent 60%);
  pointer-events: none;
}

/* ============================================
   BUTTONS
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: var(--fw-semibold);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--gradient-warm);
  color: white;
  box-shadow: 0 4px 16px rgba(231, 76, 60, 0.3);
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 28px rgba(231, 76, 60, 0.5);
  color: white;
  filter: brightness(1.1);
}

.btn-primary-pulse {
  animation: pulse 2.5s infinite;
}

.btn-secondary {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-secondary:hover {
  transform: scale(1.05);
  border-color: var(--color-primary-light);
  background: var(--glass-bg-strong);
  color: white;
  box-shadow: var(--shadow-glow-primary);
}

.btn-accent {
  background: var(--color-accent);
  color: white;
  box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3);
}

.btn-accent:hover {
  transform: scale(1.05);
  background: var(--color-accent-bright);
  box-shadow: 0 8px 28px rgba(243, 156, 18, 0.5);
  color: white;
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
}

.btn-ghost:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-2px);
}

.btn-large {
  padding: 1.1rem 2.5rem;
  font-size: 1.1rem;
}

.btn-block { width: 100%; }

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* ============================================
   CARDS
   ============================================ */

.card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.card-glow:hover {
  transform: translateY(-8px);
  border-color: rgba(54, 162, 235, 0.3);
  box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
}

/* ============================================
   BADGES
   ============================================ */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.8rem;
  font-size: var(--fs-caption);
  font-weight: var(--fw-semibold);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-water { background: rgba(14, 107, 168, 0.25); color: #5EB8F0; border: 1px solid rgba(54, 162, 235, 0.3); }
.badge-agriculture { background: rgba(46, 204, 113, 0.2); color: #5EE89A; border: 1px solid rgba(46, 204, 113, 0.3); }
.badge-education { background: rgba(243, 156, 18, 0.2); color: #F5C842; border: 1px solid rgba(243, 156, 18, 0.3); }
.badge-health { background: rgba(231, 76, 60, 0.2); color: #F57F70; border: 1px solid rgba(231, 76, 60, 0.3); }

.badge-completed {
  background: rgba(46, 204, 113, 0.15);
  color: var(--color-secondary);
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.badge-in-progress {
  background: rgba(243, 156, 18, 0.15);
  color: var(--color-accent);
  border: 1px solid rgba(243, 156, 18, 0.3);
}

/* ============================================
   NAVBAR
   ============================================ */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: all var(--transition-base);
}

.navbar-transparent {
  background: transparent;
}

.navbar-scrolled {
  background: rgba(10, 22, 40, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
}

.navbar-inner {
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: var(--fw-extrabold);
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-accent);
  border-radius: var(--radius-sm);
  -webkit-text-fill-color: white;
  font-size: 1rem;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.navbar-link {
  position: relative;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: var(--fw-medium);
  color: var(--color-text-secondary);
  padding: 0.5rem 0;
  transition: color var(--transition-fast);
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-accent);
  transition: width var(--transition-base);
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--color-text-primary);
}

.navbar-link:hover::after,
.navbar-link.active::after {
  width: 100%;
}

.navbar-cta {
  margin-left: var(--space-sm);
}

.navbar-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  z-index: 1001;
}

.navbar-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all var(--transition-base);
}

.navbar-hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar-hamburger.open span:nth-child(2) {
  opacity: 0;
}
.navbar-hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(10, 22, 40, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-base);
}

.mobile-menu.open {
  opacity: 1;
  pointer-events: all;
}

.mobile-menu-link {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--transition-base);
}

.mobile-menu.open .mobile-menu-link {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu.open .mobile-menu-link:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.open .mobile-menu-link:nth-child(2) { transition-delay: 0.15s; }
.mobile-menu.open .mobile-menu-link:nth-child(3) { transition-delay: 0.2s; }
.mobile-menu.open .mobile-menu-link:nth-child(4) { transition-delay: 0.25s; }
.mobile-menu.open .mobile-menu-link:nth-child(5) { transition-delay: 0.3s; }
.mobile-menu.open .mobile-menu-link:nth-child(6) { transition-delay: 0.35s; }

/* ============================================
   HERO SECTION
   ============================================ */

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0A1628, #0E6BA8, #0A1628);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(54, 162, 235, 0.2), transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(46, 204, 113, 0.15), transparent 50%);
  pointer-events: none;
}

.hero-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  animation: float 6s ease-in-out infinite;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: var(--space-xl) var(--space-md);
}

.hero h1 {
  margin-bottom: var(--space-md);
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.hero h1 .accent-word {
  background: linear-gradient(135deg, #F1C40F, #F39C12);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 680px;
  margin: 0 auto var(--space-lg);
  line-height: 1.7;
}

.hero-cta-group {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  flex-wrap: wrap;
}

/* Wave Divider */
.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 1;
}

.hero-wave svg {
  width: 100%;
  height: 100px;
  display: block;
}

/* ============================================
   STATS SECTION
   ============================================ */

.stats-section {
  padding: var(--space-xl) 0;
  background: var(--color-dark-surface);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.stat-card {
  text-align: center;
  padding: var(--space-md);
}

.stat-icon {
  font-size: 2rem;
  color: var(--color-primary-light);
  margin-bottom: var(--space-sm);
  display: inline-flex;
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(54, 162, 235, 0.1);
  border: 1px solid rgba(54, 162, 235, 0.2);
}

.stat-number {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--fw-extrabold);
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: var(--space-xs);
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: var(--fw-medium);
}

/* ============================================
   PILLARS SECTION
   ============================================ */

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.pillar-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pillar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-accent);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.pillar-card:hover {
  transform: scale(1.05);
  border-color: rgba(54, 162, 235, 0.3);
  box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
}

.pillar-card:hover::before { opacity: 1; }

.pillar-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
}

.pillar-icon.water { background: rgba(14, 107, 168, 0.2); color: #5EB8F0; }
.pillar-icon.agriculture { background: rgba(46, 204, 113, 0.2); color: #5EE89A; }
.pillar-icon.education { background: rgba(243, 156, 18, 0.2); color: #F5C842; }
.pillar-icon.health { background: rgba(231, 76, 60, 0.2); color: #F57F70; }

.pillar-card h3 {
  margin-bottom: var(--space-xs);
  font-size: 1.3rem;
}

.pillar-card p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin-bottom: var(--space-sm);
}

.pillar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: var(--fw-semibold);
  color: var(--color-primary-light);
  transition: gap var(--transition-fast);
}

.pillar-card:hover .pillar-link { gap: 0.7rem; }

/* ============================================
   FEATURED PROJECTS CAROUSEL
   ============================================ */

.carousel-wrapper {
  position: relative;
}

.carousel-track {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: var(--space-md);
  -webkit-overflow-scrolling: touch;
}

.carousel-track::-webkit-scrollbar { display: none; }
.carousel-track { -ms-overflow-style: none; scrollbar-width: none; }

.project-slide {
  flex: 0 0 calc(33.333% - var(--space-md) * 2 / 3);
  scroll-snap-align: start;
}

.project-slide-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
}

.project-slide-card:hover {
  transform: translateY(-6px);
  border-color: rgba(54, 162, 235, 0.3);
  box-shadow: var(--shadow-lg);
}

.project-slide-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.project-slide-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: var(--space-sm);
}

.project-slide-overlay h4 {
  color: white;
  font-size: 1.1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.project-slide-body {
  padding: var(--space-sm) var(--space-sm) var(--space-md);
}

.project-slide-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--space-xs);
  flex-wrap: wrap;
}

.project-slide-location {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-secondary);
  font-size: var(--fs-caption);
}

.project-slide-blurb {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--space-sm);
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.carousel-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  color: white;
  transition: all var(--transition-base);
}

.carousel-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: scale(1.1);
}

.carousel-dots {
  display: flex;
  gap: 0.5rem;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.carousel-dot.active {
  background: var(--color-primary-light);
  width: 24px;
  border-radius: 4px;
}

/* ============================================
   WHERE YOUR MONEY GOES
   ============================================ */

.impact-tiers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.impact-tier-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-align: center;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.impact-tier-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg), var(--shadow-glow-accent);
}

.impact-tier-amount {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: var(--fw-extrabold);
  background: var(--gradient-warm);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-xs);
}

.impact-tier-desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.impact-tier-icon {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
  color: var(--color-accent);
}

/* ============================================
   TESTIMONIALS
   ============================================ */

.testimonials-section {
  background: var(--color-dark-surface);
}

.testimonial-carousel {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  min-height: 320px;
}

.testimonial-card {
  text-align: center;
  padding: var(--space-lg);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateX(30px);
  transition: all var(--transition-slow);
  pointer-events: none;
}

.testimonial-card.active {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  pointer-events: all;
}

.testimonial-quote-mark {
  font-family: var(--font-heading);
  font-size: 4rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.3;
  margin-bottom: var(--space-sm);
}

.testimonial-text {
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.testimonial-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 1.2rem;
  color: white;
}

.testimonial-author-info {
  text-align: left;
}

.testimonial-name {
  font-family: var(--font-heading);
  font-weight: var(--fw-semibold);
  font-size: 1rem;
}

.testimonial-location {
  color: var(--color-text-secondary);
  font-size: var(--fs-caption);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: var(--space-lg);
}

/* ============================================
   NEWSLETTER
   ============================================ */

.newsletter-card {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-lg);
  position: relative;
  overflow: hidden;
}

.newsletter-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(54, 162, 235, 0.08), transparent 50%);
  pointer-events: none;
}

.newsletter-form {
  display: flex;
  gap: var(--space-xs);
  max-width: 480px;
  margin: var(--space-md) auto 0;
  position: relative;
}

.newsletter-input {
  flex: 1;
  padding: 0.85rem 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.newsletter-input::placeholder { color: var(--color-text-secondary); }

.newsletter-input:focus {
  outline: none;
  border-color: var(--color-primary-light);
  background: rgba(255, 255, 255, 0.12);
}

.newsletter-trust {
  margin-top: var(--space-sm);
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
}

/* ============================================
   PARTNERS MARQUEE
   ============================================ */

.partners-marquee {
  overflow: hidden;
  position: relative;
  padding: var(--space-lg) 0;
}

.partners-marquee::before,
.partners-marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}

.partners-marquee::before {
  left: 0;
  background: linear-gradient(to right, var(--color-dark-bg), transparent);
}

.partners-marquee::after {
  right: 0;
  background: linear-gradient(to left, var(--color-dark-bg), transparent);
}

.partners-track {
  display: flex;
  gap: var(--space-xl);
  animation: marquee 30s linear infinite;
  width: max-content;
}

.partner-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  white-space: nowrap;
}

.partner-logo-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 0.85rem;
  color: white;
}

.partner-logo-text {
  font-family: var(--font-heading);
  font-weight: var(--fw-medium);
  color: var(--color-text-secondary);
}

/* ============================================
   FOOTER
   ============================================ */

.footer {
  background: var(--color-dark-surface);
  border-top: 1px solid var(--glass-border);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-accent);
  opacity: 0.5;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: var(--space-lg);
  padding: var(--space-xl) 0 var(--space-lg);
}

.footer-brand h3 {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-sm);
  font-size: 1.5rem;
}

.footer-brand p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  max-width: 320px;
}

.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: var(--fw-semibold);
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-links a {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  transition: color var(--transition-fast);
}

.footer-links a:hover { color: var(--color-primary-light); }

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
}

.footer-contact-item svg { color: var(--color-primary-light); flex-shrink: 0; }

.footer-social {
  display: flex;
  gap: 0.75rem;
  margin-top: var(--space-md);
}

.footer-social a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-text-secondary);
  transition: all var(--transition-base);
}

.footer-social a:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  transform: translateY(-3px);
}

.footer-mini-form {
  display: flex;
  gap: 0.5rem;
  margin-top: var(--space-sm);
}

.footer-mini-form input {
  flex: 1;
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  color: white;
  font-size: 0.9rem;
}

.footer-mini-form input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.footer-mini-form button {
  padding: 0.6rem 1.2rem;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  font-weight: var(--fw-semibold);
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}

.footer-mini-form button:hover {
  background: var(--color-primary-light);
}

.footer-bottom {
  border-top: 1px solid var(--glass-border);
  padding: var(--space-sm) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.footer-bottom p {
  color: var(--color-text-secondary);
  font-size: var(--fs-caption);
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: var(--space-md);
}

.footer-bottom-links a {
  color: var(--color-text-secondary);
  font-size: var(--fs-caption);
}

.footer-bottom-links a:hover { color: var(--color-primary-light); }

/* ============================================
   ABOUT PAGE
   ============================================ */

.page-hero {
  padding: calc(var(--nav-height) + var(--space-xl)) 0 var(--space-xl);
  text-align: center;
  background: linear-gradient(135deg, var(--color-dark-bg), var(--color-primary-dark));
  position: relative;
  overflow: hidden;
}

.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top, rgba(54, 162, 235, 0.15), transparent 60%);
}

.page-hero-content {
  position: relative;
  z-index: 1;
}

.page-hero h1 {
  margin-bottom: var(--space-sm);
}

.page-hero p {
  color: var(--color-text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: var(--space-md);
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
}

.breadcrumb a { color: var(--color-text-secondary); }
.breadcrumb a:hover { color: var(--color-primary-light); }

/* Mission & Vision */
.mission-vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.mv-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  position: relative;
  overflow: hidden;
}

.mv-card-icon {
  font-size: 2rem;
  margin-bottom: var(--space-sm);
  color: var(--color-primary-light);
}

.mv-card h3 {
  margin-bottom: var(--space-sm);
}

.mv-card p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
}

.timeline-item {
  position: relative;
  padding-bottom: var(--space-lg);
}

.timeline-item:last-child { padding-bottom: 0; }

.timeline-year {
  position: absolute;
  left: -2.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 0.85rem;
  color: white;
  border: 4px solid var(--color-dark-bg);
  z-index: 1;
}

.timeline-content {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  margin-left: 3rem;
}

.timeline-content h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  margin-bottom: var(--space-xs);
  color: var(--color-primary-light);
}

.timeline-content p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

/* Core Values Grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.value-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  transition: all var(--transition-base);
}

.value-card:hover {
  transform: translateY(-6px);
  border-color: rgba(54, 162, 235, 0.3);
  box-shadow: var(--shadow-md);
}

.value-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
  background: rgba(54, 162, 235, 0.1);
  color: var(--color-primary-light);
}

.value-card h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  margin-bottom: var(--space-xs);
}

.value-card p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

/* Team Grid */
.team-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-md);
}

.team-card {
  perspective: 1000px;
  height: 320px;
}

.team-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.team-card:hover .team-card-inner {
  transform: rotateY(180deg);
}

.team-card-front,
.team-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.team-card-back {
  transform: rotateY(180deg);
  background: var(--color-primary-dark);
}

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 1.5rem;
  color: white;
  margin-bottom: var(--space-sm);
}

.team-card h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.team-card-role {
  color: var(--color-primary-light);
  font-size: var(--fs-caption);
  margin-bottom: var(--space-xs);
}

.team-card-bio {
  color: var(--color-text-secondary);
  font-size: var(--fs-caption);
}

.team-card-back p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: var(--space-sm);
}

.team-linkedin {
  color: var(--color-primary-light);
  font-size: 1.5rem;
}

/* CTA Banner */
.cta-banner {
  background: var(--gradient-hero);
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  border-radius: var(--radius-xl);
  margin: 0 var(--space-md);
}

.cta-banner h2 {
  margin-bottom: var(--space-sm);
}

.cta-banner p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  margin-bottom: var(--space-md);
}

.cta-banner-buttons {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  flex-wrap: wrap;
}

/* ============================================
   PROJECTS PAGE
   ============================================ */

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.6rem 1.5rem;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: var(--fw-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  transition: all var(--transition-base);
  position: relative;
}

.filter-tab:hover {
  color: var(--color-text-primary);
  border-color: rgba(54, 162, 235, 0.3);
}

.filter-tab.active {
  color: white;
  background: var(--gradient-accent);
  border-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.project-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(54, 162, 235, 0.3);
  box-shadow: var(--shadow-lg);
}

.project-card-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.project-card-image-overlay {
  position: absolute;
  bottom: var(--space-sm);
  left: var(--space-sm);
  display: flex;
  gap: 0.4rem;
}

.project-card-body {
  padding: var(--space-sm) var(--space-sm) var(--space-md);
}

.project-card h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  margin-bottom: var(--space-xs);
}

.project-card-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-text-secondary);
  font-size: var(--fs-caption);
  margin-bottom: var(--space-xs);
}

.project-card-desc {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--space-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: var(--fw-semibold);
  color: var(--color-primary-light);
  transition: gap var(--transition-fast);
}

.project-card:hover .project-card-link { gap: 0.6rem; }

/* Project placeholder gradients */
.placeholder-gradient-1 { background: linear-gradient(135deg, #0E6BA8, #36A2EB); }
.placeholder-gradient-2 { background: linear-gradient(135deg, #2ECC71, #1A8A4E); }
.placeholder-gradient-3 { background: linear-gradient(135deg, #F39C12, #F1C40F); }
.placeholder-gradient-4 { background: linear-gradient(135deg, #E74C3C, #F39C12); }
.placeholder-gradient-5 { background: linear-gradient(135deg, #083D61, #0E6BA8); }
.placeholder-gradient-6 { background: linear-gradient(135deg, #1A8A4E, #0E6BA8); }
.placeholder-gradient-7 { background: linear-gradient(135deg, #F1C40F, #2ECC71); }
.placeholder-gradient-8 { background: linear-gradient(135deg, #E74C3C, #083D61); }

.placeholder-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ============================================
   MODAL
   ============================================ */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  animation: fadeIn 0.3s ease;
  overflow-y: auto;
}

.modal-content {
  background: var(--color-dark-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: white;
  z-index: 10;
  transition: all var(--transition-fast);
  font-size: 1.2rem;
}

.modal-close:hover {
  background: var(--color-danger);
  transform: rotate(90deg);
}

.modal-image {
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.modal-body {
  padding: var(--space-lg);
}

.modal-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: var(--space-sm);
}

.modal-body h3 {
  margin-bottom: var(--space-sm);
}

.modal-section {
  margin-bottom: var(--space-md);
}

.modal-section h5 {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-bright);
  margin-bottom: var(--space-xs);
}

.modal-section p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

.modal-impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-sm);
  margin: var(--space-sm) 0;
}

.modal-impact-item {
  text-align: center;
  padding: var(--space-sm);
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
}

.modal-impact-number {
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 1.3rem;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-impact-label {
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
}

.modal-gps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: var(--space-sm);
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  margin-bottom: var(--space-md);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.modal-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: var(--space-md);
}

.modal-gallery-item {
  height: 60px;
  border-radius: var(--radius-sm);
}

/* ============================================
   GALLERY PAGE
   ============================================ */

.masonry-grid {
  columns: 3;
  column-gap: var(--space-md);
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: var(--space-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all var(--transition-base);
}

.masonry-item:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.masonry-item-content {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.masonry-item-label {
  position: absolute;
  top: var(--space-sm);
  left: var(--space-sm);
  z-index: 2;
}

.masonry-item-caption {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: var(--space-md);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 60%);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.masonry-item:hover .masonry-item-caption {
  opacity: 1;
}

.masonry-item-caption-text {
  color: white;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
  padding: var(--space-md);
}

.lightbox-content {
  max-width: 800px;
  width: 100%;
  text-align: center;
  position: relative;
}

.lightbox-image {
  width: 100%;
  height: 60vh;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-caption {
  color: white;
  margin-top: var(--space-sm);
  font-size: 1rem;
}

.lightbox-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.5rem;
  transition: all var(--transition-fast);
}

.lightbox-close:hover {
  background: var(--color-danger);
  transform: rotate(90deg);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.5rem;
  transition: all var(--transition-fast);
}

.lightbox-nav:hover { background: rgba(255, 255, 255, 0.2); }
.lightbox-prev { left: -1rem; }
.lightbox-next { right: -1rem; }

/* ============================================
   DONATE PAGE
   ============================================ */

.donate-hero {
  text-align: center;
  padding: calc(var(--nav-height) + var(--space-xl)) 0 var(--space-lg);
  background: linear-gradient(135deg, var(--color-dark-bg), var(--color-primary-dark), var(--color-dark-bg));
  position: relative;
  overflow: hidden;
}

.donate-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(243, 156, 18, 0.1), transparent 60%);
}

.donate-hero-content { position: relative; z-index: 1; }

.donate-hero h1 {
  margin-bottom: var(--space-sm);
}

.donate-hero p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.15rem;
  max-width: 600px;
  margin: 0 auto;
}

.donate-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-lg);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md) var(--space-xl);
  align-items: start;
}

/* Donation Form */
.donate-form-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
}

.donate-type-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-full);
  padding: 4px;
  margin-bottom: var(--space-sm);
}

.donate-type-btn {
  flex: 1;
  padding: 0.7rem 1rem;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: var(--fw-semibold);
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  position: relative;
}

.donate-type-btn.active {
  background: var(--gradient-accent);
  color: white;
  box-shadow: var(--shadow-glow-primary);
}

.donate-social-proof {
  text-align: center;
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.donate-social-proof strong { color: var(--color-secondary); }

.donate-impact-note {
  text-align: center;
  padding: var(--space-sm);
  background: rgba(46, 204, 113, 0.08);
  border: 1px solid rgba(46, 204, 113, 0.2);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
  font-size: 0.9rem;
  color: var(--color-secondary);
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: var(--space-sm);
}

.amount-btn {
  padding: var(--space-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: var(--fw-bold);
  transition: all var(--transition-base);
  text-align: center;
  position: relative;
}

.amount-btn:hover {
  border-color: rgba(54, 162, 235, 0.3);
  background: rgba(255, 255, 255, 0.06);
}

.amount-btn.active {
  border-color: var(--color-accent);
  background: rgba(243, 156, 18, 0.1);
  box-shadow: var(--shadow-glow-accent);
}

.amount-btn-impact {
  display: block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: var(--fw-regular);
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
  line-height: 1.3;
}

.amount-btn.active .amount-btn-impact {
  color: var(--color-accent-bright);
}

.custom-amount-wrapper {
  position: relative;
  margin-bottom: var(--space-md);
}

.custom-amount-prefix {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: var(--fw-semibold);
  color: var(--color-text-secondary);
}

.custom-amount-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: white;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: var(--fw-semibold);
  transition: all var(--transition-fast);
}

.custom-amount-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.donate-form-section {
  margin-bottom: var(--space-md);
}

.donate-form-section label {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--fs-caption);
  font-weight: var(--fw-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.donate-form-input,
.donate-form-textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.donate-form-textarea {
  min-height: 80px;
  resize: vertical;
}

.donate-form-input:focus,
.donate-form-textarea:focus {
  outline: none;
  border-color: var(--color-primary-light);
  background: rgba(255, 255, 255, 0.06);
}

.donate-form-input::placeholder,
.donate-form-textarea::placeholder {
  color: var(--color-text-secondary);
}

.donate-submit-btn {
  width: 100%;
  padding: 1.1rem;
  background: var(--gradient-warm);
  color: white;
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: var(--fw-bold);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  box-shadow: 0 4px 16px rgba(231, 76, 60, 0.3);
  margin-bottom: var(--space-sm);
}

.donate-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(231, 76, 60, 0.5);
  filter: brightness(1.1);
}

.donate-security-note {
  text-align: center;
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.donate-security-note svg { color: var(--color-secondary); }

/* Trust Sidebar */
.trust-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  position: sticky;
  top: calc(var(--nav-height) + var(--space-md));
}

.trust-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.trust-card h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  margin-bottom: var(--space-sm);
}

.trust-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.trust-badge {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--glass-border);
  text-align: center;
  padding: 0.5rem;
}

.trust-badge-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.trust-badge-text {
  font-size: 0.65rem;
  font-weight: var(--fw-semibold);
  color: var(--color-text-secondary);
  line-height: 1.2;
}

/* Allocation Bar */
.allocation-bar {
  display: flex;
  height: 32px;
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-sm);
}

.allocation-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
  color: white;
  transition: flex var(--transition-slow);
}

.allocation-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.allocation-legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
}

.allocation-legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.security-badges {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.security-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--fs-caption);
  color: var(--color-secondary);
}

.donor-testimonial {
  font-style: italic;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: var(--space-xs);
}

.donor-testimonial-author {
  font-family: var(--font-heading);
  font-size: var(--fs-caption);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
}

/* Donor Feed */
.donor-feed {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md) var(--space-xl);
}

.donor-feed-title {
  text-align: center;
  margin-bottom: var(--space-md);
}

.donor-feed-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.donor-feed-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem var(--space-md);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  animation: slideUp 0.5s ease forwards;
}

.donor-feed-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 0.85rem;
  color: white;
  flex-shrink: 0;
}

.donor-feed-info {
  flex: 1;
}

.donor-feed-name {
  font-size: 0.9rem;
  font-weight: var(--fw-medium);
}

.donor-feed-meta {
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
}

.donor-feed-amount {
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  color: var(--color-secondary);
  font-size: 0.95rem;
}

/* Other Ways to Give */
.other-ways-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.other-way-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-align: center;
  transition: all var(--transition-base);
}

.other-way-card:hover {
  transform: translateY(-6px);
  border-color: rgba(54, 162, 235, 0.3);
  box-shadow: var(--shadow-md);
}

.other-way-icon {
  font-size: 1.75rem;
  color: var(--color-primary-light);
  margin-bottom: var(--space-xs);
}

.other-way-card h5 {
  font-family: var(--font-heading);
  font-size: 1rem;
  margin-bottom: var(--space-xs);
}

.other-way-card p {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-bottom: var(--space-xs);
}

.other-way-link {
  font-family: var(--font-heading);
  font-size: var(--fs-caption);
  font-weight: var(--fw-semibold);
  color: var(--color-primary-light);
}

.tax-note {
  text-align: center;
  margin-top: var(--space-md);
  font-size: var(--fs-caption);
  color: var(--color-text-secondary);
  padding: var(--space-sm);
  background: rgba(243, 156, 18, 0.08);
  border-radius: var(--radius-md);
  border: 1px solid rgba(243, 156, 18, 0.15);
}

/* ============================================
   CONTACT PAGE
   ============================================ */

.contact-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-lg);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md) var(--space-xl);
}

.contact-form-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
}

/* Floating Label Inputs */
.floating-label-group {
  position: relative;
  margin-bottom: var(--space-md);
}

.floating-label-input,
.floating-label-textarea,
.floating-label-select {
  width: 100%;
  padding: 1.4rem 1rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.floating-label-textarea {
  min-height: 120px;
  resize: vertical;
}

.floating-label-input:focus,
.floating-label-textarea:focus,
.floating-label-select:focus {
  outline: none;
  border-color: var(--color-primary-light);
  background: rgba(255, 255, 255, 0.06);
}

.floating-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
  pointer-events: none;
  transition: all var(--transition-fast);
}

.floating-label-input:focus ~ .floating-label,
.floating-label-input:not(:placeholder-shown) ~ .floating-label,
.floating-label-textarea:focus ~ .floating-label,
.floating-label-textarea:not(:placeholder-shown) ~ .floating-label,
.floating-label-select:focus ~ .floating-label,
.floating-label-select:valid ~ .floating-label {
  top: 0.4rem;
  font-size: 0.7rem;
  color: var(--color-primary-light);
}

.floating-label-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A0AEC0' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

.floating-label-select option {
  background: var(--color-dark-surface);
  color: white;
}

.contact-submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--gradient-accent);
  color: white;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: var(--fw-bold);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.contact-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-primary);
  filter: brightness(1.1);
}

.contact-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.contact-success {
  text-align: center;
  padding: var(--space-lg);
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: var(--radius-md);
}

.contact-success-icon {
  font-size: 3rem;
  color: var(--color-success);
  margin-bottom: var(--space-sm);
}

/* Contact Info */
.contact-info-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
}

.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.contact-info-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(54, 162, 235, 0.1);
  color: var(--color-primary-light);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.contact-info-label {
  font-family: var(--font-heading);
  font-size: var(--fs-caption);
  font-weight: var(--fw-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.contact-info-value {
  color: var(--color-text-primary);
  font-size: 0.95rem;
}

.map-placeholder {
  margin-top: var(--space-md);
  padding: var(--space-lg);
  background: linear-gradient(135deg, rgba(14, 107, 168, 0.15), rgba(46, 204, 113, 0.1));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

.map-placeholder-content {
  position: relative;
  z-index: 1;
}

.map-placeholder-icon {
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
}

/* Social Links */
.contact-social {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  margin-top: var(--space-md);
}

.contact-social-link {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-text-secondary);
  font-size: 1.3rem;
  transition: all var(--transition-base);
  position: relative;
}

.contact-social-link:hover {
  transform: translateY(-4px);
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-glow-primary);
}

.contact-social-tooltip {
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-dark-surface);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: var(--fs-small);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-fast);
  border: 1px solid var(--glass-border);
}

.contact-social-link:hover .contact-social-tooltip { opacity: 1; }

/* FAQ Accordion */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.faq-item.active {
  border-left: 3px solid var(--color-accent);
}

.faq-question {
  width: 100%;
  padding: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: var(--fw-semibold);
}

.faq-question-icon {
  font-size: 1.2rem;
  color: var(--color-primary-light);
  transition: transform var(--transition-base);
  flex-shrink: 0;
  margin-left: var(--space-sm);
}

.faq-item.active .faq-question-icon { transform: rotate(180deg); }

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow);
}

.faq-answer-inner {
  padding: 0 var(--space-md) var(--space-md);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ============================================
   CHAT WIDGET
   ============================================ */

.chat-widget {
  position: fixed;
  bottom: var(--space-md);
  right: var(--space-md);
  z-index: 1500;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
  position: relative;
}

.chat-toggle:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow-primary);
}

.chat-toggle.notif::after {
  content: '1';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-danger);
  color: white;
  font-size: 0.7rem;
  font-weight: var(--fw-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-dark-bg);
  animation: notifPulse 2s infinite;
}

.chat-window {
  position: absolute;
  bottom: 76px;
  right: 0;
  width: 350px;
  height: 450px;
  background: var(--color-dark-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  transform-origin: bottom right;
  transform: scale(0);
  opacity: 0;
  transition: all var(--transition-base);
}

.chat-window.open {
  transform: scale(1);
  opacity: 1;
}

.chat-header {
  padding: var(--space-sm);
  background: var(--gradient-accent);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-header-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.chat-header-name {
  font-family: var(--font-heading);
  font-weight: var(--fw-semibold);
  font-size: 0.95rem;
  color: white;
}

.chat-header-status {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--fs-small);
  color: rgba(255, 255, 255, 0.8);
}

.chat-header-status::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ADE80;
  box-shadow: 0 0 6px #4ADE80;
}

.chat-header-actions {
  display: flex;
  gap: 0.25rem;
}

.chat-header-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  transition: background var(--transition-fast);
}

.chat-header-btn:hover { background: rgba(255, 255, 255, 0.15); }

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-message {
  max-width: 80%;
  padding: 0.6rem 0.9rem;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  line-height: 1.5;
  animation: slideUp 0.3s ease;
}

.chat-message-bot {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-primary);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
}

.chat-message-user {
  background: var(--color-primary);
  color: white;
  border-bottom-right-radius: 4px;
  align-self: flex-end;
}

.chat-quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0 var(--space-sm) var(--space-xs);
}

.chat-quick-reply {
  padding: 0.4rem 0.75rem;
  background: rgba(54, 162, 235, 0.1);
  border: 1px solid rgba(54, 162, 235, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  color: var(--color-primary-light);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.chat-quick-reply:hover {
  background: rgba(54, 162, 235, 0.2);
}

.chat-typing {
  display: flex;
  gap: 4px;
  padding: 0.6rem 0.9rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.chat-typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-text-secondary);
  animation: typingDot 1.4s infinite;
}

.chat-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.chat-typing-dot:nth-child(3) { animation-delay: 0.4s; }

.chat-input-area {
  padding: var(--space-sm);
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid var(--glass-border);
}

.chat-input {
  flex: 1;
  padding: 0.6rem 0.9rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  color: white;
  font-size: 0.88rem;
  font-family: var(--font-body);
}

.chat-input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.chat-send-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--gradient-accent);
  color: white;
  font-size: 1rem;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.chat-send-btn:hover { transform: scale(1.1); }

/* ============================================
   SCROLL TO TOP
   ============================================ */

.scroll-to-top {
  position: fixed;
  bottom: var(--space-md);
  left: var(--space-md);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--glass-bg-strong);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  z-index: 1200;
  opacity: 0;
  pointer-events: none;
  transition: all var(--transition-base);
}

.scroll-to-top.visible {
  opacity: 1;
  pointer-events: all;
}

.scroll-to-top:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-4px);
}

/* ============================================
   PAGE TRANSITION
   ============================================ */

.page-fade {
  animation: fadeIn 0.4s ease;
}

/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */

/* ---- Tablet (max 1024px) ---- */
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .pillars-grid { grid-template-columns: repeat(2, 1fr); }
  .impact-tiers { grid-template-columns: repeat(2, 1fr); }
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
  .masonry-grid { columns: 2; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: repeat(3, 1fr); }
  .other-ways-grid { grid-template-columns: repeat(2, 1fr); }
  .project-slide { flex: 0 0 calc(50% - var(--space-md) / 2); }
  .donate-layout { grid-template-columns: 1fr; }
  .contact-layout { grid-template-columns: 1fr; }
  .trust-sidebar { position: static; }
  .footer-content { grid-template-columns: 1fr 1fr; }
  .mission-vision-grid { grid-template-columns: 1fr; }
}

/* ---- Mobile (max 768px) ---- */
@media (max-width: 768px) {
  .navbar-links { display: none; }
  .navbar-hamburger { display: flex; }
  .navbar-cta { display: none; }

  .section { padding: var(--space-xl) 0; }

  .hero h1 { font-size: clamp(2rem, 8vw, 3rem); }
  .hero-subtitle { font-size: 1rem; }
  .hero-cta-group { flex-direction: column; align-items: stretch; }
  .hero-cta-group .btn { width: 100%; }

  .stats-grid { grid-template-columns: 1fr 1fr; gap: var(--space-sm); }
  .pillars-grid { grid-template-columns: 1fr; }
  .impact-tiers { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .masonry-grid { columns: 1; }
  .values-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
  .other-ways-grid { grid-template-columns: 1fr; }
  .project-slide { flex: 0 0 85%; }

  .amount-grid { grid-template-columns: repeat(2, 1fr); }

  .footer-content { grid-template-columns: 1fr; gap: var(--space-md); }
  .footer-bottom { flex-direction: column; text-align: center; }

  .newsletter-form { flex-direction: column; }

  .modal-impact-grid { grid-template-columns: repeat(2, 1fr); }
  .modal-gallery { grid-template-columns: repeat(2, 1fr); }

  .timeline { padding-left: 1rem; }
  .timeline-year { width: 48px; height: 48px; font-size: 0.7rem; left: -2rem; }
  .timeline-content { margin-left: 2rem; padding: var(--space-sm); }

  .cta-banner { margin: 0 var(--space-sm); padding: var(--space-lg) var(--space-sm); }

  .lightbox-nav { display: none; }
  .lightbox-image { height: 40vh; }

  .chat-window {
    width: calc(100vw - 2rem);
    height: 70vh;
  }
}

/* ---- Small Mobile (max 480px) ---- */
@media (max-width: 480px) {
  .container { padding: 0 var(--space-sm); }

  .stats-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .amount-grid { grid-template-columns: 1fr; }

  .hero-content { padding: var(--space-md); }

  .section-header { margin-bottom: var(--space-md); }

  .testimonial-text { font-size: 1.05rem; }
  .testimonial-card { padding: var(--space-md); }
}
```

---

## `src/data/projects.js`

```js
// ============================================
// Project Data — Mock data for projects portfolio
// ============================================

export const projects = [
  {
    id: 1,
    title: 'Kajiado Borehole Project',
    category: 'Water',
    status: 'Completed',
    location: 'Kajiado County, Kenya',
    gradient: 'placeholder-gradient-1',
    description: 'A solar-powered borehole bringing clean, reliable water to 340 families in drought-prone Kajiado County.',
    challenge: 'For decades, families in this Kajiado community walked over 6 kilometers daily to reach the nearest water source — a contaminated shallow well shared with livestock. Waterborne diseases were rampant, and children missed school to help fetch water.',
    solution: 'We drilled a 120-meter borehole and installed a solar-powered pump system, constructing a 10,000-liter storage tank and four distribution taps within the community. Local water committees were trained for ongoing maintenance.',
    impact: [
      { number: '340', label: 'Families served' },
      { number: '1', label: 'Borehole drilled' },
      { number: '200m³', label: 'Water per day' },
      { number: '6km', label: 'Walking reduced' },
    ],
    gallery: ['placeholder-gradient-1', 'placeholder-gradient-5', 'placeholder-gradient-6', 'placeholder-gradient-2'],
  },
  {
    id: 2,
    title: 'Nakuru School Sanitation',
    category: 'Water',
    status: 'Completed',
    location: 'Nakuru County, Kenya',
    gradient: 'placeholder-gradient-2',
    description: 'Modern sanitation facilities and hygiene education for three primary schools serving 1,200 students.',
    challenge: 'Three primary schools in Nakuru lacked adequate sanitation facilities. Girls especially were missing school during menstruation, and hygiene-related illness was a leading cause of absenteeism.',
    solution: 'We constructed gender-segregated latrine blocks with handwashing stations, provided menstrual hygiene management training, and established student-led hygiene clubs to sustain practices long-term.',
    impact: [
      { number: '1,200', label: 'Students reached' },
      { number: '3', label: 'Schools upgraded' },
      { number: '60%', label: 'Girls attendance up' },
      { number: '18', label: 'Latrine blocks built' },
    ],
    gallery: ['placeholder-gradient-2', 'placeholder-gradient-3', 'placeholder-gradient-7', 'placeholder-gradient-1'],
  },
  {
    id: 3,
    title: 'Solar Pump Installation',
    category: 'Water',
    status: 'In Progress',
    location: 'Machakos County, Kenya',
    gradient: 'placeholder-gradient-5',
    description: 'Upgrading diesel pumps to solar across five community wells, reducing operating costs and carbon footprint.',
    challenge: 'Five existing community wells in Machakos relied on diesel pumps that were expensive to operate, prone to breakdowns, and environmentally harmful. Rising fuel costs threatened to shut down water access entirely.',
    solution: 'We are replacing all diesel pumps with high-efficiency solar pump systems, including backup battery storage for cloudy days. Local technicians are being trained in solar maintenance as part of the project.',
    impact: [
      { number: '5', label: 'Wells upgraded' },
      { number: '2,500', label: 'Beneficiaries' },
      { number: '80%', label: 'Cost reduction' },
      { number: '12T', label: 'CO₂ saved/year' },
    ],
    gallery: ['placeholder-gradient-5', 'placeholder-gradient-6', 'placeholder-gradient-1', 'placeholder-gradient-3'],
  },
  {
    id: 4,
    title: 'Community Farm Initiative',
    category: 'Agriculture',
    status: 'Completed',
    location: 'Kiambu County, Kenya',
    gradient: 'placeholder-gradient-6',
    description: 'Drip irrigation and training programs helping 80 smallholder farmers increase yields and income.',
    challenge: 'Smallholder farmers in Kiambu struggled with irregular rainfall, low crop yields, and limited market access. Traditional farming methods were unsustainable in the face of climate change.',
    solution: 'We installed drip irrigation systems connected to a community borehole, provided drought-resistant seeds, and delivered training on climate-smart agriculture. A cooperative was formed for collective market bargaining.',
    impact: [
      { number: '80', label: 'Farmers trained' },
      { number: '3x', label: 'Yield increase' },
      { number: '45', label: 'Hectares irrigated' },
      { number: '$1,200', label: 'Avg. income boost' },
    ],
    gallery: ['placeholder-gradient-6', 'placeholder-gradient-2', 'placeholder-gradient-7', 'placeholder-gradient-4'],
  },
  {
    id: 5,
    title: 'Irrigation Canal Expansion',
    category: 'Agriculture',
    status: 'In Progress',
    location: 'Laikipia County, Kenya',
    gradient: 'placeholder-gradient-7',
    description: 'Expanding 4km of irrigation canals to bring year-round water to 150 hectares of farmland.',
    challenge: 'Farmers in Laikipia depended on a single seasonal canal that only flowed during the rainy season. For six months of the year, crops withered and livestock suffered.',
    solution: 'We are extending the canal network by 4 kilometers, constructing a regulating reservoir, and installing gravity-fed distribution gates. The system will serve 150 hectares year-round.',
    impact: [
      { number: '150', label: 'Hectares served' },
      { number: '200', label: 'Families benefiting' },
      { number: '4km', label: 'Canal extended' },
      { number: '12mo', label: 'Year-round flow' },
    ],
    gallery: ['placeholder-gradient-7', 'placeholder-gradient-6', 'placeholder-gradient-3', 'placeholder-gradient-2'],
  },
  {
    id: 6,
    title: 'School Meals Programme',
    category: 'Education',
    status: 'Completed',
    location: 'Narok County, Kenya',
    gradient: 'placeholder-gradient-3',
    description: 'Daily nutritious meals for 500 students, sourced from local farmers and cooked with clean water.',
    challenge: 'In Narok, many children attended school hungry, severely impacting concentration, attendance, and academic performance. Dropout rates were highest during dry seasons when families struggled most.',
    solution: 'We established a school meals program sourcing produce from local farmers, built energy-efficient cookstoves, and installed water storage for food preparation. Parent committees manage daily operations.',
    impact: [
      { number: '500', label: 'Students fed daily' },
      { number: '92%', label: 'Attendance rate' },
      { number: '4', label: 'Schools served' },
      { number: '30', label: 'Local farmers' },
    ],
    gallery: ['placeholder-gradient-3', 'placeholder-gradient-7', 'placeholder-gradient-1', 'placeholder-gradient-5'],
  },
  {
    id: 7,
    title: 'Digital Literacy for Youth',
    category: 'Education',
    status: 'In Progress',
    location: 'Mombasa County, Kenya',
    gradient: 'placeholder-gradient-4',
    description: 'Computer labs and coding classes for 300 youth in underserved coastal communities.',
    challenge: 'Youth in coastal Mombasa had virtually no access to computers or digital skills training, leaving them unprepared for the modern workforce and unable to access online educational resources.',
    solution: 'We are establishing two computer labs with 30 workstations each, providing basic and advanced digital literacy courses, and connecting students with remote mentorship from tech professionals.',
    impact: [
      { number: '300', label: 'Youth enrolled' },
      { number: '2', label: 'Computer labs' },
      { number: '60', label: 'Workstations' },
      { number: '6mo', label: 'Course duration' },
    ],
    gallery: ['placeholder-gradient-4', 'placeholder-gradient-8', 'placeholder-gradient-5', 'placeholder-gradient-1'],
  },
  {
    id: 8,
    title: 'Village Health Workers Training',
    category: 'Health',
    status: 'Completed',
    location: 'Turkana County, Kenya',
    gradient: 'placeholder-gradient-8',
    description: 'Training 40 community health workers to deliver basic care and health education across remote villages.',
    challenge: 'Remote Turkana communities had virtually no access to healthcare. The nearest clinic was often a two-day walk, and preventable diseases like malaria and diarrhea claimed lives unnecessarily.',
    solution: 'We trained 40 community health workers in basic diagnosis, first aid, maternal care, and health education. Each received a medical kit and is connected to a regional hospital via mobile health reporting.',
    impact: [
      { number: '40', label: 'Health workers trained' },
      { number: '8,000', label: 'People reached' },
      { number: '15', label: 'Villages served' },
      { number: '70%', label: 'Fewer referrals' },
    ],
    gallery: ['placeholder-gradient-8', 'placeholder-gradient-4', 'placeholder-gradient-6', 'placeholder-gradient-2'],
  },
]

export const projectCategories = ['All', 'Water', 'Agriculture', 'Education', 'Health']
```

---

## `src/data/testimonials.js`

```js
// ============================================
// Testimonials Data — Mock beneficiary quotes
// ============================================

export const testimonials = [
  {
    id: 1,
    quote: 'Before AquaHope, my children walked 4 kilometers every morning for water. Now we have a borehole 200 meters from our home. My children are never late for school anymore, and we are all healthier.',
    name: 'Grace M.',
    location: 'Kajiado County',
    initials: 'GM',
    gradient: 'linear-gradient(135deg, #0E6BA8, #36A2EB)',
  },
  {
    id: 2,
    quote: 'The sanitation facilities at our school changed everything. Our girls\' attendance increased by 60%. They no longer miss school during their monthly cycles, and hygiene-related illnesses have dropped dramatically.',
    name: 'Teacher James K.',
    location: 'Nakuru',
    initials: 'JK',
    gradient: 'linear-gradient(135deg, #2ECC71, #1A8A4E)',
  },
  {
    id: 3,
    quote: 'The agricultural training helped me grow enough to feed my family and sell the rest at market. For the first time, I can pay my children\'s school fees from my own earnings. AquaHope didn\'t just help — they empowered me.',
    name: 'Peter O.',
    location: 'Machakos',
    initials: 'PO',
    gradient: 'linear-gradient(135deg, #F39C12, #F1C40F)',
  },
]
```

---

## `src/data/team.js`

```js
// ============================================
// Team Data — Mock team member info
// ============================================

export const team = [
  {
    id: 1,
    name: 'Lauren Ndanu',
    role: 'Lead Developer & Repository Manager',
    initials: 'LN',
    gradient: 'linear-gradient(135deg, #0E6BA8, #36A2EB)',
    bio: 'Lauren leads our technical team, overseeing the architecture and development of the AquaHope platform with a passion for using technology to drive social impact.',
    linkedin: '#',
  },
  {
    id: 2,
    name: 'Brian Mukwe',
    role: 'Frontend Engineer',
    initials: 'BM',
    gradient: 'linear-gradient(135deg, #2ECC71, #1A8A4E)',
    bio: 'Brian crafts beautiful, accessible user interfaces that connect donors with the communities they support, bringing pixel-perfect design to life.',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'Glen Torotich',
    role: 'Backend Engineer & Payments Lead',
    initials: 'GT',
    gradient: 'linear-gradient(135deg, #F39C12, #F1C40F)',
    bio: 'Glen ensures every donation is processed securely and efficiently, building robust payment systems that donors can trust completely.',
    linkedin: '#',
  },
  {
    id: 4,
    name: 'Dan',
    role: 'Backend Developer',
    initials: 'D',
    gradient: 'linear-gradient(135deg, #E74C3C, #F39C12)',
    bio: 'Dan builds the data infrastructure that tracks every project, every dollar, and every impact metric — ensuring transparency at every level.',
    linkedin: '#',
  },
  {
    id: 5,
    name: 'Vincent',
    role: 'Security Architect',
    initials: 'V',
    gradient: 'linear-gradient(135deg, #083D61, #0E6BA8)',
    bio: 'Vincent safeguards our platform and our donors\' data, implementing enterprise-grade security practices to protect every interaction.',
    linkedin: '#',
  },
]
```

---

## `src/data/gallery.js`

```js
// ============================================
// Gallery Data — Mock field photos
// ============================================

export const galleryCategories = [
  'All',
  'Water Projects',
  'Schools',
  'Agriculture',
  'Community Events',
]

export const galleryItems = [
  {
    id: 1,
    category: 'Water Projects',
    caption: 'Borehole dedication ceremony — Kajiado, March 2024',
    gradient: 'placeholder-gradient-1',
    height: 280,
  },
  {
    id: 2,
    category: 'Schools',
    caption: 'New sanitation facilities open — Nakuru, February 2024',
    gradient: 'placeholder-gradient-2',
    height: 350,
  },
  {
    id: 3,
    category: 'Agriculture',
    caption: 'First harvest using drip irrigation — Kiambu, January 2024',
    gradient: 'placeholder-gradient-6',
    height: 200,
  },
  {
    id: 4,
    category: 'Community Events',
    caption: 'Community training day — Machakos, December 2023',
    gradient: 'placeholder-gradient-3',
    height: 320,
  },
  {
    id: 5,
    category: 'Water Projects',
    caption: 'Solar pump installation in progress — Machakos, November 2023',
    gradient: 'placeholder-gradient-5',
    height: 240,
  },
  {
    id: 6,
    category: 'Schools',
    caption: 'Students enjoying school meals — Narok, October 2023',
    gradient: 'placeholder-gradient-7',
    height: 300,
  },
  {
    id: 7,
    category: 'Agriculture',
    caption: 'Irrigation canal construction — Laikipia, September 2023',
    gradient: 'placeholder-gradient-4',
    height: 260,
  },
  {
    id: 8,
    category: 'Community Events',
    caption: 'Health worker graduation — Turkana, August 2023',
    gradient: 'placeholder-gradient-8',
    height: 340,
  },
  {
    id: 9,
    category: 'Water Projects',
    caption: 'Water quality testing — Kajiado, July 2023',
    gradient: 'placeholder-gradient-6',
    height: 220,
  },
  {
    id: 10,
    category: 'Schools',
    caption: 'Digital literacy class begins — Mombasa, June 2023',
    gradient: 'placeholder-gradient-4',
    height: 290,
  },
  {
    id: 11,
    category: 'Agriculture',
    caption: 'Farmer cooperative meeting — Kiambu, May 2023',
    gradient: 'placeholder-gradient-2',
    height: 310,
  },
  {
    id: 12,
    category: 'Community Events',
    caption: 'Women\'s group water committee — Kajiado, April 2023',
    gradient: 'placeholder-gradient-1',
    height: 250,
  },
  {
    id: 13,
    category: 'Water Projects',
    caption: 'Storage tank construction — Nakuru, March 2023',
    gradient: 'placeholder-gradient-5',
    height: 330,
  },
  {
    id: 14,
    category: 'Schools',
    caption: 'Handwashing station inauguration — Nakuru, February 2023',
    gradient: 'placeholder-gradient-7',
    height: 210,
  },
  {
    id: 15,
    category: 'Agriculture',
    caption: 'Greenhouse installation — Machakos, January 2023',
    gradient: 'placeholder-gradient-3',
    height: 270,
  },
  {
    id: 16,
    category: 'Community Events',
    caption: 'Annual community impact celebration — Nairobi, December 2022',
    gradient: 'placeholder-gradient-8',
    height: 350,
  },
]
```

---

## `src/data/faqs.js`

```js
// ============================================
// FAQ Data — Mock frequently asked questions
// ============================================

export const faqs = [
  {
    id: 1,
    question: 'How is my donation used?',
    answer: '100% of public donations fund clean water projects and community programmes across East Africa. We operate on a transparent model where 85% goes directly to programme costs, 10% to operations and sustainability, and 5% to administration. Every project is tracked and reported with GPS coordinates and impact metrics.',
  },
  {
    id: 2,
    question: 'Is my donation tax-deductible?',
    answer: 'We are currently working toward US 501(c)(3) equivalency through a fiscal sponsorship arrangement. Please contact us directly for current tax deductibility status and documentation. We are committed to full compliance and transparency for our international donors.',
  },
  {
    id: 3,
    question: 'Can I visit your projects?',
    answer: 'Absolutely! We welcome donors to visit our project sites in Kenya. We organize periodic donor trips where you can see boreholes, schools, farms, and health programs firsthand, meet beneficiary families, and witness your impact in person. Contact us to learn about upcoming trip dates.',
  },
  {
    id: 4,
    question: 'How do I become a monthly supporter?',
    answer: 'Visit our Donate page and select "Monthly" at the top of the donation form. Choose your preferred amount, enter your details, and you\'re done. Monthly supporters receive exclusive quarterly impact reports, early access to project updates, and invitations to special events. You can modify or cancel your monthly gift at any time.',
  },
  {
    id: 5,
    question: 'Do you accept corporate partnerships?',
    answer: 'Yes! We work with companies of all sizes — from local businesses to multinational corporations. Partnership opportunities include project sponsorships, employee giving programs, matching gift campaigns, and cause marketing initiatives. Contact our partnerships team to explore how your company can make a measurable difference.',
  },
  {
    id: 6,
    question: 'How can I volunteer?',
    answer: 'We welcome volunteers both on the ground in Kenya and remotely. On-site volunteers can assist with project implementation, community training, and monitoring visits. Remote volunteers help with design, content creation, translation, and technical development. Visit our Contact page and select "Volunteering" to get started.',
  },
]
```

---

## `src/data/donors.js`

```js
// ============================================
// Donor Feed Data — Mock real-time donor feed
// ============================================

export const donorFeed = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Austin, TX',
    amount: '$50',
    type: 'one-time',
    time: '2 minutes ago',
    initials: 'SM',
    gradient: 'linear-gradient(135deg, #0E6BA8, #36A2EB)',
  },
  {
    id: 2,
    name: 'Anonymous',
    location: '',
    amount: '$100',
    type: 'one-time',
    time: '8 minutes ago',
    initials: 'A',
    gradient: 'linear-gradient(135deg, #2ECC71, #1A8A4E)',
  },
  {
    id: 3,
    name: 'James K.',
    location: 'Portland, OR',
    amount: '$25/month',
    type: 'monthly',
    time: '15 minutes ago',
    initials: 'JK',
    gradient: 'linear-gradient(135deg, #F39C12, #F1C40F)',
  },
  {
    id: 4,
    name: 'The Chen Family',
    location: 'San Francisco, CA',
    amount: '$250',
    type: 'one-time',
    time: '23 minutes ago',
    initials: 'CF',
    gradient: 'linear-gradient(135deg, #E74C3C, #F39C12)',
  },
  {
    id: 5,
    name: 'David R.',
    location: 'New York, NY',
    amount: '$1,000',
    type: 'one-time',
    time: '1 hour ago',
    initials: 'DR',
    gradient: 'linear-gradient(135deg, #083D61, #0E6BA8)',
  },
  {
    id: 6,
    name: 'Maria L.',
    location: 'Chicago, IL',
    amount: '$50/month',
    type: 'monthly',
    time: '2 hours ago',
    initials: 'ML',
    gradient: 'linear-gradient(135deg, #1A8A4E, #0E6BA8)',
  },
  {
    id: 7,
    name: 'Anonymous',
    location: '',
    amount: '$500',
    type: 'one-time',
    time: '3 hours ago',
    initials: 'A',
    gradient: 'linear-gradient(135deg, #F1C40F, #2ECC71)',
  },
]

// Donation amount presets with impact descriptions
export const donationAmounts = [
  { amount: 25, impact: 'Clean water for one family for 3 months' },
  { amount: 50, impact: 'Water pump maintenance for one well' },
  { amount: 100, impact: 'Safe sanitation for a classroom' },
  { amount: 250, impact: 'Water access for a village for 30 days' },
  { amount: 500, impact: 'Fund an entire school water programme' },
  { amount: 1000, impact: 'Sponsor a new borehole installation' },
]

// Other ways to give
export const otherWays = [
  {
    icon: 'building',
    title: 'Corporate Matching',
    description: 'Double your impact through your employer\'s matching gift program.',
  },
  {
    icon: 'will',
    title: 'Planned Giving',
    description: 'Include AquaHope in your estate plans and leave a lasting legacy.',
  },
  {
    icon: 'chart',
    title: 'Stock Donations',
    description: 'Donate appreciated securities and avoid capital gains tax.',
  },
  {
    icon: 'bank',
    title: 'Wire Transfer',
    description: 'Direct bank transfers for larger institutional gifts.',
  },
]
```

---

## `src/hooks/useIntersectionObserver.js`

```js
// ============================================
// useIntersectionObserver Hook
// Triggers animations when elements scroll into view
// ============================================

import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isVisible]
}
```

---

## `src/hooks/useCountUp.js`

```js
// ============================================
// useCountUp Hook
// Animates a number from 0 to target when triggered
// ============================================

import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!start) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    startTimeRef.current = null

    const animate = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [target, duration, start])

  return count
}
```

---

## `src/hooks/useScrollAnimation.js`

```js
// ============================================
// useScrollAnimation Hook
// Adds 'is-visible' class to elements with 'animate-on-scroll'
// when they enter the viewport
// ============================================

import { useEffect } from 'react'

export function useScrollAnimation() {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])
}
```

---

## `src/components/ui/Button.jsx`

```jsx
// ============================================
// Button Component — Reusable CTA button
// ============================================

import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'normal',
  pulse = false,
  block = false,
  disabled = false,
  type = 'button',
  className = '',
  ariaLabel,
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'large' ? 'btn-large' : '',
    pulse ? 'btn-primary-pulse' : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = children

  // Internal link (React Router)
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...rest}
      >
        {content}
      </Link>
    )
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    )
  }

  // Button element
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </button>
  )
}
```

---

## `src/components/ui/Card.jsx`

```jsx
// ============================================
// Card Component — Reusable glassmorphism card
// ============================================

export default function Card({
  children,
  glow = false,
  className = '',
  onClick,
  ...rest
}) {
  const classes = ['card', glow ? 'card-glow' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {children}
    </div>
  )
}
```

---

## `src/components/ui/Badge.jsx`

```jsx
// ============================================
// Badge Component — Reusable badge/pill
// ============================================

export default function Badge({ children, variant = 'water', className = '' }) {
  const classes = ['badge', `badge-${variant.toLowerCase()}`, className]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}
```

---

## `src/components/ui/Modal.jsx`

```jsx
// ============================================
// Modal Component — Reusable modal with backdrop blur
// ============================================

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

export default function Modal({ isOpen, onClose, children, ariaLabel = 'Modal dialog' }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
```

---

## `src/components/ui/Accordion.jsx`

```jsx
// ============================================
// Accordion Component — Reusable expandable FAQ item
// ============================================

import { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function Accordion({ items, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set([1])) // First item open by default

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="faq-list">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  )
}

function AccordionItem({ item, isOpen, onToggle }) {
  const answerRef = useRef(null)

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span>{item.question}</span>
        <FaChevronDown className="faq-question-icon" />
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className="faq-answer"
        ref={answerRef}
        style={{
          maxHeight: isOpen ? `${answerRef.current?.scrollHeight}px` : '0px',
        }}
      >
        <div className="faq-answer-inner">
          {item.answer}
        </div>
      </div>
    </div>
  )
}
```

---

## `src/components/ui/Counter.jsx`

```jsx
// ============================================
// Counter Component — Animated count-up number
// ============================================

import { useCountUp } from '../../hooks/useCountUp'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function Counter({ target, suffix = '', duration = 2000 }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 })
  const count = useCountUp(target, duration, isVisible)

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString()}{suffix}
    </span>
  )
}
```

---

## `src/components/ui/Input.jsx`

```jsx
// ============================================
// Input Component — Reusable floating-label input
// ============================================

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder = ' ',  // Space for floating label :not(:placeholder-shown)
  as = 'input',
  options = [],
  ...rest
}) {
  const id = `input-${name}`

  const commonProps = {
    id,
    name,
    value,
    onChange,
    required,
    placeholder,
    ...rest,
  }

  return (
    <div className="floating-label-group">
      {as === 'textarea' ? (
        <textarea
          className="floating-label-textarea"
          {...commonProps}
        />
      ) : as === 'select' ? (
        <select
          className="floating-label-select"
          {...commonProps}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="floating-label-input"
          {...commonProps}
        />
      )}
      <label htmlFor={id} className="floating-label">
        {label}{required && ' *'}
      </label>
    </div>
  )
}
```

---

## `src/components/layout/Navbar.jsx`

```jsx
// ============================================
// Navbar Component — Sticky nav with scroll frosted glass
// ============================================

import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaTint } from 'react-icons/fa'
import Button from '../ui/Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Scroll listener for frosted glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="AquaHope Foundation home">
            <span className="navbar-logo-icon">
              <FaTint />
            </span>
            AquaHope
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/donate" variant="primary" size="normal" className="navbar-cta">
              Donate
            </Button>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            className={`navbar-hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `mobile-menu-link ${isActive ? 'active' : ''}`
            }
            style={mobileMenuOpen ? {} : { pointerEvents: 'none' }}
          >
            {link.label}
          </NavLink>
        ))}
        <Button to="/donate" variant="primary" size="large">
          Donate Now
        </Button>
      </div>
    </>
  )
}
```

---

## `src/components/layout/Footer.jsx`

```jsx
// ============================================
// Footer Component — Global footer with 4 columns
// ============================================

import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTint,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa'

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF />, href: '#', label: 'Facebook', handle: '@AquaHopeFDN' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram', handle: '@aquahope.fdn' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter/X', handle: '@AquaHopeFDN' },
    { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn', handle: 'AquaHope Foundation' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube', handle: 'AquaHope Foundation' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="navbar-logo-icon">
                <FaTint />
              </span>
              AquaHope
            </Link>
            <p>
              Clean Water. Strong Communities. Lasting Change. We provide safe water,
              sustainable agriculture, quality education, and community health across
              East Africa.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="footer-social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/donate">Donate</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <FaEnvelope />
              <span>hello@aquahope.org</span>
            </div>
            <div className="footer-contact-item">
              <FaPhone />
              <span>+254 700 000 000</span>
            </div>
            <div className="footer-contact-item">
              <FaMapMarkerAlt />
              <span>P.O. Box 00000, Nairobi, Kenya</span>
            </div>
          </div>

          {/* Newsletter Mini Form */}
          <div className="footer-col">
            <h4>Stay Updated</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>
              Get monthly stories from the field delivered to your inbox.
            </p>
            <form className="footer-mini-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 AquaHope Foundation. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## `src/components/layout/ChatWidget.jsx`

```jsx
// ============================================
// ChatWidget Component — Floating support chat
// ============================================

import { useState, useRef, useEffect } from 'react'
import { FaCommentDots, FaTimes, FaMinus, FaPaperPlane } from 'react-icons/fa'

const quickReplies = [
  'I want to donate',
  'Tell me about your projects',
  'I have a question',
]

const autoReply = 'Thanks for reaching out! Our team has received your message and will respond via email within 24 hours. In the meantime, feel free to explore our projects or make a donation. 💙'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! 👋 Welcome to AquaHope. How can we help you today?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setHasNotification(false)
  }

  const sendMessage = (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response after 1.5s
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: autoReply },
      ])
    }, 1500)
  }

  const handleQuickReply = (reply) => {
    sendMessage(reply)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">💧</div>
            <div>
              <div className="chat-header-name">AquaHope Support</div>
              <div className="chat-header-status">Online now</div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className="chat-header-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
            >
              <FaMinus />
            </button>
            <button
              className="chat-header-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message chat-message-${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-typing">
              <span className="chat-typing-dot"></span>
              <span className="chat-typing-dot"></span>
              <span className="chat-typing-dot"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <div className="chat-quick-replies">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                className="chat-quick-reply"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="chat-send-btn"
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        className={`chat-toggle ${hasNotification ? 'notif' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat support' : 'Open chat support'}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>
    </div>
  )
}
```

---

## `src/components/layout/ScrollToTop.jsx`

```jsx
// ============================================
// ScrollToTop Component — Floating scroll-to-top button
// Also handles route change scroll reset
// ============================================

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Show/hide button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  )
}
```

---

## `src/components/sections/Hero.jsx`

```jsx
// ============================================
// Hero Section — Full-viewport animated hero
// ============================================

import { useEffect, useState } from 'react'
import Button from '../ui/Button'

export default function Hero() {
  const [parallaxY, setParallaxY] = useState(0)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setParallaxY(scrolled * 0.4)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 3,
  }))

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Floating Particles */}
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="hero-content"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <span className="section-tag">East Africa Water & Empowerment</span>
        <h1>
          Transforming Communities Through{' '}
          <span className="accent-word">Clean Water</span> & Empowerment
        </h1>
        <p className="hero-subtitle">
          Providing safe water, sustainable agriculture, quality education, and
          community health across East Africa. Your generosity changes everything.
        </p>
        <div className="hero-cta-group">
          <Button to="/donate" variant="primary" size="large" pulse>
            Donate Now
          </Button>
          <Button to="/projects" variant="secondary" size="large">
            See Our Impact
          </Button>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,50 C320,100 640,0 960,40 C1200,70 1320,50 1440,30 L1440,100 L0,100 Z"
            fill="#0A1628"
          />
          <path
            d="M0,70 C320,110 640,20 960,60 C1200,90 1320,70 1440,50 L1440,100 L0,100 Z"
            fill="#0A1628"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/Stats.jsx`

```jsx
// ============================================
// Stats Section — Animated count-up impact stats
// ============================================

import { FaUsers, FaWater, FaSchool, FaHandsHelping } from 'react-icons/fa'
import Counter from '../ui/Counter'

const stats = [
  { icon: <FaUsers />, target: 12000, suffix: '+', label: 'Lives Impacted', delay: 'stagger-1' },
  { icon: <FaWater />, target: 45, suffix: '', label: 'Wells Built', delay: 'stagger-2' },
  { icon: <FaSchool />, target: 30, suffix: '', label: 'Schools Supported', delay: 'stagger-3' },
  { icon: <FaHandsHelping />, target: 8, suffix: '', label: 'Communities Served', delay: 'stagger-4' },
]

export default function Stats() {
  return (
    <section className="section stats-section" aria-label="Impact statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card animate-on-scroll ${stat.delay}`}
            >
              <div className="stat-icon">{stat.icon}</div>
              <Counter target={stat.target} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/Pillars.jsx`

```jsx
// ============================================
// Pillars Section — Four interactive pillar cards
// ============================================

import { FaTint, FaSeedling, FaGraduationCap, FaHeartbeat } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const pillars = [
  {
    icon: <FaTint />,
    title: 'Water & Sanitation',
    description: 'Clean water access through borehole drilling, solar-powered pumps, and sanitation infrastructure that transforms daily life.',
    className: 'water',
    delay: 'stagger-1',
  },
  {
    icon: <FaSeedling />,
    title: 'Agriculture & Livelihoods',
    description: 'Supporting communities through sustainable farming, irrigation systems, and income-generating agricultural programs.',
    className: 'agriculture',
    delay: 'stagger-2',
  },
  {
    icon: <FaGraduationCap />,
    title: 'Education',
    description: 'Providing food, water, and essential resources to underserved schools so every child can learn and thrive.',
    className: 'education',
    delay: 'stagger-3',
  },
  {
    icon: <FaHeartbeat />,
    title: 'Health',
    description: 'Community health programs, values promotion, and trained health workers bringing care to remote villages.',
    className: 'health',
    delay: 'stagger-4',
  },
]

export default function Pillars() {
  return (
    <section className="section" aria-label="Our four pillars">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">What We Do</span>
          <h2>Four Pillars of Lasting Change</h2>
          <p>
            We address the interconnected challenges facing East African communities
            through a holistic approach to development.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`pillar-card animate-on-scroll ${pillar.delay}`}
            >
              <div className={`pillar-icon ${pillar.className}`}>
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <Link to="/projects" className="pillar-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/FeaturedProjects.jsx`

```jsx
// ============================================
// FeaturedProjects Section — Horizontal carousel
// ============================================

import { useRef, useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

const featuredProjects = [
  {
    id: 1,
    title: 'Kajiado Borehole Project',
    category: 'Water',
    location: 'Kajiado County',
    blurb: 'Solar-powered borehole serving 340 families with clean, reliable water.',
    gradient: 'placeholder-gradient-1',
  },
  {
    id: 2,
    title: 'Community Farm Initiative',
    category: 'Agriculture',
    location: 'Kiambu County',
    blurb: 'Drip irrigation and training helping 80 farmers triple their yields.',
    gradient: 'placeholder-gradient-6',
  },
  {
    id: 3,
    title: 'School Meals Programme',
    category: 'Education',
    location: 'Narok County',
    blurb: 'Daily nutritious meals for 500 students sourced from local farmers.',
    gradient: 'placeholder-gradient-3',
  },
  {
    id: 4,
    title: 'Village Health Workers',
    category: 'Health',
    location: 'Turkana County',
    blurb: '40 trained health workers delivering care across 15 remote villages.',
    gradient: 'placeholder-gradient-8',
  },
]

export default function FeaturedProjects() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction) => {
    if (!trackRef.current) return
    const track = trackRef.current
    const cardWidth = track.querySelector('.project-slide')?.offsetWidth || 300
    const gap = 24
    track.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    })
  }

  // Update active dot on scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      const cardWidth = track.querySelector('.project-slide')?.offsetWidth || 300
      const gap = 24
      const index = Math.round(track.scrollLeft / (cardWidth + gap))
      setActiveIndex(index)
    }

    track.addEventListener('scroll', handleScroll)
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="section" aria-label="Featured projects">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">Our Work</span>
          <h2>Featured Projects</h2>
          <p>See how your generosity is transforming lives across East Africa.</p>
        </div>
      </div>

      <div className="container carousel-wrapper">
        <div className="carousel-track" ref={trackRef}>
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-slide">
              <div className="project-slide-card">
                <div className={`project-slide-image ${project.gradient}`}>
                  <span className="placeholder-label">Project Photo</span>
                  <div className="project-slide-overlay">
                    <Badge variant={project.category.toLowerCase()}>{project.category}</Badge>
                  </div>
                </div>
                <div className="project-slide-body">
                  <h4>{project.title}</h4>
                  <div className="project-slide-location">
                    <FaMapMarkerAlt /> {project.location}
                  </div>
                  <p className="project-slide-blurb">{project.blurb}</p>
                  <Link to="/projects" className="project-card-link">
                    View Project <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={() => scroll('prev')}
            aria-label="Previous projects"
          >
            <FaChevronLeft />
          </button>
          <div className="carousel-dots">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => {
                  const track = trackRef.current
                  const cardWidth = track.querySelector('.project-slide')?.offsetWidth || 300
                  const gap = 24
                  track.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth',
                  })
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-btn"
            onClick={() => scroll('next')}
            aria-label="Next projects"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/WhereMoneyGoes.jsx`

```jsx
// ============================================
// WhereMoneyGoes Section — Impact per dollar
// ============================================

import { FaTint, FaWrench, FaChalkboard, FaVillage } from 'react-icons/fa'
import Button from '../ui/Button'

const tiers = [
  {
    amount: '$25',
    description: 'Clean water for one family for 3 months',
    icon: <FaTint />,
    delay: 'stagger-1',
  },
  {
    amount: '$50',
    description: 'Water pump maintenance for one well',
    icon: <FaWrench />,
    delay: 'stagger-2',
  },
  {
    amount: '$100',
    description: 'Safe sanitation for a classroom of 40 students',
    icon: <FaChalkboard />,
    delay: 'stagger-3',
  },
  {
    amount: '$250',
    description: 'Water access for an entire village for 30 days',
    icon: <FaVillage />,
    delay: 'stagger-4',
  },
]

export default function WhereMoneyGoes() {
  return (
    <section className="section" aria-label="Where your money goes">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">Your Impact</span>
          <h2>Where Your Money Goes</h2>
          <p>Every dollar creates measurable, lasting change in the communities we serve.</p>
        </div>

        <div className="impact-tiers">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`impact-tier-card animate-on-scroll ${tier.delay}`}
            >
              <div className="impact-tier-icon">{tier.icon}</div>
              <div className="impact-tier-amount">{tier.amount}</div>
              <div className="impact-tier-desc">{tier.description}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }} className="animate-on-scroll">
          <Button to="/donate" variant="accent" size="large">
            Give Now
          </Button>
        </div>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/Testimonials.jsx`

```jsx
// ============================================
// Testimonials Section — Auto-advancing carousel
// ============================================

import { useState, useEffect, useCallback } from 'react'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goTo = (index) => {
    setActiveIndex(index)
  }

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="section testimonials-section" aria-label="Beneficiary testimonials">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">Voices From the Field</span>
          <h2>Stories of Transformation</h2>
        </div>

        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: testimonial.gradient }}
                >
                  {testimonial.initials}
                </div>
                <div className="testimonial-author-info">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-location">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/Newsletter.jsx`

```jsx
// ============================================
// Newsletter Section — Glassmorphism subscribe card
// ============================================

import { useState } from 'react'
import { FaPaperPlane, FaLock } from 'react-icons/fa'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="section" aria-label="Newsletter subscription">
      <div className="container">
        <div className="newsletter-card animate-on-scroll">
          <span className="section-tag">Stay Connected</span>
          <h2>Stay Connected With Our Impact</h2>
          <p className="text-secondary">
            Monthly stories from the field, project updates, and ways you can help.
          </p>

          {subscribed ? (
            <div style={{ marginTop: 'var(--space-md)', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>
              ✓ Thank you for subscribing! Check your inbox for confirmation.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter subscription"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe <FaPaperPlane />
              </button>
            </form>
          )}

          <div className="newsletter-trust">
            <FaLock style={{ display: 'inline', marginRight: '0.3rem' }} />
            We respect your privacy. Unsubscribe anytime.
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## `src/components/sections/Partners.jsx`

```jsx
// ============================================
// Partners Section — Infinite scrolling marquee
// ============================================

const partners = [
  { name: 'USAID', initials: 'UA', gradient: 'linear-gradient(135deg, #0E6BA8, #36A2EB)' },
  { name: 'Global Fund', initials: 'GF', gradient: 'linear-gradient(135deg, #2ECC71, #1A8A4E)' },
  { name: 'UNICEF', initials: 'UN', gradient: 'linear-gradient(135deg, #F39C12, #F1C40F)' },
  { name: 'Water.org', initials: 'WO', gradient: 'linear-gradient(135deg, #E74C3C, #F39C12)' },
  { name: 'Charity Navigator', initials: 'CN', gradient: 'linear-gradient(135deg, #083D61, #0E6BA8)' },
  { name: 'GuideStar', initials: 'GS', gradient: 'linear-gradient(135deg, #1A8A4E, #0E6BA8)' },
  { name: 'Global Waters', initials: 'GW', gradient: 'linear-gradient(135deg, #F1C40F, #2ECC71)' },
  { name: 'WaterAid', initials: 'WA', gradient: 'linear-gradient(135deg, #E74C3C, #083D61)' },
]

export default function Partners() {
  // Duplicate for seamless infinite scroll
  const marqueePartners = [...partners, ...partners]

  return (
    <section className="partners-marquee" aria-label="Our partners">
      <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <span className="section-tag">Trusted Partnerships</span>
        <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
          Working together with global organizations
        </h3>
      </div>

      <div className="partners-track">
        {marqueePartners.map((partner, index) => (
          <div key={index} className="partner-logo">
            <div
              className="partner-logo-circle"
              style={{ background: partner.gradient }}
            >
              {partner.initials}
            </div>
            <span className="partner-logo-text">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## `src/pages/Home.jsx`

```jsx
// ============================================
// Home Page — Landing page assembling all sections
// ============================================

import { useEffect } from 'react'
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import Pillars from '../components/sections/Pillars'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import WhereMoneyGoes from '../components/sections/WhereMoneyGoes'
import Testimonials from '../components/sections/Testimonials'
import Newsletter from '../components/sections/Newsletter'
import Partners from '../components/sections/Partners'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Home() {
  useScrollAnimation()

  // Set page metadata
  useEffect(() => {
    document.title = 'AquaHope Foundation — Clean Water. Strong Communities. Lasting Change.'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'AquaHope Foundation provides safe water, sustainable agriculture, quality education, and community health across East Africa. Your generosity changes everything.')
    }
  }, [])

  return (
    <div className="page-fade">
      <Hero />
      <Stats />
      <Pillars />
      <FeaturedProjects />
      <WhereMoneyGoes />
      <Testimonials />
      <Newsletter />
      <Partners />
    </div>
  )
}
```

---

## `src/pages/About.jsx`

```jsx
// ============================================
// About Page — Story, mission, timeline, team
// ============================================

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaHome, FaBullseye, FaEye, FaLinkedinIn } from 'react-icons/fa'
import {
  FaShieldAlt,
  FaLeaf,
  FaUsers,
  FaHandshake,
  FaLightbulb,
  FaHandsHelping,
} from 'react-icons/fa'
import Button from '../components/ui/Button'
import { team } from '../data/team'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const milestones = [
  { year: '2018', title: 'Founded', description: 'Founded with a mission to serve underserved communities in Kenya, starting with a vision of clean water for all.' },
  { year: '2019', title: 'First Borehole', description: 'First borehole completed in Kajiado County, serving 340 families with clean, reliable water access.' },
  { year: '2020', title: 'Sanitation Programs', description: 'Expanded to sanitation and hygiene education in 5 schools across Nakuru County.' },
  { year: '2021', title: 'Agriculture Launch', description: 'Launched agricultural livelihoods programme in Machakos, helping farmers triple their yields.' },
  { year: '2022', title: '5,000 Beneficiaries', description: 'Reached 5,000 beneficiaries across 3 counties with integrated water, health, and education programs.' },
  { year: '2023', title: 'Sustainable Partnership', description: 'Partnership with regional water authority for sustainable maintenance of all water infrastructure.' },
  { year: '2024', title: '10,000+ Lives', description: '10,000+ lives impacted, expanded to 8 communities with a growing team and donor base.' },
]

const values = [
  { icon: <FaShieldAlt />, title: 'Transparency', description: 'Every dollar is accounted for. Every project is tracked.' },
  { icon: <FaLeaf />, title: 'Sustainability', description: 'We build solutions that last, not quick fixes.' },
  { icon: <FaUsers />, title: 'Community', description: 'Local ownership drives lasting change.' },
  { icon: <FaHandshake />, title: 'Integrity', description: 'We do what we say, and we say what we do.' },
  { icon: <FaLightbulb />, title: 'Innovation', description: 'Smart solutions for complex challenges.' },
  { icon: <FaHandsHelping />, title: 'Empowerment', description: 'We don\'t just help — we enable.' },
]

export default function About() {
  useScrollAnimation()

  useEffect(() => {
    document.title = 'About Us — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about AquaHope Foundation\'s mission, vision, journey, and the team dedicated to bringing clean water and empowerment to East Africa.')
    }
  }, [])

  return (
    <div className="page-fade">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>About</span>
          </div>
          <h1>Our Story</h1>
          <p>Building hope, one community at a time.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Purpose</span>
            <h2>Mission & Vision</h2>
          </div>

          <div className="mission-vision-grid">
            <div className="mv-card animate-on-scroll stagger-1">
              <div className="mv-card-icon"><FaBullseye /></div>
              <h3>Our Mission</h3>
              <p>
                To provide sustainable access to clean water, sanitation, and community
                resources across East Africa, empowering families to thrive.
              </p>
            </div>
            <div className="mv-card animate-on-scroll stagger-2">
              <div className="mv-card-icon"><FaEye /></div>
              <h3>Our Vision</h3>
              <p>
                A world where every community has access to clean water, quality education,
                and sustainable livelihoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Journey</span>
            <h2>Milestones Through the Years</h2>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="timeline-item animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">What Drives Us</span>
            <h2>Our Core Values</h2>
            <p>These principles guide every decision we make and every project we undertake.</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className={`value-card animate-on-scroll stagger-${(index % 6) + 1}`}
              >
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">The People Behind AquaHope</span>
            <h2>Meet the Team</h2>
            <p>Dedicated professionals using their skills to create lasting change.</p>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-card animate-on-scroll">
                <div className="team-card-inner">
                  {/* Front */}
                  <div className="team-card-front">
                    <div
                      className="team-avatar"
                      style={{ background: member.gradient }}
                    >
                      {member.initials}
                    </div>
                    <h4>{member.name}</h4>
                    <div className="team-card-role">{member.role}</div>
                    <div className="team-card-bio">Hover to read bio</div>
                  </div>
                  {/* Back */}
                  <div className="team-card-back">
                    <p>{member.bio}</p>
                    <a
                      href={member.linkedin}
                      className="team-linkedin"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="cta-banner animate-on-scroll">
          <h2>Join us in making a difference</h2>
          <p>Your support brings clean water and hope to communities across East Africa.</p>
          <div className="cta-banner-buttons">
            <Button to="/donate" variant="primary" size="large">Donate Now</Button>
            <Button to="/contact" variant="secondary" size="large">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## `src/pages/Projects.jsx`

```jsx
// ============================================
// Projects Page — Filterable grid with modal detail
// ============================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaHome, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaClock } from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { projects, projectCategories } from '../data/projects'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Projects() {
  useScrollAnimation()

  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.title = 'Our Projects — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore AquaHope Foundation\'s water, agriculture, education, and health projects across East Africa. See the impact of your generosity.')
    }
  }, [])

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="page-fade">
      {/* Header */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Projects</span>
          </div>
          <h1>Our Projects</h1>
          <p>See the impact of your generosity across East Africa.</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs animate-on-scroll">
            {projectCategories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="projects-grid" key={activeFilter}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-card animate-on-scroll"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`project-card-image ${project.gradient}`}>
                  <span className="placeholder-label">Project Photo</span>
                  <div className="project-card-image-overlay">
                    <Badge variant={project.category.toLowerCase()}>
                      {project.category}
                    </Badge>
                    <Badge variant={project.status === 'Completed' ? 'completed' : 'in-progress'}>
                      {project.status === 'Completed' ? <FaCheckCircle /> : <FaClock />}
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <div className="project-card-body">
                  <h4>{project.title}</h4>
                  <div className="project-card-location">
                    <FaMapMarkerAlt /> {project.location}
                  </div>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-card-footer">
                    <button
                      className="project-card-link"
                      onClick={() => openModal(project)}
                      aria-label={`View details for ${project.title}`}
                    >
                      View Details <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} ariaLabel="Project details">
        {selectedProject && (
          <>
            <div className={`modal-image ${selectedProject.gradient}`}>
              <span className="placeholder-label">Project Photo</span>
            </div>
            <div className="modal-body">
              <div className="modal-badges">
                <Badge variant={selectedProject.category.toLowerCase()}>
                  {selectedProject.category}
                </Badge>
                <Badge variant={selectedProject.status === 'Completed' ? 'completed' : 'in-progress'}>
                  {selectedProject.status}
                </Badge>
              </div>

              <h3>{selectedProject.title}</h3>

              <div className="modal-gps">
                <FaMapMarkerAlt /> {selectedProject.location}, Kenya
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  Interactive map coming soon
                </span>
              </div>

              <div className="modal-section">
                <h5>The Challenge</h5>
                <p>{selectedProject.challenge}</p>
              </div>

              <div className="modal-section">
                <h5>Our Solution</h5>
                <p>{selectedProject.solution}</p>
              </div>

              <div className="modal-section">
                <h5>Impact Metrics</h5>
                <div className="modal-impact-grid">
                  {selectedProject.impact.map((metric, index) => (
                    <div key={index} className="modal-impact-item">
                      <div className="modal-impact-number">{metric.number}</div>
                      <div className="modal-impact-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h5>Project Gallery</h5>
                <div className="modal-gallery">
                  {selectedProject.gallery.map((gradient, index) => (
                    <div
                      key={index}
                      className={`modal-gallery-item ${gradient}`}
                    />
                  ))}
                </div>
              </div>

              <Button to="/donate" variant="primary" size="large" block onClick={closeModal}>
                Support This Project
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
```

---

## `src/pages/Gallery.jsx`

```jsx
// ============================================
// Gallery Page — Masonry grid with lightbox
// ============================================

import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaHome,
  FaTimes,
  FaChevronLeft,
  FaEye,
} from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { galleryItems, galleryCategories } from '../data/gallery'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Gallery() {
  useScrollAnimation()

  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    document.title = 'Gallery — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'View photos from AquaHope Foundation\'s water, education, agriculture, and community health projects across East Africa.')
    }
  }, [])

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const navigateLightbox = useCallback(
    (direction) => {
      setLightboxIndex((prev) => {
        if (prev === null) return null
        const max = filteredItems.length - 1
        if (direction === 'next') return prev >= max ? 0 : prev + 1
        return prev <= 0 ? max : prev - 1
      })
    },
    [filteredItems.length]
  )

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, closeLightbox, navigateLightbox])

  return (
    <div className="page-fade">
      {/* Header */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Gallery</span>
          </div>
          <h1>Stories From the Field</h1>
          <p>Every image represents a life changed. A community transformed.</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs animate-on-scroll">
            {galleryCategories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid" key={activeFilter}>
            {filteredItems.map((item, index) => (
              <MasonryItem
                key={item.id}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-surface">
        <div className="container text-center animate-on-scroll">
          <h2>Have photos from our projects?</h2>
          <p className="text-secondary" style={{ marginBottom: 'var(--space-md)' }}>
            Share them with us and help tell the story of transformation.
          </p>
          <Button to="/contact" variant="secondary" size="large">
            Contact Us
          </Button>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox('prev')
            }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`lightbox-image ${filteredItems[lightboxIndex].gradient}`}>
              <span className="placeholder-label">Photo</span>
            </div>
            <div className="lightbox-caption">
              <Badge variant="water">{filteredItems[lightboxIndex].category}</Badge>
              <p style={{ marginTop: '0.5rem' }}>{filteredItems[lightboxIndex].caption}</p>
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox('next')
            }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

// Individual masonry item with scroll animation
function MasonryItem({ item, index, onClick }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className="masonry-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${item.caption}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick()
      }}
    >
      <div
        className={`masonry-item-content ${item.gradient}`}
        style={{ height: `${item.height}px` }}
      >
        <div className="masonry-item-label">
          <Badge variant="water">{item.category}</Badge>
        </div>
        <div className="masonry-item-caption">
          <span className="masonry-item-caption-text">
            <FaEye /> {item.caption}
          </span>
        </div>
      </div>
    </div>
  )
}
```

---

## `src/pages/Donate.jsx`

```jsx
// ============================================
// Donate Page — High-conversion donation form
// ============================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaHome,
  FaLock,
  FaShieldAlt,
  FaAward,
  FaSearchDollar,
  FaBuilding,
  FaFileSignature,
  FaChartLine,
  FaUniversity,
} from 'react-icons/fa'
import { donationAmounts, donorFeed, otherWays } from '../data/donors'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const otherWayIcons = {
  building: <FaBuilding />,
  will: <FaFileSignature />,
  chart: <FaChartLine />,
  bank: <FaUniversity />,
}

export default function Donate() {
  useScrollAnimation()

  const [donationType, setDonationType] = useState('monthly')
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorMessage, setDonorMessage] = useState('')

  useEffect(() => {
    document.title = 'Donate — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Donate to AquaHope Foundation. 100% of your donation goes directly to communities. Clean water, sanitation, agriculture, education, and health across East Africa.')
    }
  }, [])

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock — real integration will connect to Pesapal
    alert(`Thank you for your ${donationType} donation of $${finalAmount}! In production, this would redirect to Pesapal for secure payment processing.`)
  }

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="donate-hero">
        <div className="container donate-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Donate</span>
          </div>
          <h1>Your Generosity Changes Lives</h1>
          <p>
            100% of your donation goes directly to the communities we serve.
            Clean water. Strong futures.
          </p>
        </div>
      </section>

      {/* Donation Layout */}
      <div className="donate-layout">
        {/* LEFT: Donation Form */}
        <div className="donate-form-card animate-on-scroll">
          {/* Type Toggle */}
          <div className="donate-type-toggle">
            <button
              className={`donate-type-btn ${donationType === 'monthly' ? 'active' : ''}`}
              onClick={() => setDonationType('monthly')}
              aria-pressed={donationType === 'monthly'}
            >
              Monthly
            </button>
            <button
              className={`donate-type-btn ${donationType === 'one-time' ? 'active' : ''}`}
              onClick={() => setDonationType('one-time')}
              aria-pressed={donationType === 'one-time'}
            >
              One-time
            </button>
          </div>

          <div className="donate-social-proof">
            {donationType === 'monthly' ? (
              <>Join <strong>847 monthly supporters</strong> creating lasting change</>
            ) : (
              <>Make a one-time gift that creates immediate impact</>
            )}
          </div>

          {donationType === 'monthly' && (
            <div className="donate-impact-note">
              Your $25/month = $300/year = 1 family's water access for life
            </div>
          )}

          {/* Amount Selector */}
          <div className="donate-form-section">
            <label>Choose Your Amount</label>
            <div className="amount-grid">
              {donationAmounts.map((item) => (
                <button
                  key={item.amount}
                  type="button"
                  className={`amount-btn ${!customAmount && selectedAmount === item.amount ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAmount(item.amount)
                    setCustomAmount('')
                  }}
                  aria-pressed={selectedAmount === item.amount}
                >
                  ${item.amount}
                  <span className="amount-btn-impact">{item.impact}</span>
                </button>
              ))}
            </div>

            <div className="custom-amount-wrapper">
              <span className="custom-amount-prefix">$</span>
              <input
                type="number"
                className="custom-amount-input"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                aria-label="Custom donation amount"
              />
            </div>
          </div>

          {/* Donor Info */}
          <form onSubmit={handleSubmit}>
            <div className="donate-form-section">
              <label htmlFor="donor-name">Full Name</label>
              <input
                id="donor-name"
                type="text"
                className="donate-form-input"
                placeholder="Jane Doe"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
              />
            </div>

            <div className="donate-form-section">
              <label htmlFor="donor-email">Email Address</label>
              <input
                id="donor-email"
                type="email"
                className="donate-form-input"
                placeholder="jane@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
              />
            </div>

            <div className="donate-form-section">
              <label htmlFor="donor-message">Write a message of hope (optional)</label>
              <textarea
                id="donor-message"
                className="donate-form-textarea"
                placeholder="Your message of encouragement to the communities we serve..."
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="donate-submit-btn">
              Donate ${finalAmount} {donationType === 'monthly' ? '/month' : ''} with Pesapal
            </button>

            <div className="donate-security-note">
              <FaLock /> Secure payment processed by Pesapal. Your card details never touch our servers.
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              Pesapal is a licensed payment service provider serving East Africa and international donors.
            </div>
          </form>
        </div>

        {/* RIGHT: Trust Sidebar */}
        <aside className="trust-sidebar">
          {/* Why Donate */}
          <div className="trust-card animate-on-scroll stagger-1">
            <h4>Why Donate to AquaHope?</h4>
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="trust-badge-icon"><FaAward /></div>
                <div className="trust-badge-text">Charity Navigator</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon"><FaSearchDollar /></div>
                <div className="trust-badge-text">GuideStar / Candid</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon"><FaShieldAlt /></div>
                <div className="trust-badge-text">BBB Accredited</div>
              </div>
            </div>
          </div>

          {/* Where Money Goes */}
          <div className="trust-card animate-on-scroll stagger-2">
            <h4>Where Your Money Goes</h4>
            <div className="allocation-bar">
              <div
                className="allocation-segment"
                style={{ flex: '85', background: 'var(--color-primary)' }}
              >
                85%
              </div>
              <div
                className="allocation-segment"
                style={{ flex: '10', background: 'var(--color-secondary)' }}
              >
                10%
              </div>
              <div
                className="allocation-segment"
                style={{ flex: '5', background: 'var(--color-accent)' }}
              >
                5%
              </div>
            </div>
            <div className="allocation-legend">
              <div className="allocation-legend-item">
                <span className="allocation-legend-dot" style={{ background: 'var(--color-primary)' }}></span>
                85% — Direct Programme Costs
              </div>
              <div className="allocation-legend-item">
                <span className="allocation-legend-dot" style={{ background: 'var(--color-secondary)' }}></span>
                10% — Operations & Sustainability
              </div>
              <div className="allocation-legend-item">
                <span className="allocation-legend-dot" style={{ background: 'var(--color-accent)' }}></span>
                5% — Administration
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="trust-card animate-on-scroll stagger-3">
            <h4>Bank-Level Security</h4>
            <div className="security-badges">
              <div className="security-badge">
                <FaLock /> SSL Secured
              </div>
              <div className="security-badge">
                <FaShieldAlt /> PCI Compliant
              </div>
              <div className="security-badge">
                <FaLock /> 256-bit Encryption
              </div>
            </div>
          </div>

          {/* Donor Testimonial */}
          <div className="trust-card animate-on-scroll stagger-4">
            <p className="donor-testimonial">
              "I've been giving monthly for 2 years. The impact reports I receive
              make me confident my money is making a real difference."
            </p>
            <div className="donor-testimonial-author">— Sarah M., Austin TX</div>
          </div>
        </aside>
      </div>

      {/* Real-Time Donor Feed */}
      <section className="donor-feed">
        <div className="donor-feed-title animate-on-scroll">
          <span className="section-tag">Live Feed</span>
          <h2>Recent Supporters</h2>
          <p className="text-secondary">Join a growing community of donors making a difference.</p>
        </div>

        <div className="donor-feed-list">
          {donorFeed.map((donor, index) => (
            <div
              key={donor.id}
              className="donor-feed-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="donor-feed-avatar"
                style={{ background: donor.gradient }}
              >
                {donor.initials}
              </div>
              <div className="donor-feed-info">
                <div className="donor-feed-name">
                  {donor.name}
                  {donor.location && (
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                      {' '}from {donor.location}
                    </span>
                  )}
                </div>
                <div className="donor-feed-meta">{donor.time}</div>
              </div>
              <div className="donor-feed-amount">{donor.amount}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">More Ways to Give</span>
            <h2>Other Ways to Make an Impact</h2>
          </div>

          <div className="other-ways-grid">
            {otherWays.map((way, index) => (
              <div
                key={index}
                className={`other-way-card animate-on-scroll stagger-${index + 1}`}
              >
                <div className="other-way-icon">
                  {otherWayIcons[way.icon]}
                </div>
                <h5>{way.title}</h5>
                <p>{way.description}</p>
                <a href="#" className="other-way-link">Learn More →</a>
              </div>
            ))}
          </div>

          <div className="tax-note">
            For tax deductibility information, please contact us directly.
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## `src/pages/Contact.jsx`

```jsx
// ============================================
// Contact Page — Form, info, social, FAQ
// ============================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa'
import Input from '../components/ui/Input'
import Accordion from '../components/ui/Accordion'
import { faqs } from '../data/faqs'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const socialLinks = [
  { icon: <FaFacebookF />, label: 'Facebook', handle: '@AquaHopeFDN' },
  { icon: <FaInstagram />, label: 'Instagram', handle: '@aquahope.fdn' },
  { icon: <FaTwitter />, label: 'Twitter/X', handle: '@AquaHopeFDN' },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', handle: 'AquaHope Foundation' },
  { icon: <FaYoutube />, label: 'YouTube', handle: 'AquaHope Foundation' },
]

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'donation', label: 'Donation Question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'media', label: 'Media / Press' },
  { value: 'other', label: 'Other' },
]

export default function Contact() {
  useScrollAnimation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with AquaHope Foundation. Questions, partnerships, volunteering, or media inquiries — we\'d love to hear from you.')
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Contact</span>
          </div>
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Questions, partnerships, or just want to say hello.</p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section">
        <div className="contact-layout">
          {/* LEFT: Form */}
          <div className="contact-form-card animate-on-scroll">
            {isSubmitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <FaCheckCircle />
                </div>
                <h3>Thank you!</h3>
                <p className="text-secondary">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Subject"
                  as="select"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  options={subjectOptions}
                />
                <Input
                  label="Message"
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Info */}
          <div>
            <div className="contact-info-card animate-on-scroll stagger-1">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Contact Information</h3>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaEnvelope /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">hello@aquahope.org</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaPhone /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+254 700 000 000</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <div className="contact-info-label">Address</div>
                  <div className="contact-info-value">P.O. Box 00000, Nairobi, Kenya</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaClock /></div>
                <div>
                  <div className="contact-info-label">Office Hours</div>
                  <div className="contact-info-value">Mon–Fri, 8:00 AM – 5:00 PM EAT</div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder">
                <div className="map-placeholder-content">
                  <div className="map-placeholder-icon"><FaMapMarkerAlt /></div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
                    Nairobi, Kenya
                  </div>
                  <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--color-text-secondary)' }}>
                    Interactive map coming soon
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-info-card animate-on-scroll stagger-2" style={{ marginTop: 'var(--space-md)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-sm)' }}>Connect With Us</h3>
              <div className="contact-social">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="contact-social-link"
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="contact-social-tooltip">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about AquaHope Foundation.</p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  )
}
```

---

## `src/App.jsx`

```jsx
// ============================================
// App Component — Router + global layout
// ============================================

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ChatWidget from './components/layout/ChatWidget'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Donate from './pages/Donate'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Widgets */}
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}
```

---

## `src/main.jsx`

```jsx
// ============================================
// Entry Point — React mount + Router + Styles
// ============================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Stylesheets (order matters: variables → animations → global)
import './styles/variables.css'
import './styles/animations.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

---

## `README.md`

```markdown
# AquaHope Foundation — Frontend

A world-class, production-quality React frontend for a Water, Sanitation & Community
Empowerment nonprofit organization targeting US-based donors.

## Tech Stack

- **React 18** (JavaScript — no TypeScript)
- **React Router v6** (client-side routing)
- **Vite** (build tooling)
- **Vanilla CSS** (no Tailwind, no frameworks)
- **react-icons** (Font Awesome icon set)
- **Google Fonts** — Inter (body) + Outfit (headings)

## Features

- 6 fully built pages: Home, About, Projects, Gallery, Donate, Contact
- Dark luxury aesthetic with glassmorphism, gradients, and micro-animations
- Mobile-first responsive design (breakpoints: 480px, 768px, 1024px, 1440px)
- Scroll-triggered animations via Intersection Observer (no external libraries)
- Animated count-up statistics
- Floating chat widget with auto-reply (UI shell)
- Scroll-to-top button with route-change scroll reset
- Project detail modal with backdrop blur
- Gallery lightbox with keyboard navigation
- FAQ accordion
- High-conversion donation page with trust signals, real-time donor feed, and
  impact-per-dollar breakdowns
- WCAG 2.1 AA accessibility: skip links, focus-visible, ARIA labels, keyboard nav,
  prefers-reduced-motion support
- SEO: unique titles/meta per page, semantic HTML5, JSON-LD structured data,
  Open Graph tags

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/src
  /components
    /layout     → Navbar, Footer, ChatWidget, ScrollToTop
    /ui         → Button, Card, Badge, Modal, Accordion, Input, Counter
    /sections   → Hero, Stats, Pillars, FeaturedProjects, WhereMoneyGoes,
                  Testimonials, Newsletter, Partners
  /pages        → Home, About, Projects, Gallery, Donate, Contact
  /data         → projects, testimonials, team, gallery, faqs, donors (mock JSON)
  /hooks        → useScrollAnimation, useCountUp, useIntersectionObserver
  /styles       → variables.css, animations.css, global.css
  App.jsx       → Router + global layout
  main.jsx      → React mount point
```

## Backend Integration Notes

This is the frontend mockup phase. The following integrations are planned:

- **Supabase** — Live impact stats, donor feed, project data, contact form submissions
- **Pesapal** — Payment processing for donations (replace mock donate form submit)
- **Sanity CMS** — Content management for projects, gallery, blog/updates
- **Tawk.to + Gmail API** — Real chat widget replacing the UI shell

All mock data lives in `/src/data/` and can be replaced with API calls.

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#0E6BA8` | Deep ocean blue — trust, water |
| Secondary | `#2ECC71` | Lush green — growth, agriculture |
| Accent | `#F39C12` | Warm amber — energy, urgency |
| Dark BG | `#0A1628` | Deep navy — premium background |
| Danger/CTA | `#E74C3C` | Donate urgency buttons |

### Typography
- **Headings:** Outfit (600–800)
- **Body:** Inter (300–500)

## License

© 2025 AquaHope Foundation. All rights reserved.
```

---

This is the **complete, working codebase** — every file needed to run the project. To start:

```bash
npm install
npm run dev
```

The application will open at `http://localhost:3000` with all 6 pages, the floating chat widget, scroll-to-top, animated counters, glassmorphism design, and full mobile responsiveness — ready for the backend team to integrate Supabase, Pesapal, and Sanity CMS.