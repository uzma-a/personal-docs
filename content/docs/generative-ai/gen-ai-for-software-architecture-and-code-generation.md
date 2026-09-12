# Gen AI for Software Architecture & Code Generation

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Complements `gen-ai-basic-software-development.md` (broad SDLC coverage) and `intro-to-microservices.md` (architectural context) — this file goes deeper on two specific areas: established software architecture patterns, and the AI tools/techniques specifically used for generating and understanding code.

---

## Part A — Software Architecture Patterns

### 1. Architecture Patterns & Decision Records

#### Learning Perspective
- **Architecture pattern** — a **reusable solution framework** for **common software system structures** — a proven, named approach to structuring a system (or a part of it) to solve a recurring class of problem, so teams don't need to reinvent structural solutions from scratch for problems that have already been solved well many times before.

- **Architecture decision record (ADR)** — a **structured document** capturing **architectural decisions and their rationale** — a lightweight, persistent record of *why* a given architectural choice was made (not just *what* was decided), typically including the context/problem, the options considered, the decision made, and the consequences/trade-offs accepted.

**Why ADRs matter:** architectural decisions often look questionable or arbitrary in hindsight, months or years later, once the original context (constraints, alternatives considered, trade-offs weighed at the time) has been forgotten. An ADR preserves that reasoning, so future team members (including the original decision-makers) can understand *why* something was built a certain way, rather than only seeing the resulting structure without its justification.

#### Interview Perspective
**Q: What is an Architecture Decision Record, and why would a team maintain them?**
> An ADR is a structured document recording a specific architectural decision along with its rationale — the context/problem being solved, the options considered, the decision made, and its trade-offs/consequences. Teams maintain them because architectural context and reasoning are easily lost over time — an ADR preserves *why* a decision was made, not just what was ultimately built, which is essential for future maintainers evaluating whether that decision still makes sense as circumstances change, or understanding constraints that aren't obvious just from looking at the resulting code/structure.

**Q: What's the general value of "architecture patterns" as a concept, beyond any one specific pattern?**
> They capture proven, reusable solutions to recurring structural problems — letting teams draw on collective, battle-tested experience rather than solving well-understood problems from first principles every time. Naming and formalizing these patterns also gives teams a shared vocabulary for discussing design trade-offs efficiently (e.g., saying "let's use CQRS here" communicates a lot of structural intent quickly, versus describing the same idea from scratch).

---

### 2. Microservices & Modular Monolith

#### Learning Perspective
- **Microservices** — an **architectural style** where applications are built as **independently deployable services** — covered in full depth in `intro-to-microservices.md` and `modern-cloud-computing-technologies.md`.

- **Modular monolith** — a **single-application structure** with **well-organized internal modules** — a middle-ground architectural approach: the application is still deployed and run as one unit (like a traditional monolith), but internally structured into clearly-separated, well-bounded modules with defined interfaces between them, similar in spirit to how services would be separated in a microservices architecture — without actually taking on the operational complexity of independent deployment.

**Why a modular monolith matters as a distinct pattern:** it directly addresses the "premature adoption" anti-pattern covered in `intro-to-microservices.md` — a team can get much of microservices' *design* discipline (clear boundaries, well-defined interfaces between logical components) without paying the *operational* cost of running many independently deployed services, and a well-structured modular monolith is also often easier to later decompose into genuine microservices, if and when that operational complexity actually becomes justified.

#### Interview Perspective
**Q: What is a modular monolith, and why might a team choose it over jumping straight to microservices?**
> A modular monolith is deployed and run as a single application, but internally organized into clearly separated, well-bounded modules with defined interfaces — capturing much of the design discipline and clear separation of concerns that microservices offer, without the operational overhead of managing many independently deployed services. Teams often choose it when they want architectural clarity and future flexibility (an easier path to eventually splitting into real microservices, if warranted) without prematurely taking on the full complexity of a distributed system before it's actually needed — directly avoiding the "premature adoption" anti-pattern.

