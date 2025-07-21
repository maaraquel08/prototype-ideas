# Design System Tokens

This directory contains the design system tokens and styling utilities for the application.

## Files Overview

### `tailwind.css`

This is **NOT** a standard Tailwind CSS file. It's our custom design system token definitions that includes:

-   **Custom Design Tokens**: All `spr-` prefixed utility classes
-   **Color System**: Food-themed color palette (mushroom, kangkong, blueberry, tomato, mango, carrot, wintermelon)
-   **Typography Scale**: Semantic heading, body, and label classes
-   **Component Styles**: Pre-built component styling for dropdowns, tooltips, tables, etc.
-   **Spacing System**: Consistent sizing variables (`--size-50` through `--size-1200`)

## Design System Structure

### Color Palette

-   **Neutrals**: `white-*`, `mushroom-*` (primary grays)
-   **Brand/Success**: `kangkong-*` (green)
-   **Information**: `blueberry-*` (blue)
-   **Danger**: `tomato-*` (red)
-   **Warning/Pending**: `mango-*` (yellow)
-   **Caution**: `carrot-*` (orange)
-   **Accent**: `wintermelon-*` (teal/mint)

### Typography Classes

-   **Headings**: `spr-heading-xl/lg/md/sm/xs`
-   **Subheadings**: `spr-subheading-sm/xs`
-   **Body Text**: `spr-body-lg/md/sm/xs` with weight variants
-   **Labels**: `spr-label-xs/sm`

### Color Utilities

-   **Text**: `spr-text-color-{variant}`
-   **Background**: `spr-background-color-{variant}`
-   **Border**: `spr-border-color-{variant}`
-   **Divide**: `spr-divide-color-{variant}`

### Semantic Variants

-   **Hierarchy**: `strong`, `supporting`, `base`, `weak`, `disabled`
-   **States**: `base`, `hover`, `pressed`
-   **Semantic**: `brand`, `success`, `information`, `danger`, `pending`, `caution`, `accent`

## Usage Guidelines

1. **Always use `spr-` prefixed classes** instead of generic Tailwind utilities for colors and typography
2. **Use semantic color names** (e.g., `spr-text-color-strong` instead of `text-gray-900`)
3. **Follow the typography scale** for consistent text sizing
4. **Use state variants** for interactive elements (base/hover/pressed)

## Example Usage

```vue
<!-- Good: Using design system tokens -->
<h1 class="spr-heading-lg spr-text-color-strong">Page Title</h1>
<p class="spr-body-md-regular spr-text-color-base">Body content</p>
<button class="spr-background-color-brand-base spr-text-color-inverted-strong">
  Action Button
</button>

<!-- Avoid: Generic Tailwind classes -->
<h1 class="text-2xl font-bold text-gray-900">Page Title</h1>
<p class="text-base text-gray-600">Body content</p>
<button class="bg-green-700 text-white">Action Button</button>
```

This approach ensures consistency, maintainability, and proper brand alignment across the application.
