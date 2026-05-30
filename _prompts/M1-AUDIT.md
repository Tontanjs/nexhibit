# NEXHIBIT M1 Audit

Generated: 2026-05-30  
Workspace: `/Users/tassanawanpui/Desktop/nexhibit`  
Scope: actual repository state after Module 1 foundation and marketing implementation.  
Constraint honored: this audit reads and reports existing state only; no `src/` files were modified.

## 1. Project Tree

### `src/` file inventory

Command used:

```bash
find src -type f | sort
```

Output:

```text
src/app/about/page.tsx
src/app/favicon.ico
src/app/globals.css
src/app/layout.tsx
src/app/login/page.tsx
src/app/page.tsx
src/app/signup/page.tsx
src/components/brand/Logo.tsx
src/components/brand/VerifiedBadge.tsx
src/components/icons/FloorPlan.tsx
src/components/icons/Logo.tsx
src/components/icons/QRBadge.tsx
src/components/icons/ReverseFairDiagram.tsx
src/components/icons/ScannerOverlay.tsx
src/components/icons/index.ts
src/components/layout/Footer.tsx
src/components/layout/Navbar.tsx
src/components/marketing/CTASection.tsx
src/components/marketing/ComparisonSection.tsx
src/components/marketing/Hero.tsx
src/components/marketing/HowItWorks.tsx
src/components/marketing/StatsStrip.tsx
src/components/marketing/TestimonialGrid.tsx
src/components/ui/avatar.tsx
src/components/ui/badge.tsx
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/separator.tsx
src/components/ui/sheet.tsx
src/components/ui/tabs.tsx
src/lib/copy/index.ts
src/lib/copy/strings.ts
src/lib/mock-data/employers.ts
src/lib/mock-data/events.ts
src/lib/mock-data/index.ts
src/lib/mock-data/quotes.ts
src/lib/mock-data/stats.ts
src/lib/mock-data/students.ts
src/lib/mock-data/types.ts
src/lib/utils.ts
```

### `_prep/` file inventory

Command used:

```bash
find _prep -type f | sort
```

Output:

```text
_prep/config/categories.ts
_prep/config/filters.ts
_prep/config/index.ts
_prep/config/languages.ts
_prep/config/skills.ts
_prep/extended-data/jobs.ts
_prep/nexhibit_prep_bak/extended-data/activity-feed.ts
_prep/nexhibit_prep_bak/extended-data/application-statuses.ts
_prep/nexhibit_prep_bak/extended-data/chart-data.ts
_prep/nexhibit_prep_bak/extended-data/conversations.ts
_prep/nexhibit_prep_bak/extended-data/feedback.ts
_prep/nexhibit_prep_bak/extended-data/index.ts
_prep/nexhibit_prep_bak/extended-data/matching-scores.ts
_prep/nexhibit_prep_bak/extended-data/notifications.ts
_prep/nexhibit_prep_bak/extended-data/time-slots.ts
_prep/nexhibit_prep_bak/extended-data/types.ts
_prep/nexhibit_prep_bak/extended-data/visitor-stream.ts
_prep/svg-assets-v2/EmptyEvents.tsx
_prep/svg-assets-v2/EmptyInbox.tsx
_prep/svg-assets-v2/EmptyShortlist.tsx
_prep/svg-assets-v2/LoadingDots.tsx
_prep/svg-assets-v2/NotFound404.tsx
_prep/svg-assets-v2/SuccessCheck.tsx
_prep/svg-assets-v2/VerificationPending.tsx
_prep/svg-assets-v2/index.ts
_prep/utils/colors.ts
_prep/utils/filters.ts
_prep/utils/formatters.ts
_prep/utils/index.ts
_prep/utils/matching.ts
_prep/validate.ts
_prep/visual-qa/README.md
_prep/visual-qa/SvgPreview.tsx
```

### Top-level context files

Read context: `package.json`, `components.json`, `postcss.config.mjs`, `tsconfig.json`, `next.config.ts`, and `eslint.config.mjs`. They confirm Next 15.5.18, React 19.2.6, TypeScript strict mode, Tailwind v4 via `@tailwindcss/postcss`, shadcn aliases, and `@/* -> ./src/*`.

## 2. Routes Inventory

