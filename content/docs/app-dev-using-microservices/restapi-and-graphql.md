# REST APIs & GraphQL

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Complements `express-framework.md` and `api-and-authentication.md` — this file focuses on REST's architectural principles, contrasts REST with GraphQL, and covers the practical tooling ecosystem (API Gateway, cURL, Postman, Swagger/OpenAPI) used to build, expose, and test APIs.

---

## 1. REST: What It Is & Why It Matters

### Learning Perspective
**REST is an architectural style defining how applications communicate** — a set of constraints and conventions, not a specific protocol or technology, for building networked APIs that are consistent, predictable, and scalable.

**REST APIs provide flexible but uniform interfaces** between components. **"Flexible"** because REST doesn't dictate specific data formats or exact endpoint structures — teams have room to design an API suited to their domain. **"Uniform"** because REST does impose a consistent set of conventions (standard HTTP methods, resource-oriented URLs, predictable response codes) that any REST-familiar developer can quickly understand, regardless of which specific API they're looking at.

**REST APIs communicate using HTTP methods** — **POST, GET, PUT, and DELETE** — mapping directly onto CRUD operations (as covered in depth in `express-framework.md` and `sql-relational-db.md`):

| Method | CRUD Operation |
|---|---|
| **GET** | Read |
| **POST** | Create |
| **PUT** | Update |
| **DELETE** | Delete |

### Interview Perspective
**Q: What does it mean that REST is "an architectural style" rather than a protocol?**
> REST isn't a specific technology or protocol you install — it's a set of design constraints and conventions (statelessness, resource-oriented URLs, standard HTTP methods, uniform interfaces) that guide how you build an API. Any API following these conventions, regardless of the specific programming language or framework used to implement it, can be considered RESTful — it's a philosophy of API design, not a piece of software.

**Q: In what sense is a REST API "flexible but uniform"?**
> Flexible because REST doesn't mandate specific data formats or a rigid endpoint structure — you design resources and payloads that fit your domain. Uniform because REST still imposes consistent conventions — standard HTTP methods matching CRUD operations, resource-based URLs, predictable status codes — so any developer familiar with REST principles can quickly understand and work with a new REST API they've never seen before, without needing custom documentation for basic interaction patterns.

---

## 2. Statelessness & Scalability

### Learning Perspective
**REST APIs are stateless and scalable** — two closely related properties (statelessness directly *enables* scalability):

