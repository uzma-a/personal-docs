# Intro to Microservices

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Builds on `modern-cloud-computing-technologies.md` and `containers-and-containerization.md` — this file goes deeper on the microservices architectural style itself, plus the Twelve-Factor App methodology that underpins how modern SaaS applications are typically built to run well in cloud/container environments.

---

## 1. The Shift Toward SaaS & Modern Software Delivery

### Learning Perspective
**Modern software development often delivers** applications as **centrally hosted, web-based, software-as-a-service (SaaS)** — rather than software installed and run locally on each user's own machine, applications are increasingly built to run on servers the provider controls, accessed by users over the web.

**Why this shift matters for how applications are architected:** a centrally hosted SaaS application must be built for **continuous delivery** (frequent updates, without requiring users to manually reinstall anything), **elastic scaling** (handling unpredictable numbers of concurrent users), and **operability by a small team** across potentially many customers simultaneously — pressures that traditional, monolithic, locally-installed software was never really designed to handle gracefully. This is the underlying motivation for both the Twelve-Factor methodology (Section 2) and the microservices architectural pattern (Section 3) — both emerged as practical responses to these SaaS-era demands.

### Interview Perspective
**Q: Why does the shift toward SaaS-delivered applications matter architecturally?**
> SaaS applications need to be continuously updated, elastically scaled to handle unpredictable concurrent load, and operable by a relatively small team supporting potentially many customers at once — very different pressures than traditional, locally-installed software. This shift is the underlying motivation behind both the Twelve-Factor App methodology and the microservices architectural pattern — both are practical responses to building software that genuinely works well under these SaaS-era operational demands.

---

## 2. The Twelve-Factor App Methodology

### Learning Perspective
The **Twelve-Factor App methodology** **enables developers to create more efficient SaaS applications** — a set of best practices, distilled from real-world experience building and operating cloud-native SaaS applications, aimed at maximizing **portability**, **scalability**, and **maintainability**.

**The twelve factors map to the code, deploy, and operate stages** of the software delivery lifecycle — they aren't just abstract principles, but practical guidance spanning the entire journey from writing code through to running it reliably in production.

**The twelve factors themselves** (standard, widely-referenced list — useful context beyond just the source bullets, since interviewers commonly expect familiarity with all twelve by name):

| # | Factor | Core idea |
|---|---|---|
| 1 | **Codebase** | One codebase tracked in version control, many deploys |
| 2 | **Dependencies** | Explicitly declare and isolate dependencies, never rely on system-wide packages |
| 3 | **Config** | Store configuration in the environment (env vars), not in code |
| 4 | **Backing services** | Treat backing services (databases, queues, caches) as attached resources, swappable without code changes |
| 5 | **Build, release, run** | Strictly separate the build, release, and run stages |
| 6 | **Processes** | Execute the app as one or more stateless processes; persist state externally |
| 7 | **Port binding** | Export services via port binding — the app is self-contained, not dependent on runtime injection of a web server |
| 8 | **Concurrency** | Scale out via the process model — many small, independent processes, not one large one |
| 9 | **Disposability** | Maximize robustness with fast startup and graceful shutdown |
| 10 | **Dev/prod parity** | Keep development, staging, and production as similar as possible |
| 11 | **Logs** | Treat logs as event streams, not files the app manages itself |
| 12 | **Admin processes** | Run admin/management tasks as one-off processes in the same environment |

**How this maps to code/deploy/operate:**
- **Code stage** — factors like Codebase, Dependencies, and Config guide how the application is written and structured
- **Deploy stage** — factors like Build/Release/Run, Port Binding, and Dev/Prod Parity guide how the application moves from source to a running instance
- **Operate stage** — factors like Processes, Concurrency, Disposability, Logs, and Admin Processes guide how the application behaves and is managed once it's actually running

### Interview Perspective
**Q: What is the Twelve-Factor App methodology, and why does it matter for building SaaS applications?**
> It's a set of best practices for building SaaS applications that are portable, scalable, and maintainable — covering everything from how config is managed to how the app scales and handles logging. It matters because it distills hard-won lessons from operating cloud-native applications at scale into concrete, actionable guidance, spanning the entire software delivery lifecycle from writing code through deployment and ongoing operation.

