# THUNA — UI/UX Design System v2.0

## Design Philosophy: "Civic Glass"

A premium dark-mode interface that fuses **glassmorphism** with **institutional authority**. The portal should feel like a next-gen command center that any citizen can access — serious enough to convey trust, modern enough to feel approachable.

**Core Principles:**
1. **Trust Through Transparency** — Frosted-glass layers suggest openness; nothing is hidden
2. **Authority Without Intimidation** — Dark tones project strength; rounded corners and soft blur keep it human
3. **Data-First Hierarchy** — Every pixel serves information architecture; no decoration for decoration's sake
4. **Bilingual Readiness** — All text components must accommodate Malayalam alongside English

---

## Color System

### Foundation Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-deep` | `#0a0e1a` | Page background — near-black navy |
| `--bg-surface` | `#111827` | Card/panel base |
| `--bg-elevated` | `#1e2940` | Elevated panels, modals |
| `--bg-glass` | `rgba(255,255,255,0.04)` | Glassmorphism fill |
| `--bg-glass-hover` | `rgba(255,255,255,0.08)` | Glass hover state |
| `--border-glass` | `rgba(255,255,255,0.08)` | Glass border |
| `--border-glass-bright` | `rgba(255,255,255,0.14)` | Active/focused glass border |

### Text Hierarchy

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#f0f4fc` | Headings, primary content |
| `--text-secondary` | `#94a3b8` | Body, descriptions |
| `--text-muted` | `#64748b` | Labels, timestamps, placeholders |
| `--text-inverse` | `#0a0e1a` | Text on light/accent backgrounds |

### Accent Colors (Kerala Police–Inspired)

| Token | Hex | Usage |
|---|---|---|
| `--accent-primary` | `#3b82f6` | Primary actions, links, active states |
| `--accent-primary-glow` | `rgba(59,130,246,0.15)` | Glow/shadow behind primary elements |
| `--accent-gold` | `#f59e0b` | Highlights, badges, starred items |
| `--accent-gold-glow` | `rgba(245,158,11,0.12)` | Gold glow |

### Semantic Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--status-active` | `#22c55e` | Active investigations |
| `--status-active-bg` | `rgba(34,197,94,0.10)` | Active badge background |
| `--status-closed` | `#64748b` | Closed/resolved cases |
| `--status-closed-bg` | `rgba(100,116,139,0.10)` | Closed badge background |
| `--status-critical` | `#ef4444` | Critical alerts, urgent |
| `--status-critical-bg` | `rgba(239,68,68,0.10)` | Critical badge background |
| `--status-review` | `#a78bfa` | Under review/pending |
| `--status-review-bg` | `rgba(167,139,250,0.10)` | Review badge background |

---

## Typography

### Font Stack

```
--font-heading: 'Inter', system-ui, sans-serif;     /* 700, 600 weights */
--font-body: 'Inter', system-ui, sans-serif;         /* 400, 500 weights */
--font-mono: 'JetBrains Mono', monospace;            /* FIR numbers, codes, timestamps */
--font-malayalam: 'Noto Sans Malayalam', sans-serif;  /* Bilingual labels */
```

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| Display | 2.5rem (40px) | 700 | 1.1 | -0.025em | Hero/landing title |
| H1 | 1.875rem (30px) | 700 | 1.2 | -0.02em | Page titles |
| H2 | 1.375rem (22px) | 600 | 1.3 | -0.015em | Section headers |
| H3 | 1.125rem (18px) | 600 | 1.4 | -0.01em | Card titles |
| Body | 0.9375rem (15px) | 400 | 1.6 | 0 | Paragraphs, descriptions |
| Small | 0.8125rem (13px) | 500 | 1.5 | 0.01em | Labels, meta |
| Mono | 0.8125rem (13px) | 400 | 1.5 | 0.04em | FIR numbers, codes |

---

## Glassmorphism Tokens

