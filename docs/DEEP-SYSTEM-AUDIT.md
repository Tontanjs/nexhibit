# NEXHIBIT Deep System Audit

> Historical pass. See `docs/MASTER-SYSTEM-AUDIT.md` for the July 1, 2026 final system audit and validation results.

Audit date: June 30, 2026

Project path: `/Users/tassanawanpui/Desktop/nexhibit`

## Scope

This audit covered the public marketing site, simulated auth, student portal, employer portal, admin portal, pricing pages, upgrade flow, and prototype billing surfaces.

Evidence sources:

- Static inspection of `src/app`, `src/components`, `src/lib`, layouts, mock data, billing files, theme files, and scripts
- Browser audit across desktop light, desktop dark, and mobile light scenarios
- TypeScript validation with `npx tsc --noEmit`
- Lint validation with `npm run lint`
- Production build validation with `npm run build`
- Route smoke validation with `npm run audit:routes`
- Accessibility checks for headings, labels, unnamed icon buttons, theme controls, logout access, and 375px overflow

Prototype truth:

- The app uses mock data.
- Login/logout is a browser-local demo session only.
- Billing and payments are simulation only.
- QR scanning is simulated.
- Smart Match is rule-based and deterministic.
- There is no production auth, backend database, protected route layer, real ZJUT sync, real payment provider, or real AI recruiting system.

## Executive Findings

| Severity | Finding | Evidence | Fix applied | Remaining limitation |
| --- | --- | --- | --- | --- |
| Critical | Auth looked polished but had no persistent demo session or logout path. | `/login` redirected with toast only; portal headers had avatars but no real logout option. | Added browser-local demo session helpers, role storage, student/employer/admin login redirects, desktop user menus, and mobile logout buttons. | Routes are still not securely protected because there is no real auth/backend. |
| Major | Some high-trust copy implied unsupported AI/payment behavior. | `AI-powered profile suggestions`, `AI suggestions`, and payment surfaces needed clearer mock framing. | Replaced unsupported AI wording with rule-based/smart copy and added "Prototype billing - No real payment is processed" to checkout/payment-method surfaces. | Pricing and billing data remains mocked. |
| Major | Several audited pages had missing labels or headings in responsive states. | Browser audit found hidden mobile `h1` on messages pages, unlabeled message/search fields, unlabeled settings controls, and missing payment-methods heading. | Added stable semantic headings and accessible labels for visible controls. | Radix-generated hidden fields may still appear in overly broad automated scans if hidden fields are not filtered out. |
| Minor | Icon-only carousel controls lacked accessible names. | Homepage audit found 2 unnamed icon buttons. | Added labels to previous/next testimonial controls. | None known. |
| Minor | QA automation was present for screenshots but not route semantics. | `scripts/capture-pages.mjs` existed; no route audit script existed. | Added `scripts/route-audit.mjs` and `npm run audit:routes`. | This is smoke coverage, not full end-to-end testing. |

Final validation:

- `npx tsc --noEmit`: passed
- `npm run lint`: passed
- `npm run audit:routes`: passed, 114 checks, 0 issues
- `SCREENSHOT_BASE_URL=http://localhost:3103 npm run screenshots`: passed, 69 screenshots, 0 failures
- `npm run build`: passed, 51 static pages generated

## Route Audit

