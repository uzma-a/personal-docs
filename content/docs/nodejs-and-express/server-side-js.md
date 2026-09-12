# Server-Side JavaScript — Node.js & Express

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Backend Technologies & Node.js Overview

### Learning Perspective
**Backend technologies** include the various types of **servers and supporting infrastructure** an application relies on — programming languages, frameworks, databases, and the servers that run them all.

**Node.js** is a **JavaScript runtime environment** used for **server-side development** — it runs on Google Chrome's **V8 engine**, letting JavaScript (traditionally a browser-only language) run outside the browser, on a server.

A **runtime environment**, more generally, behaves like a **mini operating system** — it provides the resources an application needs to run: the hardware and software environment in which a codebase actually executes. Node.js is a canonical example of a **backend runtime environment**.

**Client-side vs. server-side JavaScript:**
- **Client-side JavaScript** — processes **front-end user interface elements**, running in the user's browser
- **Server-side JavaScript** — enables access to **different kinds of servers and web applications**; with Node.js specifically, server-side JS **processes and routes web service requests from the client**

### Interview Perspective
**Q: What is Node.js, and why was it significant when it was introduced?**
> Node.js is a JavaScript runtime environment built on Chrome's V8 engine, letting JavaScript run outside the browser — on a server. It was significant because it let developers use a single language (JavaScript) across both the front end and back end of an application, and introduced a non-blocking, event-driven model well-suited to I/O-heavy workloads like web servers.

**Q: What's the core difference between client-side and server-side JavaScript?**
> Client-side JavaScript runs in the browser, handling UI and user interaction. Server-side JavaScript (via Node.js) runs on a server, processing and routing requests, handling business logic, and interacting with databases — code the client never directly sees or executes.

---

## 2. `require` vs. `import` (CommonJS vs. ES Modules)

### Learning Perspective
Node.js historically used **CommonJS** (`require`/`module.exports`), while modern JavaScript (including newer Node.js versions) also supports **ES Modules** (`import`/`export`). They differ in several important ways:

| | `require` (CommonJS) | `import` (ES Modules) |
|---|---|---|
| **Call location** | Can be called from **anywhere** in the code | Must be called at the **beginning of a file** |
| **Binding** | **Dynamically** bound | **Statically** bound |
| **Loading behavior** | Loads modules **synchronously** | Module loading is **asynchronous** |

