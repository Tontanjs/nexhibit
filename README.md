# NEXHIBIT

NEXHIBIT is a high-fidelity class-project prototype for a reverse career fair platform for international students at Zhejiang University of Technology.

Instead of students lining up to approach employers, employers walk to student portfolio booths and discover talent with more context.

Presentation framing:

> NEXHIBIT is a polished high-fidelity prototype of a university-backed reverse career fair platform for international students at ZJUT, using mock data to demonstrate how verified profiles, employer discovery, event-day QR interactions, and admin oversight could work in a future real deployment.

## Prototype Status

This is a presentation-ready frontend prototype, not a production system.

- Mock student, employer, event, conversation, and outcome data
- Simulated login and signup flows
- No real authentication
- No protected routes
- No database or backend API layer
- No real ZJUT data sync
- Simulated QR scanner
- Rule-based Smart Match score, not validated recruiting intelligence
- Prototype billing and mock checkout only; no real payment is processed
- Local/demo UI state for actions such as notes, shortlist movement, booking, exports, and messages

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Radix/shadcn-style UI primitives
- Framer Motion
- Recharts
- Sonner
- Vercel Analytics only when `VERCEL === "1"`

## Aurora Visual System

The current interface uses the NEXHIBIT Aurora Studio direction:

- Full `light`, `dark`, and `system` theme support
- Dark premium app shell for student, employer, admin, and presentation-critical flows
- Light premium shell with warm off-white backgrounds, elevated cards, charcoal type, and university-professional readability
- Aurora gradients with controlled purple, blue, cyan, and gold highlights
- Glassmorphism cards and command-center panels
- Neon scanner and event-pass moments for demo-critical flows
- Motion-safe hover, press, and reveal behavior
- Prototype notices on high-trust mock workflows
- Accessible theme toggle in public, student, employer, and admin navigation
- Root `data-theme` attributes, localStorage persistence, `prefers-color-scheme` support, and first-paint theme script

This is a visual and interaction upgrade only. It does not add a backend, real verification, real authentication, real QR scanning, or real AI recruiting intelligence.

## Key Routes

- Marketing: `/`, `/about`, `/success-stories`, `/login`, `/signup`
- Student: `/student/dashboard`, `/student/onboarding`, `/student/profile`, `/student/settings`, `/student/events`, `/student/events/[id]`, `/student/event-day`, `/student/messages`, `/student/companies/[id]`, `/student/coach`, `/student/global`, `/student/live-booth`, `/student/network`
- Employer: `/employer/dashboard`, `/employer/browse`, `/employer/student/[id]`, `/employer/messages`, `/employer/scanner`, `/employer/shortlist`
- Admin: `/admin`, `/admin/events`, `/admin/employers`, `/admin/billing`, `/admin/billing/transactions`, `/admin/billing/refunds`
- Pricing/billing: `/pricing`, `/pricing/student`, `/pricing/employer`, `/pricing/university`, `/student/upgrade`, `/student/billing`, `/employer/upgrade`, `/employer/billing`, `/admin/billing`

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Screenshots

```bash
npm run screenshots
npm run screenshots:light
npm run screenshots:dark
```

If screenshots need a running dev server:

```bash
npm run dev
npm run screenshots
```

See `docs/SCREENSHOT-GUIDE.md` for route coverage and output folders.

## QA

```bash
npm run audit:routes
```

The route audit checks major routes for page load failures, one `h1`, console errors, mobile overflow, theme-toggle access, logout access, visible unlabeled form controls, theme persistence, demo login/logout, and presentation-critical action feedback.

## Documentation

- `docs/CLAUDE-SYSTEM-AUDIT.md` — full codebase audit, route table, strengths, weaknesses, production roadmap
- `docs/PROTOTYPE-LIMITATIONS.md` — explicit list of all intentionally simulated capabilities
- `docs/MASTER-SYSTEM-AUDIT.md` — prior comprehensive audit and upgrade record
- `docs/DEEP-SYSTEM-AUDIT.md` — deep system inventory
- `docs/QA-CHECKLIST.md` — manual QA checklist for all user flows
- `docs/UPGRADE-SUMMARY.md` — upgrade history and change log
- `docs/VISUAL-UPGRADE-SUMMARY.md` — visual and design system changes
- `docs/SCREENSHOT-GUIDE.md` — screenshot automation and route coverage

## Known Limitations

NEXHIBIT intentionally does not implement real auth, database persistence, route protection, signed QR tokens, employer verification, consent logs, audit logs, secure exports, or compliance workflows. Those are production requirements documented in `docs/PROTOTYPE-LIMITATIONS.md`.
