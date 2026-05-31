# Threadly Design System

> Version 2.1 — Tailwind v4 · Cairo Font · No Components

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

Three scales work together: **warm amber** and **terracotta** for brand color (not direct orange), and **Tailwind Zinc** for all grayscale — neutrals, surfaces, borders, and text. Think aged brass, sun-dried clay, bleached linen, cool slate.

```css
@theme {
  /* ─── Zinc Scale (Tailwind default — grayscale) ─── */
  --color-zinc-50: #fafafa;
  --color-zinc-100: #f4f4f5;
  --color-zinc-200: #e4e4e7;
  --color-zinc-300: #d4d4d8;
  --color-zinc-400: #a1a1aa;
  --color-zinc-500: #71717a;
  --color-zinc-600: #52525b;
  --color-zinc-700: #3f3f46;
  --color-zinc-800: #27272a;
  --color-zinc-900: #18181b;
  --color-zinc-950: #09090b;

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
  /* Brand */
  --color-main: #d99a4a; /* amber-400 */
  --color-main-warm: #d07a4e; /* terra-400 */
  --color-main-subtle: #faecd8; /* amber-100 */

  /* Surfaces — mapped to Zinc */
  --color-surface: var(--color-zinc-50); /* #fafafa — page bg */
  --color-surface-low: var(--color-zinc-100); /* #f4f4f5 — card bg */
  --color-surface-mid: var(--color-zinc-200); /* #e4e4e7 — input bg */
  --color-surface-high: var(--color-zinc-300); /* #d4d4d8 — dividers */

  /* Text — mapped to Zinc */
  --color-on-surface: var(--color-zinc-950); /* #09090b — primary text */
  --color-on-surface-muted: var(
    --color-zinc-500
  ); /* #71717a — secondary text */
  --color-on-main: #ffffff;

  /* Borders — mapped to Zinc */
  --color-border: var(--color-zinc-200); /* #e4e4e7 */
  --color-border-subtle: var(--color-zinc-100); /* #f4f4f5 */
  --color-border-strong: var(--color-zinc-300); /* #d4d4d8 */
  --color-border-focus: #d99a4a; /* amber-400 */

  /* States */
  --color-success: #3d7a5e;
  --color-success-bg: #edf5f1;
  --color-error: #b03a2e;
  --color-error-bg: #fdf0ee;
  --color-warning: #c47f2e;
  --color-warning-bg: #fdf8f0;
}
```

### Zinc — Grayscale Usage

Zinc is the **only** grayscale palette in Threadly. Use `zinc-*` classes directly in Tailwind, or via the semantic tokens below.

| Zinc Step  | Hex       | Semantic Role                                                              |
| ---------- | --------- | -------------------------------------------------------------------------- |
| `zinc-50`  | `#fafafa` | Page background (`--color-surface`)                                        |
| `zinc-100` | `#f4f4f5` | Card background (`--color-surface-low`)                                    |
| `zinc-200` | `#e4e4e7` | Input background, borders (`--color-surface-mid`, `--color-border`)        |
| `zinc-300` | `#d4d4d8` | Dividers, strong borders (`--color-surface-high`, `--color-border-strong`) |
| `zinc-400` | `#a1a1aa` | Disabled text, icons                                                       |
| `zinc-500` | `#71717a` | Secondary text (`--color-on-surface-muted`)                                |
| `zinc-600` | `#52525b` | Label text, captions                                                       |
| `zinc-700` | `#3f3f46` | Subheadings                                                                |
| `zinc-800` | `#27272a` | Body text                                                                  |
| `zinc-900` | `#18181b` | Headings                                                                   |
| `zinc-950` | `#09090b` | Primary text, logo (`--color-on-surface`)                                  |

### Semantic Color Reference

