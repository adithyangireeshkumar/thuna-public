# THUNA Portal — UI/UX & Frontend Management Plan

> **Version:** 2.0 · **Theme:** Retro Warmth (Red `#D9381E`, Yellow `#E8B923`, Green `#4B8B3B`)
> **Stack:** Vite + React 19 + Vanilla CSS + Supabase + Lucide Icons

---

## 1. Design System — Retro Warmth Token Reference

### 1.1 Color Tokens

```css
:root {
  /* ── Primary Retro Palette ── */
  --retro-red:        #D9381E;
  --retro-red-light:  #FFDDD6;
  --retro-red-dark:   #8B1A0E;

  --retro-yellow:     #E8B923;
  --retro-yellow-light: #FFF4D1;
  --retro-yellow-dark:  #7A5C00;

  --retro-green:      #4B8B3B;
  --retro-green-light: #DFF0D8;
  --retro-green-dark:  #2A5422;

  /* ── Neutrals ── */
  --bg-cream:         #FDF5E6;
  --bg-charcoal:      #1A1A1A;
  --bg-card:          #FCFAF5;
  --ink-primary:      #2C2C2C;
  --ink-secondary:    #666666;
  --border-heavy:     #2C2C2C;
  --border-light:     #D2D0CB;

  /* ── Semantic ── */
  --color-danger:     var(--retro-red);
  --color-warning:    var(--retro-yellow);
  --color-success:    var(--retro-green);
  --color-info:       #3B6EB5;

  /* ── Shadows (Neo-Brutalist) ── */
  --shadow-hard:      4px 4px 0 var(--ink-primary);
  --shadow-soft:      2px 2px 0 rgba(44, 44, 44, 0.3);
  --shadow-inset:     inset 0 2px 4px rgba(0,0,0,0.15);

  /* ── Typography ── */
  --font-heading:     'Rokkitt', 'Cooper Black', serif;
  --font-body:        'Inter', 'Space Grotesk', system-ui, sans-serif;
  --font-mono:        'JetBrains Mono', 'Fira Code', monospace;

  /* ── Spacing Scale ── */
  --space-xs: 0.25rem;  --space-sm: 0.5rem;
  --space-md: 1rem;     --space-lg: 1.5rem;
  --space-xl: 2rem;     --space-2xl: 3rem;

  /* ── Border Radii ── */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-pill: 999px;

  /* ── Transitions ── */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
}
```

### 1.2 Typography Scale

| Token          | Size          | Weight | Use Case                       |
|----------------|---------------|--------|--------------------------------|
| `display-xl`   | clamp(3.2rem, 5vw, 5rem) | 900 | Hero headings              |
| `display-lg`   | clamp(2.6rem, 4vw, 4.6rem) | 800 | Page titles              |
| `heading-1`    | 2rem          | 800    | Section headers                |
| `heading-2`    | 1.6rem        | 700    | Card titles                    |
| `heading-3`    | 1.35rem       | 700    | Sub-section labels             |
| `body-lg`      | 1.15rem       | 400    | Lead paragraphs                |
| `body`         | 1rem          | 400    | Default body text              |
| `body-sm`      | 0.9rem        | 500    | Meta labels, tags              |
| `caption`      | 0.82rem       | 700    | Timestamps, badges             |
| `mono`         | 0.85rem       | 400    | FIR numbers, codes             |

---

## 2. Component Library — Inventory & Specification

### 2.1 Buttons

#### Primary Button (`.btn-primary`)
- **Look:** Solid `--retro-red` fill, white text, 3px solid `--border-heavy` border
- **Shadow:** `var(--shadow-hard)` — shifts to `2px 2px 0` on `:active` (press effect)
- **States:** Hover → darken 10%, Active → translate(2px, 2px) + reduced shadow, Disabled → 50% opacity, no shadow
- **Sizes:** `--btn-sm` (0.7rem 1rem), `--btn-md` (0.95rem 1.4rem), `--btn-lg` (1.1rem 1.8rem)
- **Usage:** Submit forms, "Execute", "Apply Filters", "Sign In", "Initiate Filing"

