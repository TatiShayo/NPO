# NPO Water & Sanitation Platform — Full Strategic Research Report
### East Africa Build · US Donor Focus · KSh 160,000 (~$1,200 USD) · 7 Weeks · 5-Person Team

> **How to use this document:** This is a pre-meeting intelligence brief synthesized across 13 research domains. Sections are cross-referenced — findings in one domain constrain or unlock decisions in others. Read the Critical Decision Map first (Section 14), then dive into whichever domains match your meeting agenda.

---

## Table of Contents
1. NPO Donation Page Psychology & Conversion
2. Payment Gateway Analysis — Pesapal vs Alternatives
3. Full Tech Stack Evaluation
4. AI Chatbot — Specification, Options & Implementation
5. Newsletter & Email Marketing System
6. Content Management — The Missing Piece
7. Inventory Management System
8. Security Architecture
9. SEO & US Donor Acquisition
10. Accessibility & Compliance
11. Analytics & Impact Tracking
12. Future Upgrade Roadmap
13. Competitive Benchmarking
14. **Critical Decision Map** (Week 1 decisions with long-tail consequences)
15. **Recommended Full Stack** (with cost estimates)
16. **Risk Register** (Top 10 risks + mitigations)
17. **Week 1 Research Checklist**
18. **Premium Talking Points** (10 expert-level insights)

---

## DOMAIN 1: NPO Donation Page Psychology & Conversion Optimization

### What the Data Says

The 2024 M+R Benchmarks study — the industry's most authoritative source, covering hundreds of US nonprofits — pegs the **average donation page conversion rate at 11–12%** (11% desktop, 8% mobile). Platforms with aggressive optimization (AI-suggested amounts, express checkout) like Fundraise Up average 28%, more than double the benchmark. Best-in-class campaigns reach 41–48%. This gap exists almost entirely because of friction and trust — not because of brand recognition.

For a **US donor giving to an Africa-based water NPO**, the conversion funnel has an extra psychological layer compared to domestic giving: **geographic trust distance**. US donors cannot verify in-person that the organization exists and operates as claimed. This makes every trust signal twice as important as it would be for a US-based charity.

### Trust Signals US Donors Require

**Tier 1 — Non-negotiables (absence kills conversion):**
- SSL padlock visible throughout checkout
- Clear display of 501(c)(3) status OR explicit explanation of fiscal sponsorship / international charity equivalency
- Charity Navigator or GuideStar/Candid profile badge (US donors check these)
- Publicly available audited financials or at least an annual report
- Prominent refund/cancellation policy

**Tier 2 — Differentiators for Africa-based NPOs:**
- GPS-linked project maps showing exact locations of work (charity: water pioneered this; it dramatically increased trust)
- Real photos with geotags, names, and faces of beneficiaries (stock photos destroy credibility)
- "How we use your donation" breakdown (showing overhead %, admin split, programmatic spend)
- Named leadership team with LinkedIn profiles and professional photos
- Third-party impact audits (e.g., GiveWell listing, USAID partnership, UN affiliation)
- Press mentions from US outlets (even small ones)
- Video content — a 90-second "field visit" video from Kenya converts far better than text

**Tier 3 — Conversion boosters:**
- Real-time donor feed ("Sarah from Austin just donated $50")
- Donation impact calculator ("Your $25 = 6 months of clean water for one family")
- Progress bar toward a campaign goal
- Testimonials from US donors who have already given, not just beneficiaries

### Recurring vs One-Time Donation UX

**The data is unambiguous:** Recurring donors have 3–5× higher lifetime value than one-time donors and retention rates of 80–90% vs 23% for one-time donors (Fundraising Effectiveness Project). However, the conversion tactic must be subtle.

**Best practice implementation:**
- Default the donation form to "Monthly" (not one-time) — this single change increases recurring acquisition by 30–50% in A/B tests
- Show the equivalent annual impact: "Your $25/month = $300/year = 1 family's water access for life"
- Allow easy downgrade to one-time as a secondary option (don't bury it, but don't lead with it)
- Send a "donor portal" link post-donation where recurring donors can self-manage (pause, upgrade, cancel) — this reduces churn and support overhead

**Implementation note for this project:** The Donate page should be a standalone page, not embedded in the homepage. Dedicated pages convert higher because they eliminate navigation distractions. Every link in the site that says "Donate" should land on this page with a clean URL (e.g., `/give` or `/donate`).

### Impact Metric Framing That Converts

Research from multiple fundraising platforms consistently shows that **named individual beneficiaries outperform statistics** in emotional engagement but statistics outperform in trust-building. The highest-performing pages combine both:

```
"Meet Grace, 7, from Kajiado County. Her village got clean water in March 2024.
Across Kenya, we've served 4,200 families like hers — and $50 covers one family
for 6 months."
```

**Recommended impact tier structure on the donation page:**
- $25 → "Clean water for one family for 3 months"
- $50 → "Water pump maintenance for one well"
- $100 → "Safe sanitation for a classroom"
- $250 → "Water access for an entire village for 30 days"
- Custom amount (always include this)

These amounts should be researched against the NPO's actual cost structure and not fabricated — US donors, especially major ones, will ask for proof.

---

## DOMAIN 2: Payment Gateway Analysis — Pesapal vs Alternatives

### The Core Strategic Problem

This is the most consequential decision in the entire project, and it is **not a simple technical choice** — it has legal, regulatory, financial, and trust dimensions that interact.

The fundamental issue: **the NPO is Kenya-registered but targeting US donors in USD.** This cross-jurisdictional setup creates compliance friction that most payment solutions are not designed for.

### Pesapal — Deep Dive

**What Pesapal actually is:** A payment service provider headquartered in Nairobi, Kenya, operating across Kenya, Uganda, Tanzania, Rwanda, and Zambia. Originally built for East African M-Pesa + card acceptance, it has expanded to international card processing.

**USD capabilities:**
- Pesapal can **collect** payments in USD via Visa, Mastercard, and American Express from international cards
- It can **settle** merchants in USD (card-only, not mobile money) — meaning the Kenya NPO can receive USD in their account rather than being forced into KES conversion
- It processes "payments from anywhere in the world" per its documentation

**Fees:** Pesapal does not publicly disclose its exact fee structure on its website, which is itself a red flag for a US-donor-facing platform (US donors and finance-savvy board members will notice opacity). Anecdotal merchant reports and travel forums suggest **3.5% to 5% per transaction** for international card payments, with the rate depending on card type and negotiated merchant agreement. This is **significantly higher** than US-market alternatives.

**Critical weaknesses for this specific use case:**
1. **No recurring donation management built-in** — requires custom implementation
2. **No automatic tax receipts** for US donors (IRS-compliant receipts are legally expected)
3. **No built-in donor CRM** — all donor data management is custom work
4. **UI/UX built for East African context** — the checkout flow is unfamiliar to US donors and may trigger trust hesitation
5. **No nonprofit pricing** — Pesapal does not offer fee discounts for NGOs
6. **Brand recognition:** US donors do not recognize Pesapal as a trusted payment brand; the checkout handoff will cause some to abandon

**Payout flow:** Pesapal settles to the merchant's bank account (Kenya-based bank, USD account) typically within a defined settlement period. The NPO would need a Kenya bank USD account (most major Kenyan banks offer this — Equity Bank, KCB, Co-operative Bank) to receive USD settlements without forced conversion.

**Strategic risk long-term:** Pesapal's infrastructure is designed for East African commerce, not US donor fundraising. As donation volume grows, the NPO will face pressure to migrate — and Pesapal provides no data export tools or API compatibility with standard donor CRMs. **Migration from Pesapal is painful** because there is no standard integration pathway to tools like Salesforce NPSP, DonorPerfect, or CiviCRM.

### Stripe — The Complication

Stripe is the gold standard for NPO donation pages globally (2.2% + $0.30 with nonprofit discount, compared to 2.9% standard), integrates with every major donor CRM, and is trusted by US donors. However:

**Stripe is NOT natively available in Kenya.** Stripe operates in 46 fully supported countries as of late 2025 — Kenya is not among them. While Stripe acquired Paystack (which operates in Kenya), Paystack is a separate product with a different API and different nonprofit support.

**The workaround that some organizations use:** Incorporate a US LLC, open a US bank account, and register Stripe under the US entity. This is legally complex, has tax implications in both Kenya and the US, and creates an entity structure that must be maintained perpetually. **This is not recommended for a budget-strapped NPO with no US legal presence.**

