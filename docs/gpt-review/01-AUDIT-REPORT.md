# NEXHIBIT Audit Report

Audit date: June 29, 2026

Verdict: NEXHIBIT is a polished and convincing prototype demo, but its biggest quality risks are not visual. The main weaknesses are credibility, evidence, route semantics, and the gap between what the interface implies and what the system actually does.

## Highest-Priority Findings

### 1. Critical credibility gap: mock content is framed too close to reality

- [src/app/success-stories/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/success-stories/page.tsx) presents `Real outcomes`, but the entire page is hardcoded demo storytelling.
- `story-002` maps `studentId: "stu-003"` to `Ayesha Siddiqui`, while [students.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/mock-data/students.ts) defines `stu-003` as `Ayesha Khan`.
- [src/lib/mock-data/stats.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/mock-data/stats.ts) supplies platform-scale numbers that look factual on marketing surfaces, but the supporting research template is still unfinished.
- About-page claims such as `1,500+ international students at ZJUT`, `5 interviews`, and `0 platforms built specifically for them` are strong statements in [strings.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/copy/strings.ts) without source attribution inside the shipped experience.

Why it matters:
- A reviewer may trust the interface more than the repo reality.
- This is the fastest way for an otherwise strong demo to lose credibility during evaluation.

### 2. High product-truth gap: the app looks much more “real” than the system underneath

- Login is simulated in [src/app/login/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/login/page.tsx).
- Identity is hardcoded in [current-user.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/current-user.ts) and [current-employer.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/current-employer.ts).
- No backend, no route protection, no persistent storage, and no real verification flow were found in `src`.
- QR features are demo-only.
- Matching is deterministic heuristic math in [matching.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/utils-lib/matching.ts), not a validated intelligence layer.

Why it matters:
- None of this is “bad” for a class prototype.
- It becomes a problem only when the UI language implies live trust, verification, or operational reliability without clear demo framing.

### 3. Research handoff is incomplete

- [_prompts/CONTENT-TEMPLATE.md](/Users/tassanawanpui/Desktop/nexhibit/_prompts/CONTENT-TEMPLATE.md) is still largely blank in the exact places that should back the story:
  - team names
  - course name
  - advisor
  - interview demographics
  - evidence-backed insights
  - real stats and citations
- The repo contains polished outputs, but not the research artifact trail needed to defend them.

Why it matters:
- GPT, instructors, or judges evaluating the project may assume the research exists somewhere.
- Right now the repo itself does not support that assumption.

### 4. Accessibility and semantics still need a cleanup pass

Browser-verified issues:
- `/` has two unlabeled icon-only testimonial navigation buttons in [TestimonialCarousel.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/components/marketing/TestimonialCarousel.tsx)
- `/login` renders two `h1` elements
- `/student/dashboard`, `/student/event-day`, and `/employer/dashboard` lacked an `h1` during audit
- `/employer/browse` uses a placeholder-only search field and select triggers that were flagged as unlabeled
- `/employer/messages` has unlabeled icon-only buttons and placeholder-only text inputs
- [src/app/login/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/login/page.tsx) contains a `href="#"` forgot-password placeholder

Why it matters:
- These issues are small compared with the credibility gaps, but they are easy wins before any formal review.

### 5. Documentation and reviewer onboarding are weak

- [README.md](/Users/tassanawanpui/Desktop/nexhibit/README.md) is still the default Next.js starter text.
- There is no concise architecture or “how to evaluate this repo” document outside the files created in this folder.
- There are no tests or CI signals to help an evaluator trust regressions were considered.

## Scorecard

Use these as directional scores, not universal truth:

| Area | Score | Notes |
| --- | --- | --- |
| Visual design and motion polish | 8.5/10 | Strong first impression, cohesive brand, polished screens |
| Product storytelling | 8/10 | Clear reverse-fair concept and strong walkthrough potential |
| Code organization for a prototype | 7/10 | Clean component split and typed mock data, but some large page files |
| UX flow clarity | 7/10 | Student/employer/admin journeys are understandable |
| Accessibility and semantics | 5.5/10 | Mostly stable layouts, but labels/headings still need work |
| Documentation | 4/10 | Real intent lives in prompts, not in project docs |
| Research credibility | 3/10 | Claims are stronger than the visible evidence base |
| Production readiness and security | 2/10 | Deliberately prototype-only: no auth, no persistence, no backend |

## Route Audit Snapshot

Desktop and mobile route checks were run against the local dev app.

Stable positives:
- No horizontal overflow found on sampled key routes at `1280px` and `375px`
- No console errors appeared on the sampled routes during the audit
- Sampled images had alt text

Notable route-level issues:

| Route | Main issue |
| --- | --- |
| `/` | 2 unlabeled carousel nav buttons |
| `/login` | 2 `h1` elements on one page |
| `/student/dashboard` | no `h1` detected |
| `/student/event-day` | no `h1` detected |
| `/employer/dashboard` | no `h1` detected |
| `/employer/browse` | unlabeled/placeholder-only filter and search surfaces |
| `/employer/messages` | unlabeled icon buttons and placeholder-only inputs |
| `/admin/employers` | 1 control flagged as unlabeled |

## Performance Snapshot

Latest `npm run build` on June 29, 2026:

| Route | First Load JS |
| --- | --- |
| `/` | `286 kB` |
| `/employer/student/[id]` | `257 kB` |
| `/admin` | `253 kB` |
| `/student/profile` | `208 kB` |
| Shared | `102 kB` |

Interpretation:
- This is acceptable for a course prototype demo.
- It is not optimized if the team wants to position it as production-ready.

## Reviewer Summary

If this project is judged as a demo prototype, it is good.

If it is judged as a research-backed product concept, it is currently under-evidenced.

If it is judged as a deployable platform, it is intentionally incomplete.

The most honest framing is:

“Strong reverse-career-fair prototype with excellent presentation quality, solid mock UX, and clear product thinking; biggest next step is aligning every high-confidence claim with visible evidence and explicit prototype labeling.”
