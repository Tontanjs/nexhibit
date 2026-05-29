# PROMPT M1 — Claude Code

> **วิธีใช้:** เปิด Claude Code, ตรวจสอบว่าอยู่ใน `~/Desktop/nexhibit`, แล้ว copy ทั้งหมดด้านล่างเส้นแบ่งให้ Claude Code

---

# Build NEXHIBIT — Module 1: Foundation + Marketing

## Project Context

NEXHIBIT is a "Reverse Career Fair" platform for international students at Zhejiang University of Technology (ZJUT). It's a class project prototype — no real backend, all data is mocked. Target presentation: June 5, 2026.

**Core concept:** Instead of students going to employer booths, employers visit student booths to discover talent. Three user types: Students, Employers, University Admin.

**Working directory:** Current folder (`~/Desktop/nexhibit`) which already has a git repository linked to `https://github.com/Tontanjs/nexhibit` and a Vercel project that auto-deploys from the `main` branch.

---

## Tech Stack (Use Exactly These)

- **Next.js 15** with App Router (TypeScript)
- **Tailwind CSS v4** (use `@import "tailwindcss"` + `@theme` directive — NOT v3 syntax)
- **shadcn/ui** components
- **lucide-react** for icons
- **Inter** font from Google Fonts (via `next/font/google`)
- All data is mocked in `src/lib/mock-data/`
- Deploy: Vercel (already configured via GitHub integration)

---

## Setup Steps (Run These First)

```bash
# Remove existing README/gitignore to allow Next.js init
rm -f README.md .gitignore

# Initialize Next.js 15 in current directory
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

# Install shadcn/ui
npx shadcn@latest init -d

# Add shadcn components we need
npx shadcn@latest add button card input label select dialog badge avatar tabs dropdown-menu separator textarea switch checkbox sheet

# Install additional packages
npm install lucide-react clsx tailwind-merge
```

If `create-next-app` complains about existing files, accept overwriting and continue.

---

## Design System — Spotlight Premium

**Establish this FIRST in `src/app/globals.css`.** All subsequent components must use these tokens via Tailwind classes.

```css
@import "tailwindcss";

@theme {
  --color-ink-50: #F8FAFC;
  --color-ink-100: #F1F5F9;
  --color-ink-200: #E2E8F0;
  --color-ink-300: #CBD5E1;
  --color-ink-400: #94A3B8;
  --color-ink-500: #64748B;
  --color-ink-600: #475569;
  --color-ink-700: #2D3748;
  --color-ink-800: #1A1F2E;
  --color-ink-900: #0A0E1A;

  --color-surface-0: #FFFFFF;
  --color-surface-50: #FAFAF9;
  --color-surface-100: #F4F4F2;

  --color-gold-50: #FFFCE8;
  --color-gold-400: #F8D547;
  --color-gold-500: #F5C518;
  --color-gold-600: #D4A613;

  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  --font-sans: "Inter", system-ui, sans-serif;

  --radius-button: 6px;
  --radius-card: 8px;
  --radius-modal: 12px;
}

body {
  background: var(--color-surface-50);
  color: var(--color-ink-900);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Section background utilities */
.bg-dark {
  background: var(--color-ink-900);
  color: var(--color-surface-50);
}
```

**Typography scale** (use these everywhere):
- Display: `text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]`
- H1: `text-4xl md:text-5xl font-bold tracking-tight leading-tight`
- H2: `text-3xl md:text-4xl font-bold tracking-tight`
- H3: `text-2xl font-semibold`
- H4: `text-xl font-semibold`
- Body large: `text-lg leading-relaxed`
- Body: `text-base leading-relaxed`
- Small: `text-sm`
- Caption: `text-xs font-medium tracking-wide uppercase`