### Donorbox — The Most Practical Alternative

Donorbox is a purpose-built nonprofit fundraising platform that functions as an **intelligent layer on top of Stripe or PayPal** — solving most of Pesapal's weaknesses.

**Why Donorbox changes the equation:**
- Platform fee: **2.95%** on Standard plan (1.75% on Pro) + Stripe/PayPal processing fees
- Stripe's US nonprofit discount (2.2% + $0.30) applies when Donorbox uses Stripe as the processor
- Donorbox provides: recurring donation management, automatic tax receipts, donor portal, basic CRM, campaign pages, embedded widgets, Apple Pay/Google Pay support
- **It accepts payments from international card holders** — US donors with Visa/Mastercard can donate regardless of where the Donorbox account is registered
- Donorbox is available globally (unlike Zeffy or PayPal Giving Fund which require US 501(c)(3))

**The challenge:** Donorbox processes through Stripe or PayPal — and if the NPO cannot open a Stripe account directly in Kenya, they would need to use PayPal as the processor under Donorbox (PayPal operates in Kenya). PayPal nonprofit rate is 1.99% + $0.49, available for qualifying charities.

**Combined fee with Donorbox + PayPal:** 2.95% (Donorbox) + 1.99% + $0.49 (PayPal) = ~4.94% + $0.49 per transaction. On a $50 donation, approximately $3.21 in fees, compared to Pesapal's estimated $1.75–2.50. **Donorbox is actually more expensive than Pesapal at lower donation volumes** — but provides dramatically better US donor UX, built-in tax receipts, and upgrade paths.

### Zeffy — The Trap

Zeffy offers 0% fees for nonprofits and is legitimate — but has **critical limitations for this project:**
- Zeffy is **primarily North America focused** — their payout infrastructure, banking relationships, and nonprofit verification is built around US/Canada organizations
- They explicitly note "currently available primarily in North America" in their documentation
- A Kenya-based NGO is unlikely to qualify for Zeffy's zero-fee model, and even if technically onboarded, the KYC/AML compliance requirements for international fund transfers would be a compliance minefield
- **Zeffy's "free" model has a nuance:** They encourage donors to "tip" Zeffy at checkout with a default percentage of 15–17% — some donor segments find this friction off-putting and it has raised transparency concerns with fundraising ethics advocates

### PayPal Giving Fund — Wrong Tool

PayPal Giving Fund offers 0% fees but **requires US 501(c)(3) status and processes donations as PayPal Giving Fund's own grants** — meaning the NPO does not receive the money directly; PayPal Giving Fund disburses it on its own schedule (sometimes with delays). Not appropriate for this project.

### Compliance Requirements: Kenya NPO Collecting USD from US Citizens

This is a domain that the team may be treating as a technical problem when it is fundamentally a legal one.

**US side (for US donors):**
- The NPO does not need to be US-registered to **accept** US donations
- However, **US donors cannot deduct their donation on their US taxes** unless the recipient is a US 501(c)(3) or a qualified foreign organization recognized by IRS
- This is a significant conversion barrier — many experienced US donors will not give without tax deductibility
- Solution: Consider a **fiscal sponsorship arrangement** with a US 501(c)(3) (e.g., Global Giving, Mwananchi Foundation, or a custom fiscal sponsor) — the US entity receives donations tax-deductibly and grants funds to the Kenya NPO

**Kenya side:**
- Kenya NGOs registered with the NGO Coordination Board can legally receive foreign currency donations
- However, foreign exchange controls apply — USD inflows must be declared to Kenya Revenue Authority
- The NGO needs a USD-designated forex account at a licensed Kenyan bank

**FATF compliance:**
- Kenya was removed from the FATF grey list in June 2024 — this is a positive development for international banking relationships and for US institutional donors who had flagged Kenya's FATF grey list status
- However, US donors' banks may still apply enhanced due diligence for Kenya-bound transfers; having a fiscal sponsor eliminates this entirely

### Payment Gateway Recommendation Matrix

| Criteria | Pesapal | Donorbox+PayPal | PayPal Direct | Fiscal Sponsor + Donorbox/Stripe |
|---|---|---|---|---|
| Works for Kenya entity | ✅ | ✅ | ✅ | ✅ |
| US donor tax deductibility | ❌ | ❌ | ❌ | ✅ |
| Recurring donations built-in | ❌ | ✅ | Limited | ✅ |
| Auto tax receipts | ❌ | ✅ | Limited | ✅ |
| US donor UX familiarity | ❌ | ✅ | ✅ | ✅ |
| Fee transparency | ❌ | ✅ | ✅ | ✅ |
| Upgrade path to CRM | ❌ | ✅ | ✅ | ✅ |
| Migration difficulty | High | Low | Medium | Low |
| Total fee on $50 donation | ~$2 | ~$3.21 | ~$1.50 | ~$1.40 |

**Recommendation:** Phase 1 — Pesapal for immediate launch (it's already in the brief, it's functional). But immediately begin pursuing a fiscal sponsorship arrangement or US 501(c)(3) equivalency ruling. Phase 2 — migrate to Donorbox + PayPal or Donorbox + Stripe (if US entity established). The upgrade path must be architected into the codebase from Day 1 (abstracted payment layer in the admin system).

---

## DOMAIN 3: Full Tech Stack Evaluation & Recommendations

### Frontend: React vs Next.js vs Remix

**The brief specifies React + JavaScript.** This is technically correct but strategically incomplete — "React" alone means a client-side-rendered single-page application (SPA), which has severe implications:

**React SPA vs Next.js comparison for this use case:**

| Dimension | React SPA | Next.js |
|---|---|---|
| SEO for donation pages | ❌ Poor (CSR pages not indexed by bots reliably) | ✅ Excellent (SSG/SSR) |
| Core Web Vitals (LCP, CLS, FID) | ❌ Higher JavaScript payload | ✅ Optimized with next/image, automatic code splitting |
| Gallery with large images | ❌ No built-in optimization | ✅ next/image = auto WebP, lazy loading, blur placeholder |
| US donor page load speed | 2.5–4s typical | 0.8–1.5s typical (well-built) |
| API routes | Requires separate backend | ✅ Built-in API routes |
| Deployment | Any static host | ✅ Vercel (zero config) |
| Team learning curve | Lower | 2–3 hours additional ramp |

**Verdict: Next.js is not a "nice to have" — for an NPO with an image-heavy gallery and a US donor audience, it is the correct technical choice.** React SPA + US donor SEO goals is a contradiction; the team should realign on Next.js if not already planned.

**Remix** is excellent but has a steeper learning curve and less NPO-focused tooling ecosystem. Not recommended for this timeline.

### Component Library

**Recommended: Shadcn/ui + Tailwind CSS**