| Route | File | Default export | Layout/nav | Actual content | Data/copy source |
|---|---|---|---|---|---|
| `/` | `src/app/page.tsx` | `Home()` | Page composes `<Navbar />`, `<Footer />` directly. | Marketing landing page with hero, how-it-works, comparison, stats, testimonials, final CTA. | Imports marketing components, which pull from `copy`, `students`, `quotes`, and `platformStats`. |
| `/login` | `src/app/login/page.tsx` | `LoginPage()` | Standalone auth page, no global Navbar/Footer. | Centered card with logo, Student/Employer shadcn tabs, inputs, helper text, and links to future dashboards. | Imports `copy`, shadcn `Card/Input/Label/Tabs`, `Logo`, `buttonVariants`, `cn`. |
| `/signup` | `src/app/signup/page.tsx` | `SignupPage()` | Standalone auth page, no global Navbar/Footer. | Centered card with Student/Employer sign-up tabs, inputs, helper text, and links to future dashboards. | Imports `copy`, shadcn `Card/Input/Label/Tabs`, `Logo`, `buttonVariants`, `cn`. |
| `/about` | `src/app/about/page.tsx` | `AboutPage()` | Page composes `<Navbar />`, `<Footer />` directly. | Story, problem, solution diagram, team cards, built-with block. | Imports `copy`, `ReverseFairDiagram`, `Card`, Navbar/Footer. |

### Route notes

- `src/app/layout.tsx` defines root HTML, Inter font variable, metadata, and global CSS import.
- `src/app/layout.tsx` does not inject Navbar/Footer globally; marketing pages choose their layout locally.
- `src/app/favicon.ico` exists as a route asset.
- Auth buttons route to `/student/onboarding` and `/employer/dashboard`, but those target routes do not exist yet.
- Current implemented user-facing routes are exactly the four M1 routes: `/`, `/login`, `/signup`, `/about`.

## 3. Design System From `src/app/globals.css`

### Tailwind v4 syntax

- Line 1 uses `@import "tailwindcss";`.
- Lines 3-51 use the Tailwind v4 `@theme { ... }` directive.
- There is no Tailwind v3 `tailwind.config.*` file in the current tree.
- `components.json` has `"tailwind.config": ""`, consistent with Tailwind v4 CSS-first configuration.

### `@theme` tokens

```css
--color-ink-50: #F8FAFC; --color-ink-100: #F1F5F9; --color-ink-200: #E2E8F0;
--color-ink-300: #CBD5E1; --color-ink-400: #94A3B8; --color-ink-500: #64748B;
--color-ink-600: #475569; --color-ink-700: #2D3748; --color-ink-800: #1A1F2E; --color-ink-900: #0A0E1A;
--color-surface-0: #FFFFFF; --color-surface-50: #FAFAF9; --color-surface-100: #F4F4F2;
--color-gold-50: #FFFCE8; --color-gold-400: #F8D547; --color-gold-500: #F5C518; --color-gold-600: #D4A613;
--color-success: #10B981; --color-warning: #F59E0B; --color-error: #EF4444;
--color-background: var(--color-surface-50); --color-foreground: var(--color-ink-900);
--color-card: var(--color-surface-0); --color-card-foreground: var(--color-ink-900);
--color-muted: var(--color-ink-100); --color-muted-foreground: var(--color-ink-500);
--color-primary: var(--color-gold-500); --color-primary-foreground: var(--color-ink-900);
--color-secondary: var(--color-ink-100); --color-secondary-foreground: var(--color-ink-900);
--color-accent: var(--color-ink-100); --color-accent-foreground: var(--color-ink-900);
--color-border: var(--color-ink-200); --color-input: var(--color-ink-200); --color-ring: var(--color-gold-500);
--color-destructive: var(--color-error); --color-destructive-foreground: var(--color-surface-0);
--font-sans: "Inter", system-ui, sans-serif;
--radius-button: 6px; --radius-card: 8px; --radius-modal: 12px;
```

### Global element rules

- `*` sets `box-sizing: border-box`.
- `html` sets `scroll-behavior: smooth`.
- `body` sets `min-height: 100vh`, `overflow-x: hidden`, surface background, ink text, Inter/system font stack, antialiasing, and geometric text rendering.
- `a` removes underline by default.
- `button`, `input`, `textarea`, and `select` inherit font.
- `.bg-dark` sets ink-900 background and surface-50 text.

### Typography usage actually observed

- The landing hero uses `text-5xl sm:text-6xl md:text-7xl`, not exactly the prompt's `text-6xl md:text-7xl` starting point.
- Large headings use `tracking-normal` instead of `tracking-tight`.
- Component type scale is consistent with M1 intent, but not every spec typography string is copied exactly.
- Buttons and cards use rounded-md/rounded-lg classes consistent with the token intent.

## 4. Components Inventory

### Brand components

