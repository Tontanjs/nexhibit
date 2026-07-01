# NEXHIBIT — Claude System Audit

**Audit date:** July 1, 2026  
**Auditor:** Claude (senior product engineer + frontend architect + UI/UX designer)  
**Scope:** Full codebase — public, student, employer, admin, pricing, billing, theme, motion, copy, accessibility, performance, and QA systems  
**Project directory:** `/Users/tassanawanpui/Desktop/nexhibit`

---

## Executive Summary

NEXHIBIT is a high-fidelity, presentation-ready frontend prototype for a reverse career fair platform targeting international students at Zhejiang University of Technology (ZJUT). The codebase is substantially complete — 55 pages, 3 full role portals, an Aurora premium visual system, simulated billing flows, a rule-based match engine, and a comprehensive automated QA suite.

This audit found the project in a strong, passing state across all automated checks. No critical blockers remain. The work in this pass focuses on accurate documentation, targeted interaction polish, and precise framing.

**Correct product framing:**

> NEXHIBIT is a high-fidelity frontend prototype using mock/demo data to demonstrate how a university-backed reverse career fair platform could work in a future real deployment.

---

## Baseline Validation Evidence

| Check | Result |
|---|---|
| `npm run build` | ✅ Passed — 55 pages generated, 0 errors |
| `npm run lint` | ✅ Passed — 0 warnings, 0 errors |
| `npx tsc --noEmit` | ✅ Passed — 0 type errors |
| `npm run audit:routes` | ✅ Passed — 138 route/scenario checks, 0 issues |
| `href="#"` search | ✅ Clean — 0 dead anchor links found |
| `Template 1 / Option 1` search | ✅ Clean — 0 placeholder labels found |
| `Real outcomes` search | ✅ Clean — 0 unsupported claims found |
| `AI-powered / AI matching` search | ✅ Clean — 0 unsupported claims found |
| `Verified by ZJUT` search | ✅ Clean — 0 unsupported real-verification claims |
| `PIPL compliant` search | ✅ Clean — correctly framed as "PIPL considerations" |
| Screenshots: light mode | ✅ 69 captures across 1440px, 768px, 375px |
| Screenshots: dark mode | ✅ 23 desktop captures |

---

## Project Structure Summary

```
nexhibit/
├── src/
│   ├── app/                  55 Next.js App Router pages
│   │   ├── (public)          /, /about, /success-stories, /login, /signup
│   │   ├── student/          17 pages — dashboard, profile, events, event-day,
│   │   │                       messages, onboarding, coach, network, global,
│   │   │                       live-booth, companies/[id], billing/*, settings, upgrade
│   │   ├── employer/         11 pages — dashboard, browse, student/[id],
│   │   │                       messages, scanner, shortlist, billing/*, upgrade
│   │   ├── admin/            6 pages — dashboard, events, employers,
│   │   │                       billing, billing/transactions, billing/refunds
│   │   ├── pricing/          4 pages — /, student, employer, university
│   │   └── billing/          1 page — receipt/[id]
│   ├── components/           120+ components
│   │   ├── aurora/           Premium visual primitives
│   │   ├── billing/          21 billing/payment components
│   │   ├── student/          8 complex student system components
│   │   ├── employer/         2 employer-specific components
│   │   ├── product/          8 shared product components
│   │   ├── marketing/        13 landing/public components
│   │   ├── brand/            Logo, avatars, prototype notices, verified badges
│   │   ├── layout/           Navbar, Footer, role headers, notification dropdown
│   │   ├── theme/            Provider, toggle, first-paint script
│   │   ├── auth/             DemoUserMenu
│   │   ├── motion/           11 animation/transition components
│   │   ├── ui/               18 shadcn-style primitives
│   │   ├── illustrations/    3 empty-state SVG illustrations
│   │   └── icons/            5 custom SVG icons
│   ├── lib/                  25 library/utility files
│   │   ├── mock-data/        30 students, 8 employers, 4 events, mentors, alumni, stats
│   │   ├── extended-data/    Feedback, conversations, visitor stream, notifications, charts
│   │   ├── billing/          Plans, payment methods, types, utilities
│   │   ├── copy/             strings.ts — 1170-line centralized copy system
│   │   ├── utils-lib/        Matching, colors, formatters, filters
│   │   ├── config/           Categories, filters
│   │   └── (root)            current-user, current-employer, demo-session,
│   │                           employer-workspace, company-profiles, visual-assets
│   └── stores/               5 Zustand stores (student portal UI state)
├── docs/                     8 documentation files + gpt-review subfolder
├── public/assets/            8 employer logos, 4 event images, 72 student photos/avatars
└── scripts/                  Playwright route audit + screenshot automation
```

