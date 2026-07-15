# SEO Strategy — Rogue Coding Academy

## 1. Business Context

- Primary goal: lead generation (seat requests for coding courses)
- Target geography: Grants Pass, OR and Southern Oregon (English)
- Conversion events: seat-request mailto form submits (course interest expressed)

## 2. Target Audience & Personas

- Career changers and builders in Southern Oregon seeking software + AI skills
- Parents/professionals evaluating a local premier coding academy
- Search intents: local (coding school Grants Pass), transactional (enroll / request seat), informational (learn AI coding)

## 3. Keyword Strategy

### Primary Keywords (1–3)

| Keyword | Monthly Volume | Difficulty | Intent | Target Page |
|---------|---------------|------------|--------|-------------|
| coding academy Grants Pass | TBD | TBD | local | `/` |
| learn to code Southern Oregon | TBD | TBD | local | `/courses` |
| AI coding classes Oregon | TBD | TBD | transactional | `/courses` |

### Secondary Keywords

| Keyword | Monthly Volume | Difficulty | Intent | Target Page |
|---------|---------------|------------|--------|-------------|
| coding school Rogue Valley | TBD | TBD | local | `/` |
| software engineering instructor Grants Pass | TBD | TBD | navigational | `/team` |
| Rogue Coding Academy | TBD | TBD | branded | `/` |

### Long-tail / AEO Targets

| Question / Query | Target Page | Answer Format |
|-----------------|-------------|---------------|
| What is Rogue Coding Academy? | `/` | Direct answer in hero + schema |
| Who teaches at Rogue Coding Academy? | `/team` | Person schema + bio |
| How do I request a seat? | `/courses` | Steps near form |

## 4. Entity Map

- Brand entity: Rogue Coding Academy (`https://roguecoding.academy/#organization`)
- Local: Grants Pass, OR; email coding@ibarraventures.com; areaServed Southern Oregon
- Key topics: coding education, AI literacy, software fundamentals, Rogue Valley, Grants Pass
- Brand etymology (internal only): “Rogue” evokes the Rogue River / rafting culture of Grants Pass — do **not** spell this out in on-page copy; use geo terms (Rogue Valley, Grants Pass, Southern Oregon) for local SEO instead

## 5. Content Messaging Guidelines

- Source of truth for UI strings: `src/data/copy.ts` (plus `src/data/site.ts` for site-wide name/tagline/description)
- Brand voice: next-gen, precise, confident; whitewater/rapids metaphors (not ocean/wave/surf)
- Primary metaphor: **rapids** — used in the “why” section and era journey; hero leads with category clarity, not metaphor
- Value proposition: Local coding academy in Grants Pass — in-person software development coaching for the Rogue Valley
- Homepage section cascade: Hero (what: local in-person academy) → Rogue Valley (what: high-quality tech here) → Tech eras (pace of change) → Why now (AI disruption + local coaching)
- Local section focus: bringing high-quality tech training to the Rogue Valley — not origin-story about the river name
- Differentiators: in-person personalized coaching; founder VP Eng instructor; Rogue Valley access to premier training; portfolio-quality experience
- Phrases to avoid: “Named for the Rogue River”; wave/surf metaphors; bootcamp scam tropes; vague “learn coding fast” without craft

## 6. Page-Level SEO Map

| Page | Primary Keyword | Meta Title | Meta Description | Schema Type |
|------|----------------|------------|-----------------|-------------|
| `/` | coding academy Grants Pass | Rogue Coding Academy | Local coding academy in Grants Pass, OR. In-person software coaching for the Rogue Valley — ride the AI-era rapids with expert guidance. | EducationalOrganization, WebSite, WebPage |
| `/courses` | learn to code Southern Oregon | Courses \| Rogue Coding Academy | Browse courses; filter by topic and level; request a seat. | CollectionPage |
| `/courses/[slug]` | course title | [Course] \| Rogue Coding Academy | Course summary | Course, WebPage |
| `/team` | Diego Ibarra instructor | Founding team \| Rogue Coding Academy | Meet founder and primary instructor Diego Ibarra. | AboutPage, Person |

## 7. Technical Checklist Status

- [x] Canonical tags on all pages
- [x] robots.txt present
- [x] XML sitemap via `@astrojs/sitemap` (submit after launch)
- [ ] Core Web Vitals passing (validate post-deploy, mobile p75)
- [x] JSON-LD on key pages
- [x] OG/Twitter meta on all pages
- [ ] Hreflang (N/A — single locale)

## 8. AEO / AI Visibility

- Citation targets: Google AI Overviews, ChatGPT, Perplexity
- Freshness: review key pages within 10 months
- Structured formats: era timeline list, course outcomes lists, team highlights

## 9. Measurement & Cadence

- Search Console: create property at launch
- Reporting cadence: monthly
- Current CWV: baseline after first production deploy

## 10. Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-14 | Initial SEO strategy for Astro marketing site | Agent |
| 2026-07-14 | Messaging: wave→rapids; local close → Rogue Valley tech quality; river-name etymology internal-only | Agent |
| 2026-07-14 | Homepage What→Why cascade: hero category clarity, Rogue Valley promoted, thesis retargeted to AI disruption + local coaching | Agent |
| 2026-07-14 | Eras: keep decade arc, then leapfrog beats ChatGPT 2022 → MS 30% AI code 2025 → Claude Fable 2026 | Agent |
