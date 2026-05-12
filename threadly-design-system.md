# Threadly Design System

> Version 2.0 — Tailwind v4 · Cairo Font · No Components

---

## Font

```css
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap");
```

```css
@theme {
  --font-sans: "Cairo", system-ui, sans-serif;
  --font-mono: "Cairo", system-ui, sans-serif;
}
```

All text uses **Cairo**. Weight scale:

| Weight   | Value | When to use            |
| -------- | ----- | ---------------------- |
| Light    | 300   | Large display headings |
| Regular  | 400   | Body text, captions    |
| Medium   | 500   | Labels, metadata       |
| Semibold | 600   | Subheadings, buttons   |
| Bold     | 700   | Section titles         |
| Black    | 900   | Hero headlines, logo   |

---

## Colors

Palette anchored in **warm amber** and **terracotta** — not direct orange. Think aged brass, sun-dried clay, bleached linen.

```css
@theme {
  /* ─── Amber Scale ─── */
  --color-amber-50: #fdf8f0;
  --color-amber-100: #faecd8;
  --color-amber-200: #f3d4a8;
  --color-amber-300: #e8b876;
  --color-amber-400: #d99a4a;
  --color-amber-500: #c47f2e;
  --color-amber-600: #a56520;
  --color-amber-700: #854e18;
  --color-amber-800: #623912;
  --color-amber-900: #3d230b;

  /* ─── Terracotta Scale ─── */
  --color-terra-50: #fdf3ef;
  --color-terra-100: #fae3d8;
  --color-terra-200: #f2c4ac;
  --color-terra-300: #e4a07a;
  --color-terra-400: #d07a4e;
  --color-terra-500: #b5603a;
  --color-terra-600: #944a2c;
  --color-terra-700: #72361f;
  --color-terra-800: #4f2415;
  --color-terra-900: #2e150b;

  /* ─── Semantic Tokens ─── */
  --color-accent: #d99a4a; /* amber-400 */
  --color-accent-warm: #d07a4e; /* terra-400 */
  --color-accent-subtle: #faecd8; /* amber-100 */

  --color-surface: #fafaf8; /* page bg */
  --color-surface-low: #f5f4f0; /* card bg */
  --color-surface-mid: #ebe9e3; /* input bg */
  --color-surface-high: #d8d5cc; /* dividers */

  --color-on-surface: #151412; /* primary text */
  --color-on-surface-muted: #5c5954; /* secondary text */
  --color-on-accent: #ffffff;

  --color-border: #d8d5cc;
  --color-border-subtle: #ebe9e3;
  --color-border-strong: #b8b4a8;
  --color-border-focus: #d99a4a;

  --color-success: #3d7a5e;
  --color-success-bg: #edf5f1;
  --color-error: #b03a2e;
  --color-error-bg: #fdf0ee;
  --color-warning: #c47f2e;
  --color-warning-bg: #fdf8f0;
}
```

### Semantic Color Reference

| Token                      | Hex       | Usage                                |
| -------------------------- | --------- | ------------------------------------ |
| `--color-accent`           | `#d99a4a` | Links, focus rings, CTAs, highlights |
| `--color-accent-warm`      | `#d07a4e` | Hover states, secondary accents      |
| `--color-accent-subtle`    | `#faecd8` | Tinted surfaces, badge backgrounds   |
| `--color-surface`          | `#fafaf8` | Page background                      |
| `--color-surface-low`      | `#f5f4f0` | Card backgrounds                     |
| `--color-surface-mid`      | `#ebe9e3` | Input backgrounds                    |
| `--color-surface-high`     | `#d8d5cc` | Dividers, skeletons                  |
| `--color-on-surface`       | `#151412` | Primary text                         |
| `--color-on-surface-muted` | `#5c5954` | Secondary text, placeholders         |
| `--color-border`           | `#d8d5cc` | Default borders                      |
| `--color-border-focus`     | `#d99a4a` | Focus rings                          |

---

## Font Size

```css
@theme {
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
  --text-6xl: 3.75rem; /* 60px */
  --text-7xl: 4.5rem; /* 72px */
}
```

### Size Usage Guide

| Class       | Size | Weight | Line Height | Role                 |
| ----------- | ---- | ------ | ----------- | -------------------- |
| `text-7xl`  | 72px | 300    | 1.0         | Hero display         |
| `text-6xl`  | 60px | 300    | 1.05        | Page hero            |
| `text-5xl`  | 48px | 400    | 1.1         | Section hero         |
| `text-4xl`  | 36px | 400    | 1.15        | Large heading        |
| `text-3xl`  | 30px | 600    | 1.2         | Page title           |
| `text-2xl`  | 24px | 600    | 1.25        | Section title        |
| `text-xl`   | 20px | 600    | 1.3         | Card title           |
| `text-lg`   | 18px | 400    | 1.7         | Lead paragraph       |
| `text-base` | 16px | 400    | 1.6         | Body text            |
| `text-sm`   | 14px | 400    | 1.55        | Secondary text       |
| `text-xs`   | 12px | 500    | 1.0         | Labels, tags, badges |

