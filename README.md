# The Utopia Project US — Website

`utopiaproject.us` — the public-facing site for a nonprofit civic initiative designing **Constitution v2.0**, a modern constitutional framework built around truth, accountability, and human dignity.

## TL;DR

This site is deliberately simple: static HTML, no framework, no database, no build step. It replaced a much heavier 2025 plan (Next.js, Supabase, Stripe, live accounts, a $1/month verification model) that was architected for a scale and feature set the organization hasn't reached yet. The governing rule since: build for a real, current requirement — never an anticipated one. Full reasoning in **§4**; the actual decision-by-decision history is in **§5**; what's coming next is in **§6–7**.

---

## 1. Website Goals

The site exists to present, explain, and evolve Constitution v2.0, and to represent The Utopia Project US as an organization. Current, real goals:

- Present Constitution v2.0 — its Articles, its companion Explainers, and the reasoning behind it — in a form people can actually read and understand.
- Represent the organization honestly: its mission, its founding leadership, its current stage of formation.
- Curate supporting material (Cultural Influences) that reflects the project's values.
- Build toward structured public deliberation on the Constitution itself, once the foundation for that exists.

This list is intentionally shorter than the project's original 2025 concept document. See **§4 (Why We Simplified)** for what changed and why.

---

## 2. Current Structure (scalable static layout)

### Approved information-architecture scaffold (August 1, 2026)

The approved scaffold expands the subject hierarchy without adding unfinished destinations to the main navigation. Every unfinished HTML scaffold carries a `noindex` directive until its public content is reviewed.

```
pages/
├── about/
│   ├── index.html
│   ├── our-story.html
│   ├── mission.html
│   ├── leadership.html
│   ├── contributors-and-advisors.html
│   ├── governance.html
│   ├── transparency.html
│   └── project-roadmap.html
├── constitution/
│   ├── index.html
│   ├── declaration.html
│   ├── preamble.html
│   ├── comparison.html
│   ├── version-history.html
│   ├── articles/
│   │   └── index.html
│   └── explainers/
│       └── index.html
├── learn/
│   ├── index.html
│   ├── drafting-room/
│   ├── cultural-influences.html
│   ├── constitutional-glossary.html
│   ├── plain-language-guides/
│   ├── case-studies/
│   ├── teaching-resources/
│   └── faq.html
├── newsroom/
│   ├── index.html
│   ├── board-minutes/
│   ├── press-releases/
│   ├── news-coverage.html
│   └── media.html
├── get-involved/
│   ├── index.html
│   ├── careers.html
│   ├── partnerships.html
│   ├── donate.html
│   └── contact.html
├── policies/
│   ├── privacy.html
│   ├── terms.html
│   ├── accessibility.html
│   ├── copyright-and-reuse.html
│   └── corrections.html
└── utility/
    ├── search.html
    └── site-map.html

templates/
├── constitution-article.html
└── constitution-explainer.html
```

**Approved scope boundaries:**

- Article Explainers contain what the Article means, why its direction was chosen, and the supporting sources; there are no separate Design Principles or Sources pages.
- Drafting Process, Adoption and Transition, and downloadable constitutional editions remain deferred to v2.0 and are not scaffolded.
- Pre-Convention public-comment, proposal, and deliberation pages are not scaffolded. Structured participation waits for the Digital Constitutional Convention; social channels may provide informal discussion after official accounts exist.
- The main navigation remains limited to completed public destinations. Scaffold pages are not linked there merely because files exist.
- Reusable working templates live under `templates/`, which is excluded from search indexing along with `archive/` and `site-work/`.

The earlier incremental structure notes remain below as part of the README's retained history.

The repository separates public content pages from shared assets and operational files. The filesystem is organized by subject area rather than by navigation order: navigation can change as the site evolves, while stable content categories remain understandable and scalable.

```
website/
├── index.html                              # Homepage; root location required
├── 404.html                                # Custom not-found page; root location required by Vercel
├── pages/                                  # Customer-facing content pages
│   ├── about/
│   │   ├── mission.html
│   │   └── careers.html
│   ├── research/
│   │   └── cultural-influences.html
│   └── drafting-room/
│       ├── index.html
│       └── papers/
│           └── paper-no-1.html
├── assets/                                 # Shared resources, never page content
│   ├── audio/
│   ├── data/
│   │   ├── cultural-influences.json        # Editorial source data
│   │   └── cultural-influences.js          # Local-file-compatible browser data mirror
│   ├── images/
│   │   └── eleven-pillars-of-leadership.png # Full-resolution Careers model
│   ├── scripts/
│   └── styles/
├── archive/                                # Locked historical release copies
├── site-work/                              # Git-backed work in progress
├── rss.xml                                 # The Drafting Room RSS feed
├── robots.txt                              # Search-engine exclusions
├── vercel.json                             # Stable public-route mapping and headers
└── README.md                               # This file
```