- **Statelessness** — each request from a client to a server must contain **all the information needed** to understand and process that request. The server does **not** store any client session state between requests — every request is handled independently, as if it were the very first request that client ever made (covered in more depth in `express-framework.md`'s REST section).

- **Scalability** — because no server needs to "remember" anything about a specific client between requests, **any** server instance can handle **any** incoming request — there's no need to route a given client's requests back to the *same* server every time (as you might need with stateful, session-based systems). This makes REST APIs naturally well-suited to **horizontal scaling** — you can add more server instances behind a load balancer, and any of them can serve any request, without needing sticky sessions or shared session storage.

### Interview Perspective
**Q: How does statelessness in REST directly enable scalability?**
> Because no server instance stores client-specific session state, any server behind a load balancer can handle any incoming request — there's no need to route a specific client's requests back to the exact same server ("sticky sessions"), and no need for servers to share session state with each other. This makes it trivial to add more server instances to handle increased load, since every instance is equally capable of serving any request.

**Q: What would happen to a REST API's scalability if it violated statelessness (e.g., stored session data in server memory)?**
> You'd need sticky sessions — routing a given client consistently back to the same server instance that holds their session state — or a shared, centralized session store all servers can access. Both add complexity and potential bottlenecks: sticky sessions make load balancing less even and complicate failover (if that specific server goes down, the session is lost), while a shared session store introduces its own scaling and latency concerns. Pure statelessness avoids all of this entirely.

---

## 3. API Gateway

### Learning Perspective
An **API Gateway** is the **door to your backend services**, while also **enabling you to plug in additional services**, providing **unified access** to everything behind it — a single, consistent entry point that sits in front of one or more backend services, routing incoming requests to the appropriate service.

**API Gateway makes it easier to scale or replace your backend services** — since clients interact only with the gateway's stable, public-facing interface, the actual backend services behind it can be scaled, refactored, or entirely replaced without clients needing to know or care, as long as the gateway's exposed interface stays consistent.

**Common capabilities an API Gateway typically provides**, beyond simple routing:
- **Authentication/authorization** — centralized security enforcement, rather than every backend service reimplementing it
- **Rate limiting** — protecting backend services from being overwhelmed
- **Request/response transformation** — adapting data formats between what clients expect and what backend services actually provide
- **Aggregation** — combining responses from multiple backend services into a single response for the client, reducing the number of round-trips a client needs to make

### Interview Perspective
**Q: What is an API Gateway, and why is it useful in a microservices architecture specifically?**
> An API Gateway is a single, unified entry point that sits in front of one or more backend services, routing requests appropriately and often providing centralized capabilities like authentication, rate limiting, and request aggregation. It's especially useful in microservices architectures because it hides the internal decomposition of the system from clients — clients interact with one stable gateway interface, while the actual number, structure, or technology of backend services behind it can change freely without breaking client integrations.

**Q: How does an API Gateway make it easier to scale or replace backend services?**
> Since clients only ever interact with the gateway's public interface, not the backend services directly, you can scale a backend service (adding more instances) or even completely replace/rewrite it, as long as the gateway continues routing to it correctly and the gateway's own exposed interface to clients stays the same. Clients remain completely unaffected by whatever changes happen behind the gateway.

⭐ **Frequently asked** — be ready to explain why an API Gateway matters specifically in a microservices context, connecting back to `intro-to-microservices.md`'s coverage of independent service evolution.

---

## 4. GraphQL: An Alternative to REST

### Learning Perspective
While not explicitly covered in your source bullets, understanding **GraphQL** as a contrast to REST is essential given this file's title — it directly connects to the API architecture comparison in `api-and-authentication.md`.

**GraphQL** is a **query language for APIs**, where the **client specifies exactly what data it needs** in a single request, rather than the server dictating a fixed response shape per endpoint (as REST endpoints typically do).

**Core differences from REST:**

| Aspect | REST | GraphQL |
|---|---|---|
| **Endpoints** | Multiple endpoints, one per resource (`/books`, `/authors`) | Typically a **single** endpoint |
| **Response shape** | Fixed per endpoint, server-determined | Client-determined, via the query itself |
| **Over-fetching** | Common — endpoint may return more fields than needed | Avoided — client requests exactly the fields it wants |
| **Under-fetching** | Common — may need multiple requests to related resources | Avoided — a single query can traverse relationships |
| **HTTP methods** | Meaningful (GET/POST/PUT/DELETE map to operations) | Typically all requests are POST; operations distinguished by query type (query/mutation) instead |
| **Caching** | Naturally cacheable via HTTP caching (GET requests, URLs as cache keys) | More complex — a single endpoint with varying query bodies doesn't cache as naturally via standard HTTP caching |

**Example GraphQL query**, illustrating client-specified shape:
```graphql
query {
  book(id: "123") {
    title
    author {
      name
    }
  }
}
```
This retrieves exactly the book's title and its author's name — nothing more — in a **single** request, even though "book" and "author" might be entirely separate resources/tables under the hood.

### Interview Perspective
**Q: What's the core difference between how REST and GraphQL handle response shape?**
> In REST, each endpoint returns a fixed, server-determined response shape — the client gets whatever that endpoint is designed to return, potentially more or less than it actually needs. In GraphQL, the client specifies exactly which fields it wants in the query itself, and the server returns precisely that — eliminating both over-fetching (getting unneeded fields) and under-fetching (needing multiple round-trips to assemble related data).

**Q: Why is HTTP-level caching more complicated with GraphQL than with REST?**
> REST's use of distinct URLs per resource, combined with GET requests, lets standard HTTP caching mechanisms (browser caches, CDNs, proxies) cache responses naturally, using the URL as the cache key. GraphQL typically exposes a single endpoint, with the actual query determining the response — since the "key" that determines the response (the query body) isn't part of the URL the way REST's resource paths are, standard HTTP-level caching doesn't apply as cleanly, requiring GraphQL-specific caching strategies instead.

**Q: When might REST still be preferred over GraphQL, despite GraphQL's flexibility?**
> When the API's data needs are relatively simple and well-matched to REST's resource model, when HTTP-level caching is a priority, when the team/ecosystem already has strong REST tooling and familiarity, or when you want to leverage REST's natural alignment with HTTP semantics (status codes, methods) for simpler client integration — GraphQL's flexibility comes with added server-side complexity (resolving arbitrary client queries safely and efficiently) that isn't always worth it for straightforward use cases.

---

## 5. Flask as an API Host

### Learning Perspective
**Flask is a micro web framework to host Python web applications** — as covered in depth in `web-app-using-flask.md`, Flask's minimal, unopinionated design makes it a popular choice specifically for building and hosting REST APIs in Python, since you can add exactly the routing, request-parsing, and response-formatting logic an API needs without unnecessary framework overhead.

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/books", methods=["GET"])
def get_books():
    return jsonify([{"title": "Node Basics", "rating": 4.2}])

@app.route("/books", methods=["POST"])
def create_book():
    data = request.get_json()
    return jsonify(data), 201
```

### Interview Perspective
**Q: Why is Flask commonly used specifically for building REST APIs, rather than full-featured web applications?**
> Flask's minimal, microframework design (covered in `web-app-using-flask.md`) means it doesn't impose unnecessary structure for things a pure API doesn't need — like full templating/rendering pipelines. It gives you exactly the routing, request parsing, and JSON response handling a REST API needs, without extra overhead, making it a lightweight, popular choice for API-only backends specifically.

---

## 6. cURL

### Learning Perspective
**cURL** is used for **transferring data with URLs**, and can be used **at a command line or in scripts** — a widely-available, universal command-line tool for making HTTP requests, extremely common for quickly testing an API endpoint or scripting automated API interactions.

```bash
# Basic GET request
curl https://api.example.com/books

# POST request with a JSON body
curl -X POST https://api.example.com/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Node Basics", "rating": 4.2}'

# Include custom headers (e.g., an auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/books

# View response headers along with the body
curl -i https://api.example.com/books
```

### Interview Perspective
**Q: What is cURL, and why is it commonly used when working with APIs?**
> cURL is a command-line tool for transferring data over URLs — most commonly used to send HTTP requests directly from the terminal or from scripts, without needing a GUI tool or writing custom client code. It's popular for quickly testing an API endpoint during development, debugging issues by inspecting raw request/response details, or scripting automated interactions with an API as part of a larger workflow (like a CI/CD pipeline).

**Q: How would you send a POST request with a JSON body and a custom header using cURL?**
> `curl -X POST <url> -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"key": "value"}'` — `-X POST` specifies the method, `-H` adds headers (repeatable for multiple headers), and `-d` provides the request body.

