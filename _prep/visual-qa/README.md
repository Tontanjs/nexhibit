# NEXHIBIT Visual QA

`SvgPreview.tsx` is a small browser preview surface for checking the prepared SVG components before moving them into the app.

When the Next.js project is initialized, copy or import this preview into a temporary route and verify:

- QR badge text fits with booth and student labels.
- Scanner animation stays inside the frame and respects reduced-motion settings.
- Floor plan booth labels remain legible at desktop and mobile widths.
- `highlightedBooth="B-23"` works with global numbering.
- `numbering="category"` supports category-style labels such as `E-4`.