**What "static vs. dynamic binding" means in practice:** with `import`, the module structure (what's being imported) is determined **before the code runs**, which allows tools to do things like tree-shaking (removing unused exports) at build time. With `require`, imports are resolved **at runtime**, which is more flexible (you can conditionally require a module inside an `if` block, for example) but less analyzable ahead of time.

```js
// CommonJS
const http = require('http');
module.exports = 'Hello Programmers';

// ES Modules
import { addTwo } from './addTwoNos.mjs';
export { addTwo };
```

### Interview Perspective
**Q: What's the difference between `require` and `import` in Node.js?**
> `require` (CommonJS) can be called anywhere in a file, is dynamically bound, and loads modules synchronously. `import` (ES Modules) must appear at the top of a file, is statically bound, and module loading is asynchronous. The static nature of `import` also enables build-time optimizations like tree-shaking, which `require`'s dynamic resolution doesn't support as cleanly.

**Q: Why might `require`'s synchronous loading matter in practice?**
> Because it blocks execution until the module is fully loaded — generally fine for small, local modules on a fast filesystem, but something to be aware of in larger applications or performance-sensitive startup paths, where `import`'s asynchronous model can be more efficient.

⭐ **Frequently asked** — be ready to state all three distinctions (call location, binding, sync/async) clearly and concisely.

---

## 3. Modules & Exports

### Learning Perspective
A **module** is a file containing related, **encapsulated JavaScript code** that serves a specific purpose — the basic unit of code organization and reuse in Node.js.

**To make a function or value available** to other Node.js files that import your module, you add a property to the **`exports`** object (or, equivalently, assign to `module.exports`):

```js
// messages.js
module.exports = 'Hello Programmers';

// app.js
let msg = require('./messages.js');
console.log(msg);
```

```js
// Exporting a named function
module.exports.getDate = function getDate() {
  let aestTime = new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" });
  return aestTime;
};
```

**Three categories of modules:**
- **Core modules** — provide **essential functionality**, built directly into Node.js (e.g., `http`, `fs`, `path`) — no installation required
- **Local modules** — modules **you create** for your own application
- **Third-party modules** — created by the **Node.js community**, installed via npm

A **package** is a directory with **one or more modules bundled together**. **`package.json`** contains metadata about the project — including its **dependencies and scripts**. **Dependencies** are code (typically libraries/packages) called from other modules and reused in a program.

### Interview Perspective
**Q: What are the three categories of Node.js modules, and how do they differ?**
> Core modules ship built into Node.js itself (like `http` or `fs`) and need no installation. Local modules are the ones you write yourself for your own application. Third-party modules are published by the community and installed via a package manager like npm.

**Q: How do you make code in one file usable in another file in Node.js?**
> By attaching it to the `exports` object (or `module.exports`) in the source file, then using `require()` (or `import`) to pull it into the file that needs it.

---

## 4. npm & Local vs. Global Installs

### Learning Perspective
**npm** (Node Package Manager) is the **default package manager** for the Node.js runtime environment — used to install, manage, and publish packages.

**Local install** — the installed package is only accessible to **the application within the installation directory** (typically installed into that project's `node_modules` folder). This is the standard, recommended approach for project dependencies, since it keeps each project's dependency versions isolated.

**Global install** — the package becomes accessible to **any application on the machine**, typically used for command-line tools you want available system-wide (e.g., a CLI utility), rather than for project-specific dependencies.

### Interview Perspective
**Q: What's the difference between installing an npm package locally vs. globally, and when would you choose each?**
> A local install (the default, via `npm install package-name`) scopes the package to that specific project's `node_modules` folder — the standard choice for project dependencies, since it keeps versions isolated per project. A global install (`npm install -g package-name`) makes the package available system-wide, typically used for CLI tools you want to run from anywhere, not for dependencies a specific application's code actually imports.

---

## 5. Node.js Execution Model: Single-Threaded, Non-Blocking, Event-Driven

### Learning Perspective
Node.js's core execution model is what makes it well-suited to handling many concurrent I/O operations (like web requests) efficiently:

- **Single-threaded** — only **one command is processed at a given point in time** (on the main JavaScript thread), unlike **multi-threaded** systems where **multiple tasks execute simultaneously**
- **Non-blocking** — the **failure of a given thread does not cause failure in another**, and the **execution of a task is not blocked** until another task's execution completes — I/O operations (like reading a file or querying a database) don't halt the entire program while waiting
- **Event-driven** — the flow of the program is **determined by particular events**, such as user input or the completion of an I/O operation, rather than executing top-to-bottom in a rigid sequence
- **Asynchronous** — a process that **runs independently of other processes**, closely related to the non-blocking model above

**Callback functions** are central to this model: a **callback function** is a function **passed into another function as a parameter**, then **invoked inside the outer function** to complete an action. Instead of **blocking on asynchronous I/O operations**, callback functions handle results **when the operations complete**.

An **anonymous function** — a function that is **not named** — is often passed into another function as a parameter, commonly used as a callback:
```js
setTimeout(function() {  // anonymous function used as a callback
  console.log("Done");
}, 1000);
```

### Interview Perspective
**Q: How does Node.js's single-threaded, non-blocking model let it handle many concurrent requests efficiently?**
> Node.js runs JavaScript on a single main thread, but I/O operations (file reads, network requests, database queries) are handed off and don't block that thread while waiting — the event loop keeps processing other work, and a callback (or Promise resolution) picks up the result once it's ready. This lets a single thread juggle many concurrent, I/O-heavy operations without needing a thread per connection, unlike traditional multi-threaded server models.

**Q: What is a callback function, and why is it central to Node.js's async model?**
> A callback is a function passed as an argument to another function, to be invoked once some operation completes — rather than the program blocking and waiting for that operation synchronously. It's central to Node.js because so much of what a server does (reading files, querying databases, handling network requests) is I/O-bound, and callbacks let that I/O happen without freezing the single execution thread.

⭐ **Very frequently asked** — be ready to explain single-threaded + non-blocking + event-driven as one coherent story, not three disconnected facts.

---

## 6. Basic JavaScript Refresher (Server-Context Examples)

### Learning Perspective
The following core JS concepts underpin everything in server-side development — quick refreshers with server-flavored examples:

**Variables & data types:**
```js
let name = "Book Review";   // string
const rating = 4.5;         // number (immutable binding)
var isPublished = true;     // boolean (function-scoped)
let book = { title: "JS Guide", author: "MDN" }; // object
let tags = ["JavaScript", "Express"];             // array
```

**Control structures:**
```js
if (rating > 4) {
  console.log("Highly rated!");
} else {
  console.log("Needs improvement.");
}

for (let tag of tags) {
  console.log(tag);
}
```

**Functions (declaration vs. arrow):**
```js
function greet(user) {
  return `Hello, ${user}`;
}
const add = (a, b) => a + b;
```

**Array methods for data transformation** (extremely common when shaping API responses):
```js
const books = [
  { title: "JS Basics", rating: 5 },
  { title: "Node Intro", rating: 3 }
];

const topBooks = books.filter(book => book.rating > 4);   // filter
const titles = books.map(book => book.title);             // map
const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / books.length; // reduce
```

**Basic OOP with classes:**
```js
class Book {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }
  describe() {
    return `${this.title} has a rating of ${this.rating}`;
  }
}
const b1 = new Book("Node Basics", 4.2);
console.log(b1.describe());
```

### Interview Perspective
**Q: Why are `map`, `filter`, and `reduce` so commonly used when building server-side APIs?**
> Because API responses are typically built by transforming raw data (often from a database) into the exact shape a client needs — filtering out irrelevant records, mapping database objects into a public-facing response format, or reducing a collection down to aggregate values (totals, averages). These methods let you do that transformation declaratively, without manually managing loop state.

---

## 7. Working with JSON

### Learning Perspective
**JSON (JavaScript Object Notation)** is commonly used in **APIs for data exchange** — it's a lightweight, text-based format that's both human-readable and easy for machines to parse.

- **`JSON.parse()`** — converts a **JSON string into a JavaScript object**
- **`JSON.stringify()`** — converts a **JavaScript object into a JSON string**

```js
let jsonData = '{"title":"Express 101","rating":5}';
const bookObj = JSON.parse(jsonData);     // JSON string → JS object
const newJson = JSON.stringify(bookObj);  // JS object → JSON string
```

This conversion is essential because, while a server working in JavaScript naturally thinks in terms of objects, data transmitted **over the network** (the **payload**) must be sent as **text** — JSON is the near-universal standard format for that text representation in modern web APIs.

### Interview Perspective
**Q: Why is JSON so commonly used for API communication, and what do `parse`/`stringify` actually do?**
> JSON is lightweight, human-readable, and has first-class support in JavaScript (and virtually every other language), making it ideal for exchanging structured data between systems. `JSON.parse()` converts an incoming JSON string (as received over the network) into a usable JavaScript object; `JSON.stringify()` does the reverse — converting a JS object into a JSON string to send out, since network payloads are transmitted as text, not live in-memory objects.

---

## 8. Express.js Basics

### Learning Perspective
**Express.js** is a **highly configurable web framework** for building applications on Node.js — one of the most widely used frameworks in the Node.js ecosystem for building web servers and APIs.

A **framework**, more generally, provides code/structure for performing common tasks (that you build *within*, rather than altering the framework's core itself). Other examples include Django and Ruby on Rails.

**Minimal Express server example:**
```js
// app.js
const express = require("express");
const app = express();

app.use(express.json()); // middleware to parse JSON request bodies

app.get("/books", (req, res) => {
  res.json([{ title: "Learn Node", rating: 4 }]); // return JSON response
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

**Key pieces:**
- **`express()`** — creates the application instance
- **`app.use(express.json())`** — **middleware** that parses incoming request bodies as JSON, making `req.body` usable
- **`app.get(path, handler)`** — defines a **route**: when a GET request hits `/books`, the handler function runs
- **`res.json(data)`** — sends a JSON response back to the client
- **`app.listen(port, callback)`** — starts the server, listening on the specified port

A **`server.js`** file (or `app.js`, as above) is the conventional name for the file containing the code that **handles server creation**.

### Interview Perspective
**Q: What is Express.js, and why would you use it instead of Node's built-in `http` module directly?**
> Express is a web framework built on top of Node.js that provides a much more convenient, configurable layer for building web applications — routing, middleware, request/response helpers — without having to manually parse URLs, methods, and bodies the way you would with the raw `http` module. It's not a replacement for Node.js; it's built on top of it to remove boilerplate.

**Q: What does `app.use(express.json())` actually do, and why is it necessary?**
> It's middleware that runs on every incoming request, parsing the raw request body as JSON and attaching the result to `req.body`. Without it, `req.body` would be `undefined` for JSON payloads — Express doesn't parse request bodies by default, so this middleware is what makes `req.body.someField` usable in your route handlers.

---

## 9. HTTP Methods (REST API Basics)

### Learning Perspective
HTTP methods map to standard **CRUD** operations (**C**reate, **R**ead, **U**pdate, **D**elete) in RESTful web services:

| Method | Purpose |
|---|---|
| **GET** | Read data |
| **POST** | Create data |
| **PUT** | Update data |
| **DELETE** | Remove data |

A **web service** is a type of web API that communicates using **HTTP requests** — it's the programming interface that **sends and receives requests using HTTP** between web servers and clients.

### Interview Perspective
**Q: Map the four core HTTP methods to their CRUD equivalents.**
> GET → Read, POST → Create, PUT → Update, DELETE → Remove/Delete. (A common follow-up distinguishes PUT from PATCH: PUT typically replaces the entire resource, while PATCH applies a partial update — though PATCH wasn't covered in this note set, it's worth knowing if it comes up.)

---

## 10. Accessing Request Data: `req.params`, `req.query`, `req.body`

### Learning Perspective
Express provides three distinct ways to access data coming in with a request, depending on **where** that data lives in the request itself:

**1. `req.params`** — captures **dynamic segments of the URL path** itself, defined with a `:` prefix in the route pattern.
```js
// Visiting /users/123 sets req.params.id to "123"
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // extract dynamic part from URL
  res.send(`User ID is ${userId}`);
});
```

**2. `req.query`** — captures **query string parameters** appended to the URL after a `?`.
```js
// Visiting /books?author=JohnDoe sets req.query.author to "JohnDoe"
app.get('/books', (req, res) => {
  const author = req.query.author; // extract ?author= value from query string
  res.send(`Filter by author: ${author}`);
});
```

**3. `req.body`** — captures data sent in the **request body**, typically for `POST`/`PUT` requests with a JSON payload (requires the `express.json()` middleware to be parsed correctly).
```js
// For JSON { "username": "aname", "password": "pwd123" }, req.body.username returns "aname"
app.post('/register', (req, res) => {
  const username = req.body.username;  // get value from request body
  res.send(`Username received: ${username}`);
});
```

**The payload** refers to the actual **data transmitted between client and server** — `req.body` is where a JSON payload typically ends up once parsed.

### Interview Perspective
**Q: What's the difference between `req.params`, `req.query`, and `req.body`, and when would you use each?**
> `req.params` captures dynamic segments defined directly in the URL path (e.g., `/users/:id`) — used for identifying a specific resource. `req.query` captures key-value pairs from the query string after a `?` (e.g., `?author=JohnDoe`) — used for optional filtering, sorting, or pagination parameters. `req.body` captures data sent in the request body, typically for POST/PUT requests submitting new or updated data (like a form or JSON payload) — and requires body-parsing middleware like `express.json()` to work.

**Q: Give a concrete example of when you'd choose `req.params` over `req.query` for identifying a resource.**
> `req.params` for identifying a *specific, required* resource as part of the URL's identity — e.g., `GET /users/123` clearly refers to user 123. `req.query` is better suited for *optional* modifiers to a broader request — e.g., `GET /users?role=admin` filters a list, but the base `/users` endpoint is still valid without it.

⭐ **Very frequently asked** — this trio is one of the most common practical Express interview questions; be ready to write a quick route example for each from memory.

---

## 11. Servers: Types & Responsibilities

### Learning Perspective
A few related server concepts worth distinguishing clearly:

- **Web server** — ensures **client requests are responded to**, often using **HTTP**
- **HTTP server** — a type of **software-based server** that understands **URLs and HTTP** specifically (Node's built-in `http` module lets you create one directly)
- **Application server** — **transforms data into dynamic content** and runs the **business logic** — the rules governing data storage and transfer
- **Database server** — a server **dedicated to providing database services**

**Creating a raw HTTP server with Node's built-in `http` module** (without a framework like Express):
```js
const http = require('http');
const requestListener = function(req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
};
const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port: ' + port);
server.listen(port);
```

`createServer` takes a **`requestListener`** — a function that takes `request` and `response` parameters, where `request` is the handle to the **incoming request from the client**, and `response` is the handle used to **send data back to the client**.

**Related infrastructure concepts:**
- **Load** — refers to the **number of concurrent users**, the **number of transactions**, and the **amount of data transferred** back and forth between clients and servers
- **Scalability** — an application's ability to **dynamically handle load** as it grows or shrinks, **without affecting performance**

### Interview Perspective
**Q: What's the difference between a web server, an HTTP server, and an application server?**
> A web server broadly ensures client requests get responses, typically over HTTP. An HTTP server is the specific software component that understands URLs and the HTTP protocol itself (e.g., what Node's `http` module provides). An application server goes further — it runs the actual business logic and transforms raw data into dynamic content, rather than just handling the protocol-level request/response mechanics.

**Q: How would you create a basic server using Node's raw `http` module, without Express?**
> Using `http.createServer()`, passing a request listener function that receives `req` and `res` — you write the response manually (e.g., `res.writeHead(200); res.end('Hello, World!');`), then call `server.listen(port)` to start listening for connections. This is more manual than Express, which is exactly why frameworks like Express exist — to avoid writing this boilerplate repeatedly.

**Q: What's the difference between "load" and "scalability"?**
> Load describes the *current demand* on a system — concurrent users, transaction volume, data transferred. Scalability describes the system's *capacity to adapt* to changes in that load — growing or shrinking resources dynamically — without a corresponding drop in performance.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Anonymous Function** | A function that is not named — often passed into another function as a parameter |
| **Application Server** | Transforms data into dynamic content and runs the business logic (data storage/transfer rules) |
| **Asynchronous** | A process that runs independently of other processes |
| **Callback Function** | A function passed into another function as a parameter, invoked inside the outer function to complete an action once an async operation completes |
| **Database Server** | A server dedicated to providing database services |
| **Dependencies** | Code (typically libraries/packages) called from other modules and reused in a program |
| **Event-Driven** | Program flow determined by particular events, such as user input |
| **Express.js** | A highly configurable web framework for building applications on Node.js |
| **Framework** | Generates code (not meant to be altered) to perform common tasks — e.g., Django, Ruby on Rails, Express.js |
| **HTTP Server** | A software-based server that understands URLs and HTTP |
| **Load** | The number of concurrent users, transactions, and data transferred between clients and servers |
| **Module** | A file containing related, encapsulated JavaScript code serving a specific purpose |
| **Multi-Threaded** | Multiple tasks executed simultaneously |
| **Node.js** | A JavaScript runtime environment that runs on Google Chrome's V8 engine |
| **Non-Blocking** | Failure of one thread doesn't cause failure in another; task execution isn't blocked until another finishes |
| **Npm** | Node Package Manager — the default package manager for the Node.js runtime |
| **Package** | A directory with one or more modules bundled together |
| **Package.json** | Contains project metadata, including dependencies and scripts |
| **Payload** | The data transmitted between client and server |
| **Runtime Environment** | The hardware/software infrastructure supporting execution of a codebase (Node.js is a backend example) |
| **Scalability** | An application's ability to dynamically handle load without affecting performance |
| **Server.js** | A file containing the code that handles server creation |
| **Single-Threaded** | Only one command processed at a given point in time |
| **Web Server** | Ensures client requests are responded to, often using HTTP |
| **Web Service** | A web API that communicates using HTTP requests, between web servers and clients |

---

## Quick Reference: Key Node.js Packages & Methods

| Package/Method | Description |
|---|---|
| **`http` / `createServer`** | Establishes remote connections to/from a server; `createServer` takes a `requestListener(req, res)` function |
| **`new Date()`** | Returns the current date as an object; supports formatting/timezone methods |
| **`import()`** | Imports modules exported by another module (ES Modules syntax) |
| **`require()`** | Built-in method to incorporate external modules from other files (CommonJS syntax); reads and executes the target file before returning its export object |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Node.js | JS runtime built on V8, enabling server-side JavaScript execution |
| `require` vs `import` | Anywhere/dynamic/sync vs. top-of-file/static/async |
| Module types | Core (built-in), local (yours), third-party (community, via npm) |
| Local vs. global install | Scoped to one project vs. accessible machine-wide |
| Node.js execution model | Single-threaded + non-blocking + event-driven → handles many concurrent I/O ops efficiently |
| Callback function | Function passed in to be invoked once an async operation completes |
| JSON.parse / JSON.stringify | String → object / object → string |
| Express.js | Web framework on top of Node.js — routing, middleware, request/response helpers |
| HTTP methods (CRUD) | GET=Read, POST=Create, PUT=Update, DELETE=Delete |
| `req.params` / `req.query` / `req.body` | URL path segment / query string / request body payload |
| Web vs. HTTP vs. application server | Responds to requests / understands URLs+HTTP specifically / runs business logic |
| Load vs. scalability | Current demand on the system / capacity to adapt to changing demand |