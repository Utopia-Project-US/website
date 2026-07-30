# The Utopia Project US — Website

`utopiaproject.us` — the public-facing site for a nonprofit civic initiative designing **Constitution v2.0**, a modern constitutional framework built around truth, accountability, and human dignity.

---

## 1. Website Goals

The site exists to present, explain, and evolve Constitution v2.0, and to represent The Utopia Project US as an organization. Current, real goals:

- Present Constitution v2.0 — its Articles, its companion Explainers, and the reasoning behind it — in a form people can actually read and understand.
- Represent the organization honestly: its mission, its founding leadership, its current stage of formation.
- Curate supporting material (Cultural Influences) that reflects the project's values.
- Build toward structured public deliberation on the Constitution itself, once the foundation for that exists.

This list is intentionally shorter than the project's original 2025 concept document. See **§4 (Why We Simplified)** for what changed and why.

---

## 2. Current Structure (as of v0.5)

```
website/
├── index.html                    # Homepage
├── mission.html                  # Full mission statement
├── careers.html                  # Careers & Leadership (Eleven Pillars structure)
├── cultural-influences.html      # Curated media library
├── 404.html                      # Custom not-found page (auto-served by Vercel)
├── data/
│   └── cultural-influences.json  # Clip data — no database, just a file
├── images/                       # All visual assets, pre-compressed for web
├── audio/                        # Background music tracks
└── README.md                     # This file
```

Every page shares the same hand-maintained header, footer, navigation, and design system — copy-pasted across files rather than templated. This is a known, deliberate limitation; see the **v1.0 roadmap** for the fix.

---

## 3. Current Tech Stack

| Layer | Choice |
|---|---|
| Framework | None — static HTML, CSS, vanilla JavaScript |
| Hosting | Vercel |
| Source control | GitHub (`Utopia-Project-US` org) |
| Database | None — Cultural Influences reads a static JSON file |
| Styling | Plain CSS custom properties (no Tailwind, no component library) |
| Fonts | Fraunces (display), Public Sans (body), IBM Plex Mono (utility/labels) |
| Interactivity | Small, scoped vanilla JS: mobile nav, background music toggle, Cultural Influences filter/sort, 404 site search |

No build step. No package manager. No server. Editing a page means editing an HTML file and pushing.

---

## 4. Why We Simplified

The project's original technical concept (2025) specified a considerably heavier stack: **Next.js, Cloudflare Pages and Workers, Supabase (Postgres, Auth, Realtime, Row-Level Security), Stripe, Tailwind CSS, Shadcn/Radix UI, and analytics via Plausible or PostHog** — architected around a long-term vision of user accounts, live comment threads with voting, credit-card identity verification, a $1/month subscription model, and scale up to "340 million users."

None of that was wrong as a *long-term* picture. It was premature as a *starting point*. Here's what changed, piece by piece:

**Framework — Next.js → static HTML.**
Every real page on the current site is fixed content until a visitor wants to filter or sort something (Cultural Influences), which a small vanilla JS "island" handles without a framework at all. Next.js earns its cost when a site needs server rendering, complex client state, or dynamic routing — none of which any current page actually requires. Paying that cost anyway was overhead with nothing behind it.

**Database — Supabase → a static JSON file (for now).**
Cultural Influences was originally built against a live Supabase table. When that database needed reconnecting to the new infrastructure, the honest question got asked: does this content actually need a live database? It doesn't — it's curated by the founder, not submitted or moderated by end users. A database earns its keep when data is genuinely dynamic; "changes occasionally when I edit a file" isn't that. The same logic applies to the rest of the site: nothing here currently needs a backend.

**Identity verification & monetization — Stripe + $1/month → deferred, and reconsidered.**
This isn't just a simplification, it's a correction: the original plan used a $1 charge as an identity-verification step. On inspection, a $1 charge verifies that a card is *live*, not who's holding it — the same low-friction mechanic carding fraud rings use to test stolen cards. A public sign-up flow built around it would have been a plausible fraud target, independent of whether the site needed monetization yet at all. Real identity verification, if it's ever needed, requires purpose-built tooling (Stripe Identity, Persona, ID.me) — a different and more expensive category of tool than what was originally scoped.

