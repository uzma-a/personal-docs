# Kubernetes Ecosystem & Architecture

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. What Is Kubernetes?

### Learning Perspective
**Kubernetes** is the **de facto open-source platform standard** for **container orchestration**. It was **developed by Google** and is **maintained by the Cloud Native Computing Foundation (CNCF)**.

**Kubernetes automates container management tasks**, including:
- **Deployment**
- **Storage provisioning**
- **Load balancing**
- **Scaling**
- **Service discovery**
- **Fixing (healing) failed containers**

Its **open-source toolset and wide array of functionalities** make it very attractive to **leading cloud providers** — who both **support it**, and in many cases, also offer **fully managed Kubernetes services** (e.g., EKS on AWS, GKE on Google Cloud, AKS on Azure).

**Container Orchestration**, more generally, is the **process that automates the container lifecycle** of containerized applications — everything from initial deployment through scaling, networking, and eventual teardown, across potentially many containers running on many machines.

### Interview Perspective
**Q: What is Kubernetes, and why did it become the de facto standard for container orchestration?**
> Kubernetes is an open-source container orchestration platform, originally developed by Google and now maintained by the CNCF. It became the de facto standard because it automates essentially the entire container lifecycle — deployment, scaling, load balancing, service discovery, storage provisioning, and self-healing — through a robust, open-source, extensible toolset that's now supported by every major cloud provider, many of whom offer fully managed Kubernetes services.

**Q: What problem does container orchestration solve that plain Docker alone doesn't?**
> Docker handles running individual containers on a single machine well, but doesn't natively solve the problems of running and coordinating *many* containers across *many* machines — scheduling them onto available capacity, restarting failed ones, scaling up/down based on load, routing traffic to the right instances, and managing rolling updates. Orchestration platforms like Kubernetes automate exactly these cluster-level concerns.

---

## 2. Clusters, Nodes & the Control Plane / Data Plane Split

### Learning Perspective
- **Cluster** — a **set of worker machines**, called **nodes**, that **run containerized applications**. Every cluster has **at least one worker node**.
- **Node** — the **worker machine** in a Kubernetes cluster. **User applications run on nodes.** Nodes can be **virtual or physical machines**. Each node is **managed by the control plane** and is able to **run Pods**.

A Kubernetes cluster is architecturally split into two layers:

- **Control plane** — the **container orchestration layer** that **exposes the API and interfaces** to **define, deploy, and manage** the lifecycle of containers. This is the cluster's "brain" — making scheduling decisions, watching cluster state, and reacting to changes.
- **Data (Worker) Plane** — the layer that provides **capacity** — **CPU, memory, network, and storage** — so that **containers can actually run** and connect to a network. This is where your actual application workloads execute.

```
Control Plane  (decides WHAT should run, WHERE)
      ↓
Data Plane / Nodes  (actually RUNS the containers)
```

### Interview Perspective
**Q: What's the difference between the control plane and the data (worker) plane in Kubernetes?**
> The control plane is the decision-making layer — it exposes the Kubernetes API, tracks the cluster's desired vs. actual state, and decides what should run where. The data/worker plane is where that work actually executes — the nodes providing the real CPU, memory, network, and storage capacity that containers run on. The control plane directs; the worker nodes do the actual work.

**Q: What's the relationship between a cluster and a node?**
> A cluster is the overall Kubernetes deployment — a set of worker machines (nodes) that together run your containerized applications, managed collectively by the control plane. A node is one individual worker machine within that cluster (virtual or physical), capable of running one or more Pods.

---

## 3. Control Plane Components

### Learning Perspective
The control plane is made up of several distinct components, each with a specific responsibility:

- **Kubernetes API Server** — **validates and configures data** for the API objects (Pods, services, replication controllers, and others). It **services REST operations** and **provides the frontend** to the cluster's shared state, through which **all other components interact** — effectively the central hub every other piece of Kubernetes (and every `kubectl` command) talks to.