---

## Routes Found

| Route | User group | Status | Notes |
|---|---|---|---|
| `/` | Public | ✅ Complete | Aurora hero, role demo entry, stats, comparison |
| `/about` | Public | ✅ Complete | Problem/insight/solution, research evidence |
| `/success-stories` | Public | ✅ Complete | Illustrative stories, labeled as prototype |
| `/login` | Auth | ✅ Complete | 3-role demo login, toast, redirect |
| `/signup` | Auth | ✅ Complete | Student/employer demo signup, prototype notice |
| `/pricing` | Public | ✅ Complete | Tab navigation to sub-plans |
| `/pricing/student` | Public | ✅ Complete | Free/Pro/Max tiers |
| `/pricing/employer` | Public | ✅ Complete | Starter/Growth/Enterprise |
| `/pricing/university` | Public | ✅ Complete | Partnership tiers |
| `/student/dashboard` | Student | ✅ Complete | Readiness score, feedback summary, pipeline, next actions |
| `/student/onboarding` | Student | ✅ Complete | ZJUT verification demo with consent |
| `/student/profile` | Student | ✅ Complete | Evidence cards, pitch builder, privacy preview, employer preview |
| `/student/settings` | Student | ✅ Complete | Privacy, theme, account, logout |
| `/student/events` | Student | ✅ Complete | Event list, booking demo |
| `/student/events/[id]` | Student | ✅ Complete | Event detail, booth booking |
| `/student/event-day` | Student | ✅ Complete | QR pass, visitor stream, readiness tips |
| `/student/messages` | Student | ✅ Complete | Conversation thread, quick replies |
| `/student/companies/[id]` | Student | ✅ Complete | Company detail, fit radar, match score |
| `/student/coach` | Student | ✅ Complete | Rule-based coaching, demo framing |
| `/student/network` | Student | ✅ Complete | Peers, mentors, alumni — local state actions |
| `/student/global` | Student | ✅ Complete | Global toolkit, reference resources |
| `/student/live-booth` | Student | ✅ Complete | Live-booth simulation |
| `/student/upgrade` | Student | ✅ Complete | Plan upgrade, prototype billing notice |
| `/student/billing` | Student | ✅ Complete | Subscription overview |
| `/student/billing/history` | Student | ✅ Complete | Mock transaction history |
| `/student/billing/invoices` | Student | ✅ Complete | Mock invoice list |
| `/student/billing/payment-methods` | Student | ✅ Complete | Mock payment methods |
| `/student/billing/cancel` | Student | ✅ Complete | Cancellation flow with retention offer |
| `/employer/dashboard` | Employer | ✅ Complete | Metrics, pipeline, recommendations, command center |
| `/employer/browse` | Employer | ✅ Complete | Search, filters, match scores, student cards |
| `/employer/student/[id]` | Employer | ✅ Complete | Full dossier, match explanation, notes |
| `/employer/messages` | Employer | ✅ Complete | Thread, quick replies, candidate context sidebar |
| `/employer/scanner` | Employer | ✅ Complete | Glowing scanner, states, scan history, shortlist |
| `/employer/shortlist` | Employer | ✅ Complete | Pipeline board, stage movement, export demo |
| `/employer/upgrade` | Employer | ✅ Complete | Upgrade flow |
| `/employer/billing` | Employer | ✅ Complete | Subscription, seat management with feedback |
| `/employer/billing/history` | Employer | ✅ Complete | Mock transactions |
| `/employer/billing/invoices` | Employer | ✅ Complete | Mock invoices, fapiao demo |
| `/employer/billing/payment-methods` | Employer | ✅ Complete | Mock payment methods |
| `/admin` | Admin | ✅ Complete | Charts, metrics, readiness, recommendations |
| `/admin/events` | Admin | ✅ Complete | Event command center, readiness, check-in |
| `/admin/employers` | Admin | ✅ Complete | Verification queue, review drawer, approve/reject |
| `/admin/billing` | Admin | ✅ Complete | Revenue dashboard, plan distribution |
| `/admin/billing/transactions` | Admin | ✅ Complete | Transaction log, mock export |
| `/admin/billing/refunds` | Admin | ✅ Complete | Refund queue |
| `/billing/receipt/[id]` | Billing | ✅ Complete | Demo receipt with prototype notice |

