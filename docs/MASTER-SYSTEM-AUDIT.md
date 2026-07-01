# NEXHIBIT Master System Audit

Audit date: July 1, 2026

Project: `/Users/tassanawanpui/Desktop/nexhibit`

## Executive Summary

NEXHIBIT is already a broad, visually ambitious high-fidelity frontend prototype. It has public, student, employer, admin, pricing, billing, theme, motion, mock-data, and screenshot/audit infrastructure. The production build and existing route smoke suite pass.

The remaining work is not a rebuild. It is a credibility and interaction-quality pass:

- remove residual wording that presents demo verification as real verification;
- eliminate silent buttons in presentation-critical flows;
- strengthen the student dashboard around readiness, not only activity;
- improve the employer-preview modal semantics and heading structure;
- extend automated route coverage to recently added student and billing routes;
- keep all simulated auth, matching, QR, analytics, verification, outcomes, and billing behavior explicitly labeled.

Correct product framing:

> NEXHIBIT is a high-fidelity frontend prototype using mock/demo data to demonstrate how a university-backed reverse career fair platform could work in a future real deployment.

## Audit Scope And Evidence

Reviewed:

- `package.json`, Next.js configuration, TypeScript configuration, and scripts
- `src/app/**`, including all public, student, employer, admin, pricing, billing, and receipt routes
- app layouts, public and role-specific navigation, headers, and footer
- theme provider, theme script, semantic color tokens, light/dark/system controls
- browser-local demo session and logout behavior
- mock student, employer, event, conversation, feedback, analytics, and billing data
- reusable Aurora, product, billing, motion, and brand components
- visible copy risk terms and placeholder/dead-link searches
- interaction feedback, form labels, headings, mobile overflow, and icon-button naming
- existing documentation and QA scripts

Baseline evidence:

- `npm run build`: passed; 55 pages generated
- `npm run lint`: passed
- `npm run audit:routes`: passed; 114 checks, 0 reported issues
- risky-term search: no `href="#"`, `Template 1`, `Template 2`, `Option 1`, or visible `Real outcomes` in application source
- browser inspection: student dashboard has one meaningful `h1`, role context, theme access, mock-data notice, structured feedback, and usable mobile navigation

Final validation evidence:

- `npx tsc --noEmit`: passed
- `npm run lint`: passed
- `npm run build`: passed; 55 pages generated
- production route audit: passed; 138 route/scenario checks and 5 interaction checks, 0 issues
- interaction coverage: theme persistence, admin demo login/logout, dashboard toast feedback, event-pass feedback, and profile pitch/evidence/preview semantics
- light screenshot sweep: 69 captures passed across 1440px, 768px, and 375px
- dark screenshot sweep: 23 desktop captures passed
- targeted post-polish dashboard recapture: passed in light desktop/mobile and dark desktop
- final source search: no `href="#"`, placeholder template labels, empty handlers, unsupported “Real outcomes,” unsupported real-AI wording, or unsupported real-verification wording

## System Inventory

Major component groups found:

- Aurora visual system: `AuroraBackground`, `GlowCard`, `MetricGlowCard`, `PremiumHeroPanel`, `EventPassCard`, `ScannerGlowFrame`, and interactive list/card primitives
- Product system: readiness, match explanation, consent summary, empty states, metrics, insights, and pipeline stages
- Student system: dashboard analytics, structured recruiter feedback, profile depth tools, live booth, coach, network, global toolkit, messages, events, event day, settings, and billing
- Employer system: command-center dashboard, browse/filter experience, student dossier, scanner simulation, shortlist pipeline, messages, and billing
- Admin system: dashboard charts, event management, employer review, transactions, refunds, and mock revenue
- Platform system: light/dark/system theme, demo session helpers, role menus, notifications, toasts, responsive sheets, screenshot capture, and route audit

## Current Strengths

- Broad and coherent role-based prototype coverage
- Premium Aurora visual direction with semantic theme tokens
- First-paint theme script and persisted light/dark/system preference
- Browser-local role selection, deterministic demo redirects, and explicit logout
- Structured student recruiter feedback with filters, metrics, evidence, next steps, and local action state
- Rule-based match explanation with a visible non-AI disclaimer
- Simulated scanner and billing notices on high-trust workflows
- Theme-aware admin charts with short interpretations
- Mobile drawers, horizontal navigation, responsive cards, and table overflow handling
- Existing lint, build, route-audit, and screenshot scripts

## Critical And Major Findings