**Component conventions:**
- All buttons use `rounded-md` (6px)
- All cards use `rounded-lg` (8px) + `border border-ink-200`
- Primary CTA button = gold background, dark text: `bg-gold-500 hover:bg-gold-600 text-ink-900 font-semibold`
- Secondary CTA = dark border on light bg: `border border-ink-900 text-ink-900 hover:bg-ink-100`
- Tertiary = ghost: `text-ink-700 hover:bg-ink-100`

---

## File Structure to Create

```
src/
├── app/
│   ├── layout.tsx          (Root layout with Inter font)
│   ├── globals.css         (Design system)
│   ├── page.tsx            (Landing /)
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx
├── components/
│   ├── brand/
│   │   ├── Logo.tsx
│   │   └── VerifiedBadge.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── TestimonialGrid.tsx
│   │   └── CTASection.tsx
│   └── ui/                 (shadcn components — auto)
└── lib/
    ├── utils.ts            (shadcn auto)
    └── mock-data/
        ├── students.ts     (12 student profiles)
        ├── employers.ts    (8 employers)
        ├── events.ts       (4 events)
        ├── quotes.ts       (5 interview quotes)
        └── stats.ts        (platform stats)
```

---

## Mock Data Specifications

### `src/lib/mock-data/students.ts`

Generate 12 students with this TypeScript type and realistic data:

```typescript
export type Student = {
  id: string;              // "stu-001"
  name: string;            // realistic name matching nationality
  avatar: string;          // emoji or initial-based — use first 2 letters
  nationality: string;     // "Thailand", "Vietnam", "Pakistan", "Indonesia", "Kazakhstan", "Ethiopia", "Nigeria", "Mongolia", "Russia", "Egypt", "Cambodia", "Laos"
  year: 1 | 2 | 3 | 4;
  major: string;           // "Software Engineering", "Business Administration", "Civil Engineering", "International Trade", "Computer Science", "Mechanical Engineering", "Marketing", "Chemistry", etc
  category: "Business" | "Engineering" | "Health" | "Language" | "Other";
  gpa: number;             // 3.0-3.95
  hsk: 1 | 2 | 3 | 4 | 5 | 6 | null;  // Chinese proficiency
  englishLevel: "Native" | "Fluent" | "Proficient" | "Intermediate";
  skills: string[];        // 4-7 skills
  projects: { title: string; description: string }[]; // 2-3 projects
  bio: string;             // 1-2 sentences, first person
  verified: boolean;       // always true
  lookingFor: "Internship" | "Full-time" | "Both";
};
```

Distribute nationalities for variety. Mix categories: 4 Engineering, 3 Business, 2 Language, 2 Health, 1 Other.

### `src/lib/mock-data/employers.ts`

Generate 8 employers:

```typescript
export type Employer = {
  id: string;              // "emp-001"
  name: string;
  logo: string;            // first letter
  industry: string;
  size: "Startup (1-50)" | "Mid-size (51-500)" | "Large (501-5000)" | "Enterprise (5000+)";
  location: string;        // city in China
  description: string;     // 1-2 sentences
  hiring: string[];        // 2-4 role categories
  verified: boolean;
  type: "Chinese" | "Multinational" | "Startup";
};
```

Mix:
- 3 Chinese majors (e.g., Alibaba Cloud, BYD International, SHEIN, Pinduoduo, Tencent Global, DJI)
- 3 Multinationals with China offices (e.g., Bosch China, Siemens, Unilever China, Schneider Electric)
- 2 Startups in Hangzhou/Shanghai

Use real-sounding names. For Chinese majors, you can use real company names. For startups, invent plausible names like "Lingxi AI", "ZheTech Ventures".

### `src/lib/mock-data/events.ts`

```typescript
export type Event = {
  id: string;              // "evt-001"
  title: string;
  date: string;            // ISO date
  status: "upcoming" | "ongoing" | "past";
  location: string;        // building / hall name at ZJUT
  description: string;
  categories: string[];
  totalSlots: number;
  bookedSlots: number;
  registeredEmployers: number;
};
```