- **etcd** — a **highly available key-value store** that contains **all the cluster data**. For any deployment, the **deployment configuration is stored in etcd** — it's the **source of truth for the state** in a Kubernetes cluster, and the system continuously works to **bring the cluster state into line with what's stored in `etcd`**.

- **kube-scheduler** — a control plane component that **watches for newly created Pods with no assigned node**, and **selects a node for them to run on** — the component responsible for the actual scheduling/placement decision.

- **Kubernetes Controller Manager** — **runs all the controller processes** that **monitor the cluster state** and **ensure the actual state matches the desired state**. Examples of controllers shipped with Kubernetes include the replication controller, endpoints controller, namespace controller, and service accounts controller.

- **Cloud Controller Manager** — a control plane component that **embeds cloud-specific control logic**. It lets you **link your cluster into your cloud provider's API**, and **separates out** the components that interact with that specific cloud platform from the components that only interact with your cluster directly — keeping Kubernetes's core logic cloud-agnostic.

### Interview Perspective
**Q: What is `etcd`, and why is it described as the "source of truth" for a Kubernetes cluster?**
> `etcd` is a highly available key-value store holding all the cluster's configuration and state data. It's the source of truth because every other Kubernetes component ultimately reads from (or writes changes toward) what's recorded in `etcd` — the entire system continuously works to reconcile the cluster's actual, observed state with whatever is stored there, rather than any component independently deciding what the "real" desired state is.

**Q: What does the `kube-scheduler` actually do?**
> It watches for Pods that have been created but haven't yet been assigned to a node, and decides which node each such Pod should run on — based on factors like available resources, constraints, and scheduling policies — then assigns it accordingly.

**Q: What's the purpose of the Cloud Controller Manager?**
> It isolates cloud-provider-specific integration logic (e.g., provisioning a load balancer through AWS's or GCP's specific API) into its own dedicated component, keeping the rest of Kubernetes's core control plane logic completely cloud-agnostic. This is what lets the same core Kubernetes distribution run consistently across different cloud providers (or on-premises), with only the Cloud Controller Manager needing to be swapped for the specific environment.

⭐ **Frequently asked** — be ready to name and briefly describe each control plane component; this is a very common "explain Kubernetes architecture" interview request.

---

## 4. Node-Level Components: Kubelet, Kube-Proxy, Container Runtime

### Learning Perspective
On each individual **node**, a few key components do the actual work of running containers:

- **Kubelet** — the **primary "node agent"** that runs on each node. The kubelet takes a set of **PodSpecs** (a YAML or JSON object describing a Pod), provided primarily through the **apiserver**, and **ensures the containers described in those PodSpecs are running and healthy**. **The kubelet doesn't manage containers which were not created by Kubernetes** — it only concerns itself with Kubernetes-managed workloads.

- **Kubernetes Proxy (`kube-proxy`)** — a **network proxy** that runs on **each node** in a cluster. This proxy **maintains network rules** that allow **communication to Pods running on nodes** — i.e., communication to workloads running on the cluster. A user must **create a service** with the apiserver API to **configure the proxy**.

- **Container Runtime** — the **software responsible for actually running containers** on a node — the low-level engine that does the actual container execution (e.g., containerd, CRI-O — Kubernetes is designed to work with any runtime conforming to the Container Runtime Interface, CRI).

### Interview Perspective
**Q: What is the kubelet, and what's its scope of responsibility?**
> The kubelet is the primary agent running on each node — it receives PodSpecs (typically from the API server) and ensures the containers described in them are actually running and healthy on that node. Importantly, it only manages containers that Kubernetes itself created — it doesn't interfere with or manage any other, unrelated containers that might happen to be running on that same machine.

**Q: What role does `kube-proxy` play?**
> It runs on every node and maintains the network rules enabling communication to Pods running on that node — effectively implementing the networking behavior behind Kubernetes Services, so traffic directed at a Service correctly reaches one of the actual backing Pods, regardless of which node they're scheduled on.

