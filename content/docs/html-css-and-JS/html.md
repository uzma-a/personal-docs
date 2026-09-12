# HTML Fundamentals

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Document Structure & Setup

### Learning Perspective
Every HTML document follows a required skeleton:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Metadata Here -->
  </head>
  <body>
    <!-- Document Body Here -->
  </body>
</html>
```

**Key elements:**

| Element | Purpose |
|---|---|
| **`<!DOCTYPE html>`** | Must start every HTML document. Tells the browser what document type to expect. Has **no closing tag**. |
| **`<html>`** | The **root element** of an HTML document. All other tags must be contained within it. |
| **`<head>`** | Contains **metadata** about the document (title, links, meta tags, scripts). Placed after `<html>` and before `<body>`. Not directly visible on the page. |
| **`<body>`** | Contains the actual **content** of the page. Should hold every visible element besides `<head>`. |

**Comments** — `<!-- comment text -->` — are not rendered by the browser but are useful for documenting or temporarily disabling code.
```html
<!-- This is a comment -->
```

### Interview Perspective
**Q: What's the purpose of `<!DOCTYPE html>`, and why does it have no closing tag?**
> It's a declaration, not an element — it tells the browser which HTML standard to render the page under (modern HTML5 in this case), which affects how the browser parses and lays out the page. It has no closing tag because it's not a content-containing element; it's purely an instruction to the browser.

**Q: What's the difference between `<head>` and `<body>`?**
> `<head>` holds metadata that isn't directly rendered on the page (title, links to stylesheets/scripts, meta tags), while `<body>` holds everything that's actually visible to the user.

---

## 2. Metadata Elements (Inside `<head>`)

### Learning Perspective
- **`<title>`** — defines the document's title, shown in the browser tab and title bar. **Required** in every HTML document.
  ```html
  <head>
    <title>Document Title</title>
  </head>
  ```
- **`<meta>`** — provides metadata about the document that isn't otherwise captured (author, description, character encoding, viewport settings for responsive design, etc.). Browsers/search engines/social platforms read these but don't render them visually.
  ```html
  <head>
    <meta name="author" content="Christopher Moore">
  </head>
  ```
- **`<link>`** — links an **external resource** to the document, most commonly a CSS stylesheet.
  ```html
  <head>
    <link rel="stylesheet" href="styles.css">
  </head>
  ```

### Interview Perspective
**Q: What's the role of the `<meta>` tag, and can you give an example beyond authorship?**
> `<meta>` provides document-level metadata not otherwise captured by other tags — common real-world uses include `charset` (character encoding, e.g., UTF-8), the `viewport` meta tag for responsive/mobile layout, and SEO-related description tags read by search engines.

**Q: How do you attach an external CSS file to an HTML page?**
> Using `<link rel="stylesheet" href="styles.css">` inside the `<head>` — this is the standard way to connect external stylesheets, as opposed to inline `style` attributes or `<style>` blocks.

---

## 3. Text Content Elements

### Learning Perspective
- **`<h1>`** — a level 1 heading, the highest-priority heading on the page. HTML supports `<h1>`–`<h6>`, decreasing in importance/size.
  ```html
  <h1>Thomas J. Watson</h1>
  ```
- **`<p>`** — defines a paragraph of text; automatically places a line break after its content.
  ```html
  <p>This is a paragraph of text. It can be as short or as long as needed.</p>
  ```
- **`<div>`** — a generic container with **no inherent semantic meaning**, commonly used to group and separate sections of content for styling with CSS or manipulation with JavaScript.
  ```html
  <div>
    <!-- grouped content -->
  </div>
  ```

### Interview Perspective
**Q: Why is `<div>` described as having "no semantic meaning"?**
> Because it doesn't describe *what kind* of content it contains — unlike, say, `<header>` or `<article>` (semantic HTML5 elements). It's purely a structural/styling container, used to group content for CSS or JS purposes without implying anything about the content's role.

**Q: Should you always use `<h1>` for the most important text on a page?**
> `<h1>` should represent the main heading of the page/document — using heading levels in proper order (`<h1>` → `<h2>` → `<h3>`...) matters for accessibility (screen readers navigate by heading structure) and SEO, not just visual size.

---

## 4. Links & Media

### Learning Perspective
- **`<a href="path">link name</a>`** — the **anchor tag**, used to create hyperlinks. The `href` attribute specifies the destination URL or path.
  ```html
  <a href="https://www.ibm.com">IBM</a>
  ```
- **`<img src="path" width="dim1" height="dim2">`** — embeds an image. `src` is required (URL or relative file path); `width`/`height` (in pixels) are optional but recommended for layout stability.
  ```html
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Thomas_J_Watson_Sr.jpg" width="300" height="300"/>
  ```

### Interview Perspective
**Q: Why is it good practice to specify `width` and `height` on an `<img>` tag?**
> It lets the browser reserve the correct space for the image before it finishes loading, preventing layout shift (content jumping around as images load) — an important factor for both user experience and performance metrics like Cumulative Layout Shift.

**Q: What happens if you omit the `href` attribute on an `<a>` tag?**
> Without `href`, the tag doesn't function as a hyperlink at all — it won't be clickable/navigable in the way a normal link is, and it won't receive default link styling or keyboard-focus behavior tied to navigation.

---

## 5. Lists

### Learning Perspective
- **`<ul>`** — creates an **unordered** (bulleted) list.
- **`<ol>`** — creates an **ordered** (numbered) list.
- **`<li>`** — defines an individual **list item**; must be used inside `<ul>` or `<ol>`.

```html
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered bullet point 1</li>
  <li>Numbered bullet point 2</li>