| Token                      | Maps to   | Hex       | Usage                                |
| -------------------------- | --------- | --------- | ------------------------------------ |
| `--color-main`             | amber-400 | `#d99a4a` | Links, focus rings, CTAs, highlights |
| `--color-main-warm`        | terra-400 | `#d07a4e` | Hover states, secondary accents      |
| `--color-main-subtle`      | amber-100 | `#faecd8` | Tinted surfaces, badge backgrounds   |
| `--color-surface`          | zinc-50   | `#fafafa` | Page background                      |
| `--color-surface-low`      | zinc-100  | `#f4f4f5` | Card backgrounds                     |
| `--color-surface-mid`      | zinc-200  | `#e4e4e7` | Input backgrounds                    |
| `--color-surface-high`     | zinc-300  | `#d4d4d8` | Dividers, skeletons                  |
| `--color-on-surface`       | zinc-950  | `#09090b` | Primary text                         |
| `--color-on-surface-muted` | zinc-500  | `#71717a` | Secondary text, placeholders         |
| `--color-border`           | zinc-200  | `#e4e4e7` | Default borders                      |
| `--color-border-focus`     | amber-400 | `#d99a4a` | Focus rings                          |

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
  --shadow-xs: 0 1px 2px 0 rgba(9, 9, 11, 0.06);
  --shadow-sm:
    0 1px 4px 0 rgba(9, 9, 11, 0.08), 0 1px 2px -1px rgba(9, 9, 11, 0.04);
  --shadow-md:
    0 4px 12px -2px rgba(9, 9, 11, 0.1), 0 2px 6px -2px rgba(9, 9, 11, 0.06);
  --shadow-lg:
    0 12px 28px -4px rgba(9, 9, 11, 0.12), 0 4px 10px -4px rgba(9, 9, 11, 0.06);
  --shadow-xl:
    0 24px 48px -8px rgba(9, 9, 11, 0.15), 0 8px 20px -6px rgba(9, 9, 11, 0.08);
  --shadow-main: 0 4px 16px -2px rgba(217, 154, 74, 0.28); /* amber glow */
  --shadow-inner: inset 0 1px 3px rgba(9, 9, 11, 0.08);
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

  /* Semantic — Brand */
  --color-main: #d99a4a;
  --color-main-warm: #d07a4e;
  --color-main-subtle: #faecd8;
  --color-on-main: #ffffff;

  /* Semantic — Surfaces (Zinc) */
  --color-surface: var(--color-zinc-50);
  --color-surface-low: var(--color-zinc-100);
  --color-surface-mid: var(--color-zinc-200);
  --color-surface-high: var(--color-zinc-300);

  /* Semantic — Text (Zinc) */
  --color-on-surface: var(--color-zinc-950);
  --color-on-surface-muted: var(--color-zinc-500);

  /* Semantic — Borders (Zinc) */
  --color-border: var(--color-zinc-200);
  --color-border-subtle: var(--color-zinc-100);
  --color-border-strong: var(--color-zinc-300);
  --color-border-focus: #d99a4a;

  /* States */
  --color-success: #3d7a5e;
  --color-success-bg: #edf5f1;
  --color-error: #b03a2e;
  --color-error-bg: #fdf0ee;
  --color-warning: #c47f2e;
  --color-warning-bg: #fdf8f0;

  /* Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(9, 9, 11, 0.06);
  --shadow-sm:
    0 1px 4px 0 rgba(9, 9, 11, 0.08), 0 1px 2px -1px rgba(9, 9, 11, 0.04);
  --shadow-md:
    0 4px 12px -2px rgba(9, 9, 11, 0.1), 0 2px 6px -2px rgba(9, 9, 11, 0.06);
  --shadow-lg:
    0 12px 28px -4px rgba(9, 9, 11, 0.12), 0 4px 10px -4px rgba(9, 9, 11, 0.06);
  --shadow-xl:
    0 24px 48px -8px rgba(9, 9, 11, 0.15), 0 8px 20px -6px rgba(9, 9, 11, 0.08);
  --shadow-main: 0 4px 16px -2px rgba(217, 154, 74, 0.28);
  --shadow-inner: inset 0 1px 3px rgba(9, 9, 11, 0.08);

  /* Motion */
  --duration-fast: 100ms;
  --duration-base: 150ms;
  --duration-moderate: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  --ease-default: cubic-bezier(0.2, 0, 0, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

_Threadly Design System v2.1 — Tailwind v4 · Cairo · Zinc + Amber & Terracotta_
