# Cloud Computing — Module 3: Cloud Service and Deployment Models

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** This file covers cloud *service models* (IaaS/PaaS/SaaS) and *deployment models* (public/private/hybrid/community) — matching Module 3 of your NAV. Networking fundamentals (routing, IP addressing, VPNs, hypervisors, VMs) belong in Module 2 (`networking-and-virtualization-basics.md`).

---

## Part A — Cloud Service Models (IaaS / PaaS / SaaS)

### 1. The Core Split: Who Manages What

### Learning Perspective
The three service models differ primarily in **how much of the stack the provider manages** versus how much the customer manages:

- **IaaS** — the cloud provider manages **physical resources** (hardware, data centers, networking, storage). The customer manages everything above that (OS, runtime, applications, data).
- **PaaS** — the provider manages the **platform infrastructure** (hardware *and* the OS/runtime/middleware layer). The customer just builds and manages their applications and data.
- **SaaS** — the provider hosts and manages **the applications and data** themselves. The customer just uses the software.

Think of it as a sliding scale of abstraction: **IaaS < PaaS < SaaS**, where each step up hands more operational responsibility to the provider and leaves the customer with less to manage (but also less low-level control).

### Interview Perspective
**Q: What's the core difference between IaaS, PaaS, and SaaS?**
> It's about who manages what layer of the stack. IaaS: provider manages physical infrastructure, you manage everything else. PaaS: provider manages infrastructure *and* platform (OS, runtime), you manage your app and data. SaaS: provider manages the entire application — you just use it.

**Classic analogy to have ready:** "IaaS is like renting land, PaaS is like renting a fully-built house, SaaS is like staying in a hotel room — increasing levels of 'someone else handles it for you.'"

---

### 2. Infrastructure as a Service (IaaS)

### Learning Perspective
**IaaS** is a form of cloud computing that delivers fundamental **compute, network, and storage resources** to consumers **on-demand, over the network, on a pay-as-you-go basis**.

**Key components of cloud infrastructure:**
- **Physical data centers** — the actual facilities housing hardware
- **Compute** — processing power (VMs, containers, etc.)
- **Network** — connectivity between resources and to the internet
- **Storage** — persistent data storage (block, object, file)

IaaS gives customers the most control and flexibility of the three models, since they're essentially renting raw infrastructure and building everything else themselves.

### Interview Perspective
**Q: What is IaaS, and what are its key components?**
> IaaS delivers fundamental compute, network, and storage resources on-demand over the internet, pay-as-you-go. The key components are physical data centers, compute, network, and storage — the provider manages these; you manage the OS upward.

**Good example to cite:** Provisioning a virtual machine on AWS EC2, Google Compute Engine, or Azure VMs — you get raw compute you configure yourself.

---

### 3. Platform as a Service (PaaS)

### Learning Perspective
**PaaS** is a cloud computing model that provides customers with a **complete platform** — **hardware, software, and infrastructure** — typically to develop, deploy, manage, and run applications.

What distinguishes PaaS clouds:
- **High level of abstraction** — developers don't manage servers or OS patching
- **Support services** — built-in tooling for logging, monitoring, etc.
- **Runtime environments** — pre-configured environments for specific languages/frameworks
- **Rapid deployment mechanisms** — push code and go live quickly
- **Middleware capabilities** — integration, messaging, and connective tooling handled by the platform

**PaaS advantages:**
- **Scalability** — the platform handles scaling automatically
- **Faster time to market** — less infrastructure setup means faster shipping
- **Greater agility and innovation** — developers focus on building features, not managing servers

### Interview Perspective
**Q: What is PaaS, and what makes it different from IaaS?**
> PaaS provides a complete platform — hardware, software, and infrastructure — so developers can focus purely on building and deploying applications. Unlike IaaS, you don't manage the OS or runtime; the platform handles that, offering high abstraction, built-in support services, and rapid deployment.

**Q: What are the advantages of PaaS?**
> Scalability, faster time to market, and greater agility/innovation — since teams spend less time on infrastructure and more on product development.

**Good example to cite:** Google App Engine, Heroku, AWS Elastic Beanstalk.

---

### 4. Software as a Service (SaaS)