#### `src/components/brand/Logo.tsx`

- Exports: `Logo` re-exported from `@/components/icons`; `LogoProps` re-exported from `@/components/icons/Logo`.
- Props: exactly the prep icon props, not a local text implementation.
- Imports: none except the re-export target.
- Used by: `Navbar`, `Footer`, `LoginPage`, `SignupPage`.
- Notable: this wrapper preserves the prep SVG Logo as the brand source of truth.

#### `src/components/brand/VerifiedBadge.tsx`

- Exports: `VerifiedBadge`.
- Internal prop type: `{ label?: string; className?: string; }`.
- Default label: `copy.status.verified`.
- Imports: `CheckCircle2`, shadcn `Badge`, `copy`.
- Used by: `Hero` profile cards.
- Notable: renders `Badge variant="success"` with a check icon and optional custom label.

### Layout components

#### `src/components/layout/Navbar.tsx`

- Exports: `Navbar`.
- Imports: `Link`, `Menu`, brand `Logo`, `buttonVariants`, `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetTrigger`, `copy`, `cn`.
- Internal data: `navLinks` uses `copy.navigation.marketing.*`.
- Desktop links: `/#how-it-works`, `/#students`, `/#employers`, `/about`.
- Desktop auth links: `/login` and `/signup`.
- Mobile behavior: shadcn Sheet with hamburger trigger.
- Used by: `Home`, `AboutPage`.
- Notable: sticky header, 64px mobile nav height, 72px desktop nav height.

#### `src/components/layout/Footer.tsx`

- Exports: `Footer`.
- Imports: `Link`, brand `Logo`, `copy`.
- Data source: `copy.layout.footer.groups` and `copy.layout.footer.copyright`.
- Links: all footer links currently point to `#`.
- Used by: `Home`, `AboutPage`.
- Notable: dark footer, four-column desktop layout, stacked mobile layout.

### Marketing components

#### `src/components/marketing/Hero.tsx`

- Exports: `Hero`.
- Imports: `Link`, `ArrowRight`, `Sparkles`, `QRBadge`, `ScannerOverlay`, `VerifiedBadge`, shadcn `Avatar`, `AvatarFallback`, `Badge`, `buttonVariants`, `students`, `copy`, `cn`.
- Internal data: `cardStyles` array with three rotation/translation class strings.
- Mock data use: `students.slice(0, 3)`.
- UI: dark hero, caption pill, headline, subheadline, two CTAs, trust line, desktop profile cards, QR badge, scanner overlay.
- Used by: `src/app/page.tsx`.
- Notable: profile cards display initials, name, nationality flag, major, VerifiedBadge, and first three skills.

#### `src/components/marketing/HowItWorks.tsx`

- Exports: `HowItWorks`.
- Imports: lucide `Calendar`, `ShieldCheck`, `Sparkles`, shadcn `Card`, `copy`.
- Internal data: `icons = [ShieldCheck, Calendar, Sparkles]`.
- Data source: `copy.marketing.howItWorks.steps`.
- Used by: `src/app/page.tsx`.
- Notable: section id is `how-it-works`, matching Navbar anchor.

#### `src/components/marketing/ComparisonSection.tsx`

- Exports: `ComparisonSection`.
- Imports: lucide `CheckCircle2`, `XCircle`, shadcn `Card`, `copy`.
- Data source: `copy.marketing.comparison` and `copy.marketing.comparisonDetails`.
- Used by: `src/app/page.tsx`.
- Notable: section id is `employers`; NEXHIBIT side uses ink-900 background, gold check icons, shadow, and `md:scale-[1.03]`.

#### `src/components/marketing/StatsStrip.tsx`

- Exports: `StatsStrip`.
- Imports: `platformStats`, `copy`.
- Internal data: `stats` array of four values.
- Values: `487+`, `64`, `38`, `100%`.
- Labels: `Students`, `Employers`, `Countries`, `Verified`.
- Used by: `src/app/page.tsx`.
- Notable: stats are derived from mock data, not hardcoded numerals except formatting suffixes.

#### `src/components/marketing/TestimonialGrid.tsx`

- Exports: `TestimonialGrid`.
- Imports: shadcn `Card`, `quotes`, `copy`.
- Internal data: hopeful quotes first, then frustrated quotes, sliced to three.
- Actual selected quotes: `quote-004`, `quote-005`, `quote-001`.
- Used by: `src/app/page.tsx`.
- Notable: visible quote mark is hardcoded as typographic text; quote content is from mock data.

#### `src/components/marketing/CTASection.tsx`