</ol>
```

### Interview Perspective
**Q: When would you choose `<ol>` over `<ul>`?**
> `<ol>` when the sequence/order of items is meaningful (e.g., step-by-step instructions), `<ul>` when order doesn't matter (e.g., a list of features). This isn't just visual — it communicates meaning to assistive technology as well.

---

## 6. Tables

### Learning Perspective
- **`<table>`** — the container for tabular data.
- **`<tr>`** — defines a **table row**.
- **`<th>`** — defines a **header cell** within a row (typically bold/centered by default, and semantically marks it as a header for accessibility tools).
- **`<td>`** — defines a standard **table cell** (data) within a row.

```html
<table>
  <tr>
    <th>Header cell 1</th>
    <th>Header cell 2</th>
  </tr>
  <tr>
    <td>First row first cell</td>
    <td>First row second cell</td>
  </tr>
  <tr>
    <td>Second row first cell</td>
    <td>Second row second cell</td>
  </tr>
</table>
```

### Interview Perspective
**Q: What's the difference between `<th>` and `<td>`?**
> `<th>` defines a header cell — semantically marking it as a label/heading for its row or column, which matters for accessibility (screen readers announce it differently) and gets default bold/centered styling. `<td>` is a standard data cell with no special semantic role.

**Q: Should tables be used for page layout?**
> No — modern best practice reserves `<table>` strictly for genuinely tabular data. Page layout should be handled with CSS (Flexbox, Grid), not tables, which was a common but outdated practice in older web design.

---

## 7. Scripts

### Learning Perspective
- **`<script>`** — used to embed or reference JavaScript within an HTML document. Can contain inline code directly, or reference an external file via a `src` attribute.
  ```html
  <script>
    alert("Hello World");
  </script>
  ```

### Interview Perspective
**Q: Where should `<script>` tags typically be placed, and why?**
> Commonly near the end of `<body>` (or using the `defer`/`async` attributes if placed in `<head>`), so the HTML content loads and renders first, without JavaScript blocking the page from displaying. This improves perceived load performance.

---

## How HTML Has Evolved: Related Web Technologies

HTML doesn't exist in isolation — it works alongside (and has been shaped by) several related concepts and specifications as the web platform matured.

### 8. DOM Tree (Document Object Model)

### Learning Perspective
The **DOM (Document Object Model)** is the **data representation of the objects** that comprise the structure and content of a document on the web. When a browser parses HTML, it builds an in-memory tree structure — the DOM tree — where every element, attribute, and piece of text becomes a **node** that can be read, modified, added, or removed programmatically (typically via JavaScript).

This is the critical bridge between static HTML markup and dynamic, interactive web pages — JavaScript doesn't manipulate the raw HTML text; it manipulates the DOM, and the browser re-renders the page to reflect those changes.

### Interview Perspective
**Q: What is the DOM, and why does it matter?**
> The DOM is the browser's in-memory, tree-structured representation of an HTML document — every element becomes a node you can query and manipulate. It matters because it's what makes dynamic web pages possible: JavaScript interacts with the DOM (not the raw HTML source) to update content, styles, and structure in response to user actions, without needing to reload the page.

⭐ **Very frequently asked** — be ready to explain that the DOM is *not* the same thing as the HTML source code; it's the browser's live, parsed, in-memory object representation of it.

---

### 9. XML (eXtensible Markup Language)

### Learning Perspective
**XML** is designed to **store and transport data**, allowing users to **define their own custom markup languages/tags** — unlike HTML, which has a fixed, predefined set of tags meant primarily for *displaying* documents.

Key distinction: **HTML focuses on how content looks** (presentation for humans in a browser); **XML focuses on structuring and transporting data** (meant for machines/applications to parse), with no built-in display semantics of its own.

### Interview Perspective
**Q: What's the core difference between HTML and XML?**
> HTML has a fixed set of predefined tags focused on displaying content in a browser. XML lets you define your own custom tags, focused on structuring and transporting data between systems — it's data-format-oriented rather than presentation-oriented.

**Q: Where might you still encounter XML today?**
> Configuration files, data interchange between systems/APIs (though JSON has largely overtaken it for web APIs), RSS feeds, and some enterprise/legacy system integrations (e.g., SOAP web services).

---

### 10. XHTML (eXtensible Hypertext Markup Language)

### Learning Perspective
**XHTML** is similar to HTML but enforces **stricter formatting rules**, since it's essentially HTML reformulated to comply with XML's strict syntax requirements. Key strictness differences from regular HTML:
- All tags must be **properly closed** (including "self-closing" ones, e.g., `<br />` instead of `<br>`)
- All tags and attributes must be **lowercase**
- All attribute values must be **quoted**
- Documents must be **well-formed** (properly nested elements) or the browser will refuse to render them at all

### Interview Perspective
**Q: How does XHTML differ from standard HTML, and why would stricter rules matter?**
> XHTML applies XML's strict syntax rules to HTML — every tag must be closed, attributes quoted, tags lowercase, and markup properly nested. The benefit is more predictable, machine-parseable documents; the downside is that a single syntax error can break the whole page, unlike regular HTML's typically more forgiving parsing.

**Note:** XHTML saw significant adoption in the mid-2000s but has largely been superseded by HTML5, which combined much of XHTML's cleanliness with HTML's practical, forgiving parsing behavior.

---

### 11. Web Storage APIs

### Learning Perspective
**Web Storage APIs** allow **data storage directly in the browser**, without needing a server round-trip or cookies. The two main mechanisms:
- **`localStorage`** — stores data with **no expiration date**; persists even after the browser is closed and reopened, until explicitly cleared
- **`sessionStorage`** — stores data only for the **duration of the page session**; cleared when the tab/browser is closed

Both store data as simple **key-value pairs** (string-based), accessed via a straightforward JavaScript API (`setItem`, `getItem`, `removeItem`, `clear`).

**Why they matter:** they enable web apps to retain state, preferences, or cached data client-side, improving performance and enabling offline-friendly behavior, without the overhead (and size limitations) of traditional cookies.

### Interview Perspective
**Q: What's the difference between `localStorage` and `sessionStorage`?**
> `localStorage` persists indefinitely, across browser sessions, until explicitly cleared. `sessionStorage` only lasts for the current tab/session and is cleared when that tab or browser closes.

**Q: How does Web Storage compare to cookies?**
> Web Storage offers much larger capacity (typically several MB vs. ~4KB for cookies), stays entirely client-side (not automatically sent with every HTTP request like cookies are), and has a simpler key-value API — making it better suited for storing larger amounts of client-side state or preferences rather than data that needs to travel with every server request.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| `<!DOCTYPE html>` | Declares the document type to the browser; no closing tag |
| `<html>` / `<head>` / `<body>` | Root element / metadata (not visible) / visible content |
| `<title>` / `<meta>` / `<link>` | Browser tab title / document metadata / external resource linking (e.g., CSS) |
| `<h1>`–`<h6>`, `<p>`, `<div>` | Headings (importance order matters), paragraphs, generic non-semantic container |
| `<a>` / `<img>` | Hyperlinks via `href` / embeds images via `src` |
| `<ul>` / `<ol>` / `<li>` | Unordered / ordered lists / individual list items |
| `<table>` / `<tr>` / `<th>` / `<td>` | Table / row / header cell / data cell |
| `<script>` | Embeds or references JavaScript |
| DOM | Browser's live, in-memory, tree-structured representation of the document — what JS actually manipulates |
| XML | Custom, user-defined tags for structuring/transporting data (not display-focused) |
| XHTML | HTML with XML's strict, well-formed syntax rules |
| Web Storage (`localStorage`/`sessionStorage`) | Client-side key-value storage; persistent vs. session-only |

---