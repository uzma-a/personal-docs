# Cloud Computing — Module 2: Networking and Virtualization Basics

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Routing Fundamentals

### Learning Perspective
**Routing** is the process of determining the best path for data to travel from a source to a destination across one or more networks. A **router** examines the destination address of incoming packets and forwards them toward that destination, hop by hop, until they arrive.

Key ideas:
- **Routing table** — a router's map of known networks and the best path to reach each one
- **Static routing** — routes are manually configured and don't change automatically; simple but doesn't adapt to network changes or failures
- **Dynamic routing** — routers exchange information using routing protocols (e.g., OSPF, BGP) to automatically learn and adapt to the best available paths
- **Default gateway** — the router a device sends traffic to when it doesn't know a more specific path

In cloud environments, routing determines how traffic moves between virtual networks, subnets, on-premises infrastructure, and the public internet.

### Interview Perspective
**Q: What is routing, and why does it matter in cloud networking?**
> Routing determines the path data takes across networks to reach its destination. In the cloud, routing controls how traffic flows between VPCs, subnets, on-prem systems, and the internet — misconfigured routes are a common source of connectivity issues.

**Q: Static vs. dynamic routing — what's the difference?**
> Static routes are manually set and fixed; dynamic routes are automatically learned and adjusted by routing protocols in response to network changes. Static is simpler and predictable; dynamic is more resilient and scalable.

---

## 2. IP Addressing

### Learning Perspective
An **IP address** is a unique numerical identifier assigned to a device on a network, enabling it to send and receive data.