**Q: How does Kubernetes relate to the actual container runtime doing the work?**
> Kubernetes itself doesn't run containers directly — it delegates that to a separate container runtime (like containerd or CRI-O) via a standardized interface (CRI, the Container Runtime Interface). This decouples Kubernetes's orchestration logic from any one specific container runtime implementation, letting different runtimes be used interchangeably.

---

## 5. Core Kubernetes Objects: Pods, ReplicaSets, Deployments

### Learning Perspective
- **Pod** — the **smallest and simplest Kubernetes object**. Represents a **process running in a cluster**; also represents a **single instance of an application** running in the cluster. **Usually, a Pod wraps a single container**, but in some cases **encapsulates multiple tightly coupled containers** that **share resources** (network, storage).

- **ReplicaSet** — **aims to maintain a set of replica Pods running at any given time** — ensuring a specified number of identical Pod copies are always up and running, replacing any that fail or are removed.

- **Deployment** — an **object that provides updates for both Pods and ReplicaSets**. **Deployments run multiple replicas of an application** by **creating ReplicaSets**, and offer **additional management capabilities** on top of those ReplicaSets (like rolling updates and rollback). **Deployments are suitable for stateless applications.**

**The typical management hierarchy:** you almost never manage ReplicaSets or Pods directly in practice — you define a **Deployment**, which creates and manages a **ReplicaSet**, which in turn creates and manages the actual **Pods**.

```
Deployment
   └── ReplicaSet
          └── Pod, Pod, Pod, ...
```

### Interview Perspective
**Q: What's the relationship between a Pod, a ReplicaSet, and a Deployment?**
> A Pod is the smallest deployable unit — typically wrapping a single container (or occasionally several tightly-coupled ones). A ReplicaSet ensures a specified number of identical Pod replicas are always running, replacing any that fail. A Deployment sits on top of ReplicaSets, managing them and adding capabilities like rolling updates and rollback — in practice, you typically define and manage Deployments directly, letting them handle creating and managing the underlying ReplicaSets and Pods for you.

**Q: Why does a Deployment sometimes wrap multiple containers in a single Pod, and when would you do this?**
> A Pod can encapsulate multiple tightly-coupled containers when those containers genuinely need to share resources — the same network namespace and, optionally, storage volumes — and are meant to be scheduled, scaled, and lifecycle-managed together as a single unit (a common pattern being a "sidecar" container providing supporting functionality, like logging or a proxy, alongside a main application container).

⭐ **Extremely frequently asked** — the Pod → ReplicaSet → Deployment hierarchy is one of the single most common Kubernetes fundamentals questions.

---

## 6. Other Workload Objects: StatefulSet, DaemonSet, Job

### Learning Perspective
Beyond Deployments (for stateless apps), Kubernetes offers other workload controllers for different needs:

- **StatefulSet** — **manages the deployment and scaling of a set of Pods**, and **provides guarantees about the ordering and uniqueness** of these Pods. Used for **stateful applications** (like databases) that need stable, unique network identities and persistent storage tied to a specific Pod instance, unlike the interchangeable Pods a Deployment manages.

- **DaemonSet** — **ensures a copy of a Pod is running across a set of nodes** in a cluster — typically **every** node (or a specified subset). Commonly used for cluster-wide infrastructure concerns — like log collection agents, monitoring agents, or networking components that need to run on every single node.

- **Job** — a **finite or batch task that runs to completion** — unlike a Deployment's Pods (meant to run indefinitely), a Job's Pods are expected to **finish**, and the Job tracks that successful completion, optionally retrying on failure.

- **Batch execution** — the broader capability this supports: **manages batch and continuous integration workloads**, and **automatically replaces failed containers**, if configured — Jobs are the primary Kubernetes object implementing this pattern.

