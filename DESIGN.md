---
name: Threadly
description: A multi-vendor e-commerce platform where buyers discover, sellers thrive, and admins oversee — all under one warm, adventurous roof.
colors:
  desert-amber: "#d99a4a"
  burnt-terra: "#d07a4e"
  amber-glow: "#faecd8"
  page-surface: "#fafafa"
  card-surface: "#f4f4f5"
  input-surface: "#e4e4e7"
  primary-ink: "#09090b"
  secondary-ink: "#71717a"
  default-border: "#e4e4e7"
  focus-ring: "#d99a4a"
  success-green: "#3d7a5e"
  error-red: "#b03a2e"
  warning-amber: "#c47f2e"
typography:
  display:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.025em"
rounded:
  xs: "2px"
  sm: "4px"
  default: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  3xl: "32px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
  container: "1280px"
  container-sm: "960px"
  gutter: "24px"
  gutter-mobile: "16px"
components:
  button-primary:
    backgroundColor: "{colors.desert-amber}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#c47f2e"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.desert-amber}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-soft:
    backgroundColor: "{colors.amber-glow}"
    textColor: "#854e18"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  product-card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.2xl}"
    padding: "16px"
  input-field:
    backgroundColor: "{colors.input-surface}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.default}"
    padding: "10px 14px"
  category-card:
    backgroundColor: "transparent"
    rounded: "{rounded.2xl}"
---

# Design System: Threadly

## 1. Overview

**Creative North Star: "The Ember Cartographer"**

Threadly maps the territory between discovery and commerce. The Ember Cartographer charts warm, sun-dried paths through a landscape of possibility — every screen is a new coordinate on an adventure, every interaction a step further into a vibrant bazaar. The design system carries the warmth of late-afternoon sunlight on sandstone alongside the cool confidence of urban zinc; color is not decoration but cartography, marking the paths that matter.

This system rejects generic e-commerce sterility. No flat, gray, faceless marketplace pages. No cookie-cutter card grids without personality. No monochromatic suppression of the brand's natural energy. Threadly is tactile and warm — buttons feel like pressing smooth pottery, cards lift gently off the surface, and every hover state rewards the hand that reached out. The palette carries sun-dried warmth grounded by urban cool; amber and terracotta glow against a zinc foundation like embers on concrete.

**Key Characteristics:**
- Sun-dried warmth balanced by urban zinc coolness
- Tactile, pottery-like interaction feedback on every control
- Adventurous color use that guides without overwhelming
- Cairo typeface at variable weight — from featherlight display to bold section anchors
- Gentle elevation that lifts on interaction, never shouts at rest
- Inclusive contrast and readable text as a baseline, not an afterthought

## 2. Colors

The palette reads like a desert landscape at golden hour: warm amber light catching terracotta, set against the cool zinc of city architecture. Two accent scales (Amber and Terracotta) carry the brand's identity; Zinc handles every neutral role.

