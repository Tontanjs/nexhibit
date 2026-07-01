# NEXHIBIT Improvement Backlog

This backlog is split by intent: what should happen before the next evaluation, what improves the prototype meaningfully after that, and what would be required for real productization.

## P0: Before The Next Evaluation Or Presentation

### 1. Relabel or rewrite the success stories page

Goal:
- Remove any suggestion that the current stories are verified real outcomes unless evidence is added.

Actions:
- Change `Real outcomes` to something like `Prototype scenarios` or `Illustrative journeys`
- Fix the `stu-003` name mismatch on the story card
- Add one visible note explaining that the page demonstrates intended outcomes, not validated alumni placements

Primary file:
- [src/app/success-stories/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/success-stories/page.tsx)

### 2. Add explicit prototype disclaimers to high-trust surfaces

Goal:
- Make the demo feel honest without making it feel weaker.

Actions:
- Add short prototype/disclaimer language to:
  - homepage stats
  - ZJUT verification language
  - employer verification language
  - QR badge / scanner explanations
  - admin outcome summaries

Suggested framing:
- “Prototype preview”
- “Illustrative mock cohort”
- “Demo-only workflow”
- “Concept validation metrics”

### 3. Replace unsupported about-page claims or attach visible evidence

Goal:
- Avoid uncited claims during review.

Actions:
- Revisit the problem stats and hero narrative in [strings.ts](/Users/tassanawanpui/Desktop/nexhibit/src/lib/copy/strings.ts)
- Either add real sources to the project docs or rewrite the copy to sound clearly exploratory rather than factual

### 4. Fill or simplify the unfinished research handoff

Goal:
- Close the biggest trust gap in the repo.

Actions:
- Complete [_prompts/CONTENT-TEMPLATE.md](/Users/tassanawanpui/Desktop/nexhibit/_prompts/CONTENT-TEMPLATE.md) with real team, interview, and source info
- If real data is unavailable, add an explicit statement that these sections are still pending and should not be interpreted as complete evidence

### 5. Replace placeholder navigation and dead-link behavior

Goal:
- Remove obvious “unfinished” signals from polished screens.

Actions:
- Replace `href="#"` forgot-password link with a disabled state, modal note, or a real demo-friendly destination

Primary file:
- [src/app/login/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/login/page.tsx)

### 6. Do a fast accessibility cleanup pass

Goal:
- Eliminate the most visible semantics issues before someone audits the UI live.

Actions:
- Add `aria-label` to testimonial carousel arrow buttons
- Add accessible names to icon-only buttons in employer messages
- Add visible labels or screen-reader labels to search/filter controls in employer browse and messages
- Ensure each major page has exactly one meaningful `h1`

Primary files:
- [src/components/marketing/TestimonialCarousel.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/components/marketing/TestimonialCarousel.tsx)
- [src/app/employer/browse/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/employer/browse/page.tsx)
- [src/app/employer/messages/page.tsx](/Users/tassanawanpui/Desktop/nexhibit/src/app/employer/messages/page.tsx)

### 7. Replace the boilerplate README

Goal:
- Make the repo understandable in under 2 minutes.

README should include:
- what NEXHIBIT is
- prototype scope
- stack
- route overview
- how to run it
- current limitations
- where research truth currently lives

Primary file:
- [README.md](/Users/tassanawanpui/Desktop/nexhibit/README.md)

## P1: Improve The Prototype After Presentation Safety Is Handled

### 1. Add page-level metadata

- Unique titles per route
- Better descriptions for student, employer, and admin flows
- Optional Open Graph for a portfolio/demo share link

### 2. Reduce the heaviest route payloads

Focus first on:
- `/`
- `/admin`
- `/student/profile`
- `/employer/student/[id]`

### 3. Add light automated confidence checks

Recommended minimum:
- smoke tests for route rendering
- one a11y pass on critical pages
- CI for lint + build

### 4. Persist key demo actions

Even local-only persistence would improve realism:
- shortlist
- message draft
- notes
- profile edits
- selected filters

### 5. Convert research intent into visible reviewer docs

Create simple docs for:
- interview summary
- evidence sources
- design decisions
- what is mock vs what is real

## P2: If The Team Wants A Real Product, Not Just A Prototype

### 1. Real auth and route protection

- student identity
- employer identity
- admin role separation
- protected dashboards and detail routes

### 2. Real data layer

- database
- CRUD APIs or server actions
- persistent conversations, shortlists, and event records

### 3. Trust and verification system

- employer verification workflow
- student identity/eligibility workflow
- audit trail for admin decisions

### 4. Secure QR architecture

- signed tokens
- expiration rules
- check-in event logging
- anti-spoofing logic

### 5. Legal and ethical cleanup

- logo/trademark permissions
- privacy notice
- consent around student profile exposure
- honest treatment of interview evidence and claims

### 6. Matching transparency and fairness review

- explainable factors
- bias review
- manual override and reviewer notes
- explicit positioning as assistive ranking, not automated hiring truth

## Recommended Order

If time is short, do this order:

1. fix credibility language
2. fill or label evidence gaps
3. patch accessibility basics
4. replace README
5. only then start deeper productization work

## One-Sentence Strategy

Make the prototype slightly less “magic” and much more trustworthy. That change will improve the evaluation more than adding another flashy feature.