### Interview Perspective
**Q: When would you use a StatefulSet instead of a Deployment?**
> When your application needs stable, unique identities per Pod instance and/or persistent storage tied to a specific Pod — like a database cluster, where each replica needs a consistent identity and its own dedicated storage across restarts. Deployments treat their Pods as interchangeable, disposable replicas — fine for stateless applications, but insufficient when ordering, uniqueness, and stable per-instance storage genuinely matter.

**Q: What's a DaemonSet used for, and how is it different from a Deployment?**
> A DaemonSet ensures exactly one copy of a specific Pod runs on every node (or a defined subset) in the cluster — used for node-level infrastructure concerns like log collectors or monitoring agents that need to be present everywhere. A Deployment, by contrast, manages a specified *number* of replicas without any inherent tie to running on every node specifically — the scheduler places them wherever there's capacity, not necessarily one-per-node.

**Q: What's a Job, and how does it differ from a regular Deployment's Pods?**
> A Job runs a task to completion — its Pods are expected to finish successfully rather than run indefinitely, and the Job object tracks that completion (with optional retry behavior on failure). A Deployment's Pods, in contrast, are meant to run continuously — if one exits, the Deployment (via its ReplicaSet) will restart/replace it, since long-running availability is the whole point.

---

## 7. Networking: Services, Ingress & Service Discovery

### Learning Perspective
Since Pods are ephemeral (they can be created, destroyed, and rescheduled, potentially changing their IP address each time), Kubernetes needs a stable way to route traffic to a set of Pods:

- **Service** — an **abstract way to expose an application** running on a set of Pods **as a network service** — providing a **stable** endpoint (IP address/DNS name) that routes to whichever actual Pods are currently backing it, regardless of individual Pod churn.

- **Service Discovery** — **discovers Pods using their IP addresses or a single DNS name** — the underlying mechanism letting other parts of the application (or external clients) find and reach a Service without needing to track individual Pod IPs directly.

- **Ingress** — an **API object that manages external access** to the services in a cluster, **typically HTTP** — providing routing rules (e.g., based on hostname or URL path) for directing external traffic to the appropriate internal Service, along with capabilities like SSL termination.

- **Load balancing** — **balances traffic across Pods** for **better performance and high availability** — a core function that Services (and Ingress, for external traffic) provide automatically.

- **IPv4/IPv6 dual stack** — a Kubernetes capability that **assigns both IPv4 and IPv6 addresses** to Pods and Services.

### Interview Perspective
**Q: Why does Kubernetes need a "Service" object at all — why can't clients just talk to Pods directly?**
> Because Pods are ephemeral — they can be created, destroyed, and rescheduled (potentially onto different nodes with different IPs) at any time, especially as ReplicaSets scale up/down or replace failed instances. A Service provides a stable, consistent endpoint that automatically routes to whichever Pods are currently healthy and backing it, decoupling clients from needing to track individual, constantly-changing Pod IPs.

**Q: What's the difference between a Service and an Ingress?**
> A Service provides internal (and optionally external, depending on its type) network access to a set of Pods, typically operating at a lower network level. Ingress specifically manages *external* HTTP(S) access into the cluster, providing higher-level routing capabilities — like directing traffic to different Services based on hostname or URL path, and often handling SSL termination — sitting in front of one or more Services rather than replacing them.

---

## 8. Storage in Kubernetes

### Learning Perspective
- **Storage** — a **data store** that supports **persistent and temporary storage** for Pods — since a Pod's own local filesystem is, like a plain container's, ephemeral by default.
- **Storage Orchestration** — Kubernetes **automatically mounts your chosen storage system**, whether from **local storage, network storage, or public cloud** — abstracting away the specifics of the underlying storage infrastructure behind a consistent Kubernetes API.

