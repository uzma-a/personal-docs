# Express.js Framework — MVC, Routing, Middleware & Authentication

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Node.js Packages & npm

### Learning Perspective
Developers rely heavily on **third-party packages** to **extend Node.js** — rather than building every piece of functionality from scratch, the Node.js ecosystem provides a massive library of pre-built, community-maintained packages for nearly any common task (web frameworks, authentication, data parsing, HTTP clients, and so on).

**`npm`** is the **application that manages Node.js packages** in your Node.js framework installation — used to install, update, remove, and track dependencies for a project.

### Interview Perspective
**Q: Why do Node.js developers rely so heavily on third-party packages?**
> Because reinventing common functionality (web servers, authentication, data parsing) for every project is inefficient and error-prone. The Node.js ecosystem, managed through npm, provides a huge library of tested, community-maintained packages, letting developers focus on their application's unique logic rather than rebuilding foundational pieces.

**Q: What is npm, exactly?**
> The application used to manage Node.js packages within a Node.js installation/project — installing, updating, removing, and tracking dependencies (recorded in `package.json`).

---

## 2. MVC Architecture

### Learning Perspective
**MVC** (**Model-View-Controller**) is an **architectural pattern** that divides a back-end application into **three components**:

- **Model** — the layer responsible for **managing the application's data**. It **interacts with the database** and handles the **data logic** — validation, storage, retrieval, and business rules around the data itself.
- **View** — the layer responsible for **rendering the presentation** of the data that's passed to it by the model — what the user actually sees.
- **Controller** — the layer that **regulates the flow of data**. It's responsible for **processing the data supplied to it by the user** (e.g., an incoming HTTP request) and **sending that data to the model** for manipulation or storage — acting as the coordinator between the user's request, the data layer, and the presentation layer.

**The typical flow:** a user's request comes in → the **controller** processes it → the controller talks to the **model** to fetch or update data → the result is passed to the **view** to be rendered → the response goes back to the user.

### Interview Perspective
**Q: What is MVC, and what does each component do?**
> MVC (Model-View-Controller) separates a back-end application into three responsibilities: the Model manages data and interacts with the database, the View renders the presentation of that data, and the Controller processes incoming requests, coordinates between the Model and View, and directs the overall flow of data through the application.

**Q: Why is separating an application into MVC beneficial?**
> It separates concerns — data logic, presentation logic, and request-handling logic are isolated from each other, which makes each piece easier to test, maintain, and modify independently. For example, you could change how data is presented (the View) without touching how it's stored or validated (the Model).

⭐ **Frequently asked** — be ready to trace a concrete request through all three layers (e.g., "walk me through what happens when a user requests `/books`").

---

## 3. REST & REST APIs

### Learning Perspective
**REST** ("**Representational State Transfer**") is a **set of guidelines** for creating **stateless** client/server interfaces using **HTTP methods**. A **REST API** is an API used for communication between clients and servers that **conforms to REST's architectural principles**.

**REST API frameworks use HTTP methods to communicate** — this is the practical expression of REST: resources are addressed via URLs, and operations on those resources map to standard HTTP methods (GET, POST, PUT, DELETE, as covered in the server-side JS notes).

**Statelessness** — a core REST principle — implies that **each HTTP request happens in isolation** relative to other requests. **The state of the client is not stored on the server**; instead, the **state is passed to the server by the client with each request** (e.g., via headers, tokens, or request parameters). This means the server doesn't need to "remember" anything about a client between requests — each request must be **self-contained**, carrying everything the server needs to process it.

### Interview Perspective
**Q: What does REST mean, and what makes an API "RESTful"?**
> REST (Representational State Transfer) is a set of architectural guidelines for building stateless client-server APIs over HTTP. An API is RESTful when it follows these principles — using standard HTTP methods to operate on clearly identified resources (via URLs), and remaining stateless between requests.

**Q: Explain statelessness in REST, and why it matters.**
> Statelessness means the server doesn't retain any memory of previous client requests — each request must carry all the information the server needs to process it (e.g., an auth token identifying the user), rather than relying on server-side session memory. This matters because it makes RESTful services easier to scale horizontally — any server instance can handle any request, since no server needs to have "remembered" a particular client's prior state.

---

## 4. Express.js: Abstraction Over Node.js