| Route | User group | Issues found | Severity | Evidence | Fix applied | Remaining limitations |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Public | Icon-only testimonial arrows lacked names. | Minor | Browser audit: unnamed icon buttons. | Added previous/next quote aria labels. | Mock marketing data remains illustrative. |
| `/about` | Public | No blocking issue in current pass. | Polish | Static/browser route inspection. | No code change needed. | About narrative remains prototype framing. |
| `/success-stories` | Public | Needs continued prototype framing for outcomes. | Major | Prior docs and static copy review. | Existing copy already reframed as prototype outcomes in earlier work. | Stories are not verified real placements. |
| `/login` | Auth | No session storage, no admin role, student redirect went to onboarding, no theme toggle. | Critical | Source inspection of `src/app/login/page.tsx`. | Added demo session role storage, admin tab, role redirects, theme toggle, and clearer prototype notice. | No real authentication or route security. |
| `/signup` | Auth | Theme toggle missing from auth shell. | Minor | Browser audit: theme toggle missing. | Added theme toggle to signup. | Signup remains a locked-field prototype preview. |
| `/pricing` | Pricing | Unsupported AI wording and prototype billing clarity. | Major | Static copy search found "AI suggestions". | Replaced with "Smart suggestions"; billing notices checked. | Prices are mock pricing. |
| `/pricing/student` | Pricing | Hidden/library control could be flagged by naive label checks. | Minor | Browser audit flagged one field from billing toggle. | Added route-audit script that filters non-visible generated fields; visible switch already has label. | Pricing remains mock. |
| `/pricing/employer` | Pricing | Same pricing-toggle generated-field risk. | Minor | Browser audit flagged one field. | No visible control issue found; script adjusted for visible controls. | ROI calculator is illustrative. |
| `/pricing/university` | Pricing | Same pricing-toggle generated-field risk; campus claims must remain prototype. | Minor | Browser/static inspection. | Kept mock endpoint wording. | No real university contract/payment flow. |
| `/student/dashboard` | Student | Needs role clarity/logout after demo login. | Critical | Header audit. | Student header now has role-aware user menu and logout. | Dashboard data is mocked. |
| `/student/onboarding` | Student | Switch-generated fields were flagged by broad audit. | Minor | Browser audit reported unlabeled fields; visible switches already had labels. | Kept labeled switches; documented false-positive risk in QA script. | No real ZJUT data sync. |
| `/student/profile` | Student | No blocking issue in current pass. | Polish | Static inspection. | No new change in this pass. | Profile edits remain local/demo UI. |
| `/student/settings` | Student | Native phone/language/timezone fields and switches needed stronger labels. | Major | Browser audit: unlabeled fields. | Added `id`/`label` links and switch aria labels. | Settings are local UI state only. |
| `/student/events` | Student | No blocking issue in current pass. | Polish | Static/browser inspection. | No new change in this pass. | Bookings are simulated. |
| `/student/events/spring-2026` | Student | No blocking issue in current pass. | Polish | Route inspection. | No new change in this pass. | Event slots are mock data. |
| `/student/event-day` | Student | Prototype QR must remain clear. | Major | Static copy review. | Existing prototype notice kept. | QR badge is not signed or server-verified. |
| `/student/messages` | Student | Mobile could lose visible `h1`; search/composer inputs were placeholder-only. | Major | Browser audit: mobile `h1` count 0 and unlabeled fields. | Added single screen-reader `h1`, converted visible title to paragraph, and labeled search/message inputs. | Messages are local demo interactions. |
| `/student/companies/emp-001` | Student | No blocking issue in current pass. | Polish | Static/browser inspection. | No new change in this pass. | Company profiles use mock company data. |
| `/student/upgrade` | Billing | Needed explicit payment simulation language. | Major | Billing flow inspection. | Added prototype billing wording to upgrade/summary surfaces. | Checkout does not process money. |
| `/student/billing` | Billing | Needed clear prototype billing framing. | Major | Billing page inspection. | Existing "No real payment" copy kept; checkout summary strengthened. | Subscription state is mock/local. |
| `/student/billing/history` | Billing | Status filter and date sort needed stronger labels. | Minor | Browser audit: unlabeled field and unnamed icon button. | Added select and sort button labels. | Receipts are generated demo HTML. |
| `/student/billing/cancel` | Billing | No blocking issue in current pass. | Polish | Route inspection. | No new change in this pass. | Cancellation is a simulated flow. |
| `/employer/dashboard` | Employer | Needs role clarity/logout. | Critical | Header audit. | Employer header now has user menu and logout. | Dashboard metrics are mock. |
| `/employer/browse` | Employer | Broad audit flagged select controls; visible triggers already had names. | Minor | Source inspection showed `aria-label` on main triggers. | No additional change; QA script filters hidden generated controls. | Match/ranking remains rule-based. |
| `/employer/student/stu-001` | Employer | Role-fit select and buttons require continued monitoring. | Minor | Browser audit found one field/button. | Existing visible select label retained; route included in new QA script. | Student dossier is mock data. |
| `/employer/messages` | Employer | Mobile could lose `h1`; search/composer inputs were placeholder-only. | Major | Browser audit: mobile `h1` count 0 and unlabeled field. | Added single screen-reader `h1`, converted visible title to paragraph, and labeled inputs. | Messages are not persisted. |
| `/employer/scanner` | Employer | Manual lookup input and note textarea relied on placeholder-only names. | Minor | Browser audit: unlabeled field. | Added accessible labels. | Scanner is simulated only. |
| `/employer/shortlist` | Employer | No blocking issue in current pass. | Polish | Static/browser inspection. | No new change in this pass. | Pipeline actions are local/demo state. |
| `/employer/upgrade` | Billing | Needed explicit no-payment language. | Major | Billing flow inspection. | Upgrade flow and checkout summary now state prototype billing/no real payment. | No payment provider configured. |
| `/employer/billing` | Billing | Needed logout and prototype clarity. | Major | Header and billing inspection. | Header logout added; billing copy remains demo-mode. | Subscription data is mocked. |
| `/employer/billing/invoices` | Billing | Invoice filters needed accessible labels. | Minor | Browser audit: unlabeled fields. | Added status/type select labels. | Fapiao flow is simulated. |
| `/employer/billing/payment-methods` | Billing | Page lacked an `h1`. | Major | Browser audit: `h1` count 0. | Added visible page heading and prototype billing note. | No real payment methods are saved. |
| `/admin` | Admin | Needs role clarity/logout. | Critical | Header audit. | Admin header now has user menu and logout. | Admin data is mocked. |
| `/admin/events` | Admin | No blocking issue in current pass. | Polish | Static/browser inspection. | No new change in this pass. | Event management is simulated. |
| `/admin/employers` | Admin | Employer review/verification must remain demo-framed. | Major | Static review. | Existing demo framing kept. | No real employer verification workflow. |
| `/admin/billing` | Admin billing | Revenue dashboard must be clearly simulated. | Major | Billing inspection. | Existing simulated wording kept; route included in route audit. | No backend billing records. |
| `/admin/billing/transactions` | Admin billing | Search and filters needed labels. | Minor | Browser audit: unlabeled fields. | Added search/select labels. | CSV export uses mock rows only. |
| `/admin/billing/refunds` | Admin billing | No blocking issue in current pass. | Polish | Route inspection. | No new change in this pass. | Refund operations are mock/demo. |

