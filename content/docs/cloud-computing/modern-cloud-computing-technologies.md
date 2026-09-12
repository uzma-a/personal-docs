# Cloud Computing — Module 5: Modern Cloud Computing Technologies

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general industry knowledge, matching Module 5 of your NAV (Containers, Hybrid Multi-Cloud, Microservices, Serverless Computing, Cloud Directory Services, Cloud-Native Applications, DevOps, Application Modernization). Worth cross-checking against your actual course material for alignment, same as the earlier files.

---

## 1. Containers

### Learning Perspective
A **container** packages an application together with everything it needs to run — code, runtime, system libraries, and configuration — into a single, lightweight, portable unit. Unlike a VM, a container **shares the host machine's OS kernel** rather than running its own full guest OS, making it much faster to start and far lighter on resources.

**Key characteristics:**
- **Portability** — "runs the same everywhere," since the container bundles its own dependencies rather than relying on the host's installed software
- **Lightweight** — no full guest OS overhead, so containers start in seconds and use far less memory/disk than VMs
- **Process-level isolation** — isolated via OS features (namespaces, cgroups on Linux), which is a thinner isolation boundary than a VM's hardware-level virtualization
- **Container images** — immutable, versioned snapshots of an application and its dependencies, typically built in layers
- **Orchestration** — tools like **Kubernetes** manage the deployment, scaling, networking, and healing of containers across a cluster of machines; **Docker** is the most widely used container runtime/tooling

### Interview Perspective
**Q: What is a container, and how does it differ from a VM?**
> A container packages an application and its dependencies into a portable unit that shares the host OS kernel, making it much lighter and faster to start than a VM, which virtualizes an entire machine including its own guest OS. Containers trade some isolation strength for speed, density, and portability.

**Q: What role does Kubernetes play?**
> Kubernetes is a container orchestration platform — it automates deploying, scaling, networking, and self-healing containers across a cluster, so teams don't have to manually manage where and how each container runs.

⭐ **Frequently asked** — be ready to explain the VM-vs-container tradeoff clearly; it's one of the most common cloud interview questions.

---

## 2. Hybrid Multi-Cloud

### Learning Perspective
**Hybrid multi-cloud** combines two related but distinct ideas:
- **Hybrid** — connecting on-premises infrastructure with public cloud
- **Multi-cloud** — using **more than one** public cloud provider

Together, a hybrid multi-cloud strategy uses an **open, standards-based stack** that can run across on-prem infrastructure and multiple public cloud vendors, rather than being tied to one provider's proprietary tooling.

**Why organizations adopt this approach:**
- **Avoiding vendor lock-in** — workloads and skills remain portable across providers
- **Best-of-breed selection** — pick the strongest service from each provider for a given need (e.g., one provider's AI/ML tools, another's data warehouse)
- **Resilience** — reduces dependency on any single provider's availability
- **Regulatory/data residency needs** — some workloads may need to run in specific providers/regions for compliance reasons

**Trade-off:** increased operational complexity — managing consistent security, networking, and tooling across multiple environments is harder than managing one.

### Interview Perspective
**Q: What is hybrid multi-cloud, and why would an organization choose it?**
> It combines on-prem + public cloud (hybrid) with the use of multiple public cloud providers (multi-cloud), typically built on an open, portable stack. Organizations choose it to avoid vendor lock-in, pick best-of-breed services from different providers, improve resilience, and meet regulatory/data residency requirements — at the cost of added operational complexity.

---

## 3. Microservices

### Learning Perspective
**Microservices** is an architectural style where an application is built as a collection of **small, independently deployable services**, each responsible for a specific business capability, communicating over lightweight protocols (commonly HTTP/REST or messaging queues).

**Key characteristics:**
- **Independent deployability** — each service can be built, deployed, and scaled without redeploying the entire application
- **Decentralized data management** — each service typically owns its own data store, rather than sharing one central database
- **Loose coupling** — services interact through well-defined APIs/contracts, minimizing dependencies on each other's internals
- **Technology diversity** — different services can use different languages/frameworks/databases best suited to their specific need

