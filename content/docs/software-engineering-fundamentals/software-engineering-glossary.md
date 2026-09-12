# Software Engineering — Revision & Interview Notes

Organized by topic (not strict A–Z) so related concepts sit together. ⭐ = frequently asked in interviews.

---

## 1. SDLC & Development Methodologies

| Term | Definition |
|---|---|
| **SDLC** ⭐ | Systematic process to build high-quality software in a predictable time/budget; goal is to meet the client's business requirements. |
| **Waterfall** | Sequential method — output of one phase becomes the input of the next. |
| **V-Shape Model** | Like Waterfall, but each *verification* phase has a matching *validation* phase. |
| **Agile** ⭐ | Iterative method; teams work in sprints, unit testing happens every sprint, and stakeholders review working code at the end of each sprint. |
| **Prototype** | A small-scale replica of the end product, used to test design ideas and gather stakeholder feedback. |
| **MVP (Minimal Viable Product)** ⭐ | Basic feature-set release used to validate assumptions and gather feedback. |
| **Alpha release** | First functioning version, given to a select group of stakeholders. |
| **Beta release** | Limited release given to stakeholders *outside* the developing organization. |
| **General availability** | Stable version released to all users. |

**Requirements documents:**
| Term | Definition |
|---|---|
| **SRS** (Software Requirement Specification) | Combines stakeholders' requirements for the application. |
| **SysRS** (System Requirement Specification) | SRS + system capabilities, interfaces, user characteristics, policy/regulation/performance/security requirements. |
| **URS** (User Requirement Specification) | Describes business needs/expectations of end-users. |
| **User story** | Requirement written from the end-user's perspective, framed around their *goal*. |
| **Use case** | More granular than a user story; describes *how the system behaves*, not just the user's goal. |
| **SOP** (Standard Operating Procedure) | Step-by-step doc for an org-specific complex task. |
| **SDD** (Software Design Document) | Technical specs for how the design will be implemented (assumptions, constraints, dependencies, etc.). |

---

## 2. Testing ⭐ (common interview topic)

| Term | Definition |
|---|---|
| **SUT** (System Under Test) | The application while it's being tested. |
| **Unit testing** | Tests the smallest isolated component; usually done by the developer. |
| **Integration testing** | Runs after unit testing, once components are combined into a larger product. |
| **System testing** | Runs once the whole application is considered complete. |
| **Regression testing** (aka maintenance testing) | Confirms a recent change (e.g., bug fix) hasn't broken existing functionality. |
| **UAT** (User Acceptance Testing) | Testing performed by the intended end-user. |
| **Black-box testing** | Tester has no visibility into source code/internal structure. |
| **Functional testing** | A type of black-box testing focused on inputs vs. outputs. |
| **Non-functional testing** | Tests performance, security, scalability, availability. |
| **Test case** | Steps + inputs + expected output, written to verify a requirement is met. |

---

## 3. Programming Concepts

| Term | Definition |
|---|---|
| **Variable** | Holds a value that can change during execution. |
| **Constant** | Holds a value that does *not* change. |
| **Array** | Fixed number of same-type elements, stored sequentially from index 0. |
| **Vector** | Like an array, but dynamically resizes as elements are added/removed. |
| **Function / Method / Procedure** | *(same concept, three names)* — reusable block of code that takes input, processes it, returns output. |
| **Parameter** | Data passed into a function. |
| **Boolean expression** | Statement evaluating to only `true` or `false`. |
| **Conditional statement** | "If-then" logic enabling branching. |
| **Branching** | Program follows different instruction paths based on conditions. |
| **Loop** | Repeats a sequence of instructions until a condition is met. |
| **Pseudocode** | Plain-language bridge between logic and actual code. |

**Language types:**
| Term | Definition |
|---|---|
| **Compiled language** | Compiler converts source code → machine code → single executable file, ahead of run time. |
| **Interpreted language** (aka scripting language) | Interpreter translates human-readable code to machine code at run time (e.g., Python, JS). |
| **Assembly language** | Low-level language using symbols to represent machine code. |