#### Secondary Button (`.btn-secondary`)
- **Look:** Solid `--retro-yellow` fill, `--ink-primary` text, 3px border
- **Shadow:** `var(--shadow-hard)`
- **Usage:** "Export Dataset", "Dispatch", warnings, secondary CTAs

#### Success Button (`.btn-success`)
- **Look:** Solid `--retro-green` fill, white text, 3px border
- **Usage:** "Request Briefing", "View Details", positive confirmations

#### Outline Button (`.btn-outline`)
- **Look:** Transparent fill, 2–3px `--border-heavy` border, `--ink-primary` text
- **Hover:** Fill transitions to `rgba(44,44,44,0.06)`
- **Usage:** "Export Dataset", "Access Full Dossier", tertiary actions

#### Ghost / Link Button (`.btn-ghost`)
- **Look:** No border, no background, bold uppercase text + `ChevronRight` icon
- **Hover:** Underline + icon nudge right 4px
- **Usage:** "View Full Dossier →", "Read Statement →", inline navigation

#### Icon Button (`.btn-icon`)
- **Look:** 44×44px touch target, transparent, icon only
- **Hover:** `--retro-yellow` background circle
- **Usage:** Topbar actions (Bell, FileBadge2, UserCircle2), map toolbar

#### Emergency Button (`.btn-emergency`)
- **Look:** `--retro-yellow` fill, `--ink-primary` text, `Siren` icon, bold uppercase
- **Hover:** Pulsing yellow glow animation
- **Usage:** "Emergency 112" in topbar — single instance

#### Wide Button (`.btn-wide`)
- **Look:** Full-width, `--retro-red` or `--retro-green` fill
- **Usage:** Sidebar CTA, Auth sign-in, filter apply

### 2.2 Cards

#### Archive Case Card (`.archive-card`)
```
┌─────────────────────────────────┐
│ [BADGE floating tag]            │
├─ STATUS BAR (red/blue) ─────── REF ─┤
│                                 │
│  തട്ടിപ്പ് അന്വേഷണം (Malayalam)    │
│  CYBER FINANCIAL FRAUD          │
│                                 │
│  Date Filed    │  Jurisdiction   │
│  14 Oct 2023   │  Kochi Cyber    │
│                                 │
│  Summary paragraph...           │
├─────────────────────────────────┤
│  3 Exhibits    [View Dossier →] │
└─────────────────────────────────┘
```
- **Border:** 2px solid, color varies by status (`--retro-red` for active, `--color-info` for closed)
- **Shadow:** `var(--shadow-hard)`
- **Hover:** Translate -2px upward, shadow grows to `6px 6px 0`

#### Metric Card (`.metric-card`)
- **Layout:** Label (caption) → Large number (display) → Progress bar
- **Variants:** `--navy` accent bar, `--retro-yellow` accent bar
- **Size:** Fits 2-column grid within hero panel

#### Ops Card (`.ops-card`)
- **Layout:** Corner icon → Title → Description → Link action
- **Variants:** `danger` (red bg), `navy` (dark bg), `neutral` (white bg)
- **Min-height:** 20rem for visual consistency

#### Incident Card (`.incident-card`)
- **Floating label:** Priority level tag
- **Variants:** `critical` (red border), `high` (navy + gold label), `elevated` (dimmed 72% opacity)
- **Content:** Code + Title, timestamp, summary, location/unit chips

#### Personnel Card (`.personnel-card`)
- **Content:** Avatar circle (78px, icon placeholder) → Name + Rank + Badge
- **CTA:** Full-width "Request Briefing" button

#### Bulletin Card (`.bulletin-card`)
- **Content:** Badge + timestamp meta → Malayalam title → English title → Image block → Summary → CTA
- **Variant:** `--secondary` for less prominent bulletins

