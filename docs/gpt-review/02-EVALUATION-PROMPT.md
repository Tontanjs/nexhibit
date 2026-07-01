# GPT Evaluation Prompt For NEXHIBIT

Use this prompt when you want another GPT run to evaluate the project deeply and suggest improvements without missing the prototype-vs-reality distinction.

---

You are reviewing the project `NEXHIBIT` in `/Users/tassanawanpui/Desktop/nexhibit`.

Before scoring or criticizing anything, read these local files first:

1. [00-GPT-MASTER-CONTEXT.md](/Users/tassanawanpui/Desktop/nexhibit/docs/gpt-review/00-GPT-MASTER-CONTEXT.md)
2. [01-AUDIT-REPORT.md](/Users/tassanawanpui/Desktop/nexhibit/docs/gpt-review/01-AUDIT-REPORT.md)

Then inspect the project itself as needed.

Important constraints:

- Treat NEXHIBIT as a class-project prototype unless the code proves otherwise.
- Do not assume there is real auth, persistence, research evidence, or production security.
- Separate your judgment into `demo quality`, `research credibility`, and `production readiness`.
- Be strict about unsupported claims. If a page sounds real but the repo only supports a mock/demo interpretation, say so clearly.
- Do not punish the project for lacking a backend if the issue is already acknowledged as prototype scope. Do criticize the project if the UI language hides that limitation.
- Prefer source-backed findings over generic product advice.

What the project is supposed to be:

- A reverse career fair platform for international students at Zhejiang University of Technology.
- Main users: students, employers, university admin.
- Core concept: employers come to student booths and review richer profiles before conversation.

Please produce your answer in this structure:

## 1. Executive Verdict

- 1 short paragraph
- State what is strong
- State the single biggest risk

## 2. Scorecard

Score each area from 1-10 with one sentence of justification:

- Visual design
- UX flow
- Code quality for a prototype
- Accessibility
- Documentation
- Research credibility
- Production readiness
- Overall presentation readiness

## 3. Top Findings

List the most important issues first.

For each finding:
- severity: critical / high / medium / low
- why it matters
- evidence from the repo or behavior
- whether it hurts `demo quality`, `credibility`, or `production readiness`

## 4. Best Immediate Improvements

Give the top 5 changes that would improve the project fastest before another evaluation or presentation.

Each item should include:
- impact
- effort
- reason it should happen now

## 5. If This Became A Real Product

Describe the most important architecture, trust, privacy, and data changes required to move beyond prototype status.

## 6. Final Framing Recommendation

Write the exact positioning sentence the team should use when presenting this project honestly.

Extra guidance:

- If you find a mismatch between polished UI claims and repo evidence, prioritize that over cosmetic feedback.
- If you find accessibility issues, be concrete and reference the route or component.
- If you think a page should be relabeled from “real” to “prototype” or “demo,” say exactly which page and wording should change.

---

Optional follow-up prompt:

“Based on your review, generate a presentation-safe rewrite plan that improves trust and clarity without requiring a real backend.”