**Comments & voting ("Town Hall," now the Digital Constitutional Convention) — merged into the app → its own separate system.**
The original architecture built live discussion and voting directly into the same Next.js application as the informational site. The current plan treats these as two different kinds of software entirely: a content site (read top-to-bottom, mostly static, low operational risk) and a deliberation platform (accounts, sessions, moderation, real-time state, real legal and safety exposure). Merging them means the whole site inherits the complexity — and the risk profile — of its hardest component. The DCC will be its own infrastructure (most likely Discourse or similar), linked and embedded into Article pages rather than built into them.

**Scale target — "340 million users" → the organization's actual current stage.**
The original plan was architected for full national civic participation from day one. The organization's actual current stage: pre-launch, pre-501(c)(3) determination, one founder, zero live user accounts. Designing infrastructure for the scale you hope to reach, rather than the scale you're actually at, was the single biggest gap between the 2025 plan and what's real today.

**What we kept, or would keep:**
Not everything in the original plan was over-scoped. **Plausible/PostHog-style privacy-friendly analytics** remains a genuinely reasonable, low-cost, low-complexity choice whenever analytics are actually added — it just hasn't been needed yet. And **Cloudflare** remains in active use today, just in a narrower role: as the DNS and domain registrar, not as the hosting/compute layer.

**The general rule this produced:** match infrastructure to a real, current requirement — not to an anticipated one, and not to whichever tool sounds most sophisticated. Every major technical decision since has been measured against this rule, including ones that added complexity when it was actually earned (see v0.5 below).

---

## 5. Version History

### v0.1 — Initial static landing page
**What changed:** Replaced the prior Next.js/Supabase/Cloudflare codebase with a from-scratch static HTML homepage and mission page. Established the site's first visual identity (dark background, amber/gold accents).
**Why:** The prior project needed a full restart — the organization relocated its legal home from NC to PA, and the existing codebase was unfinished and entangled with infrastructure (a Supabase project, an old Vercel deployment) that no longer matched the org's actual setup. A clean restart was judged easier than untangling the old one.
**Result:** Site live on Vercel, under a properly organized GitHub organization (`Utopia-Project-US`), with four private repos (`bylaws`, `constitution2`, `phone`, `website`) replacing a scattered personal-account setup.

### v0.2 — Structural correctness, Careers, Cultural Influences
**What changed:** Fixed a CSS specificity bug that had been silently breaking hero-text centering on two pages. Rebuilt the Careers page from an old, mismatched draft (a 24-role corporate C-suite listing) into an accurate reflection of the org's real governance structure — President, VP, Secretary, Treasurer, and seven Directors, mapped directly from the Eleven Pillars leadership chart. Added the Cultural Influences page, deliberately built against a static JSON data file instead of reviving the old Supabase connection. Standardized header, footer, and navigation across all pages (sticky footer, consistent nav grouping, mobile hamburger menu). Added a background music feature with session-based random track selection.
**Why:** Early pages had drifted out of sync as each was built somewhat independently. The original Careers content, inherited from the old site, described positions and titles that didn't match a pre-formation, all-volunteer nonprofit — corrected once the organization's real leadership structure existed on paper. Cultural Influences became the first concrete test of the "does this actually need a database" question — and the answer was no.
**Result:** A visually and structurally consistent site across all pages; a Careers page that's honest about the organization's actual current stage; a Cultural Influences page with zero ongoing infrastructure dependency.

