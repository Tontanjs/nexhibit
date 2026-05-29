# PROMPT M2A — Claude Code

> **Run after M1 verified.** Open Claude Code in `~/Desktop/nexhibit`, paste below.

---

# Build NEXHIBIT — Module 2A: Student Core Flows

## Context

This continues the NEXHIBIT project. Module 1 (Foundation + Marketing) is already complete. The design system, mock data, layouts, and brand components are in place.

**Reuse:** All existing design tokens, components, and conventions from M1. Do NOT redefine the design system or change brand colors. Reference `globals.css`, `Logo`, `VerifiedBadge`, `Navbar`, `Footer`, and mock data files.

**Goal:** Build the core student-facing pages where students set up their profiles and book event slots.

---

## Pages to Build

1. `/student/onboarding` — ZJUT verification + privacy controls
2. `/student/profile` — Profile builder with tabs
3. `/student/events` — Browse events
4. `/student/events/[id]` — Event detail + booking

---

## Shared Student Layout

Create `src/app/student/layout.tsx` that wraps all `/student/*` pages with:
- The existing `Navbar` (but show "Student Portal" indicator + user avatar dropdown on right instead of Log in / Sign up)
- A secondary nav strip below the navbar with student-specific links: **Profile · Events · Event Day · Dashboard · Messages**
- The existing `Footer`
- Add a mock "current user" object — use the first student from mock-data as the logged-in user (`stu-001`)

The secondary nav highlights the active route in gold.

---

## 1. `/student/onboarding`

**Purpose:** First-time setup flow after signup. User chooses what to share with employers.

**Layout:** Centered card on surface-50 background, max-width 720px, padding generous.

**Structure:**

**Top:** Progress bar showing 3 steps — "Verify · Customize · Done" (currently step 2)

**Header:**
- Big checkmark in success-color circle
- "Verified by ZJUT" heading
- Subheading: "We synced your academic record. Choose what employers will see."

**Body — Privacy Controls:**
3 sections (use shadcn Card for each), each with toggle switches:

**Section 1: Personal Information**
- Always visible (locked, no toggle): Name, Nationality, Year, Major, Profile Photo
- Caption: "Required for matching"

**Section 2: Academic Data (auto-imported from ZJUT)**
Each row: label · toggle switch · value preview · helper text
- ☑️ GPA — `3.7 / 4.0` — "Shown to employers who filter by academic performance"
- ☑️ Major courses completed — `18 courses` — "Helps employers see your specialization"
- ☑️ Academic awards — `2 awards` — "Showcases recognition"
- ☑️ Class ranking — `Top 15%` — "Optional — shown only if you enable"
- ☐ Disciplinary record — `Clean` — "Off by default — most students keep this private"

**Section 3: Behavioral Data**
- ☑️ Activities & clubs — `4 activities` — "Shows you're engaged beyond academics"
- ☑️ Volunteer experience — `3 records` — "Demonstrates commitment"
- ☐ Attendance rate — `94%` — "Off by default"

Each toggle row has subtle hover state. Default checked = green dot, unchecked = gray.

**Bottom:**
- Helper text: "You can change these anytime in Settings → Privacy."
- Two buttons: Secondary "Customize later" + Primary gold "Save preferences →" that navigates to `/student/profile`

---

## 2. `/student/profile` — Profile Builder

**Purpose:** Where students build the profile employers will see.

**Layout:**
- Container max-width 1200px
- Left sidebar (280px, sticky): preview of current profile (mini version) + "Profile Strength" meter showing 73% — bar in gold
- Main area: Tabs

**Tabs (use shadcn Tabs):** "Personal" · "Academic" · "Portfolio" · "Preview as employer"

### Tab: Personal

Form sections:
- **Avatar:** Upload area (drag-drop dummy, just shows a placeholder) + current avatar (initials in gold-50 background)
- **Display name:** input
- **Headline:** input (placeholder: "e.g., Software Engineer specializing in cross-cultural product design") + character counter (max 100)
- **Bio:** textarea (max 280 chars, counter)
- **Languages:** multi-select chips. Pre-populated: English (Fluent), Mandarin (HSK 4). Add language button.
- **Contact preference:** Radio — "In-app messaging only" / "In-app + Email" / "All channels"
- Save button (sticky at bottom of section)

### Tab: Academic

- **GPA card** (read-only, "Verified by ZJUT" badge): 3.7 / 4.0
- **Courses completed:** Read-only list of 5 courses (use plausible CS/Business course names)
- **Awards:** 2 items, each with title + year + description
- **Class ranking:** Read-only badge: Top 15%

All visually marked as "Synced from ZJUT" with small icon, can't be edited (just toggled visibility in privacy settings).

### Tab: Portfolio

This is the showcase tab — most important for the "tangible work" message.

**Section: Projects** (use Card grid, 2 columns desktop)
- 2-3 sample project cards (pre-populated from mock data):
  - Each: thumbnail (gradient placeholder with project initial), title, description (2 lines, truncated), tech tags
  - Hover: edit/delete icons appear
- "+ Add project" card at end (dashed border, gold accent)

**Section: Files & Links**
- List of mock items:
  - 📄 Resume.pdf (uploaded May 2026) — Download / Replace
  - 🎥 Demo video — YouTube link
  - 🔗 Personal portfolio — yourdomain.com
  - "+ Add link" button