- Exports: `CTASection`.
- Imports: `Link`, `FloorPlan`, `buttonVariants`, `copy`, `cn`.
- Data source: `copy.marketing.finalCta`.
- Used by: `src/app/page.tsx`.
- Notable: desktop-only FloorPlan uses `highlightedBooth="B-23"` and `numbering="global"`.

### Icon components

#### `src/components/icons/Logo.tsx`

- Exports: `Logo`, `LogoProps`.
- Props: `size?: "sm" | "md" | "lg"`, `variant?: "light" | "dark"`, `showTagline?: boolean`, `tagline?: string`, `className?: string`.
- Defaults: `size="md"`, `variant="light"`, `showTagline=true`, `tagline="Where students get seen."`.
- Uses: `useId` for accessible title/description ids.
- Used by: brand re-export, Navbar, Footer, auth pages.

#### `src/components/icons/QRBadge.tsx`

- Exports: `QRBadge`, `QRBadgeProps`.
- Props: `size?: number`, `studentId?: string`, `boothNumber?: string`, `verifiedCaption?: string`, `className?: string`, `width?: number | string`, `height?: number | string`, `preserveAspectRatio?: string`.
- Defaults: `size=240`, `verifiedCaption="Verified by ZJUT"`, `preserveAspectRatio="xMidYMid meet"`.
- Internal helpers: `hashString`, `isFinderArea`, `isFinderPixel`, `isDataPixel`.
- Used by: `Hero`.
- Notable: deterministic pseudo-QR pattern based on student id and booth number.

#### `src/components/icons/FloorPlan.tsx`

- Exports: `FloorPlan`, `FloorPlanProps`.
- Props: `highlightedBooth?: string`, `numbering?: "global" | "category"`, `className?: string`, `width?: number | string`, `height?: number | string`, `preserveAspectRatio?: string`.
- Defaults: `numbering="global"`, `width=800`, `height=500`, `preserveAspectRatio="xMidYMid meet"`.
- Internal data: five sections for Business, Engineering, Health, Language, Other.
- Used by: `CTASection`.
- Notable: supports animated highlight ring and category numbering.

#### `src/components/icons/ScannerOverlay.tsx`

- Exports: `ScannerOverlay`, `ScannerOverlayProps`.
- Props: `scanning?: boolean`, `instruction?: string`, `className?: string`, `width?: number | string`, `height?: number | string`, `preserveAspectRatio?: string`.
- Defaults: `scanning=false`, `instruction="Align QR code within frame"`, `width=320`, `height=320`.
- Used by: `Hero`.
- Notable: includes reduced-motion media query for scan-line animation.

#### `src/components/icons/ReverseFairDiagram.tsx`

- Exports: `ReverseFairDiagram`, `ReverseFairDiagramProps`.
- Props: `className?: string`, `width?: number | string`, `height?: number | string`, `preserveAspectRatio?: string`.
- Defaults: `width=900`, `height=500`, `preserveAspectRatio="xMidYMid meet"`.
- Internal components: `StudentFigure`, `EmployerBooth`, `StudentBooth`, `WalkingEmployer`.
- Used by: `AboutPage`.
- Notable: compares traditional fair flow with NEXHIBIT reverse flow.

#### `src/components/icons/index.ts`

- Exports: `QRBadge`, `ScannerOverlay`, `FloorPlan`, `ReverseFairDiagram`, `Logo` via star exports.
- Used by: components importing grouped icons.

### UI components

- Full detail appears in Section 6.
- All UI primitives import `cn` from `@/lib/utils`.
- Radix primitives are imported from the monolithic `radix-ui` package.
- `button`, `badge`, and `tabs` expose cva variant helpers.

## 5. Library Inventory

### `src/lib/utils.ts`

- Exports: `cn(...inputs: ClassValue[])`.
- Imports: `clsx`, `ClassValue`, and `twMerge`.
- Purpose: shadcn-compatible class merge helper.

### `src/lib/copy/index.ts`

- Exports: `*` from `./strings`.
- Purpose: public copy barrel.

### `src/lib/copy/strings.ts`

- Exports: `copy`.
- Exports: `type Copy = typeof copy`.
- Top-level keys: `brand`, `navigation`, `buttons`, `emptyStates`, `helperText`, `toasts`, `errors`, `status`, `marketing`, `layout`, `pages`, `forms`, `auth`, `dashboard`, `events`, `messaging`, `legal`, `accessibility`.
- The object is declared `as const`.
- Sample path: `copy.marketing.hero.headline` is `"Where international students get seen."`.
- Sample route copy: `copy.pages.login.heading` is `"Welcome back"`.
- Sample status copy: `copy.status.verified` is `"Verified by ZJUT"`.
- Notable: `copy.pages.about.teamMembers`, `copy.pages.about.builtWithBody`, and `copy.pages.about.facultyAdvisor` intentionally contain bracket placeholders.

