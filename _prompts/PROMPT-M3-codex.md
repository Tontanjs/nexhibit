# PROMPT M3 — Codex CLI

> **Run after M2B verified.** Use Codex CLI in `~/Desktop/nexhibit`.

---

# NEXHIBIT — Module 3: Employer Flow

## Project Context

Existing Next.js 15 + Tailwind v4 + shadcn project. Design system, brand components, and mock data already in place.

**Read first to understand conventions:**
- `src/app/globals.css` — design tokens
- `src/app/student/layout.tsx` — example of role-specific layout pattern
- `src/lib/mock-data/students.ts` — student data we'll display to employers
- `src/lib/mock-data/employers.ts` — employer data

---

## Pages to Build (6 files + 1 layout)

1. `src/app/employer/layout.tsx` — Employer portal layout
2. `src/app/employer/dashboard/page.tsx`
3. `src/app/employer/browse/page.tsx`
4. `src/app/employer/student/[id]/page.tsx`
5. `src/app/employer/scanner/page.tsx`
6. `src/app/employer/shortlist/page.tsx`
7. `src/app/employer/messages/page.tsx`

Also create:
- `src/lib/current-employer.ts` — exports `currentEmployer = employers[0]`

---

## 1. Employer Layout

Similar pattern to student layout:
- Existing Navbar but with "Employer Portal" indicator + employer avatar/dropdown on right
- Secondary nav: **Dashboard · Browse Talent · Scanner · Shortlist · Messages**
- Existing Footer

Visual difference from student portal:
- Secondary nav background slightly different tone (ink-100 instead of surface-0) so it feels like a separate "section" of the app
- Active link still uses gold

---

## 2. Dashboard (`/employer/dashboard`)

**Purpose:** Employer's home screen — overview of their NEXHIBIT activity.

**Top:**
- Welcome strip: "Welcome back, [employer name]. Spring Career Fair starts June 15."
- "Verified employer" badge

**Stats row (4 cards):**
- Profiles viewed (this cycle)
- Saved to shortlist
- Messages sent
- Booth visits scheduled

**Section: Upcoming Event Block**
- Big banner card for the next event (June 15)
- Stats: X students in your hiring categories, Y new this week
- 2 CTAs: "Browse talent" + "View event details"

**Section: Quick filters**
- Title: "Find students by..."
- 4 filter chip groups (clickable cards):
  - By category: Business / Engineering / Health / Language
  - By language: English / Mandarin (HSK 5+) / Multilingual
  - By year: Final year / Pre-final / All years
  - By type: Internship-ready / Full-time / Both

Clicking any chip navigates to /employer/browse with that filter pre-applied.

**Section: Recent activity feed**
- Timeline of recent actions: "You saved [Student] · 2h ago" / "[Student] viewed your company profile · 1d ago"
- 6-8 mock entries

---

## 3. Browse Talent (`/employer/browse`)

**Purpose:** Search and filter through student profiles. Most important employer page.

**Layout:**
- Left sidebar (280px): Filters
- Main area: Profile grid

### Left Sidebar — Filters

Sticky. Sections:

**Category** (radio): All / Business / Engineering / Health / Language / Other

**Skills** (multi-select chips, scrollable): Show 12 common skills as toggleable pills — Python, React, Machine Learning, Marketing, Data Analysis, Mandarin (HSK 5+), Project Management, etc.

**Year of study** (checkboxes): Year 1 / Year 2 / Year 3 / Year 4

**Languages** (checkboxes): English Fluent / Mandarin HSK 4+ / Mandarin HSK 5+ / Multilingual

**GPA range** (range slider): 3.0 - 4.0

**Looking for** (radio): All / Internship / Full-time / Both

**Verified by ZJUT** (toggle, default on, locked): "All profiles are ZJUT-verified ✓"

**Clear all** + **Apply** buttons at bottom.

### Main Area — Profile Grid

**Header bar:**
- Search input (placeholder: "Search by name, skill, project...")
- Sort dropdown: Best match / Most active / Newly joined / GPA high to low
- View toggle: Grid / List
- Result count: "Showing 12 of 487 students"

**Skill-Position Matching banner** (subtle, dismissable):
- Icon + "Smart matching: We highlight students with skills matching your hiring categories"

**Grid (3 columns desktop, 2 tablet, 1 mobile):**

Each student card:
- Top right: "92% match" badge (gold, with progress ring) — this is the Skill-Position Matching feature
- Avatar circle (initials)
- Name + small flag emoji of nationality
- "Verified by ZJUT" small badge
- Major + Year
- 3-4 skill tags
- 1-line headline/bio
- Bottom row: GPA · HSK · "Looking for: Internship"
- Hover: card lifts subtly + "View profile →" link appears
- Top-right corner: bookmark icon (toggles save to shortlist)

