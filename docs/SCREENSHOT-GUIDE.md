# Screenshot Guide

This project now includes a repeatable Playwright workflow for capturing NEXHIBIT screenshots.

## Start the app

Standard local flow:

```bash
npm run dev
```

The screenshot script uses `http://localhost:3000` by default.

If that local app is not already running, the script will also try to start `npm run dev` automatically.
By default, that auto-start fallback prefers port `3100` so it does not collide with a stale or already-occupied `3000` process.

The script prefers the Playwright-managed Chromium runtime. If that browser binary is not installed locally but Google Chrome is already installed on the machine, the script can fall back to that local Chrome app so the capture workflow still runs.
If you want to install the Playwright-managed Chromium binary explicitly, run:

```bash
npx playwright install chromium
```

## Run screenshots

Headless:

```bash
npm run screenshots
```

Light theme:

```bash
npm run screenshots:light
```

Dark theme:

```bash
npm run screenshots:dark
```

Headed:

```bash
npm run screenshots:headed
```

Targeted viewport or route pass:

```bash
SCREENSHOT_VIEWPORTS=desktop,mobile \
SCREENSHOT_ROUTES=/student/dashboard,/employer/scanner \
npm run screenshots:dark
```

Accepted viewport names are `desktop`, `tablet`, and `mobile`. Route filters must match routes configured in `scripts/capture-pages.mjs`.

## Capture from the deployed site

```bash
SCREENSHOT_BASE_URL=https://nexhibit-nine.vercel.app npm run screenshots:dark
```

## Output folders

Generated files are written to:

- `screenshots/system/desktop/`
- `screenshots/system/tablet/`
- `screenshots/system/mobile/`
- `screenshots/light/desktop/`
- `screenshots/light/tablet/`
- `screenshots/light/mobile/`
- `screenshots/dark/desktop/`
- `screenshots/dark/tablet/`
- `screenshots/dark/mobile/`

JSON report:

- `screenshots/system/screenshot-report.json`
- `screenshots/light/screenshot-report.json`
- `screenshots/dark/screenshot-report.json`
- `screenshots/{theme}/screenshot-report-filtered.json` for targeted runs

## If a route fails

Check:

- that the app is reachable at the selected base URL
- that the route still exists
- that the route did not render the not-found page
- that the route is not depending on a missing local state

Then inspect:

- terminal output from the script
- `screenshots/{theme}/screenshot-report.json`
- any `__failed.png` screenshot written beside the normal file target

## Why this helps

This workflow supports:

- audit coverage across major marketing, student, employer, and admin routes
- visual comparison across desktop, tablet, and mobile layouts
- presentation-ready capture of the current prototype state
- evidence gathering for demo quality reviews
- documentation of research-credibility gaps and production-readiness discussion points
