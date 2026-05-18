---
name: My Inflation
description: Track how everyday product prices change over time
colors:
  carbon: "#1c1c1c"
  ink-night: "#08060d"
  quiet-mauve: "#6b6375"
  page-white: "#ffffff"
  graphite: "#111111"
  graphite-elevated: "#1c1c1c"
  chalk-edge: "#e5e4e7"
  slate-edge: "#2e303a"
  steel-mist: "#9ca3af"
  linen: "#f3f4f6"
  data-sky: "#93c5fd"
  data-deep: "#2563eb"
typography:
  display:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "56px"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-1.68px"
  headline:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.24px"
  body:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.18px"
  label:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "#2e2e2e"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.quiet-mauve}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.md}"
    padding: "24px"
  input:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: My Inflation

## 1. Overview

**Creative North Star: "The Ground Truth"**

This design language has one job: make the facts visible. No visual persuasion. No crafted urgency. No metric theater. This is a tool for checking what happened to prices — not for convincing anyone of anything, not for celebrating savings, not for manufacturing concern. The chart shows the curve. The curve is the answer.

The palette runs from Ink Night to Page White with a single near-black accent — Carbon — reserved for interactive elements only. Typography is one family (Inter Variable) across a clear four-step scale; hierarchy comes from size and weight, not decoration. Components are solid: gently rounded, bordered with a quiet edge, carrying a soft ambient shadow that places them on the page without lifting them above it. The one chromatic indulgence is deliberate: the chart line and its points are blue — Data Sky and Data Deep — the only hue in the system, applied exactly where the data lives.

Anti-references are load-bearing here. No neon accents (the crypto tell). No rainbow progress rings (the Mint/YNAB tell). No gradient heroes or social proof rows (the SaaS template tell). If any of those appeared, the signal would be: "this app is trying to sell you something." It is not. It is telling you prices.

**Key Characteristics:**
- Single sans-serif family; hierarchy through scale and weight, not color or decoration
- One near-black accent (Carbon), used only for interactive elements; its restraint signals action
- Two data colors (blues), applied only in the chart; blue elsewhere would collapse the system's one expressive signal
- Light surface as default; system dark mode respected via `prefers-color-scheme`; ambient shadow on cards only
- Portuguese UI copy; WCAG AA target; chart data accessible through non-color encoding

## 2. Colors: The Carbon Palette

One near-black accent on a quiet neutral field. The only expressive color lives in the chart.

### Primary
- **Carbon** (`#1c1c1c`): Buttons, focus rings, selected nav states, active affordances. Almost-black, not quite. Its use is confined to interactive elements — everything Carbon touches means "act here."

### Secondary
- **Data Sky** (`#93c5fd`): Chart line. The only expressive color in the interface. It should appear nowhere else.
- **Data Deep** (`#2563eb`): Chart data points. Paired with Data Sky; together the two blues are the only non-neutral hues in the product.

### Neutral
- **Page White** (`#ffffff`): Light-mode page background and card surfaces. Note: future work should tint toward Ink Night at chroma 0.005 — `oklch(99% 0.005 308)` — to give surfaces warmth that flat white lacks.
- **Ink Night** (`#08060d`): Heading text, light mode. Near-black with a violet undertone; warmer than pure black, colder than brown. The starting point of the neutral field's personality.
- **Quiet Mauve** (`#6b6375`): Body text and muted labels, light mode. The purple cast connects to Ink Night's undertone, giving the neutral field a coherent personality rather than a generic gray.
- **Chalk Edge** (`#e5e4e7`): Borders and dividers, light mode. Barely there — separates without asserting.
- **Graphite** (`#111111`): Page background, dark mode. Not pure black; has enough lightness to distinguish from Graphite Elevated surfaces.
- **Graphite Elevated** (`#1c1c1c`): Card and sidebar surfaces, dark mode. One step lighter than Graphite; tonal layering replaces ambient shadow as the depth signal in dark mode.
- **Steel Mist** (`#9ca3af`): Body and muted text, dark mode. Cooler than Quiet Mauve, matching the cooler dark surfaces.
- **Linen** (`#f3f4f6`): Heading text, dark mode. Near-white with a slight cool cast that holds contrast without harshness.
- **Slate Edge** (`#2e303a`): Borders and dividers, dark mode. The blue-gray tint is dark mode's one personality note, distinguishing it from a flat charcoal palette.

