# NPO — DeepSeek Audit

**Date:** 2026-07-13
**Path:** `C:\Users\TATI\Desktop\DEV\NPO\`
**Stack:** JavaScript / React 18 + Vite 5
**Tier:** 3 — Medium
**Dependencies:** None installed

---

## 🔴 Security Vulnerabilities

No auth vulnerabilities — static React frontend with LocalStorage-based data. No server, no API keys. Safe for its use case (nonprofit donation dashboard).

---

## 🟡 UI/UX Improvements

| Severity | File | Line(s) | Issue | Exact Fix |
|----------|------|---------|-------|-----------|
| 🟡 MEDIUM | `src/pages/Dashboard.tsx` | 52, 232-497 | 13 hardcoded chart colors (`#0E6BA8`, `#F39C12`, `#E74C3C`, `#8884d8`). | Tokenize to CSS custom properties: `--chart-blue: #0E6BA8; --chart-amber: #F39C12; --chart-red: #E74C3C; --chart-purple: #8884d8;`. |
| 🟡 MEDIUM | `src/components/sections/Partners.tsx` | 6-13 | 8 partners each with inline gradient strings — repetitive. | Extract to a `PARTNER_GRADIENTS` array or CSS class per partner. |
| 🟡 MEDIUM | All pages | — | No simulated loading transitions — data is static but perceived performance would improve with skeleton loading. | Consider adding CSS skeleton shimmer or fade-in transitions. |
| ✅ | Global CSS | — | CSS custom properties design system. Good. | — |
| ✅ | All components | — | Skip-to-content link, `aria-label` on ALL interactive elements, `aria-expanded`/`aria-pressed`/`aria-modal`/`role="dialog"`. **Best accessibility in portfolio.** | — |
| ✅ | CSS | — | `:focus-visible` ring, `prefers-reduced-motion` support, skeleton shimmer CSS class. Good. | — |
| ✅ | HTML | — | Semantic HTML landmarks. Good. | — |

---

## 🔧 Session: 2026-07-14 — Multi-Agent Deep Audit Sweep (Round 1)

**Status:** Not audited in this round. Previously fixed (July 5): ChatWidget double-escaped user text (`&amp;` → removed manual escaping). Sweep Round 2 will cover Tier 4.

| Category | Package | Issue | Fix |
|----------|---------|-------|-----|
| 🔴 CRITICAL | `@types/react-router-dom ^5.1.8` + `react-router-dom ^6.26.0` | **Peer dependency mismatch** — React Router types v5 installed with React Router runtime v6. TypeScript will have wrong type definitions, autocomplete will fail, compile-time errors possible. | Replace with `@types/react-router-dom ^6.26.0` matching the runtime. |
| 🟠 HIGH | `react-icons ^4.12.0` | **15MB+ bundle** for icon library. `lucide-react` is ~200KB and provides same quality. | Replace with `lucide-react ^0.460.0`. Map commonly used icons: `FaDonate` → `HandHeart`, `FaHandsHelping` → `Users`, etc. |
| 🟡 MEDIUM | `vite ^5.4.19` | Loose caret — Vite 6 exists with breaking changes. | Pin to `5.4.19` or add upper bound. |
| 🟡 MEDIUM | `react ^18.3.1` | React 18 — plan migration to React 19 for consistency with other projects. | — |

### Missing Dev Tooling
- **No eslint** — no `.eslintrc` or `eslint.config.*`
- No `.nvmrc`

---

## 📋 Priority Fix Queue

1. **[CRITICAL — Peer Dep]** Replace `@types/react-router-dom ^5.1.8` with `^6.26.0` matching the runtime.
2. **[HIGH — Bundle Size]** Replace `react-icons ^4.12.0` (15MB) with `lucide-react ^0.460.0` (~200KB).
3. **[MEDIUM — Colors]** Tokenize 13 hardcoded chart colors to CSS custom properties.
4. **[MEDIUM — Linting]** Add eslint + eslint-plugin-react-hooks.
5. **[MEDIUM — Runtime]** Add `.nvmrc` (Node 18 or 20).
