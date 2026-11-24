# TheBoatGuy.dk — Website Plan

**Start:** Fri 13 Nov 2026 · **Launch deadline:** Fri 20 Nov 2026 · **Languages:** Danish + English · **Palette:** Navy / White / Gold

---

## 1. Business read (strategy view)

**What the client sells:** premium, trust-based boat care (polish, hull/antifouling, winterization, interior, teak, drive/prop) across DK, south Sweden, north Germany. Positioning in the logo and copy is *premium, precise, transparent*, not cheapest.

**What the site must do, in order of value:**
1. **Generate qualified quote requests.** The price calculator and quote form are the money feature.
2. **Build trust fast.** Before/after gallery, 11 years of experience, workmanship guarantee, Trustpilot, transparent process.
3. **Rank locally.** Danes search "bådpolering", "bundmaling", "vinterklargøring af båd" plus a place name.
4. **Convert on mobile.** Boat owners are on the quay with a phone, so WhatsApp and click-to-call are primary.

**Customer segments** (drive the copy): private motor/sail owners (core), charter companies, marinas and yacht clubs (B2B, recurring), commercial operators (minor).

**Business model:** one-off jobs (hull, polish), seasonal jobs (winterization, spring prep), recurring revenue (weekly/bi-weekly/monthly washing). Recurring plans are the most valuable, so give them a prominent section.

### Gaps and risks found in the PDF

| # | Issue | Why it matters | Action |
|---|---|---|---|
| 1 | **No pricing logic.** Item 5 promises an "accurate price calculation" but gives no rates. | Blocks the headline feature. | Ask for a price list (per metre or per m² per service, condition multipliers, travel surcharges). |
| 2 | **"Accurate" price vs. their own process.** They inspect on site first. | Binding online prices create legal and margin risk. | Show an **estimate range** ("indicative, final price after inspection"). Fits their process. |
| 3 | **PDF says Webflow hosting**, but you are building it. | Decides the whole tech stack. | Confirm Monday AM (see §3). |
| 4 | **About text says "boats, cars and caravans"**, but every service is marine. | Dilutes positioning. | Keep it, but only as a short line. Confirm with the client. |
| 5 | **"11 years" vs "past five years"**. | Reads as inconsistent. | Rewrite: *11+ years experience, 5 years serving clients independently across DK/DE/SE.* Confirm. |
| 6 | **Missing assets:** vector logo (PNG is 1087px), photos, videos, Trustpilot URL, social links, stats numbers, reviews, address/CVR, opening hours, WhatsApp number. | Content is the usual cause of a missed deadline. | Send the checklist in §6 today. Use clearly marked placeholders if late. |
| 7 | **Legal (Denmark/EU):** GDPR privacy policy, cookie consent, CVR number and address in the footer, terms. Photo upload means you store personal data. | Fines, and Trustpilot/Google trust. | Include; use a cookie-free analytics option to avoid a banner. |
| 8 | **Scope is large for 7 days.** 12 pages, 17 services, calculator, uploads, 2 languages. | Quality risk. | Tiered scope in §2. |
| 9 | **German market** (north Germany) but no German language requested. | Lost leads. | Out of scope; offer as phase 2 (the i18n setup makes it cheap). |

---

## 2. Scope (tiered)