### v0.5 — Full visual system rebuild
**What changed:** Replaced the original dark theme with a cream/navy/gold "constitutional paper" palette, rebuilt across all pages. Introduced the Official Seal as a featured visual element (mission page). Reworked the Lexicon and Citizen Portal images to sit natively on the page instead of framed as light boxes inside a dark theme. Added a custom, on-brand 404 page (ported from the original site's tagline library, rebuilt without any React/Next.js dependency, with a real working minimal site search replacing a non-functional one). Version indicator bumped from v0.2 to v0.5 to reflect the scope of the combined changes.
**Why:** The project's most "official" visual assets — the Seal and the Constitutional Lexicon — were already built in a cream/navy/gold register, deliberately evoking an actual founding document. The site's dark theme, chosen early for a landing page, had never been checked against that instinct. Once compared side by side, the parchment palette was the more authentic register for a document claiming constitutional weight — and it was a comparatively cheap rebuild at four pages, versus a costly one after fifteen Constitution Articles existed in the old palette.
**Result:** Visual consistency across the project's key assets for the first time. Established as the site's standing design default going forward — new work starts from this palette; deviation requires a deliberate reason, not a default drift. (The dark theme was archived, not discarded, in case a light/dark toggle is ever worth building later.)

---

## 6. Roadmap — v1.0 (Constitution Launch)

The defining event of v1.0: **publishing all 15 Articles of Constitution v2.0, one per week, each paired with its Explainer.**

- **Migrate to a static site generator (Astro).** Four hand-copied HTML files was manageable; fifteen-plus paired Article/Explainer documents plus an ongoing blog is not, without a shared template. Astro ships zero JavaScript by default, keeping the current site's performance profile while solving the duplication problem.
- **Constitution index page** — a single table of contents showing all 15 Articles, published and upcoming, each cross-linked to its Explainer.
- **Permanent URL structure**, decided in advance: `/constitution/article-i` through `/constitution/article-xv`, `/explainers/article-i` and so on — stable from day one, since these will eventually anchor Digital Constitutional Convention discussion threads.
- **Blog**, with its own template and an auto-generated RSS feed, doubling as the announcement channel for each week's Article release.
- **Migrate the four existing pages** (Home, Mission, Careers, Cultural Influences) into the same Astro structure, rather than leaving them as legacy files outside the new system.
- **Donation infrastructure**, once the IRS determination letter exists (which unlocks nonprofit-rate pricing across every payment platform under consideration) — cards, PayPal, and Apple Pay bundled under a single donation platform. Zelle was evaluated and ruled out (no receipting, inconsistent bank support, no real cost advantage worth the gap).
- **Analytics**, likely Plausible or similar — the one piece of the original 2025 stack that was right-sized from the start.

## 7. Roadmap — v2.0 (Digital Constitutional Convention)

Everything requiring real accounts, sessions, and live user interaction is scoped here, deliberately kept out of v1.0:

- **Account system** — sign-in, citizen profiles, an achievements/reputation layer, a "Jury Dashboard" concept for structured moderation participation.
- **The Digital Constitutional Convention** (formerly referred to as "Town Hall") — structured public deliberation on the Constitution, modeled closer to Wikipedia's ArbCom (elected trust + due process) than to a social media comment section. Built as its own separate system — most likely Discourse or similar — linked to and embedded within Article pages, not merged into the main site's codebase.
- **Category-based mega-navigation** — a six-category dropdown navigation system (About, Constitution, Learn, Community, Media & Press, Get Involved), inherited conceptually from the original site design. Deferred until real content exists across *all six* categories, not just Constitution — a mega-menu built today would mostly point at empty categories.
- **Possible revival of the animated Constitution presentation concept** — a glowing, book-opening reveal for the Constitution index page. Scoped as real craft work, not core infrastructure; a candidate for a v1.1 polish pass once the weekly publishing rhythm is established, rather than a launch-day requirement.
- **Light/dark theme toggle** — the original dark theme is archived and could become one half of a real toggle later. Not built by default, since the parchment palette is the project's actual visual identity, not one of two equal options.

---

## 8. Deploying (Vercel)

1. Push this repo to GitHub under the `Utopia-Project-US` org.
2. In Vercel: New Project → Import → select this repo, scoped to the org (not a personal account — private-org repos require a Vercel Team).
3. Framework preset: **Other**. No build command — it's static HTML (until the Astro migration lands; update this section when it does).
4. Deploy. Attach the `utopiaproject.us` domain under project Settings.

## 9. Editing Conventions

- Every page currently carries its own copy of the shared header/footer/CSS — a known, temporary state of affairs pending the Astro migration. Until then, cross-page changes (nav links, palette, version pill) must be applied to every file individually.
- Design tokens (colors, fonts) are CSS custom properties at the top of each page's `<style>` block.
- Images are pre-resized and compressed for web before committing; originals are not kept in this repo.
- The version pill in the header is updated by hand with each meaningful release — see §5 for the convention (`vX.X - STATUS`, casing typed directly rather than via CSS transform).