#### Settings Card / Transparency Card
- **Simple frame:** Title + body text, uniform grid layout

### 2.3 Navigation

#### Top Bar (`.topbar`)
- **Layout:** 3-column grid — Brand | Search | Actions
- **Background:** Dark navy, gold accent border-bottom (3px)
- **Brand block:** Malayalam text + divider + English text + "THUNA PORTAL" label
- **Search:** Inline icon + input, navy/transparent background
- **Actions:** Icon buttons + Emergency CTA

#### Sidebar (`.sidebar`)
- **Layout:** Hero block (title + subtitle + CTA) → Vertical nav stack
- **Nav items:** Icon + Label, uppercase, letter-spaced
- **Active state:** Navy background, white text, 4px gold left inset border
- **Sticky:** Full viewport height minus topbar

### 2.4 Data Components

#### Filter Panel (`.filter-panel`)
- **Floating label:** "REFINE ARCHIVE"
- **Controls:** Select dropdown (Jurisdiction), Year range inputs, Radio group (Classification)
- **CTA:** Full-width "Apply Filters" button at bottom

#### Results Table (`.data-table`) — from `ResultsTable.jsx`
- **Columns:** FIR Number | Case Title | Crime Type | Status | Registered | Station | IPC/Act | I/O Name
- **Sortable headers:** Click to toggle, sort icon indicator
- **Row hover:** Subtle highlight
- **FIR numbers:** Monospace font, accent color
- **Status badges:** Colored pills per status value

#### Search Bar (`.search-bar`) — from `SearchBar.jsx`
- **Layout:** Icon | Input | Clear button | Submit button
- **Hint pills:** "Try:" label + clickable keyword pills below
- **States:** Loading spinner replaces icon, disabled input during search

### 2.5 Feedback & Status

#### Status Banner (`.status-banner`)
| Variant   | Background       | Border          | Use                        |
|-----------|------------------|-----------------|----------------------------|
| `--info`  | `#E9F0FF`        | `#A8BBF4`       | "Synchronizing feed..."    |
| `--warn`  | `#FFF2D7`        | `#E5C16C`       | Supabase unavailable       |
| `--success`| `#E7F6EC`       | `#9EC3AB`       | "Live records loaded"      |

#### Status Badge (`.status-badge`)
- Colored pill: `active` → red, `closed` → blue, `under_investigation` → yellow
- Uppercase, small text, border-radius pill

#### Floating Label (`.floating-label`)
- Absolutely positioned `-1rem` above parent frame
- Navy background, white text, bold uppercase

### 2.6 Specialized Components

#### Timeline (`.timeline`)
- Vertical line (6px navy) with dot markers (22px circle, gold fill, navy border)
- Cards branch right from the line
- Each card: timestamp header + chip badge + title + body + outline action button

#### Crime Map (`.map-panel`)
- Navy background with CSS grid overlay pattern
- Floating toolbar (right): Search, Layers, Heatmap icons
- Map nodes: Positioned absolutely with `left%`/`top%`
  - `critical`: Red dot + red glow ring
  - `high`: Gold dot + gold glow ring
  - `stable`: White dot + navy border
- Legend card: Anchored bottom-right

#### Map Selection Card (`.map-selection`)
- Sticky sidebar card with stats grid (Status + Units Active)
- Two-button action row: "View Details" (primary) + "Dispatch" (outline)

#### Auth Card (`.auth-card`)
- Grid background overlay (30px grid pattern)
- Centered card: Navy header + Red warning bar + Auth panel + Footer
- Single CTA: "Sign in with Google Workspace"

---

## 3. Page Architecture

### 3.1 Page Map & Route Structure

