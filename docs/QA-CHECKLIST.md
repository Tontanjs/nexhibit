# NEXHIBIT QA Checklist

Use this checklist before demo, deploy, or presentation review.

## Automated Smoke Checks

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Run `npm run audit:routes`
- [ ] Optional: run `npm run screenshots`
- [ ] Optional: run `npm run screenshots:light`
- [ ] Optional: run `npm run screenshots:dark`

## Public And Auth

- [ ] `/` loads with one clear `h1`
- [ ] Public navbar links work
- [ ] Theme toggle works in public desktop nav
- [ ] Theme toggle works in public mobile sheet
- [ ] `/about` loads and keeps prototype-safe claims
- [ ] `/success-stories` does not imply verified real outcomes
- [ ] `/login` has one `h1`
- [ ] `/login` shows "Prototype login" notice
- [ ] Login as student redirects to `/student/dashboard`
- [ ] Login as employer redirects to `/employer/dashboard`
- [ ] Login as admin redirects to `/admin`
- [ ] `/signup` shows locked/demo fields and does not imply real account creation

## Student Flow

- [ ] Student header shows logo, Student Portal, user menu, theme control, and logout
- [ ] `/student/dashboard` communicates next steps
- [ ] Career readiness card shows profile strength, event readiness, visible fields, and the eight-item checklist
- [ ] Post-event report is explicitly labeled as mock analytics
- [ ] `/student/onboarding` labels ZJUT verification as demo-only
- [ ] Onboarding switches are keyboard accessible
- [ ] `/student/profile` profile sections and privacy controls are clear
- [ ] Demo pitch builder switches between 30-second, 2-minute, and project-walkthrough drafts
- [ ] Pitch copy/save controls give immediate feedback
- [ ] Portfolio evidence cards show problem, solution, role, tools, evidence, outcome, learning, and recruiter talking point
- [ ] Project pin/edit/remove actions update local state or show feedback
- [ ] Employer preview exposes dialog semantics and does not create a second page `h1`
- [ ] `/student/settings` phone, language, timezone, and switches have labels
- [ ] Save settings shows demo feedback
- [ ] `/student/events` loads event cards
- [ ] `/student/events/spring-2026` supports selecting a slot and gives feedback
- [ ] `/student/dashboard` feedback filters update instantly and expose pressed state
- [ ] Feedback reply, notes, addressed, and career-action controls show demo toasts
- [ ] Employer Feedback Summary is readable in light/dark themes at 375px and 1440px
- [ ] `/student/event-day` shows QR as simulated/demo
- [ ] QR dialog fills the mobile viewport, shows consent context, and labels its download as a demo
- [ ] `/student/messages` has one heading on desktop and mobile
- [ ] Student message search and composer have accessible names
- [ ] Student logout clears demo session and redirects to `/login`

## Employer Flow

- [ ] Employer header shows logo, Employer Portal, user menu, theme control, and logout
- [ ] `/employer/dashboard` shows recruiting status
- [ ] `/employer/browse` filters/search are fast and labeled
- [ ] Student cards link to `/employer/student/stu-001`
- [ ] `/employer/student/stu-001` explains rule-based match score
- [ ] Match explanation covers category, skills, language, availability, location, role, hiring focus, and follow-up likelihood
- [ ] Shortlist action gives visible feedback
- [ ] `/employer/scanner` labels scanner as simulated
- [ ] Manual scanner lookup accepts `stu-001`
- [ ] Invalid scanner lookup shows a helpful error
- [ ] `/employer/shortlist` supports local pipeline movement
- [ ] `/employer/messages` has one heading on desktop and mobile
- [ ] Employer quick replies use real labels, not placeholders
- [ ] Employer logout clears demo session and redirects to `/login`

## Admin Flow

- [ ] Admin header shows logo, Admin Portal, user menu, theme control, and logout
- [ ] `/admin` loads charts/cards without console errors
- [ ] `/admin/events` demo management actions give feedback
- [ ] `/admin/employers` makes employer verification status clear and prototype-safe
- [ ] Employer status uses reviewed/pending demo language rather than claiming real verification
- [ ] `/admin/billing` labels revenue as simulated
- [ ] `/admin/billing/transactions` search/filter controls are labeled
- [ ] Admin logout clears demo session and redirects to `/login`

## Pricing And Billing

- [ ] `/pricing` loads with one `h1`
- [ ] Student/employer/university pricing routes load
- [ ] Monthly/yearly toggle works
- [ ] Pricing copy does not claim real AI, real outcomes, or real payment processing
- [ ] `/student/upgrade` says prototype billing/no real payment
- [ ] `/employer/upgrade` says prototype billing/no real payment
- [ ] Payment method selection is keyboard accessible
- [ ] Mock checkout success does not imply real charging
- [ ] Receipt/invoice/fapiao surfaces are demo-labeled
- [ ] `/student/billing` and `/employer/billing` explain simulated subscription data
- [ ] `/employer/billing/payment-methods` has a clear `h1`
- [ ] Cancel flow is safe and prototype-only

## Theme

- [ ] Light mode persists after refresh
- [ ] Dark mode persists after refresh
- [ ] System mode follows OS preference
- [ ] Theme switching does not reload the page
- [ ] Public pages are readable in both themes
- [ ] Student app pages are readable in both themes
- [ ] Employer app pages are readable in both themes
- [ ] Admin app pages are readable in both themes
- [ ] Billing forms/cards remain readable in both themes

## Mobile

- [ ] Check 375px width for `/`, `/login`, `/student/dashboard`, `/student/messages`, `/employer/browse`, `/employer/messages`, `/employer/scanner`, `/admin`, and billing pages
- [ ] Reduced-motion helper does not obscure mobile content
- [ ] No horizontal overflow at 375px except intentional table scroll areas
- [ ] Mobile nav labels are not clipped
- [ ] Mobile sheets expose theme and logout where relevant
- [ ] Message composer remains usable on mobile
- [ ] Scanner layout remains usable on mobile
- [ ] Billing/pricing cards stack cleanly

## Accessibility

- [ ] Each route has exactly one visible or screen-reader `h1`
- [ ] Icon-only buttons have accessible names
- [ ] Search inputs are labeled
- [ ] Message composers are labeled
- [ ] Select controls are labeled
- [ ] Switches have clear names
- [ ] Focus rings are visible
- [ ] Disabled buttons look disabled
- [ ] Status badges are not color-only when meaning matters
- [ ] Dialogs have titles/descriptions

## Performance

- [ ] Clicks feel immediate
- [ ] Hover states are smooth
- [ ] Mobile scrolling is smooth
- [ ] No console errors on primary routes
- [ ] Build output does not show unexpected route size spikes
