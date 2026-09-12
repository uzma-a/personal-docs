# APIs & Authentication

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general industry knowledge, matching Module 6 of your NAV (APIs, Authentication). No source content was pasted for this one, so worth cross-checking against your actual course material. Some ground (REST, JWTs, statelessness) was already covered in more depth in `express-framework.md` — this file keeps that context brief and focuses on the broader API landscape and authentication methods not yet covered.

---

## 1. What Is an API?

### Learning Perspective
An **API (Application Programming Interface)** is a defined set of rules and protocols that lets one piece of software **communicate with another** — without either side needing to know the internal implementation details of the other. An API exposes a specific, intentional **contract**: here's what you can ask for, here's what you'll get back, and here's how to ask.

**Why APIs matter:**
- **Abstraction** — consumers of an API don't need to know how the underlying system works, just how to interact with its interface
- **Reusability** — the same API can serve many different clients (a web app, a mobile app, another backend service) without duplicating logic
- **Decoupling** — the API provider can change their internal implementation freely, as long as the API contract stays stable — clients aren't affected

### Interview Perspective
**Q: What is an API, in plain terms?**
> A defined contract that lets one piece of software talk to another — specifying what requests are allowed, what data is exchanged, and how, without either side needing to know the other's internal implementation. It's the interface, not the implementation.

**Q: Why is the "contract" nature of an API important?**
> Because it lets the provider and consumer evolve independently — as long as the API's contract (its inputs/outputs/behavior) stays stable, the provider can completely rewrite their internal implementation without breaking any client relying on the API.

---

## 2. API Architectural Styles: REST, GraphQL, SOAP, RPC

### Learning Perspective
Not all APIs are built the same way — several architectural styles have emerged, each with different trade-offs:

- **REST (Representational State Transfer)** — the most common modern web API style. Resources are identified by URLs, operated on via standard HTTP methods (GET/POST/PUT/DELETE), and interactions are stateless (covered in depth in `express-framework.md`). Simple, widely understood, cacheable by default.

- **GraphQL** — a query language for APIs (created by Facebook/Meta) where the **client specifies exactly what data it needs** in a single request, rather than the server dictating a fixed response shape per endpoint. Solves two common REST pain points:
  - **Over-fetching** — REST endpoints often return more data than a client actually needs
  - **Under-fetching** — a client may need to make multiple REST requests to different endpoints to assemble the data it needs
  
  GraphQL typically exposes a **single endpoint**, with the specific query determining what's returned.

- **SOAP (Simple Object Access Protocol)** — an older, more rigid, XML-based protocol, often used in enterprise/legacy systems (banking, healthcare, government). Comes with built-in standards for security (WS-Security) and formal contracts (WSDL), but is more verbose and heavyweight than REST or GraphQL.

- **RPC (Remote Procedure Call) — including gRPC** — models an API as calling a **function/procedure** on a remote server, as if it were local. **gRPC** (built by Google) is a modern, high-performance RPC framework using Protocol Buffers for efficient binary serialization — common in microservices architectures needing fast, low-overhead internal service-to-service communication.

### Interview Perspective
**Q: What's the core difference between REST and GraphQL?**
> REST exposes multiple endpoints, each returning a fixed data shape, which can lead to over-fetching or under-fetching. GraphQL exposes a single endpoint where the client specifies exactly the data it needs in its query, getting back precisely that — reducing wasted data transfer and unnecessary round-trips, at the cost of added complexity on the server (query resolution, potential performance/security considerations like overly expensive queries).

**Q: When might you choose gRPC over REST?**
> For internal service-to-service communication in a microservices architecture where performance matters — gRPC's binary serialization (via Protocol Buffers) and use of HTTP/2 make it significantly faster and more efficient than JSON-over-REST, though it's less human-readable and less ideal for public-facing APIs consumed by browsers or varied third-party clients, where REST's simplicity and universal tooling support wins out.