```
App (Root)
├── TopBar                           [sticky, always visible]
├── Sidebar                          [hidden during Auth view]
└── Main View (conditional render)
    ├── "dashboard"    → DashboardView
    ├── "data"         → DataPortalView
    ├── "archives"     → DataPortalView (shared)
    ├── "case"         → CaseDetailView
    ├── "map"          → CrimeMapView
    ├── "news"         → NewsView
    ├── "transparency" → TransparencyView
    ├── "personnel"    → PersonnelView
    ├── "settings"     → SettingsView
    └── [authOpen]     → AuthView (fullscreen overlay)
```

### 3.2 Page Specifications

#### Dashboard (`DashboardView`)
- **Hero Panel:** Full-width navy block with display heading, search bar, 3 metric cards
- **Operations Hub:** 3-column card grid (File Report, Live Map, Deep Archive)
- **Purpose:** Entry point, at-a-glance metrics, quick navigation

#### Data Portal / Archives (`DataPortalView`)
- **Layout:** 370px filter sidebar | Flexible archive card grid (2-col)
- **Header:** Page title + "Export Dataset" outline button
- **Filter Panel:** Jurisdiction select, temporal range, classification radio group
- **Cards:** Archive cards with status bars, metadata, and "View Full Dossier" links

#### Case Detail (`CaseDetailView`)
- **Breadcrumbs:** Archives › Active Cases › Case #ID
- **Header:** Navy panel with case name, description, status stamp (rotated 3°)
- **Layout:** Timeline column | Sidebar (Personnel card + Materials card)

#### Crime Map (`CrimeMapView`)
- **Layout:** 370px incident log sidebar | Full map panel
- **Incident Log:** Navy header with gold accent, stacked incident cards
- **Map:** CSS-rendered with positioned nodes and floating legend
- **Selection Card:** Sticky right panel (visible when map view active)

#### News (`NewsView`)
- **Banner:** Bulletin banner frame with page title
- **Layout:** Main feed (bulletin cards) | 320px rail (Urgent notices + Quick refs + Metric)

#### Transparency (`TransparencyView`)
- **Header:** Title + description
- **Grid:** 3-column cards (Public Access Rules, Redaction Policy, Data Reliability)
- **Metrics:** 3-column stat cards (Published Records, Active Dossiers, Closed Archives)

#### Personnel (`PersonnelView`)
- **Grid:** 3-column personnel entry cards with avatar icon + name + rank + station

#### Settings (`SettingsView`)
- **Grid:** 3 cards (Data Source, Secure Node status, Publication Mode)

#### Auth (`AuthView`)
- **Fullscreen overlay:** Grid background, centered auth card
- **Hides sidebar**, uses `main-view--auth` class to remove padding

---

## 4. Interaction Patterns

### 4.1 Button Micro-Interactions

| Interaction           | Animation                                                |
|-----------------------|----------------------------------------------------------|
| Hover (all buttons)   | Background darken/lighten 10%, `var(--duration-fast)`    |
| Active press          | `transform: translate(2px, 2px)`, shadow reduces         |
| Ghost link hover      | Icon slides right 4px, text underline appears            |
| Emergency button      | Subtle pulsing glow on hover (`box-shadow` keyframe)     |
| Disabled              | `opacity: 0.5`, `cursor: not-allowed`, no shadow         |

### 4.2 Card Interactions

| Interaction           | Animation                                                |
|-----------------------|----------------------------------------------------------|
| Card hover            | `translateY(-2px)`, shadow grows 2px                     |
| Card click/focus      | Border color accent shift                                |
| Archive card enter    | Status bar color pulse once                              |
| Map node hover        | Scale to 1.4x, glow ring expands                        |

### 4.3 Page Transitions

| Transition            | Method                                                   |
|-----------------------|----------------------------------------------------------|
| View switch           | CSS `opacity` + `translateY(8px)` fade-up, 250ms         |
| Sidebar active change | Background color slide with `transition: all 200ms`      |
| Status banner appear  | SlideDown from `max-height: 0`                           |
| Auth overlay          | Fade in with scale from 0.96 to 1.0                     |