**OOP — very common interview area ⭐:**
| Term | Definition |
|---|---|
| **OOP** (Object-Oriented Programming) | Focused on objects (data + methods bundled together) rather than separate functions/data as in procedural programming. |
| **Class** | Generic blueprint/template defining an object's attributes and methods. |
| **Attributes** | An object's properties/data. |
| **Inheritance** | A subclass inherits its parent class's properties/methods and can add its own. |
| **Encapsulation** | Bundling data + methods together, hiding internal implementation. |
| **OOAD** (Object-Oriented Analysis & Design) | Approach for analyzing/designing a system that will be built using OOP. |
| **Class diagram** | UML diagram showing how classes relate to each other. |
| **UML diagrams** | Language-agnostic diagrams for communicating structure & behavior. |
| **Behavioral models** | Show *what* a system does, not *how*. |
| **Structured design** | Breaks a problem into modules/sub-modules for organization. |

**Data & queries:**
| Term | Definition |
|---|---|
| **CRUD** | Create, Read, Update, Delete — the four core query types. |
| **Query** | Predefined instruction requesting data from a database. |
| **SQL** | Most popular database query language. |
| **DBMS** | Connects a database to users/programs and controls access. |
| **ORM** (Object-Relational Mapping) | Tools connecting an app to a database and retrieving the correct data. |

---

## 4. Frontend & Backend Development

| Term | Definition |
|---|---|
| **Frontend developer** | Builds everything the user sees/interacts with (client side). |
| **Backend developer** | Handles everything on the server before code/data reaches the client. |
| **Fullstack developer** | Skilled in both frontend and backend. |
| **HTML** | Structures a webpage's content (text, links, images, buttons). |
| **CSS** | Styles a website (colors, fonts, layout) consistently. |
| **SASS / LESS** | CSS preprocessors — add variables, nesting, functions to speed up styling. |
| **JavaScript** | Adds interactivity to a site, used alongside HTML/CSS. |
| **Responsive design** | Site automatically resizes/adapts to the device. |
| **API** ⭐ | Code enabling two programs to communicate. |
| **API Gateway** | Routes API calls from client to the correct service. |
| **Static content** | Pre-stored content served as-is. |
| **Dynamic content** | Generated fresh on each request. |

---

## 5. Software Architecture ⭐ (system design interview relevance)

| Term | Definition |
|---|---|
| **Software architecture** | The blueprint defining a system's structure, component interaction, and design principles. |
| **Software stack** | The layered combination of frontend + backend technologies that run an application. |
| **Component** | A self-contained unit of functionality within an application. |
| **Component-based architecture** | Designs loosely-coupled, independent components that combine into an application. |
| **Service** | Like a component, but deployable independently and reusable across systems. |
| **SOA** (Service-Oriented Architecture) | Loosely-coupled services communicating over a network protocol. |
| **Microservices** ⭐ | Breaks an application's functionality into independent, modular services. |
| **Distributed system** | Multiple services on different machines coordinating via a protocol (e.g., HTTP). |
| **Node** | Any network device that can process/transmit data. |
| **Peer-to-peer (P2P)** | Decentralized network where nodes act as both client and server. |
| **2-tier / Client-Server** | Server handles most resources/services delivered to the client. |
| **3-tier** | Presentation tier (UI) + application/business logic tier + data tier. |
| **Event-driven architecture** | Producers emit events → router → consumers process them. |
| **Extensibility** | Ability to add new behavior without modifying existing components. |

---

## 6. Deployment & Infrastructure

