---
name: THUNA Maximalist
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#44474e'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4d5e83'
  primary: '#000d29'
  on-primary: '#ffffff'
  primary-container: '#102345'
  on-primary-container: '#7a8bb3'
  inverse-primary: '#b5c6f1'
  secondary: '#415e96'
  on-secondary: '#ffffff'
  secondary-container: '#a1befd'
  on-secondary-container: '#2e4c84'
  tertiary: '#160c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#322000'
  on-tertiary-container: '#b1822c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b5c6f1'
  on-primary-fixed: '#061a3c'
  on-primary-fixed-variant: '#35466a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#27467d'
  tertiary-fixed: '#ffdeac'
  tertiary-fixed-dim: '#f3be61'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-hero:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  malayalam-support:
    lineHeight: '1.8'
spacing:
  unit: 4px
  gutter: 24px
  margin: 40px
  panel-padding: 32px
  stack-gap: 12px
---

## Brand & Style

This design system is built on a foundation of **Maximalist Civic Authority**. It rejects the trend of whitespace-heavy minimalism in favor of a "Taxonomy of Information" approach. The interface is designed to feel like a high-stakes, digital archive—dense, layered, and unmistakably official.

The style blends **Brutalism** with **Modern Institutionalism**. It uses heavy structural lines, double-bordered containers, and stacked panels to communicate stability and depth. The aesthetic response should be one of "Urgent Trust": the user should feel that the system is powerful, data-rich, and meticulously organized. It evokes the feeling of a command center, utilizing archival motifs such as header bands, boxed labels, and official medallions to reinforce the presence of the Kerala Police.

## Colors

The palette is anchored by **Police Blue** (#102345), providing a deep, authoritative foundation. This is contrasted against **Government Ivory** (#f6f1e7), which serves as the primary page background to evoke paper documents and official ledgers.

**Copper Gold** (#b5862f) is used as a "Prestige Accent" for seals, monumental metrics, and high-level headers. **Alert Red** (#d94b3d) is reserved strictly for emergencies, urgent notices, and "Live" status indicators. For secondary surfaces and inset panels, **Pale Blue** and **Pale Gold** provide tonal variety while maintaining the "layered" visual density required by the brand.

## Typography

This design system employs a **Strong Editorial** typographic hierarchy. **Epilogue** is used for headlines to provide a bold, geometric, and uncompromising presence. **Public Sans** is used for body copy and labels to maintain institutional clarity and readability.

**Bilingual Stacking:** All primary labels must feature English and Malayalam. The Malayalam text should be set 10% larger than the English counterpart with a 1.8 line-height to accommodate the script's vertical anatomy. Use **Bold Display** weights for headers and **Boxed Labels** (all-caps, high tracking) for metadata and categories.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** with a dense, structured rhythm. Unlike modern web layouts that seek "breathing room," this system seeks "organized density." 

The spacing philosophy uses a **4px base unit**. Containers should be tightly packed with uniform 24px gutters. Use **header bands** (full-width horizontal stripes) to break sections. Layouts should utilize "Archival Tabs"—offset elements that sit on the top edges of cards—to denote categories. Margin areas are used for secondary navigational "Stripes" or vertical text labels.

## Elevation & Depth

Depth is achieved through **Structural Layering** rather than realistic shadows. 

1.  **Double Borders:** Primary containers use a 2px solid border in Police Blue, with a 1px internal offset border to create a "frame" effect.
2.  **Stacked Panels:** Use 4px solid "drop blocks" (hard shadows) in Secondary Blue to lift elements.
3.  **Inset Boxes:** Search fields and data entries should appear "recessed" into the Ivory surface using 1px interior strokes.
4.  **Tonal Stacking:** Use Pale Blue and Pale Gold surfaces to distinguish between "Active" and "Reference" panels within the same view.

## Shapes

The shape language is strictly **Sharp (0px)**. All corners are 90-degree angles to reinforce the civic, architectural, and authoritative nature of the police force. 

Circular elements are reserved exclusively for **Official Medallions** and Seal-like iconography, which act as "stamps" of authenticity over the sharp-edged grid. Decorative diagonal "Police Stripes" (45-degree patterns) may be used as fill for headers or divider lines.

## Components

*   **Buttons:** Rectangular with high-contrast borders. Primary buttons use Police Blue with Copper Gold text. "Urgent" buttons use Alert Red with White text.
*   **Cards:** Strong 2px outlines. They must include a "Header Band" (a solid color bar at the top containing the title) and a "Footer Metadata" row.
*   **Status Badges:** Styled as "Official Stamps"—rectangular with a thick border, using uppercase bold typography.
*   **Monumental Metrics:** Large-scale numbers (Epilogue Bold) for data like "Cases Resolved" or "Emergency Response Time," often paired with a Copper Gold background.
*   **Input Fields:** Boxed with visible labels that sit on the top border line (Label-in-Border).
*   **Bilingual Tabs:** Navigation tabs must stack Malayalam above English, separated by a thin hairline divider.
*   **Archival Tabs:** Cards and sections should feature a small, rectangular tab protruding from the top-left corner, acting as a label for the content type.