Generate 4 events:
- 1 upcoming (June 15, 2026)
- 1 upcoming (October 20, 2026)
- 1 past (November 2025, completed)
- 1 past (April 2026, completed)

### `src/lib/mock-data/quotes.ts`

5 interview quotes (real-sounding, sharp):

```typescript
export type Quote = {
  id: string;
  text: string;            // under 15 words
  authorCode: string;      // "P1"
  authorContext: string;   // "Vietnamese, Year 4 Engineering"
  mood: "frustrated" | "hopeful";
};
```

3 frustrated (problem), 2 hopeful (after seeing concept). Examples:
- "I sent 30 resumes. Zero replies." — P2, Vietnamese, Y4
- "My Chinese is not perfect — but my skills are real." — P3, Pakistani, Y3
- "No one ever sees the work I'm proud of." — P1, Thai, Y4

### `src/lib/mock-data/stats.ts`

```typescript
export const stats = {
  studentsRegistered: 487,
  employersOnboarded: 64,
  successfulMatches: 142,
  eventsPerYear: 2,
  countriesRepresented: 38,
  verificationRate: 100,
};
```

---

## Page Specifications

### Root Layout (`src/app/layout.tsx`)

- Inter font loaded from Google Fonts via `next/font/google` (variable, weights 400/500/600/700/800)
- Apply font to `<html>` className
- Metadata: title `"NEXHIBIT — Where students get seen"`, description `"The reverse career fair platform for international students at Zhejiang University of Technology."`
- Include `<Navbar />` and `<Footer />` if appropriate (or per-page)

### Brand Components

**`Logo.tsx`** — text "Nexhibit" in font-extrabold tracking-tight with a small gold dot (`•`) after the "t". Props: `variant?: "light" | "dark"` (default light = dark text on light bg, dark = white text on dark bg). Size variants: `size?: "sm" | "md" | "lg"`.

**`VerifiedBadge.tsx`** — small pill with checkmark icon. Green background (success color, low opacity), green text. Text: "Verified by ZJUT" or custom via prop.

### Layout Components

**`Navbar.tsx`**:
- Sticky top, white background with subtle bottom border on scroll
- Logo left
- Center nav links (desktop only): How it works, For Students, For Employers, About
- Right: "Log in" (ghost button) + "Sign up" (gold primary button)
- Mobile: hamburger menu opens a sheet (use shadcn Sheet component)
- Height: 72px desktop, 64px mobile

**`Footer.tsx`**:
- Dark background (ink-900) with white text
- 4 columns on desktop, stacked on mobile:
  - **Product**: Features, How it works, Pricing, For Employers
  - **Company**: About, Team, Contact, Careers
  - **Resources**: Help Center, Success Stories, Blog, Press
  - **Legal**: Privacy Policy, Terms, PIPL Compliance, Cookie Policy
- Bottom strip: Logo + "© 2026 NEXHIBIT · Built with Zhejiang University of Technology"
- All links can be `#` for now (no real targets)

### Landing Page (`src/app/page.tsx`)

Compose these sections:

**1. Hero (dark, ink-900):**
- Left column (desktop) / centered (mobile):
  - Small caption pill: `"⚡ Backed by ZJUT"` (gold background, dark text, rounded-full, small)
  - Display headline: `"Where international students get seen."`
  - Subheadline: `"The reverse career fair platform built with Zhejiang University of Technology. Employers come to you — not the other way around."`
  - Two CTAs side by side: gold "I'm a Student →" + outline white "I'm an Employer"
  - Trust line below: `"100% verified profiles · 38+ nationalities · 2 events per year"`
- Right column (desktop only):
  - Three floating profile cards stacked diagonally, each showing a mock student profile (use real mock data from `students.ts`). Each card has avatar, name, nationality flag emoji, major, "Verified by ZJUT" badge, and 2-3 skill tags. Subtle shadow, slight rotation (e.g., -3deg, 2deg, -1deg) for visual interest.