### Learning Perspective
**Express.js** is a **web application framework based on the Node.js runtime environment** — but critically, **Express abstracts low-level details** that you'd otherwise have to handle manually with Node's raw `http` module (parsing URLs, handling different HTTP methods, managing request/response objects, etc.).

More generally, a **framework** is a **skeleton** on which an application is built for a specific environment — the **fundamental structure that supports the application**. A **Node framework** specifically is a framework that works **in conjunction with Node.js** (Express being the most widely used example).

### Interview Perspective
**Q: What does it mean that "Express abstracts low-level details" of Node.js?**
> Node's built-in `http` module requires you to manually parse URLs, differentiate HTTP methods, and handle request/response objects yourself. Express wraps all of that in a much more convenient API — clean routing methods (`app.get`, `app.post`, etc.), middleware support, and helper methods on `req`/`res` — so you write far less boilerplate to accomplish the same server behavior.

**Q: What is a framework, in general terms, and how does that definition apply to Express?**
> A framework is the fundamental structural skeleton an application is built on top of, for a specific environment. Express is a Node.js framework specifically — it provides the structure (routing, middleware pipeline, request/response conveniences) that a web application built on Node.js is organized around.

---

## 5. Routing: Application-Level vs. Router-Level

### Learning Perspective
**Routing** — associating an HTTP request method and a URL with the code that should handle it (a **route**) — can be handled at **two different levels** in Express:

- **Application-level routing** — routes are defined directly on the main `app` object (e.g., `app.get('/books', handler)`), applying globally across the whole application
- **Router-level routing** — routes are grouped and defined on a separate **`Router`** instance, which is then mounted onto the application at a specific path prefix — letting you organize related routes (e.g., all `/users/*` routes) into their own module, keeping the main application file cleaner and more modular

```js
// Router-level example
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('All books'));
router.get('/:id', (req, res) => res.send('One book'));

// mounted in the main app file:
app.use('/books', router);
```

### Interview Perspective
**Q: What's the difference between application-level and router-level routing in Express?**
> Application-level routing defines routes directly on the main `app` object, applying globally. Router-level routing groups related routes on a separate `Router` instance, which is then mounted onto the app at a specific base path — useful for organizing large applications into modular, feature-specific route files instead of cramming everything into one central file.

**Q: Why would you choose router-level routing over defining everything on `app` directly?**
> For maintainability and organization — as an application grows, keeping all routes in one file becomes unwieldy. Router-level routing lets you split routes by feature/resource (e.g., a `usersRouter`, a `booksRouter`), each in its own file, mounted onto the main app — making the codebase easier to navigate and reason about.

---

## 6. Middleware — The Five Types

### Learning Perspective
**Middleware** in Express refers to **functions that have access to the request and response objects**, and to the **`next()`** function — middleware sits **in the pipeline** between an incoming request and the final route handler, able to inspect, modify, or reject the request before it continues onward (by calling `next()` to pass control along, or by ending the response directly).

**There are five types of middleware:**

1. **Application-Level Middleware** — acts as a **gatekeeper**, **bound to the application** as a whole. **No request to the application server can go past it** without first passing through — commonly used for logging, authentication checks, or CORS handling that should apply globally.
   ```js
   app.use((req, res, next) => {
     console.log(`${req.method} ${req.url}`);
     next(); // pass control to the next handler
   });
   ```

2. **Router-Level Middleware** — **bound to a router**, **not bound to the application** as a whole. Lets you apply middleware to only a **specific set of routes**, instead of forcing every request through the same global middleware — you bind the application's routes to each router, and any middleware attached to that router only affects its own routes.

3. **Error-Handling Middleware** — can be bound to either the **entire application** or **specific routers**. Distinguished by always taking **four arguments**: `error`, `request`, `response`, and `next` — **even if you don't use the `next` parameter, you still define it** in the method signature, since Express identifies error-handling middleware specifically by its four-argument signature.
   ```js
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).send('Something broke!');
   });
   ```

4. **Built-In Middleware** — ships with Express itself; can be bound to either the **entire application** or **specific routers**. Useful for common activities like **rendering HTML pages from the server**, **parsing JSON input** from the front end, and **parsing cookies**.
   ```js
   app.use(express.json());   // parses JSON request bodies
   app.use(express.static('public')); // serves static files
   ```