### `src/lib/mock-data/index.ts`

- Exports: `types`, `students`, `employers`, `events`, `quotes`, `stats`.
- Purpose: public mock-data barrel used by page/components.

### Actual exported types from `src/lib/mock-data/types.ts`

```typescript
export type StudentCategory = "Business" | "Engineering" | "Health" | "Language" | "Other";
export type OneToThree<T> = [T] | [T, T] | [T, T, T];
export type TwoToThree<T> = [T, T] | [T, T, T];
export type FourToSix<T> = [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T];
export type FourToSeven<T> = [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T] | [T, T, T, T, T, T, T];
export type NonEmptyList<T> = [T, ...T[]];
export type Student = {
  id: string; name: string; initials: string; nationality: string; nationalityFlag: string;
  year: 1 | 2 | 3 | 4; major: string; category: StudentCategory; gpa: number; classRanking: string;
  hsk: 1 | 2 | 3 | 4 | 5 | 6 | null; englishLevel: "Native" | "Fluent" | "Proficient" | "Intermediate";
  otherLanguages: string[]; skills: FourToSeven<string>; projects: TwoToThree<Project>;
  bio: string; headline: string; verified: true; lookingFor: "Internship" | "Full-time" | "Both";
  availableFrom: string; preferredLocations: string[]; activities: string[]; awards: OneToThree<Award>;
  coursesCompleted: number; responseTime: string; lastActive: string; profileStrength: number;
};
export type Project = { title: string; description: string; tags: string[]; link?: string; };
export type Award = { title: string; year: number; description: string; };
export type Employer = {
  id: string; name: string; logoLetter: string; logoColor: string; industry: string;
  size: "Startup (1-50)" | "Mid-size (51-500)" | "Large (501-5000)" | "Enterprise (5000+)";
  location: string; description: string; hiringCategories: NonEmptyList<StudentCategory>;
  hiringSkills: FourToSix<string>; verified: true; type: "Chinese" | "Multinational" | "Startup";
  yearFounded: number; website: string; activeSince: string;
};
export type EventCategorySlot = { name: StudentCategory; slotsTotal: number; slotsBooked: number; };
export type EventCategorySlots = [EventCategorySlot, EventCategorySlot, EventCategorySlot, EventCategorySlot, EventCategorySlot];
export type Event =
  | (EventBase & { status: "upcoming" | "ongoing"; satisfactionScore?: never; matchesGenerated?: never; })
  | (EventBase & { status: "past"; satisfactionScore: number; matchesGenerated: number; });
export type Quote = { id: string; text: string; authorCode: string; authorContext: string; mood: "frustrated" | "hopeful"; };
export type PlatformStats = {
  studentsRegistered: number; employersOnboarded: number; successfulMatches: number; eventsPerYear: number;
  countriesRepresented: number; verificationRate: number; averageResponseTime: string; averageDaysToOffer: number;
};
```

### `src/lib/mock-data/students.ts`

- Exports: `students: Student[]`.
- Count: 12 students.
- Category distribution: 4 Engineering, 3 Business, 2 Language, 2 Health, 1 Other.
- Sample item: `stu-001`, Nattapong Saetang, Thailand, Year 3 Software Engineering, Engineering, GPA 3.72, HSK 4.
- Sample data richness: projects include titles, descriptions, and tags; skills have 4-7 items; awards are structured.
- Used by: `Hero`, future student/employer pages likely.

### `src/lib/mock-data/employers.ts`

- Exports: `employers: Employer[]`.
- Count: 8 employers.
- Sample item: `emp-001`, Alibaba Cloud, Hangzhou, Cloud Computing and AI Infrastructure.
- Actual fields use `logoLetter`, `logoColor`, `hiringCategories`, `hiringSkills`, `yearFounded`, `website`, and `activeSince`.
- Used by: not directly used in M1 visible pages yet; available for future modules.

### `src/lib/mock-data/events.ts`

- Exports: `events: Event[]`.
- Count: 4 events.
- Upcoming: June 15, 2026 and October 20, 2026.
- Past: April 18, 2026 and November 12, 2025.
- Past events include `satisfactionScore` and `matchesGenerated`.
- Used by: not directly used in M1 visible pages yet; available for M2A.