```css
/* Standard glass panel */
--glass-bg: rgba(255, 255, 255, 0.04);
--glass-border: 1px solid rgba(255, 255, 255, 0.08);
--glass-blur: blur(16px);
--glass-radius: 16px;
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

/* Elevated glass (modals, popovers) */
--glass-elevated-bg: rgba(255, 255, 255, 0.07);
--glass-elevated-border: 1px solid rgba(255, 255, 255, 0.12);
--glass-elevated-blur: blur(24px);

/* Subtle glass (inline elements, chips) */
--glass-subtle-bg: rgba(255, 255, 255, 0.03);
--glass-subtle-border: 1px solid rgba(255, 255, 255, 0.06);
```

---

## Spacing & Layout

```
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;

--content-max-width: 1280px;
--sidebar-width: 260px;
```

---

## Component Specifications

### 1. Glass Card

The primary container for all content blocks.

```
Background: var(--glass-bg)
Border: var(--glass-border)
Border Radius: 16px
Backdrop Filter: var(--glass-blur)
Padding: 24px
Shadow: var(--glass-shadow)
Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

Hover State:
  Background: var(--bg-glass-hover)
  Border: 1px solid var(--border-glass-bright)
  Transform: translateY(-2px)
  Shadow: 0 12px 40px rgba(0,0,0,0.4)
```

### 2. Case Card

Displays a single case record in grid/list views.

**Structure:**
```
┌─────────────────────────────────────┐
│ [Status Badge]          [Category]  │
│                                     │
│ FIR Number (mono)                   │
│ Case Title (H3)                     │
│ Summary text (2 lines, clamped)     │
│                                     │
│ District · Station        Filed On  │
│ ─────────────────────────────────── │
│ Officer Name          [View Case →] │
└─────────────────────────────────────┘
```

- Status badge: pill shape, uses semantic status colors (colored border + tinted bg)
- Category chip: subtle glass bg, uppercase small text
- FIR number: `font-mono`, `--text-muted`
- Title: `font-heading`, weight 600
- Summary: `--text-secondary`, `line-clamp: 2`
- Footer: split flex, left = metadata, right = ghost button

### 3. Status Badge

```
Padding: 4px 12px
Border Radius: 100px (full pill)
Font: Small weight 600, uppercase, letter-spacing 0.05em
Border: 1px solid [status-color at 30% opacity]
Background: [status-color at 10% opacity]
Color: [status-color]

Variants:
  active   → green (#22c55e)
  closed   → slate (#64748b)
  critical → red (#ef4444)
  review   → purple (#a78bfa)
```

### 4. Buttons

**Primary Button:**
```
Background: var(--accent-primary)
Color: white
Padding: 10px 24px
Border Radius: 10px
Font: Body weight 600
Shadow: 0 0 20px var(--accent-primary-glow)
Hover: brightness(1.1), shadow spread +4px
Active: scale(0.98)
```

**Ghost Button:**
```
Background: transparent
Color: var(--accent-primary)
Border: 1px solid var(--accent-primary) at 30%
Padding: 10px 24px
Border Radius: 10px
Hover: background var(--accent-primary) at 8%
```

**Icon Button:**
```
Width/Height: 40px
Border Radius: 10px
Background: var(--glass-subtle-bg)
Border: var(--glass-subtle-border)
Color: var(--text-secondary)
Hover: color var(--text-primary), bg var(--bg-glass-hover)
```

### 5. Search Bar

Full-width search with glass styling.

```
┌──────────────────────────────────────────┐
│ 🔍  Search by FIR number or keyword...   │
└──────────────────────────────────────────┘
```

```
Background: var(--glass-bg)
Border: var(--glass-border)
Border Radius: 12px
Padding: 14px 16px 14px 48px (left pad for icon)
Backdrop Filter: var(--glass-blur)
Font: Body, var(--text-primary)
Placeholder Color: var(--text-muted)

Focus:
  Border Color: var(--accent-primary) at 50%
  Box Shadow: 0 0 0 3px var(--accent-primary-glow)
```

### 6. Top Navigation Bar

Fixed top bar with glass effect.

