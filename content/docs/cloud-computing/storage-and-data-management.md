# Cloud Computing — Module 4: Storage and Data Management

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general industry knowledge, matching Module 4 of your NAV (Basics of Storage, File Storage, Block Storage, Object Storage Overview, Object Storage Tiers & APIs, CDN). Worth cross-checking against your actual course material for alignment, same as the networking file.

---

## 1. Basics of Storage on Cloud

### Learning Perspective
Cloud storage is the practice of storing data on remote servers managed by a cloud provider, accessed over the network, rather than on local hardware you own and maintain. The provider handles the underlying physical infrastructure — redundancy, durability, and availability — while you consume storage as a service, typically on a pay-as-you-go basis.

**Core properties cloud storage aims to deliver:**
- **Durability** — the probability that stored data won't be lost over time (often expressed as "eleven 9s," i.e., 99.999999999% durability)
- **Availability** — how reliably the data can be accessed when requested
- **Scalability** — the ability to grow storage capacity without manual hardware provisioning
- **Redundancy** — data is typically replicated across multiple devices, and often multiple physical locations, to protect against hardware failure

**Three broad storage types**, each suited to different use cases (covered in detail below):
- **File storage** — data organized in a hierarchical folder structure
- **Block storage** — data split into fixed-size blocks, addressed independently
- **Object storage** — data stored as discrete objects with metadata, in a flat namespace

### Interview Perspective
**Q: What is cloud storage, and what are its core properties?**
> Cloud storage is remotely hosted, provider-managed storage accessed over a network, offering durability, availability, scalability, and redundancy without the customer having to manage physical hardware. The three main types are file, block, and object storage, each suited to different workloads.

**Q: Why does durability matter, and how is it typically expressed?**
> Durability measures the likelihood data won't be lost — commonly expressed in "9s" (e.g., 99.999999999% or "eleven 9s"). It's a key differentiator between storage tiers/providers and directly affects how safe your data is against underlying hardware failures.

---

## 2. File Storage

### Learning Perspective
**File storage** organizes data in a **hierarchical structure** of files and folders/directories, much like a traditional file system on a computer. Files are accessed via a **file path** (e.g., `/reports/2026/q1/summary.docx`).

**Key characteristics:**
- Familiar, human-readable organization — folders within folders
- Supports standard file-system protocols like **NFS** (Network File System) and **SMB/CIFS**, allowing multiple clients/servers to mount and access the same file system concurrently
- Well-suited for **shared file access** scenarios — multiple users or applications reading/writing to a common file set

**Common use cases:** shared application data, content management systems, home directories, development environments, and legacy applications built around a traditional file-system interface.

### Interview Perspective
**Q: What is file storage, and when would you use it?**
> File storage organizes data hierarchically in files and folders, accessed via file paths and standard protocols (NFS/SMB), allowing multiple systems to share the same file system. It's ideal when applications expect a traditional file-system interface or need concurrent shared access — e.g., shared drives, CMS platforms, or legacy apps.

---

## 3. Block Storage

### Learning Perspective
**Block storage** splits data into **fixed-size blocks**, each with its own unique address, but **no inherent metadata or hierarchy** describing what the block belongs to. An operating system or application is responsible for assembling blocks into meaningful files or structures — similar to how a traditional hard drive works.

**Key characteristics:**
- **Low-latency, high-performance** — blocks can be read/written independently and very quickly, since there's no file-system overhead at the storage layer itself
- Typically attached to a **single compute instance** at a time (like a virtual hard disk)
- The OS/application layer manages formatting, file systems, and structure on top of the raw blocks

**Common use cases:** databases, virtual machine disks/boot volumes, and any workload requiring **fast, low-latency, transactional read/write performance**.

### Interview Perspective
**Q: What is block storage, and why is it fast?**
> Block storage splits data into independently addressable, fixed-size blocks with no built-in metadata or structure — the OS/application manages the file system on top. It's fast because there's minimal storage-layer overhead; blocks can be read/written directly, which is why it's the go-to choice for databases and VM disks.

**Q: File storage vs. block storage — what's the core difference?**
> File storage has built-in hierarchy and metadata (folders, file paths) and supports shared access across multiple clients. Block storage is raw, low-level, addressable chunks of data with no inherent structure, typically attached to a single instance, optimized for speed over shared accessibility.

---

## 4. Object Storage Overview

### Learning Perspective
**Object storage** stores data as discrete **objects**, each consisting of:
- The **data itself**
- **Metadata** — descriptive information about the object (custom or system-generated)
- A **unique identifier** (often a key or URL), used to retrieve it

Unlike file storage, object storage uses a **flat namespace** rather than a nested folder hierarchy — objects are typically grouped into **buckets** (or containers), but there's no true nested directory structure underneath (any "folder-like" appearance is usually just a naming convention using prefixes/delimiters in the key).

**Key characteristics:**
- **Virtually unlimited scalability** — designed to store massive volumes of unstructured data
- **Accessed via HTTP-based APIs** (typically REST) rather than traditional file-system protocols
- **Rich metadata support** — enables powerful search, categorization, and lifecycle management
- Generally **not suited for frequent, in-place modification** — objects are usually replaced wholesale rather than partially edited, unlike block storage

**Common use cases:** backups and archives, static website assets, media files (images/video), data lakes, and large-scale unstructured data storage.