### Primary
- **Desert Amber** (#d99a4a / amber-400): The cartographer's compass needle. Links, focus rings, primary CTAs, and every element that says "go this way." Visible and warm without screaming.
- **Amber Subtle** (#faecd8 / amber-100): Tinted surfaces, badge backgrounds, and soft accent zones. The glow of sandstone in shade.

### Secondary
- **Burnt Terracotta** (#d07a4e / terra-400): Hover states, secondary accents, and warmth moments when amber needs a companion. Aged clay catching the last sun.

### Neutral
- **Page Surface** (#fafafa / zinc-50): The base terrain — every page background. Cool, neutral, never warm-tinted.
- **Card Surface** (#f4f4f5 / zinc-100): Cards, panels, and elevated containers.
- **Input Surface** (#e4e4e7 / zinc-200): Input backgrounds and default borders.
- **Divider** (#d4d4d8 / zinc-300): Dividers and strong borders.
- **Primary Ink** (#09090b / zinc-950): Body text, headings, the definitive mark. High contrast against all surfaces.
- **Secondary Ink** (#71717a / zinc-500): Metadata, captions, supporting text. Never used for critical information.
- **Default Border** (#e4e4e7 / zinc-200): Structural boundaries that recede rather than announce.
- **Focus Ring** (#d99a4a): Rings the user's attention to the active element. Matches Desert Amber for brand cohesion.

### States
- **Success Green** (#3d7a5e): Confirmed actions, stock indicators, positive states.
- **Error Red** (#b03a2e): Validation failures, destructive actions, out-of-stock.
- **Warning Amber** (#c47f2e): Caution states, low stock alerts.

**The Ember Rule.** Desert Amber appears on ≤15% of any given screen. Its warmth is the point — overuse flattens it into background noise. Reserve it for navigation anchors, primary actions, and focus moments. Terracotta supports; it never leads.

**The Cool Foundation Rule.** Background tints stay on the Zinc scale. No amber or terracotta bleeding into surfaces except through deliberate, named accent zones (Amber Subtle, soft badges, category pills). The terrain is cool; only the markers are warm.

## 3. Typography

**Display Font:** Cairo (system-ui, sans-serif fallback)
**Body Font:** Cairo (system-ui, sans-serif fallback)
**Label Font:** Cairo (system-ui, sans-serif)

**Character:** A single voice, shifting weight from featherlight to black. Cairo's geometric warmth mirrors the brand's tactile personality — it's approachable at body weight, authoritative at bold, and adventurous at display weight where the light strokes feel exploratory. One family; no pairing conflicts.

### Hierarchy
- **Display** (weight 300, clamp(3rem, 8vw, 4.5rem), line-height 1.0): Hero headlines only. The cartographer's big map — expansive, light, breathing.
- **Headline** (weight 700, clamp(2.25rem, 5vw, 3rem), line-height 1.1): Section titles and page headings. Bold and present.
- **Title** (weight 600, 1.5rem / 24px, line-height 1.25): Card titles, subsection headers, panel names.
- **Body** (weight 400, 1rem / 16px, line-height 1.6): Running text, descriptions, form labels. Max line length capped at 65–75ch.
- **Label** (weight 500, 0.75rem / 12px, letter-spacing 0.025em): Tags, badges, metadata, and small UI markers.

**The Weight-as-Intent Rule.** Light weights signal display and exploration (hero, big moments). Bold weights signal decision and action (section anchors, buttons, confirmations). Never use weight 300 below 2rem — it becomes unreadable.

## 4. Elevation

Threadly uses a hybrid elevation model: tonal layering at rest, shadow lift on interaction. Surfaces stay flat and confident by default; shadows appear only as a response to engagement — hover, focus, or contextual promotion. This keeps the canvas calm and the interactions rewarding.

### Shadow Vocabulary
- **Ambient** (`0 1px 2px 0 rgba(9, 9, 11, 0.06)`): Barely-there depth for resting inputs and subtle card anchoring.
- **Low** (`0 1px 4px 0 rgba(9, 9, 11, 0.08), 0 1px 2px -1px rgba(9, 9, 11, 0.04)`): Default card shadow. Grounds without lifting.
- **Mid** (`0 4px 12px -2px rgba(9, 9, 11, 0.1), 0 2px 6px -2px rgba(9, 9, 11, 0.06)`): Hover state for cards and interactive containers. The pottery-lift moment.
- **High** (`0 12px 28px -4px rgba(9, 9, 11, 0.12), 0 4px 10px -4px rgba(9, 9, 11, 0.06)`): Modals and promoted content.
- **Dramatic** (`0 24px 48px -8px rgba(9, 9, 11, 0.15), 0 8px 20px -6px rgba(9, 9, 11, 0.08)`): Full-screen overlays and drawers.
- **Ember Glow** (`0 4px 16px -2px rgba(217, 154, 74, 0.28)`): Amber-tinted glow for primary buttons and accent-focused elements. The cartographer's signal fire.

**The Flat-By-Default Rule.** Cards rest at zero shadow or Ambient only. Shadows appear on hover, focus, or elevation change. A resting card with a Mid shadow is a card that's shouting when it should be listening.

**The Ember Glow Rule.** The amber-tinted shadow is reserved for primary action elements (buttons, active navigation items, promoted cards). It must not appear on neutral or decorative surfaces.

## 5. Components

### Buttons
- **Shape:** Gently curved (8px radius). Pill variant available for tags and filter chips.
- **Primary (Solid):** Desert Amber background (#d99a4a), white text, Ember Glow shadow. On hover: deepens to amber-500 (#c47f2e). Active: scale(0.98) for tactile press feedback.
- **Primary (Soft):** Amber Subtle background (#faecd8), dark amber text (#854e18). Softer voice for secondary contexts.
- **Primary (Outline):** Transparent background, Desert Amber text and border. On hover: fills with amber-50.
- **Ghost:** Transparent background, Desert Amber text. On hover: fills with amber-50.
- **Neutral (Solid):** Zinc-900 background, white text. For non-brand actions.
- **Destructive:** Error Red at 10% opacity background, full Error Red text. On hover: 20% opacity.
- **Focus:** 2px ring offset by 2px from surface, using Focus Ring color.
- **Sizes:** sm (h-9, px-4), md (h-12, px-6), lg (h-14, px-8).

### Chips / Tags
- **Style:** Amber Subtle background (#faecd8) with dark amber text, or zinc-100 with zinc-700 text. Rounded-full (pill shape).
- **State:** "New" badges use Amber Subtle with a miniature amber dot indicator.

### Cards / Containers
- **Corner Style:** Rounded-2xl (24px). Generous and soft, like the edges of handmade pottery.
- **Background:** White (#ffffff) on zinc-50 page surface. Tonal layering, not shadow, creates the separation at rest.
- **Shadow Strategy:** Rests at Ambient or Low; lifts to Mid on hover with a 300ms ease-out transition.
- **Border:** Zinc-100 at rest; warms to amber-200 on hover. The border itself signals engagement.
- **Internal Padding:** 16px (p-4). Tight but not cramped.

### Inputs / Fields
- **Style:** Zinc-200 background, zinc-950 text, 6px radius. Stroke-free; tonal background distinguishes the field.
- **Focus:** 2px amber focus ring (border-focus). The field warms when active.
- **Error:** Error Red border + error-bg surface tint.
- **Disabled:** Zinc-100 background, zinc-400 text, cursor-not-allowed.

### Navigation
- **Storefront:** Top navbar on zinc-50. Links in zinc-700 text, Desert Amber on active/hover. Logo lockup uses Cairo weight 900.
- **Seller Dashboard:** Left sidebar (240px width) on zinc-50. Active item: amber-50 background + amber-700 text + amber-300 left-accent indicator. Header bar spans the main content area.
- **Admin Panel:** Mirrors seller layout. Fixed sidebar at 240px, sticky header. Active items follow the same amber accent pattern.

### Product Card (Signature Component)
- **Shape:** White surface, rounded-2xl, zinc-100 border warming to amber-200 on hover.
- **Image:** 4:5 aspect ratio, scale(1.05) on hover over 700ms. A slow, warm zoom.
- **Wishlist Button:** 36px circle, white/90 background with backdrop-blur, top-right. Fills with amber-600 heart on activation.
- **Category Badge:** Amber-500 background, white text, 10px font-weight 700, uppercase tracking. Top-left.
- **Price:** Cairo weight 900, amber-600 color. The most visually assertive element in the card — price is the destination on the map.
- **Hover Gradient:** Faint amber-900/30 overlay from bottom, appearing on hover. Subtle warmth.

## 6. Do's and Don'ts

### Do:
- **Do** use Desert Amber (#d99a4a) as the primary accent for all CTAs, focus rings, and navigation active states.
- **Do** keep body text at zinc-950 (#09090b) against zinc-50 (#fafafa) backgrounds for ≥4.5:1 contrast.
- **Do** let cards rest flat and lift only on hover — the Mid shadow (0 4px 12px) is the hover reward, not the resting state.
- **Do** use Cairo weight 300 only for display-size text (≥3rem / 48px); below that, minimum weight is 400.
- **Do** apply rounded-2xl (24px) to cards and rounded-md (8px) to buttons — the curve language is soft but not inflated.
- **Do** use the Ember Glow shadow exclusively on primary action elements (buttons, promoted items).
- **Do** warm card borders to amber-200 on hover — it's the micro-signal that the card is alive.
- **Do** cap body text line length at 65–75ch for comfortable reading.

### Don't:
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe on cards, list items, or callouts — full borders or background tints only.
- **Don't** apply gradient text (`background-clip: text`) — use a single solid color for emphasis. Weight and size carry hierarchy.
- **Don't** use glassmorphism (backdrop-blur + semi-transparent backgrounds) as a default card or container pattern.
- **Don't** create identical card grids where every card has the same icon + heading + text structure — vary card sizes and content weight.
- **Don't** place a tiny uppercase tracked eyebrow above every section heading. One deliberate eyebrow pattern is voice; on every section it's AI grammar.
- **Don't** tint the page background warm (amber/terracotta hues in the surface background) — the Zinc scale is the cool foundation; warmth lives in the accents only.
- **Don't** use Desert Amber on more than ~15% of any screen's visible area. Overuse kills the ember's warmth.
- **Don't** use weight 300 Cairo below 2rem — it loses legibility and becomes fragile.
- **Don't** rest cards at Mid or High shadow states. Shadows are earned through interaction, not claimed at rest.