---

## Components Found (Major Groups)

### Aurora Visual System
- `AuroraBackground` — dark gradient + noise/glow layer
- `GlowCard` — glassmorphism card with theme variants
- `MetricGlowCard` — dashboard stat card with glow
- `PremiumHeroPanel` — hero/header panel for app routes
- `EventPassCard` — QR career pass with event context
- `ScannerGlowFrame` — animated scanner with neon border
- `AnimatedSection` — stagger/reveal wrapper
- `FloatingFeatureCard` — marketing floating card
- `InteractiveGlowListItem` — activity/message list item
- `NeonButton` — glow button variant

### Product Components
- `ReadinessChecklist` — progress + checklist with states
- `MatchExplanation` — rule-based match factor breakdown
- `ConsentSummary` — visible/hidden field privacy preview
- `InsightCard` — admin insight with chart/recommendation
- `PipelineStageBadge` — candidate stage label
- `EmptyState` — reusable no-data state

### Student System Components
- `DashboardPerformanceSection` — analytics, visibility metrics
- `EmployerFeedbackSummary` — structured recruiter feedback with filters
- `NetworkClient` — peers, mentors, alumni tabs
- `LiveBoothClient` — live booth simulation
- `PortfolioClient` — evidence cards with depth
- `ProfilePageClient` — full profile editor

### Employer System Components
- `CandidatePipelineBoard` — Kanban pipeline board
- `MatchExplanation` — shared match factor display

### Billing Components (21 total)
- `PricingTable`, `PricingToggle`, `TierCard`
- `UpgradeFlow`, `CheckoutSummary`, `PaymentMethodSelector`
- `AlipayQrPanel`, `WeChatPayQrPanel`, `UnionPayForm`
- `CreditCardForm`, `ApplePayButton`, `BankTransferDetails`
- `BillingHistoryTable`, `InvoiceCard`, `PaymentMethodCard`
- `SubscriptionCard`, `UsageMeter`, `CancellationFlow`
- `FapiaoRequestDialog`, `AddPaymentMethodDialog`, `AdminRevenueChart`

---

## Current Strengths

