# CSS Fundamentals

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general industry knowledge, matching Module 5's "Cascading Style Sheets" section of your NAV. Worth cross-checking against your actual course material for alignment, same as the earlier general-knowledge files.

---

## 1. What Is CSS & How to Apply It

### Learning Perspective
**CSS (Cascading Style Sheets)** controls the **visual presentation** of HTML content — layout, color, typography, spacing, and more — separating *what* content is (HTML's job) from *how it looks* (CSS's job).

**Three ways to apply CSS:**
- **External stylesheet** — a separate `.css` file linked via `<link rel="stylesheet" href="styles.css">` in the `<head>`. **Best practice** — keeps style separate from structure, cacheable, reusable across pages.
  ```html
  <link rel="stylesheet" href="styles.css">
  ```
- **Internal (embedded) stylesheet** — CSS written inside a `<style>` block in the document's `<head>`. Useful for page-specific styles, but not reusable across pages.
  ```html
  <style>
    p { color: navy; }
  </style>
  ```
- **Inline styles** — CSS written directly on an element via the `style` attribute. Highest specificity, but hardest to maintain and reuse — generally discouraged except for quick overrides or dynamically-generated styles.
  ```html
  <p style="color: navy;">Text</p>
  ```

### Interview Perspective
**Q: What are the three ways to apply CSS to an HTML document, and which is preferred?**
> External stylesheets (linked `.css` files), internal `<style>` blocks, and inline `style` attributes. External stylesheets are generally preferred — they separate concerns, are cacheable by the browser, and stay maintainable and reusable across multiple pages.

**Q: Why is CSS described as "cascading"?**
> Because styles cascade — multiple rules can apply to the same element, and the browser resolves conflicts using a defined set of rules: source order, specificity, and importance (`!important`). "Cascading" refers to this layered, rule-resolution process.

---

## 2. Selectors

### Learning Perspective
Selectors determine **which elements a CSS rule applies to**.

| Selector | Example | Targets |
|---|---|---|
| **Type/element selector** | `p { }` | All `<p>` elements |
| **Class selector** | `.highlight { }` | All elements with `class="highlight"` |
| **ID selector** | `#header { }` | The single element with `id="header"` |
| **Universal selector** | `* { }` | Every element |
| **Descendant selector** | `div p { }` | `<p>` elements nested anywhere inside a `<div>` |
| **Child selector** | `div > p { }` | `<p>` elements that are **direct children** of a `<div>` |
| **Adjacent sibling selector** | `h1 + p { }` | The `<p>` immediately following an `<h1>` |
| **Attribute selector** | `input[type="text"] { }` | Elements matching a specific attribute/value |
| **Grouping selector** | `h1, h2, h3 { }` | Applies the same rule to multiple selectors at once |

### Interview Perspective
**Q: What's the difference between a class selector and an ID selector?**
> A class (`.name`) can be applied to multiple elements and is meant for reusable styling; an ID (`#name`) must be unique per page and is meant to target a single specific element. IDs also carry higher specificity than classes.

**Q: What's the difference between a descendant selector (`div p`) and a child selector (`div > p`)?**
> The descendant selector matches a `<p>` nested anywhere inside a `<div>`, at any depth. The child selector only matches a `<p>` that is a **direct** child of the `<div>` — one level down, not nested further inside another element first.

---

## 3. The Cascade & Specificity

### Learning Perspective
When multiple CSS rules target the same element with conflicting declarations, the browser resolves the conflict using three factors, in order:

1. **Importance** — `!important` overrides normal specificity rules (should be used sparingly — it breaks the natural cascade and makes debugging harder)
2. **Specificity** — a scoring system determining which selector "wins":
   - Inline styles > IDs > Classes/attributes/pseudo-classes > Elements/pseudo-elements
   - Roughly calculated by counting selector types (commonly represented as a 4-part score: inline, IDs, classes, elements)
3. **Source order** — if specificity is equal, the **last** declared rule wins

### Interview Perspective
**Q: How does the browser decide which CSS rule wins when there's a conflict?**
> First, `!important` rules take priority. Then, the browser compares specificity — inline styles beat IDs, which beat classes/attributes, which beat element selectors. If specificity is tied, the rule that appears **later** in the source order wins.

