# Design System


## Colors

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | `#111111` | Main page background |
| `bg-surface` | `#1c1c1c` | Sidebar / card surfaces |
| `bg-card` | `#ffffff` | Elevated card (e.g. logo block) |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#ffffff` | Headings, primary labels |
| `text-secondary` | `#9ca3af` | Body copy, descriptions |
| `text-muted` | `#6b7280` | Nav labels, metadata |
| `text-on-light` | `#111111` | Text on white buttons/cards |

---

## Typography

### Font Family
- **Primary (headings)**: `"Inter"` — bold geometric sans-serif
- **Secondary (body)**: `"Inter"`, system-ui, sans-serif

### Scale
| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Display / Hero | `4xl–5xl` (≈ 48–56px) | 700 (Bold) | 1.1 |
| H1 | `3xl` (≈ 36px) | 700 | 1.2 |
| H2 | `2xl` (≈ 24px) | 600 | 1.3 |
| Body | `sm–base` (14–16px) | 400 | 1.6 |
| Label / Nav | `xs–sm` (12–14px) | 500 | 1.4 |

---

## Buttons

### Primary
```
background: #ffffff
color:      #111111
border:     none
padding:    10px 20px
border-radius: 6–8px
font-weight: 600
prefix:     ● (bullet, color: #22c55e)
```

### Secondary
```
background: transparent (or #1c1c1c)
color:      #ffffff
border:     1px solid rgba(255,255,255,0.2)
padding:    10px 20px
border-radius: 6–8px
font-weight: 500
```

### States (both variants)
- **Hover**: subtle brightness increase (`filter: brightness(1.1)`) or border becomes fully opaque
- **Focus**: `outline: 2px solid #22c55e` (accent green)
- **Active**: slight scale down (`transform: scale(0.98)`)

---

## Spacing & Layout

- **Sidebar width**: ~200px fixed
- **Content padding**: `32–48px` horizontal, `40–64px` vertical
- **Gap between elements**: base unit `8px` (multiples: 8 / 16 / 24 / 32 / 48)
- **Border radius**: `6px` for buttons/cards; `12px` for larger surfaces

---

## Iconography

- Thin-stroke line icons (monochrome, white or `#6b7280`)
- Size: `16–20px`
- Used alongside nav labels in the sidebar

---

## Borders & Dividers

```
border: 1px solid rgba(255, 255, 255, 0.08)
```
Used to separate sidebar items and card edges — very subtle on dark backgrounds.
