# PROMPT M4 — Claude Code

> **Run after M3 verified.** Open Claude Code in `~/Desktop/nexhibit`.

---

# Build NEXHIBIT — Module 4: Admin + Polish + Final Deploy

## Context

Final module. M1-M3 complete. Now adding:
1. University admin section (3rd stakeholder)
2. Public success stories page
3. 404 + error pages
4. Full responsive polish
5. Performance + accessibility audit
6. Final deploy

---

## Tasks

### Task 1: Install Charting Library

```bash
npm install recharts
```

### Task 2: Create Admin Section

**Files to create:**
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx` (Dashboard)
- `src/app/admin/employers/page.tsx`
- `src/app/admin/events/page.tsx`

#### Admin Layout

Same pattern as student/employer layouts but with:
- Navbar with "🏛️ ZJUT Admin Portal" indicator
- Secondary nav: **Dashboard · Employers · Events · Students · Reports**
- Distinct visual cue: thin gold top border on the page to signal "admin" context

#### Admin Dashboard (`/admin`)

**Top:** Welcome strip with current event indicator

**Stats grid (4 cards):**
- Total students registered (487)
- Verified employers (64)
- Successful matches (142)
- Pending verifications (3)

**Charts row:**
- **Chart 1: Student registrations over time** (Recharts LineChart)
  - X-axis: months (Jan 2026 - May 2026)
  - Y-axis: cumulative registrations
  - Use realistic-looking growth curve data
- **Chart 2: Top categories** (Recharts BarChart)
  - 5 categories with counts
  - Gold bars

**Section: Recent activity feed**
- Stream of admin-relevant events: new employer applications, students completing profiles, etc.

**Section: System health**
- Mini cards: Database sync status, Email delivery rate, Active sessions

#### Admin Employers (`/admin/employers`)

Verification queue + employer management.

**Tabs:** Pending verification (3) / Verified (61) / Suspended (0)

**Pending tab:**
- Table of pending applications:
  - Logo / Name / Industry / Applied / Documents / Actions (View / Approve / Reject)
- Click "View" → opens detailed dialog (use shadcn Dialog)
  - Company info
  - Business license (placeholder document image)
  - HR contact details
  - Buttons: Reject (red ghost) / Request more info / Approve (gold)

**Verified tab:**
- Searchable table of all employers
- Columns: Logo / Name / Industry / Size / Active since / Events participated / Actions

#### Admin Events (`/admin/events`)

Event management.

**Header:** "Manage Events" + "+ Create event" button (gold)

**List of events** (cards with admin-specific data):
- Status (Draft / Published / Live / Past)
- Total registrations
- Employer participation
- Quick stats: matches generated, satisfaction score (mock 4.6/5)
- Actions: Edit / Duplicate / Archive / Reports

---

### Task 3: Success Stories Page

**File:** `src/app/success-stories/page.tsx`

This is a public marketing page (no auth required).

**Hero:**
- Caption: "REAL OUTCOMES"
- Heading: "From booth to offer"
- Subheading: "Stories from students who got hired through NEXHIBIT."

**Stories grid (3 columns desktop):**

Create 4 success stories — each is a card with:
- Photo placeholder (gradient with initials)
- Student name + nationality
- Quote (2-3 sentences in italic): tells the story of how they got hired
- Outcome card at bottom:
  - "Hired by: [Company]"
  - "Role: [Job title]"
  - "Time from booth to offer: X days"
- "Read full story" link (visual only)

**Sample stories:**

1. **Nguyen Thi Linh, Vietnam, Year 4 Business**
   - Quote: "I had applied to 30 companies and heard nothing. At my first NEXHIBIT booth, the BYD International team came to me. They asked about my Mandarin learning journey and saw the cross-cultural marketing project I'd built. Two weeks later, I had an offer."
   - Hired by: BYD International Marketing
   - Role: Graduate Marketing Trainee
   - Time: 18 days

2. **Karim Al-Hassan, Egypt, Year 4 Engineering**
   - Quote: "Resumes never showed my real skills. At my booth, I demonstrated my IoT prototype live — the engineer from Bosch China asked if I could start an internship the following month."
   - Hired by: Bosch China
   - Role: R&D Intern → Full-time offer pending
   - Time: 11 days

3. **Bayasgalan Erdene, Mongolia, Year 4 Language**
   - Quote: "I speak 5 languages but no one ever asked. At NEXHIBIT, I met a startup that needed exactly someone who could bridge Mongolia, China, and Russia markets."
   - Hired by: Lingxi AI
   - Role: International Business Development
   - Time: 23 days

4. **Praveen Kumar, India, Year 3 Engineering**
   - Quote: "My Chinese isn't fluent yet. But at my booth, I could show my code and explain my thinking. Pinduoduo's tech lead saw what I could actually do — not just my HSK score."
   - Hired by: Pinduoduo
   - Role: Software Engineering Intern
   - Time: 14 days

**Final CTA section** (gold):
- "Your story could be next."
- Sign up button → /signup

---

### Task 4: Custom 404 Page

**File:** `src/app/not-found.tsx`

Branded 404:
- Big "404" in gold (display size)
- "This page is empty — but our booths aren't."
- Helpful links: Go home / Browse events / Contact support
- Use the same Navbar + Footer

---

### Task 5: Responsive Polish

**Audit and fix:**

For EVERY page (Marketing, Student, Employer, Admin):

1. **Test at 375px (iPhone SE):**
   - No horizontal scroll
   - All text readable (no overlap)
   - Tap targets ≥ 44px
   - Tables convert to cards or scroll horizontally cleanly
   - Sticky elements don't cover content

2. **Test at 768px (iPad):**
   - Layouts adapt (2 columns where appropriate)
   - Navigation doesn't break

3. **Test at 1280px+ (Desktop):**
   - Content centered, max-width container (1280px) on landing
   - White space breathes

**Fix any breakages** found.

---

### Task 6: Microcopy Polish

Replace generic placeholder text with specific, professional copy. Audit:
- Empty states (e.g., "No conversations yet" → "Your conversations with employers will appear here. Start one from any student's profile.")
- Button labels (no generic "Submit" or "OK")
- Form helper text
- Error states

---

### Task 7: Performance + Accessibility

1. **Lighthouse audit:**
   - Run `npm run build && npm run start` then audit
   - Aim for: Performance > 85, Accessibility > 90, SEO > 90, Best Practices > 90

2. **Common fixes:**
   - All images have alt text
   - All form inputs have associated labels
   - Color contrast meets WCAG AA
   - Buttons have descriptive aria-labels where needed
   - Focus visible on all interactive elements

3. **Add meta tags** to layout for SEO:
   ```typescript
   export const metadata = {
     title: { default: "NEXHIBIT", template: "%s · NEXHIBIT" },
     description: "...",
     openGraph: { ... },
   }
   ```

---

### Task 8: Final Polish Checklist

Walk through every route and verify:

**Marketing:**
- [ ] `/` — Landing complete with all sections
- [ ] `/login` — Both tabs work
- [ ] `/signup` — Both tabs work
- [ ] `/about` — All sections render
- [ ] `/success-stories` — 4 stories render

**Student:**
- [ ] `/student/onboarding` — Privacy toggles work
- [ ] `/student/profile` — All 4 tabs work
- [ ] `/student/events` — Lists 4 events
- [ ] `/student/events/[id]` — Detail + booking works
- [ ] `/student/event-day` — QR badge + visitor stream
- [ ] `/student/dashboard` — Stats + activity
- [ ] `/student/messages` — Split view chat
- [ ] `/student/settings` — All sections accessible

**Employer:**
- [ ] `/employer/dashboard` — Stats + quick filters
- [ ] `/employer/browse` — Grid with filters works
- [ ] `/employer/student/[id]` — Detail page
- [ ] `/employer/scanner` — Scanner simulation
- [ ] `/employer/shortlist` — Table renders
- [ ] `/employer/messages` — Chat works

**Admin:**
- [ ] `/admin` — Dashboard with charts
- [ ] `/admin/employers` — Verification queue
- [ ] `/admin/events` — Event management

**Misc:**
- [ ] `/not-found` (try a fake URL) — Custom 404
- [ ] Navbar / Footer consistent everywhere
- [ ] No console errors anywhere
- [ ] No TypeScript errors (`npm run build`)
- [ ] All links navigate correctly (no broken)

---

### Task 9: Final Deploy

```bash
# Run final build to catch issues
npm run build

# If clean, commit and push
git add .
git commit -m "Module 4: Admin + polish + final deploy"
git push
```

Wait for Vercel deployment. Check live URL:
- Open on desktop browser
- Open on actual mobile device (not just DevTools)
- Test 3-4 random flows end to end

---

## Output Report

Final summary with:

1. **Live URL** (primary)
2. **Total routes built** (count)
3. **Lighthouse scores** for the landing page (4 numbers)
4. **Screenshot links** for key pages
5. **Known issues / limitations** if any
6. **Suggested talking points** for the presentation demo — which 3-4 user flows look best to show off

---

## After M4

Once everything is green, we move to **Phase 2 (User Testing)** and **Phase 3 (Presentation Prep)**.
The platform is now ready to demo to user testers AND to feature in your June 5 presentation.