### Learning Perspective
**SaaS** is a cloud offering that provides users with **access to a service provider's cloud-based software** — no installation, no infrastructure management, just usage.

**SaaS characteristics:**
- **Multitenant architecture** — a single application instance serves multiple customers, logically isolated
- **Security, compliance, and maintenance** — handled entirely by the provider
- **Customization of applications** — configurable within provider-defined boundaries
- **Subscription model** — typically billed recurringly (monthly/annually)
- **Scaling** — handled transparently by the provider

**SaaS advantages:**
- **Direct procurement of solutions** — buy and start using software quickly, without lengthy setup
- **Improved workforce productivity and efficiency** — teams get working tools immediately
- **Enable distribution of software costs** — subscription model spreads cost over time instead of large upfront capital expense

### Interview Perspective
**Q: What is SaaS, and what are its defining characteristics?**
> SaaS gives users direct access to a provider's cloud-hosted software. It's typically multitenant, fully managed for security/compliance/maintenance, configurable within limits, subscription-billed, and scales transparently.

**Q: Why do businesses prefer SaaS for many use cases?**
> Fast procurement (no lengthy setup), improved productivity since tools are ready to use, and predictable, distributed costs via subscription rather than large upfront investment.

**Good example to cite:** Salesforce, Google Workspace, Microsoft 365.

---

## Part B — Cloud Deployment Models

### 5. Public Cloud

### Learning Perspective
In the **public cloud** model, users get access to servers, storage, network, security, and applications **as services delivered by cloud service providers over the internet**. Infrastructure is shared across many customers (multitenant) but logically isolated.

### Interview Perspective
**Q: What is a public cloud?**
> Infrastructure and services (compute, storage, network, security, apps) delivered over the internet by a cloud provider, shared across many customers but logically isolated from each other. Examples: AWS, Azure, GCP's standard offerings.

---

### 6. Private Cloud

### Learning Perspective
Per **NIST SP 800-145**, a **private cloud** is:

> "Cloud infrastructure provisioned for exclusive use by a single organization comprising multiple consumers (such as business units). It may be owned, managed, and operated by the organization, a third party, or some combination of them, and it may exist on or off premises."

The defining feature is **exclusivity to one organization** — even if multiple business units within that organization use it, and even if a third party operates it on the organization's behalf.

### Interview Perspective
**Q: What is a private cloud, and how does it differ from a public cloud?**
> A private cloud is provisioned exclusively for one organization (even if used by multiple internal business units), whereas a public cloud serves many separate customer organizations on shared infrastructure. Private cloud can still be run by a third party or exist off-premises — "private" refers to *exclusivity of use*, not necessarily *who operates it* or *where it's hosted*.

---

### 7. Hybrid Cloud

### Learning Perspective
A **hybrid cloud** is a computing environment that connects an organization's **on-premises private cloud** and **third-party public cloud** into a **single, flexible infrastructure** for running the organization's applications and workloads. It lets organizations keep sensitive workloads on-prem while leveraging public cloud elasticity and services for everything else.

**Related variants:**
- **Hybrid monocloud** — a hybrid cloud using **one** cloud provider
- **Hybrid multicloud** — an **open standards-based stack** that can be deployed on **any** public cloud infrastructure (not locked to one vendor)
- **Composite multicloud** — a variant of hybrid multicloud that **distributes a single application across multiple providers**, allowing components to move across cloud services and vendors as needed

### Interview Perspective
**Q: What is a hybrid cloud, and how does it differ from hybrid multicloud?**
> Hybrid cloud connects an organization's on-prem private cloud with a public cloud into one flexible infrastructure. Hybrid *monocloud* does this with a single provider. Hybrid *multicloud* uses an open, standards-based stack that can run on any public cloud vendor — offering more portability and avoiding vendor lock-in.

**Q: What is composite multicloud?**
> A variant of hybrid multicloud where a single application's components are distributed across multiple cloud providers, and those components can be moved between providers as needed — maximizing flexibility and avoiding dependence on any one vendor.

**Common follow-up:** "Why would a company choose hybrid over pure public cloud?" → Regulatory/compliance needs, data sovereignty, latency-sensitive workloads, or gradual migration strategies where legacy systems stay on-prem.

---

### 8. Community Cloud