| Severity | Finding | Evidence | Planned fix | Prototype-only limitation |
| --- | --- | --- | --- | --- |
| Critical | Residual copy implied real verification. | Visible strings included “verified employers,” “verified student profiles,” and “verified international profiles.” | Reframed as employer-demo visibility, verification concepts, reviewed demo records, and future-deployment language. | No real ZJUT or employer verification exists. |
| Major | Several visible buttons were silent no-ops. | Static JSX inspection found presentation-critical controls without links, handlers, disabled state, or feedback. | Added local state, toast feedback, navigation, dialog behavior, or a clear disabled state. | Actions remain browser-local simulations. |
| Major | Student dashboard emphasized activity without a single readiness overview. | Dashboard had analytics, next actions, pipeline, and feedback but no consolidated career/event readiness score. | Added readiness score, profile/event/visibility metrics, eight-item checklist, and post-event next actions. | Scores remain deterministic mock values. |
| Major | Profile preview had weak dialog semantics and a second `h1`. | `EmployerPreviewModal` used a fixed `div` and nested `h1` over the page `h1`. | Added labelled dialog semantics, kept one page `h1`, and verified the dialog title as `h2`. | Preview does not enforce real consent or authorization. |
| Major | Automated route audit omitted newer routes. | Coach, global toolkit, live booth, network, billing subroutes, and receipt were absent. | Expanded to 46 routes × 3 scenarios and added five interaction checks. | Smoke checks do not replace full assistive-technology testing. |
| Major | Portfolio project cards lacked the requested evidence structure. | Cards primarily showed title, description, and tags. | Added problem, solution, role, tools, evidence, outcome, learning, talking point, and local pin/edit/remove actions. | Project edits remain local/mock. |
| Moderate | README said “production-quality frontend prototype foundation.” | This could read as broader production readiness. | Reframed as “presentation-ready frontend prototype.” | Production backend, security, compliance, and operations remain out of scope. |
| Moderate | Some added student feature routes have dense first-load bundles. | Build output shows `/student/network` at 55.3 kB route size and several routes near 300 kB first load. | Avoid adding dependencies; keep new changes lightweight and transform/opacity-only. | A production implementation would need route budgets and deeper profiling. |

## Prototype-Only Boundaries

The following will remain simulated:

- authentication, authorization, route protection, and session security;
- backend persistence, database records, audit logs, and consent history;
- ZJUT student verification and employer verification;
- QR token signing and camera-backed identity/consent validation;
- recruiter analytics, outcomes, messages, feedback, and event telemetry;
- Smart Match scoring and all recommendations;
- billing, checkout, subscriptions, cards, QR payments, invoices, refunds, and fapiao;
- legal or regulatory compliance, including PIPL review;
- employer partnerships and student outcomes.

## Route Audit Table

Scores are current product-audit scores before this pass: 5 = presentation-ready for a prototype, 4 = strong with minor polish, 3 = functional but has a material gap.