Future constitutional material follows the same hierarchy:

```
pages/constitution/
├── index.html
├── articles/
│   ├── article-01.html
│   ├── article-02.html
│   └── ...
└── explainers/
    ├── article-01.html
    ├── article-02.html
    └── ...
```

Public URLs are intentionally independent of physical storage. Vercel rewrites keep established addresses such as `/mission.html` and `/drafting-room/paper-no-1.html` working even though their source files are grouped under `pages/`. This prevents broken bookmarks, RSS entries, and search results while allowing the repository to scale.

The original v0.3 structure section is retained below for historical reference.

## 2. Current Structure (as of v0.3)

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

**Local-file compatibility note:** Cultural Influences remains a static-data feature with no database. The JSON file is the editorial source record; the equivalent JavaScript data file allows the same material to load when the website is opened directly from disk, where browsers commonly block `fetch()` requests for local JSON. The two files must remain synchronized whenever the collection changes.

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

**The general rule this produced:** match infrastructure to a real, current requirement — not to an anticipated one, and not to whichever tool sounds most sophisticated. Every major technical decision since has been measured against this rule, including ones that added complexity when it was actually earned (see v0.3 below).

---

## 5. Version History

### v0.5 Maintenance — Scalable structure, local compatibility, and Careers model

**Date:** *August 1, 2026*

**Version status:** These changes refine the approved v0.5 release and do **not** advance the website version pill. Future version changes remain subject to explicit approval by the project owner.

**What changed:**

- Reorganized customer-facing pages into scalable subject folders under `pages/`, moved shared resources under `assets/`, preserved established public addresses through `vercel.json`, and added the approved information-architecture scaffold. Unfinished scaffold pages remain outside the main navigation and carry `noindex` directives.
- Added the formal Constitution Article and Explainer templates, including status and version metadata, official text, plain-language explanation, embedded sources, comparison material, paired links, and revision histories. Templates remain excluded from search indexing.
- Added the six-part **Start Here** homepage section and then moved it into the former **What We're Building** position, replacing that older section rather than duplicating it.
- Repaired direct local-file use after the folder reorganization. Each HTML page now declares a depth-appropriate `<base>` address back to the website root, and internal graphics, scripts, styles, audio, and navigation use physical project-relative destinations. Vercel continues to preserve the shorter established public aliases for deployed visitors.
- Repaired fragment navigation affected by the new base-address system. Mission table-of-contents links, homepage section links, and accessibility skip links now identify both the physical page and the destination fragment, preventing local browsers from opening the website folder instead of the intended section.
- Added `assets/data/cultural-influences.js` as a local-file-compatible mirror of the static JSON collection so Cultural Influences works both when opened directly and when deployed through Vercel.
- Added the full-resolution **Eleven Pillars of Leadership** graphic to Careers and clearly identified it as the proposed organization being built. Desktop and iPad visitors see the complete tappable graphic; phone visitors retain the existing role-card presentation and receive a full-resolution download link. The detailed HTML role content remains available to assistive technology at larger widths.
- Separated documentation responsibilities: the project-root README now explains the entire Utopia Project workspace, while this file remains the authoritative website architecture, maintenance, and release record.

**Why:** The site needed a filesystem that could scale to constitutional Articles, Explainers, educational material, policies, and Newsroom content without crowding the root directory. At the same time, the project owner reviews pages by opening them locally, so the physical organization and address system must work without relying on Vercel. The Careers model also needed to communicate the depth of the proposed organization without implying that its future departments are already staffed.

**Result:** v0.5 now has a scalable content architecture, stable deployed aliases, dependable direct-local viewing, validated section navigation, an explicit Article/Explainer publishing model, a clearer homepage starting point, and a responsive Careers presentation that is ambitious, transparent, and accessible.

### v0.5 — The Drafting Room and RSS

**Date:** *August 1, 2026*