| Term | Definition |
|---|---|
| **Application deployment environment** | Combination of hardware/software resources needed to run an app. |
| **On-premises deployment** | Organization owns/manages the hardware and infrastructure itself. |
| **Public cloud** | Infrastructure over the open internet, owned by the cloud provider. |
| **Private cloud** | Exclusive-use infrastructure (on-prem or provider-managed) for one org. |
| **Hybrid cloud** | Combination of public + private cloud working together. |
| **Staging environment** | Mirrors production closely but isn't for general users. |
| **Production environment** ⭐ | Live infrastructure (servers, load balancers, DBs) that delivers the app to end users. |
| **Load** | Number of concurrent users/transactions/data volume the system handles. |
| **Load balancer** ⭐ | Distributes network traffic across multiple servers to maximize availability/responsiveness. |
| **Scalability** ⭐ | Ability to handle growing/shrinking load without hurting performance. |
| **Firewall** | Blocks unauthorized access to/from a private network. |
| **Proxy server** | Sits between two tiers; handles load balancing, caching, encryption, obscuring request source, etc. |
| **Business logic** | Determines transaction outcomes and what data is read/written. |

---

## 7. Tools & DevOps

| Term | Definition |
|---|---|
| **IDE** | Environment for writing/managing code; integrates with Git, GitHub, extensions, etc. |
| **Git** | Version-control system for tracking changes, branching, and merging code. |
| **Framework** | A reusable "skeleton" you extend with your own code. |
| **Library** | Reusable collection of pre-written code/subroutines. |
| **Package** | Archive of app files + install instructions + metadata (version, dependencies). |
| **Package manager** | Finds/installs/maintains/uninstalls packages. |
| **Build automation utility** | Compiles/links source code into build artifacts (executables). |
| **Build automation server** | Runs build utilities on a schedule or trigger. |
| **CI/CD** ⭐ | Continuous Integration (auto build & test code) + Continuous Delivery/Deployment (auto-deploy to staging/production). |

**Pair programming styles:**
| Term | Definition |
|---|---|
| **Driver/Navigator** | Driver types the code; navigator reviews and directs. |
| **Ping-pong** | One dev writes a failing test, the other writes code to pass it; they refactor together after. |
| **Strong style** | Junior dev drives while the more experienced dev navigates, so the junior learns by doing. |

---

## 8. Roles in Software Engineering ⭐ (great for "tell me about the team structure" interview questions)

| Role | Responsibility |
|---|---|
| **Project manager** | Owns scheduling, budgeting, resourcing, and communication for the project. |
| **Product manager / Product owner** | Owns the product vision, translates client/end-user needs into requirements ("product manager" is the Waterfall-style term). |
| **Scrum master** | Focused on team and individual success (Agile facilitator). |
| **System architect** | Designs the system's architecture and communicates it to the team. |
| **Principal Engineer** (aka Technical Architect) | Owns architecture, design, and implementation; sets team processes and technical direction. |
| **Technical lead** | Manages the dev team through the full development lifecycle; reports to stakeholders. |
| **CTO** | Oversees company-wide R&D, systems, and infrastructure. |
| **QA engineer** | Writes/runs test cases to catch bugs and reports back to developers. |
| **Site Reliability Engineer** (aka SRE / Ops engineer) | Bridges dev and ops; automates systems, troubleshoots, ensures reliability. |
| **UX designer** | Ensures software is intuitive and meets requirements from the user's perspective. |
| **Technical writer** (aka Information developer) | Writes end-user documentation. |
| **Stakeholder** | Defines requirements and gives feedback/clarification. |
| **Squad** | Small team (≤10) — a squad leader + engineers + sometimes UX designers. |

---

## Quick Interview-Prep Cheat Sheet

- **Explain CI/CD in one line:** CI auto-builds/tests every code change; CD auto-deploys those changes to staging/production.
- **Monolith vs. Microservices:** be ready to contrast — microservices break the app into independently deployable services (vs. one large component-based codebase).
- **2-tier vs 3-tier:** 2-tier = client + server; 3-tier = presentation + business logic + data, split into separate layers.
- **Black-box vs White-box style questions:** know black-box (no code visibility) vs. the general testing pyramid (unit → integration → system → UAT).
- **OOP pillars:** Encapsulation and Inheritance are defined here — also be ready to discuss Abstraction and Polymorphism, which aren't in this glossary but are commonly paired with these two in interviews.
- **Scalability vs. Load balancing:** scalability is the *capability*, load balancing is one *mechanism* used to achieve it.

---