```
Position: fixed, top 0, full width, z-index 100
Height: 64px
Background: rgba(10, 14, 26, 0.8)
Backdrop Filter: blur(20px)
Border Bottom: 1px solid rgba(255,255,255,0.06)

Layout: flex, space-between, center
  Left: Shield icon + "THUNA" wordmark (H3, weight 700, letter-spacing 0.08em)
  Center: Nav links (Home, Archive, Dashboard, About)
  Right: Language toggle (EN | ML) + Search icon button
```

**Nav Link States:**
```
Default: --text-secondary, no decoration
Hover: --text-primary, underline offset 6px with accent-primary
Active: --text-primary, weight 600, underline with accent-primary
```

### 7. Metric Card (Dashboard)

```
┌────────────────────┐
│  📊               │
│  14,285            │  ← Display size, weight 700, --text-primary
│  Registered Cases  │  ← Small, --text-muted
└────────────────────┘
```

Glass card with optional accent glow on left border.

### 8. Timeline Entry (Case Detail)

```
●──── 14 OCT 2023 - 0900 HRS
│     Evidence Collection                [Critical]
│     Forensic unit dispatched to...
│     [View Report →]
│
●──── 12 OCT 2023 - 1430 HRS
│     FIR Filed                          [Logged]
│     Initial First Information Report...
│     [Access Initial FIR →]
```

- Vertical line: 2px, `--border-glass`
- Dot: 10px circle, filled with `--accent-primary`
- Timestamp: `font-mono`, `--text-muted`
- Title: H3
- Chip: Status badge (small variant)
- Body: `--text-secondary`, clamped
- Action: Ghost button, small

### 9. Bulletin Card

```
┌─────────────────────────────────────────┐
│ [Verified Alert]              27 Oct    │
│                                         │
│ Sabarimala Mandala Season:              │
│ Security Arrangements Finalized         │
│ (Malayalam subtitle below, --text-muted) │
│                                         │
│ Summary text...                         │
│                                 [Read →]│
└─────────────────────────────────────────┘
```

### 10. Filter Chips

Horizontal scrollable row of selectable chips.

```
Default: glass-subtle-bg, --text-secondary, border glass-subtle
Selected: accent-primary at 15% bg, accent-primary text, accent-primary border at 40%
Hover: bg-glass-hover
Padding: 6px 16px
Border Radius: 100px
Font: Small, weight 500
Gap: 8px
```

---

## Page Layouts

### Page 1: Landing / Home

```
┌──────────────────────────────────────────────────────────────┐
│  [═══════════ TOP NAV (glass) ════════════════]              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│        THUNA                                                 │
│        Public Crime Transparency Portal                      │
│        Kerala Police                                         │
│                                                              │
│        [Search Bar ─────────────────────────]                 │
│                                                              │
│        [Active Cases: 3]  [Resolved: 1]  [Districts: 4]     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ⚡ URGENT NOTICES (scrolling ticker / alert banner)        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   LATEST BULLETINS                                           │
│   ┌──────────┐  ┌──────────┐                                │
│   │ Bulletin │  │ Bulletin │                                 │
│   └──────────┘  └──────────┘                                │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   PUBLIC ARCHIVE                                [View All →] │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │Case Card │  │Case Card │  │Case Card │                  │
│   └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   OPERATIONS HUB                                             │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│   │ File Report  │ │  Live Map    │ │ Deep Archive │        │
│   └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   TRANSPARENCY                                               │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│   │ Access     │ │ Redaction  │ │ Data       │              │
│   │ Rules      │ │ Policy     │ │ Reliability│              │
│   └────────────┘ └────────────┘ └────────────┘             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Footer: © Kerala Police · Links · Language Toggle           │
└──────────────────────────────────────────────────────────────┘
```

**Hero Section Details:**
- Background: Subtle animated gradient mesh (deep navy → indigo → dark blue), very slow drift
- "THUNA" wordmark: Display size, weight 700, letter-spacing 0.1em
- Subtitle: H2, `--text-secondary`
- Below subtitle: small shield icon + "Kerala Police" in `--text-muted`
- Search bar: centered, max-width 640px, prominent with glow focus
- Stat pills: row of glass chips showing live counts