### Interview Perspective
**Q: Why does Kubernetes need dedicated storage orchestration capabilities, rather than just relying on each Pod's local filesystem?**
> A Pod's local filesystem is ephemeral, just like a plain container's — data written there disappears if the Pod is rescheduled, restarted, or removed. Kubernetes's storage orchestration lets you mount persistent storage (local, network-attached, or cloud-provider storage) into Pods through a consistent abstraction, so genuinely persistent data (like a database's files) survives independently of any individual Pod's lifecycle.

---

## 9. Kubernetes' Self-Managing Behaviors

### Learning Perspective
Several of Kubernetes's most valued capabilities come from its **declarative**, continuously-reconciling design:

- **Declarative Management** — you express a **desired state** (e.g., "I want 3 replicas of this application running"), and **Kubernetes actively works to ensure the observed state matches the desired state** — you describe the *what*, not the *how*.
- **Control Loop** — a **non-terminating loop** that **regulates the state of a system**. A **thermostat** is a classic example: it continuously checks the current temperature against the desired setting, and takes action (heating/cooling) to close the gap — Kubernetes's controllers operate on exactly this same principle.
- **Controller** — in Kubernetes, controllers are **control loops** that **watch the state of your cluster**, then **make or request changes where needed**. **Each controller tries to move the current cluster state closer to the desired state.**
- **Self-healing** — Kubernetes **restarts, replaces, reschedules, and kills** failing or unresponsive containers automatically, without manual intervention.
- **Automated bin packing** — Kubernetes **increases resource utilization and cost savings**, using a **mix of critical and best-effort workloads** to efficiently pack Pods onto available node capacity.

**Contrast with Imperative Management:** **defining steps and actions** to explicitly get to a desired state — the opposite philosophy from declarative management. **Imperative commands** — like directly using `kubectl create`/`kubectl delete`/`kubectl edit` on live objects — **create, update, and delete live objects directly**, rather than declaring a desired end state and letting Kubernetes figure out how to get there. Kubernetes strongly favors the **declarative** approach (e.g., `kubectl apply -f config.yaml`) for most real-world usage, since it's more robust, auditable (the config file is the record), and reconcilable if things drift.

### Interview Perspective
**Q: What does "declarative management" mean in Kubernetes, and why is it generally preferred over imperative commands?**
> Declarative management means you specify the *desired end state* (e.g., "run 3 replicas of this Deployment") in a configuration file, and Kubernetes's controllers continuously work to reconcile the actual cluster state to match that desired state — automatically, and repeatedly, without you scripting out each individual step. It's generally preferred over imperative commands (`kubectl create`, `kubectl delete` used directly and manually) because the declared configuration serves as a single, version-controllable source of truth, and Kubernetes actively self-corrects any drift from it — rather than requiring you to manually re-issue the exact right sequence of imperative commands every time something needs fixing.

**Q: Explain a "control loop" using the thermostat analogy, and how that relates to Kubernetes controllers.**
> A thermostat continuously compares the current room temperature to the desired setting, and takes corrective action (heating or cooling) whenever there's a gap — it never "finishes," it just keeps checking and correcting indefinitely. Kubernetes controllers work identically: each one continuously watches part of the cluster's actual state, compares it to the declared desired state, and takes corrective action (creating, deleting, or modifying objects) to close any gap — an ongoing, non-terminating reconciliation loop, not a one-time action.

**Q: What is "self-healing" in Kubernetes, and what specific actions does it include?**
> Kubernetes automatically restarts, replaces, reschedules, or kills containers that are failing or unresponsive — without requiring a human to notice and manually intervene. This is a direct consequence of the declarative, control-loop model: if a controller observes that the actual state (e.g., a crashed Pod) no longer matches the desired state (a certain number of healthy replicas), it automatically takes action to close that gap.

⭐ **Extremely frequently asked** — declarative vs. imperative management, and the control loop concept, are among the most fundamental and frequently tested Kubernetes concepts.

---

## 10. Labels, Selectors, Namespaces & Objects