### 4.4 Scroll Behavior
- **TopBar:** `position: sticky; top: 0; z-index: 30`
- **Map Selection Card:** `position: sticky; top: 7rem`
- **Filter Panel:** `align-self: start` (scrolls with content)

---

## 5. Responsive Breakpoints

### Breakpoint: ≤ 1280px
- All 2-column layouts (`shell-body`, `data-layout`, `case-layout`, `map-view`, `news-layout`) collapse to single column
- Sidebar loses fixed height, becomes horizontal or collapsible
- Topbar collapses to single column
- Map selection card becomes static, full width

### Breakpoint: ≤ 900px
- All 3-column grids (`ops-grid`, `archive-grid`, `transparency-grid`, `settings-grid`, `personnel-grid`) collapse to single column
- Hero stats and case meta become single column
- Page header flexes to vertical `column` direction

### Future: ≤ 600px (Mobile)
- Sidebar becomes bottom tab bar or hamburger drawer
- Cards become full-width, stacked
- Table switches to `CaseCard` card view
- Search bar takes full width, hints wrap

---

## 6. Accessibility Requirements

| Requirement                | Implementation                                         |
|----------------------------|--------------------------------------------------------|
| Skip link                  | `<a href="#main-content">` hidden until focused         |
| Landmark roles             | `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>` |
| Search form role           | `role="search"` + `aria-label`                         |
| Table semantics            | `<th scope="col">`, `aria-sort`, `aria-rowcount`       |
| Button labels              | All icon-only buttons have `aria-label`                |
| Focus indicators           | `2px solid` outline on `:focus-visible`                |
| Color contrast             | All text meets WCAG 2.1 AA (4.5:1 body, 3:1 large)    |
| Keyboard navigation        | All interactive elements reachable via Tab              |
| Loading states             | `aria-busy` on inputs, spinner + "Searching…" text     |
| Malayalam text              | `font-family: 'Manjari'` for Malayalam headings         |

---

## 7. Current File Structure & Proposed Refactor

### Current Structure
```
src/
├── App.jsx              ← 856 lines, ALL views defined inline
├── App.css              ← Legacy Vite boilerplate (unused)
├── index.css            ← 1488 lines, ALL styles in one file
├── main.jsx             ← Entry point
├── components/
│   ├── SearchBar.jsx    ← Public search (standalone)
│   ├── ResultsTable.jsx ← Public results table
│   ├── CaseCard.jsx     ← Mobile case card
│   └── formatStatus.js  ← Utility
└── lib/
    ├── demoData.js      ← Demo records + helpers
    └── supabase.js      ← Supabase client + queries
```

### Proposed Refactored Structure
```
src/
├── main.jsx
├── App.jsx                        ← Router shell only (~50 lines)
├── styles/
│   ├── tokens.css                 ← Design tokens (colors, spacing, typography)
│   ├── reset.css                  ← Box-sizing, base resets
│   ├── components.css             ← All component styles
│   ├── layouts.css                ← Grid systems, page layouts
│   └── responsive.css             ← Media queries
├── components/
│   ├── layout/
│   │   ├── TopBar.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatusBanner.jsx
│   ├── buttons/
│   │   ├── PrimaryButton.jsx
│   │   ├── OutlineButton.jsx
│   │   ├── IconButton.jsx
│   │   └── EmergencyButton.jsx
│   ├── cards/
│   │   ├── MetricCard.jsx
│   │   ├── ArchiveCard.jsx
│   │   ├── OpsCard.jsx
│   │   ├── IncidentCard.jsx
│   │   ├── PersonnelCard.jsx
│   │   └── BulletinCard.jsx
│   ├── data/
│   │   ├── SearchBar.jsx
│   │   ├── ResultsTable.jsx
│   │   ├── FilterPanel.jsx
│   │   └── CaseCard.jsx
│   ├── map/
│   │   ├── MapPanel.jsx
│   │   ├── MapNode.jsx
│   │   ├── MapSelectionCard.jsx
│   │   └── LegendCard.jsx
│   └── shared/
│       ├── FloatingLabel.jsx
│       ├── Badge.jsx
│       └── formatStatus.js
├── views/
│   ├── DashboardView.jsx
│   ├── DataPortalView.jsx
│   ├── CaseDetailView.jsx
│   ├── CrimeMapView.jsx
│   ├── NewsView.jsx
│   ├── TransparencyView.jsx
│   ├── PersonnelView.jsx
│   ├── SettingsView.jsx
│   └── AuthView.jsx
└── lib/
    ├── demoData.js
    └── supabase.js
```

