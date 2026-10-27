# Puzzle #30 — page-load sequence animation with Framer Motion

Brief (Task Forge puzzle tracker): page-load sequence animation with framer-motion — none/generic.

A real staged page-load reveal: one Framer Motion root variant (`page`) drives
the whole sequence via `delayChildren`/`staggerChildren`, with nested variant
groups for the nav links and hero copy so each *tier* waits for the previous
one — logo → nav links (staggered) → eyebrow → headline → subheadline → CTA
(spring pop-in), plus a slow background glow fade running in parallel. This
is a genuine sequence (later elements wait on earlier ones), not independent
elements animating in parallel with different hardcoded delays.

## Verified live, not just read from code

Added a verification-only `?slow=N` query param (`src/App.jsx`) that
multiplies every duration/delay by `N`, with zero effect when omitted.
Loaded `?slow=10` in a real browser via claude-in-chrome and screenshotted
twice:
- **Frame 1** (immediately after load): only the logo visible, nav and hero
  still fully hidden — proves the stagger is real, not CSS-only or
  simultaneous.
- **Frame 2** (after waiting): full sequence settled.

Also verified the production Cloudflare Worker deploy renders identically to
local dev.

## Stack
Vite + React + `framer-motion`. Deployed as a static Worker (`wrangler.jsonc`,
`assets.directory: ./dist`) — no server logic needed for this one, so no
backend-service/Pages-limit workaround was required this time.

Live: https://puzzle-30-page-load-animation.krikormher.workers.dev