Rationale:
- Shadcn/ui is not a traditional component library (it's a collection of copy-paste, unstyled, accessible components you own)
- No runtime dependency that can break with version updates
- Tailwind reduces CSS file size and eliminates naming conventions debate
- Accessibility is baked into Shadcn components (uses Radix UI primitives)
- Donation forms, admin dashboard tables, calendar — all have excellent Shadcn primitives

Alternatives considered:
- **Chakra UI**: Good but adds 100KB+ to bundle; slower on mobile
- **MUI/Material UI**: Over-engineered for a 6-page NPO site; Google aesthetic doesn't fit humanitarian branding
- **DaisyUI + Tailwind**: Faster to start, less customizable

### TypeScript vs JavaScript

**For this project: JavaScript is fine, but add JSDoc comments.** TypeScript would improve long-term maintainability but costs 10–15% of developer velocity in initial setup and type management. Given a 7-week deadline with a mixed team, the tradeoff is not worth it. However:
- Use JSDoc type annotations to document complex API responses
- Use TypeScript-compatible ESLint rules to catch common type errors without full TS compilation
- Plan for TypeScript migration in Phase 2 when velocity pressure is lower

### Backend Architecture

**The brief does not specify a backend framework.** This is a critical architectural gap. Three options:

**Option A: Next.js API Routes (Recommended)**
- Admin CRUD operations, donation webhook handling, newsletter subscription, chatbot routing — all implementable in Next.js API routes
- Eliminates the need to maintain a separate Node/Express server
- Deploys alongside the frontend on Vercel (zero additional infrastructure)
- Supabase handles auth, database, storage, and real-time features
- **Risk:** Long-running processes (newsletter bulk sends) may hit Vercel's 10-second serverless function timeout — use Supabase Edge Functions or background jobs via Trigger.dev for these

**Option B: Separate Node.js/Express Backend**
- More familiar to backend devs who know Express
- Gives full control over middleware, session management
- Requires separate hosting (Railway, Render, or VPS)
- Additional cost and DevOps overhead
- **Best if** the backend team is uncomfortable with serverless or has complex middleware requirements

**Option C: Supabase as BaaS (Partial)**
- Supabase's auto-generated REST and GraphQL APIs handle 80% of admin CRUD without any custom backend code
- Supabase Auth handles sessions with Row Level Security
- Supabase Edge Functions (Deno-based) handle custom logic
- Eliminates most backend code, but learning Supabase's RLS model takes ~1 week for unfamiliar devs

**Recommendation: Option A (Next.js API Routes) + Supabase for database/auth/storage.** This gives the most capability with the least infrastructure, scales to 10K monthly visitors without any ops changes, and the entire team can understand the full stack.

### Database: Supabase vs PlanetScale vs Neon

**PlanetScale: ELIMINATED.** In April 2024, PlanetScale removed its free Hobby tier entirely. The minimum paid plan is now $39/month (Scaler Pro) with per-row read/write metering on top. This is unjustifiable for an NPO at $1,200 total budget. PlanetScale has also significantly deprioritized its developer community focus and pivoted to enterprise. This option should be removed from consideration immediately.

**Neon (PostgreSQL):**
- Serverless PostgreSQL with scale-to-zero, database branching, 500MB free tier
- Excellent developer experience, fast cold starts
- Best choice if using Prisma ORM with a separate Node.js/Express backend
- Does NOT include auth, storage, or realtime — requires supplemental services for those features
- **Best for:** Teams who want a pure PostgreSQL database and handle auth/storage themselves

**Supabase (PostgreSQL):**
- PostgreSQL database + Auth (JWT/OAuth) + Storage (S3-compatible) + Realtime subscriptions + Edge Functions + Auto-generated APIs + Row Level Security (RLS)
- Free tier: 500MB database, 1GB storage, 50,000 monthly active users for auth, 2 million Edge Function invocations
- **The free tier is suspended (not deleted) after 1 week of inactivity** — important to note; production projects should be on Pro ($25/month) for guaranteed uptime
- Row Level Security is the right tool for admin role-based access on this project
- Supabase dashboard provides a visual database editor — non-developer client can understand it
- **For this project: Supabase is the clear winner** — it eliminates the need for a separate auth service, storage service, and provides the realtime features needed for the transaction dashboard

**Hosting:**

**Vercel** (for Next.js frontend + API routes):
- Zero-config deployment from GitHub
- Global CDN with edge nodes that optimize East Africa → US latency
- Free tier generous enough for pre-launch + early growth
- Pro plan: $20/month when traffic requires (>100GB bandwidth, >1M serverless invocations)
- **Automatic SSL, zero DevOps, CI/CD from Git push** — ideal for a team without a dedicated DevOps member

**Railway** (if a separate Node.js backend is chosen):
- $5/month for always-on services (Vercel has cold starts for serverless)
- PostgreSQL, Redis, and custom services on one platform
- Good DX, simple pricing

**DigitalOcean/Hetzner VPS** (for teams who want control):
- Hetzner VPS: ~€5/month (cheapest reliable option globally)
- Requires Nginx config, SSL setup, PM2 process management, firewall rules
- **Not recommended for this team/timeline** — adds 1–2 weeks of DevOps work that doesn't serve the product

**Recommended hosting for this project:** Vercel (free tier for launch → Pro $20/month for production) + Supabase (free tier for dev → Pro $25/month for production). **Total hosting cost: $0 for development, $45/month for production** — well within budget.

### Media/Gallery: Storage and Delivery

The gallery is a high-stakes performance problem. An NPO with water projects in East Africa typically has 200–500+ photos that need to display at full quality with fast load times for US visitors.

**Cloudinary (Recommended):**
- Free tier: 25GB storage, 25GB monthly bandwidth, unlimited transformations
- Auto-detects format: serves WebP to Chrome users, AVIF to newer browsers, JPEG to older
- On-the-fly resizing: one upload, infinite delivery sizes
- `f_auto,q_auto` transformation parameter = automatic quality + format optimization (largest single change for gallery performance)
- Integration with Next.js via `next/cloudinary` package
- Blue blur placeholder while loading (native support)
- The most battle-tested solution for NPO galleries at this scale

**Supabase Storage:**
- Good for document storage (PDFs, reports) and admin file uploads
- Does NOT provide CDN edge delivery or image transformations
- Not suitable as the primary gallery solution without a CDN layer on top

**Recommendation:** Cloudinary for the gallery and public media. Supabase Storage for admin-uploaded documents, inventory attachments, and internal files.

---

## DOMAIN 4: AI Chatbot — Specification, Options & Implementation

### What the Brief Actually Describes

"AI chatbot routed to team email via Google API" is underspecified and could mean several different things. Before building anything, the team needs to clarify which of these the client actually wants:

**Option A — Live Chat Widget (No AI):** A chat bubble in the corner where a human team member responds in real time. If no one is online, messages queue as emails. This is what Tawk.to, Crisp, and Tidio Free provide. This is NOT an AI chatbot — it's a staffed support channel.

**Option B — Rule-Based Chatbot:** A bot with pre-programmed responses to common questions ("Where do you operate?" → scripted answer). Routes unhandled questions to email. This is what Dialogflow or Tidio's basic bot provides. No large language model involved.

**Option C — AI Chatbot (LLM-powered):** An assistant using GPT-4 or Claude that can answer arbitrary questions about the NPO in natural language. Routes complex issues to human email. This is what OpenAI Assistants API or a RAG (Retrieval-Augmented Generation) system provides.

**For a budget NPO at launch:** Option A or B is appropriate. Option C is impressive but adds $50–200/month in API costs and significant development complexity. It should be a Phase 2 feature.

### Tool-by-Tool Analysis

**Tawk.to (Recommended for Phase 1):**
- Genuinely free forever, no feature limitations on free tier
- Live chat widget with mobile app for team (agents get push notifications when someone types)
- Messages are routed to email when no agents are online
- JavaScript snippet embed — 20 minutes to implement
- Supports canned responses for common NPO questions
- **Con:** No AI; purely human-staffed

**Gmail API + Google Chat:**
The "Google API" reference in the brief likely means using Gmail's API to receive chat messages via email. This is achievable via:
1. Capture message in a form/widget
2. POST to a Next.js API route
3. API route calls Gmail API with OAuth2 to send an email to the team inbox
This is essentially a fancy contact form, not a chatbot. **This is implementable in a day** and is appropriate for Phase 1.

**Tidio (Hybrid — Free + Paid AI):**
- Free plan includes live chat + basic rule-based bot
- AI Lyro (Tidio's AI chatbot): from $29/month, answers from a knowledge base you define
- Good middle ground if the client has budget for modest AI features post-launch

**OpenAI Assistants API + Custom RAG:**
- Build a knowledge base from the NPO's project pages, FAQs, impact reports
- OpenAI Assistant answers questions using this context
- Route unanswered queries to Gmail via webhook
- Cost: ~$0.01–0.05 per conversation at GPT-4o-mini rates = affordable at low volume
- **Development complexity: ~2–3 days** for an experienced developer
- This is the right Phase 2 approach if the client wants a genuine AI assistant

**Recommendation for this project:**
- **Phase 1 (Week 7 launch):** Tawk.to live chat widget + Gmail API email fallback. 1 day to implement.
- **Phase 2 (3 months post-launch):** OpenAI Assistants API with a curated NPO knowledge base, routing to Gmail for complex queries.

---

## DOMAIN 5: Newsletter & Email Marketing System

### Resend — Correct Tool, Wrong Role

Resend is an excellent **transactional email** service (donation receipts, welcome emails, event confirmations, password resets). It is NOT designed for newsletter campaigns — it has no subscriber list management, no unsubscribe compliance automation, no campaign analytics, and no drag-and-drop email builder.

**Resend should stay in the stack** but only for:
- Donation confirmation emails (with tax receipt)
- Newsletter subscription confirmation (double opt-in)
- Admin notifications (new donation, new inventory alert)
- Password reset emails

**For the newsletter engine itself, a dedicated platform is needed.**

### Newsletter Platform Comparison

**Brevo (formerly Sendinblue) — Recommended:**
- Free: 300 emails/day, unlimited contacts, automation workflows, basic segmentation
- Paid: $25/month for 20,000 emails, full automation, A/B testing, CAN-SPAM compliant unsubscribe
- Has a proper newsletter builder with templates
- Built-in subscriber management with list segmentation
- **API integration:** Brevo API allows the Next.js app to add subscribers programmatically (newsletter signup widget → API call → Brevo list)

**Mailchimp:**
- NPO nonprofit pricing is available (15% discount via TechSoup partnership)
- $20/month for up to 500 contacts in paid plans
- More powerful than Brevo for audience segmentation
- Better analytics dashboard
- **The right choice if the NPO expects rapid donor list growth (1,000+ contacts)**

**EmailOctopus:**
- $8/month for 2,500 subscribers — extremely affordable
- Good template builder
- Less feature-rich but covers 80% of NPO newsletter needs

**Kit (ConvertKit):**
- Popular with content creators; less nonprofit-specific
- Visual automation builder is best-in-class
- $29/month for up to 1,000 subscribers — too expensive at this stage

### Recommended Newsletter Architecture

```
User fills signup widget on website
       ↓
Next.js API Route receives email + name
       ↓
Adds subscriber to Brevo list via Brevo API
       ↓
Resend sends double opt-in confirmation email
       ↓
Admin sends monthly newsletter from Brevo dashboard
```

**Newsletter content cadence for US donors of Africa NPO:**
- Frequency: Monthly (don't email more than monthly to a cold audience; weekly is for warm, established donor bases)
- Content formula: 60% impact/story + 20% project update + 20% single CTA (donate or share)
- Subject lines that outperform: "Meet James — the first child in his village to drink safe water" vs "October NPO Newsletter"
- Include photos in every email; text-only emails to cold donors significantly underperform

**CAN-SPAM Compliance (US Law):**
- Every email must include physical address (can be the Kenya office address)
- Clear sender identification
- Working unsubscribe link (processed within 10 business days)
- No deceptive subject lines
- Brevo and Mailchimp handle this automatically; custom Resend newsletters do NOT

---

## DOMAIN 6: Content Management — The Missing Piece

### Why This Gap Could Break the Project

The brief specifies 6 public pages and a full admin system — but there is no mention of how the client will update content post-launch. Consider what happens 3 months post-launch when the client wants to:
- Add 3 new project cards to the Projects Portfolio
- Update the "About" page with a new team member
- Upload 40 photos from a field visit to the Gallery
- Publish a news post about a grant received
- Change an impact statistic on the homepage

Without a CMS, **every one of these requires a developer pull request, code review, and deployment.** For a developer team that's been paid once (fixed-price budget), this becomes unpaid support work or creates client frustration when requests take days.

**The correct ask to the client:** "Do you want to update content yourself, or do you want to pay a developer every time?"

### CMS Options Analysis

**Sanity.io (Recommended):**
- Free tier: 3 users, 10GB assets, 500K API requests/month — more than enough for this NPO
- Excellent integration with Next.js (Sanity's official Next.js toolkit, GROQ query language)
- `next-sanity` package provides a live preview mode for editors (see changes before publishing)
- GROQ is simple enough that a non-technical content manager can learn within a day
- Studio UI is clean, modern, and genuinely usable by non-developers
- Image pipeline: Sanity's CDN serves images with on-the-fly transformations (can replace/supplement Cloudinary for CMS-managed content)
- Schema is defined in code (version-controlled) — excellent for team collaboration

**Contentful:**
- Enterprise-grade with solid free tier (25K records, 2 users)
- More complex UI than Sanity; steeper learning curve for non-technical client
- Higher paid tiers are expensive ($300+/month); overkill for an NPO

**Strapi (Self-hosted):**
- Open-source, but requires a VPS to host the CMS server (additional hosting cost and DevOps)
- More setup work than Sanity for the same capability
- Better for teams with strong backend DevOps skills

**Payload CMS:**
- Excellent Next.js integration (can run inside the Next.js app itself)
- More technical, but a clean option if the team wants everything in one codebase
- Requires PostgreSQL (compatible with Supabase) — no additional infrastructure

**Directus:**
- Self-hosted; polished admin UI; good API; requires separate hosting

**Recommendation: Sanity** for the public website (projects, gallery, about, news). Admin system content (inventory, transactions, donors) lives in Supabase directly. This separation is architecturally clean and right-sizes each tool for its domain.

**CMS-Frontend Architecture:**
```
Sanity Studio (hosted by Sanity, accessed at yoursite.sanity.studio)
       ↓ GROQ queries
Next.js (getStaticProps for static pages, ISR for frequently updated content)
       ↓
Served to users via Vercel CDN
```

Sanity webhook → Vercel deployment hook = automatic site rebuild when content changes. The client updates content → site reflects changes within 60 seconds, zero developer involvement.

---

## DOMAIN 7: Inventory Management System — NPO Context

### What "Inventory" Means for This NPO

For a Water, Sanitation & Community Empowerment NPO in Kenya, inventory management is fundamentally about **humanitarian asset tracking**, not commercial stock management. Likely items to track:

- **Water infrastructure:** Boreholes, hand pumps, solar-powered pumps, water storage tanks, pipes, distribution points
- **Sanitation assets:** Toilet units, sanitation kits, hygiene education materials
- **Agricultural/community assets:** Seeds, tools, irrigation equipment
- **Operational equipment:** Vehicles, generators, laptops, communication devices
- **Consumable supplies:** Chlorine tablets, test kits, pipe fittings, repair parts

### Off-the-Shelf vs Custom

**ERPNext / Odoo Community:** Full ERP systems designed for business inventory. Massive overkill for an NPO with <20 staff. Requires a dedicated server, 2–3 weeks of implementation, and ongoing training. Not recommended.

**KoboToolbox / CommCare:** Mobile data collection tools — useful for field surveys but not persistent inventory management.

**Custom Supabase tables:** The right approach for this project. The team already has Supabase as the database; adding inventory as a set of tables is a few hours of schema design and a standard CRUD admin interface.

### Recommended Schema

```sql
-- Core inventory
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT, -- 'water_infrastructure', 'sanitation', 'equipment', etc.
  status TEXT DEFAULT 'active', -- 'active', 'maintenance', 'damaged', 'retired'
  quantity INTEGER DEFAULT 1,
  unit TEXT, -- 'units', 'kg', 'liters', etc.
  location_name TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  project_id UUID REFERENCES projects(id),
  donor_id UUID REFERENCES donors(id),  -- attribution
  purchase_date DATE,
  purchase_cost DECIMAL(10, 2),
  purchase_currency TEXT DEFAULT 'KES',
  installed_date DATE,
  next_maintenance_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Maintenance/activity log
CREATE TABLE asset_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES assets(id),
  action TEXT, -- 'installed', 'repaired', 'inspected', 'decommissioned'
  performed_by TEXT,
  cost DECIMAL(10, 2),
  date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Connection to Donor Reporting

Every asset should be linkable to the donation(s) that funded it. This enables:
- "Sarah's $250 donation funded the water pump now serving 340 people in Kajiado"
- Automated impact reports per donor (Phase 2)
- Proof of fund utilization for grant reporting

This is the key architectural decision: **donor_id on assets** enables the future "donor impact portal" feature that dramatically increases donor retention.

---

## DOMAIN 8: Security Architecture

### Vincent's Security Plan — What It Must Cover

**Payment Security (PCI DSS):**
If the NPO uses Pesapal's hosted payment page (redirect to Pesapal's domain for checkout), they qualify for **SAQ-A** self-assessment — the simplest level of PCI compliance, requiring only that:
- All payment pages are served over HTTPS
- The NPO never stores, processes, or transmits card data (Pesapal/payment processor handles this)
- Annual review confirms this separation

**If the team builds a custom payment form that collects card numbers directly:** Full PCI DSS SAQ-D applies, which requires quarterly vulnerability scans, penetration testing, and extensive controls. **Do not do this.** Always redirect to the payment gateway's hosted page or use their JavaScript widget.

**Authentication System:**
**Supabase Auth** is the correct choice for this project:
- Built-in email/password, magic link, OAuth (Google, GitHub)
- Row Level Security (RLS) at the database level — permissions enforced at the DB query layer, not just application layer
- JWT tokens with configurable expiry
- Free tier covers 50,000 monthly active users

Do NOT build custom JWT auth from scratch — this is the most common source of critical security vulnerabilities in small projects.

**Role-Based Access Control (RBAC) for Admin Dashboard:**

| Role | Permissions |
|---|---|
| Super Admin | All: users, content, finance, inventory, settings |
| Finance Manager | View + export transactions, donation reports, reconciliation |
| Content Manager | Create/edit public website content via CMS, newsletter drafts |
| Inventory Manager | CRUD on inventory, maintenance logs, asset reports |
| Read-Only Viewer | View all dashboards, no edits (board member access) |

Implement via Supabase RLS policies:
```sql
-- Finance Manager can only see transactions
CREATE POLICY "finance_read_transactions" ON transactions
FOR SELECT TO authenticated
USING (auth.jwt() ->> 'role' = 'finance_manager' OR auth.jwt() ->> 'role' = 'super_admin');
```

**Kenya Data Protection Act 2019 (Kenya DPA):**
- Enacted 2019, enforced by the Office of the Data Protection Commissioner (ODPC)
- The NPO must **register as a data controller** with ODPC (required for any entity that processes personal data of Kenyan citizens)
- Key requirements: consent for data collection, purpose limitation, data minimization, right to erasure, breach notification within 72 hours
- **Practical implication for this project:** Cookie consent banner on the website (even for GA4), explicit consent on newsletter signup, deletion mechanism in the admin system

**DDoS Protection and Rate Limiting:**
- **Cloudflare Free tier** is the correct tool here: global DDoS mitigation, Web Application Firewall (WAF), rate limiting, bot protection
- Configure Cloudflare as the DNS proxy in front of Vercel — zero cost, massive protection
- Critical during fundraising campaigns: A donation page going down during GivingTuesday or an email campaign peak costs real donations
- Rate limit the donation API endpoint: 5 requests per minute per IP to prevent brute-force attacks

**Security Headers (Next.js):**
```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; ..." }
];
```

**Free/Low-Cost Security Tooling Appropriate for Budget:**
- Cloudflare Free — DDoS, CDN, DNS, basic WAF
- Supabase Auth — enterprise-grade auth at free tier
- Helmet.js — security headers for any Express-based backend
- `npm audit` — dependency vulnerability scanning (built into npm)
- GitHub Dependabot — automated dependency updates with vulnerability alerts
- OWASP ZAP (open source) — web application vulnerability scanner

---

## DOMAIN 9: SEO & US Donor Acquisition Strategy

### Why This Is a Next.js vs React SPA Issue

This is the domain where the React SPA vs Next.js decision becomes a business-critical mistake if made incorrectly. Google's crawlers can process JavaScript, but:
- Client-side rendered pages are crawled less frequently than static HTML
- Dynamic content (project updates, news, gallery) in a React SPA will not be indexed as quickly as statically generated pages
- Core Web Vitals (especially LCP — Largest Contentful Paint) are worse on SPAs due to JavaScript waterfall loading

**For a nonprofit trying to rank for "clean water donation Kenya" or "water charity East Africa," Next.js with SSG is not optional — it is the baseline requirement.**

### Keyword Strategy for US Donors

**High-intent search terms (US donors actively seeking causes):**
- "clean water charity Africa" (2,400/month US, low competition)
- "donate clean water Kenya" (880/month, medium competition)
- "water sanitation nonprofit" (1,300/month, medium competition)
- "water charity with low overhead" (450/month, low competition — high trust signal)
- "how to help water crisis Africa" (informational, early-funnel)
- "transparent water nonprofit" (trust-seeking)

**Long-tail terms to target with blog/project content:**
- "water pump installation Kenya [Year]"
- "clean water impact stories East Africa"
- "borehole drilling nonprofit donations"
- "WASH program donations"

### Google Ad Grants — A $10,000/Month Asset

**Kenya-based NPOs can qualify for Google Ad Grants.** Kenya is listed in Google for Nonprofits' eligible countries. Required registration types include:
- NGO registered with the NGO Coordination Board ✅
- Company limited by guarantee ✅
- Nonprofit society registered with Registrar of Societies ✅
- Trust registered with Ministry of Lands ✅
- Community-based organization ✅

**Application process:**
1. Register with Goodstack (Google's validation partner for Kenya) — verify nonprofit status
2. Apply for Google for Nonprofits account (Google Workspace for Nonprofits activated simultaneously)
3. Once approved, activate Google Ad Grants
4. Typical timeline: 2–4 weeks from application to first campaign

**What $10,000/month buys:** At an average CPC of $0.50–$2.00 for nonprofit cause keywords, this buys 5,000–20,000 targeted clicks to the donation page per month — an extraordinary asset for donor acquisition with zero cash outlay.

**Grant requirements to maintain:**
- 5% account click-through rate (CTR) required
- Cannot bid more than $2.00 per keyword maximum
- Must have 2+ active ad groups per campaign
- Landing pages must meet quality standards (fast load, relevant content, clear CTA)

**Critical dependency:** Google Ad Grants requires a high-quality website. This means the site launch and the Google Ad Grants application can happen in parallel — complete the site build, submit the grant application during Week 6, and expect approval 2–3 weeks post-launch.

### Technical SEO Requirements

```html
<!-- Every page must have -->
<title>Clean Water for East Africa | NPO Name</title>
<meta name="description" content="Providing safe water access..." />
<meta property="og:title" content="..." />
<meta property="og:image" content="..." /> <!-- 1200×630px -->
<link rel="canonical" href="https://yoursite.org/page" />

<!-- Homepage specifically -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  "name": "NPO Name",
  "url": "https://yoursite.org",
  "logo": "https://yoursite.org/logo.png",
  "sameAs": ["https://facebook.com/nponame", "https://twitter.com/nponame"]
}
</script>
```

**Core Web Vitals targets for US audience:**
- LCP (Largest Contentful Paint): <2.5 seconds
- CLS (Cumulative Layout Shift): <0.1
- INP (Interaction to Next Paint): <200ms

Next.js + Vercel CDN + Cloudinary images achieves these targets with standard optimization.

### US Donor Social Media Strategy

**Facebook + Instagram (Primary):** 40+ demographic US donors (the highest-value donors) are most active on Facebook. Instagram for visual storytelling with younger donors. Meta's nonprofit donation tools (fundraiser tools, donate buttons) work with US 501(c)(3) — another reason fiscal sponsorship matters.

**YouTube (Secondary):** 90-second field videos, impact stories. YouTube videos rank in Google Search — a $0 SEO strategy.

**Twitter/X (Low priority):** Declining relevance for nonprofit fundraising; maintain presence but don't invest heavily.

**TikTok (For younger demographic):** 18–30 year old US donors respond to emotional short-form video from the field. If the team has video production capacity, TikTok can be powerful for cause awareness if not direct donation conversion.

---

## DOMAIN 10: Accessibility & Compliance

### WCAG 2.1 AA — What It Requires

WCAG 2.1 AA (Web Content Accessibility Guidelines) is the baseline accessibility standard for US-adjacent web content. While not legally mandatory for a Kenya-based NPO, it directly affects:
- **US institutional donors** who cannot fund organizations with inaccessible digital properties (some foundations require it)
- **Screen reader users** (approximately 7.6 million Americans have visual impairments)
- **Keyboard-only users** (motor disabilities)
- **Google's Core Web Vitals** — accessibility overlaps with performance in Google's ranking signals

**Highest-risk areas for this project:**

| Component | Common Failure | Fix |
|---|---|---|
| Gallery | Images without alt text | Add descriptive alt text: "A woman carrying clean water in a yellow jerrycan, Kajiado County, Kenya" |
| Donation form | Inputs without visible labels | Use `<label for="...">` not just placeholder text |
| Donation amounts | Color-only selection (no text) | Add border/check icon for selected amount, not just background color change |
| Chatbot widget | Not keyboard navigable | Tab index, keyboard close button, ARIA labels |
| Donation CTA buttons | Low contrast | Minimum 4.5:1 contrast ratio (test at webaim.org/resources/contrastchecker) |
| Video content | No captions | Auto-caption in YouTube; manual caption for high-stakes videos |
| Mobile navigation | Touch targets too small | Minimum 44×44px touch targets |

**Free Testing Tools:**
- axe DevTools (Chrome extension) — catches 57% of WCAG failures automatically
- Lighthouse in Chrome DevTools — accessibility score included
- WAVE (wave.webaim.org) — visual overlay showing errors on live site
- Screen reader testing: NVDA (free, Windows), VoiceOver (built-in on Mac/iOS)

**CAN-SPAM Compliance Checklist:**
- [ ] Physical mailing address in every newsletter (can be Kenya address)
- [ ] "Unsubscribe" link in every email, processed within 10 business days
- [ ] Honest "From" and "Subject" fields (no misleading content)
- [ ] Clear identification as a solicitation (NPO newsletters sending donation asks)

**Donation Page Disclosures for US Donors:**
- Privacy policy link (how donor data is used, stored, shared)
- Refund policy (standard: 30-day refund window builds trust)
- Tax deductibility statement: "NPO Name is a registered NGO in Kenya. Donations are not tax-deductible in the United States unless processed through our US fiscal sponsor [Name]." (If no US 501(c)(3): "We are working toward US tax deductibility")
- Registration/charity number visible

---

## DOMAIN 11: Analytics & Impact Tracking

### Analytics Platform Recommendation

**GA4 (Google Analytics 4):**
- Free
- Standard for NPOs
- Funnel analysis for donation flow
- User retention and returning donor identification
- **Privacy concern:** Requires cookie consent banner under Kenya DPA and GDPR (even if not EU-focused, best practice)

**Plausible Analytics:**
- $9/month for up to 10,000 monthly pageviews
- No cookies, no consent banner needed
- GDPR-compliant by design
- Simpler dashboard (easier for non-technical client to understand)
- **Recommended if privacy compliance is a priority**

**Recommendation:** Start with GA4 (free, powerful), add cookie consent via Cookiebot (free tier available). Switch to Plausible at $9/month if cookie consent management becomes burdensome.

### Must-Track Events for This NPO

**Donation funnel (most critical):**
1. `donate_page_view` — user arrives on donation page
2. `donate_amount_selected` — user selects a specific amount
3. `donate_form_started` — user begins entering details
4. `donate_payment_initiated` — user clicks "donate" button
5. `donate_completed` — payment confirmation page loaded
6. `donate_abandoned` — user left donation page without completing (requires session timeout detection)

Calculate: Steps 1→5 = overall conversion rate. Steps 3→5 = form completion rate. Step 4→5 = payment success rate.

**Engagement events:**
- `newsletter_subscribed` — tracking which page sourced the signup
- `chatbot_initiated` — did chatbot engagement lead to higher donation rates?
- `gallery_image_viewed` — which photos drove most engagement?
- `project_page_viewed` + `project_id` — which projects drive donation intent?
- `video_played` + `percent_watched` — video engagement metrics

**Impact data visualization on public site:**
```
LIVE COUNTER COMPONENTS (powered by Supabase real-time or a simple API call):
┌─────────────────────────────────────────────────────┐
│  [4,247]         [18]           [340,000+]           │
│  Families Served  Active Wells   Liters/Day Delivered│
└─────────────────────────────────────────────────────┘
```
These counters can pull from a simple Supabase table updated by the admin system — the connection between the inventory system (domain 7) and the public trust signals (domain 1) happening through a shared data layer.

---

## DOMAIN 12: Future Upgrade Roadmap

### Phase 2 (Months 3–6 Post-Launch)

**Highest ROI additions:**
1. **Donor portal:** Login for recurring donors to manage their giving, view impact reports linked to their donations, update payment methods. Supabase Auth + Stripe Customer Portal (if Stripe onboarded) = 2-week build.
2. **Automated tax receipt emails:** Post-donation confirmation with PDF tax receipt (generated via Resend + PDF generation library). Required for serious US donor relationships.
3. **Google Ad Grants campaigns:** Low effort, $10K/month advertising value. Start application at launch.
4. **Annual impact report page:** Dynamic PDF generation from Supabase data — auto-generates year-in-review for board presentations and grant applications.
5. **Fiscal sponsorship setup:** Work with Global Giving, Africa Foundation (US 501(c)(3) fiscal sponsor), or establish US entity to enable tax deductibility.

### Phase 3 (Months 6–18)

**CRM Integration:**
- **CiviCRM (Open Source):** Can be installed on a VPS and integrated with the existing stack. Full donor relationship management: campaigns, events, grants, memberships. Learning curve is steep but the tool is genuinely powerful and free.
- **Salesforce NPSP (Nonprofit Success Pack):** Free for up to 10 users, industry-standard for large NPOs. Overkill until donation volume exceeds ~$50K/year consistently.
- **HubSpot CRM (Free tier):** 1,000,000 contacts free; good for email marketing + donor tracking at moderate scale

**Event Ticketing:** For gala dinners, fundraiser events. Zeffy (North America) or Ticket Tailor ($0.65/ticket) — integrate event data back to donor profiles.

**Volunteer Management:** Custom Supabase tables or VolunteerHub integration.

**Grant Tracking:** A simple custom module (grant_applications table: funder, amount requested, amount awarded, due dates, reporting requirements) adds enormous value for the NPO's fundraising team.

### Codebase Decisions That Enable Easy Phase 2 Upgrades

The single most important architectural decision for upgrade path: **abstract the payment layer**.

```javascript
// payment-service.js — abstraction layer
export const processPayment = async (donationData) => {
  switch (config.paymentProvider) {
    case 'pesapal': return pesapalService.processPayment(donationData);
    case 'stripe': return stripeService.processPayment(donationData);
    case 'donorbox': return donorboxService.redirect(donationData);
    default: throw new Error('Unknown payment provider');
  }
};
```

This single pattern makes migrating from Pesapal to Stripe a configuration change, not a refactor.

---

## DOMAIN 13: Competitive Benchmarking

### Five Reference NPOs and Their Applicable Lessons

**1. charity: water (charitywater.org)**
*The gold standard for US donor trust-building with international water projects.*

What they do right:
- **100% model messaging:** "100% of public donations fund clean water projects." Their overhead is funded separately by "The Well" donors. This reduces the biggest US donor objection (overhead %) to zero.
- **GPS project tracking:** Every completed project has GPS coordinates on a public map. Donors can literally see their impact point on Google Maps.
- **Progress bars:** Campaign goals with real-time counters. "34 of 35 wells funded this month."
- **Annual impact reports:** Stunning visual reports, accessible online and downloadable as PDF.
- **Storytelling:** Individual names and photos of beneficiaries, not statistics-first.

**Lesson for this team:** Even without the 100% model, implement the GPS project map — it's a technical feature (Mapbox or Google Maps embed) that delivers outsized trust.

**2. Water.org (water.org)**
*Co-founded by Matt Damon. Uses a micro-lending model.*

What they do right:
- **Celebrity anchor:** Not reproducible, but illustrates that a credible founder story in the "about" section dramatically increases US trust
- **Loan-not-grant framing:** Innovative messaging ("your donation becomes a loan that gets repaid and donated again") differentiates them
- **B-roll quality:** Professional video production in every campaign

**Lesson:** The "About" page should feature the founder(s) with professional photos, credentials, and a personal story of why they started the NPO. US donors fund people as much as causes.

**3. Lifewater (lifewater.org)**
*Medium-sized NPO, excellent individual story presentation.*

What they do right:
- **Beneficiary profiles:** Each project page has named individuals with multi-paragraph stories, photos, and a "6 months later" follow-up update
- **Donation impact calculator:** "Calculate how many people you'll serve" slider
- **Newsletter integration:** Every project page has a newsletter signup that pre-fills the signup source

**Lesson:** Project pages should follow a template: Before/After, Named Beneficiary, GPS Location, Donor Impact Statement, and a "Support This Project" CTA.

**4. Blood:Water (bloodwater.org)**
*Excellent recurring giving UX.*

What they do right:
- **Recurring giving framing:** "Join the community" language for monthly donors (not "set up a recurring payment")
- **Donor community page:** Public recognition of recurring donors by first name and city
- **Impact milestones:** "You've now funded [X] people with clean water" — personalized milestone emails

**Lesson:** Monthly donors should receive a "community membership" experience, not just payment acknowledgments.

**5. World Vision Water (worldvision.org)**
*Large organization with comprehensive trust infrastructure.*

What they do right:
- **Third-party ratings prominent:** Charity Navigator 4-star, BBB Accredited, GuideStar Gold badges in the header (not buried in the footer)
- **Tax deductibility clear:** "Your gift is tax-deductible" displayed on the donation form itself
- **Payment method diversity:** Credit card, PayPal, Apple Pay, Google Pay, check — reducing any payment friction

**Lesson:** Third-party trust badges (Charity Navigator, etc.) belong above the fold on the donation page, not in the footer. Register the NPO with these platforms as a priority action.

---

## SECTION 14: CRITICAL DECISION MAP

*These are the 5–7 decisions with the highest downstream consequence. Getting them wrong in Week 1 means expensive rework in Week 5.*

### Decision 1: React SPA vs Next.js
**Consequence if wrong:** Building a React SPA and then realizing the gallery performance, SEO, and Core Web Vitals are insufficient for the US donor audience. Migrating from React SPA to Next.js mid-project costs 1–2 weeks of refactoring.

**Make this decision in:** Day 1, Week 1.
**Correct answer:** Next.js with App Router (Next.js 14+). Non-negotiable if US donor SEO is a goal.

### Decision 2: Payment Gateway Architecture
**Consequence if wrong:** Building deep integration with Pesapal's API, then needing to migrate to a US-donor-friendly solution 6 months post-launch. Without an abstraction layer, this requires full backend + frontend refactoring of the donation flow.

**Make this decision in:** Week 1.
**Correct answer:** Build a payment service abstraction layer from Day 1. Use Pesapal for launch. Design the architecture to swap payment providers in a single config change.

### Decision 3: PlanetScale Removal from Consideration
**Consequence if wrong:** The team spends time evaluating or prototyping with PlanetScale, then discovers the $39/month minimum tier in Week 3. This wastes architecture decision time.

**Make this decision in:** Day 1.
**Correct answer:** Remove PlanetScale from the shortlist. It removed its free tier in April 2024. Supabase is the clear winner for this project — free tier, PostgreSQL, auth, storage, realtime, RLS all included.

### Decision 4: CMS Architecture
**Consequence if wrong:** Delivering a site with no CMS and receiving weekly "can you update this text?" requests post-launch. The client becomes dependent on the developer team indefinitely, creating a bad long-term relationship.

**Make this decision in:** Week 1 (present to client for sign-off).
**Correct answer:** Integrate Sanity.io from the start. Sanity schemas should be designed during Week 1 alongside the Next.js component structure. Define which content is CMS-managed (projects, team, news, gallery) vs code-managed (layout, features, donations logic).

### Decision 5: Fiscal Sponsorship / US Tax Status
**Consequence if wrong:** Launch a platform optimized for US donors but without tax deductibility. Conversion rates will be suppressed and major donors ($500+ gifts) will decline to give. Retrofitting fiscal sponsorship post-launch is not a technical change — it requires legal arrangements that take 2–6 months.

**Make this decision in:** Week 1 (client advisory, not technical team decision).
**Correct answer:** Start the fiscal sponsorship application process immediately. Recommended route: Africa Foundation USA, GlobalGiving, or a direct US 501(c)(3) fiscal sponsor. This runs in parallel with development and can be live by Month 3.

### Decision 6: Admin System Technology Split
**Consequence if wrong:** Building the admin system as a separate application (e.g., React + Express + different DB) from the public website creates a maintenance split that doubles DevOps overhead and doubles security attack surface.

**Make this decision in:** Week 1.
**Correct answer:** Admin system = same Next.js app, behind `/admin` route with Supabase Auth middleware. Shared database. The Next.js middleware protects admin routes based on Supabase Auth session and role claim.

### Decision 7: Resend vs Full Email Platform for Newsletter
**Consequence if wrong:** Building a "newsletter engine" using Resend for subscriber management, then realizing Resend has no subscriber list management, no campaign analytics, no unsubscribe compliance, and no email template builder. Migrating after building custom newsletter infrastructure costs 1+ week.

**Make this decision in:** Week 1.
**Correct answer:** Resend for transactional email (receipts, notifications). Brevo free tier for newsletter subscriber management and campaign sending. These are different tools for different jobs.

---

## SECTION 15: RECOMMENDED FULL STACK

### The Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     RECOMMENDED STACK                        │
├─────────────────────────────────────────────────────────────┤
│ Framework        │ Next.js 14 (App Router)                   │
│ Language         │ JavaScript (JSDoc annotated)              │
│ Styling          │ Tailwind CSS + Shadcn/ui                  │
│ Database         │ Supabase (PostgreSQL)                     │
│ Auth             │ Supabase Auth (RLS for RBAC)             │
│ Storage          │ Supabase Storage (docs) + Cloudinary (media) │
│ CMS              │ Sanity.io (free tier)                     │
│ Payment          │ Pesapal v3 API (Phase 1 launch)           │
│ Email (transact) │ Resend                                    │
│ Email (newsletter│ Brevo (Sendinblue)                        │
│ Chat/Support     │ Tawk.to + Gmail API                       │
│ Analytics        │ GA4 + cookie consent                      │
│ Media CDN        │ Cloudinary (free 25GB)                    │
│ Hosting          │ Vercel (frontend + API)                   │
│ DDoS/CDN         │ Cloudflare (free tier)                    │
│ Security Headers │ Next.js config + Helmet                   │
│ CI/CD            │ Vercel Git integration (automatic)        │
└─────────────────────────────────────────────────────────────┘
```

### Cost Breakdown

| Service | Dev/Launch Phase | Production Phase |
|---|---|---|
| Vercel | Free | $20/month (Pro for bandwidth) |
| Supabase | Free | $25/month (Pro for uptime SLA) |
| Cloudinary | Free (25GB) | Free or $89/month at scale |
| Sanity | Free | Free (most NPOs never leave free tier) |
| Brevo Newsletter | Free (300/day) | $25/month (20K sends) |
| Resend Transactional | Free (100/day) | $20/month (50K emails) |
| Tawk.to Chat | Free | Free |
| GA4 | Free | Free |
| Cloudflare | Free | Free |
| Pesapal | Per-transaction | Per-transaction (~3.5–5%) |
| **Domain** | ~$15/year (.org) | $15/year |
| **Total Cash** | **~$15 one-time** | **~$45–90/month** |

**Total estimated monthly operational cost (production):** KSh 6,000–12,000/month (~$45–90 USD) — well within any NPO operating budget. The $1,200 development budget is for one-time build costs.

---

## SECTION 16: RISK REGISTER

### TOP 10 PROJECT RISKS

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | **US donor tax deductibility absent at launch** | High | High | Start fiscal sponsorship application Week 1; add "working toward US tax deductibility" disclosure on donation page; this suppresses but doesn't eliminate conversion |
| 2 | **Pesapal checkout unfamiliar to US donors → abandonment** | Medium-High | High | A/B test: Pesapal hosted page vs embedded widget. Add trust copy around checkout ("Secure payment via Pesapal, a licensed East Africa payment processor"). Monitor abandonment rate closely. |
| 3 | **No CMS means post-launch developer dependency** | High | Medium | Sanity integration is non-negotiable; client must sign off on this in Week 1 or this risk becomes a certainty |
| 4 | **7-week timeline with no buffer** | High | High | Define MVP features vs nice-to-have. MVP: public 6 pages + payments + newsletter signup + basic admin (transactions, inventory CRUD). Phase 2: chatbot AI, full newsletter engine, calendar. |
| 5 | **Gallery performance killing conversion on US mobile** | Medium | High | Cloudinary with `f_auto,q_auto` + next/image blur placeholder + lazy loading. Test from a US network with Chrome DevTools throttling. Target LCP <2.5s on mobile. |
| 6 | **Supabase free tier project suspension** | Low-Medium | Medium | Free tier projects pause after 7 days of inactivity. Move to Pro ($25/month) before launch or set a keep-alive cron job. Critical: don't launch on a free-tier project. |
| 7 | **Security breach exposing US donor PII** | Low | Very High | Supabase RLS at every table, Cloudflare WAF, never log full card numbers (none passed through — Pesapal hosted page), enable 2FA for all admin accounts, rotate Supabase keys post-launch |
| 8 | **Google Ad Grants rejected due to site quality** | Medium | Medium | Pre-submit site quality checklist: no broken links, unique content on each page, clear mission statement, no parking pages. Apply only after site is fully content-populated. |
| 9 | **Client scope creep expanding admin system** | High | High | Lock the admin system spec into a formal document with sign-off. "100K component" in the brief suggests fixed-price module — define the 6 modules precisely and require change requests for additions |
| 10 | **FATF/banking compliance blocking USD transfers** | Low | Very High | Kenya was removed from FATF grey list June 2024. Residual risk exists with individual US banks applying enhanced due diligence. Fiscal sponsorship eliminates this risk entirely by routing funds through a US entity. |

---

## SECTION 17: WEEK 1 RESEARCH CHECKLIST

*These are the specific spikes and validations the team should complete before writing a single line of production code.*

### Legal & Financial
- [ ] **Confirm the NPO's registration type** (NGO Board? Registrar of Companies? Registrar of Societies?) — this determines Google Ad Grants eligibility
- [ ] **Confirm whether the NPO has a USD forex bank account** — if not, open one at Equity Bank or KCB before launch (takes 5–10 business days)
- [ ] **Begin Goodstack verification** for Google for Nonprofits application — this runs alongside development
- [ ] **Consult a Kenyan nonprofit lawyer** (or the NGO Coordination Board) on the Kenya DPA 2019 data controller registration requirement
- [ ] **Research one US fiscal sponsorship option:** Contact GlobalGiving or Africa Foundation USA to understand application process and timeline

### Technical Spikes
- [ ] **Verify Pesapal v3 API integration** with a test transaction — specifically test an international Visa card (borrow a US-issued card) to confirm USD flow works end-to-end. Many Pesapal integration issues only appear with non-Kenyan cards.
- [ ] **Stand up a Supabase project** and verify: free tier active, Auth working, RLS policy on one table, Storage bucket created. Take 2 hours max.
- [ ] **Create a Sanity.io project** and define the Project schema. Verify the Next.js + Sanity data fetch works in development mode.
- [ ] **Verify Next.js + Cloudinary integration:** Upload one field photo, serve it via `next/cloudinary`, test `f_auto,q_auto` transformations, measure page load on a simulated US mobile connection.
- [ ] **Prototype the Pesapal payment abstraction layer** (interfaces/types only, no implementation) — this is the schema that makes payment provider migration possible later.
- [ ] **Test Brevo API:** Add a subscriber programmatically from a Next.js API route. Confirm double opt-in email triggers correctly.

### Design & Content
- [ ] **Get 20–30 real field photos** from the client immediately — "we'll use stock photos for now" is not acceptable for this type of NPO (kills trust)
- [ ] **Get confirmed beneficiary stories** (with consent) from the client — minimum 3 named individuals with their villages, before/after
- [ ] **Confirm the NPO's actual cost-per-impact metrics** (e.g., "$X per family for Y months of water access") — these go on the donation page and must be accurate, not estimated
- [ ] **Confirm domain name and verify .org availability** — get the domain in Week 1 even if Cloudflare proxy will be configured later

---

## SECTION 18: PREMIUM TALKING POINTS

*10 insights the team likely hasn't considered that signal expert-level thinking.*

**1. "Kenya's removal from the FATF grey list in June 2024 is actually your timing advantage."**
For the past several years, Kenya on the FATF grey list caused US institutional donors (foundations, grantors, corporate donors) to apply enhanced due diligence that could delay or block giving. Kenya's removal from this list in June 2024 opens doors to US institutional funding that were practically closed. Time your launch + US fundraising outreach to capitalize on this improved risk posture.

**2. "PlanetScale should not be in anyone's consideration — it removed its free tier in April 2024 and now starts at $39/month minimum."**
Any team member who researched the database stack before mid-2024 has outdated information. This is worth stating explicitly so no time is wasted on PlanetScale evaluation.

**3. "The chatbot in the brief is probably better implemented as a staffed live chat, not an AI."**
NPO donors who reach out via chat are often close to converting. A human response (even if async via email) builds relationship in a way that AI responses cannot. The AI upgrade is Phase 2 — but presenting it as such to the client requires framing it as "we're starting smart, not starting cheap."

**4. "Zeffy's 0% model is not available for Kenya-based NGOs."**
A team member or client may have discovered Zeffy and suggested it as the "free" solution. Zeffy is currently a North America-only platform. The 0% model also has a nuance: donors are prompted to tip Zeffy at a default 15–17% of their donation amount, which creates transparency concerns with US donor advocacy groups.

**5. "Stripe's nonprofit discount doesn't help if you can't open a Stripe account in Kenya."**
Stripe is not natively available in Kenya. Any plan to use Stripe directly requires a US LLC, US bank account, and EIN — a 2–6 month process with ongoing legal maintenance costs. This rules it out for this project's timeline unless the NPO already has US legal presence.

**6. "The donation page default should be 'Monthly giving' not 'One-time.'"**
This is the single highest-impact change on any donation page — backed by extensive A/B testing across hundreds of US nonprofits. Changing the default from one-time to monthly increases monthly donor acquisition by 30–50% with no other page changes. The team should implement this on Day 1 of the donation page build.

**7. "The gallery is not just a visual feature — it's a trust mechanism."**
US donors giving to Africa-based organizations cannot visit in person. High-quality, geo-tagged, named photos of real beneficiaries serve as the substitute for in-person verification. Every gallery image should have descriptive alt text (beneficiary name, location, context) — this simultaneously serves accessibility and SEO.

**8. "The Supabase free tier will pause after 7 days of inactivity — do not launch on it."**
Supabase's free tier has an inactivity policy: projects pause after 7 consecutive days of no activity. If the site goes live on a free-tier Supabase project and then experiences a quiet week, the database pauses and the site goes down. Move to Supabase Pro ($25/month) before launch, or ensure an automated ping/cron job prevents inactivity. This is a production pitfall that catches teams regularly.

**9. "Google Ad Grants is a $10,000/month asset that this NPO can qualify for — and the application should start during Week 1 of development."**
Most development teams treat Google Ad Grants as a marketing concern, not a technical one. But the technical team must ensure the website meets Google's quality standards (no broken pages, rich content, clear CTA on every page) before the application is submitted. If the application is submitted the week the site launches, approval arrives 2–4 weeks post-launch — just as first donors are arriving. Missing this window means leaving $10,000/month in free advertising unused for months.

**10. "The biggest threat to this project is not technical — it's the absence of US tax deductibility."**
A well-built site with Pesapal integration, excellent storytelling, and strong SEO can still underperform if experienced US donors discover they cannot claim a tax deduction. For donors giving $250+, tax deductibility is often the deciding factor. The technical team should architect the donation system to support two payment pathways from launch: direct (Pesapal, no tax deductibility) and via fiscal sponsor (US entity, tax-deductible). The second pathway doesn't need to be live at launch — but the UX "hook" (a checkbox: "Make my donation tax-deductible via [US Fiscal Sponsor]") should be in the wireframes from Week 1.

---

## Appendix: Quick Reference Cards

### Dependency Graph
```
Next.js App (Vercel)
├── Public Pages (Sanity CMS content)
│   ├── Home → Impact counters (Supabase query)
│   ├── Projects → Sanity project records + GPS map
│   ├── Gallery → Cloudinary media, Sanity metadata  
│   ├── Donate → Pesapal v3 API + Supabase donor record
│   ├── About → Sanity team/org content
│   └── Contact → Tawk.to widget + Gmail API fallback
│
└── Admin System (/admin route, Supabase Auth protected)
    ├── Inventory → Supabase CRUD
    ├── Transactions → Pesapal webhook → Supabase
    ├── Calendar/Events → Supabase
    ├── Newsletter → Brevo API + Resend (transactional)
    ├── Chatbot Routing → Tawk.to + Gmail API
    └── Dashboard → Supabase aggregate queries
```

### Architecture Principles (For Code Reviews)
1. **Payment is abstracted** — never call Pesapal directly from components; always via `services/payment.js`
2. **Auth is Supabase Auth** — no custom JWT, no separate session store
3. **RLS is the last line of defense** — every table has a policy; never rely on API routes alone for access control
4. **No card data ever touches our servers** — all payments go through Pesapal hosted page
5. **All environment secrets are in `.env.local`** — never committed; Vercel environment variables in production

---

*Report compiled: June 2026 | For internal team use only | Update quarterly as stack evolves*