### Learning Perspective
Per **NIST SP 800-145**, a **community cloud** is:

> "Cloud infrastructure provisioned for exclusive use by a specific community of consumers from organizations that have shared concerns (e.g., mission, security requirements, policy, and compliance considerations). It may be owned, managed, and operated by one or more of the organizations in the community, a third party, or some combination of them, and it may exist on or off premises."

Unlike private cloud (one organization) or public cloud (open to everyone), community cloud sits in between — **shared among a defined group** of organizations with common requirements.

**Why organizations use community cloud:**
- Members operate under the **same set of security controls**
- Provides shared attributes (like citizenship/authorization controls) while giving **limited physical and/or logical access** to resources
- Supports **data localization** and certain **data sovereignty** requirements, based on where the community's data centers are located
- Defines a **perimeter security model** encompassing the whole community

### Interview Perspective
**Q: What is a community cloud, and how is it different from private and public cloud?**
> It's cloud infrastructure shared exclusively among a defined group of organizations with common concerns — like shared security, compliance, or policy requirements. It's more restrictive than public cloud (not open to everyone) but shared beyond a single organization (unlike private cloud). It supports common security controls and data sovereignty requirements across the whole community.

**Q: Give me a real-world reason a group of organizations would choose community cloud over private cloud.**
> Shared compliance or regulatory requirements — e.g., government agencies or healthcare organizations with the same security/policy mandates can pool resources under one community cloud rather than each building separate private clouds, while still avoiding full public cloud multi-tenancy exposure.

---

### 9. Legacy vs. Software-Defined Community Cloud

### Learning Perspective
Traditional (legacy) community clouds established their security perimeter through **physical separation** from other clouds — separate data centers, separate infrastructure. This approach struggled to meet modern **security, manageability, and compliance** demands at scale.

