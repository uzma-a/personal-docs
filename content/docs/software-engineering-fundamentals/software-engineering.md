# Software Engineering Fundamentals

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Introduction to Software Engineering

### Learning Perspective
Software engineering is the application of **scientific and engineering principles** to the design, development, testing, and maintenance of software. It's distinct from "just coding" because it treats software creation as a disciplined, repeatable process rather than an ad-hoc craft.

Software engineers are responsible for:
- Designing software systems (deciding structure, components, and how they interact)
- Building software systems (writing, integrating, and assembling code)
- Maintaining software systems (fixing bugs, adding features, managing technical debt over the system's lifetime)

The "maintaining" part is often underestimated by beginners — most of a system's total cost and effort happens *after* the first release, not during initial development.

### Interview Perspective
**Q: What is software engineering, and how is it different from programming?**
> Software engineering applies systematic, disciplined, and measurable approaches to software development — it's the full lifecycle (design, build, test, maintain), not just writing code. Programming is one activity within software engineering.

**Key phrase to remember:** "Software engineering = engineering principles + software development lifecycle discipline."

---

## 2. The Software Development Life Cycle (SDLC)

### Learning Perspective
The SDLC is a structured framework that outlines the phases of building software — from idea to retirement. It exists because uncoordinated development leads to wasted effort, miscommunication, and risk.

**Why SDLC matters — it improves efficiency and reduces risk by:**
- Clarifying **who** should work on **what**, and **when** — reduces duplicated or missed work
- Improving communication between customers, stakeholders, and the development team — everyone shares a common process vocabulary
- Helping stakeholders understand **where they fit** in the process — reduces confusion about ownership
- Supporting clean **handoffs** so cross-domain teams (e.g., design → dev → QA → ops) can move work into the next phase without losing context

### Interview Perspective
**Q: Why do we use the SDLC instead of just building software freestyle?**
> It reduces risk and improves efficiency by giving every phase clear ownership, improving stakeholder communication, and enabling clean handoffs between teams (e.g., requirements → design → dev → test → release).

**One-liner for a rapid-fire round:** "SDLC = structure + accountability + smoother handoffs."

---

## 3. Common Software Engineering Processes

### Learning Perspective
Most SDLC models — regardless of methodology — revolve around the same core set of processes:

1. **Requirements gathering** — understand what needs to be built and why
2. **Design** — decide the architecture and how components will interact
3. **Coding** — implement the design
4. **Testing** — verify the implementation meets requirements and is defect-free
5. **Releasing** — deploy the software to users
6. **Documenting** — record decisions, usage instructions, and technical details throughout

These aren't always strictly sequential — in Agile, they loop repeatedly in short cycles; in Waterfall, they happen once, in order.

### Interview Perspective
**Q: Walk me through the typical software engineering process.**
> Requirements gathering → Design → Coding → Testing → Releasing → Documenting. The exact ordering and repetition depends on the methodology (Waterfall does this once; Agile repeats it every sprint).

**Memory aid:** **R-D-C-T-R-D** ("Really Dumb Cats Take Really Deep-naps" — or make your own mnemonic).

---

## 4. Requirements Gathering & Key Documents

### Learning Perspective
Requirements gathering is arguably the highest-leverage phase — mistakes here are the most expensive to fix later. It includes:

- **Identifying stakeholders** — who has a say in what the software should do
- **Establishing goals and objectives** — what business/user problem is being solved
- **Eliciting requirements** — interviews, surveys, workshops, observation
- **Documenting, analyzing, prioritizing, and confirming requirements** — turning raw input into structured, agreed-upon specs

**Key requirement documents:**

| Document | Purpose |
|---|---|
| **SRS** (Software Requirements Specification) | Captures system functionalities and benchmarks/service levels for performance. The master reference for *what* the system must do. |
| **URS** (User Requirements Specification) | A **subset of the SRS** focused specifically on user-facing specification requirements — what the user needs/expects. |
| **SysRS** (System Requirements Specification) | Contains everything an SRS does, **plus** capabilities, interfaces, user characteristics, policy/regulatory/personnel requirements, performance and security requirements, and acceptance criteria. Broader and more technical/system-level than an SRS. |

**Relationship to remember:** URS ⊂ SRS ⊂ SysRS (each one is progressively broader in scope).

### Interview Perspective
**Q: What's the difference between an SRS, URS, and SysRS?**
> URS is the user-facing subset — what users need. SRS is the full functional + performance spec. SysRS is the most comprehensive — it includes everything in an SRS plus interfaces, regulatory/security requirements, and acceptance criteria.

**Common follow-up:** "Why does requirements gathering matter so much?" → Because errors caught here are cheap to fix; errors caught in production are the most expensive (classic "cost of change" curve in SDLC).

---

## 5. SDLC Methodologies

### Learning Perspective
Waterfall, V-Shape, and Agile are different **approaches to implementing** the same underlying SDLC phases — they differ in ordering, iteration, and flexibility.

- **Waterfall** — linear, sequential; each phase completes fully before the next begins. Predictable but inflexible to change.
- **V-Shape (V-Model)** — an extension of Waterfall where each development phase has a *corresponding testing phase*, forming a "V" shape (e.g., requirements ↔ acceptance testing, design ↔ system testing). Emphasizes verification and validation at every stage.
- **Agile** — iterative and incremental; work happens in small cycles (sprints), with continuous feedback and re-prioritization. Embraces changing requirements even late in development.

### Interview Perspective
**Q: Compare Waterfall, V-Model, and Agile.**
> Waterfall is linear and sequential — good for stable, well-understood requirements. V-Model pairs each dev phase with a testing phase for stronger verification. Agile is iterative, with short cycles and continuous feedback — good for evolving requirements.

**Rule of thumb interviewers like:** "Waterfall = plan everything upfront. Agile = plan a little, build, learn, repeat."

---

## 6. Testing Overview

### Learning Perspective
Testing isn't one thing — different testing types answer different questions:

- **Functional testing** — verifies inputs produce the expected outputs (does the feature *work* as specified?)
- **Non-functional testing** — verifies system *qualities*: performance, security, scalability, availability (does the system work *well* under real conditions?)
- **Regression testing** — confirms that changes (like bug fixes or new features) **don't break existing functionality** — critical in any codebase that changes over time

### Interview Perspective
**Q: What's the difference between functional and non-functional testing?**
> Functional testing checks *what* the system does (correct outputs for given inputs). Non-functional testing checks *how well* it does it (performance, security, scalability, availability).

**Q: Why is regression testing important?**
> Because fixing one bug or adding one feature can silently break something else — regression testing protects existing functionality as the codebase evolves. This is why automated test suites and CI pipelines matter.

⭐ **Frequently asked** — be ready to give a concrete example, e.g., "Regression testing caught that a new caching layer broke the checkout page's total calculation."

---

## 7. Documentation Types

### Learning Perspective
Documentation spans the entire SDLC, not just the end. The main categories:

- **Requirements documentation** — SRS/URS/SysRS and related artifacts
- **Design documentation** — architecture diagrams, UML, data models
- **Technical documentation** — API references, code comments, system internals
- **Quality assurance documentation** — test plans, test cases, defect logs
- **User documentation** — manuals, help guides, onboarding materials

### Interview Perspective
**Q: What kinds of documentation exist in a software project, and who are they for?**
> Requirements docs (for stakeholders/analysts), design docs (for architects/engineers), technical docs (for developers), QA docs (for testers), and user docs (for end users). Each serves a different audience and purpose.

---

## 8. Software Architecture & UML Diagrams

### Learning Perspective
**Software architecture** functions as a **blueprint** for the system — it defines the high-level structure, major components, and how they interact. Good architecture matters because it determines how easily a system can scale, be maintained, and evolve.

Two complementary ways to think about design:
- **Structured design** — breaks a software problem down into well-organized, smaller solution elements (decomposition-focused; *how* the system is built).
- **Behavioral models** — describe *what* the system does (its behavior) **without** explaining *how* it implements that behavior internally.

**UML (Unified Modeling Language) diagrams** are a standardized way to visualize architecture and design. They save time and money by:
- Helping developers **quickly get up to speed** on a project
- Letting teams **plan features in advance** of coding
- Making it easier to **navigate source code**

**Common UML diagram types:**
- **State transition diagrams** — model how an object/system moves between states
- **Interaction diagrams** — model how objects communicate (e.g., sequence diagrams)
- **Class diagrams** — model the static structure: classes, attributes, methods, and relationships

### Interview Perspective
**Q: Why use UML diagrams instead of just writing code directly?**
> They act as a shared visual language — they help onboard developers faster, allow planning before implementation, and make navigating and understanding a codebase easier, especially for complex systems.

**Q: What's the difference between structured design and behavioral modeling?**
> Structured design focuses on decomposing the problem into components (the "how"). Behavioral models describe what the system does, without detailing internal implementation (the "what").

⭐ **System design relevance** — this topic often comes up when interviewers ask "how would you document/communicate your design to the team?"

---

## 9. Objects and Classes (OOP Basics)

### Learning Perspective
- **Objects** contain **data** (state) and also have **behaviors** — actions the object can perform (methods).
- **Classes** are **blueprints** for objects — they define what data and behaviors any object created from them will have.

Think of a class as the *template*, and an object as a specific *instance* built from that template.

### Interview Perspective
**Q: What's the difference between a class and an object?**
> A class is a blueprint — it defines structure and behavior. An object is a specific instance created from that blueprint, holding actual data and able to perform the defined behaviors.

**Classic follow-up:** "Give me a real-world analogy." → "A class is like a cookie cutter; objects are the individual cookies made from it — same shape/behavior, different specific data (flavor, size, etc.)."

---

## 10. Service-Oriented Architecture (SOA) & Distributed Systems

### Learning Perspective
- **SOA (Service-Oriented Architecture)** consists of **loosely coupled services** that interface with each other via a **communication protocol over a network**. Loose coupling means services can be developed, deployed, and scaled independently.
- **Distributed systems** run on **multiple machines/services**, but appear to the end user as a **single coherent system**. The complexity of coordination is hidden from the user.

### Interview Perspective
**Q: What is SOA, and why is loose coupling important?**
> SOA is an architecture of independent, loosely coupled services communicating over a network. Loose coupling means you can change, scale, or replace one service without breaking others — a major advantage for maintainability and scalability.

**Q: What's a distributed system, in simple terms?**
> Multiple machines working together but presented to the user as one unified system — e.g., a cloud application backed by many servers, but the user just sees "the app."

---

## 11. Architectural Patterns

### Learning Perspective
An **architectural pattern** is a **repeatable, proven solution** to a recurring architectural problem — similar to a design pattern, but at a system-wide scale.

**Common types:**
- **2-tier** — client directly communicates with a server/database (simple, limited scalability)
- **3-tier** — presentation, application logic, and data layers are separated (more common in enterprise apps)
- **Event-driven** — components communicate via events/messages rather than direct calls (good for decoupling and scalability)
- **Peer-to-peer** — nodes act as both clients and servers, no central authority
- **Microservices** — application is broken into small, independently deployable services, each owning its own data and logic

**Important nuance:** Two or more patterns can be **combined** in a single system (e.g., microservices + event-driven is a very common pairing). However, **some patterns are mutually exclusive** — you generally wouldn't combine a strict 2-tier pattern with a microservices approach, since they represent fundamentally different structural philosophies.

### Interview Perspective
**Q: Name some architectural patterns and when you'd use them.**
> 2-tier for simple client-server apps; 3-tier for enterprise apps needing separation of concerns; event-driven for decoupled, asynchronous systems; peer-to-peer for decentralized systems; microservices for independently scalable, independently deployable services.

**Q: Can architectural patterns be combined?**
> Yes — e.g., microservices are frequently combined with event-driven architecture. But some patterns are mutually exclusive because they reflect incompatible structural assumptions (e.g., a tightly-coupled 2-tier model doesn't mix well with microservices).

⭐ **This is a common "tell me about the team structure" / system design interview topic** — be ready to justify a pattern choice with trade-offs (coupling, scalability, deployment complexity, team ownership boundaries).

---

## 12. Application Environments & Deployment

### Learning Perspective
Software typically moves through several environments before reaching real users:

1. **Development** — where engineers write and test code locally/individually
2. **Testing / QA** — dedicated environment for structured testing (functional, regression, etc.)
3. **Staging** — a near-identical replica of production, used for final validation before release
4. **Production** — the live environment real users interact with

**Production environments tend to be more complex than pre-production environments** because they must account for **non-functional requirements** like:
- **Load** (handling real traffic volumes)
- **Security** (protecting real user data)
- **Reliability** (uptime guarantees)
- **Scalability** (growing with demand)

**Deployment models:**
- **On-premises** — deployed on traditional, organization-owned hardware
- **Cloud** — deployed on **public**, **private**, or **hybrid** cloud platforms

### Interview Perspective
**Q: What are the typical application environments, and why does production need extra care?**
> Development → Testing/QA → Staging → Production. Production is the most complex because it must handle real-world load, security threats, reliability expectations, and scale — concerns that are minimal or absent in earlier environments.

**Q: On-prem vs. cloud — what's the difference?**
> On-prem uses organization-owned physical hardware; cloud deployment (public, private, or hybrid) uses infrastructure provided by a cloud vendor, offering more flexibility and elasticity.

---

## 13. Components of a Production Environment

### Learning Perspective
A typical production environment needs several coordinated components:

- **Firewall** — filters and controls incoming/outgoing network traffic for security
- **Load balancer** — distributes incoming traffic across multiple servers to prevent overload and improve availability
- **Web servers** — serve static content and handle HTTP requests
- **Application servers** — run the business logic of the application
- **Proxy servers** — act as intermediaries for requests (can provide caching, security, or anonymity)
- **Database servers** — store and manage persistent application data

### Interview Perspective
**Q: What components make up a typical production environment, and what does each do?**
> Firewall (security/traffic filtering), load balancer (distributes traffic across servers), web servers (serve requests/static content), application servers (run business logic), proxy servers (intermediary/caching layer), and database servers (persistent data storage).

**Good follow-up to prepare for:** "Why do we need a load balancer if we already have multiple servers?" → Without it, traffic could overwhelm one server while others sit idle — the load balancer ensures even distribution and helps with failover if a server goes down.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Software engineering | Disciplined, scientific approach to designing, building, and maintaining software |
| SDLC | Structured phases that reduce risk and improve team coordination |
| Core SE processes | Requirements → Design → Code → Test → Release → Document |
| SRS / URS / SysRS | URS ⊂ SRS ⊂ SysRS — increasing scope and technical depth |
| Waterfall / V-Model / Agile | Linear / linear-with-paired-testing / iterative-and-flexible |
| Functional vs non-functional testing | *What* it does vs. *how well* it does it |
| Regression testing | Protects existing functionality when the code changes |
| UML diagrams | Shared visual language for faster onboarding, planning, and navigation |
| Class vs Object | Blueprint vs. instance |
| SOA | Loosely coupled services communicating over a network |
| Distributed system | Many machines, one apparent system |
| Architectural patterns | 2-tier, 3-tier, event-driven, peer-to-peer, microservices — combinable but not always compatible |
| App environments | Dev → QA → Staging → Production (production = highest complexity) |
| Production components | Firewall, load balancer, web/app servers, proxy servers, database servers |

---