| Route | User group | Score | Main issue | Severity | Fix in this pass | Remaining limitation |
| --- | --- | ---: | --- | --- | --- | --- |
| `/` | Public | 4 | Verification language needs final credibility sweep. | Major | Copy audit. | Marketing metrics are illustrative. |
| `/about` | Public | 4 | Research and institution framing must stay conceptual. | Moderate | Copy audit. | No formal university endorsement is represented. |
| `/success-stories` | Public | 5 | None blocking; prototype label already present. | Polish | Verify wording. | Stories are illustrative. |
| `/login` | Auth | 5 | None blocking. | Polish | Interaction recheck. | No real auth. |
| `/signup` | Auth | 4 | Signup remains a demo handoff. | Moderate | Verify notice and feedback. | No account creation. |
| `/pricing` | Public/Billing | 5 | None blocking. | Polish | Verify notices. | Mock pricing. |
| `/pricing/student` | Student/Billing | 5 | None blocking. | Polish | Verify notices. | Mock pricing. |
| `/pricing/employer` | Employer/Billing | 5 | None blocking. | Polish | Verify notices. | Mock ROI and pricing. |
| `/pricing/university` | University/Billing | 4 | “Verified student profiles” wording. | Major | Reframe copy. | No contract or deployment flow. |
| `/student/dashboard` | Student | 4 | Missing consolidated readiness command card; one no-op A/B action. | Major | Add readiness and button feedback. | Analytics are mock. |
| `/student/onboarding` | Student | 5 | None blocking. | Polish | Verify consent copy. | No real ZJUT sync. |
| `/student/profile` | Student | 3 | Incomplete evidence cards, no-op controls, preview dialog semantics. | Major | Upgrade evidence/actions/modal. | Profile state is local/mock. |
| `/student/settings` | Student | 5 | None blocking. | Polish | Verify labels and feedback. | Settings are local. |
| `/student/events` | Student | 4 | Verification wording in event data. | Major | Reframe event copy. | Events/bookings are mock. |
| `/student/events/[id]` | Student | 4 | “Verified profile” language. | Major | Reframe copy. | Booking is simulated. |
| `/student/event-day` | Student | 5 | None blocking. | Polish | Interaction recheck. | QR and visitor stream are simulated. |
| `/student/messages` | Student | 5 | None blocking. | Polish | Interaction recheck. | Messages are local/mock. |
| `/student/companies/[id]` | Student | 5 | None blocking. | Polish | Verify match disclaimer. | Company details are mock. |
| `/student/coach` | Student | 4 | Must stay rule-based/demo-framed. | Major | Add to route audit. | No real AI coach. |
| `/student/global` | Student | 4 | Reference content is illustrative. | Moderate | Add to route audit. | Not legal/immigration advice. |
| `/student/live-booth` | Student | 3 | Residual verified-profile copy and silent buttons. | Major | Reframe and add feedback. | Live presence is simulated. |
| `/student/network` | Student | 3 | Silent mentor/story actions. | Major | Add action state/feedback. | Networking is simulated. |
| `/student/upgrade` | Student/Billing | 5 | None blocking. | Polish | Verify notice. | No payment. |
| `/student/billing` | Student/Billing | 5 | None blocking. | Polish | Interaction recheck. | Mock subscription. |
| `/student/billing/history` | Student/Billing | 5 | None blocking. | Polish | Add to expanded route audit. | Mock transactions. |
| `/student/billing/invoices` | Student/Billing | 5 | None blocking. | Polish | Add to expanded route audit. | Mock invoices. |
| `/student/billing/payment-methods` | Student/Billing | 5 | None blocking. | Polish | Add to expanded route audit. | No saved payment data. |
| `/student/billing/cancel` | Student/Billing | 5 | None blocking. | Polish | Verify flow. | Mock cancellation. |
| `/employer/dashboard` | Employer | 4 | Residual verified-profile copy and one silent button. | Major | Reframe and add feedback. | Metrics are mock. |
| `/employer/browse` | Employer | 4 | “verified students” wording. | Major | Reframe copy. | Ranking is rule-based. |
| `/employer/student/[id]` | Employer | 5 | None blocking. | Polish | Verify feedback. | Dossier is mock. |
| `/employer/messages` | Employer | 5 | None blocking. | Polish | Interaction recheck. | Messaging is local/mock. |
| `/employer/scanner` | Employer | 5 | None blocking. | Polish | State recheck. | Scanner is simulated. |
| `/employer/shortlist` | Employer | 5 | None blocking. | Polish | Interaction recheck. | Pipeline is local/mock. |
| `/employer/upgrade` | Employer/Billing | 5 | None blocking. | Polish | Verify notice. | No payment. |
| `/employer/billing` | Employer/Billing | 4 | Silent “Add seat” action. | Major | Add feedback/local response. | Mock subscription. |
| `/employer/billing/history` | Employer/Billing | 5 | None blocking. | Polish | Add to route audit. | Mock transactions. |
| `/employer/billing/invoices` | Employer/Billing | 5 | None blocking. | Polish | Interaction recheck. | Mock invoices/fapiao. |
| `/employer/billing/payment-methods` | Employer/Billing | 5 | None blocking. | Polish | Interaction recheck. | No payment data saved. |
| `/admin` | Admin | 5 | None blocking. | Polish | Chart/browser recheck. | All metrics are mock. |
| `/admin/events` | Admin | 5 | None blocking. | Polish | Interaction recheck. | Event operations are simulated. |
| `/admin/employers` | Admin | 4 | Verification terminology requires care. | Major | Reframe status labels where needed. | No real verification. |
| `/admin/billing` | Admin/Billing | 5 | None blocking. | Polish | Verify notice. | Mock revenue. |
| `/admin/billing/transactions` | Admin/Billing | 5 | None blocking. | Polish | Interaction recheck. | Mock transactions/export. |
| `/admin/billing/refunds` | Admin/Billing | 5 | None blocking. | Polish | Interaction recheck. | Mock refunds. |
| `/billing/receipt/[id]` | Billing | 4 | Receipt route absent from smoke list. | Moderate | Add route audit coverage. | Receipt is demo HTML. |

## Upgrade Phases

1. Credibility sweep and prototype-language cleanup
2. Student readiness, portfolio evidence, and modal semantics
3. Silent-action removal across student, employer, and billing surfaces
4. Expanded route audit and responsive browser checks
5. Final build, lint, TypeScript, route, and screenshot validation
6. Documentation reconciliation and final limitations report

## Final Result

NEXHIBIT remains a high-fidelity frontend prototype using mock/demo data, now upgraded with clearer roles, stronger student/employer/admin workflows, better visual quality, faster interaction feedback, improved accessibility, broader automated QA, and more complete presentation-ready product logic.