**Q: Give an example of a Twelve-Factor principle and explain why it matters in practice.**
> "Config" (Factor 3) — store configuration (database URLs, API keys, feature flags) in environment variables, not hardcoded in the codebase. This matters because it lets the exact same build/artifact run correctly across different environments (dev, staging, production) just by changing environment variables, without needing separate code branches or rebuilds per environment — and it keeps sensitive config (like credentials) out of version control entirely.

**Q: How do the twelve factors map onto the "code, deploy, operate" stages of the software delivery lifecycle?**
> Code-stage factors (Codebase, Dependencies, Config) shape how the application is written and structured. Deploy-stage factors (Build/Release/Run, Port Binding, Dev/Prod Parity) shape how it moves from source into a running artifact. Operate-stage factors (Processes, Concurrency, Disposability, Logs, Admin Processes) shape how it behaves and is managed once actually running in production.

⭐ **Frequently asked** — be ready to name several of the twelve factors specifically, not just describe the methodology in the abstract; interviewers often probe for concrete recall.

---

## 3. What Are Microservices?

### Learning Perspective
**Microservices make each application component its own service**, and **each service communicates via an API** — rather than building one large, unified application (a **monolith**) where all functionality lives in a single codebase and deployment unit, a microservices architecture decomposes the application into many small, independently deployable services, each responsible for a specific piece of business functionality, talking to each other over the network (typically via REST APIs or messaging).

This directly connects to concepts already covered elsewhere:
- `modern-cloud-computing-technologies.md` introduced microservices at a high level
- `containers-and-containerization.md` and `kubernetes-ecosystem.md` covered why containers/Kubernetes are the natural deployment substrate for microservices
- `openshift.md`'s Service Mesh/Istio section covered how the *networking* between many microservices is managed

### Interview Perspective
**Q: What defines a microservices architecture, and how does it differ from a monolith?**
> In a microservices architecture, each application component is built and deployed as its own independent service, communicating with other services via APIs (typically over HTTP/REST or messaging). A monolith, by contrast, bundles all functionality into a single codebase and deployment unit — one team, one build, one deploy for the entire application, regardless of which specific piece of functionality actually changed.

---

## 4. Benefit: Technology Flexibility

### Learning Perspective
**Microservices allow application components to use different technology stacks** — since each service is independently built and deployed, one service could be written in Python, another in Node.js, another in Go — whatever's best suited to that specific service's needs, rather than being locked into one language/framework/database choice for the entire application.

**Why this matters:** different problems genuinely benefit from different tools — a service doing heavy numerical computation might benefit from Python's data science ecosystem, while a service handling many concurrent lightweight I/O operations might benefit from Node.js's event-driven model. A monolith forces one technology choice across the entire application, even when parts of it would clearly benefit from something different.

### Interview Perspective
**Q: Why is the ability to use different technology stacks per service considered a benefit of microservices?**
> Because different services often have genuinely different technical needs — one service might benefit from a specific language's ecosystem, performance characteristics, or concurrency model, while another service's needs are completely different. Microservices let each team choose the best-fit technology for their specific service, rather than the entire application being locked into one technology choice that's a compromise for at least some parts of the system.

**Q: What's a potential downside of allowing many different technology stacks across services?**
> It can increase operational complexity — more languages/frameworks means more tooling, more specialized knowledge required across the team, more varied deployment/monitoring approaches to maintain, and potentially harder cross-team code sharing/collaboration. Many organizations deliberately constrain this flexibility somewhat (e.g., allowing 2-3 approved stacks rather than truly unlimited choice) to balance flexibility against operational manageability.

---

## 5. Benefit: Independent Scaling

### Learning Perspective
**Microservices enable individual components to scale in response to demand** — since each service is deployed independently, you can scale up (run more instances of) just the specific services experiencing high load, without needing to scale the entire application uniformly.