### `src/lib/mock-data/quotes.ts`

- Exports: `quotes: Quote[]`.
- Count: 5 quotes.
- Mood distribution: 3 frustrated, 2 hopeful.
- Used by: `TestimonialGrid`.

### `src/lib/mock-data/stats.ts`

- Exports: `platformStats: PlatformStats`.
- Values: 487 students, 64 employers, 142 matches, 2 events per year, 38 countries, 100 percent verification, 8-hour average response, 16 average days to offer.
- Used by: `StatsStrip`.

## 6. shadcn/ui Components Installed

- `src/components/ui/avatar.tsx`: Radix avatar primitives plus group/count helpers; supports `size?: "default" | "sm" | "lg"`.
- `src/components/ui/badge.tsx`: cva badge with `default`, `gold`, `success`, `secondary`, `destructive`, `outline`, `ghost`, and `link` variants.
- `src/components/ui/button.tsx`: cva button with NEXHIBIT default/gold/outline/secondary/ghost/inverse/link variants and multiple sizes.
- `src/components/ui/card.tsx`: Card shell plus header, title, description, action, content, footer.
- `src/components/ui/input.tsx`: styled input with focus, invalid, placeholder, and disabled states.
- `src/components/ui/label.tsx`: Radix label primitive styled for form controls.
- `src/components/ui/separator.tsx`: Radix separator primitive with horizontal/vertical support.
- `src/components/ui/sheet.tsx`: Radix dialog-based sheet with overlay, content, trigger, close, header, footer, title, description.
- `src/components/ui/tabs.tsx`: Radix tabs with list, trigger, content, and `tabsListVariants`.

### shadcn notes

- The installed set is smaller than the original M1 command list.
- Not installed in current `src/components/ui`: `select`, `dialog`, `dropdown-menu`, `textarea`, `switch`, `checkbox`.
- The current M1 pages only require the installed subset.
- The `radix-ui` package is used as one monolithic dependency rather than individual `@radix-ui/react-*` packages.

## 7. `_prep/` Folder State

### M1 prep assets that were moved into `src/`

- Original mock data now lives under `src/lib/mock-data/`.
- Original copy now lives under `src/lib/copy/`.
- Original SVG icons now live under `src/components/icons/`.
- Current `_prep/` no longer contains `mock-data/`, `copy/`, or `svg-assets/` source folders at its root.

### Remaining prep modules

| Folder/file | Actual exports or role | Moved? |
|---|---|---|
| `_prep/config` | Category, filter, language, and skill taxonomy exports: `CATEGORIES`, `STUDENT_BROWSE_FILTERS`, `EMPLOYER_BROWSE_FILTERS`, `HSK_LEVELS`, `ENGLISH_LEVELS`, `SKILL_TAXONOMY`, `COMMON_EMPLOYER_SKILLS`. | No |
| `_prep/extended-data/jobs.ts` | `JobPosting` and `jobPostings`. | No |
| `_prep/nexhibit_prep_bak/extended-data` | Conversations, notifications, visitor stream, activity feed, matching scores, time slots, charts, application statuses, feedback, and shared types. | No |
| `_prep/svg-assets-v2` | Empty states, loading, 404, success, and verification-pending SVG components plus index barrel. | No |
| `_prep/utils` | Matching, formatting, filtering, and color helpers. | No |
| `_prep/validate.ts` | Validation script importing from moved `src/lib/copy` and `src/lib/mock-data`. | Kept |
| `_prep/visual-qa` | SVG QA README and `SvgPreview` importing from `src/components/icons`. | Kept |

Important prep note: `_prep/nexhibit_prep_bak` contains substantial future data, but the `bak` folder name should be clarified before moving anything from it into `src`.

## 8. Conventions Discovered

- Use `@/*` absolute imports for app source.
- Keep route pages under App Router folders with `page.tsx`.
- Pages compose layout components directly instead of relying on root layout for Navbar/Footer.
- Marketing visible text should come from `copy` when possible.
- Use shadcn primitives for buttons, cards, inputs, labels, tabs, badges, avatars, sheets, and separators.
- Button styling is centralized in `buttonVariants`.
- `cn` should be used for merged Tailwind class strings.
- Mock data barrels are preferred: `@/lib/mock-data`.
- Copy barrel is preferred: `@/lib/copy`.
- Icon barrel is preferred: `@/components/icons`.
- Prep icon components are accessible SVGs using `useId`.
- SVG components accept `className`, width/height, and `preserveAspectRatio` where relevant.
- Main brand Logo should come from prep SVG, not a rebuilt text-only component.
- Cards use `rounded-lg` and `border-ink-200` by default.
- Buttons use `rounded-md` and `min-h-11`, preserving mobile tap targets.
- Root CSS sets `overflow-x: hidden` on `body`.
- Tailwind classes use NEXHIBIT tokens such as `ink`, `surface`, `gold`, `success`, and `error`.
- Lucide icons are used for interface symbols.
- Future routes linked from M1 are allowed to be missing until M2/M3.