5. **Third-Party Middleware** — middleware published by the community (npm packages) that plugs into Express's middleware pipeline the same way built-in or custom middleware does — e.g., authentication libraries, logging tools, or CORS handling packages.

### Interview Perspective
**Q: What is middleware in Express, and what capabilities does it have?**
> Middleware functions have access to the request object, the response object, and the `next()` function. They sit in the request-processing pipeline before the final route handler, able to inspect or modify the request/response, or terminate the request early — and they call `next()` to pass control on to the next middleware or route handler in the chain.

**Q: Name the five types of middleware in Express, and briefly distinguish them.**
> Application-level (bound to the whole app — every request passes through it), router-level (bound to a specific router, only affecting that router's routes), error-handling (identified by its four-argument signature: `err, req, res, next`), built-in (ships with Express — e.g., `express.json()`, `express.static()`), and third-party (community npm packages that plug into the middleware pipeline).

**Q: Why does error-handling middleware always need four parameters, even if `next` isn't used?**
> Because Express specifically identifies a middleware function as an error handler by checking its arity (argument count) — a function with exactly four parameters is treated as error-handling middleware, distinct from regular middleware's three-parameter signature (`req, res, next`). Omitting the unused `next` parameter would cause Express to misidentify it as regular middleware instead.

⭐ **Extremely frequently asked** — the five middleware types (and especially the error-handling middleware's four-argument signature) are among the most commonly tested Express-specific interview questions.

---

## 7. Template Rendering

### Learning Perspective
**Template rendering** is the **ability of the server to fill in dynamic content** in an **HTML template** — rather than serving static, unchanging HTML, the server generates HTML on the fly, injecting data (from a database, an API call, user input, etc.) into predefined template placeholders before sending the final HTML to the client.

Express supports various **template engines** (e.g., EJS, Pug, Handlebars) via its `res.render()` method, which combines a named template file with a data object to produce the final HTML response.

### Interview Perspective
**Q: What is template rendering, and why would a server use it instead of serving static HTML?**
> Template rendering lets the server dynamically inject data into an HTML template before sending it to the client — e.g., populating a user's name, a list of products, or other database-driven content into predefined placeholders. It's used instead of static HTML whenever the page's content needs to reflect current, dynamic data rather than being identical for every request.

---

## 8. Authentication & Authorization

### Learning Perspective
Two related but distinct concepts:

- **Authentication** — the process of **confirming a user's identity** using credentials, by **validating who they claim to be**. Authentication assures an application's security by **guaranteeing that only those with valid credentials can access the system**.
- **Authorization** — in **token-based authentication**, the process that gets executed when a web application wants to **access a protected resource**. A user **authenticates against an authorization server** as part of this flow.

**Two common authentication approaches:**

- **Session-based Authentication** — a user provides login credentials, which are **verified against stored credentials in a database on a server**. A **session ID is provided to the client** and **stored in the browser as a cookie**, used to identify the authenticated user on subsequent requests.
- **Token-based Authentication** — uses **access tokens**, often **JWTs**, which get **passed between server and client** alongside the data exchanged between them. Unlike session-based auth, the server doesn't need to store session state — the token itself carries the necessary information.
- **Passwordless Authentication** — a type of authentication that uses **public/private key pairs** to **encrypt and decrypt data** passed between client and server, **without needing a password** at all.

### Interview Perspective
**Q: What's the difference between authentication and authorization?**
> Authentication confirms *who* a user is — validating their identity via credentials. Authorization determines *what* an authenticated user is allowed to access or do — e.g., whether they can reach a specific protected resource. Authentication generally happens first; authorization decisions are then made based on that established identity.

**Q: What's the difference between session-based and token-based authentication?**
> Session-based authentication verifies credentials against a database, then stores a session ID server-side, giving the client a matching cookie to reference it on future requests — this requires the server to maintain session state. Token-based authentication (often using JWTs) issues a self-contained token to the client, which carries the necessary identity/permission information itself — the server doesn't need to store session state, making token-based auth more naturally compatible with REST's stateless principle.

---

## 9. Tokens: JWT, Access Tokens, ID Tokens

### Learning Perspective
- **Token** — contains **three parts**: the **header**, the **payload**, and the **signature**.
  - **Header** — contains information about the **type of token** and the **algorithm used** to create it
  - **Payload** — contains **user attributes**, called **claims**, such as **permissions, groups, and expirations**
  - **Signature** — **verifies the token's integrity**, confirming the token **hasn't changed during transit**
- **JWT (JSON Web Token)** — an **internet standard** for creating **encrypted payload data in JSON format**; the most common concrete implementation of the token structure above
- **Access Token** — a **small piece of code** containing information about the **user, their permissions, groups, and expirations**, passed from a **server to the client**
- **ID Token** — an artifact that **proves a user has been authenticated**, and contains information about **authorized API routes**

**Using JWTs in an Express application:** the **`jsonwebtoken`** npm package should be **required in an Express application** to authenticate a user — it provides the functionality to **sign** (create) tokens and **verify** incoming tokens as part of the authentication flow.

```js
const jwt = require('jsonwebtoken');

// Signing a token after successful login
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Middleware to verify a token on protected routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}
```

### Interview Perspective
**Q: What are the three parts of a token, and what does each contain?**
> Header (token type and signing algorithm), payload (claims — user attributes like permissions, groups, expirations), and signature (verifies the token hasn't been tampered with in transit).

**Q: What package would you use to implement JWT-based authentication in an Express application, and what does it do?**
> The `jsonwebtoken` npm package — required into the Express app, it provides `sign()` to create/issue a signed token (typically after successful login) and `verify()` to validate an incoming token's signature and decode its payload, commonly used inside authentication middleware protecting specific routes.

**Q: What's the difference between an access token and an ID token?**
> An access token carries the user's permissions/groups/expiration info and is used to authorize access to protected resources/API routes. An ID token specifically proves that authentication happened — confirming the user's identity — and also carries information about which API routes they're authorized to reach. In practice, both are often JWTs, differing mainly in intended purpose/usage within an authentication flow.

⭐ **Frequently asked** — be ready to describe the JWT structure (header/payload/signature) and explain *why* the signature matters (tamper detection) without needing encryption of the payload itself (JWTs are typically signed, not encrypted, by default — the payload is readable, just verifiable as unmodified).

---

## 10. HTTP Requests, Responses & Headers

### Learning Perspective
- **HTTP Request** — a method called by a **client** and sent to a **server**, requesting **access to a resource** on the server
- **HTTP Response** — a method called by a **server** and sent to a **client**, in response to an HTTP request
- **HTTP Headers** — additional information about, and contained in, an HTTP response or request (metadata like content type, authorization tokens, caching directives)
- **JSON Payload** — data transferred in **JSON format** between client and server, in the **header** of an HTTP method (i.e., part of the overall HTTP message, commonly carried in the request/response body alongside relevant headers describing it, like `Content-Type: application/json`)
- **API Endpoint** — the **touchpoint** where an API **connects to the application** it's communicating with — the specific URL path a client sends a request to

### Interview Perspective
**Q: What's the relationship between an HTTP request, response, and headers?**
> A request is sent from client to server asking for access to a resource; a response is sent back from server to client with the result. Headers accompany both — carrying metadata about the message itself (content type, authentication tokens, caching rules) separate from the actual payload/body data being transferred.

**Q: What is an API endpoint?**
> The specific URL/touchpoint where a client's request actually connects with the API it's communicating with — e.g., `/books` or `/users/:id` are endpoints exposed by a REST API for clients to interact with.

---

## 11. TypeScript & xml2js (Related Ecosystem Tools)

### Learning Perspective
- **TypeScript** — a language that **builds on top of JavaScript**, providing **type safety**, which assists with the development of **large-scale applications** by **reducing the complexity** of component development in JavaScript. Increasingly common in larger Express/Node.js codebases for catching type-related bugs at compile time rather than runtime.
- **xml2js** — a Node.js package used to **parse a string of XML elements into a JavaScript object** — relevant when an Express application needs to interact with older APIs or systems that still communicate via XML rather than JSON.

### Interview Perspective
**Q: Why might a team choose TypeScript for a large Express/Node.js application?**
> TypeScript adds static type checking on top of JavaScript, catching many bugs (wrong argument types, typos in property names, mismatched function signatures) at compile time rather than at runtime — which becomes increasingly valuable as an application and its team grow, reducing the complexity of reasoning about how components interact.

**Q: When would you need a package like xml2js in a Node.js/Express application?**
> When integrating with an external system or legacy API that communicates in XML rather than JSON — xml2js converts that XML data into a JavaScript object your application can work with normally, bridging the gap between XML-based external services and a JSON-centric JavaScript codebase.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Access Token** | Contains user info, permissions, groups, and expirations, passed from server to client |
| **API Endpoint** | The touchpoint where an API connects to the application it's communicating with |
| **Application-Level Middleware** | Gatekeeper middleware bound to the application — no request bypasses it |
| **Authentication** | Confirming a user's identity via credentials |
| **Authorization** | The process (in token-based auth) of accessing a protected resource; user authenticates against an authorization server |
| **Built-In Middleware** | Ships with Express; bound to the app or specific routers — e.g., JSON parsing, cookie parsing, HTML rendering |
| **Controller** | The MVC layer regulating data flow — processes user-supplied data and sends it to the model |
| **Error-Handling Middleware** | Bound to app or routers; always takes four arguments: `error, request, response, next` |
| **Express.js** | A web application framework based on Node.js, abstracting low-level details |
| **Framework** | The fundamental structural skeleton an application is built on, for a specific environment |
| **HTTP Headers** | Additional information about/contained in an HTTP request or response |
| **HTTP Request** | A method called by a client, sent to a server, requesting access to a resource |
| **HTTP Response** | A method called by a server, sent to a client, in response to a request |
| **ID Token** | Proves a user has been authenticated; contains info about authorized API routes |
| **JSON Payload** | Data transferred in JSON format between client and server |
| **JWT** | JSON Web Token — an internet standard for creating encrypted payload data in JSON format |
| **Middleware** | Functions with access to `req`, `res`, and `next()` |
| **Model** | The MVC layer managing application data; interacts with the database and handles data logic |
| **MVC** | Model-View-Controller — an architectural pattern dividing an app into three components |
| **Node Framework** | A framework working in conjunction with Node.js |
| **npm** | Manages Node.js packages in a Node.js installation |
| **Passwordless Authentication** | Uses public/private key pairs to encrypt/decrypt data without a password |
| **Private Key** | Known only to a specific client, used to decrypt messages (paired with a public key) |
| **Public Key** | Usable by anyone to encrypt messages for a specific client (paired with a private key) |
| **REST** | Representational State Transfer — guidelines for stateless client/server interfaces using HTTP |
| **REST API** | An API conforming to REST architecture principles |
| **Route** | Code associating an HTTP request method and a URL |
| **Router-Level Middleware** | Bound to a specific router, not the whole application |
| **Session-based Authentication** | Verifies credentials server-side; session ID stored client-side as a cookie |
| **Statelessness** | Each HTTP request is isolated; client state is passed with each request, not stored server-side |
| **Template Rendering** | The server's ability to fill in dynamic content in an HTML template |
| **Token** | Contains a header, payload, and signature |
| **Token-based Authentication** | Uses access tokens (often JWTs) passed between server and client |
| **TypeScript** | A typed superset of JavaScript, aiding large-scale application development |
| **View** | The MVC layer responsible for rendering the presentation of data |
| **xml2js** | A Node.js package to parse XML strings into JavaScript objects |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| npm | Manages Node.js packages/dependencies for a project |
| MVC | Model (data/DB), View (presentation), Controller (coordinates request flow) |
| REST | Stateless client/server guidelines using standard HTTP methods |
| Statelessness | Each request is self-contained; server stores no client state between requests |
| Express | Abstracts Node's low-level `http` details into a convenient framework |
| Routing levels | Application-level (global) vs. router-level (scoped, modular) |
| 5 middleware types | Application-level, router-level, error-handling (4 args), built-in, third-party |
| Error-handling middleware | Identified by exactly 4 params: `err, req, res, next` |
| Template rendering | Server dynamically injects data into HTML templates |
| Authentication vs. authorization | Confirms identity vs. determines access rights |
| Session vs. token-based auth | Server stores session + client cookie vs. self-contained token, no server state |
| Token structure | Header (type/algorithm) + Payload (claims) + Signature (integrity check) |
| JWT in Express | `jsonwebtoken` npm package — `sign()` to issue, `verify()` to validate |