**Contrast with a monolith:** in a monolith, if *any* part of the application is under heavy load, you typically have to scale the *entire* application (running more copies of the whole thing), even though most of that duplicated capacity might be sitting idle for the parts that weren't actually under pressure — wasteful compared to microservices' ability to scale precisely where the demand actually is.

### Interview Perspective
**Q: How does independent scaling in microservices improve resource efficiency compared to a monolith?**
> In a monolith, scaling means running more copies of the entire application, even if only one specific piece of functionality is actually under heavy load — wasting resources on the parts that don't need additional capacity. Microservices let you scale just the specific service(s) experiencing demand, running more instances of only what's actually needed, which is significantly more resource-efficient at scale.

**Q: Give a concrete example of when independent scaling would matter.**
> An e-commerce application where the checkout/payment service experiences a huge traffic spike during a flash sale, while the product-review service's load stays flat. With microservices, you can scale up just the checkout service to handle the spike, leaving the review service running at its normal capacity — a monolith would force scaling the entire application (including the unaffected review functionality) just to handle the checkout spike.

---

## 6. Benefit: Independent Iteration & Reduced Change Risk

### Learning Perspective
**Microservices lessen risks associated with change** because **components can iterate independently** — a team can update, redeploy, or even completely rewrite one service without needing to coordinate a release with every other team/service in the application, and without risking that an unrelated change elsewhere breaks their service.

**Why this reduces risk specifically:** in a monolith, any change — however small — requires rebuilding, retesting, and redeploying the *entire* application, meaning a bug in one small feature could delay or break the release of many unrelated features bundled into the same deployment. With microservices, the "blast radius" of any single change is contained to the specific service being modified, and that service's release cycle is decoupled from every other service's release cycle.

### Interview Perspective
**Q: Why does microservices' independent iteration reduce the risk associated with making changes?**
> Because each service has its own independent build/test/deploy cycle — a change to one service doesn't require rebuilding, retesting, or redeploying the entire application, and a bug introduced in one service's release doesn't automatically block or risk unrelated services' releases. This "contains the blast radius" of any given change to just the service actually being modified, rather than the whole monolithic application being at risk on every single deployment.

**Q: How does this relate to team autonomy and release velocity?**
> Since services can be deployed independently, different teams owning different services can release on their own schedules, without needing to coordinate a single, synchronized release across the entire application. This generally enables much faster, more frequent releases per team, since they're not gated by every other team's readiness or blocked waiting for a shared, monolithic release train.

---

## 7. Benefit: Fault Isolation

### Learning Perspective
**Failures in one service do not necessarily impact other services** — since services are independently deployed processes communicating over the network (rather than being tightly coupled within a single process/codebase), a crash or bug in one service doesn't automatically bring down the entire application, the way an unhandled exception in a monolith's shared process could potentially crash the whole thing.

**Important nuance — this benefit isn't automatic:** fault isolation between services requires *deliberate* design — handling failed/slow calls to other services gracefully (timeouts, retries, circuit breaking — covered in `openshift.md`'s Istio section), rather than a calling service simply hanging or crashing whenever a dependency it calls has a problem. Without this deliberate resilience engineering, failures *can* still cascade across services (e.g., one slow service causing every service that calls it to also become slow and eventually fail, as covered by the circuit breaking pattern).

### Interview Perspective
**Q: Why does a failure in one microservice not necessarily bring down the whole application, unlike in a monolith?**
> Because each microservice runs as an independent process, communicating with others over the network rather than sharing memory/process space within a single monolithic application. A crash in one service's process doesn't directly crash another service's separate process — the failure is contained, as long as other services handle failed or slow calls to that service gracefully.

**Q: Is fault isolation an automatic benefit of microservices, or does it require deliberate design?**
> It requires deliberate design — simply splitting an application into separate services doesn't automatically prevent failures from cascading. If a calling service doesn't handle a failing/slow dependency gracefully (e.g., via timeouts, retries, or circuit breaking), that failure can still propagate and cause cascading problems across the system. Genuine fault isolation depends on implementing resilience patterns like these — which is exactly why service mesh tools like Istio's circuit breaking exist, to apply this protection consistently across a microservices architecture.

