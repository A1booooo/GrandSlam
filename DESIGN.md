# Design System Specification: High-End Editorial Minimalism

## 1. Overview & Creative North Star
**Creative North Star: The Disciplined Architect**

This design system rejects the "bubbly" aesthetics of modern SaaS in favor of a rigorous, paper-like tactile experience. It mimics the precision of a high-end Swiss architectural monograph: sharp edges, immense negative space, and a rejection of decorative ornamentation. 

To break the "template" look, designers must embrace **Intentional Asymmetry**. Instead of centering all content, use the spacing scale to create wide left-hand gutters and staggered vertical layouts. The goal is to make a digital schedule feel like a physical desk—an expansive, clean surface where time is organized with absolute clarity.

## 2. Colors & Surface Logic

The palette is rooted in high-contrast legibility and "off-paper" neutrals.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background tonal shifts. For example, a task list sitting on `surface` (#f9f9fb) should be wrapped in a container of `surface-container-low` (#f3f3f5). This creates a "milled" effect where elements feel carved into the page rather than drawn onto it.

### Surface Hierarchy & Nesting
Depth is achieved through a "Layered Vellum" approach. Use the following tiers to define importance without shadows:
- **Base Layer:** `surface` (#f9f9fb) – The primary canvas.
- **Sectioning:** `surface-container-low` (#f3f3f5) – Used for large background blocks (e.g., a calendar grid).
- **Interactive Elements:** `surface-container-lowest` (#ffffff) – Reserved for the most important active cards or input areas to provide a crisp, "bright" lift.

### Glass & Signature Textures
To provide visual "soul," use **Glassmorphism** for floating navigation or modal overlays. 
- **Token:** `surface-container-lowest` at 80% opacity with a `20px` backdrop-blur. 
- **CTA Depth:** For primary buttons, use a subtle linear gradient from `primary` (#000000) to `primary-container` (#3b3b3d) at a 145° angle. This adds a metallic, premium weight that flat hex codes lack.

## 3. Typography
The system uses **Inter** (or the platform’s native sans-serif) with a focus on extreme scale contrast.

- **Display (Large/Med):** Used for "Daily Overview" or "Time" headings. Letter spacing should be set to `-0.02em` to create a dense, authoritative "ink-on-paper" look.
- **Title (Large):** Used for event titles. These should be `primary` (#000000) to ensure they anchor the user's eye.
- **Body (Medium):** The workhorse. Use `on_surface_variant` (#474747) for descriptions to reduce visual fatigue against the off-white background.
- **Label (Small):** Used for metadata (tags, timestamps). Always uppercase with `+0.05em` letter spacing to mimic professional architectural notation.

## 4. Elevation & Depth
In a system with `0px` border-radius, traditional shadows look cluttered. We use **Tonal Layering** and **Ambient Light**.

- **The Layering Principle:** Stack `surface-container-lowest` on top of `surface-dim` to create a sharp, physical separation.
- **Ambient Shadows:** Only use shadows for "Temporary" floating elements (like a time-picker popover). 
    - **Specs:** `0px 20px 40px`, color: `rgba(26, 28, 29, 0.06)`. This creates a soft, hazy glow rather than a hard drop shadow.
- **The Ghost Border:** If high-contrast accessibility is required, use a 1px border using `outline-variant` (#c6c6c6) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons
- **Primary:** Sharp corners (`0px`), `primary` background, `on_primary` text. Sizing: `4rem` height for mobile-first PWA touch targets.
- **Secondary:** No background. `1px` Ghost Border (15% opacity). 
- **Interaction:** On hover/active, shift background to `primary_container`. No "bounce" animations—use linear, high-speed transitions (150ms) to maintain a professional tone.

### Input Fields
- **Styling:** Forgo the box. Use a "Bottom Stroke" only, using `outline` (#777777) at a 0.5px weight, or a full-width `surface-container-high` background block with no border.
- **Focus State:** The bottom stroke thickens to 2px `primary` (#000000).

### Cards & Lists
- **Rule:** **Strictly no dividers.** 
- Separate list items using the `spacing-4` (1.4rem) scale. 
- Use a `surface-container-lowest` background for the "Active" or "Next Up" task to make it physically pop against the `surface` background.

### The "Schedule Blade" (Custom Component)
For the PWA schedule view, use a vertical "Blade." A 2px vertical line in `secondary` (#515f74) runs down the left margin. Events are "pinned" to this line with sharp, square chips.

## 6. Do's and Don'ts

### Do:
- **Do** embrace the "Void." Use `spacing-16` or `spacing-20` between major sections to let the design breathe.
- **Do** keep all corners at `0px`. Even a 2px radius breaks the disciplined, high-end architectural feel.
- **Do** use `secondary` (#515f74) for non-interactive icons to keep the interface "quiet."

### Don't:
- **Don't** use pure #000000 for long-form body text; it is too harsh. Use `on_surface` (#1a1c1d).
- **Don't** use standard "Blue" for links or success states. Use `primary` (Black) and underline it, or use `secondary` for a subtle sophisticated shift.
- **Don't** use center-alignment for typography. It feels like a greeting card. Use left-alignment to maintain the editorial grid.