- "+ Upload file" button

**Section: Skills**
- Tag input: skills as removable pills (gold background on hover)
- Pre-populated from mock data (current student's skills)

### Tab: Preview as employer

Shows what an employer sees when viewing this profile. Same layout as `/employer/student/[id]` (which we'll build later — for now, just render the static preview).

Include a small bar at top: `"👁️ Preview mode — this is what employers see"` with "Back to edit" button.

---

## 3. `/student/events`

**Purpose:** Browse upcoming and past events. Book slot for upcoming.

**Layout:**
- Page header: Heading "Career Events" + subheading "Two events per year. Each event has 80-100 booth slots split across categories."
- Filter row: Tabs — "Upcoming" (default) / "Past" / "All"
- Cards grid: 3 columns desktop, 2 tablet, 1 mobile

**Event Card:**
- Cover banner (gradient placeholder with event date overlaid)
- Status badge: "Upcoming" (gold), "Ongoing" (success green), "Past" (ink-400 gray)
- Title (H3)
- Date + location (with calendar/pin icons)
- Description (2 lines, truncated)
- Stats row at bottom: "X / Y slots booked" with progress bar + "X employers registered"
- CTA button:
  - Upcoming: "View & Book →" (gold)
  - Ongoing: "Enter event"
  - Past: "View results" (ghost)

Use the 4 events from mock data.

---

## 4. `/student/events/[id]`

**Purpose:** Detail view + slot booking flow.

**Layout:**
- Hero banner with event cover + title + date + location
- "Verified by ZJUT" badge top right
- 2-column body:
  - Main column (75%): Tabs — "Overview" / "Registered Employers" / "Booth Layout"
  - Sidebar (25%): Booking widget (sticky)

### Tab: Overview

- "About this event" — paragraph
- "Schedule" — Timeline:
  - 9:00 - Opening
  - 10:00 - First booth session
  - 12:00 - Lunch break
  - 13:00 - Second booth session
  - 17:00 - Networking + closing
- "What to prepare" — checklist of 5 items
- "Categories & slots":
  - Business: 30 slots
  - Engineering: 30 slots
  - Health: 10 slots
  - Language: 10 slots
  - Other: 10 slots

### Tab: Registered Employers

Grid of 8 employer cards (use mock-data/employers.ts):
- Logo letter in colored circle
- Company name
- Industry + size
- "Hiring: [categories]" tags
- "Save for follow-up" star icon (visual only)

### Tab: Booth Layout

Visual floor plan — simple SVG or div grid showing 80 numbered booths arranged in 5 sections by category. Color-coded by category. User's potential booth highlighted in gold.

### Sidebar: Booking Widget (sticky)

If user hasn't booked:
- "Book your booth slot" heading
- Category dropdown (locked to user's major's category by default but changeable)
- Time slot picker — show 6 available 20-minute slots:
  - 10:00 - 10:20 ✓ Available
  - 10:30 - 10:50 ✗ Booked
  - 11:00 - 11:20 ✓ Available
  - 13:00 - 13:20 ✓ Available
  - 13:30 - 13:50 ✓ Available
  - 14:00 - 14:20 ✗ Booked
- "Booth assignment will be confirmed after booking" helper
- Primary button: "Confirm slot →" (opens confirmation dialog)

**Confirmation Dialog (shadcn Dialog):**
- Heading: "You're booked! 🎉"
- Summary:
  - Event: [name]
  - Date: [date]
  - Slot: 13:00 - 13:20
  - Booth: B-23 (Business section)
- Helper text: "We'll send a reminder 24 hours before. You can prepare your booth materials in your Profile."
- Buttons: "View my profile" + "Done"

If user already booked, show booked state with slot info + "Change slot" link.

---

## State Management

Since this is a prototype with no real backend, use simple React state (`useState`) for interactive elements. Persist nothing. Booking confirmation just triggers the dialog.

For the "logged-in student" used across pages, create a simple context or just import directly from mock-data:

```typescript
// src/lib/current-user.ts
import { students } from "./mock-data/students";
export const currentStudent = students[0]; // stu-001
```

Use this throughout student pages.

---

## Acceptance Criteria

1. ✅ All 4 routes accessible from secondary nav
2. ✅ `/student/onboarding` toggles work (visual state change)
3. ✅ Profile tabs switch correctly
4. ✅ Portfolio tab shows project cards with realistic data
5. ✅ Profile Strength meter shows percentage
6. ✅ Events list shows all 4 events with correct status
7. ✅ Event detail tabs all work
8. ✅ Booking widget time slots can be selected
9. ✅ Confirmation dialog opens and closes properly
10. ✅ Mobile responsive at 375px — no horizontal scroll, secondary nav scrollable
11. ✅ Sticky elements (sidebar booking widget, profile preview) work correctly
12. ✅ No console errors, no TypeScript errors, `npm run build` succeeds

---

## Deploy

```bash
git add .
git commit -m "Module 2A: Student core flows"
git push
```

Verify Vercel deployment shows "Ready" before continuing.

---

## Output

Report:
1. Live URL (which student pages are now live)
2. Files created
3. Anything you adjusted from spec + why