---

## 7. Postman

### Learning Perspective
**Postman** is a **simple and popular tool** for **building, testing, and using APIs** — a GUI-based application (as opposed to cURL's command-line approach) offering a more visual, interactive way to construct requests, organize them into collections, write automated tests against responses, and share API definitions with a team.

**Common Postman capabilities:**
- Building and sending requests with a visual interface (no need to remember exact cURL flag syntax)
- **Collections** — organizing related requests together, often mirroring an entire API's structure
- **Environments** — swapping between different sets of variables (e.g., base URLs, tokens) for dev/staging/production without rewriting requests
- **Automated tests** — writing assertions against responses (status codes, response body content) that run automatically
- **Collection sharing** — collaborating with a team by sharing a Postman collection, so everyone tests against the same defined set of requests

### Interview Perspective
**Q: What is Postman, and how does it compare to using cURL for API testing?**
> Postman is a GUI-based tool for building, testing, and organizing API requests — offering a more visual, interactive workflow than cURL's command-line approach, plus additional capabilities like organizing requests into shareable collections, managing environment-specific variables, and writing automated test assertions against responses. cURL is faster for quick, one-off requests or scripting; Postman is generally preferred for more involved, ongoing API development/testing workflows, especially when collaborating with a team.

**Q: What's the benefit of Postman's "Environments" feature?**
> It lets you define sets of variables (like a base URL, API key, or auth token) that differ across contexts — e.g., dev, staging, production — and switch between them without needing to manually edit every individual request. The same collection of requests can then run correctly against any environment just by selecting a different active environment.

---

## 8. Swagger & the OpenAPI Specification

### Learning Perspective
- **Swagger** — **helps you document and test your API**. Originally, "Swagger" referred to both the specification format *and* the associated tooling; today, the specification itself has been formally renamed **OpenAPI**, while "Swagger" now primarily refers to the associated **tooling** built around that specification (Swagger UI, Swagger Editor, Swagger Codegen).

- **OpenAPI specification** — a **standard way of representing your APIs** — a language-agnostic, typically YAML or JSON-based format for describing a REST API's endpoints, request/response schemas, authentication requirements, and more, in a machine-readable way.

**Why this standardization matters:** because an OpenAPI document precisely and formally describes an API, tooling can be built *around* that specification to automate work that would otherwise be manual — **Swagger UI** generates interactive, browsable API documentation directly from an OpenAPI spec; **Swagger Codegen** can generate client SDKs (in many languages) or server stub code directly from the same spec; validation tools can check that an API's actual behavior matches its documented spec.

```yaml
# A tiny excerpt of what an OpenAPI spec looks like
openapi: 3.0.0
info:
  title: Books API
  version: 1.0.0
paths:
  /books:
    get:
      summary: List all books
      responses:
        '200':
          description: A list of books
```

### Interview Perspective
**Q: What's the relationship between Swagger and the OpenAPI specification?**
> They're closely related but not identical — OpenAPI is the actual formal specification format for describing an API (endpoints, schemas, auth, etc.), while "Swagger" today refers to the ecosystem of tools built around that specification (like Swagger UI for interactive documentation, and Swagger Codegen for generating client/server code). Historically "Swagger" referred to both, before the specification itself was renamed to OpenAPI.

**Q: Why is having a formal, machine-readable API specification (like OpenAPI) valuable, beyond just human-readable documentation?**
> Because tooling can be built directly on top of a formal spec to automate otherwise manual work — generating interactive documentation automatically (Swagger UI), generating client SDKs in multiple languages without hand-writing them (Swagger Codegen), validating that an API's actual live behavior matches what's documented, and even generating server boilerplate/stub code from the spec. A purely human-readable doc (like a wiki page) can't support any of this automation.

⭐ **Frequently asked** — be ready to clearly distinguish Swagger (tooling) from OpenAPI (the specification itself); this naming history is a common point of confusion interviewers like to probe.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| REST | An architectural style (not a protocol) for uniform, flexible API communication |
| REST + HTTP methods | GET=Read, POST=Create, PUT=Update, DELETE=Delete |
| Statelessness | No server-side client session — every request is self-contained |
| Statelessness → Scalability | Any server can handle any request — trivial horizontal scaling, no sticky sessions |
| API Gateway | Unified entry point to backend services — routing, auth, rate limiting, aggregation |
| API Gateway benefit | Backend services can scale/change freely without affecting clients |
| REST vs. GraphQL | Fixed, multi-endpoint responses vs. single endpoint, client-specified query shape |
| GraphQL solves | Over-fetching and under-fetching |
| REST caching advantage | Naturally cacheable via HTTP (GET + URL as cache key); GraphQL is not, by default |
| Flask for APIs | Minimal microframework — routing/JSON without unneeded overhead |
| cURL | Command-line HTTP client — quick testing, scripting |
| Postman | GUI tool — collections, environments, automated tests, team collaboration |
| Swagger vs. OpenAPI | Swagger = tooling ecosystem; OpenAPI = the actual specification format |
| Why OpenAPI matters | Enables auto-generated docs, client SDKs, and server stubs from one spec |