## Auth And Logout Result

Implemented:

- Browser-local demo session key: `nexhibit-demo-session`
- Stored role: `student`, `employer`, or `admin`
- Login redirects:
  - student: `/student/dashboard`
  - employer: `/employer/dashboard`
  - admin: `/admin`
- Desktop user menus for student, employer, and admin
- Mobile logout buttons in student and employer sheets
- Logout clears demo session, shows a toast, and redirects to `/login`
- Login page states: "Prototype login - No real authentication is used"

Not implemented:

- Real authentication
- Secure cookies/sessions
- Server-side route guards
- Role-based authorization

## Role System Audit

Student:

- Navigation includes dashboard, profile, events, event-day, messages, and billing.
- Header now shows student role/user menu and logout.
- Settings controls have stronger labels.
- Messages are usable on mobile with a stable page heading.

Employer:

- Navigation includes dashboard, browse, scanner, shortlist, messages, and billing.
- Header now shows employer role/user menu and logout.
- Messages and scanner controls have stronger accessible names.
- Match scoring remains clearly rule-based.

Admin:

- Navigation includes overview, employers, events, and billing.
- Header now shows admin role/user menu and logout.
- Billing dashboards remain framed as simulated revenue operations.

Public:

- Public nav has theme toggle and pricing links.
- Auth pages now have theme toggles.
- Success/outcome language must remain prototype-only unless real evidence is added.

