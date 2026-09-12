# Interview Questions — Deep Dives

A set of classic, extremely common interview questions, answered in the depth an interviewer actually wants to hear — not just the one-liner, but the full chain of reasoning that shows you understand *why*, not just *what*.

---

## 1. "What happens when you type a URL into your browser and press Enter?"

This is one of the most common systems/networking interview questions there is — it's a chance to show you understand the full stack, not just one layer. Walk through it as a sequence of distinct phases.

### The full sequence

**1. Parsing the URL**
The browser first parses what you typed (`ibm.com`) to figure out the pieces: scheme (defaults to `https://` in modern browsers), host (`ibm.com`), and path (defaults to `/`). If it doesn't look like a valid URL, the browser instead treats it as a search query.

**2. DNS lookup**
The browser needs to translate the human-readable domain name (`ibm.com`) into an IP address, since that's what's actually needed to route traffic over the internet. It checks, in order, roughly:
- Browser's own DNS cache
- OS-level DNS cache
- Router/local network cache
- If still not found, a query goes out to a **DNS resolver** (often your ISP's, or a public one like `8.8.8.8`), which in turn queries the DNS hierarchy — a **root server** → a **TLD server** (for `.com`) → the **authoritative name server** for `ibm.com` — until it gets back the actual IP address.

**3. Establishing a TCP connection**
Once the browser has the IP, it opens a **TCP connection** to the server on that address — this involves the **TCP three-way handshake** (SYN → SYN-ACK → ACK) to establish a reliable connection before any actual data is sent.

**4. TLS handshake (since it's HTTPS)**
Because `ibm.com` loads over HTTPS, a **TLS handshake** happens next — the browser and server negotiate the TLS version and cipher suite, the server presents its **SSL/TLS certificate** (which the browser verifies against a trusted Certificate Authority), and they establish a shared encryption key, so everything from here on is encrypted. (More detail on why this matters in Question 2.)

**5. Sending the HTTP request**
The browser sends an **HTTP GET request** to the server, over that now-secure connection — including the request line (`GET / HTTP/1.1`), headers (host, user-agent, accept-encoding, cookies, etc.), and (for a GET) no body.

**6. Server processes the request**
The request typically hits a **load balancer** first (for any site at real scale), which routes it to one of potentially many backend servers. That server (running something like a Node.js/Express, Django, or similar backend) processes the request — this might involve querying a database, running application logic, and assembling the response — possibly also passing through additional layers like an API gateway or caching layer (a CDN might even serve a cached response directly, without hitting the origin server at all, for static content).

**7. Server sends back the HTTP response**
The response includes a **status code** (ideally `200 OK` — see Question 4), response headers, and a body — typically the initial HTML document.

**8. Browser renders the page**
The browser starts parsing the received HTML **incrementally, top to bottom**, building the **DOM (Document Object Model)**. As it encounters references to additional resources — CSS files, JavaScript files, images, fonts — it fires off additional requests for each of those (many in parallel, subject to per-domain connection limits). CSS is parsed into the **CSSOM**; the DOM and CSSOM are combined into a **render tree**; the browser calculates **layout** (the size/position of everything); and finally **paints** pixels to the screen. JavaScript execution can block this process at points where a `<script>` tag is encountered (unless marked `async`/`defer`), since the browser may need to run that JS before it knows how to proceed with parsing.

**9. Page is interactive**
Once JavaScript has finished initial execution and event listeners are attached, the page becomes interactive — this is roughly the moment you'd actually describe as "seeing the IBM homepage" and being able to use it.

### A good, concise verbal answer
> "The browser parses the URL, does a DNS lookup to resolve `ibm.com` to an IP address, opens a TCP connection to that server, performs a TLS handshake since it's HTTPS, then sends an HTTP GET request. The server — likely behind a load balancer — processes that request and sends back an HTTP response with the HTML. The browser then parses that HTML incrementally, building the DOM, fetching additional resources like CSS and JS as it encounters them, computing layout, and painting the page to the screen — and once JS has run and the page is interactive, that's when you're actually looking at and can use the homepage."

**Follow-ups interviewers commonly probe:**
- "What's DNS caching, and why does it matter?" → Speeds up repeat lookups; without it, every request would need the full DNS hierarchy walk.
- "What if the TLS certificate is invalid?" → Browser shows a security warning and blocks/warns before proceeding — protecting against man-in-the-middle attacks (see `openshift.md`).
- "What's the difference between DOM construction and rendering?" → DOM construction is building the tree from HTML; rendering includes layout + paint, which also depends on CSSOM being ready.

---

## 2. HTTP vs. HTTPS

### The core answer
**HTTP (HyperText Transfer Protocol)** transmits data between a client and server in **plain text** — anyone intercepting the traffic (on a shared Wi-Fi network, a compromised router, an ISP, etc.) can read it in full, including sensitive data like passwords or credit card numbers if sent that way.

**HTTPS (HTTP Secure)** is HTTP layered **on top of TLS (Transport Layer Security)** — the same HTTP protocol and semantics, but the entire connection is **encrypted**, so intercepted traffic is unreadable without the encryption key.

### What TLS actually provides (this is the part that shows depth)
1. **Encryption** — data in transit can't be read by an eavesdropper (protects against the man-in-the-middle attacks covered in `openshift.md`'s Istio section)
2. **Integrity** — data can't be silently modified in transit without detection
3. **Authentication** — the TLS certificate proves the server is actually who it claims to be (signed by a trusted Certificate Authority), preventing an attacker from impersonating a legitimate site

### Practical differences
| | HTTP | HTTPS |
|---|---|---|
| **Default port** | 80 | 443 |
| **Encryption** | None | TLS/SSL |
| **URL prefix** | `http://` | `https://` |
| **SEO/browser treatment** | Modern browsers flag as "Not Secure" | Shown as secure (padlock icon) |
| **Certificate required** | No | Yes (from a trusted CA) |

### A good, concise verbal answer
> "HTTP sends data in plain text, so anything transmitted — including sensitive info — can be read by anyone intercepting the traffic. HTTPS is HTTP wrapped in TLS, which encrypts the connection, verifies the server's identity via a certificate, and ensures the data hasn't been tampered with in transit. Practically, that's the difference between a padlock icon and a 'Not Secure' warning — and it's why virtually every modern site, especially anything handling login credentials or payment info, uses HTTPS by default."

**Follow-ups:**
- "How does the browser know to trust a certificate?" → Chain of trust back to a small set of root Certificate Authorities pre-installed in the OS/browser.
- "Is HTTPS slower than HTTP?" → The TLS handshake adds a small amount of initial latency, but modern optimizations (TLS 1.3, session resumption, HTTP/2 multiplexing) make this difference negligible in practice — and it's essentially never a reason to skip HTTPS today.

---

## 3. GET vs. POST

### The core answer
Both are HTTP methods, but they serve fundamentally different purposes:

- **GET** — requests/**retrieves** data from the server. Should be **safe** (doesn't change server state) and **idempotent** (calling it multiple times has the same effect as calling it once — covered in `restapi-and-graphql.md`).
- **POST** — **submits** data to the server, typically to **create** something or trigger a state-changing action. **Not** idempotent by default — submitting the same POST twice could create two separate records.

### Concrete differences

| | GET | POST |
|---|---|---|
| **Purpose** | Read/retrieve data | Create/submit data, trigger an action |
| **Data location** | Appended to the URL as a query string (`?key=value`) | Sent in the request **body** |
| **Visibility** | Visible in the URL, browser history, server logs | Not visible in the URL |
| **Caching** | Can be cached by browsers/CDNs | Generally not cached |
| **Bookmarkable** | Yes | No |
| **Data size limits** | Practically limited by URL length (browser/server dependent, ~2000 chars is a common safe limit) | Effectively no inherent size limit (governed by server config) |
| **Idempotent** | Yes | No |
| **Security for sensitive data** | Data in the URL is logged/visible — avoid sending sensitive data via GET | Better suited for sensitive data (though still needs HTTPS — the body isn't visible in logs/URLs, but is still just as exposed on an unencrypted connection) |

### A good, concise verbal answer
> "GET is for retrieving data — the request data goes in the URL as query parameters, it's cacheable, bookmarkable, and shouldn't change anything on the server. POST is for submitting data — usually to create a new resource or trigger some action — and the data goes in the request body instead of the URL, so it's not logged or visible the same way, and it's not idempotent, meaning sending the same POST twice could create two records instead of one. A practical rule of thumb: if a request is safe to repeat or refresh without side effects, it should probably be GET; if repeating it could cause a duplicate action, it should be POST."

**Follow-ups:**
- "What does idempotent actually mean, with an example?" → `DELETE /users/5` is idempotent — deleting user 5 once or five times leaves the same end state (deleted). A `POST /orders` that creates a new order is not — sending it twice creates two orders.
- "Where do PUT and DELETE fit in?" → PUT updates an existing resource (and is idempotent — setting a value to X twice has the same result as once); DELETE removes a resource (also idempotent).

---

## 4. HTTP Status Code Families (1xx–5xx)

### The core answer — each family's meaning

| Family | Meaning | What it tells the client |
|---|---|---|
| **1xx — Informational** | Request received, continuing process | "Hang on, still working on it" |
| **2xx — Success** | The request was successfully received, understood, and accepted | "It worked" |
| **3xx — Redirection** | Further action needs to be taken to complete the request | "Go look somewhere else" |
| **4xx — Client Error** | The request contains bad syntax or can't be fulfilled, due to something the *client* did wrong | "You made a mistake" |
| **5xx — Server Error** | The server failed to fulfill a valid request | "We made a mistake" |

### Common specific codes worth knowing by name (interviewers often ask for these directly)

**1xx:**
- `100 Continue` — client should continue sending the rest of a request

**2xx:**
- `200 OK` — standard success response
- `201 Created` — a new resource was successfully created (typical response to a successful POST)
- `204 No Content` — success, but there's nothing to send back in the body (common for a successful DELETE)

**3xx:**
- `301 Moved Permanently` — resource permanently moved to a new URL; clients/search engines should update their references
- `302 Found` — temporary redirect
- `304 Not Modified` — cached version is still valid, no need to re-download (an important performance optimization)

**4xx:**
- `400 Bad Request` — malformed request syntax
- `401 Unauthorized` — authentication is required and has failed or hasn't been provided (technically means "unauthenticated," a commonly cited naming quirk)
- `403 Forbidden` — the server understood the request but refuses to authorize it (the client's identity is known, but they don't have permission)
- `404 Not Found` — the requested resource doesn't exist
- `429 Too Many Requests` — rate limit exceeded

**5xx:**
- `500 Internal Server Error` — generic catch-all for an unexpected server-side failure
- `502 Bad Gateway` — a server acting as a gateway/proxy got an invalid response from an upstream server
- `503 Service Unavailable` — server is temporarily unable to handle the request (overloaded, down for maintenance)
- `504 Gateway Timeout` — a gateway/proxy didn't get a timely response from an upstream server

### A good, concise verbal answer
> "The first digit tells you the category: 1xx is informational, 2xx means success, 3xx means redirection, 4xx means the client made a mistake — bad request, unauthorized, not found — and 5xx means the server messed up. A few I'd know by number specifically: 200 for a plain success, 201 when something's created, 404 for not found, 401 for not authenticated versus 403 for authenticated-but-not-allowed, and 500 for a generic server error. That 401 versus 403 distinction trips people up a lot — 401 means 'we don't know who you are,' 403 means 'we know who you are, and you're not allowed.'"

**Follow-ups:**
- "What's the difference between 401 and 403?" (see above — very commonly asked as its own dedicated question)
- "When would you see a 502 vs. a 504?" → 502 means the upstream server responded, but with something invalid/malformed. 504 means the upstream server never responded in time at all — a timeout, not a bad response.

---

## 5. React vs. Plain JavaScript — "Why bother with React?"

### The core answer
You *can* build any web application with plain (vanilla) JavaScript — React doesn't do anything that's fundamentally impossible without it. What React provides is **structure, efficiency, and developer ergonomics** for building complex, interactive UIs at scale — problems that become genuinely painful to solve by hand as an application grows.

### The specific pain points React solves

**1. Manual DOM manipulation is error-prone and hard to reason about at scale.**
In vanilla JS, when data changes, *you* are responsible for finding the right DOM elements and updating them — `document.getElementById(...)`, `.innerHTML = ...`, `.appendChild(...)`, and so on, scattered wherever that data might affect the page. As an app grows, keeping "what the UI shows" in sync with "what the actual data is" by hand becomes extremely difficult to track and gets bug-prone very quickly (a checkbox that doesn't update, a stale count in the corner, a list that renders duplicates).

React flips this: you describe **what the UI should look like for a given state** (declarative), and React figures out **how to update the actual DOM** to match, automatically, whenever that state changes. You stop manually writing DOM manipulation code almost entirely.

**2. Component-based architecture.**
React lets you break the UI into small, independent, reusable **components** (covered in depth in `react-basics.md`) — each with its own logic and, optionally, its own state — that compose together into a full application. Vanilla JS has no built-in equivalent structure; you'd need to invent your own conventions for organizing code this way, and keep them consistent across a whole team/codebase.

**3. Efficient updates via the Virtual DOM.**
Covered fully in Question 6 below — but in short, React batches and minimizes actual DOM operations (which are comparatively expensive), so UI updates stay fast even as an application's complexity grows.

**4. A massive ecosystem and established patterns.**
State management solutions (like Redux, covered in `advanced-react-functionality.md`), routing, form handling, testing tools — React's popularity means there's a mature, well-documented ecosystem for solving nearly every common problem, rather than reinventing solutions from scratch every time in vanilla JS.

**5. Consistency across a team.**
On any team beyond a single developer, having a shared, structured way to build UI (components, one-way data flow, hooks) makes it dramatically easier for multiple people to work on the same codebase without stepping on each other or reinventing conventions differently in different parts of the app.

### The honest trade-off (showing balanced judgment matters in an interview)
React adds a build step, a learning curve, and some overhead (bundle size, the framework itself) that a simple static page genuinely doesn't need. For a very small, mostly-static site, plain HTML/CSS/a little vanilla JS is often the *better*, simpler choice — React earns its complexity specifically as an application's interactivity and state complexity grows.

### A good, concise verbal answer
> "You could build anything in vanilla JavaScript — React doesn't add new capability the browser doesn't already have. What it adds is a much better way to *manage* complexity as an app grows: instead of manually finding and updating DOM elements every time data changes — which gets really hard to keep in sync and bug-free at scale — React lets you just describe what the UI should look like for a given state, and it figures out the DOM updates for you. It also gives you a component-based way to organize and reuse UI code, which vanilla JS has no built-in equivalent for. So for a small, mostly-static page, plain JS is often simpler and totally fine — React earns its complexity specifically once you're dealing with a lot of interactive, changing state across a nontrivial UI."

---

## 6. What Is the Virtual DOM?

### The core answer
The **Virtual DOM** is an **in-memory, lightweight JavaScript representation** of what the actual DOM should look like — essentially a plain JavaScript object tree mirroring the real DOM's structure, but much cheaper to create and manipulate than the real DOM itself.

### Why it exists — the actual problem it solves
Directly manipulating the **real DOM** is comparatively **slow** — every change can potentially trigger the browser to recalculate layout and repaint parts of the screen, which is computationally expensive, especially if done repeatedly and inefficiently (e.g., many small, uncoordinated updates in a row).

React's solution:
1. When state changes, React builds a **new Virtual DOM tree** reflecting what the UI *should* now look like
2. React **compares (diffs)** this new Virtual DOM tree against the **previous** Virtual DOM tree — this comparison process is called **reconciliation**
3. React calculates the **minimal set of actual changes** needed to bring the real DOM in line with the new Virtual DOM
4. React applies **only those specific changes** to the real DOM — a targeted, batched update, rather than tearing down and rebuilding everything

### Common misconception to correct (this shows real understanding)
The Virtual DOM doesn't mean React *avoids* touching the real DOM — it still updates the real DOM, same as any JS would have to. What it does is make those real-DOM updates **efficient and minimal**, by figuring out precisely what changed in memory first (cheap), before touching the actual DOM (comparatively expensive) — rather than blindly re-rendering large chunks of the page on every single state change.

### A good, concise verbal answer
> "The Virtual DOM is an in-memory, lightweight copy of the real DOM that React keeps and updates internally. When state changes, React builds a new version of this virtual tree, compares it to the previous version — that's called reconciliation — and figures out the minimal set of actual changes needed. Only then does it touch the real DOM, applying just those specific updates instead of re-rendering everything. It's not that React avoids the real DOM — direct DOM manipulation is just comparatively expensive, so React does the expensive diffing work cheaply, in memory, first, to minimize how much real DOM work actually needs to happen."

**Follow-ups:**
- "Why is direct DOM manipulation expensive?" → Can trigger layout recalculation (reflow) and repainting, which are computationally costly browser operations, especially if triggered repeatedly/unbatched.
- "Does the Virtual DOM make React inherently faster than vanilla JS?" → Not automatically — extremely well-optimized, hand-written vanilla JS DOM manipulation targeting *exactly* the right elements can be just as fast or faster. The Virtual DOM's real value is giving *you*, the developer, that same efficiency essentially for free, without needing to manually track and optimize exactly what changed yourself every time.

---

## Quick Reference: All Six, in One Line Each

| Question | One-line core answer |
|---|---|
| URL → page flow | Parse URL → DNS lookup → TCP handshake → TLS handshake → HTTP request → server processes → HTML response → browser parses/builds DOM → fetches assets → layout/paint → interactive |
| HTTP vs HTTPS | Plain text vs. TLS-encrypted, authenticated, integrity-checked |
| GET vs POST | Retrieve data (URL params, idempotent) vs. submit/create data (body, not idempotent) |
| Status code families | 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error |
| Why React over vanilla JS | Declarative state-driven UI + components + efficient updates, vs. manual DOM sync at scale |
| Virtual DOM | In-memory diffable copy of the DOM — minimizes expensive real-DOM updates via reconciliation |

---

*These are framed as "tell me the story, then be ready for the follow-up" — interviewers are usually testing depth beyond the one-liner, so the follow-up answers matter as much as the headline answer.*