---

## 8. Microservices Anti-Patterns

### Learning Perspective
**There are some anti-patterns to avoid when building microservices** — common mistakes that undermine the actual benefits microservices are supposed to provide, sometimes making a system worse than a well-built monolith would have been. Common examples worth being aware of:

- **Distributed monolith** — services are split apart physically, but remain so tightly coupled (shared databases, synchronous chains of calls, deployments that must happen together) that you get all the *operational complexity* of microservices, with *none* of the independence benefits — the worst of both worlds.
- **Overly fine-grained services ("nanoservices")** — splitting services so small and numerous that the network communication overhead and operational burden of managing them outweighs any benefit — not every function needs to be its own service.
- **Shared database across services** — multiple services directly reading/writing the same database undermines independent deployability (a schema change for one service risks breaking others) and blurs ownership of the data.
- **Missing resilience patterns** — building microservices without implementing timeouts, retries, or circuit breaking (Section 7), leading to cascading failures instead of genuine fault isolation.
- **Chatty inter-service communication** — services making excessive numbers of synchronous calls to each other to complete a single operation, introducing significant latency and tight coupling to each other's availability.
- **Premature adoption** — adopting a microservices architecture before an application/team actually needs the complexity it introduces — for a small application or team, the operational overhead of microservices can outweigh the benefits, and a well-structured monolith may genuinely be the better starting point.

### Interview Perspective
**Q: What is a "distributed monolith," and why is it considered a particularly problematic anti-pattern?**
> It's a system that's been physically split into separate services, but those services remain so tightly coupled (through a shared database, synchronous call chains, or coordinated deployment requirements) that they can't actually be developed, deployed, or scaled independently — you end up paying the full operational cost and complexity of a distributed system, without gaining any of microservices' actual benefits (independent iteration, fault isolation, independent scaling). It's often considered worse than either a clean monolith or genuinely well-decomposed microservices.

**Q: Why might sharing a database across multiple microservices be problematic?**
> It undermines independent deployability — a schema change made by one service's team could unexpectedly break another service relying on that same table/schema, forcing coordination that microservices are supposed to eliminate. It also blurs data ownership, making it unclear which service is actually responsible for a given piece of data's integrity and lifecycle — the general recommendation is for each service to own its own data store, exposing it to other services only through its own API.

**Q: When might adopting microservices actually be a mistake?**
> For a small application or a small team, the operational overhead of microservices — managing many independent deployments, inter-service networking, distributed debugging/tracing, and the resilience patterns needed for genuine fault isolation — can significantly outweigh the benefits. In these cases, a well-structured, modular monolith is often genuinely the more pragmatic choice, at least until the application or team has actually grown to a scale where microservices' benefits clearly justify their added complexity.

⭐ **Frequently asked** — interviewers often specifically probe for anti-patterns/downsides, not just benefits, to see if a candidate has a balanced, realistic view of microservices rather than treating them as a universal best practice.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Why SaaS shift matters | Drives need for continuous delivery, elastic scaling, small-team operability |
| Twelve-Factor App | Best practices for portable, scalable, maintainable SaaS apps |
| 12 factors → lifecycle | Code (codebase/deps/config) → Deploy (build-release-run/ports/parity) → Operate (processes/concurrency/logs) |
| Microservices definition | Each component is its own service, communicating via APIs |
| Benefit: tech flexibility | Each service can use the best-fit stack, not one forced choice app-wide |
| Benefit: independent scaling | Scale only the services under load, not the whole app |
| Benefit: independent iteration | Contains the "blast radius" of change; decoupled release cycles |
| Benefit: fault isolation | Failures don't automatically cascade — but requires deliberate resilience design |
| Anti-pattern: distributed monolith | Physically split, but still tightly coupled — worst of both worlds |
| Anti-pattern: shared database | Breaks independent deployability and data ownership |
| Anti-pattern: missing resilience patterns | No timeouts/retries/circuit breaking → cascading failures |
| When NOT to use microservices | Small app/team — operational overhead can outweigh the benefits |