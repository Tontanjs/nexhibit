# PROMPT M2B — Codex CLI

> **Run after M2A verified.** Use OpenAI Codex CLI in `~/Desktop/nexhibit`. Paste this as your task.

---

# NEXHIBIT — Module 2B: Student Misc Pages

## Project Context

This is an existing Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui project at `~/Desktop/nexhibit`. Design system, mock data, and layout components are already in place from earlier modules.

**Read these files first to understand the conventions:**
- `src/app/globals.css` — design tokens
- `src/components/brand/Logo.tsx` and `VerifiedBadge.tsx` — brand components
- `src/components/layout/Navbar.tsx` and `Footer.tsx`
- `src/app/student/layout.tsx` — student layout with secondary nav
- `src/lib/mock-data/students.ts` — student data shape
- `src/lib/current-user.ts` — currently logged-in student

**Do NOT modify** existing files unless absolutely necessary. Reuse existing components and styles.

---

## Pages to Build (4 files)

1. `src/app/student/event-day/page.tsx`
2. `src/app/student/dashboard/page.tsx`
3. `src/app/student/messages/page.tsx`
4. `src/app/student/settings/page.tsx`

All use the existing `student/layout.tsx`.

---

## 1. Event Day (`/student/event-day`)

**Purpose:** Live view during a career fair event — student's "booth control panel".

**Layout:**
- 2-column on desktop:
  - Left (60%): Main content
  - Right (40%): QR badge card + live activity

### Main Content (Left)

**Top status bar:**
- Live indicator (pulsing green dot) + text: "🔴 Live · Career Fair 2026 — Spring Edition"
- Time remaining countdown: "Your slot ends in 12:34"

**Section: Booth Information Card**
- Booth number large: "B-23"
- Location: "Business Section · Building 8, Hall A"
- Slot time: "13:00 - 13:20"
- Floor plan thumbnail with your booth highlighted

**Section: Quick Actions**
3 large action cards:
- "Show your QR badge" (opens dialog with big QR code image — use a placeholder QR SVG)
- "Open my portfolio" (link to /student/profile)
- "Request break" (5 min pause — visual only)

**Section: Visitor Stream (live)**
A scrollable list of recent employer visits to your booth:
- Each item: employer logo + name + time visited + status badge (e.g., "Viewing now", "Saved to shortlist", "Left feedback")
- 4-5 mock entries using real employer mock data
- Update timestamp like "2 min ago", "Just now"

### Right Sidebar

**QR Badge Card (sticky):**
- Large QR code image (use placeholder — generate a simple SVG that looks like a QR or use a div pattern)
- Text below: "Show this to visiting employers"
- Booth + slot info below QR
- Border: thick gold border, rounded-card

**Live stats card:**
- "This session"
- 3 mini stats:
  - 4 visitors so far
  - 2 saved to shortlist
  - 1 feedback received

---

## 2. Dashboard (`/student/dashboard`)

**Purpose:** Post-event hub — see who viewed you, status of applications, feedback.

**Layout:**
- Top welcome strip: "Hey [name], here's what happened since your last booth session."
- Stats row: 4 stat cards in a grid
  - "Profile views" (with +12 this week trend)
  - "Saved by employers" (with employer logos stack)
  - "Messages" (with unread badge)
  - "Feedback received" (with star icon)

**Section: Who viewed your profile (last 30 days)**
- Filter chips: All / This week / This month
- List of employer cards:
  - Logo + name + industry
  - "Viewed [date]"
  - Status pill: "Viewed profile" / "Saved to shortlist" / "Sent message" / "Sent feedback"
  - Action buttons: "View company" / "Send message"
- Show 5-6 entries

**Section: Application Status**
Table-like list of employers user has interacted with:
- Columns: Employer / Stage / Last update / Action
- Stages: "Profile viewed" / "Shortlisted" / "Interview scheduled" / "Offer" / "Declined"
- Use color-coded badges
- Show 4-5 entries

**Section: Recent Feedback** (from employers)
- 2-3 feedback cards
- Each: employer logo + name + feedback text in italic + date
- Example: "Strong technical portfolio. Particularly liked the multilingual chatbot project. — Bosch China, 2 days ago"

---

## 3. Messages (`/student/messages`)

**Purpose:** In-app messaging with employers (post-event continuity).

**Layout:**
- Full-height 2-column layout:
  - Left (320px): Conversation list
  - Right (flex): Active conversation

### Left: Conversation List
- Search bar at top
- Filter tabs: All / Unread / Archived
- List of conversations:
  - Avatar (employer logo letter in colored circle)
  - Employer name
  - Last message preview (1 line, truncated)
  - Timestamp
  - Unread dot (gold) if unread
- Show 6-7 conversations, mix of read/unread

### Right: Active Conversation
- Header: Employer name + "View company profile" link + options menu
- Message thread (mock 6-8 messages alternating between employer and student):
  - Employer messages: left-aligned, gray bubble
  - Student messages: right-aligned, dark bubble with white text
  - Timestamps subtle
- Input bar at bottom:
  - Attachment icon
  - Text input
  - Send button (gold)

Default to showing a conversation with "Bosch China" with a few messages already exchanged about an internship opportunity.

---

## 4. Settings (`/student/settings`)

**Purpose:** Account, privacy, notification preferences.

**Layout:**
- Left sidebar: settings sections nav
  - Account
  - Privacy
  - Notifications
  - Visibility
  - Data & Export
- Right: section content

Use shadcn Tabs or simple section rendering — section navigation in the URL hash is fine.

### Section: Account
- Email field (read-only, ZJUT-verified)
- Phone (optional)
- Password change form (visual only)
- Language preference: English / 中文
- Time zone

### Section: Privacy (most important)
- Repeat the privacy controls from onboarding but with more granularity
- Add toggles for:
  - "Allow employers to view my profile when I'm NOT at an event" (default off)
  - "Show me in 'Recommended Talent' search results" (default on)
  - "Allow university to share my outcome data anonymously for research" (default on)
- "Download all my data" button
- "Delete my account" link (in error red)

### Section: Notifications
- Toggle table:
  - Email / Push / In-app columns
  - Rows: Employer viewed profile / New message / Booth slot reminder / Feedback received / Event invitations

### Section: Visibility
Quick toggle: "Profile is currently: 🟢 Public to verified employers"
Switch: "Pause visibility" (with explanation)

### Section: Data & Export
- "What we have about you" — list of data categories
- "Export as PDF" button
- "Export as JSON" button (developer option)
- PIPL compliance note: "Per China's Personal Information Protection Law, you can request full data export or deletion at any time."

---

## Implementation Notes

- Use shadcn components wherever possible: Card, Button, Badge, Tabs, Input, Textarea, Switch, Select, Avatar, Dialog, Separator
- All interactive elements (buttons, toggles, tabs) must work visually even without backend logic
- Use lucide-react icons consistently
- Maintain Tailwind v4 syntax — no v3 patterns
- Mobile responsive for all 4 pages

---

## Acceptance Criteria

1. ✅ All 4 routes accessible from secondary nav
2. ✅ Event Day page shows QR badge dialog
3. ✅ Dashboard stats and lists populated with mock data
4. ✅ Messages page shows split-view conversation UI
5. ✅ Settings sections all navigable
6. ✅ Privacy toggles work (visual state change)
7. ✅ Mobile responsive
8. ✅ No console errors

---

## Deploy After Completion

```bash
git add .
git commit -m "Module 2B: Student misc pages (Event Day, Dashboard, Messages, Settings)"
git push
```

Wait for Vercel deployment, then test all 4 routes on the live URL.