## Theme And Visual Audit

The existing theme system supports light, dark, and system modes through root `data-theme` attributes and localStorage. Theme toggles are present in:

- Public navbar and mobile sheet
- Login and signup auth shells
- Student layout and mobile sheet
- Employer layout and mobile sheet
- Admin header
- User menu dropdowns

Remaining watch item:

- Continue testing new pages in both light and dark before presentation screenshots.

## Interaction Speed Audit

Safe fixes applied:

- Demo login now has immediate toast and deterministic routing.
- Logout has immediate toast and redirect.
- Message controls and demo payment controls keep instant local feedback.
- QA script checks console errors and navigation failures.

Remaining limitation:

- The app is still a large animated prototype. It is acceptable for presentation, but route-level performance budgets would be needed for production.

## Mobile Audit

Safe fixes applied:

- Messages pages now retain a semantic `h1` when the conversation list is hidden on mobile.
- Mobile student/employer sheets include theme and logout access.
- QA script checks 375px horizontal overflow.

Remaining limitation:

- Tables remain horizontally scrollable where data density requires it.

## Accessibility Audit

Fixed in this pass:

- Homepage unnamed carousel controls
- Login/signup theme toggle availability
- Student settings field labels and switch names
- Student/employer messages headings and field labels
- Employer scanner field labels
- Billing filter labels and payment-method heading

Remaining limitation:

- This is not a full WCAG audit with screen-reader manual testing. It is a smoke-level accessibility pass.

## Performance Audit

Observations:

- Existing app uses Framer Motion, Recharts, custom visuals, and large route components.
- Build output should continue to be reviewed after each major visual feature.
- No new heavy dependency was added in this pass.

Safe additions:

- Lightweight Playwright route-audit script only.

## Payment And Billing Audit

Fixed in this pass:

- Explicit "Prototype billing - No real payment is processed" copy in upgrade/checkout/payment-method surfaces.
- Removed unsupported AI payment-plan wording.
- Added labels to billing filters.
- Added missing employer payment-methods `h1`.

Remaining limitations:

- No Stripe/Alipay/WeChat/UnionPay provider integration.
- No real invoices, receipts, fapiao, refunds, subscriptions, or payment methods.
- Billing state is mock/demo state only.

## Files Created

- `src/lib/demo-session.ts`
- `src/components/auth/DemoUserMenu.tsx`
- `scripts/route-audit.mjs`
- `docs/DEEP-SYSTEM-AUDIT.md`
- `docs/QA-CHECKLIST.md`

## Files Updated

- `package.json`
- `README.md`
- `docs/PROTOTYPE-LIMITATIONS.md`
- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`
- `src/components/layout/StudentHeader.tsx`
- `src/components/layout/EmployerHeader.tsx`
- `src/components/layout/AdminHeader.tsx`
- `src/components/marketing/TestimonialCarousel.tsx`
- `src/app/student/settings/page.tsx`
- `src/app/student/messages/page.tsx`
- `src/app/employer/messages/page.tsx`
- `src/app/employer/scanner/page.tsx`
- `src/lib/billing/plans.ts`
- `src/app/pricing/page.tsx`
- `src/components/billing/CheckoutSummary.tsx`
- `src/components/billing/UpgradeFlow.tsx`
- `src/components/billing/AddPaymentMethodDialog.tsx`
- `src/components/billing/PaymentMethodCard.tsx`
- `src/components/billing/BillingHistoryTable.tsx`
- `src/app/employer/billing/invoices/page.tsx`
- `src/app/employer/billing/payment-methods/page.tsx`
- `src/app/admin/billing/transactions/page.tsx`

## Remaining Prototype Limitations

See `docs/PROTOTYPE-LIMITATIONS.md` for the source-of-truth limitations list.
