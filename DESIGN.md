# Design Brief

## Direction

Atlas — A premium, cartographic travel tracker with warm earth tones and editorial confidence, inspired by vintage explorer's journals and modern digital mapping.

## Tone

Warm Night + Editorial: Deep charcoal with amber markers, refined sans-serifs, intentional depth through layered surfaces — sophisticated wanderlust, not consumer-grade travel app cliché.

## Differentiation

Map-marker aesthetic (warm amber accent) cuts through dark backgrounds like a flag on a global expedition log; chart colors inspired by earth/terrain (ochre, sage, rust, gold) elevate stats from generic dashboards to explorer's documentation.

## Color Palette

| Token          | OKLCH            | Role                          |
| -------------- | ---------------- | ----------------------------- |
| background     | 0.14 0.015 50    | Deep warm charcoal, primary   |
| foreground     | 0.92 0.01 60     | Off-white warm text           |
| card           | 0.18 0.018 50    | Slightly elevated surface     |
| primary        | 0.72 0.17 70     | Warm amber (map marker)       |
| accent         | 0.58 0.14 190    | Cool teal (exploration)       |
| muted          | 0.22 0.02 50     | Secondary surface             |
| chart-1        | 0.68 0.16 70     | Ochre (land)                  |
| chart-2        | 0.62 0.14 150    | Sage (nature)                 |
| chart-3        | 0.55 0.12 85     | Rust (warmth)                 |
| chart-4        | 0.72 0.15 60     | Gold (journey)                |
| chart-5        | 0.58 0.14 190    | Teal (discovery)              |

## Typography

- Display: Space Grotesk — modern geometric confidence for journey milestones
- Body: Bricolage Grotesque — warm editorial readability for trip details and stats
- Scale: hero `text-6xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base lg:text-lg`

## Elevation & Depth

Minimal shadows; depth through surface color shifts (background → card → popover), subtle borders, and layered backgrounds alternating between background and muted tones. Cards feel cartographically grounded, not floating.

## Structural Zones

| Zone    | Background      | Border                    | Notes                                                                |
| ------- | --------------- | ------------------------- | -------------------------------------------------------------------- |
| Header  | bg-card         | border-b border-border    | Navigation with cartographic confidence; subtle shadow support       |
| Hero    | bg-background   | —                         | Dashboard stats in card grid with chart colors, visual hierarchy     |
| Section | bg-background   | —                         | Content zones alternate with bg-muted/20 for visual rhythm          |
| Footer  | bg-muted/40     | border-t border-border    | Minimal, low-contrast; attribution and secondary links              |

## Spacing & Rhythm

Spacer: 2rem gaps between major sections; 1rem between cards in grids; 0.5rem internal card padding for tight editorial feel. Density is spacious on desktop, responsive-compact on mobile.

## Component Patterns

- Buttons: primary (bg-primary text-primary-foreground) with no shadow; secondary (bg-muted text-foreground) for toggles; destructive (bg-destructive) for irreversible actions
- Cards: 6-8px rounded, bg-card with border-border 1px, subtle internal spacing; charts embedded with earth-tone palette
- Badges: pill-style (rounded-full), bg-muted with text-foreground; accent color for highlights (e.g., visited vs. wishlist)
- Stats: large, bold display font numbers with smaller muted labels; chart overlays use semi-transparent layers

## Motion

- Entrance: Staggered card reveals on home load (200ms delay per card); fade-in for embedded maps/globes
- Hover: Subtle 300ms brightness shift on cards; button underline accent on hover (warm amber)
- Decorative: Gentle pulse on active map markers; ease-in-out transitions for tab/nav switches

## Constraints

- No gradients; OKLCH color harmony only
- No full-page backgrounds; depth via layered surfaces
- No neon or glow shadows; cartographic authority demands restraint
- Scale hierarchy preserved across mobile/tablet/desktop via Tailwind responsive classes

## Signature Detail

Warm amber accent used sparingly as map markers on stats and interactive elements — a visual metaphor for journey progress and destination marking, echoing the app's travel journal purpose.