**What changed:** Launched **The Drafting Room** as the project's public essay and announcement section. Published **Paper No. 1 — Founder's Introduction** at a permanent URL, rebuilt from the approved draft in the site's cream/navy/gold visual system, and added Todd McGuckin's purpose-designed calligraphic author mark. Added The Drafting Room to desktop and mobile navigation across the site, included it in the 404-page search, and adjusted the navigation breakpoint so the expanded menu remains usable at intermediate screen widths. Added a standards-compliant RSS 2.0 feed, RSS autodiscovery metadata, and a subscription link in the homepage Contact section. Canonical and Open Graph URLs were aligned with the site's `www.utopiaproject.us` redirect.

**Why:** The project needed a durable publication channel for the reasoning behind Constitution v2.0, beginning with a personal explanation of why the work exists. RSS provides a platform-independent way for readers to follow future papers and constitutional releases without introducing accounts, a mailing-list platform, or a database.

**Result:** The site now has a permanent, branded publishing surface with its first paper live, discoverable from every primary page, searchable from the 404 page, and subscribable through any RSS reader.

### v0.4 — Browser and device identity

**Date:** *August 1, 2026*

**What changed:** Replaced the single general-purpose favicon with a complete browser and device icon set: 16×16 and 32×32 PNG favicons, a multi-size `.ico` file, and a 180×180 Apple touch icon. Updated every public page to declare the appropriate icon variants.

**Why:** The original single favicon did not provide consistent rendering across browser tabs, bookmarks, pinned shortcuts, and mobile home screens.

**Result:** The Utopia Project US now presents a consistent visual identity across modern browsers and Apple touch surfaces.

### v0.3 — Full visual system rebuild

**Date:** *July 30, 2026*