### Interview Perspective
**Q: What is object storage, and how is it different from file and block storage?**
> Object storage stores data as self-contained objects (data + metadata + unique identifier) in a flat namespace, accessed via HTTP APIs — unlike file storage's hierarchical folders or block storage's raw, low-level blocks. It's built for massive scalability and rich metadata, making it ideal for unstructured data like backups, media, and data lakes — though it's less suited to frequent in-place edits or low-latency transactional access.

**Q: Why is object storage described as having a "flat" namespace?**
> Because there's no true nested directory structure underneath — objects live in buckets, and any folder-like organization you see is usually simulated through naming conventions (prefixes/delimiters in the object key), not an actual hierarchical file system.

---

## 5. Object Storage Tiers and APIs

### Learning Perspective
Cloud providers typically offer multiple **storage tiers/classes** for object storage, letting customers balance **cost vs. access frequency/latency**:

- **Hot/Standard tier** — for frequently accessed data; highest cost per GB, lowest retrieval cost/latency
- **Cool/Infrequent Access tier** — for data accessed less often; lower storage cost, higher retrieval cost
- **Cold/Archive tier** — for rarely accessed data (e.g., long-term backups, compliance archives); lowest storage cost, but retrieval can take minutes to hours and typically costs more per request

Many providers also offer **lifecycle policies** — rules that automatically transition objects between tiers (or delete them) based on age or access patterns, reducing storage costs without manual intervention.

**Object storage APIs:**
- Almost universally **RESTful, HTTP-based APIs** — operations like `PUT` (upload), `GET` (retrieve), `DELETE` (remove), and `LIST` (enumerate objects in a bucket)
- Many providers offer **S3-compatible APIs** (modeled after Amazon S3's interface), which has become something of a de facto standard, letting some tools/SDKs work across multiple providers with minimal changes
- Typically support **presigned URLs** — temporary, authenticated links that grant time-limited access to a specific object without exposing full credentials

### Interview Perspective
**Q: Why do cloud providers offer multiple object storage tiers?**
> To let customers optimize cost against access patterns — hot tiers for frequently accessed data (higher storage cost, cheap/fast retrieval), cold/archive tiers for rarely accessed data (cheap storage, slower/costlier retrieval). Lifecycle policies can automate moving data between tiers as it ages, cutting costs without manual work.

**Q: How do applications typically interact with object storage?**
> Through RESTful HTTP APIs — basic operations like PUT, GET, DELETE, and LIST. Many providers offer S3-compatible APIs, which has become a common standard, and support presigned URLs for secure, time-limited access to specific objects.

⭐ **Frequently asked follow-up:** "How would you reduce storage costs for old, rarely accessed data?" → Use lifecycle policies to automatically transition it to a cold/archive tier after a defined period of inactivity.

---

## 6. Content Delivery Network (CDN)

### Learning Perspective
A **Content Delivery Network (CDN)** is a globally distributed network of **edge servers (points of presence/POPs)** that cache and deliver content **closer to end users**, reducing latency and offloading traffic from the origin server.

**How it works, at a high level:**
1. A user requests content (e.g., an image, video, or webpage asset)
2. The CDN routes the request to the **nearest edge server** (based on geographic/network proximity)
3. If the edge server already has a cached copy, it serves the content directly (**cache hit**) — fast, no trip back to the origin
4. If not cached (**cache miss**), the edge server fetches it from the **origin server**, caches it, and serves it — subsequent nearby requests then hit the cache

**Key benefits:**
- **Reduced latency** — content is served from a location physically closer to the user
- **Reduced origin load** — cached content doesn't need to be re-fetched from the origin for every request
- **Improved availability/resilience** — distributing load across many edge locations reduces the risk of any single point of failure, and some CDNs can also absorb/mitigate traffic spikes and certain types of DDoS attacks
- **Better handling of traffic spikes** — geographically distributed caching helps absorb sudden surges in demand

**Common use cases:** static website assets (images, CSS, JS), video streaming, software/large file downloads, and API acceleration.

### Interview Perspective
**Q: What is a CDN, and why is it useful?**
> A CDN is a globally distributed network of edge servers that cache content closer to end users, reducing latency and offloading traffic from the origin server. It improves performance, resilience, and the ability to handle traffic spikes — commonly used for static assets, video streaming, and large downloads.

**Q: Walk me through what happens on a cache miss.**
> The request reaches the nearest edge server, which doesn't have the content cached yet. The edge server fetches it from the origin, caches a copy locally, and serves it to the user — future nearby requests for that same content then get served directly from the cache (a cache hit), without hitting the origin again.

**Good follow-up to prepare for:** "How does a CDN relate to object storage?" → CDNs are frequently placed in front of object storage buckets (e.g., serving static assets or media files stored as objects) to reduce latency and origin load for globally distributed users.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Cloud storage basics | Remote, provider-managed storage focused on durability, availability, scalability, redundancy |
| File storage | Hierarchical folders/files, accessed via NFS/SMB, good for shared access |
| Block storage | Fixed-size, independently addressable blocks; low-latency; used for databases and VM disks |
| Object storage | Data + metadata + unique ID in a flat namespace, accessed via HTTP APIs; great for unstructured data at scale |
| Object storage tiers | Hot (frequent access, costly storage) → Cool → Cold/Archive (cheap storage, slow/costly retrieval); lifecycle policies automate transitions |
| Object storage APIs | RESTful HTTP (PUT/GET/DELETE/LIST); S3-compatible APIs are a common standard; presigned URLs for temporary access |
| CDN | Distributed edge servers caching content closer to users — reduces latency, offloads origin, improves resilience |

---