1. **Broad route coverage** — 55 pages across all 3 role portals plus public, pricing, billing, and receipt flows
2. **Aurora Premium visual system** — consistent glassmorphism, neon accents, gold CTAs, dark premium + light professional
3. **Full theme system** — light/dark/system with first-paint script, localStorage persistence, semantic CSS variables
4. **Demo session system** — localStorage-backed role selection, deterministic login redirects, visible logout, role indicators
5. **Centralized copy** — 1170-line `strings.ts` with prototype disclaimers throughout
6. **Rule-based match engine** — `matching.ts` with explicit "not AI" framing at every surface
7. **Structured feedback system** — `EmployerFeedbackSummary` with filters, metrics, evidence, next steps, local actions
8. **Career readiness dashboard** — readiness score, profile/event/visibility metrics, 8-item checklist, next actions
9. **Rich employer workflow** — scanner simulation, pipeline Kanban, quick-reply messages, candidate dossier
10. **Admin command center** — theme-aware charts, event management, employer review, revenue dashboard
11. **Billing prototype** — 6 payment methods, checkout modal, history, invoices, cancellation — all clearly labeled mock
12. **Zero placeholder labels** — no "Template 1", "Option 1", or `href="#"` in source
13. **Accessibility foundations** — aria-labels on icon buttons, labeled inputs, focus rings, reduced-motion support
14. **Automated QA** — Playwright route audit (138 checks) + screenshot capture scripts
15. **Honest framing** — PrototypeNotice on all high-trust workflows; no unsupported AI/verification/outcome claims

---

## Current Weaknesses / Remaining Limitations

| Area | Finding | Severity | Type |
|---|---|---|---|
| Route protection | No middleware auth guards; all routes are publicly accessible | Prototype-only | Expected limitation |
| Backend persistence | All state is browser-local; no database, no API | Prototype-only | Expected limitation |
| QR validation | Scanner simulated; no signed tokens or camera identity | Prototype-only | Expected limitation |
| Matching | Rule-based scoring; not ML/AI | Prototype-only | Expected limitation (labeled) |
| Analytics | All metrics are deterministic mock values | Prototype-only | Expected limitation (labeled) |
| Verification | No real ZJUT or employer verification | Prototype-only | Expected limitation (labeled) |
| Billing | No payment processor; all checkout is demo UI | Prototype-only | Expected limitation (labeled) |
| PIPL | No consent logging, audit trail, or deletion workflows | Prototype-only | Expected limitation (labeled) |
| Employer partnerships | Company logos/names are illustrative mock data | Prototype-only | Expected limitation (labeled) |
| Student outcomes | Success stories are illustrative demo scenarios | Prototype-only | Expected limitation (labeled) |
| `/student/network` bundle | First-load JS 55.4 kB (heavier than other routes) | Performance | Acceptable for prototype |
| Several routes ~300 kB | `/student/dashboard`, `/student/coach`, others near bundle budget | Performance | Acceptable for prototype |

---

## Critical Issues Found

**None.** No critical blockers were found in this audit pass.

---

## Major Issues Found (and resolution status)

All major issues identified in prior audit rounds have been addressed:

| Issue | Resolution |
|---|---|
| Residual copy implying real verification | Reframed throughout — employer-demo visibility, verification concepts, demo records |
| Silent no-op buttons in presentation-critical flows | Local state, toast feedback, or disabled-with-reason added |
| Student dashboard missing readiness overview | Career Readiness Score, 8-item checklist, metrics panel added |
| Profile preview had weak dialog semantics and nested h1 | Semantic dialog with labeled title, single page h1 |
| Portfolio evidence cards were shallow | Problem/solution/role/tools/evidence/outcome/learning structure added |
| Automated route audit missing newer routes | Expanded to 46 routes × 3 scenarios + 5 interaction checks |
| Employer billing "Add seat" silent | Toast feedback and local count added |
| Live booth residual verified-profile copy | Reframed to "demo booth presence" |
| Network page silent mentor/story actions | Zustand store state + toast feedback added |

---

## Implementation Priorities (completed in this pass)

| Priority | Phase | Status |
|---|---|---|
| Credibility sweep | Phase 12 | ✅ Done |
| Student readiness + portfolio depth | Phase 6 | ✅ Done |
| Employer feedback summary upgrade | Phase 7 | ✅ Done |
| Silent-action removal | Phase 15 | ✅ Done |
| Admin chart quality | Phase 9 | ✅ Done |
| Billing prototype polish | Phase 11 | ✅ Done |
| Aurora visual system | Phase 5 | ✅ Done |
| Theme system (light/dark/system) | Phase 4 | ✅ Done |
| Demo session + logout | Phase 3 | ✅ Done |
| Expanded route audit | Phase 18 | ✅ Done |
| Documentation | Phase 19 | ✅ Done |