### Page 2: Search / Archive View

```
┌──────────────────────────────────────────────────────────────┐
│  [═══════════ TOP NAV ═══════════════════]                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   PUBLIC ARCHIVE                                             │
│   [Search Bar ───────────────────────────────]               │
│                                                              │
│   Filters: [All] [Active] [Closed] [Critical]  District ▼   │
│                                                              │
│   Showing 4 results                              Grid | List │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │Case Card │  │Case Card │  │Case Card │                  │
│   └──────────┘  └──────────┘  └──────────┘                 │
│   ┌──────────┐                                              │
│   │Case Card │                                               │
│   └──────────┘                                              │
│                                                              │
│   [Load More / Pagination]                                   │
└──────────────────────────────────────────────────────────────┘
```

### Page 3: Case Detail View

```
┌──────────────────────────────────────────────────────────────┐
│  [═══ TOP NAV ════]                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ← Back to Archive                                          │
│                                                              │
│   [Active]  [Financial Fraud]                                │
│   KP-2023-04-882 (mono)                                      │
│   Cyber Financial Fraud Investigation                        │
│   സാമ്പത്തിക തട്ടിപ്പ് അന്വേഷണം                                        │
│                                                              │
│   ┌─────────────────────┬──────────────────────┐            │
│   │                     │                      │             │
│   │   CASE OVERVIEW     │   ASSIGNED OFFICER   │             │
│   │   Filed: 14 Oct 23  │   Ramesh Menon       │             │
│   │   District: EKM     │   Inspector of Police│             │
│   │   Station: Cyber    │   Badge: #8832-K     │             │
│   │   Class: Active     │                      │             │
│   │                     │                      │             │
│   └─────────────────────┴──────────────────────┘            │
│                                                              │
│   INVESTIGATION TIMELINE                                     │
│   ●── 14 OCT 2023 ─ Evidence Collection [Critical]          │
│   │   Forensic unit dispatched...                            │
│   ●── 12 OCT 2023 ─ FIR Filed [Logged]                      │
│   │   Initial FIR filed...                                   │
│                                                              │
│   CASE MATERIALS                                             │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│   │📄 Evidence   │ │📄 Transcripts│ │📄 Route Map  │       │
│   └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                              │
│   [Download CSV] [Print Summary]                             │
└──────────────────────────────────────────────────────────────┘
```

### Page 4: Dashboard (Metrics Overview)

```
┌──────────────────────────────────────────────────────────────┐
│  [═══ TOP NAV ════]                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   DASHBOARD                                                  │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │ 14,285   │  │  82.4%   │  │   342    │                  │
│   │ Cases YTD│  │ Resolved │  │ Active   │                   │
│   └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│   RECENT CASES                           QUICK REFERENCES    │
│   ┌──────────────────────┐    ┌────────────────────┐        │
│   │ Case list (compact)  │    │ Wanted Persons     │        │
│   │ ...                  │    │ Missing Reports    │         │
│   │ ...                  │    │ District Directory │         │
│   └──────────────────────┘    └────────────────────┘        │
└──────────────────────────────────────────────────────────────┘
```

---

## Animation Guidelines

### Transitions

| Property | Duration | Easing | Usage |
|---|---|---|---|
| Color, opacity | 200ms | `ease-out` | Hover states, fades |
| Transform | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Card lifts, slides |
| Box shadow | 300ms | `ease-out` | Glow effects |
| Backdrop filter | 400ms | `ease-in-out` | Glass transitions |

### Micro-Animations

1. **Card Entrance** — Staggered fade-up (`opacity: 0 → 1`, `translateY: 20px → 0`), 80ms stagger per card
2. **Search Focus** — Border glow pulse (`box-shadow` expand from 0 to 3px accent ring)
3. **Status Pulse** — Active/critical badges: subtle scale pulse (1.0 → 1.02 → 1.0), 3s loop
4. **Page Transition** — Cross-fade, 250ms
5. **Ticker Scroll** — Urgent notices auto-scroll horizontally, pausable on hover
6. **Skeleton Loading** — Shimmer gradient sweep (left → right, 1.5s loop) on glass-bg cards

