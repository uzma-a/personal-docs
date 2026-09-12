# Cloud Computing — Module 1: Fundamentals of Cloud Computing

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. What Is Cloud Computing?

### Learning Perspective
Cloud computing is the **delivery of on-demand computing resources over the internet on a pay-as-you-go basis**. Resources — compute, storage, networking, databases, and more — are **dynamically assigned and reassigned among multiple users**, and they **scale up and down** automatically in response to demand.

The core idea: instead of owning and managing physical infrastructure, you consume computing as a **utility** — similar to electricity or water — paying only for what you use, when you use it.

**Key characteristics baked into this definition:**
- **On-demand** — resources are available when needed, without lengthy provisioning
- **Pay-as-you-go** — cost tracks actual consumption, not fixed capacity
- **Dynamic allocation** — the same physical infrastructure serves many users, reassigned as needs shift
- **Elastic scaling** — capacity grows or shrinks automatically with demand

### Interview Perspective
**Q: What is cloud computing, in your own words?**
> Cloud computing delivers computing resources — servers, storage, networking, software — over the internet on demand, with a pay-as-you-go pricing model. Resources are dynamically shared among users and scale automatically based on need, rather than requiring you to own and manage fixed hardware.

**Formal definition to have ready (NIST-style):** "A model for enabling convenient, on-demand network access to a shared pool of configurable computing resources that can be rapidly provisioned and released with minimal management effort or service provider interaction."

---

## 2. Origins of Cloud Computing

### Learning Perspective
Cloud computing didn't appear overnight — it evolved from decades of infrastructure innovation:

- **1950s mainframes** — the earliest roots. Multiple users shared time on a single, powerful mainframe computer (a precursor to the "shared resource pool" idea central to cloud computing today).
- **Virtualization technologies and hypervisors** — the real catalysts for *modern* cloud computing. Virtualization allowed a single physical machine to be split into multiple isolated virtual machines, and hypervisors made it possible to run multiple operating systems on shared hardware efficiently. This decoupling of software from physical hardware is what made elastic, multi-tenant cloud infrastructure practical.

### Interview Perspective
**Q: Where did cloud computing come from — what's the historical lineage?**
> It traces back to 1950s mainframes, where multiple users shared time on one machine. But the real catalyst for *modern* cloud computing was the development of virtualization and hypervisor technology, which made it possible to run multiple isolated operating systems on the same physical hardware — the foundation of multi-tenant, elastic cloud infrastructure.

**Good follow-up to expect:** "What's a hypervisor?" → See the glossary below — a small software layer enabling multiple OSes to share the same physical resources.

---

## 3. Cloud Adoption Strategy

### Learning Perspective
Moving to the cloud isn't just a technical decision — it's a strategic one. Organizations must weigh:

- **Business needs** — what problems is the cloud meant to solve? (cost, agility, scale, innovation speed?)
- **Investment viability** — does the cost/benefit case justify the move, both short- and long-term?
- **Risk capacity** — how much disruption, uncertainty, or change can the organization tolerate?

A sound adoption strategy delivers the desired benefits **without** causing:
- Business disruptions
- Security issues
- Compliance issues
- Performance issues

In other words, a good cloud strategy balances ambition (agility, innovation, cost savings) against operational risk (stability, security, regulatory exposure).

### Interview Perspective
**Q: What should an organization consider before adopting cloud technology?**
> Business needs (why move?), investment viability (is it worth it financially?), and risk capacity (how much disruption can we absorb?). The goal is a strategy that delivers real benefits without introducing security, compliance, or performance problems.

**Interviewer-favorite framing:** "It's not just 'can we do it technically' — it's 'should we, and how do we do it safely.'"

---

## 4. The Cloud Market & Major Providers

### Learning Perspective
Cloud adoption is growing **faster than originally predicted**. This growth is driven by cloud service providers offering an expanding range of service types:

- **Infrastructure services (IaaS)**
- **Platform services (PaaS)**
- **Software services (SaaS)**

**Major cloud providers today** include:
- **AWS** (Amazon Web Services)
- **Alibaba Cloud**
- **Google** (Google Cloud Platform / GCP)
- **IBM** (IBM Cloud)
- **Microsoft Azure**

These providers compete by offering breadth of services, global infrastructure footprint, pricing models, and specialized capabilities (AI/ML, IoT, industry-specific solutions, etc.).

### Interview Perspective
**Q: Name some major cloud providers and the general categories of services they offer.**
> AWS, Alibaba Cloud, Google Cloud, IBM Cloud, and Microsoft Azure are major providers. They generally offer services across three categories: Infrastructure as a Service, Platform as a Service, and Software as a Service.

**Tip:** If asked to elaborate on IaaS/PaaS/SaaS specifically, that's covered in more depth in Module 3 (Cloud Service Models) — but you should at least be able to name the three tiers confidently here.

---

## 5. Why Businesses Are Moving to the Cloud