---

### 3. CQRS (Command Query Responsibility Segregation)

#### Learning Perspective
**Command Query Responsibility Segregation (CQRS)** — a **pattern separating read and write operations** for **scalability and clarity**. Rather than using the same model/pathway to both read data and write data (the traditional approach), CQRS splits these into two distinct paths:
- **Commands** — operations that **change state** (write operations)
- **Queries** — operations that **read state**, without modifying anything

**Why separate them:** read and write workloads often have very different requirements — reads are frequently much more numerous than writes, and can often tolerate slightly stale data or benefit from denormalized, read-optimized data shapes, while writes need strict consistency and validation. Separating the two paths lets each be independently optimized, scaled, and even modeled differently (e.g., the write side might use a fully normalized relational schema, while the read side serves from a denormalized, cache-friendly view built specifically for fast querying).

#### Interview Perspective
**Q: What problem does CQRS solve, and why not just use the same model for both reads and writes?**
> Reads and writes often have fundamentally different requirements — reads are typically far more frequent and benefit from denormalized, query-optimized data shapes and can sometimes tolerate slightly stale data, while writes need strict validation and consistency. Using one unified model for both forces compromises on both sides. CQRS separates commands (writes) from queries (reads) into distinct paths, letting each be independently modeled, optimized, and scaled according to its own actual requirements.

**Q: What's a potential downside or complexity introduced by CQRS?**
> Since the read and write models are separate, keeping them in sync introduces complexity — often requiring some form of asynchronous propagation from the write side to the read side, which can introduce eventual consistency (the read side may briefly lag behind the very latest writes) rather than the simpler, immediate consistency a single unified model naturally provides. CQRS is generally reserved for systems where the read/write scalability or complexity benefits genuinely outweigh this added synchronization complexity, not applied universally.

---

### 4. Event Sourcing

#### Learning Perspective
**Event sourcing** — a **design approach** where **state changes are stored as a sequence of events**, rather than simply overwriting a record's current state directly. Instead of a database row holding just the *current* value of something, event sourcing stores the complete **history of every change** that led to that current value — the current state is then derived by replaying all those events in order.

**Why this matters:** event sourcing gives you a complete, auditable history of exactly how a piece of data reached its current state (valuable for auditing, debugging, and understanding *why* something changed, not just *what* it currently is) — and it pairs particularly naturally with CQRS (Section 3), since the event stream can serve as the write-side source of truth, while one or more read-optimized projections/views are built by processing that event stream.

#### Interview Perspective
**Q: What is event sourcing, and how does it differ from traditional state storage?**
> Traditional storage typically overwrites a record with its current value — the history of *how* it got there is lost. Event sourcing instead stores every state-changing event as an immutable, ordered sequence — the current state is derived by replaying those events, rather than being stored directly as the "source of truth" itself. This preserves a complete history of every change, which is valuable for auditing, debugging, and reconstructing past states.

**Q: How does event sourcing commonly pair with CQRS?**
> The event stream naturally serves as the write-side (command) source of truth in a CQRS architecture — every command results in a new event being appended to the stream. One or more separate read-side projections/views can then be built by processing that event stream into whatever denormalized, query-optimized shape the read side actually needs, cleanly separating the write model (the event log) from however many different read models are useful for different query needs.

---

### 5. Resilience Patterns: Circuit Breaker & Saga

#### Learning Perspective
- **Circuit breaker** — a **fault-tolerance pattern** that **prevents cascading failures** — already covered in depth in `openshift.md`'s Istio section: when calls to a dependency start failing or timing out excessively, the circuit "trips," blocking further calls to that dependency for a period, preventing the failure from cascading to (and overwhelming) the calling service.