**Q: Why should `!important` generally be avoided?**
> It overrides the normal specificity cascade, making styles harder to predict, debug, and override later — a very common cause of "CSS fights" in larger codebases. It's usually a sign that the underlying specificity/architecture needs rethinking rather than a first-choice tool.

⭐ **Very frequently asked** — be ready to explain specificity with a concrete example (e.g., "an ID selector will always beat any number of class selectors, regardless of source order").

---

## 4. The Box Model

### Learning Perspective
Every HTML element is rendered as a rectangular box, composed of four layers, from innermost to outermost:

1. **Content** — the actual text/image/element content
2. **Padding** — space between the content and the border (inside the element's background)
3. **Border** — a visible (or invisible) line surrounding the padding
4. **Margin** — space outside the border, separating the element from neighboring elements

```
| margin |
  | border |
    | padding |
      | content |
    | padding |
  | border |
| margin |
```

**`box-sizing` property** controls how width/height are calculated:
- **`content-box`** (default) — `width`/`height` apply only to the content; padding and border are added *on top*, making the element's total rendered size larger than the specified width/height
- **`border-box`** — `width`/`height` include padding and border, so the specified size is the element's actual total rendered size. Widely preferred in modern development for predictable sizing (many CSS resets set this globally).

### Interview Perspective
**Q: Explain the CSS box model.**
> Every element is a box made of content, padding, border, and margin — from the inside out. Padding sits between content and border; margin sits outside the border, creating space between elements.

**Q: What's the difference between `content-box` and `border-box`, and why does it matter?**
> With `content-box` (default), padding and border are added on top of the specified width/height, making the rendered element bigger than the declared size. With `border-box`, the declared width/height already includes padding and border, so sizing is more predictable — that's why most modern projects set `box-sizing: border-box` globally as a reset.

---

## 5. Display & Positioning

### Learning Perspective
**`display` property** controls how an element participates in page layout:
- **`block`** — takes up the full available width, starts on a new line (e.g., `<div>`, `<p>`)
- **`inline`** — only takes up as much width as its content, doesn't force a new line, and **ignores width/height/vertical margin** (e.g., `<span>`, `<a>`)
- **`inline-block`** — flows inline like `inline`, but **respects width/height and margin** like `block`
- **`none`** — removes the element from the layout entirely (not just visually hidden — it takes up no space)
- **`flex`** / **`grid`** — enables Flexbox/Grid layout for the element's children (see Sections 6–7)

**`position` property** controls how an element is placed relative to its normal position or an ancestor:
- **`static`** (default) — normal document flow; `top`/`left`/etc. have no effect
- **`relative`** — positioned relative to its own normal position; offsetting it doesn't affect other elements' layout
- **`absolute`** — removed from normal flow, positioned relative to the **nearest positioned ancestor** (any ancestor with `position` other than `static`) — or the viewport/`<html>` if none exists
- **`fixed`** — removed from normal flow, positioned relative to the **viewport**, stays in place during scrolling
- **`sticky`** — behaves like `relative` until a scroll threshold is crossed, then "sticks" like `fixed` within its containing block

### Interview Perspective
**Q: What's the difference between `display: none` and `visibility: hidden`?**
> `display: none` removes the element from the layout entirely — it takes up no space, as if it doesn't exist. `visibility: hidden` hides the element visually but **preserves its space** in the layout — other elements don't shift to fill the gap.

**Q: Explain the difference between `position: relative`, `absolute`, `fixed`, and `sticky`.**
> `relative` offsets an element from its own normal position without affecting others. `absolute` removes it from flow and positions it relative to the nearest ancestor with non-static positioning. `fixed` positions relative to the viewport and stays put during scroll. `sticky` acts relative until a scroll threshold, then sticks like fixed within its container.

⭐ **Very frequently asked** — the "nearest positioned ancestor" rule for `absolute` trips people up constantly; know it cold.

---

## 6. Flexbox

### Learning Perspective
**Flexbox** is a one-dimensional layout model (row **or** column) designed for distributing space and aligning items within a container.

**Container properties** (set on the parent, via `display: flex`):
- **`flex-direction`** — `row` (default), `column`, `row-reverse`, `column-reverse` — sets the main axis
- **`justify-content`** — aligns items along the **main axis** (`flex-start`, `center`, `space-between`, `space-around`, etc.)
- **`align-items`** — aligns items along the **cross axis** (`flex-start`, `center`, `stretch`, etc.)
- **`flex-wrap`** — controls whether items wrap onto multiple lines when they don't fit

**Item properties** (set on children):
- **`flex-grow`** — how much an item grows to fill available extra space, relative to siblings
- **`flex-shrink`** — how much an item shrinks when space is tight
- **`flex-basis`** — the item's initial size before growing/shrinking is applied

### Interview Perspective
**Q: When would you use Flexbox, and what's the difference between `justify-content` and `align-items`?**
> Flexbox is ideal for one-dimensional layouts — aligning or distributing items in a single row or column (navbars, toolbars, centering content). `justify-content` aligns items along the **main axis** (horizontal by default); `align-items` aligns items along the **cross axis** (vertical by default) — the two work together to fully center or distribute content.

**Q: How would you perfectly center an element using Flexbox?**
> Set `display: flex; justify-content: center; align-items: center;` on the parent container — this centers the child both horizontally and vertically in one step.

---

## 7. CSS Grid

### Learning Perspective
**CSS Grid** is a **two-dimensional** layout model (rows **and** columns simultaneously), designed for overall page/section layout rather than aligning a single row or column of items.

**Key properties:**
- **`display: grid`** — turns an element into a grid container
- **`grid-template-columns`** / **`grid-template-rows`** — define the number and size of columns/rows (e.g., `grid-template-columns: 1fr 2fr 1fr;`)
- **`fr` unit** — a fractional unit representing a share of the available space in the grid, specific to Grid layout
- **`gap`** (or `row-gap`/`column-gap`) — sets spacing between grid cells
- **`grid-column`** / **`grid-row`** — position/span individual items across specific columns/rows (e.g., `grid-column: 1 / 3;` spans from line 1 to line 3)

### Interview Perspective
**Q: When would you choose Grid over Flexbox?**
> Grid for two-dimensional layouts — controlling rows and columns together, like an overall page layout (header/sidebar/content/footer). Flexbox for one-dimensional alignment — a single row or column of items, like a navigation bar. They're complementary, not competing — many layouts use Grid for overall structure and Flexbox for aligning content within individual grid areas.

**Q: What does the `fr` unit represent in Grid?**
> A fractional unit representing a proportional share of the available space in the grid container — e.g., `1fr 2fr` splits space into thirds, with the second column getting twice the width of the first.

---

## 8. Units

### Learning Perspective
CSS supports both **absolute** and **relative** units:

**Absolute:**
- **`px` (pixels)** — a fixed, absolute unit; doesn't scale with anything else

**Relative:**
- **`%`** — relative to the parent element's corresponding dimension
- **`em`** — relative to the **font-size of the current element** (or its parent, if not explicitly set) — compounds when nested, which can cause unpredictable scaling
- **`rem`** — relative to the **root element's** (`<html>`) font-size — doesn't compound, making it more predictable for consistent scaling across a whole page
- **`vw` / `vh`** — relative to 1% of the **viewport width/height** — useful for layouts that need to scale directly with the browser window
- **`vmin` / `vmax`** — relative to the smaller/larger of `vw`/`vh`

### Interview Perspective
**Q: What's the difference between `em` and `rem`, and why does it matter?**
> `em` is relative to the current element's font-size (or its parent's, if unset), which **compounds** as you nest elements — a `2em` inside a `2em` inside a `16px` base becomes 64px, not 32px, which can get unpredictable. `rem` is always relative to the root `<html>` font-size, so it stays consistent and predictable regardless of nesting — which is why `rem` is generally preferred for consistent typography/spacing.