### Learning Perspective
- **Object** — an **entity in the Kubernetes system**. The **Kubernetes API uses these entities to represent the state of your cluster** — Pods, Services, Deployments, etc. are all examples of Kubernetes objects.
- **Labels** — **tags objects with identifying attributes** that are **meaningful and relevant to users** (e.g., `environment: production`, `app: books-api`) — arbitrary key-value metadata attached to objects.
- **Label Selector** — allows users to **filter a list of resources based on labels** — the mechanism letting a Service or Deployment identify exactly *which* Pods it should manage/route to, based on matching label criteria, rather than referencing Pods by name directly.
- **Namespace** (Kubernetes-specific meaning — distinct from the Linux kernel namespace concept in `containers-and-containerization.md`) — an **abstraction used by Kubernetes to support isolation of groups of resources within a single cluster** — letting multiple teams or environments (e.g., `dev`, `staging`, `production`) share one physical cluster while keeping their resources logically separated.
- **Persistence** — ensures that **an object exists in the system**, until the object is **modified or removed** — objects don't disappear on their own; they persist until explicitly changed.
- **Eviction** — the **process of terminating one or more Pods on Nodes** — often triggered by resource pressure (a node running low on memory/disk), forcing lower-priority Pods off to free up capacity for higher-priority ones.
- **Preemption** — logic in Kubernetes that helps a **pending Pod find a suitable Node** by **evicting low-priority Pods** existing on that node — ensuring higher-priority workloads can be scheduled even when a cluster is at capacity, by displacing lower-priority ones.
- **Workload** — simply, an **application running on Kubernetes**.

### Interview Perspective
**Q: How do Services and Deployments know which specific Pods to manage or route traffic to, given that Pods are constantly being created and destroyed?**
> Through labels and label selectors — Pods are tagged with labels (arbitrary key-value metadata), and Services/Deployments/ReplicaSets specify a label selector describing which labels to match. Any Pod matching that selector is automatically included, regardless of its specific name or when it was created — this decouples the relationship from needing to track individual Pod identities directly.

**Q: What's the purpose of a Kubernetes Namespace, and why might an organization use multiple namespaces within one cluster?**
> Namespaces provide logical isolation of groups of resources within a single physical cluster — letting multiple teams, projects, or environments (dev/staging/production) share the same underlying cluster infrastructure while keeping their resources, naming, and access controls appropriately separated, rather than needing entirely separate physical clusters for each.

**Q: What's the difference between eviction and preemption?**
> Eviction is the general process of terminating Pods on a node, commonly triggered by resource pressure (the node running low on memory or disk). Preemption is a *specific* mechanism using eviction as its tool — it helps a pending, higher-priority Pod get scheduled by deliberately evicting existing lower-priority Pods from a node to free up the capacity it needs.

---

## 11. The Kubernetes Ecosystem & Alternatives

### Learning Perspective
**Ecosystem** — a **composition of services, support, and tools** that are **widely available**. **The Kubernetes ecosystem is a large, rapidly growing ecosystem** where its services, support, and tools are widely available — one of Kubernetes's major practical advantages over alternatives, given how much tooling, documentation, and community support exists around it.

**Designed for extensibility** — Kubernetes **adds features to your cluster without adding or modifying source code** — via mechanisms like Custom Resource Definitions (CRDs), operators, and plugins, letting the platform's capabilities grow without needing to fork or patch Kubernetes itself.

**Alternative orchestration/scheduling tools** (for context/comparison):
- **Docker Swarm** — **automates the deployment of containerized applications**, but was **designed specifically to work with Docker Engine and other Docker tools**, making it a **popular choice for teams already working in Docker environments**. Generally considered simpler to set up than Kubernetes, but with a smaller ecosystem and fewer advanced capabilities.
- **Marathon** — an **Apache Mesos framework**. **Apache Mesos** is an **open-source cluster manager** developed by **UC Berkeley**. It lets users **scale container infrastructure** through the **automation of most management and monitoring tasks**.
- **Nomad** (**HashiCorp**) — a **free and open-source cluster management and scheduling tool** that **supports Docker and other applications** on **all major operating systems**, across **all infrastructure** — whether **on-premises or in the cloud**. This flexibility lets teams work with **any type and level of workload**.