### Named Rules

**The One Voice Rule.** Carbon is the only accent. It appears on buttons, focus rings, and active nav states — nothing else. Its rarity is the point: when Carbon appears, something responds to the user. Decorative use collapses the system's only clear affordance signal.

**The Two Blues Rule.** Data Sky and Data Deep appear only in the chart. Introducing blue anywhere else — links, headers, labels, illustrations — destroys the one visual distinction that says "this is the data."

## 3. Typography: The Single Voice

**Display/Body Font:** Inter Variable, system-ui, sans-serif (one family throughout)

**Character:** Inter at variable weight covers the full register from chart label to page title. Negative tracking at larger sizes, positive at body, creates distinct visual zones without introducing a second typeface that needs managing. The system uses weight contrast (400 vs 500) and size contrast (1.3–2.3× between adjacent levels) to build hierarchy through the scale alone.

### Hierarchy
- **Display** (weight 500, 56px, line-height 1.1, −1.68px tracking): Page titles. Appears once per view; never used for section headings or card titles.
- **Headline** (weight 500, 24px, line-height 1.18, −0.24px tracking): Section headings, card titles.
- **Body** (weight 400, 18px, line-height 1.45, +0.18px tracking): Main copy. Max line length 65–70ch. The slight positive tracking keeps it comfortable at this size.
- **Label** (weight 500, 14px, line-height 1.4): Nav labels, metadata, form labels, chart annotations. Smaller, slightly heavier — reads as interface furniture, not content.

### Named Rules

**The One Size Jump Rule.** Adjacent typographic elements must differ by at least 1.25× in size. Flat scales — 16/18/20px — read as noise, not hierarchy. If the difference cannot be felt at a glance, merge the levels.

## 4. Elevation

This system uses a hybrid approach: ambient shadow on card surfaces in light mode, tonal layering in dark mode.

In light mode, cards carry a soft ambient shadow (`0 1px 2px 0 rgba(0,0,0,0.05)`) at rest. A heavier float shadow (`rgba(0,0,0,0.1) 0 10px 15px -3px, rgba(0,0,0,0.05) 0 4px 6px -2px`) is reserved for dropdowns, tooltips, and sheets. This creates one readable layer of depth: cards sit on the page; popovers float above cards.

In dark mode, elevation is tonal. Graphite (`#111111`) is the base; Graphite Elevated (`#1c1c1c`) is the surface layer. The compressed lightness range makes shadow less effective, so depth is communicated through background value steps rather than cast light.

### Shadow Vocabulary
- **ambient** (`0 1px 2px 0 rgba(0,0,0,0.05)`): Cards at rest, light mode. Places the surface on the page without drama.
- **float** (`rgba(0,0,0,0.1) 0 10px 15px -3px, rgba(0,0,0,0.05) 0 4px 6px -2px`): Dropdowns, sheets, popovers. Signals "above the page."

### Named Rules

**The Flat-By-Default Rule.** Only cards and floating panels carry shadows. Buttons, inputs, nav items, labels, and decorative elements are flat. Shadow on anything that doesn't need to sit above something else is decoration — and decoration is prohibited here.

## 5. Components

### Buttons
Solid and grounded: 6px radius (gently curved, not soft), confident weight, no pill shapes, no icon-only circles as primary actions.

- **Shape:** 6px radius. Legible as interactive; not decorative.
- **Primary:** Carbon background (`#1c1c1c`), white text, 40px tall, 16px horizontal padding. Hover: background lightens to `#2e2e2e`. Focus: 2px Carbon ring, 2px offset. Active: slight opacity decrease.
- **Outline:** Transparent background, Ink Night text, 1px Chalk Edge border. Hover: Carbon-tinted background tint (`rgba(28,28,28,0.05)`), border darkens.
- **Ghost:** No border, no background. Quiet Mauve text at rest. Hover: Carbon tint background, Ink Night text. Used for low-prominence actions that should not draw the eye.

### Cards
The primary data container. Solid presence — never invisible, never decorative.

- **Corner Style:** 8px radius (rounded-md).
- **Background:** Page White (`#ffffff`, light mode); Graphite Elevated (`#1c1c1c`, dark mode).
- **Shadow Strategy:** Ambient at rest (light mode only). The card always sits on the page, never flush with it.
- **Border:** 1px Chalk Edge (`#e5e4e7`, light) / Slate Edge (`#2e303a`, dark). Reinforces the card edge where shadow alone is insufficient.
- **Internal Padding:** 24px (spacing-lg) header and content areas.