**Q: Why might a legacy enterprise system still use SOAP instead of REST?**
> SOAP has built-in, formalized standards for security, transactions, and contracts (WSDL) that some regulated industries (banking, healthcare, government) have relied on for years — switching to REST would mean rebuilding that formalized contract and security tooling, so many long-established systems simply haven't migrated, even though REST is the modern default for new development.

⭐ **Frequently asked** — be ready to compare REST and GraphQL specifically; it's the most common API architecture comparison question in interviews today.

---

## 3. API Design Fundamentals

### Learning Perspective
A few core practices distinguish a well-designed API from a poorly designed one:

- **Resource naming** — REST APIs should use clear, consistent, **noun-based** URL paths representing resources (`/books`, `/users/123/orders`), not verbs (`/getBooks` is a common anti-pattern) — the HTTP method itself expresses the verb
- **Versioning** — APIs change over time; versioning (e.g., `/v1/books`, or a version header) lets providers evolve their API without breaking existing clients still relying on an older version
- **Pagination** — for endpoints returning potentially large collections, returning results in **pages** (with parameters like `limit`/`offset` or cursor-based tokens) prevents overwhelming responses and improves performance
- **Rate limiting** — restricting how many requests a client can make in a given time window, protecting the API from abuse or accidental overload, and ensuring fair usage across clients
- **Consistent error responses** — a predictable error format (status code + structured error body) makes an API far easier for clients to handle failures gracefully
- **Idempotency** — an operation is idempotent if performing it multiple times produces the same result as performing it once (GET, PUT, DELETE are conventionally idempotent; POST typically is not) — an important property for clients safely retrying failed requests

### Interview Perspective
**Q: What are some key principles of good REST API design?**
> Clear, noun-based resource URLs (letting HTTP methods express the action), versioning to allow safe evolution, pagination for large collections, rate limiting to protect against abuse, consistent/structured error responses, and awareness of idempotency — especially for designing safe retry behavior on the client side.

**Q: What does "idempotent" mean, and why does it matter for API design?**
> An idempotent operation produces the same result no matter how many times it's performed — e.g., `DELETE /users/5` deletes user 5 whether called once or five times; the end state is the same. It matters because clients (and network layers) need to safely retry failed requests without unintended side effects — retrying a non-idempotent operation like a poorly designed POST could accidentally create duplicate resources.

---

## 4. API Authentication Methods

### Learning Perspective
Beyond the JWT/token-based and session-based authentication covered in `express-framework.md`, a few additional authentication mechanisms are common specifically in **API** contexts:

- **API Keys** — a simple, static string a client includes with each request (often as a header, e.g., `X-API-Key`), identifying which application/account is making the call. Simple to implement, but weaker than token-based auth — API keys typically don't expire on their own, don't carry granular permission claims, and if leaked, must be manually revoked/rotated.

- **Basic Authentication** — credentials (username/password) sent directly in the request's `Authorization` header, Base64-encoded (**not encrypted** — Base64 is trivially reversible, so Basic Auth is only safe over HTTPS). Simple but limited; rarely used for modern production APIs beyond internal/quick-and-dirty use cases.

- **OAuth 2.0** — an **authorization** framework (not authentication itself) that lets a **third-party application** get **limited access** to a user's resources on another service, **without ever seeing that user's actual credentials**. The classic example: "Sign in with Google" letting an app access your Google Calendar without ever knowing your Google password. Involves an **authorization server** issuing **access tokens** (often short-lived) and, optionally, **refresh tokens** (used to obtain new access tokens without requiring the user to log in again).

- **OpenID Connect (OIDC)** — builds an **authentication/identity layer on top of OAuth 2.0** (also covered briefly in the cloud security notes) — while OAuth answers "what can this app do on my behalf," OIDC answers "who is this user."