**MVP: must ship Fri 20 Nov**
- Pages (DA + EN): Home, About, Services overview, **6 service pages** (grouping the 17 bullets into the client's own sections 3.1–3.6), Our Work (gallery), Our Process, Reviews, Request a Quote (+ calculator), Contact, Privacy, Cookies, Terms
- Price estimate calculator, then pre-fills the quote form
- Quote form with photo upload, email to info@theboatguy.dk, auto-reply to customer
- Click-to-call, WhatsApp button, sticky mobile CTA
- Before/after slider gallery, stats counters, Trustpilot link and review quotes
- Maintenance packages section (plans described, "request quote" CTA, no online payment)
- FAQ, operating-area section (DK / S. Sweden / N. Germany)
- SEO basics, sitemap, hreflang, schema.org `LocalBusiness`, OG images, analytics, speed and accessibility pass

**Should-have: only if ahead of schedule**
- Google Maps embed, FAQ schema, per-region landing sections, short video in hero

**Later (phase 2: say so explicitly to the client)**
- Online booking, newsletter, live Trustpilot/Google review feed, German version, CMS for client self-editing (if not on Webflow), customer portal for subscriptions

---

## 3. Key decision: stack

**DECIDED (13 Nov): Option B, custom Astro build.** Still tell the client, since their PDF mentions Webflow, and confirm they're fine without self-editing.

| | **A. Webflow** (client's mention) | **B. Astro + Tailwind, static, serverless forms** (recommended) |
|---|---|---|
| Client can edit text/photos | Yes, easily | Needs a CMS added, or you edit |
| DA/EN | Paid Localization add-on | Built-in i18n routing |
| Price calculator + upload | Custom JS embed, awkward | Native, tested code |
| Speed / SEO / control | Good | Best |
| Running cost | Site plan + localization, monthly | ~€0–5/mo hosting + domain |
| 7-day risk | Medium (fighting limits on calculator) | Low-medium |

**Recommendation: B.** Astro (static, i18n routes `/da/` default and `/en/`), Tailwind, small TypeScript API route for the quote form (Resend for email, Cloudflare Turnstile spam protection, uploads via Cloudflare R2 or Vercel Blob, max 5 photos × 5 MB), hosted on Vercel or Cloudflare Pages. Calculator is client-side from a single `pricing.json` the client can ask you to tweak. If the client insists on self-editing, add Decap/Sanity later.

**If they choose Webflow:** same design and content, calculator as an embed, the rest unchanged. Timeline holds, risk rises.

---

## 4. Design direction

- **Palette:** Navy `#061431` (base), deep navy `#0B1F4A`, gold `#C9A24B` with light-gold `#EAD9A0` gradient (matches logo), white `#FFFFFF`, soft-grey `#F4F5F8`. Danish flag red used only inside the logo anchor.
- **Type:** wide-tracked serif for headings (Cinzel or Cormorant Garamond, echoing the logo wordmark), clean sans for body (Inter). Both are self-hosted for speed.
- **Look:** dark navy hero with full-bleed boat photography, gold hairline dividers (as in logo), generous whitespace, restrained motion (fade-up, slider reveals, counters). No stock-template feel.
- **Logo:** request SVG/vector. If not available, vectorize the PNG; the logo has a navy background, so also produce a transparent version for white sections.
- **Photography is the product.** If the client has little, use real before/after pairs first and label any stand-in imagery internally to replace.
- **Mobile first:** sticky bottom bar (Call · WhatsApp · Get quote).

---

## 5. Price calculator spec (MVP)

**Inputs:** boat type (motor/sail/other), brand/model (free text), length (m), services (multi-select, 6 groups), location (DK region / S. Sweden / N. Germany), condition (good / average / poor / unsure).

**Logic (all in `pricing.json`):**
`estimate = Σ(service rate × length × condition multiplier) + travel zone surcharge` → shown as **range (±15%)** with a clear "indicative, final price after inspection" note, then **"Send me a firm quote"** pre-fills the quote form.

**Needs from client:** rate per service (kr/m or kr/m²), condition multipliers, travel zones/fees, minimum job price, VAT display (incl./excl.). Until supplied, build with clearly fake numbers and a "DEMO" switch off by default in production.

---

## 6. Content and asset checklist (send to client **today**)

1. Vector logo (SVG/AI/PDF)
2. 15+ before/after photos, boat/job photos, any videos (original resolution)
3. Trustpilot profile URL + 5–8 best reviews (with permission to show names/initials)
4. Facebook / Instagram / LinkedIn URLs
5. Real stats: jobs completed, boats serviced, years, countries
6. Registered company name, CVR, address, opening hours
7. WhatsApp number (same as +45 91 46 79 78?)
8. Price list / calculator inputs (§5)
9. Package details: what weekly / bi-weekly / monthly / seasonal include
10. Domain: who owns theboatguy.dk, access to registrar and DNS; does info@ mailbox exist
11. Webflow vs custom decision (§3)
12. Danish copy: have they written it, or should I draft DA and EN for approval? (I can draft both; they review.)
13. Any competitor sites they like or dislike

---

## 7. Timeline: Fri 13 → Fri 20 Nov

| Day | Goal | Deliverables | Exit check |
|---|---|---|---|
| **Fri 13** (today) | Plan and unblock | This plan, client questions sent (§6), repo and tooling set up, design tokens from logo | Client has the list; stack question asked |
| **Sat 14 – Sun 15** *(optional buffer, light work)* | Copy | Draft EN copy for all pages from the PDF; draft DA translation; SEO keyword map | Copy doc ready |
| **Mon 16** | Foundation + design | Stack confirmed, project scaffold, i18n, layout, header/footer, home page hero + sections (high-fidelity in code) | Home page in DA/EN on mobile + desktop |
| **Tue 17** | Content pages | About, Services overview, 6 service pages, Process, Packages, FAQ, Gallery (with slider), Reviews | All pages routed with real or placeholder content |
| **Wed 18** | Features | Calculator, quote form + upload + emails + spam protection, WhatsApp/click-to-call, legal pages, **deploy to staging, send link to client** | Form delivers an email; client reviews staging |
| **Thu 19** | Polish + feedback | Apply client feedback, SEO (meta, schema, sitemap, hreflang), analytics, image optimization, accessibility, cross-device tests, Lighthouse ≥ 90 | Test checklist (§8) green |
| **Fri 20** | Launch | DNS + SSL, final form test on production, Search Console + Google Business Profile, 301s if there was an old site, handover notes | Live site, client sign-off |

**Contingency:** Wed's staging is the real checkpoint. If assets or price data are still missing then, launch Fri with the calculator in "request a quote" mode (no numbers) and ship it live the following week. Do not slip the date for it.

---

## 8. Quality gate (before launch)

- Forms: submit test in DA and EN, with and without photos, email arrives, auto-reply sent, spam trap works
- Devices: iPhone Safari, Android Chrome, iPad, desktop Chrome/Safari/Firefox
- Lighthouse mobile ≥ 90 for Performance / SEO / Best Practices, ≥ 95 Accessibility
- Contrast on gold-on-navy and gold-on-white text (gold fails on white at small sizes; use darker gold there)
- All links, hreflang pairs, 404 page, sitemap, robots, canonical URLs
- Legal pages present, CVR in footer, cookie policy matches what actually runs
- No placeholder text or DEMO flags left

---

## 9. After launch (offer as a follow-on)

Google Business Profile (service-area business, DK/SE/DE), Trustpilot review invite flow, Search Console indexing, Danish local-SEO landing pages (Copenhagen, Aarhus, Funen, Jutland, Skåne, Kiel/Flensburg), German version, booking, review feed, monthly analytics note.

---

## 10. Questions to ask the client first (priority order)

1. Webflow, or are you happy for it to be built custom (faster, cheaper to run, they'd come to you for edits)?
2. Can you send the price list for the calculator, and are you OK with showing a price **range** rather than a firm price?
3. Photos and reviews: when can you send them (needed by Tue 17 at the latest)?
4. Do you own the domain, and does the info@ mailbox exist?
5. Should the "cars and caravans" mention stay?