Use all 12 students from mock data. Calculate "match percentage" deterministically based on a few rules (e.g., category match = +40%, skill overlap = +5% each, English fluency = +10%) so it looks realistic. Vary scores 65-95%.

---

## 4. Student Detail (`/employer/student/[id]`)

**Purpose:** Deep dive into a student's profile.

**Layout:**
- Hero strip at top (light, ink-100): Avatar (large), name, headline, "Verified by ZJUT" badge
  - Right side: Action buttons row — "Save to shortlist" (gold), "Send message" (outline), "Schedule meeting" (ghost)
  - Match score (large): "92% match for your hiring criteria"

**Body in 2 columns:**

### Main Column (70%)

**About:**
- Bio paragraph

**Skills section:**
- All skills as tags, with proficiency indicator (visual bar)

**Projects (showcase):**
- 2-3 project cards, each with:
  - Title + tech tags
  - Description (2-3 sentences)
  - Link/demo button
  - "Featured" pin if applicable

**Academic record:**
- GPA card with "Verified by ZJUT" badge
- Courses completed
- Awards

**Languages:**
- Visual bars: English (Fluent), Mandarin (HSK 4 — Intermediate), [native]

**Activities:**
- List of clubs/volunteer with brief descriptions

### Sidebar (30%, sticky)

**Quick info card:**
- Looking for: Internship / Full-time
- Available from: Date
- Preferred locations: Hangzhou, Shanghai, Remote

**Contact preferences:**
- "Responds within: 24 hours"
- "Preferred channel: In-app messaging"

**Similar profiles:**
- 3 mini profile cards (other students in same category)

**Recent activity:**
- "Active 2 hours ago"
- "Updated portfolio 3 days ago"
- "Booked booth for June 15 event"

---

## 5. Scanner (`/employer/scanner`)

**Purpose:** QR scanner used during live events to save a student's profile by scanning their booth QR.

**Layout:**
- Centered, max-width 540px
- Big centered card

**Components:**

**Scanner area (square, 320x320):**
- Black background
- Animated scanning line (CSS animation — bar moving up/down)
- Corner brackets in gold
- Helper text: "Point your camera at the student's QR badge"
- Button: "Open camera" (in real app would activate camera — for prototype, on click → show success state)

**Below scanner:**
- "Or enter booth code manually"
- Input field with placeholder "B-23"
- Button: "Look up"

### Success State (after "Open camera" or "Look up" clicked)

Replace scanner view with:
- Big green checkmark animation (CSS)
- "Profile saved!"
- Student preview card (mini): avatar + name + major + 3 top skills + match score
- 3 buttons:
  - "View full profile" → /employer/student/[id]
  - "Add quick note" (opens dialog)
  - "Scan another"

### Recently Scanned (below)
- Section header: "Today's scans (8)"
- Horizontal scrollable list of mini profile thumbnails
- Each: avatar + initials + name (truncated)

---

## 6. Shortlist (`/employer/shortlist`)

**Purpose:** Manage saved students.

**Layout:**
- Top: Heading + stats row
  - Total saved: 14
  - In active conversation: 6
  - Interviews scheduled: 2
- Filter tabs: All / Not contacted / In conversation / Interview scheduled / Archived
- Search bar
- Table view + Card view toggle

**Table View:**
Columns: Checkbox · Student (avatar + name) · Category · Match % · Status · Last activity · Actions (message / archive / remove)

**Card view:**
Larger cards with more info per student.

Bulk actions row appears when selections made: "Send message to selected" / "Tag" / "Archive" / "Remove"

Use 8-10 students from mock data, with varied statuses.

---

## 7. Messages (`/employer/messages`)

Same structure as student messages but reverse perspective:
- Conversations with multiple students
- Show employer's outgoing messages right-aligned
- Conversation list shows student avatars
- Include status indicators: "Replied" / "Awaiting reply" / "Unread"

Default open conversation with the same student used in student messages page, but from employer side.

---

## Implementation Standards

- All pages use existing `employer/layout.tsx`
- Reuse shadcn components and existing design tokens
- Mobile responsive (test 375px)
- All interactive elements work visually
- No backend — state is local React state only
- Use lucide-react for icons consistently

---

## Acceptance Criteria

1. ✅ All 6 routes accessible from secondary nav
2. ✅ Browse filters change displayed grid (visual feedback)
3. ✅ Student cards show match percentages
4. ✅ Bookmark icon toggles state
5. ✅ Student detail page shows all sections with mock data
6. ✅ Scanner has working "scan" simulation (click → success state)
7. ✅ Shortlist table renders with all columns
8. ✅ Messages split-view works
9. ✅ Mobile responsive
10. ✅ No console / TypeScript errors

---

## Deploy

```bash
git add .
git commit -m "Module 3: Employer flow"
git push
```

Verify all employer routes work on live URL.