---

## Spacing

Base unit: **4px**.

```css
@theme {
  --spacing-1: 0.25rem; /* 4px  */
  --spacing-2: 0.5rem; /* 8px  */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-16: 4rem; /* 64px */
  --spacing-20: 5rem; /* 80px */
  --spacing-24: 6rem; /* 96px */
  --spacing-32: 8rem; /* 128px */

  /* Semantic aliases */
  --spacing-xs: 0.25rem; /* 4px  */
  --spacing-sm: 0.5rem; /* 8px  */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */
  --spacing-3xl: 4rem; /* 64px */
  --spacing-4xl: 6rem; /* 96px */

  /* Layout */
  --spacing-gutter: 1.5rem; /* 24px */
  --spacing-gutter-mobile: 1rem; /* 16px */
  --spacing-container: 80rem; /* 1280px */
  --spacing-container-sm: 60rem; /* 960px */
}
```

---

## Border Radius

```css
@theme {
  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius: 6px; /* default — inputs */
  --radius-md: 8px; /* buttons, badges */
  --radius-lg: 12px; /* cards, panels */
  --radius-xl: 16px; /* modals, sheets */
  --radius-2xl: 24px; /* hero cards */
  --radius-3xl: 32px; /* large features */
  --radius-full: 9999px; /* pills, avatars */
}
```

### Radius Usage Map

| Element           | Token          | Value  |
| ----------------- | -------------- | ------ |
| Input fields      | `rounded`      | 6px    |
| Buttons           | `rounded-md`   | 8px    |
| Badges / tags     | `rounded-md`   | 8px    |
| Product cards     | `rounded-lg`   | 12px   |
| Modals / drawers  | `rounded-xl`   | 16px   |
| Hero image frames | `rounded-2xl`  | 24px   |
| Avatar / pill     | `rounded-full` | 9999px |

---

## Shadows

```css
@theme {
  --shadow-xs: 0 1px 2px 0 rgba(10, 9, 7, 0.06);
  --shadow-sm:
    0 1px 4px 0 rgba(10, 9, 7, 0.08), 0 1px 2px -1px rgba(10, 9, 7, 0.04);
  --shadow-md:
    0 4px 12px -2px rgba(10, 9, 7, 0.1), 0 2px 6px -2px rgba(10, 9, 7, 0.06);
  --shadow-lg:
    0 12px 28px -4px rgba(10, 9, 7, 0.12), 0 4px 10px -4px rgba(10, 9, 7, 0.06);
  --shadow-xl:
    0 24px 48px -8px rgba(10, 9, 7, 0.15), 0 8px 20px -6px rgba(10, 9, 7, 0.08);
  --shadow-accent: 0 4px 16px -2px rgba(217, 154, 74, 0.28); /* amber glow */
  --shadow-inner: inset 0 1px 3px rgba(10, 9, 7, 0.08);
  --shadow-none: none;
}
```

## Full `app.css` (copy-paste ready)

```css
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap");
@import "tailwindcss";

@theme {
  /* Font */
  --font-sans: "Cairo", system-ui, sans-serif;
  --font-mono: "Cairo", system-ui, sans-serif;

  /* Amber */
  --color-amber-50: #fdf8f0;
  --color-amber-100: #faecd8;
  --color-amber-200: #f3d4a8;
  --color-amber-300: #e8b876;
  --color-amber-400: #d99a4a;
  --color-amber-500: #c47f2e;
  --color-amber-600: #a56520;
  --color-amber-700: #854e18;
  --color-amber-800: #623912;
  --color-amber-900: #3d230b;

  /* Terracotta */
  --color-terra-50: #fdf3ef;
  --color-terra-100: #fae3d8;
  --color-terra-200: #f2c4ac;
  --color-terra-300: #e4a07a;
  --color-terra-400: #d07a4e;
  --color-terra-500: #b5603a;
  --color-terra-600: #944a2c;
  --color-terra-700: #72361f;
  --color-terra-800: #4f2415;
  --color-terra-900: #2e150b;

  /* Semantic */
  --color-accent: #d99a4a;
  --color-accent-warm: #d07a4e;
  --color-accent-subtle: #faecd8;
  --color-surface: #fafaf8;
  --color-surface-low: #f5f4f0;
  --color-surface-mid: #ebe9e3;
  --color-surface-high: #d8d5cc;
  --color-on-surface: #151412;
  --color-on-surface-muted: #5c5954;
  --color-on-accent: #ffffff;
  --color-border: #d8d5cc;
  --color-border-subtle: #ebe9e3;
  --color-border-strong: #b8b4a8;
  --color-border-focus: #d99a4a;
  --color-success: #3d7a5e;
  --color-success-bg: #edf5f1;
  --color-error: #b03a2e;
  --color-error-bg: #fdf0ee;
  --color-warning: #c47f2e;
  --color-warning-bg: #fdf8f0;
}
```

---

_Threadly Design System v2.0 — Tailwind v4 · Cairo · Amber & Terracotta_