## 9. Quality Verification

### TypeScript check

Command requested and run:

```bash
npx tsc --noEmit 2>&1 | tail -5
```

Observed output:

```text

```

Result: PASS. The command exited successfully with no tail output.

### Lint check

Command requested and run:

```bash
npm run lint 2>&1 | tail -10
```

Observed output:

```text
> nexhibit@0.1.0 lint
> eslint
```

Result: PASS. The command exited successfully.

### Build check

- Not run for this audit.
- Reason: audit instructions explicitly said do not run build.

### M1 acceptance criteria status from actual state

| M1 criterion | Status | Evidence |
|---|---|---|
| `npm run dev` starts without errors | PASS from previous M1 verification, not rerun in this audit | Prior local dev server reached Next ready state; audit did not restart it. |
| Landing page renders at `/` | PASS from route/component presence | `src/app/page.tsx` composes all marketing sections. |
| All 4 routes work: `/`, `/login`, `/signup`, `/about` | PASS from files present | All four App Router `page.tsx` files exist. |
| Navigation between pages works | PASS with caveat | Navbar links to M1 routes and anchors; auth CTAs also link to future missing routes. |
| Mock data files exist and export typed data | PASS | `src/lib/mock-data` contains types and data barrels. |
| Mobile 375px has no horizontal scroll | PASS from prior visual QA, not rerun in this audit | CSS includes `overflow-x: hidden`; responsive classes are present. |
| Tailwind v4 with `@theme`, no v3 syntax | PASS | `globals.css` uses v4 syntax; no Tailwind config file exists. |
| Inter font loads correctly | PASS | `layout.tsx` imports `Inter` from `next/font/google`. |
| shadcn components render | PASS | M1 pages use shadcn Card, Tabs, Input, Label, Badge, Avatar, Sheet, Button variants. |
| Hero has diagonal floating profile cards on desktop | PASS | `Hero` uses `cardStyles` rotations/translations and `students.slice(0, 3)`. |
| Comparison visually emphasizes NEXHIBIT side | PASS | Right card uses ink-900, gold checks, shadow, and scale. |
| Stats use real mock data numbers | PASS | `StatsStrip` imports `platformStats`. |
| No `<Image>` errors | PASS | No Next `<Image>` usage found in read files. |
| No console errors in browser | PASS from prior browser QA, not rerun in this audit | Audit did not open browser. |
| No TypeScript errors | PASS | `npx tsc --noEmit` succeeded. |

## 10. Pending Work

Existence checks were run for every expected future file below; all returned `NOT EXISTS`.

| Module | Pending files verified missing | Pending routes |
|---|---|---|
| M2A | `src/app/student/layout.tsx`, `src/app/student/onboarding/page.tsx`, `src/app/student/profile/page.tsx`, `src/app/student/events/page.tsx`, `src/app/student/events/[id]/page.tsx`, `src/lib/current-user.ts` | `/student/onboarding`, `/student/profile`, `/student/events`, `/student/events/[id]` |
| M2B | `src/app/student/event-day/page.tsx`, `src/app/student/dashboard/page.tsx`, `src/app/student/messages/page.tsx`, `src/app/student/settings/page.tsx` | `/student/event-day`, `/student/dashboard`, `/student/messages`, `/student/settings` |
| M3 | `src/app/employer/layout.tsx`, `src/app/employer/dashboard/page.tsx`, `src/app/employer/browse/page.tsx`, `src/app/employer/student/[id]/page.tsx`, `src/app/employer/scanner/page.tsx`, `src/app/employer/shortlist/page.tsx`, `src/app/employer/messages/page.tsx`, `src/lib/current-employer.ts` | `/employer/dashboard`, `/employer/browse`, `/employer/student/[id]`, `/employer/scanner`, `/employer/shortlist`, `/employer/messages` |
| M4 | `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/app/admin/employers/page.tsx`, `src/app/admin/events/page.tsx`, `src/app/success-stories/page.tsx`, `src/app/not-found.tsx` | `/admin`, `/admin/employers`, `/admin/events`, `/success-stories`, app-level `not-found.tsx` |