**What changed:** Replaced the original dark theme with a cream/navy/gold "constitutional paper" palette, rebuilt across all pages. Introduced the Official Seal as a featured visual element (mission page). Reworked the Lexicon and Citizen Portal images to sit natively on the page instead of framed as light boxes inside a dark theme. Added a custom, on-brand 404 page (ported from the original site's tagline library, rebuilt without any React/Next.js dependency, with a real working minimal site search replacing a non-functional one). Version indicator advanced from v0.2 to v0.3.

**Why:** The project's most "official" visual assets — the Seal and the Constitutional Lexicon — were already built in a cream/navy/gold register, deliberately evoking an actual founding document. The site's dark theme, chosen early for a landing page, had never been checked against that instinct. Once compared side by side, the parchment palette was the more authentic register for a document claiming constitutional weight — and it was a comparatively cheap rebuild at four pages, versus a costly one after fifteen Constitution Articles existed in the old palette.

**Result:** Visual consistency across the project's key assets for the first time. Established as the site's standing design default going forward — new work starts from this palette; deviation requires a deliberate reason, not a default drift. (The dark theme's source remains recoverable in git history — worth tagging explicitly if it isn't already, so it's a named bookmark rather than something to go hunting for later.)

### v0.2 — Structural correctness, Careers, Cultural Influences

**Date:** *late July 27, 2026*

**What changed:** Fixed a CSS specificity bug that had been silently breaking hero-text centering on two pages. Rebuilt the Careers page from an old, mismatched draft (a 24-role corporate C-suite listing) into an accurate reflection of the org's real governance structure — President, VP, Secretary, Treasurer, and seven Directors, mapped directly from the Eleven Pillars leadership chart. Added the Cultural Influences page, deliberately built against a static JSON data file instead of reviving the old Supabase connection. Standardized header, footer, and navigation across all pages (sticky footer, consistent nav grouping, mobile hamburger menu). Added a background music feature with session-based random track selection.

**Why:** Early pages had drifted out of sync as each was built somewhat independently. The original Careers content, inherited from the old site, described positions and titles that didn't match a pre-formation, all-volunteer nonprofit — corrected once the organization's real leadership structure existed on paper. Cultural Influences became the first concrete test of the "does this actually need a database" question — and the answer was no.

**Result:** A visually and structurally consistent site across all pages; a Careers page that's honest about the organization's actual current stage; a Cultural Influences page with zero ongoing infrastructure dependency.

### v0.1 — Initial static landing page

**Date:** *July 25, 2026*

**What changed:** Replaced the prior Next.js/Supabase/Cloudflare codebase with a from-scratch static HTML homepage and mission page. Established the site's first visual identity (dark background, amber/gold accents).

**Why:** The prior project needed a full restart — the organization relocated its legal home from NC to PA, and the existing codebase was unfinished and entangled with infrastructure (a Supabase project, an old Vercel deployment) that no longer matched the org's actual setup. A clean restart was judged easier than untangling the old one.

**Result:** Site live on Vercel, under a properly organized GitHub organization (`Utopia-Project-US`), with four private repos (`bylaws`, `constitution2`, `phone`, `website`) replacing a scattered personal-account setup.

---

## 6. Roadmap — v1.0 (Constitution Launch)

The defining event of v1.0: **publishing all 15 Articles of Constitution v2.0, one per week, each paired with its Explainer.**

- **Migrate to a static site generator (Astro).** Four hand-copied HTML files was manageable; fifteen-plus paired Article/Explainer documents plus an ongoing blog is not, without a shared template. Astro ships zero JavaScript by default, keeping the current site's performance profile while solving the duplication problem.
- **Constitution index page** — a single table of contents showing all 15 Articles, published and upcoming, each cross-linked to its Explainer.
- **Permanent URL structure**, decided in advance: `/constitution/article-i` through `/constitution/article-xv`, `/explainers/article-i` and so on — stable from day one, since these will eventually anchor Digital Constitutional Convention discussion threads.
- **Blog**, with its own template and an auto-generated RSS feed, doubling as the announcement channel for each week's Article release.
- **Migrate the four existing pages** (Home, Mission, Careers, Cultural Influences) into the same Astro structure, rather than leaving them as legacy files outside the new system.
- **Donation infrastructure**, once the IRS determination letter exists (which unlocks nonprofit-rate pricing across every payment platform under consideration) — cards, PayPal, and Apple Pay bundled under **Givebutter**, selected over Zeffy and Donorbox on cost-and-features grounds (comparable $0-by-default cost to Zeffy, but with the ability to disable donor tip-prompting entirely, plus a stronger built-in feature set). Zelle was evaluated separately and ruled out (no receipting, inconsistent bank support, no real cost advantage worth the gap).
- **Analytics**, likely Plausible or similar — the one piece of the original 2025 stack that was right-sized from the start.
- **Add "Contributors" and "Maintained By" sections to this README** — deliberately deferred until v1.0.

## 7. Roadmap — v2.0 (Digital Constitutional Convention)

Everything requiring real accounts, sessions, and live user interaction is scoped here, deliberately kept out of v1.0:

- **Account system** — sign-in, citizen profiles, an achievements/reputation layer, a "Jury Dashboard" concept for structured moderation participation. Identity verification, if built, uses a real KYC-style vendor (Stripe Identity, Persona, ID.me) — not a low-dollar charge, which verifies a working card, not a person, and is itself a known fraud-testing technique.
- **The Digital Constitutional Convention** (formerly referred to as "Town Hall") — structured public deliberation on the Constitution, deliberately modeled closer to Wikipedia's ArbCom than to a social media comment section: elected/trusted moderators operating through a structured process with evidence and a right of response, not raw up/down votes deciding outcomes. Design principles established so far: reading stays open to everyone (matching the project's transparency principle), only verified accounts can post; trust/reputation accrues over time rather than every privilege gating on the initial signup step alone; and a non-volunteer legal backstop (staff or board) exists behind the community process, since the organization carries legal exposure for the platform regardless of how moderation is distributed. Built as its own separate system — most likely Discourse or similar — linked to and embedded within Article pages, not merged into the main site's codebase.
- **Dark/light theme toggle** — the original dark theme remains available in git history and could become one half of a real toggle later. Not built by default, since the parchment palette is the project's actual visual identity, not one of two equal options.
- **Color-coded wayfinding** — tinting the breadcrumb bar to match whichever content section a visitor is in, inspired by the original site's sidebar navigation. Genuinely cheap to build and doesn't strictly require waiting for v2.0 — worth pulling forward into v1.0 if there's room, listed here only because it was never explicitly greenlit.
- **Category-based mega-navigation** — a six-category dropdown navigation system (About, Constitution, Learn, Community, Media & Press, Get Involved), inherited conceptually from the original site design. Deferred until real content exists across *all six* categories, not just Constitution — a mega-menu built today would mostly point at empty categories.
- **Approved information-architecture clarification (August 1, 2026):** Newsroom replaces the earlier "Media & Press" label. Community participation remains a v2.0 Convention concern and is not scaffolded in the prelaunch informational site.
- **Possible revival of the animated Constitution presentation concept** — a glowing, book-opening reveal for the Constitution index page. Scoped as real craft work, not core infrastructure; a candidate for a v1.1 polish pass once the weekly publishing rhythm is established, rather than a launch-day requirement.

---

## 8. Deploying (Vercel)

1. Push this repo to GitHub under the `Utopia-Project-US` org.
2. In Vercel: New Project → Import → select this repo, scoped to the org (not a personal account — private-org repos require a Vercel Team).
3. Framework preset: **Other**. No build command — it's static HTML (until the Astro migration lands; update this section when it does).
4. Deploy. Attach the `utopiaproject.us` domain under project Settings.

## 9. Editing Conventions

- Every page currently carries its own copy of the shared header/footer/CSS — a known, temporary state of affairs pending the Astro migration. Until then, cross-page changes (nav links, palette, version pill) must be applied to every file individually.
- Customer-facing content belongs under the appropriate subject folder in `pages/`; only the homepage and host-required error page remain at the website root.
- Use root-absolute internal references such as `/assets/images/seal.png` and `/mission.html`. Do not calculate paths with chains of `../`; pages may move deeper as Articles and Explainers are added.
- **Superseding local/server compatibility rule (August 1, 2026):** The preceding root-absolute rule is retained only as history and must no longer be followed. Every HTML file declares a depth-appropriate relative `<base>` address that resolves to the website root. Internal references then use project-relative physical paths without a leading slash, such as `assets/images/seal.png` and `pages/about/mission.html`. This works both when files are opened directly and when the site is deployed.
- Fragment links on pages that use `<base>` must name the physical page before the fragment—for example, `pages/about/mission.html#opening-vision` rather than `#opening-vision`. Bare fragments resolve against the base directory and can open a local folder instead of the intended section.
- When a page moves to a different folder depth, update its `<base>` value and validate all local graphics, navigation targets, and fragments before publication.
- Preserve established public URLs through `vercel.json` rewrites when moving a source file. Filesystem organization must not silently break bookmarks, RSS entries, canonical URLs, or search results.
- Place shared media, data, styles, and scripts under `assets/` by type. A resource belongs next to a page only when it is truly unique to that page and will never be shared.
- When Cultural Influences changes, update both `assets/data/cultural-influences.json` and its equivalent local-compatible `assets/data/cultural-influences.js`, then validate that their data is identical.
- Draft only the files actively being changed in `site-work/`. After a draft is approved and published, remove that published draft while leaving unrelated work in progress intact.
- Archive only meaningful numbered releases, using the agreed page-folder and `pagename-vX.Y-YYYYMMDD.ext` naming convention. Archived files are read-only.
- Design tokens (colors, fonts) are CSS custom properties at the top of each page's `<style>` block.
- Images are pre-resized and compressed for web before committing; originals are not kept in this repo.
- The version pill in the header is updated by hand with each meaningful release — see §5 for the convention (`vX.X - STATUS`, casing typed directly rather than via CSS transform).

## 10. Article and Explainer Content Model

Every published constitutional Article and Explainer uses a stable permanent URL and a paired identifier. Working templates live in `templates/constitution-article.html` and `templates/constitution-explainer.html`; template files are not public content and remain excluded from search indexing.

### Article requirements

- Article number and title
- Permanent slug
- Status: Draft, Under Review, Revised, or Published
- Current version, first publication date, and latest revision date
- Plain-language summary clearly distinguished from official text
- Complete official Article text with stable section and clause numbering
- Approval authority and status
- Permanent link to the paired Explainer
- Link to the relevant constitutional comparison
- Dated revision history describing every material change and its authority
- Related Drafting Room papers where useful

### Explainer requirements

- Paired Article number, title, and permanent link
- Status, version, publication date, and latest revision date
- **What the Article means:** operation, scope, powers, limits, rights, and intended effect
- **Why this direction:** the legal, historical, institutional, and policy reasoning behind the text
- **Sources and evidence:** citations embedded directly in the relevant Explainer
- Material alternatives, tradeoffs, foreseeable objections, and limitations
- What the Article preserves, changes, adds, or removes relative to the current Constitution
- Dated revision history coordinated with any revision to the paired Article

### Publication rule

An Article and its Explainer are treated as a pair. Neither should be added to public navigation until both have approved content, working cross-links, complete version metadata, and a validated revision record.

## 11. Documentation Boundary

The two top-level README files have intentionally different responsibilities:

- `/README.md` at the project root is the organization-wide orientation document. It contains the mission, workspace folder map, current priorities, sources of authority, working conventions, and public contacts.
- `website/README.md` (this file) documents the public website: its goals, physical structure, technical choices, release history, roadmaps, editing rules, and approved content model.

Project-wide information should not be duplicated here unless it directly affects website operation or publication. Website-specific technical and release material should not be copied into the project-root README; the root document should link readers here instead.