**Q: When would you use `vw`/`vh` instead of `%`?**
> `%` is relative to the parent element, while `vw`/`vh` are relative to the viewport itself — so `vw`/`vh` are useful when you want sizing tied directly to the browser window regardless of the element's parent (e.g., a full-height hero section: `height: 100vh`).

---

## 9. Colors & Typography

### Learning Perspective
**Color formats:**
- **Named colors** — `red`, `navy`, etc. — limited palette, human-readable
- **Hex** — `#RRGGBB` (or shorthand `#RGB`) — e.g., `#1a1a1a`
- **RGB/RGBA** — `rgb(255, 0, 0)` / `rgba(255, 0, 0, 0.5)` — the `a` (alpha) channel controls opacity
- **HSL/HSLA** — `hsl(0, 100%, 50%)` — hue/saturation/lightness, often more intuitive for adjusting shades/tints programmatically

**Typography properties:**
- **`font-family`** — specifies a **font stack** (list of fallbacks), since not every device has every font installed: `font-family: "Helvetica Neue", Arial, sans-serif;`
- **`font-size`, `font-weight`, `font-style`** — size, boldness, and italics
- **`line-height`** — vertical spacing between lines of text; important for both readability and vertical rhythm
- **`text-align`** — horizontal alignment of text within its container
- **`letter-spacing` / `word-spacing`** — fine-tune spacing between characters/words

