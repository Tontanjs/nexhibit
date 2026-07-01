# Aurora Visual And Theme Upgrade Summary

## Design Direction

NEXHIBIT now uses an Aurora Studio visual direction with a full light/dark/system theme layer. Dark mode is a premium aurora interface with controlled purple, blue, cyan, and gold highlights. Light mode is a warm off-white, university-professional interface with elevated cards, charcoal typography, and soft gold accents.

The styling is inspired by polished creator and dashboard tools, but it does not copy any third-party branding, layouts, assets, or product-specific features.

## Key Visual Components

- `ThemeProvider`: custom `light` / `dark` / `system` preference provider with localStorage persistence
- `ThemeToggle`: accessible dropdown toggle for public, student, employer, and admin navigation
- `AuroraBackground`: dark gradient stage with grid/noise layering
- `GlowCard`: reusable glass card with soft edge lighting
- `MetricGlowCard`: dashboard metric card with accent glow
- `NeonButton`: premium CTA button variants
- `PremiumHeroPanel`: reusable command-center hero panel
- `FloatingFeatureCard`: compact floating hero proof cards
- `ScannerGlowFrame`: animated simulated scanner frame
- `EventPassCard`: premium QR/event pass treatment
- `AnimatedSection`: motion-safe section reveal wrapper
- `InteractiveGlowListItem`: responsive list item treatment

## Pages And Areas Upgraded

- Landing hero: richer aurora stage, glow cards, and floating product signals
- Student portal shell: dark app background, glass cards, faster hover/tap feedback
- Employer portal shell: dark recruiting command-center feel across workflow pages
- Admin portal shell: dark career-services command-center treatment
- Admin dashboard: neon metric cards and dark-readable chart styling
- Employer scanner: signature glow scanner frame and stronger prototype scanner state
- Student event-day: premium event pass and QR moment
- Student dashboard: upgraded command-center hero panel
- Employer dashboard: upgraded recruiting command-center hero panel
- Success stories and about: darker aurora hero sections while retaining prototype wording

## Theme System

- `data-theme="light"` / `data-theme="dark"` is applied to the root element
- `data-theme-preference` stores the selected preference (`light`, `dark`, or `system`)
- First paint is protected by an inline theme script before React hydration
- `localStorage` key: `nexhibit-theme`
- System mode resolves from `prefers-color-scheme`
- Semantic tokens cover background, foreground, surface, card, muted, accent, glass, status, focus, and chart colors
- Recharts dashboard colors use CSS variables for grid, tick, tooltip, and series colors

## Motion System

- Hover lift is kept to a small transform for responsiveness
- Press feedback stays immediate through button active states
- Scanner motion uses a lightweight CSS transform animation
- Global reduced-motion handling remains in `globals.css`
- Large animated backgrounds are mostly static gradients, with motion reserved for signature surfaces

## Performance Precautions

- Visual depth is mostly CSS gradients, borders, and static shadows
- The dark shell upgrades existing pages through shared CSS instead of duplicating heavy component trees
- No new external libraries were added
- Recharts remains scoped to dashboard pages
- Scanner animation uses transform/opacity-oriented CSS
- Theme switching updates root attributes instantly without a page reload

## Credibility Guardrails

The upgrade keeps NEXHIBIT framed as a high-fidelity frontend prototype:

- No real authentication
- No real backend or database
- No real ZJUT data sync
- No real QR scanning
- No real employer or student verification system
- No real AI recruiting intelligence
- Rule-based Smart Match only
- Mock data and demo actions remain labeled where trust matters

## Remaining Limitations

The interface is now visually more premium, but the underlying product remains a frontend prototype with mock data. A real deployment would still require authentication, authorization, persistence, signed QR tokens, consent/audit logging, compliance review, and production data workflows.