## 11. Deviations And Surprises

- The prep `types.ts` is richer than the original M1 spec: students use `initials`, `nationalityFlag`, `classRanking`, `otherLanguages`, `headline`, activities, awards, response metadata, and profile strength.
- Employers use `logoLetter`, `logoColor`, `hiringCategories`, and `hiringSkills`, not the simpler M1 `logo` and `hiring` fields.
- Events use structured five-category slot tuples rather than a plain `string[]` categories field.
- `StatsStrip` imports `platformStats`, not an export named `stats`.
- The root layout does not include Navbar/Footer globally; pages include them directly where needed.
- Auth pages link to future `/student/onboarding` and `/employer/dashboard` routes that do not exist yet.
- The original M1 command requested more shadcn components than currently exist in `src/components/ui`.
- `select`, `dialog`, `dropdown-menu`, `textarea`, `switch`, and `checkbox` are not installed as source files yet.
- The app uses the monolithic `radix-ui` dependency, not individual Radix packages.
- `copy.pages.about` contains placeholders for team members, course name, and faculty advisor.
- This is actual current state, even though the initial quality bar discouraged placeholder garbage.
- The hero caption is `"Built with ZJUT"`, not the M1 prompt's `"Backed by ZJUT"` wording.
- The hero subheadline is longer than the M1 prompt example and includes projects/languages/availability.
- The how-it-works second and third steps are profile/event QR focused, not exactly "Book your booth slot" and "Get discovered" from the prompt.
- The final CTA uses `copy.marketing.finalCta.heading` `"Ready to be discovered before the handshake?"`, not `"Ready to be seen?"`.
- The About solution uses the prep `ReverseFairDiagram` SVG instead of hand-rolled HTML/SVG from the prompt.
- Some SVG accessible text and default prop strings are hardcoded in icon components rather than sourced from `copy`.
- The TestimonialGrid selects two hopeful quotes first, then one frustrated quote.
- `_prep/validate.ts` imports from moved `src` paths and should remain useful after M1.
- `_prep/visual-qa/SvgPreview.tsx` imports from `src/components/icons`, confirming it expects icons to be moved.
- `_prep/nexhibit_prep_bak` remains and contains substantial future data; its `bak` name is worth clarifying before M2/M3 integration.

## 12. Critical Reminders For Next Tool

- Do not regenerate M1 mock data, copy, or SVG icons.
- Treat `src/lib/mock-data/types.ts` as source of truth.
- Import mock data from `@/lib/mock-data`.
- Import copy from `@/lib/copy`.
- Import SVG components from `@/components/icons`.
- Use the prep `Logo` through `@/components/brand/Logo` or `@/components/icons`.
- Keep Tailwind v4 syntax in `src/app/globals.css`; do not introduce Tailwind v3 config.
- Prefer shadcn/ui primitives over custom button/card/form primitives.
- Before M2A, consider moving or integrating `_prep/config` and `_prep/utils` deliberately.
- Before M2A, create `src/lib/current-user.ts` with `currentStudent = students[0]` if following `PROMPT-M2A.md`.
- Future student pages should use the richer prep `Student` type, not the simpler M1 prompt shape.
- Future employer pages should use `hiringCategories` and `hiringSkills`, not non-existent `hiring`.
- Future employer logo displays should use `logoLetter` and `logoColor`.
- Future event pages should use `event.categories` as `EventCategorySlots`, not `string[]`.
- Auth links currently point to future missing routes; implement those before expecting the login/signup CTAs to resolve.
- If installing more shadcn components, align their generated styling with existing NEXHIBIT tokens.
- Do not delete `_prep/validate.ts`.
- Do not delete `_prep/visual-qa/` until the team confirms it is no longer useful.
- Treat `_prep/svg-assets-v2` as future-ready empty/loading/success assets.
- Treat `_prep/nexhibit_prep_bak/extended-data` as likely M2B/M3/M4 data, but verify the folder naming before moving.
- Keep visible marketing copy sourced from `src/lib/copy/strings.ts` where practical.
- Replace bracket placeholders in `copy.pages.about` before final presentation if real names/course/advisor are available.
- Run `npx tsc --noEmit` after moving any prep files.
- Run `npm run lint` after any future page build.
- Do not run `npm run build` during audit-only passes unless explicitly requested.
- Do not push to GitHub without explicit user approval.
- M1 audit conclusion: foundation and marketing pages are in place, typed, lint-clean, and ready for M2A.
