# ASME — Australian Society for Medical Entrepreneurship & Innovation

A modern, dark/light, single-page marketing site for ASME. Built to feel like
a venture-backed startup, not a society — minimal, typographic, with one
conversion goal: **join the community**.

## Stack

- **Next.js 15** (App Router, RSC where possible)
- **TypeScript**
- **Tailwind CSS 3** with custom design tokens (light/dark via CSS variables)
- **Framer Motion** for in-view reveals and micro-interactions
- **next-themes** for theme switching
- **lucide-react** for icons
- **Inter** via `next/font` (used for both body and display; can be swapped to Satoshi when a licence is acquired)

## Run it

```bash
cd asme
npm install        # or bun install / pnpm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
```

## Site structure (single page, scroll-anchored)

| Section            | Purpose                                                                 | Anchor       |
| ------------------ | ----------------------------------------------------------------------- | ------------ |
| `Nav`              | Sticky, glass-blur on scroll. Logo + nav + theme toggle + Join CTA.     | —            |
| `Hero`             | Headline ("A home for clinician entrepreneurs"), sub, dual CTA, metrics | `#top`       |
| `Manifesto`        | Three-line pitch + supporting paragraph                                 | —            |
| `WhatWeDo`         | Four levers: Network · Programs · Events · Career pathways              | `#what`      |
| `Pathways`         | Interactive role selector: Founder / Investor / Operator / Advisor / Curious | `#pathways`  |
| `Auscep`           | AUSCEP flagship program — 4 pillars + outcomes                          | `#auscep`    |
| `MemberSpotlights` | Horizontal scroll carousel of real (sample) member profiles             | `#community` |
| `SocialProof`      | Partner marquee + rotating testimonial                                  | `#partners`  |
| `Insights`         | 4 article cards — playbooks, interviews, essays                         | `#insights`  |
| `Events`           | Upcoming event grid + recent past list                                  | `#events`    |
| `JoinCTA`          | Inverse-surface signup form — the conversion goal                       | `#join`      |
| `Footer`           | Sitemap, contact, legal                                                 | —            |

## Content

All copy lives in [`lib/content.ts`](./lib/content.ts) as typed objects. Editing
that file is the only thing required to tweak the site's words. Member
profiles, events, insights and partners are sample data and should be replaced
with real entries before launch.

## Swapping in a CMS (Sanity)

The component layer reads typed objects from `lib/content.ts` only. To migrate:

1. Set up a Sanity project (`npm create sanity@latest`) with schemas mirroring
   the types exported from `lib/content.ts` (`Member`, `Insight`, `Eventish`, etc.).
2. Replace the static objects in `lib/content.ts` with `groq` queries against
   the Sanity client.
3. No component changes are required.

Until then, content is shipped in the repo (good for fast iteration).

## Form

`/api/join` is a Next.js Route Handler. It validates the payload shape and
logs to stderr. Wire it up to Resend/Loops + your CRM of choice when ready —
see the `TODO` comment in [`app/api/join/route.ts`](./app/api/join/route.ts).

## Brand assets

- `public/asme-logo.png` — the official ASME wordmark + petal mark, kept
  unchanged from `asme.org.au`. Rendered inside a small white pill in dark
  mode (see [`components/ui/LogoMark.tsx`](./components/ui/LogoMark.tsx)) so
  the blue type stays legible.
- The brand palette in [`tailwind.config.ts`](./tailwind.config.ts) (`brand.blue`,
  `brand.coral`, etc.) is derived from the logo mark.

## Accessibility & motion

- All interactive elements are keyboard-reachable and have visible focus rings.
- Reveal animations honour `prefers-reduced-motion`.
- Color contrast is AA in both themes (verify before launch — minor tweaks may
  be needed depending on which exact shade combinations are used in copy).

## What's NOT included (deliberately)

- Multi-page routes (Programs, Community, Events, Insights, Join were all
  collapsed into the one landing page per the brief).
- A real CMS — sample data is in `lib/content.ts`.
- A real email-sending integration — `/api/join` is a stub.
- Job-board / startup-directory / investor-network features. The component
  system is intentionally simple so these are easy to add as new routes when
  you're ready (`app/jobs/page.tsx`, etc.).