**Software-defined community cloud** (e.g., Google Cloud's approach) delivers the same benefits **without** relying on strict physical infrastructure separation. Google's "assured clouds" approach can:
- **Define communities** around common projects, security/compliance requirements, and policy
- **Separate shared community projects** from other projects
- **Modify boundary capabilities** based on policy-controlled, audited configuration changes

**Comparison table:**

| Characteristic | NIST SP 800-145 Definition | Traditional Community Cloud | Software-Defined Community Cloud |
|---|---|---|---|
| **Infrastructure exclusivity** | Provisioned for exclusive use by a specific community with shared concerns | Separate data centers with separate infrastructure | Each project is effectively a private cloud with isolated infrastructure primitives |
| **Common security controls** | (implied) | Same security controls apply across exclusive shared infrastructure | Assured Workloads controls scoped to the community and enforced via terms of service |
| **Personhood/citizenship of support staff** | May be owned/managed/operated by community organizations, a third party, or combination | Personnel must be physically located at dedicated facilities | Access management restricts support to personnel with required attributes (personhood, citizenship, work location, etc.) |
| **Data localization** | May exist on or off premises | Community-dedicated storage devices | Enforced by software |
| **Defined security perimeter** | (implied) | The community itself is the enclave | Each project is its own enclave |

### Interview Perspective
**Q: How does a software-defined community cloud differ from a traditional one?**
> Traditional community clouds rely on physical separation — dedicated data centers and on-site personnel — to enforce their security perimeter. Software-defined community clouds (like Google Cloud's approach) achieve the same isolation and compliance guarantees through software — policy-controlled access management, cryptographic and logical isolation — without requiring separate physical infrastructure. This makes them faster to provision, easier to manage, and more scalable.

**Q: What's an "infrastructure primitive" in GCP, and how does it relate to community cloud?**
> An infrastructure primitive is any atomic unit of capacity in GCP — a VM, persistent disk, storage bucket, etc. A GCP "project" is a logical grouping of infrastructure primitives, scoped exclusively to that project — creating an isolated "enclave." When you overlay Assured Workloads constraints (data residency, personnel attributes, shared security controls) on top of these project-level private cloud enclaves, they become software-defined community clouds.

⭐ **Frequently tested nuance:** In the software-defined model, the *project* (not the whole community) is the enclave — isolation happens at a finer grain than in traditional community cloud, where the entire community shares one physical enclave.

---

### 10. Benefits of Software-Defined Community Cloud

### Learning Perspective
The software-defined approach brings several advantages over traditional community cloud implementations:

- Meets **security and compliance requirements** without physical infrastructure constraints
- **Faster access** to new hardware, new services, and improvements to existing services
- **Faster onboarding** of new cloud technology
- **Improved overall efficiency**, thanks to the scale of infrastructure available to the community — translating into better **availability and performance**
- **Security enhancements can be scaled and implemented more quickly**

### Interview Perspective
**Q: What are the main benefits of a software-defined community cloud over the traditional model?**
> Faster access to new hardware/services, faster technology onboarding, improved efficiency and performance from operating at cloud-provider scale, and the ability to roll out security enhancements much faster — all while still meeting the community's shared security and compliance requirements.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **BPM** | Business Process Management |
| **Composite multicloud** | A variant of hybrid multicloud that distributes a single application across multiple providers, allowing components to move across cloud services and vendors as needed |
| **CRM** | Customer Relationship Management |
| **HCM** | Human Capital Management |
| **Hybrid cloud** | A computing environment that connects an organization's on-premises private cloud and third-party public cloud into a single, flexible infrastructure for running applications and workloads |
| **Hybrid monocloud** | A hybrid cloud with one cloud provider |
| **Hybrid multicloud** | An open standards-based stack that can be deployed on any public cloud infrastructure |
| **IaaS** | Infrastructure as a Service — delivers fundamental compute, network, and storage resources on-demand, over the network, pay-as-you-go |
| **IoT** | Internet of Things |
| **MDM** | Master Data Management |
| **PaaS** | Platform as a Service — a cloud computing model providing a complete platform (hardware, software, infrastructure) to develop, deploy, manage, and run applications |
| **Pay-as-you-go** | Users order cloud resources from a larger pool and pay for them on a per-use basis |
| **Private Cloud** | Cloud infrastructure provisioned for exclusive use by a single organization comprising multiple consumers (e.g., business units) |
| **Public cloud** | Servers, storage, network, security, and applications delivered as services by cloud providers over the internet, accessible to many customers |
| **SaaS** | Software as a Service — a cloud offering giving users access to a provider's cloud-based software |
| **SIP** | SaaS Integration Platforms |
| **TCO** | Total Cost of Ownership |
| **VM** | Virtual Machine |
| **VPC** | Virtual Private Cloud |

### Interview Perspective on the Glossary
Terms most likely to get confused under interview pressure — worth a second look:

- **Hybrid cloud vs. Hybrid monocloud vs. Hybrid multicloud vs. Composite multicloud** — all four sound alike but differ in **provider count** and **portability**: hybrid cloud (on-prem + public, generic), monocloud (one public provider), multicloud (open-standards, any provider), composite multicloud (single app's components spread and *movable* across providers).
- **Private cloud vs. Community cloud** — private = one organization; community = a defined *group* of organizations with shared concerns.
- **TCO** — often comes up when discussing *why* organizations move to PaaS/SaaS (lower total cost of ownership vs. self-managed infrastructure).

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| IaaS / PaaS / SaaS | Provider manages progressively more: infrastructure → infrastructure+platform → full application |
| IaaS | On-demand compute, network, storage, pay-as-you-go |
| PaaS | Complete platform (hardware+software+infra) for building/running apps; high abstraction |
| SaaS | Fully managed, multitenant software access via subscription |
| Public cloud | Shared infrastructure, delivered over the internet by a provider |
| Private cloud | Exclusive to one organization, regardless of who operates it or where it's hosted |
| Hybrid cloud | On-prem private + public cloud, unified infrastructure |
| Hybrid multicloud | Open-standards, portable across any public cloud vendor |
| Composite multicloud | Single app's components distributed and movable across providers |
| Community cloud | Shared among a defined group of organizations with common security/compliance needs |
| Software-defined community cloud | Achieves community cloud isolation via software/policy instead of physical separation — faster, more scalable |
| GCP infrastructure primitive | Atomic unit of capacity (VM, disk, storage bucket) — projects scope these into isolated enclaves |

---

*Notes organized for both conceptual understanding and rapid interview recall. Star (⭐) topics indicate areas frequently probed in technical interviews.*