---

## Route Audit Table

| Route | User group | Score | Issues found | Severity | Fix applied | Remaining limitation |
|---|---|---:|---|---|---|---|
| `/` | Public | 5 | None | — | Copy audit verified | Metrics illustrative |
| `/about` | Public | 5 | None | — | Framing verified | No university endorsement |
| `/success-stories` | Public | 5 | None | — | Prototype labels confirmed | Stories illustrative |
| `/login` | Auth | 5 | None | — | Interaction verified | No real auth |
| `/signup` | Auth | 5 | None | — | Notices confirmed | No account creation |
| `/pricing` | Public | 5 | None | — | Notices verified | Mock pricing |
| `/pricing/student` | Public | 5 | None | — | Notices verified | Mock pricing |
| `/pricing/employer` | Public | 5 | None | — | Notices verified | Mock ROI |
| `/pricing/university` | Public | 5 | None | — | Copy reframed | No contract flow |
| `/student/dashboard` | Student | 5 | Readiness missing (prior) | Major | Readiness + checklist added | Analytics mock |
| `/student/onboarding` | Student | 5 | None | — | Consent copy verified | No real ZJUT sync |
| `/student/profile` | Student | 5 | Evidence shallow (prior) | Major | Evidence structure added | State local/mock |
| `/student/settings` | Student | 5 | None | — | Labels + feedback verified | Settings local |
| `/student/events` | Student | 5 | Verification wording (prior) | Major | Copy reframed | Events mock |
| `/student/events/[id]` | Student | 5 | Verification wording (prior) | Major | Copy reframed | Booking simulated |
| `/student/event-day` | Student | 5 | None | — | Interaction verified | QR/stream simulated |
| `/student/messages` | Student | 5 | None | — | Interaction verified | Messages local/mock |
| `/student/companies/[id]` | Student | 5 | None | — | Match disclaimer verified | Company details mock |
| `/student/coach` | Student | 5 | AI framing | Major | "Rule-based" framing confirmed | No real AI coach |
| `/student/global` | Student | 5 | Reference framing | Moderate | Illustrative label confirmed | Not legal/immigration advice |
| `/student/live-booth` | Student | 5 | Silent buttons (prior) | Major | Local state + feedback added | Live presence simulated |
| `/student/network` | Student | 5 | Silent actions (prior) | Major | Store state + toast added | Networking simulated |
| `/student/upgrade` | Student | 5 | None | — | Prototype notice verified | No payment |
| `/student/billing` | Student | 5 | None | — | Interaction verified | Mock subscription |
| `/student/billing/history` | Student | 5 | None | — | Route audit added | Mock transactions |
| `/student/billing/invoices` | Student | 5 | None | — | Route audit added | Mock invoices |
| `/student/billing/payment-methods` | Student | 5 | None | — | Route audit added | No real payment data |
| `/student/billing/cancel` | Student | 5 | None | — | Flow verified | Mock cancellation |
| `/employer/dashboard` | Employer | 5 | Silent button (prior) | Major | Feedback added | Metrics mock |
| `/employer/browse` | Employer | 5 | Verification wording (prior) | Major | Copy reframed | Ranking rule-based |
| `/employer/student/[id]` | Employer | 5 | None | — | Feedback verified | Dossier mock |
| `/employer/messages` | Employer | 5 | None | — | Quick replies confirmed | Messaging local/mock |
| `/employer/scanner` | Employer | 5 | None | — | States verified | Scanner simulated |
| `/employer/shortlist` | Employer | 5 | None | — | Pipeline verified | Pipeline local/mock |
| `/employer/upgrade` | Employer | 5 | None | — | Prototype notice verified | No payment |
| `/employer/billing` | Employer | 5 | Silent "Add seat" (prior) | Major | Toast feedback added | Mock subscription |
| `/employer/billing/history` | Employer | 5 | None | — | Route audit added | Mock transactions |
| `/employer/billing/invoices` | Employer | 5 | None | — | Invoices verified | Mock invoices/fapiao |
| `/employer/billing/payment-methods` | Employer | 5 | None | — | Payment methods verified | No payment data |
| `/admin` | Admin | 5 | None | — | Charts verified | All metrics mock |
| `/admin/events` | Admin | 5 | None | — | Interactions verified | Operations simulated |
| `/admin/employers` | Admin | 5 | Verification terminology (prior) | Major | Status labels reframed | No real verification |
| `/admin/billing` | Admin | 5 | None | — | Revenue notice verified | Mock revenue |
| `/admin/billing/transactions` | Admin | 5 | None | — | Interaction verified | Mock transactions |
| `/admin/billing/refunds` | Admin | 5 | None | — | Interaction verified | Mock refunds |
| `/billing/receipt/[id]` | Billing | 5 | Route absent from smoke list (prior) | Moderate | Route audit coverage added | Demo receipt |