---

## 8. State Management

### Current State (all in `App()`)
| State             | Type      | Purpose                          |
|-------------------|-----------|----------------------------------|
| `activeView`      | string    | Current page/view key            |
| `records`         | array     | Case records (demo or Supabase)  |
| `loading`         | boolean   | Supabase fetch in progress       |
| `query`           | string    | Global search query              |
| `filters`         | object    | `{ district, status }`           |
| `selectedCaseId`  | string    | Active case for detail view      |
| `authOpen`        | boolean   | Auth overlay toggle              |
| `authGranted`     | boolean   | Simulated auth state             |
| `error`           | string    | Error message                    |

### Derived State (via `useMemo`)
- `filteredRecords` — filtered by query + filters
- `selectedCase` — looked up from records by ID
- `stats` — `{ total, active, closed, incidents }`
- `incidents` — mapped from cases for map view
- `districts` — unique district list for filter dropdown

---

## 9. Retro Theme Migration Checklist

When converting from the current navy/gold theme to the Retro Warmth theme:

- [ ] Replace `--navy` → use contextually: `--retro-red` for primary actions, `--bg-charcoal` for dark panels
- [ ] Replace `--gold` → `--retro-yellow` for accents, badges, highlights
- [ ] Replace `--forest` → `--retro-green` for success states
- [ ] Update `--paper` background to `--bg-cream` (`#FDF5E6`)
- [ ] Swap `font-family` heading declarations to `'Rokkitt', serif`
- [ ] Add Google Font import for Rokkitt
- [ ] Update all `box-shadow` values to use `--shadow-hard` with `--ink-primary`
- [ ] Change topbar background from navy to `--bg-charcoal`
- [ ] Change topbar accent border from gold to `--retro-red`
- [ ] Update sidebar active state to use `--retro-red` background
- [ ] Change hero panel background to `--bg-charcoal`
- [ ] Update hero accent text to `--retro-yellow`
- [ ] Update emergency button to `--retro-red` fill
- [ ] Change status stamp border to `--retro-red`
- [ ] Update `.ops-card--danger` to use `--retro-red-light` bg
- [ ] Update all `border-color` accent references
- [ ] Update map nodes: critical → `--retro-red`, high → `--retro-yellow`, stable → `--retro-green`
- [ ] Update auth card header to `--bg-charcoal`
- [ ] Update auth button to `--retro-green` for positive "Sign In" action
- [ ] Verify WCAG AA contrast ratios with new palette

---

## 10. Implementation Priority

### Phase 1 — Design Tokens & CSS Refactor
1. Create `tokens.css` with all Retro Warmth variables
2. Split `index.css` (1488 lines) into modular files
3. Apply retro color tokens globally

### Phase 2 — Component Extraction
1. Extract all inline components from `App.jsx` into separate files
2. Create reusable button component set
3. Create shared card component primitives

### Phase 3 — Interactions & Polish
1. Add hover/press micro-animations to all buttons
2. Add card hover lift effects
3. Add page transition animations
4. Add loading skeletons for data views

### Phase 4 — Responsive & Accessibility
1. Implement mobile breakpoint (≤600px)
2. Add hamburger menu or bottom tab bar
3. Full accessibility audit
4. Keyboard navigation testing

---

*This document serves as the single source of truth for all UI decisions in THUNA Portal. Hand this to any AI coding agent or developer to implement consistently.*