### Interview Perspective
**Q: What's the difference between an API key and a token-based (e.g., JWT) authentication scheme?**
> An API key is a simple, typically long-lived static identifier tied to an application/account — easy to implement, but coarse-grained (no built-in expiration or embedded claims) and hard to revoke individually if compromised. A JWT-based scheme is more sophisticated — tokens are typically short-lived, carry structured claims (permissions, expiration), and their signature can be verified without a database lookup, making the whole scheme more secure and scalable.

**Q: Explain OAuth 2.0 at a high level, and why it doesn't require sharing a password with a third-party app.**
> OAuth 2.0 lets a third-party app request limited, scoped access to a user's resources on another service, by redirecting the user to authenticate directly with that service's own authorization server — the third-party app never sees the user's actual credentials. Instead, it receives a short-lived access token (and sometimes a refresh token) representing the specific, limited permissions the user granted, which it then uses to make authorized requests on the user's behalf.

**Q: Why is Basic Authentication considered insecure if used without HTTPS?**
> Because Base64 encoding is not encryption — it's trivially reversible by anyone who intercepts the request. Over plain HTTP, credentials sent via Basic Auth could be captured and decoded in plaintext by anyone on the network path; HTTPS's TLS encryption is what actually protects the credentials in transit, not the Base64 encoding itself.

---

## 5. Multi-Factor Authentication (MFA) & Modern Auth Patterns

### Learning Perspective
Beyond just *how* credentials are transmitted, modern authentication systems layer in additional protections:

- **Multi-Factor Authentication (MFA)** — requiring **two or more independent factors** to authenticate: something you **know** (password), something you **have** (a phone/authenticator app/hardware key), or something you **are** (biometrics). Dramatically reduces the risk of a compromised password alone leading to account takeover.
- **Single Sign-On (SSO)** — lets a user authenticate **once** with a central identity provider and gain access to **multiple connected applications**, without re-entering credentials for each one (commonly implemented via SAML or OpenID Connect, as covered in the cloud security notes).
- **Refresh token rotation** — a security practice where, each time a refresh token is used to get a new access token, the refresh token itself is also replaced — limiting how long a stolen refresh token remains useful if compromised.

### Interview Perspective
**Q: Why is MFA considered a much stronger control than just enforcing complex passwords?**
> Because passwords alone are frequently compromised — through phishing, credential reuse across sites, or data breaches. MFA requires an additional, independent factor (something the attacker likely doesn't have, like physical access to the user's phone), meaning a stolen password alone isn't enough to gain access — it dramatically raises the bar for a successful account takeover.

**Q: What problem does refresh token rotation solve?**
> If a refresh token is ever stolen (e.g., via a compromised device or intercepted request), rotating it on every use means the stolen token becomes invalid the moment the legitimate client uses it next — limiting the attacker's window of opportunity, compared to a static, long-lived refresh token that would remain valid indefinitely until manually revoked or expired.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| API | A defined contract letting software communicate without exposing internal implementation |
| REST vs. GraphQL | Multiple fixed-shape endpoints vs. single endpoint, client-specified query shape |
| SOAP | Older, rigid, XML-based protocol — still common in regulated/legacy enterprise systems |
| gRPC | High-performance, binary (Protocol Buffers) RPC framework — common for internal microservice communication |
| Good API design | Noun-based URLs, versioning, pagination, rate limiting, consistent errors, idempotency awareness |
| Idempotency | Same result no matter how many times the operation runs — critical for safe retries |
| API keys | Simple, static, long-lived identifiers — easy but coarse-grained and hard to revoke individually |
| Basic Auth | Base64-encoded credentials — not encrypted; only safe over HTTPS |
| OAuth 2.0 | Authorization framework — grants limited, scoped access without sharing credentials |
| OpenID Connect | Identity/authentication layer built on top of OAuth 2.0 |
| MFA | Requires 2+ independent factors — dramatically reduces password-compromise risk |
| SSO | Authenticate once, access many connected apps |
| Refresh token rotation | Replaces the refresh token on every use, limiting a stolen token's useful window |