### Motion Library

Use **Framer Motion** (already installed as `motion` package):
- `AnimatePresence` for page/route transitions
- `motion.div` with `whileInView` for scroll-triggered card entrances
- `layoutId` for shared element transitions (e.g., case card → case detail)

---

## Responsive Breakpoints

| Breakpoint | Width | Grid Columns | Notes |
|---|---|---|---|
| Mobile | < 640px | 1 | Stack everything, hamburger nav |
| Tablet | 640–1024px | 2 | Side-by-side cards, collapsible filters |
| Desktop | 1024–1280px | 3 | Full grid, expanded nav |
| Wide | > 1280px | 3–4 | Max-width container, centered |

---

## Accessibility Standards

- **Contrast:** All text meets WCAG AA (4.5:1 for body, 3:1 for large text) — verified against dark backgrounds
- **Focus rings:** Visible 3px accent-primary outline on all interactive elements
- **Keyboard nav:** Full tab ordering, Enter/Space activation, Escape to close
- **Screen readers:** Semantic HTML5 (`nav`, `main`, `article`, `aside`), ARIA labels on icon-only buttons
- **Reduced motion:** Respect `prefers-reduced-motion` — disable animations, keep instant state changes
- **Font scaling:** All sizes in `rem`, layout doesn't break at 200% zoom

---

## File Structure (Target)

```
src/
├── styles/
│   ├── tokens.css          # All CSS custom properties (colors, spacing, typography)
│   ├── globals.css          # Reset, base styles, body, scrollbar
│   ├── glass.css            # Glassmorphism utility classes
│   ├── components.css       # Component-specific styles
│   ├── layouts.css          # Grid systems, page layouts, responsive
│   └── animations.css       # Keyframes, transition utilities
├── components/
│   ├── layout/
│   │   ├── TopBar.jsx
│   │   ├── Footer.jsx
│   │   └── PageShell.jsx    # Wraps content with nav + footer
│   ├── GlassCard.jsx
│   ├── CaseCard.jsx
│   ├── StatusBadge.jsx
│   ├── SearchBar.jsx
│   ├── FilterChips.jsx
│   ├── MetricCard.jsx
│   ├── TimelineEntry.jsx
│   ├── BulletinCard.jsx
│   ├── UrgentTicker.jsx
│   └── SkeletonLoader.jsx
├── views/
│   ├── LandingView.jsx
│   ├── ArchiveView.jsx
│   ├── CaseDetailView.jsx
│   └── DashboardView.jsx
├── lib/
│   ├── demoData.js          # (existing)
│   └── supabase.js          # (existing)
├── App.jsx                  # Router shell
└── main.jsx                 # Entry point
```

---

## Implementation Phases

### Phase 1 — Foundation
- Set up CSS token files (`tokens.css`, `globals.css`, `glass.css`)
- Import Google Fonts (Inter, JetBrains Mono, Noto Sans Malayalam)
- Configure TailwindCSS v4 integration with custom tokens (already in deps)
- Build `TopBar`, `Footer`, `PageShell` layout components

### Phase 2 — Core Components
- `GlassCard`, `StatusBadge`, `SearchBar`, `FilterChips`
- `CaseCard`, `MetricCard`, `BulletinCard`
- `SkeletonLoader` with shimmer animation

### Phase 3 — Page Assembly
- `LandingView` — hero, ticker, bulletins, case grid, ops hub, transparency
- `ArchiveView` — search + filters + paginated case grid
- `CaseDetailView` — full case with timeline, materials, officer info
- `DashboardView` — metrics + recent cases + quick references

### Phase 4 — Polish
- Framer Motion entrance animations + page transitions
- `prefers-reduced-motion` support
- Mobile responsive testing at all breakpoints
- Bilingual toggle (EN/ML) wiring
- Accessibility audit (contrast, focus, keyboard, screen reader)