**Trade-offs vs. a monolithic architecture:**
- **Pros:** independent scaling, faster/more isolated deployments, teams can own services end-to-end, fault isolation (one service failing doesn't necessarily take down the whole system)
- **Cons:** increased operational complexity (distributed systems are harder to debug/monitor), network latency between services, and the need for solid DevOps/observability practices to manage it all

### Interview Perspective
**Q: What are microservices, and how do they compare to a monolithic architecture?**
> Microservices break an application into small, independently deployable services, each owning its own data and communicating via APIs — offering independent scaling and deployment, at the cost of added distributed-systems complexity. A monolith is a single, unified codebase/deployment unit — simpler to build and reason about initially, but harder to scale or update piecemeal as it grows.

**Q: What's a common challenge teams face when adopting microservices?**
> Operational complexity — debugging issues across many services (distributed tracing), managing network communication reliably, and avoiding tightly-coupled dependencies between services that undermine the whole point of the architecture. This is usually addressed with strong DevOps, observability, and API contract discipline.

---

## 4. Serverless Computing

### Learning Perspective
**Serverless computing** lets developers run code **without provisioning or managing servers** — the cloud provider handles all underlying infrastructure, automatically allocating resources as needed and scaling (including down to zero) based on demand.

Despite the name, servers are still involved — they're just fully abstracted away from the developer.

**Key characteristics:**
- **Event-driven execution** — code (often called a "function") runs in response to triggers (HTTP requests, file uploads, messages on a queue, scheduled timers, etc.)
- **Automatic scaling** — the platform scales instances up or down (including to zero) transparently based on incoming load
- **Pay-per-use billing** — typically billed by actual execution time/resources consumed, not by reserved capacity — you pay nothing when the function isn't running
- **Stateless execution model** — each invocation is generally independent; persistent state is kept in external storage/databases, not in the function instance itself

**Common examples:** AWS Lambda, Azure Functions, Google Cloud Functions — collectively known as **FaaS (Functions as a Service)**.

**Trade-offs:**
- **Pros:** no server management, automatic scaling, cost efficiency for spiky/unpredictable workloads
- **Cons:** **cold starts** (latency when a function spins up from an idle state), execution time/resource limits, and potential vendor lock-in due to provider-specific triggers and tooling

### Interview Perspective
**Q: What is serverless computing, and what are its main advantages and drawbacks?**
> Serverless lets you run code without managing servers — the provider handles provisioning and scaling automatically, and you're billed per execution rather than for reserved capacity. Advantages: no infrastructure management, automatic scaling, cost efficiency for variable workloads. Drawbacks: cold-start latency, execution limits, and tighter coupling to a specific provider's ecosystem.

**Q: When would serverless NOT be a good fit?**
> For long-running, steady, predictable workloads (reserved/dedicated compute is often cheaper), latency-critical applications sensitive to cold starts, or workloads needing fine-grained control over the runtime environment.

---

## 5. Cloud Directory Services

### Learning Perspective
**Cloud directory services** provide centralized, cloud-hosted **identity and access management** — storing information about users, groups, devices, and their permissions, and enabling authentication and authorization across applications and resources.

**Key characteristics:**
- **Centralized identity store** — a single source of truth for "who exists" and "what can they access"
- **Authentication** — verifying a user/device is who they claim to be (often integrating with standards like SAML, OpenID Connect, OAuth)
- **Authorization** — determining what an authenticated identity is allowed to do
- **Directory synchronization** — many organizations sync an on-prem directory (e.g., Active Directory) with a cloud directory service, supporting hybrid identity scenarios
- **Single Sign-On (SSO)** — lets users authenticate once and access multiple connected applications without re-entering credentials

**Common examples:** Azure Active Directory (Microsoft Entra ID), AWS Directory Service, Google Cloud Identity.

### Interview Perspective
**Q: What is a cloud directory service, and why is it important?**
> It's a centralized, cloud-hosted identity and access management system that stores user/group/device information and handles authentication and authorization across applications. It's important because it enables consistent security policy enforcement, SSO, and simplified identity management across an organization's growing set of cloud and on-prem applications.

**Q: How does a cloud directory service support hybrid environments?**
> Through directory synchronization — syncing an on-prem directory (like Active Directory) with the cloud directory service, so users have a consistent identity whether they're accessing on-prem or cloud resources.

---

## 6. Cloud-Native Applications

### Learning Perspective
**Cloud-native applications** are built specifically to **take full advantage of cloud computing's characteristics** — elasticity, distributed infrastructure, and managed services — rather than simply being traditional applications moved onto cloud infrastructure ("lift and shift").

**Common characteristics/principles:**
- **Microservices-based architecture** — decomposed into independently deployable services
- **Containerized** — typically packaged and deployed as containers, often orchestrated with Kubernetes
- **Designed for elasticity** — built to scale horizontally and handle dynamic load automatically
- **Resilience by design** — assumes failure will happen (of individual components, instances, even entire zones) and is architected to degrade gracefully or self-heal rather than fail entirely
- **API-driven and loosely coupled** — components interact through well-defined APIs, enabling independent evolution
- **DevOps/CI-CD aligned** — built with automated testing, deployment, and observability baked in from the start

### Interview Perspective
**Q: What makes an application "cloud-native," as opposed to just "running on the cloud"?**
> Cloud-native apps are designed from the ground up to exploit cloud characteristics — elasticity, resilience, microservices, containers, and API-driven design — rather than simply being an existing traditional app relocated onto cloud infrastructure ("lift and shift"). A lift-and-shift app runs on the cloud but doesn't necessarily benefit from cloud-native scalability or resilience patterns.

**Q: What does "resilience by design" mean in a cloud-native context?**
> It means the application assumes components will fail at some point (a server, a zone, a dependency) and is architected to handle that gracefully — through retries, redundancy, graceful degradation, and self-healing — rather than treating failure as an exceptional, unhandled case.

---

## 7. DevOps

### Learning Perspective
**DevOps** is a set of practices and a cultural philosophy that brings **development and operations teams together**, aiming to shorten the software delivery lifecycle and deliver high-quality software more frequently and reliably.

**Core practices:**
- **CI/CD (Continuous Integration / Continuous Delivery or Deployment)** — automatically building, testing, and deploying code changes frequently, in small increments, rather than large, infrequent releases
- **Infrastructure as Code (IaC)** — managing and provisioning infrastructure through code/config files (e.g., Terraform, CloudFormation) rather than manual setup, making infrastructure reproducible and version-controlled
- **Automated testing** — reducing manual QA bottlenecks and catching issues earlier
- **Monitoring and observability** — logging, metrics, and tracing to understand system health and quickly diagnose issues in production
- **Collaboration/culture** — breaking down silos between dev and ops so both share responsibility for reliability and delivery speed (often extended further into **DevSecOps**, integrating security throughout the pipeline)

### Interview Perspective
**Q: What is DevOps, and why does it matter?**
> DevOps is a cultural and technical practice that unifies development and operations to enable faster, more reliable software delivery — through CI/CD automation, infrastructure as code, automated testing, and strong monitoring. It matters because it reduces the friction and risk traditionally associated with releasing software, enabling smaller, safer, more frequent releases.

**Q: What is Infrastructure as Code, and why is it valuable?**
> IaC means defining and provisioning infrastructure through machine-readable configuration files instead of manual processes. It's valuable because it makes infrastructure reproducible, version-controlled, auditable, and consistent across environments (dev/staging/production).

---

## 8. Application Modernization

### Learning Perspective
**Application modernization** is the process of updating **legacy applications** — their architecture, infrastructure, or technology stack — to take better advantage of modern (often cloud-native) approaches, without necessarily rebuilding everything from scratch.

**Common modernization strategies (often summarized as the "6 R's"):**
- **Rehost** ("lift and shift") — move the application to the cloud largely unchanged
- **Replatform** — make minor optimizations during the move (e.g., swap a self-managed database for a managed cloud database service), without deep architectural changes
- **Refactor / Re-architect** — restructure the application, often decomposing a monolith into microservices, to fully exploit cloud-native capabilities
- **Repurchase** — replace the legacy application with a SaaS alternative
- **Retire** — decommission applications that are no longer needed
- **Retain** — keep certain applications as-is (e.g., due to compliance, cost, or low modernization ROI)

**Why organizations modernize:** improved scalability and performance, reduced technical debt and maintenance cost, better security posture, faster feature delivery, and alignment with modern DevOps/cloud-native practices.

### Interview Perspective
**Q: What is application modernization, and what strategies might you use?**
> It's the process of updating legacy applications to take advantage of modern, often cloud-native approaches. Common strategies range from simple "lift and shift" rehosting, to replatforming with minor optimizations, to full refactoring into microservices — plus options like repurchasing a SaaS replacement, retiring unneeded apps, or retaining them as-is when modernization isn't worth the cost.

**Q: How would you decide which modernization strategy fits a given legacy application?**
> It depends on business priority, technical debt, and risk tolerance — a low-priority, stable app might just be rehosted or retained, while a core, frequently-changing app with real scalability needs would justify the deeper investment of refactoring into microservices.

⭐ **Frequently asked in architecture/strategy interviews** — be ready to justify a strategy choice with a cost/benefit/risk argument, not just name the options.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Containers | Lightweight, portable app packages sharing the host OS kernel; orchestrated by tools like Kubernetes |
| Hybrid multi-cloud | On-prem + multiple public clouds on an open, portable stack — avoids lock-in, adds complexity |
| Microservices | Small, independently deployable services with their own data — flexible but operationally complex |
| Serverless | Run code without managing servers; auto-scales, pay-per-use, but has cold starts |
| Cloud directory services | Centralized cloud identity/access management — authentication, authorization, SSO |
| Cloud-native applications | Built from the ground up for cloud elasticity, resilience, microservices, and APIs (not just "lifted and shifted") |
| DevOps | Culture + practices (CI/CD, IaC, monitoring) uniting dev and ops for faster, safer delivery |
| Application modernization | Updating legacy apps via rehost, replatform, refactor, repurchase, retire, or retain |

---

*Notes organized for both conceptual understanding and rapid interview recall. Star (⭐) topics indicate areas frequently probed in technical interviews.*