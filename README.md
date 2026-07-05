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