---

## Prototype Limitations

The following capabilities are intentionally simulated and will remain so until a production backend is built:

- **Authentication** — browser localStorage; no JWT, OAuth, or session cookies
- **Route protection** — no middleware; all routes are accessible without login
- **Database persistence** — all data is mock/hardcoded; no records are stored
- **ZJUT verification** — no API connection to ZJUT student registry
- **Employer verification** — simulated review workflow; no real business checks
- **QR tokens** — unsigned demo QR codes; no cryptographic identity
- **Match scoring** — rule-based heuristics; no ML model or validated algorithm
- **Analytics** — deterministic mock values; no real telemetry
- **Messaging** — browser-local state; messages do not persist or send
- **Notifications** — demo data; not wired to real events
- **Billing** — prototype checkout UI; no payment processor connected
- **File uploads** — profile projects use hardcoded data; no storage service
- **PIPL compliance** — no consent logging, data deletion, or audit trail
- **Email notifications** — not implemented
- **Employer partnerships** — company names and logos are illustrative mock data
- **Student outcomes** — success stories are demo scenarios created for presentation

---

## Recommended Next Steps for Production

1. **Backend API** (Node.js/Go + PostgreSQL) — student and employer CRUD, event management, messaging
2. **Authentication** — OAuth2 (ZJUT SSO preferred) or JWT with secure session cookies
3. **Route protection** — Next.js middleware with role-based access control
4. **Database schema** — students, employers, events, conversations, messages, shortlists, files, transactions
5. **File storage** — AWS S3 or equivalent for portfolio uploads, CVs, and documents
6. **QR token signing** — cryptographic tokens with event-scoped student identity
7. **Employer verification** — async workflow with career services staff approval
8. **PIPL compliance** — consent logging, purpose limitation, deletion API, data minimization
9. **Payment processing** — Stripe (international) + Alipay/WeChat Pay (China domestic)
10. **Email/notification service** — SendGrid or Resend for transactional messages
11. **Real analytics** — event telemetry replacing mock visitor stream and match stats
12. **ML matching** — replace rule-based score with a trained relevance model
13. **CI/CD pipeline** — GitHub Actions for automated build, lint, type check, and deploy
14. **Monitoring** — Sentry for error tracking, Datadog or Grafana for platform health

---

## Final Statement

NEXHIBIT is a high-fidelity frontend prototype using mock/demo data, upgraded with clearer roles, stronger student/employer/admin workflows, better visual quality, faster interaction feedback, improved accessibility, broader automated QA, and more complete presentation-ready product logic. It is not a production system and does not claim to be one.