- Section padding: `py-24 md:py-32`

**2. How It Works (light, surface-50):**
- Centered heading: `"How NEXHIBIT works"`
- Small caption above: `"FOR STUDENTS"`
- 3 step cards in a row (stack on mobile):
  - Step 1: icon (use lucide `ShieldCheck`), title `"Verify with ZJUT"`, description `"Sign up with your student ID. We sync verified academic data automatically — you stay in control of what's shown."`
  - Step 2: icon (`Calendar`), title `"Book your booth slot"`, description `"Choose a 20-minute slot in your category at our biannual career events."`
  - Step 3: icon (`Sparkles`), title `"Get discovered"`, description `"Employers visit your booth, see your real work, and reach out directly through the platform."`
- Each card: white background, border-ink-200, rounded-lg, padding 8, icon in a gold-50 circle (size-12, rounded-full, centered icon)

**3. Comparison Section (white, surface-0):**
- Heading: `"Traditional vs Reverse Career Fair"`
- Two columns side by side:
  - Left (muted styling, ink-100 background): "Traditional Fair"
    - List 4 pain points with X icons:
      - Students chase employers booth to booth
      - Resume gets 6 seconds of attention
      - Language confidence determines outcome
      - International students get overlooked
  - Right (highlighted, ink-900 background with white text, slightly elevated): "NEXHIBIT"
    - List 4 advantages with check icons (gold):
      - Employers come to student booths
      - Live demos, portfolios, real conversations
      - Verified profiles + interpreters available
      - Built specifically for international students
- Visual emphasis on right column (slight scale, shadow)

**4. Stats Strip (dark, ink-900):**
- Single row of 4 stat callouts, centered
- Use data from `stats.ts`
- Each: huge number in gold (text-5xl md:text-6xl font-extrabold), small uppercase label below (ink-400, text-sm, tracking-wide)
- Items: `487+ Students`, `64 Employers`, `38 Countries`, `100% Verified`

**5. Testimonial Grid (light, surface-50):**
- Heading: `"What students told us"`
- Small caption: `"FROM 5 INTERVIEWS"`
- Grid of 3 quote cards (use `quotes.ts`, mood: "hopeful" preferred):
  - Each card: white bg, padding 8, large quote mark in gold at top, quote text in italic, author line below with code + context
- Note below grid in small italic ink-500 text: `"Quotes anonymized from semi-structured interviews conducted May 2026."`

**6. Final CTA (gold, gold-500):**
- Center-aligned, ink-900 text
- Big heading: `"Ready to be seen?"`
- Subheading: `"Join 487 international students already on NEXHIBIT."`
- Two CTAs: dark "Create your profile" + ghost dark "Talk to your employer rep"
- Padding: py-20

### Login Page (`src/app/login/page.tsx`)

- Centered card on surface-50 background (max-width 440px)
- Logo at top
- Heading: "Welcome back"
- **Tabs at top**: "Student" | "Employer" (use shadcn Tabs)
- For Student tab:
  - Field 1: ZJUT Student ID (placeholder: "e.g., 202210xxxxx")
  - Field 2: Passport Number (placeholder: "Passport number used at registration")
  - Helper text: "We verify against ZJUT's international student database."
  - Primary button: "Log in to your booth"
- For Employer tab:
  - Field 1: Work email
  - Field 2: Password
  - Forgot password link
  - Primary button: "Log in to employer portal"
- Footer text: "Don't have an account? Sign up" link to /signup
- "Back to home" link top-left
- No actual auth — clicking primary button navigates to `/student/onboarding` or `/employer/dashboard` respectively

### Signup Page (`src/app/signup/page.tsx`)

Similar to login but:
- Heading: "Join NEXHIBIT"
- **Tabs**: "I'm a student" | "I'm an employer"
- Student tab fields:
  - ZJUT Student ID
  - Passport Number
  - Email (ZJUT or personal)
  - "Continue to verification" button → routes to /student/onboarding
