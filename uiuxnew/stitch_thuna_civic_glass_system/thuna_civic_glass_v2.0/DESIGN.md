---
name: THUNA Civic Glass v2.0
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
  bg-deep: '#0a0e1a'
  bg-surface: '#111827'
  bg-elevated: '#1e2940'
  bg-glass: rgba(255, 255, 255, 0.04)
  bg-glass-hover: rgba(255, 255, 255, 0.08)
  border-glass: rgba(255, 255, 255, 0.08)
  border-glass-bright: rgba(255, 255, 255, 0.14)
  text-primary: '#f0f4fc'
  text-secondary: '#94a3b8'
  text-muted: '#64748b'
  text-inverse: '#0a0e1a'
  status-active: '#22c55e'
  status-critical: '#ef4444'
  status-review: '#a78bfa'
  accent-primary-glow: rgba(59, 130, 246, 0.15)
  accent-gold-glow: rgba(245, 158, 11, 0.12)
typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.025em
  h1:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  h3:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  small:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.04em
  h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  max-width: 1280px
  sidebar: 260px
---

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