### Interview Perspective
**Q: How does Docker Swarm compare to Kubernetes?**
> Docker Swarm is simpler to set up and use, and integrates tightly with Docker tooling — a natural fit for teams already fully invested in the Docker ecosystem. Kubernetes is more complex to operate, but offers a far larger ecosystem, more advanced scheduling and networking capabilities, and has become the industry-standard choice, with broad support across every major cloud provider — most organizations choosing container orchestration today default to Kubernetes specifically because of that ecosystem maturity and standardization.

**Q: What does it mean that Kubernetes is "designed for extensibility"?**
> New capabilities can be added to a Kubernetes cluster without modifying Kubernetes's own core source code — via mechanisms like Custom Resource Definitions (letting you define entirely new object types) and operators (custom controllers automating operational knowledge for specific applications). This is a major reason Kubernetes has such a large ecosystem — third parties can extend it cleanly, without needing to fork the core project.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Automated bin packing** | Increases resource utilization/cost savings by mixing critical and best-effort workloads |
| **Batch execution** | Manages batch/CI workloads, automatically replacing failed containers |
| **Cloud Controller Manager** | Control plane component embedding cloud-specific control logic |
| **Cluster** | A set of worker nodes running containerized applications |
| **Container Orchestration** | Automates the container lifecycle of containerized applications |
| **Container Runtime** | Software responsible for actually running containers |
| **Control Loop** | A non-terminating loop regulating a system's state (e.g., a thermostat) |
| **Control plane** | The orchestration layer exposing APIs to define/deploy/manage container lifecycle |
| **Controller** | A control loop watching cluster state, moving it toward the desired state |
| **Data (Worker) Plane** | Provides CPU/memory/network/storage capacity for containers to run |
| **DaemonSet** | Ensures a copy of a Pod runs across a set of nodes |
| **Declarative Management** | Express a desired state; Kubernetes reconciles observed state to match |
| **Deployment** | Manages Pods/ReplicaSets, with rolling update capabilities; for stateless apps |
| **Docker Swarm** | Docker-native container orchestration tool |
| **Ecosystem** | Widely available composition of services, support, and tools |
| **etcd** | Highly available key-value store — the source of truth for cluster state |
| **Eviction** | Process of terminating Pods on Nodes |
| **Imperative commands** | Directly create/update/delete live objects |
| **Imperative Management** | Defining explicit steps/actions to reach a desired state |
| **Ingress** | API object managing external (typically HTTP) access to cluster services |
| **IPv4/IPv6 dual stack** | Assigns both IPv4 and IPv6 addresses to Pods/Services |
| **Job** | A finite/batch task that runs to completion |
| **Kubectl** | CLI tool for communicating with a cluster's control plane via the K8s API |
| **Kubelet** | Primary node agent ensuring PodSpec containers are running/healthy |
| **Kubernetes** | De facto open-source container orchestration platform |
| **Kubernetes API** | Serves Kubernetes functionality via a RESTful interface; stores cluster state |
| **Kubernetes API Server** | Validates/configures API object data; frontend to the cluster's shared state |
| **Kubernetes Controller Manager** | Runs all controller processes reconciling actual vs. desired state |
| **Kubernetes Proxy** | Network proxy on each node maintaining rules for Pod communication |
| **kube-scheduler** | Assigns newly created, unscheduled Pods to a suitable node |
| **Label Selector** | Filters resources based on labels |
| **Labels** | Identifying, meaningful key-value tags on objects |
| **Load balancing** | Balances traffic across Pods for performance/availability |
| **Marathon** | An Apache Mesos framework for container infrastructure automation |
| **Namespace (K8s)** | Isolates groups of resources within a single cluster |
| **Node** | A worker machine in a cluster, managed by the control plane, running Pods |
| **Nomad** | HashiCorp's free, open-source cluster management/scheduling tool |
| **Object** | An entity in the Kubernetes system, representing cluster state |
| **Persistence** | An object exists until modified or removed |
| **Preemption** | Evicts low-priority Pods to schedule a pending, higher-priority Pod |
| **Self-healing** | Automatically restarts/replaces/reschedules/kills failing containers |
| **Service** | Abstract, stable way to expose an application running on Pods |
| **Service Discovery** | Discovers Pods via IP addresses or a single DNS name |
| **StatefulSet** | Manages Pods with guarantees on ordering and uniqueness |
| **Storage** | Persistent/temporary data store for Pods |
| **Storage Orchestration** | Automatically mounts local, network, or cloud storage systems |
| **Pod** | Smallest Kubernetes object; represents one running application instance |
| **Proxy** | A server acting as an intermediary for a remote service |
| **ReplicaSet** | Maintains a set of replica Pods running at any given time |
| **Workload** | An application running on Kubernetes |

