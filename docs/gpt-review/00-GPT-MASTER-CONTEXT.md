# NEXHIBIT GPT Review Context

Audit snapshot: June 29, 2026

Project path: `/Users/tassanawanpui/Desktop/nexhibit`

Git snapshot:
- Branch: `main`
- Status during audit: clean working tree
- HEAD: `c0b9ea2` — `Upgrade employer portal recruiting experience`
- Remote: [github.com/Tontanjs/nexhibit](https://github.com/Tontanjs/nexhibit)
- Prompted deploy target: [nexhibit-nine.vercel.app](https://nexhibit-nine.vercel.app)

Use this file as the single source of truth before asking GPT to critique, score, or improve the project.

## 1. Product Truth

- NEXHIBIT is a reverse career fair platform for international students at Zhejiang University of Technology (ZJUT).
- The core idea is that employers visit student booths instead of students lining up to pitch employers.
- The intended personas are students, employers, and university admin.
- This is a class-project prototype, not a production product.
- The original planning prompts explicitly state that all data is mocked and there is no real backend.
- The planning docs target a presentation on June 5, 2026. The audit in this folder was prepared on June 29, 2026.

Primary source files:
- [_prompts/PROMPT-M1.md](/Users/tassanawanpui/Desktop/nexhibit/_prompts/PROMPT-M1.md)
- [_prompts/00-START-HERE.md](/Users/tassanawanpui/Desktop/nexhibit/_prompts/00-START-HERE.md)

## 2. What GPT Must Not Assume

- There is no real authentication system.
- There is no database, API layer, or persistent backend.
- There are no protected routes or role-based guards.
- QR scanning is simulated, not cryptographically secure or production-safe.
- Match scores are deterministic heuristics, not validated AI or real recruiting intelligence.
- Most user actions are local UI state only and reset on refresh.
- Several credibility-heavy claims are presented as polished product copy but are still mock/demo content.

Critical source files:
- [src/lib/current-user.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/current-user.ts)
- [src/lib/current-employer.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/current-employer.ts)
- [src/app/login/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/login/page.tsx)
- [src/lib/utils-lib/matching.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/utils-lib/matching.ts)

## 3. Stack And Architecture

- Framework: Next.js 15 App Router
- UI: React 19, TypeScript, Tailwind v4, Radix/shadcn-style primitives
- Motion: Framer Motion, Lenis, custom cursor and transitions
- Charts and UI extras: `recharts`, `lucide-react`, `sonner`
- Analytics: Vercel Analytics only when `VERCEL === "1"`
- Metadata: one root title and description only, no route-level Open Graph or richer SEO metadata

Relevant files:
- [package.json](/Users/tassanawanpui/Desktop/nexhibit/package.json)
- [src/app/layout.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/layout.tsx)
- [src/app/globals.css](/Users/tassanawanpui/Desktop/nexhibit/src/app/globals.css)

## 4. Route Map

Marketing and auth:
- `/`
- `/about`
- `/success-stories`
- `/login`
- `/signup`

Student:
- `/student/dashboard`
- `/student/onboarding`
- `/student/profile`
- `/student/settings`
- `/student/events`
- `/student/events/[id]`
- `/student/event-day`
- `/student/messages`
- `/student/companies/[id]`

Employer:
- `/employer/dashboard`
- `/employer/browse`
- `/employer/student/[id]`
- `/employer/messages`
- `/employer/scanner`
- `/employer/shortlist`

Admin:
- `/admin`
- `/admin/events`
- `/admin/employers`

Production build currently generates 32 app routes, with static, SSG, and dynamic pages.

## 5. Data Shape And Mock Inventory

- Source data lives mainly in [src/lib/mock-data](/Users/tassanawanpui/Desktop/nexhibit/src/lib/mock-data).
- Current mock cohort includes 30 students, 8 employers, and 4 events.
- Marketing stats are hardcoded in [src/lib/mock-data/stats.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/mock-data/stats.ts):
  - `487` students
  - `64` employers
  - `142` successful matches
  - `2` events per year
  - `38` countries represented
  - `100%` verification rate
  - `8 hours` average response time
  - `16` average days to offer
- Public assets include 30 student portraits, 8 employer logos, and 4 event images under [public/assets](/Users/tassanawanpui/Desktop/nexhibit/public/assets).

## 6. State, Auth, And Persistence Reality

- Logged-in identity is hardcoded to the first student and first employer:
  - [src/lib/current-user.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/current-user.ts)
  - [src/lib/current-employer.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/current-employer.ts)
- Login is simulated with a toast, a short timeout, and a `router.push`.
- Signup is a prototype preview with locked fields and explicit demo language.
- Shortlists, notes, filters, messages, and scanner interactions are mostly local state only.
- The only clearly persistent client behavior found during audit is motion preference in localStorage.

## 7. Matching And Ranking Logic

Student-employer match score in [src/lib/utils-lib/matching.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/utils-lib/matching.ts):
- Base starts at `50`
- Category match adds `25`
- Skill overlap adds up to `24`
- English fluency adds `6`
- HSK 5+ adds `8`
- Deterministic offset adds `-3` to `+3`
- Final score is clamped to `65–95`

Implication:
- Scores are presentation-friendly heuristics.
- They should not be described as real AI ranking, predictive hiring signals, or validated fit scoring.

## 8. Credibility And Research Constraints

These are the most important context items for any honest evaluation:

- [src/app/success-stories/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/success-stories/page.tsx) labels the page with `Real outcomes`, but the stories are hardcoded demo stories.
- Story `story-002` uses `studentId: "stu-003"` but shows the name `Ayesha Siddiqui`, while the student dataset for `stu-003` is `Ayesha Khan`.
- About-page problem stats and narrative are polished, but the supporting research template is still mostly blank.
- The research/content handoff file [CONTENT-TEMPLATE.md](/Users/tassanawanpui/Desktop/nexhibit/_prompts/CONTENT-TEMPLATE.md) still contains blank team info, blank interview demographics, blank evidence fields, blank statistics sources, and placeholders for key presentation hooks.
- The app uses real company names and branding references such as Alibaba Cloud, BYD, Bosch, and SHEIN without any visible legal/permission note.
- ZJUT verification language is presented strongly across the product, but there is no real verification system underneath.

## 9. Documentation Gaps

- [README.md](/Users/tassanawanpui/Desktop/nexhibit/README.md) is still the default `create-next-app` README.
- There is no project-level architecture overview for reviewers.
- There are no tests, test snapshots, QA instructions, or CI workflows in the repository.
- The `_prompts` folder contains the real product intent, but that intent has not been converted into concise project documentation for outside reviewers.

## 10. Quality Evidence Gathered During This Audit

Code and repo:
- Source footprint: about `16,136` lines across `src`
- Largest files:
  - `students.ts` `1209` lines
  - `strings.ts` `994` lines
  - `student/profile/page.tsx` `703` lines
- Repo size during audit: about `1.4G`
- `public/assets`: about `5.6M`
- `.git`: about `8.8M`
- `.next`: about `864M`
- `node_modules`: about `523M`

Verification runs:
- `npm run lint` passed during earlier audit steps
- `npm run build` passed on June 29, 2026

Latest production-build highlights:
- `/` first load JS: `286 kB`
- `/employer/student/[id]` first load JS: `257 kB`
- `/admin` first load JS: `253 kB`
- `/student/profile` first load JS: `208 kB`
- Shared first load JS: `102 kB`

Browser-verified behavior:
- No horizontal overflow was found on sampled key routes at desktop `1280px` or mobile `375px`
- All sampled routes reused the same document title because metadata is only defined once at the root layout
- Homepage had two unlabeled icon-only carousel buttons
- `/login` has two `h1` elements
- `/student/dashboard`, `/student/event-day`, and `/employer/dashboard` lacked an `h1` in the browser audit
- Employer browse and employer messages surfaced the biggest accessibility/labeling issues

## 11. Browser Audit Highlights

Homepage:
- Strong visual polish
- No overflow
- Two unlabeled carousel navigation buttons in [src/components/marketing/TestimonialCarousel.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/components/marketing/TestimonialCarousel.tsx)

Employer browse:
- Dense and impressive as a demo
- Search input relies on placeholder text
- Several select triggers were flagged as unlabeled in the browser audit
- Likely the most interaction-heavy employer page

Employer messages:
- Search and compose inputs rely on placeholder text
- At least two icon-only buttons lack accessible names

Admin:
- Pages are visually coherent and stable
- Employer accounts page surfaced one unlabeled control in the browser audit

## 12. Evidence Confidence

Observed directly:
- Code structure
- Content copy
- Build output
- Route inventory from the build
- Browser behavior on sampled desktop and mobile routes

Reasonable inference:
- The product is strong as a presentation prototype but not honest enough yet for real-world claims without more disclaimers
- Several polished claims are ahead of the evidence actually stored in the repo

Still missing:
- Real interview transcripts or validated source notes
- Real team names, course name, and advisor attribution
- Legal clearance for company names/logos
- Any real security review
- Any reliable dependency vulnerability result, because `npm audit` is blocked by the configured registry mirror

## 13. Known Tooling Caveat

`npm audit --omit=dev` could not complete because the configured registry is `https://registry.npmmirror.com`, and that registry returned a not-implemented error for the advisories endpoint. GPT should not assume dependency health was confirmed just because no advisories were listed.

## 14. Best Evaluation Lens For GPT

Ask GPT to judge this project on three separate layers, not one blended score:

1. Demo quality
2. Product credibility and research integrity
3. Production readiness

If GPT mixes those layers together, the review will become misleading. NEXHIBIT is strong on presentation polish, mixed on code quality, weak on evidence-backed claims, and intentionally incomplete as a real product.