### Inputs / Fields
- **Style:** 6px radius, 1px Chalk Edge border, Page White background, 40px tall. Identical silhouette to an outline button — both are form elements; the shape signals editability consistently.
- **Focus:** 2px Carbon ring, 2px offset. Consistent with button focus treatment.
- **Placeholder:** Quiet Mauve — suggests, does not announce.
- **Disabled:** 50% opacity, not-allowed cursor.

### Navigation (Sidebar)
Collapsible to icon rail. Nav items read as list items at rest, as buttons on interaction.

- **Default:** Transparent background, Quiet Mauve label (light) / Steel Mist label (dark), Lucide stroke icon at 20px.
- **Hover:** Subtle Carbon-tinted background tint, Ink Night text.
- **Active:** Carbon background (`#1c1c1c`), white text — the same carbon as primary buttons, used here as background rather than trigger. It is the only place where Carbon fills a nav element.
- **Dark mode sidebar:** Background `hsl(240 5.9% 10%)` — a degree cooler than Graphite, the system's one concession to personality in the dark shell. Hover state: `hsl(240 3.7% 15.9%)`.

### Product Select (Signature Component)
The primary interaction control on the dashboard. A shadcn Select styled with the same tokens as inputs.

- Trigger: constrained width with text truncation; same 6px radius and border as Input.
- Placeholder (Portuguese): "Selecione um produto" — always localized.
- Loading state: disabled trigger, placeholder "Carregando..."
- Error state: disabled trigger, placeholder "Erro ao carregar"
- Dropdown content: surface inherits border and card tokens; items have the same hover tint as ghost buttons.

### Price Chart (Signature Component)
Chart.js line chart, fluid container. The chart is the only place chromatic color appears.

- **Line:** Data Sky (`#93c5fd`), tension 0.3 (slightly curved, not angular).
- **Points:** Data Deep (`#2563eb`), distinguishes discrete data points from the interpolated curve.
- **Empty state:** Center-aligned, Quiet Mauve label text. "Selecione um produto para ver seu historico."
- **Accessible:** Chart must include aria-label describing the data and provide a non-color encoding alternative (point shape variation or linked data table) to meet WCAG AA.

## 6. Do's and Don'ts

### Do:
- **Do** use Carbon (`#1c1c1c`) only for interactive affordances: buttons, focus rings, active nav. When Carbon appears, it means: act here.
- **Do** keep Data Sky and Data Deep strictly inside the chart. Blue means data; blue elsewhere destroys that meaning.
- **Do** apply ambient shadow to all card surfaces in light mode. A shadowless card on a white page disappears.
- **Do** vary spacing for rhythm: 48px between major sections, 24px within cards, 8px between inline elements. Uniform padding everywhere is monotony.
- **Do** write UI copy in Portuguese. The interface is for Portuguese speakers; mixing languages signals inconsistency.
- **Do** provide accessible chart alternatives: ARIA labels, and at least one non-color encoding for the price trend (point shape, linked table, or screen-reader description).
- **Do** cap body text line length at 65–70ch on any text-heavy surface.

### Don't:
- **Don't** use neon accents, glow effects, or saturated bright colors anywhere outside the chart. Crypto dashboards use this vocabulary; it signals that the app is performing excitement rather than stating facts.
- **Don't** add rainbow progress rings, gamified achievement indicators, or color-coded budget status (green = good, red = bad). This is an inflation tracker, not a personal finance coach.
- **Don't** build a gradient hero, feature grid, or social proof row on any surface. Generic SaaS templates use this structure; it signals "selling something." This app is not selling anything.
- **Don't** use side-stripe borders (border-left or border-right greater than 1px as a colored accent on cards, list items, or alerts). Replace with full borders, background tints, or nothing.
- **Don't** use `background-clip: text` with a gradient fill for decorative type effects.
- **Don't** add shadow to buttons, inputs, nav items, or labels. Shadow is reserved for cards and floating panels.
- **Don't** introduce a second typeface. Inter Variable covers the full hierarchy. A display serif or a display mono would introduce a voice the system has no grammar for.