### Interview Perspective
**Q: Why should you always specify a font stack (multiple fonts) rather than a single font-family?**
> Because not every user's device has every font installed. Listing fallback fonts (ending in a generic family like `sans-serif` or `serif`) ensures the browser gracefully falls back to the next best available option instead of defaulting to something completely different if the primary font isn't available.

**Q: What's the difference between RGB and HSL color models?**
> RGB defines color by red/green/blue channel intensities — precise but not very intuitive for humans adjusting shades. HSL defines color by hue, saturation, and lightness — more intuitive for tasks like "make this the same color but darker," since you just adjust the lightness value directly.

---

## 10. Pseudo-Classes & Pseudo-Elements

### Learning Perspective
- **Pseudo-classes** (single colon `:`) — target elements in a **specific state or condition**:
  - `:hover` — while the mouse is over the element
  - `:focus` — while the element has keyboard/input focus
  - `:first-child` / `:last-child` / `:nth-child(n)` — based on position among siblings
  - `:disabled`, `:checked` — based on form element state
- **Pseudo-elements** (double colon `::`, though single colon is still widely supported for legacy reasons) — target a **specific part** of an element rather than the whole thing:
  - `::before` / `::after` — insert generated content before/after an element's actual content (commonly used with the `content` property for decorative elements, icons, or clearfixes)
  - `::first-line` / `::first-letter` — style just the first line/letter of a text block

### Interview Perspective
**Q: What's the difference between a pseudo-class and a pseudo-element?**
> A pseudo-class targets an element in a particular *state* (like `:hover` or `:nth-child`) — it's still the whole element. A pseudo-element targets a specific *part* of an element that doesn't otherwise correspond to an actual DOM node (like `::before` or `::first-letter`) — it's generating or targeting a sub-piece, not the whole thing.

**Q: What's a practical use case for `::before` or `::after`?**
> Inserting decorative content without adding extra markup to the HTML — e.g., adding an icon before a link, a custom bullet, tooltip arrows, or implementing a "clearfix" for floated layouts. Requires the `content` property to actually render (even `content: "";` for purely visual insertions).

---

## 11. Transitions & Animations

### Learning Perspective
- **`transition`** — smoothly animates a property change **between two states** (e.g., default → hover), triggered by some change (like `:hover` or a class toggle via JavaScript).
  ```css
  .button {
    transition: background-color 0.3s ease;
  }
  .button:hover {
    background-color: navy;
  }
  ```
- **`@keyframes` + `animation`** — defines a **multi-step animation sequence** that can run automatically, repeat, or be controlled without needing a triggering state change.
  ```css
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .element {
    animation: fadeIn 1s ease-in;
  }
  ```

### Interview Perspective
**Q: What's the difference between CSS `transition` and `animation`?**
> `transition` animates a property smoothly between two states, typically triggered by an event like `:hover` or a class change — it needs a trigger. `animation` (with `@keyframes`) defines a multi-step sequence that can run automatically on load, loop, or be controlled independently, without requiring a state-change trigger.

**Q: Why are `transform` and `opacity` generally preferred for animations over properties like `width` or `top`?**
> Because `transform` and `opacity` can typically be handled by the browser's compositor on the GPU, without triggering layout recalculation (reflow) — making animations smoother and more performant. Animating layout-affecting properties like `width`, `height`, or `top`/`left` forces the browser to recalculate layout on every frame, which is much more expensive.

⭐ **Frequently asked in performance-focused interviews** — know the reflow/repaint/composite distinction at a high level.

---

## 12. Responsive Design & Media Queries