- **IPv4** — 32-bit addresses (e.g., `192.168.1.1`), written as four decimal octets; the address space is limited (~4.3 billion addresses), which drove the adoption of techniques like NAT
- **IPv6** — 128-bit addresses, designed to solve IPv4 exhaustion with a vastly larger address space
- **Public IP** — routable on the internet, globally unique
- **Private IP** — used within internal networks (e.g., `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), not routable directly on the internet
- **Subnetting** — dividing a larger network into smaller sub-networks (subnets) for organization, security, and efficient address use, typically expressed via CIDR notation (e.g., `/24`)
- **NAT (Network Address Translation)** — allows devices with private IPs to communicate externally by translating their address to a public one at the network edge

In cloud platforms, IP addressing underlies how VPCs, subnets, and individual resources (VMs, load balancers) are addressed and segmented.

### Interview Perspective
**Q: What's the difference between a public and private IP address?**
> Public IPs are globally unique and routable directly on the internet. Private IPs are used within internal/local networks and aren't directly reachable from the internet — devices with private IPs typically go through NAT to communicate externally.

**Q: Why do we subnet a network?**
> To organize traffic, improve security through isolation, and use IP address space efficiently — e.g., separating a cloud VPC into public-facing and private (database/backend) subnets.

---

## 3. Virtual Private Network (VPN)

### Learning Perspective
A **VPN** creates a secure, encrypted connection ("tunnel") over a public or untrusted network (like the internet), allowing private, protected communication between two points — e.g., a user's device and a corporate network, or two data centers.

Common use cases:
- **Remote access VPN** — lets individual users securely connect to a private network from outside (e.g., employees working from home)
- **Site-to-site VPN** — connects two entire networks (e.g., an on-premises data center and a cloud VPC) as if they were on the same private network

VPNs are foundational to **hybrid cloud** setups, where secure connectivity between on-prem and cloud environments is required.

### Interview Perspective
**Q: What is a VPN, and why is it used in cloud architectures?**
> A VPN creates an encrypted tunnel over a public network, allowing secure, private communication. In cloud architectures, VPNs (especially site-to-site) are commonly used to securely connect on-premises infrastructure to a cloud VPC — a key building block of hybrid cloud connectivity.

**Q: Remote access VPN vs. site-to-site VPN?**
> Remote access VPN connects an individual device to a private network; site-to-site VPN connects two entire networks to each other.

---

## 4. Operating Systems (OS)

### Learning Perspective
An **operating system** is the software layer that manages a computer's hardware resources (CPU, memory, storage, I/O) and provides a platform on which applications run. It handles tasks like process scheduling, memory management, file systems, and device drivers.

In the context of cloud and virtualization, understanding the OS matters because:
- Virtual machines each run their **own guest OS**, independent of the host's OS
- Containers, by contrast, **share the host OS kernel** — a key distinction from VMs (see Virtualization Concepts below)
- Cloud providers offer various OS images (Linux distributions, Windows Server, etc.) as a starting point for compute instances

### Interview Perspective
**Q: Why does the OS matter when discussing virtualization and containers?**
> Because it's the dividing line between the two: VMs each run a full independent guest OS on top of virtualized hardware, while containers share the host's OS kernel and only virtualize at the application/process level — making containers lighter-weight but less isolated than VMs.

---

## 5. Virtualization Concepts

### Learning Perspective
**Virtualization** is the process of creating a virtual (rather than physical) version of a resource — such as a server, storage device, or network — allowing multiple virtual instances to run on a single piece of physical hardware.

Core benefits:
- **Resource efficiency** — better utilization of physical hardware by running multiple workloads on the same machine
- **Isolation** — workloads are logically separated even though they share physical resources
- **Flexibility** — virtual resources can be provisioned, resized, or torn down quickly, without physical hardware changes

Virtualization is the foundational technology that makes modern cloud computing possible — it's what allows a cloud provider to safely and efficiently share physical infrastructure across many customers.

### Interview Perspective
**Q: What is virtualization, and why is it foundational to cloud computing?**
> Virtualization creates virtual versions of physical resources (servers, storage, networks), allowing many isolated virtual instances to share the same physical hardware. It's what makes multi-tenant cloud computing possible — enabling efficient resource use, isolation between customers, and rapid provisioning.

---

## 6. Virtual Machines (VMs)

### Learning Perspective
A **virtual machine** is a software-based emulation of a physical computer — it has its own virtual CPU, memory, storage, and network interface, and runs its own **guest operating system**, independent of the host machine's OS.

Multiple VMs can run on a single physical (host) machine simultaneously, each fully isolated from the others, coordinated by a **hypervisor** (see below).

### Interview Perspective
**Q: What is a virtual machine?**
> A VM is a software emulation of a physical computer, complete with its own virtual hardware and guest OS, running isolated from other VMs on the same physical host — managed by a hypervisor.

**Q: How is a VM different from a container?**
> A VM virtualizes an entire machine, including its own OS — heavier but fully isolated. A container virtualizes at the OS level, sharing the host kernel — lighter-weight and faster to start, but with a thinner isolation boundary.

---

## 7. Host Systems

### Learning Perspective
The **host system** (or host machine) is the physical computer that provides the actual hardware resources (CPU, memory, storage, networking) on which virtual machines run. The host runs a **hypervisor**, which manages and allocates its physical resources among the **guest** VMs.

- **Host OS** — in some virtualization setups (Type 2 hypervisors), the host runs its own OS, with the hypervisor running as an application on top
- **Guest** — any VM running on the host, using resources allocated to it by the hypervisor

### Interview Perspective
**Q: What's the relationship between a host system and the VMs it runs?**
> The host is the physical machine providing real hardware resources. Its hypervisor allocates and manages those resources among multiple guest VMs, each of which believes it has dedicated hardware, even though it's sharing the host's physical resources.

---

## 8. Hypervisors

### Learning Perspective
A **hypervisor** is a small software layer that enables multiple operating systems to run alongside each other, sharing the same physical computing resources. It's the component that makes virtualization possible — creating, running, and managing VMs, and allocating CPU, memory, storage, and network resources to each.

**Two types of hypervisors:**
- **Type 1 (bare-metal)** — runs directly on the host's physical hardware, with no underlying host OS. More efficient and commonly used in enterprise/data center and cloud environments (e.g., VMware ESXi, Microsoft Hyper-V, KVM).
- **Type 2 (hosted)** — runs as an application on top of a conventional host OS (e.g., VirtualBox, VMware Workstation running on Windows/macOS/Linux). Easier to set up, commonly used for local development/testing, but with an extra layer of overhead compared to Type 1.

### Interview Perspective
**Q: What is a hypervisor, and what are the two types?**
> A hypervisor is the software layer enabling multiple OSes to share the same physical hardware. Type 1 (bare-metal) runs directly on hardware — no host OS — and is used in production/cloud/data center environments for efficiency. Type 2 (hosted) runs as an application on top of an existing host OS — simpler to set up, commonly used for local development.

⭐ **Very frequently asked** — be ready to name real examples of each type (Type 1: ESXi, Hyper-V, KVM, Xen; Type 2: VirtualBox, VMware Workstation, Parallels).

---

## 9. Overview of Cloud Infrastructure

### Learning Perspective
Cloud infrastructure is the underlying combination of hardware and software that makes cloud computing services possible. It typically comprises:

- **Physical data centers** — the facilities housing servers, storage, and networking hardware
- **Compute** — processing capacity, delivered as VMs, containers, or bare-metal servers
- **Storage** — persistent data storage in various forms (block, file, object)
- **Networking** — connectivity between resources, data centers, and the internet, including routing, VPNs, load balancing, and firewalls
- **Virtualization layer** — hypervisors and related software that abstract physical hardware into flexible, shareable virtual resources

Cloud providers build and operate this infrastructure at massive scale, then expose it to customers through service models (IaaS/PaaS/SaaS) and deployment models (public/private/hybrid/community).

### Interview Perspective
**Q: What are the core building blocks of cloud infrastructure?**
> Physical data centers, compute, storage, and networking, all coordinated through a virtualization layer that abstracts physical hardware into flexible, multi-tenant virtual resources — which providers then expose via different service and deployment models.

---

## 10. Types of Virtual Machines

### Learning Perspective
VMs can be categorized a few different ways:

- **By hypervisor type** — VMs running on Type 1 (bare-metal) vs. Type 2 (hosted) hypervisors
- **By purpose:**
  - **System VMs** — provide a complete, persistent virtual environment capable of running a full guest OS (the most common "VM" concept in cloud computing)
  - **Process VMs** — run a single program or process in a platform-independent environment (e.g., the Java Virtual Machine), rather than emulating a whole computer
- **By deployment role** — e.g., general-purpose compute VMs, memory-optimized VMs, GPU-accelerated VMs, burstable/low-cost VMs — most cloud providers offer VM "families" or "instance types" tuned for different workloads (compute-heavy, memory-heavy, storage-heavy, etc.)

### Interview Perspective
**Q: What are the different types of virtual machines?**
> Broadly, system VMs emulate an entire computer and run a full guest OS (what most people mean by "VM" in cloud contexts), while process VMs (like the JVM) provide an isolated runtime for a single program. Cloud providers also offer VM instance types/families optimized for different workloads — compute-optimized, memory-optimized, GPU-accelerated, and so on.

---

## 11. Bare Metal Servers

### Learning Perspective
A **bare metal server** is a physical server dedicated entirely to a single customer/tenant — with **no hypervisor or virtualization layer** in between (or, if virtualization is used, the customer has full control over it themselves).

Key characteristics:
- **No "noisy neighbor" problem** — since resources aren't shared with other tenants, performance is fully dedicated and predictable
- **Full hardware access and control** — useful for workloads with strict performance, compliance, or licensing requirements
- **Higher cost, less elasticity** — compared to virtualized cloud instances, bare metal is less flexible to scale up/down quickly

Bare metal is often chosen for high-performance computing, certain regulatory/compliance scenarios, or specialized licensing requirements (e.g., software licensed per physical core).

### Interview Perspective
**Q: What is a bare metal server, and when would you choose it over a virtualized cloud instance?**
> A bare metal server is a physical server dedicated to a single tenant, with no shared virtualization layer. You'd choose it when you need predictable, dedicated performance (no "noisy neighbors"), full hardware control, or need to meet compliance/licensing requirements that require dedicated physical hardware — trading off some elasticity and higher cost.

---

## 12. Secure Networking in the Cloud

### Learning Perspective
Securing cloud networks involves multiple layers working together:

- **VPCs (Virtual Private Clouds)** — logically isolated network environments within a public cloud, letting customers define their own IP ranges, subnets, and routing
- **Security groups / network ACLs** — firewall-like rules controlling inbound/outbound traffic at the instance or subnet level
- **Firewalls** — filter traffic based on defined rules, often placed at network entry/exit points
- **VPNs and private connectivity** — encrypted tunnels or dedicated private links (e.g., AWS Direct Connect, Azure ExpressRoute) for secure hybrid connectivity, avoiding exposure to the public internet
- **Encryption in transit** — protecting data as it moves across the network (e.g., TLS)
- **Least privilege network access** — only opening the specific ports/protocols/IP ranges actually required, minimizing attack surface

Together, these layers implement **defense in depth** — no single control is relied upon exclusively to secure cloud network traffic.

### Interview Perspective
**Q: How is network security typically implemented in the cloud?**
> Through layered controls: VPCs for logical network isolation, security groups/ACLs and firewalls to control traffic flow, VPNs or dedicated private links for secure hybrid connectivity, encryption in transit, and least-privilege network rules — together forming a defense-in-depth approach rather than relying on any single control.

**Q: What's the difference between a security group and a network ACL (in cloud terms)?**
> Security groups are typically stateful and applied at the instance level (return traffic is automatically allowed); network ACLs are typically stateless and applied at the subnet level (both inbound and outbound rules must be explicitly defined). Security groups control what reaches an individual resource; ACLs control traffic at the subnet boundary.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Routing | Determines the path data takes across networks; static = fixed, dynamic = auto-adapting |
| IP addressing | Public = internet-routable; private = internal-only, needs NAT to reach the internet |
| VPN | Encrypted tunnel over a public network; site-to-site connects whole networks (key for hybrid cloud) |
| Operating System | Manages hardware resources; VMs each run their own guest OS, containers share the host kernel |
| Virtualization | Creates virtual versions of physical resources; foundation of multi-tenant cloud computing |
| Virtual Machine | Software emulation of a full computer, with its own guest OS, managed by a hypervisor |
| Host system | Physical machine providing real hardware, running the hypervisor that manages guest VMs |
| Hypervisor | Software layer enabling multiple OSes to share hardware; Type 1 = bare-metal, Type 2 = hosted |
| Cloud infrastructure | Data centers + compute + storage + networking + virtualization layer |
| Types of VMs | System VMs (full OS) vs. process VMs (single program, e.g., JVM); also instance "families" by workload |
| Bare metal server | Dedicated physical server, no shared virtualization layer — predictable performance, less elastic |
| Secure cloud networking | VPCs, security groups/ACLs, firewalls, VPNs/private links, encryption in transit, least privilege |

---

*Notes organized for both conceptual understanding and rapid interview recall. Star (⭐) topics indicate areas frequently probed in technical interviews.*