- **Saga pattern** — a **pattern for managing distributed transactions** using a **series of local compensating actions** — addressing a specific challenge in microservices/distributed systems: a traditional database transaction (all-or-nothing, as in ACID — covered in `sql-relational-db.md`) doesn't work cleanly across multiple independent services, each with its own separate database. A saga instead breaks a larger business transaction into a **sequence of local transactions**, each within a single service — and if any step fails partway through, the saga executes **compensating actions** (essentially, "undo" operations) for each already-completed step, rolling back the overall effect without relying on a true distributed transaction.

**Why the Saga pattern connects back to microservices' fault isolation coverage:** it's the concrete technique for handling multi-step business processes that span several independently-deployed services (each owning its own data, per the "shared database" anti-pattern warning in `intro-to-microservices.md`) — reconciling the need for transactional consistency across services with the reality that those services can't share a single database transaction.

#### Interview Perspective
**Q: Why can't you just use a normal ACID database transaction across multiple microservices?**
> Because each microservice typically owns its own independent database (per microservices' data-ownership principle), and a traditional ACID transaction can't span multiple, separate database systems cleanly — there's no single transactional boundary encompassing all of them. The Saga pattern addresses this by breaking the overall business operation into a series of local transactions, each scoped to a single service's own database, coordinated through the saga rather than through a true distributed transaction.

**Q: How does the Saga pattern handle a failure partway through a multi-step process?**
> It executes compensating actions — essentially, deliberately-designed "undo" operations — for each step that had already completed successfully before the failure occurred, working backward to roll back the overall effect of the partially-completed saga. For example, if step 3 of a 5-step order-processing saga fails, compensating actions would undo the effects of steps 1 and 2 (e.g., releasing reserved inventory, refunding a charged payment) to bring the system back to a consistent state.

**Q: How does circuit breaking relate to the Saga pattern — are they solving the same problem?**
> Not exactly, though both are resilience patterns relevant to distributed systems. Circuit breaking prevents cascading failures from a *currently struggling* dependency by blocking further calls to it temporarily. The Saga pattern addresses maintaining *data consistency* across a multi-step process spanning several services, specifically handling what to do when one step in that process fails — they're complementary concerns (fast-failing against a bad dependency vs. correctly unwinding a partially-completed multi-service transaction), not solutions to the same problem.

---

### 6. The Strangler Fig Pattern

#### Learning Perspective
**Strangler Fig pattern** — a **method for gradually replacing legacy systems** by **routing functionality to new components** — named after the strangler fig plant, which gradually grows around and eventually replaces its host tree. Applied to software: rather than a risky, all-at-once "big bang" rewrite of a legacy system, you incrementally build new components (often using modern architecture — possibly microservices) that handle specific pieces of functionality, gradually routing traffic for those specific pieces away from the legacy system and toward the new components, piece by piece, until the legacy system can eventually be fully retired.

**Why this matters as a migration strategy:** connecting to `full-stack-django-development-and-deployment.md`'s "6 R's" of application modernization (specifically "refactor/re-architect"), the Strangler Fig pattern is a concrete, risk-mitigating technique for actually executing that kind of large-scale modernization — avoiding the substantial risk of a single, massive rewrite/cutover, in favor of many smaller, independently verifiable, reversible steps.

#### Interview Perspective
**Q: What is the Strangler Fig pattern, and why is it generally preferred over a full rewrite of a legacy system?**
> It's an incremental migration strategy — new components gradually take over specific pieces of functionality from a legacy system, with traffic progressively routed to the new components piece by piece, until the legacy system can eventually be fully retired. It's generally preferred over a "big bang" full rewrite because a full rewrite carries enormous risk (a long period with no incremental validation, and a high-stakes, all-or-nothing cutover at the end) — the Strangler Fig approach instead breaks that risk into many smaller, independently verifiable, and individually reversible steps.

---

## Part B — AI-Powered Code Generation & Assistance

### 7. AI Code Completion & Generation Tools

#### Learning Perspective
- **AI-powered code completion** — tools that **suggest accurate code completions** by **analyzing variables, functions, and surrounding context** — the inline, as-you-type suggestion capability, connecting directly to "AI pair programming" as covered in `gen-ai-basic-software-development.md`.

- **Intelligent code generation** — AI systems that **analyze codebases** and **produce optimized code, improvements, and bug fixes** — a broader capability than simple completion, actively analyzing existing code to propose meaningful changes/fixes/optimizations, not just predicting the next few tokens.

- **NLP-powered code generation** — **generating code from natural language descriptions**, using **models trained on code and documentation** — the underlying technique letting a developer describe *what* they want in plain language, and receive generated code implementing that description, rather than writing the code directly.

- **Popular coding AI tools** — includes **ChatGPT, CodeT5, IBM watsonx Code Assistant, OpenAI Codex, Tabnine, and GitHub Copilot** — a representative snapshot of the tooling landscape, spanning general-purpose conversational AI applied to coding (ChatGPT), dedicated code-focused models (CodeT5, Codex), and IDE-integrated assistants (Tabnine, GitHub Copilot, IBM watsonx Code Assistant).

#### Interview Perspective
**Q: What's the difference between "AI-powered code completion" and "intelligent code generation," as distinct capabilities?**
> Code completion is the narrower, inline capability — suggesting the likely next few lines/tokens based on immediate surrounding context as you type, similar to a much smarter autocomplete. Intelligent code generation is broader — actively analyzing a codebase to produce more substantial output: optimized code, larger refactors, or proposed bug fixes, going beyond just predicting immediate next-token continuations.

**Q: How does NLP-powered code generation relate to the underlying "code generation" LLM capability covered in `gen-ai-basic-software-development.md`?**
> It's the same underlying capability (an LLM converting a natural-language description into working code), described here specifically in the context of the models being trained on large corpora of both code *and* documentation — meaning the model learns not just code syntax/patterns, but also how natural-language descriptions map onto corresponding code implementations, which is what enables the "describe what you want, get working code" interaction pattern.

---

### 8. AI-Assisted Documentation & Support

#### Learning Perspective
- **AI-assisted documentation** — **NLP tools** that **summarize and simplify technical explanations** — related to, but distinct from, "AI-generated documentation" covered in `gen-ai-basic-software-development.md` (which focused on generating diagrams/docs *from* code); this term emphasizes the summarization/simplification angle specifically — taking existing complex technical material and making it more accessible/understandable.

- **AI-powered technical support** — tools that provide **guidance and assistance** for **development tasks** using AI — a broader category covering AI assistance for developer questions and troubleshooting generally, beyond just code generation or documentation specifically (e.g., helping debug an environment setup issue, explaining an error message, or walking through how to use an unfamiliar API).

#### Interview Perspective
**Q: How does "AI-assisted documentation" (summarizing/simplifying) differ from "AI-generated documentation" (creating docs from code)?**
> AI-generated documentation (from `gen-ai-basic-software-development.md`) focuses on producing new documentation/diagrams directly from a codebase or system's current state. AI-assisted documentation, as described here, focuses on the complementary task of taking existing technical material — which might already be dense, complex, or poorly explained — and using NLP to summarize or simplify it into something more accessible and understandable for a given audience.

---

### 9. Prompt Chaining

#### Learning Perspective
**Prompt chaining** — a technique where **multiple prompts are connected** to handle **complex reasoning or workflows** — rather than attempting to accomplish a complex, multi-step task with a single, monolithic prompt, prompt chaining breaks the task into a sequence of smaller, more focused prompts, where each step's output feeds into the next step's input.

**Why this matters, and how it relates to agentic capabilities:** breaking a complex task into a chain of smaller, focused prompts generally produces more reliable results than one giant prompt trying to do everything at once — each individual step is simpler and easier for the model to execute well, and intermediate outputs can potentially be validated or corrected before being fed forward. This is conceptually related to (and often a building block underlying) the multi-step, autonomous workflows described as "AI agents" in `gen-ai-basic-software-development.md` — an agent's multi-step execution is, in effect, a more dynamic, tool-using elaboration of the same core "chain multiple LLM interactions together" idea.

**Example, in a code-generation context:**
```
Prompt 1: "Analyze this function and identify what it does"
   → output feeds into →
Prompt 2: "Given this analysis, identify potential edge cases not currently handled"
   → output feeds into →
Prompt 3: "Write additional code and tests to handle those identified edge cases"
```

#### Interview Perspective
**Q: What is prompt chaining, and why might it produce better results than a single, complex prompt?**
> Prompt chaining connects a sequence of multiple, more focused prompts, where each step's output becomes the next step's input — rather than trying to get a single prompt to handle an entire complex, multi-step task at once. It tends to produce better results because each individual prompt in the chain is simpler and more tractable for the model to execute reliably, and intermediate results can potentially be checked or refined before being passed forward, rather than hoping a single, complex prompt gets every part of a multi-faceted task right simultaneously.

**Q: How does prompt chaining relate to AI agents?**
> They're closely related concepts — prompt chaining is essentially a simpler, often more predetermined/fixed sequence of connected prompts, while an AI agent typically uses a similar underlying idea (multiple connected LLM interactions) but more dynamically — deciding its own next steps based on tool results and intermediate outcomes, rather than following a fixed, pre-defined chain. Prompt chaining can be thought of as a foundational building block that more sophisticated, autonomous agentic workflows build upon.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **AI bug detection** | AI process identifying and proposing fixes for code issues, based on patterns/runtime behavior |
| **AI-assisted documentation** | NLP tools that summarize and simplify technical explanations |
| **AI-powered code completion** | Suggests accurate completions by analyzing variables, functions, and context |
| **AI-powered technical support** | AI-driven guidance/assistance for development tasks |
| **Architecture decision record (ADR)** | Structured document capturing architectural decisions and their rationale |
| **Architecture pattern** | A reusable solution framework for common software system structures |
| **Circuit breaker** | A fault-tolerance pattern preventing cascading failures |
| **CQRS** | Separates read and write operations for scalability and clarity |
| **Event sourcing** | Stores state changes as a sequence of events, rather than overwriting state |
| **Intelligent code generation** | AI analyzes codebases to produce optimized code, improvements, and bug fixes |
| **Microservices** | Architectural style where applications are built as independently deployable services |
| **Modular monolith** | A single-application structure with well-organized internal modules |
| **NLP-powered code generation** | Generates code from natural language, using models trained on code + docs |
| **Popular coding AI tools** | ChatGPT, CodeT5, IBM watsonx Code Assistant, OpenAI Codex, Tabnine, GitHub Copilot |
| **Prompt chaining** | Connects multiple prompts to handle complex reasoning or workflows |
| **Saga pattern** | Manages distributed transactions via a series of local compensating actions |
| **Strangler Fig pattern** | Gradually replaces legacy systems by routing functionality to new components |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Architecture pattern vs. ADR | Reusable structural solution vs. a record of a specific decision's rationale |
| Modular monolith | Microservices' design discipline, without the deployment-independence overhead |
| CQRS | Separate read/write models — optimize and scale each independently |
| Event sourcing | State = replaying a stored sequence of events, not an overwritten current value |
| Circuit breaker | Trips to stop calling a struggling dependency, preventing cascading failure |
| Saga pattern | Distributed "transaction" via local steps + compensating rollback actions |
| Strangler Fig pattern | Incrementally migrate off legacy systems, piece by piece — not a big-bang rewrite |
| Code completion vs. intelligent code generation | Inline next-token suggestion vs. broader analysis/optimization/fixes |
| Prompt chaining | Sequence of connected, focused prompts — more reliable than one giant prompt |
| Prompt chaining vs. AI agents | Fixed sequence vs. dynamic, tool-using, self-directed step sequencing |