---

## Quick Reference: kubectl Commands

| Command | Description |
|---|---|
| `for … do` | Runs a command multiple times as specified (shell looping, used alongside kubectl) |
| `kubectl apply` | Applies a configuration to a resource (declarative) |
| `kubectl config get-clusters` | Displays clusters defined in the kubeconfig |
| `kubectl config get-contexts` | Displays the current context |
| `kubectl create` | Creates a resource (imperative) |
| `kubectl delete` | Deletes resources |
| `kubectl describe` | Shows details of a resource or group of resources |
| `kubectl expose` | Exposes a resource to the internet as a Kubernetes Service |
| `kubectl get` | Displays resources |
| `kubectl get pods` | Lists all Pods |
| `kubectl get pods -o wide` | Lists all Pods with additional details |
| `kubectl get deployments` | Lists created Deployments |
| `kubectl get services` | Lists created Services |
| `kubectl proxy` | Creates a proxy server between localhost and the Kubernetes API server |
| `kubectl run` | Creates and runs a specific image in a Pod |
| `kubectl version` | Prints client and server version information |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Kubernetes | De facto container orchestration standard, automating deployment/scaling/healing/networking |
| Cluster / Node | A set of worker machines / one individual worker machine within a cluster |
| Control plane vs. data plane | Decision-making layer (API, scheduling) vs. where containers actually run |
| `etcd` | Highly available key-value store — the cluster's single source of truth |
| kube-scheduler | Assigns newly created Pods to a suitable node |
| kubelet | Node agent ensuring a node's Pods are running and healthy |
| kube-proxy | Maintains network rules enabling communication to Pods on a node |
| Pod → ReplicaSet → Deployment | Smallest unit → maintains N replicas → manages ReplicaSets + rolling updates |
| StatefulSet | For stateful apps needing ordering/uniqueness/stable storage per Pod |
| DaemonSet | Ensures one Pod copy runs on every (or a subset of) nodes |
| Job | Runs a task to completion, rather than indefinitely |
| Service / Ingress | Stable internal routing to Pods / external HTTP(S) access & routing rules |
| Declarative vs. imperative | Declare desired state, K8s reconciles vs. directly issue create/delete commands |
| Control loop | Non-terminating reconciliation — like a thermostat |
| Self-healing | Automatically restarts/replaces/reschedules failing containers |
| Labels + selectors | Key-value tags + filters — how Services/Deployments identify their Pods |
| Namespace (K8s) | Logical isolation of resources within one physical cluster |
| Kubernetes vs. Docker Swarm | Larger ecosystem/more capable vs. simpler, Docker-native |