### Learning Perspective
Cloud adoption enables enterprises — **large and small** — to be:
- **Agile** — respond quickly to changing market conditions
- **Innovative** — experiment and launch new capabilities faster, without heavy upfront infrastructure investment
- **Competitive** — keep pace with (or outpace) rivals
- Able to **create differentiated customer experiences** — cloud-enabled speed and scale translate into better products and services

This has shifted the strategic question organizations ask. It's no longer:
> "*Should* we move to the cloud?"

It's now:
> "*What strategy* should we adopt to move to the cloud?"

This reflects how mainstream and expected cloud adoption has become — the debate has moved from "if" to "how."

### Interview Perspective
**Q: Why are organizations moving to the cloud, and how has the conversation around cloud adoption changed?**
> Cloud adoption enables agility, innovation, competitiveness, and differentiated customer experiences. The strategic question has shifted from "should we adopt cloud" to "what's our cloud adoption strategy" — cloud is now the default assumption, not a debated option.

---

## 6. Case Studies — Real-World Cloud Impact

### Learning Perspective
Concrete examples help ground the abstract benefits of cloud adoption:

| Company | How they used the cloud |
|---|---|
| **American Airlines** | Adopted cloud technologies to deliver customer value **rapidly** across the enterprise |
| **UBank** | Leveraged cloud **platform services** to give developers more control, **removing barriers to innovation** |
| **Bitly** | Leveraged cloud **scalability** for **low-latency delivery** to geographically dispersed enterprise customers |
| **ActivTrades** | Leveraged cloud **infrastructure, storage, network, and security** offerings to **accelerate execution and delivery** of new functions in their online trading systems |

Each case highlights a different cloud benefit: speed (American Airlines), developer autonomy (UBank), scalability/latency (Bitly), and comprehensive infrastructure acceleration (ActivTrades).

### Interview Perspective
**Q: Can you give a real-world example of a company benefiting from cloud adoption?**
> Sure — Bitly used cloud scalability to deliver low-latency service to a geographically dispersed customer base. Or: ActivTrades used cloud infrastructure, storage, network, and security services to accelerate delivery of new trading system features.

**Interview tip:** Pick *one* case study you can describe fluently in 15–20 seconds rather than trying to recall all four under pressure — depth on one beats a shallow list of four.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **AI** | Artificial intelligence |
| **Blockchain** | An immutable network allowing members to view only those transactions that are relevant to them |
| **Broad Network Access** | Cloud computing resources can be accessed through the network |
| **Cloud computing** | A model for enabling convenient, on-demand network access to a shared pool of configurable computing resources that can be rapidly provisioned and released with minimal management effort or service provider interaction |
| **GCP** | Google Cloud Platform |
| **Hypervisor** | A small software layer that enables multiple operating systems to run alongside each other, sharing the same physical computing resources |
| **IDC** | International Data Corporation |
| **IoT** | Internet of Things |
| **Measured Service** | You only pay for what you use or reserve as you go |
| **NIST** | National Institute of Standards and Technology |
| **PaaS** | Platform as a Service |
| **Pay-As-You-Go** | Users can order cloud resources from a larger pool of available resources and pay for them on a per-use basis |
| **POP** | Point of Presence |
| **Rapid Elasticity** | You can increase or decrease resources as per your demand because of the elastic property of the cloud |
| **SaaS** | Software as a Service |
| **Utility Model of Billing** | You are charged after the usage, at the end of a pre-defined billing period |
| **VM** | Virtual Machine |

### Interview Perspective on the Glossary
These terms show up constantly as rapid-fire definition questions. A few worth double-checking you can define **without hesitation**, since they're the ones most likely to trip people up:

- **Measured Service vs. Pay-As-You-Go vs. Utility Model of Billing** — these sound similar but describe related-but-distinct billing concepts: Measured Service is about *tracking* usage, Pay-As-You-Go is about *ordering/paying per use*, and Utility Model is about *billing timing* (charged after usage, at period end).
- **Rapid Elasticity vs. Broad Network Access** — elasticity is about *scaling resources*; broad network access is about *how* those resources are reached (over the network, from various devices).
- **Hypervisor** — always comes up alongside virtualization questions; know it cold (small software layer enabling multiple OSes to share physical hardware).

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Cloud computing | On-demand computing resources delivered over the internet, pay-as-you-go, dynamically shared, elastic |
| Origins | 1950s mainframes → virtualization & hypervisors as the real catalyst for modern cloud |
| Adoption strategy | Balance business needs, investment viability, and risk capacity |
| Major providers | AWS, Alibaba Cloud, Google Cloud, IBM Cloud, Microsoft Azure |
| Why adopt cloud | Agility, innovation, competitiveness, differentiated customer experience |
| Strategic shift | From "should we?" to "what's our strategy?" |
| Case study to remember | Bitly → scalability for low-latency global delivery |
| Hypervisor | Software layer letting multiple OSes share the same physical hardware |
| NIST cloud definition | On-demand, shared pool, rapidly provisioned/released, minimal management effort |

---