### Learning Perspective
**Responsive design** ensures a page adapts appropriately to different screen sizes and devices, primarily via **media queries** — conditional CSS rules that apply only when certain conditions (usually viewport width) are met.

```css
/* Base styles apply to all screens */
.container {
  width: 100%;
}

/* Applies only when viewport is at least 768px wide */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
```

**Common approach: mobile-first design** — write base styles for the smallest screens first, then use `min-width` media queries to progressively add complexity for larger screens, rather than the reverse (`max-width`, designing desktop-first then scaling down).

**The viewport meta tag** (an HTML element, not CSS, but essential for responsive design to work at all):
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Without it, mobile browsers render the page at a desktop-width viewport and then scale it down, defeating the purpose of responsive CSS.

### Interview Perspective
**Q: What is a media query, and how would you use one?**
> A media query applies CSS rules conditionally, based on characteristics like viewport width — e.g., `@media (min-width: 768px) { ... }` applies styles only when the viewport is at least 768px wide, enabling responsive layouts that adapt across device sizes.

**Q: What does "mobile-first" design mean, and why is it commonly recommended?**
> It means writing your base (unqualified) CSS for the smallest/mobile viewport first, then layering on `min-width` media queries to add complexity for larger screens. It's recommended because it forces prioritization of essential content/functionality for constrained screens first, and tends to produce simpler, more performant CSS than a desktop-first approach that fights against downscaling.

---

## 13. CSS Custom Properties (Variables)

### Learning Perspective
**CSS custom properties** (commonly called "CSS variables") let you define reusable values, referenced throughout a stylesheet:

```css
:root {
  --primary-color: #1a1a1a;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
}
```

**Key characteristics:**
- Defined with a `--` prefix, typically on `:root` for global scope (though they can be scoped to any selector)
- Accessed via `var(--property-name)`, optionally with a fallback: `var(--primary-color, blue)`
- Unlike preprocessor variables (e.g., Sass), CSS custom properties are **live and dynamic** — they can be read and changed at runtime via JavaScript, and respect the normal CSS cascade (can be overridden at different scopes, like within a specific component or media query)

### Interview Perspective
**Q: What's the advantage of CSS custom properties over hardcoding values throughout a stylesheet?**
> Centralized, reusable values (e.g., a brand color or spacing unit) that only need updating in one place — improving maintainability and consistency. They're also dynamic at runtime, meaning JavaScript can read/update them, and they respect the cascade, so they can be overridden at different scopes (e.g., a dark-mode theme redefining `--primary-color` within a specific class).

**Q: How are CSS custom properties different from Sass/LESS preprocessor variables?**
> Preprocessor variables are compiled away at build time into static values — they don't exist in the final CSS and can't change at runtime. CSS custom properties are native, live browser features — they persist in the actual CSS, can be read/modified via JavaScript, and follow the cascade, enabling truly dynamic theming (like live dark-mode toggles) without recompiling anything.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Applying CSS | External (best practice) > internal `<style>` > inline `style` attribute |
| Selectors | Type, class (`.`), ID (`#`), descendant, child (`>`), attribute, grouping |
| Cascade order | `!important` → specificity (inline > ID > class > element) → source order |
| Box model | Content → padding → border → margin; `border-box` includes padding/border in declared size |
| `display: none` vs `visibility: hidden` | Removes from layout entirely vs. hides but keeps its space |
| `position` values | static (default) → relative (self-offset) → absolute (nearest positioned ancestor) → fixed (viewport) → sticky (hybrid) |
| Flexbox vs. Grid | One-dimensional alignment vs. two-dimensional (rows + columns) layout |
| `em` vs `rem` | `em` compounds with nesting; `rem` is always relative to root — more predictable |
| Pseudo-class vs. pseudo-element | State of an element (`:hover`) vs. a generated sub-part (`::before`) |
| `transition` vs `animation` | Needs a trigger (e.g., hover) vs. runs independently via `@keyframes` |
| Performant animation properties | Prefer `transform`/`opacity` — avoid triggering layout reflow |
| Media queries | Conditional CSS based on viewport (commonly mobile-first, using `min-width`) |
| CSS custom properties | Native, live, cascade-respecting variables — unlike static preprocessor variables |

---

*Notes organized for both conceptual understanding and rapid interview recall. Star (⭐) topics indicate areas frequently probed in technical interviews.*