- Employer tab fields:
  - Company name
  - Work email
  - Company website
  - "Submit for verification" button
  - Helper text below: "Employer accounts require manual verification by ZJUT Career Services. Estimated review time: 1-2 business days."
- Footer: "Already have an account? Log in"

### About Page (`src/app/about/page.tsx`)

Sections:

**1. Hero (light):**
- Caption: "OUR STORY"
- Display heading: "International students deserve to be seen."
- Subheading paragraph: 2-3 sentences about why we built this — pulled from interview insights.

**2. The Problem (white):**
- Two columns:
  - Left: text — describes the gap between traditional career fairs and international student reality. Reference: language barriers, resume-only screening, lack of dedicated channels.
  - Right: 3 stat callouts stacked
    - "1,500+ international students at ZJUT" (use placeholder)
    - "5 interviews · 100% reported the same frustration"
    - "0 platforms built specifically for them"

**3. The Solution (dark):**
- Diagram of the Reverse Career Fair concept (use simple HTML/SVG):
  - Top row: Traditional flow — student icon → arrow → 3 employer booths → "resume drop"
  - Bottom row: NEXHIBIT flow — student at booth ← arrow ← employer walks toward student → "discovery + conversation"
- Explanation paragraph

**4. Team (light):**
- 4 placeholder team member cards with: avatar circle (initials in gold), name, role
- Names: Use placeholders like "[Team Member 1]" etc., we'll fill in real names later

**5. Built With (white):**
- Single line: "NEXHIBIT is a student project developed in partnership with Zhejiang University of Technology's [Course Name] (2026)."
- Below: small ZJUT logo placeholder + "[Faculty Advisor Name]"

---

## Responsive Requirements

Test these breakpoints:
- **Mobile:** 375px (iPhone SE)
- **Tablet:** 768px (iPad portrait)
- **Desktop:** 1280px+

Every page must:
- No horizontal scroll at any breakpoint
- Tap targets ≥ 44px on mobile
- Readable line lengths (max 75ch for body text)
- Stack columns to single column on mobile

---

## Acceptance Criteria — Don't Stop Until ALL Pass

1. ✅ `npm run dev` starts without errors
2. ✅ Visit http://localhost:3000 — Landing page renders correctly
3. ✅ All 4 routes work: `/`, `/login`, `/signup`, `/about`
4. ✅ Navigation between pages works
5. ✅ Mock data files exist and export properly typed data
6. ✅ Mobile view at 375px has no horizontal scroll
7. ✅ Tailwind v4 with @theme is properly configured (no v3 syntax)
8. ✅ Inter font loads correctly
9. ✅ shadcn components render
10. ✅ Hero section has the diagonal floating profile cards on desktop
11. ✅ Comparison section visually emphasizes NEXHIBIT side
12. ✅ Stats use real numbers from mock data
13. ✅ No `<Image>` errors (use Next.js `<Image>` only when truly needed, otherwise just emojis/initials for avatars)
14. ✅ No console errors in browser
15. ✅ No TypeScript errors (`npm run build` succeeds)

---

## Deploy

After all acceptance criteria pass:

```bash
# Stage all changes
git add .

# Commit
git commit -m "Module 1: Foundation + Marketing pages"

# Push to GitHub (triggers Vercel auto-deploy)
git push
```

Wait ~2 minutes, then check https://vercel.com/teeradet-s-projects/nexhibit/deployments — latest should be "Ready". The live URL will be `https://nexhibit-nine.vercel.app` (or similar — check Vercel project).

---

## Output Report

After completion, tell me:
1. Live URL on Vercel
2. List of all files created (just paths)
3. Screenshots if possible
4. Any spec items you couldn't fulfill exactly + why
5. Anything that should change in M2 spec based on what you learned
