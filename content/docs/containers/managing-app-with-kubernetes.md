# Managing Applications with Kubernetes

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Builds directly on `kubernetes-ecosystem.md` (architecture, Pods, Deployments) — this file focuses on the operational side: scaling, updating, storing config/secrets, and persistent storage for applications actually running on a cluster.

---

## 1. Scaling: Horizontal, Vertical & Cluster Autoscaling

### Learning Perspective
Kubernetes offers **three distinct types of autoscaling**, each scaling a different dimension of the system:

- **Horizontal Pod Autoscaler (HPA)** — an **API resource** that **automatically scales the number of Pod replicas**, based on **targeted CPU utilization** or **custom metric targets**. This is "horizontal" scaling — adding/removing more identical Pod instances to handle more/less load.

- **Vertical Pod Autoscaler (VPA)** — an **API resource** that **adds resources to an existing machine** (or more precisely, to an existing Pod's resource allocation — CPU/memory). A VPA lets you **scale a service vertically** within a cluster — instead of adding more Pod copies, it makes each existing Pod bigger/smaller (more or less CPU/memory) to match actual usage.

- **Cluster Autoscaler (CA)** — an **API resource** that **autoscales the cluster itself**, **increasing and decreasing the number of available nodes** that Pods can run on. This operates one level up from Pod-level scaling — if there aren't enough nodes with capacity to schedule the Pods that HPA/VPA want to run, the Cluster Autoscaler adds more nodes (and removes them when underutilized).

**How these three work together:** HPA decides *how many* Pod replicas are needed based on load. VPA (less commonly used together with HPA on the same metric, to avoid conflicting adjustments) tunes *how much* resource each individual Pod gets. Cluster Autoscaler ensures there's actually enough underlying *node* capacity for whatever Pods HPA/VPA have decided are needed — scaling the infrastructure itself, not just the application's Pods.

```bash
kubectl autoscale deployment myapp --min=2 --max=10 --cpu-percent=80
kubectl get hpa
```

### Interview Perspective
**Q: What's the difference between the Horizontal Pod Autoscaler, Vertical Pod Autoscaler, and Cluster Autoscaler?**
> HPA scales the *number* of Pod replicas up or down based on metrics like CPU utilization — horizontal scaling. VPA adjusts the resource allocation (CPU/memory) *within* existing Pods, effectively scaling individual Pods bigger or smaller — vertical scaling. Cluster Autoscaler operates at the infrastructure level, adding or removing entire *nodes* from the cluster based on whether there's enough capacity to schedule the Pods that need to run — it's a level above Pod-level scaling entirely.

**Q: Why might you generally avoid running HPA and VPA on the same metric for the same workload simultaneously?**
> Because they can work against each other — HPA scaling out more replicas changes the per-Pod resource usage that VPA is watching, and VPA resizing Pods changes the CPU/memory profile HPA is measuring against, potentially creating a feedback loop of conflicting adjustments. It's generally recommended to use one or the other for a given metric on a given workload, or carefully coordinate them if both are genuinely needed.

**Q: How would you set up horizontal autoscaling for a Deployment via kubectl?**
> `kubectl autoscale deployment <name> --min=<min> --max=<max> --cpu-percent=<target>` — this creates an HPA resource targeting the specified Deployment, scaling its replica count between the given min/max bounds to try to keep average CPU utilization near the target percentage. `kubectl get hpa` then lets you view the current status of configured autoscalers.

⭐ **Frequently asked** — be ready to distinguish all three autoscaler types clearly; interviewers often test whether candidates conflate horizontal and vertical scaling.

---

## 2. Rolling Updates & Rollbacks

### Learning Perspective
**Rolling Updates** provide a way to **roll out application changes** in an **automated and controlled fashion** throughout your Pods. Rolling updates work with **Pod templates**, such as **Deployments** — instead of taking the entire application down and replacing it all at once (causing downtime), Kubernetes gradually replaces old Pods with new ones, a few at a time, keeping the application available throughout the update.

**Rolling updates allow for rollback if something goes wrong** — if a new version turns out to be broken, you can revert back to the previous, known-good version.

```bash
# Update the image used by a running deployment (triggers a rolling update)
kubectl set image deployment/myapp myapp=myapp:v2

# Check the status/manage the rollout
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp

# Restart Pods (e.g., to pick up a changed ConfigMap without an image change)
kubectl rollout restart deployment/myapp

# Roll back to the previous version if something's wrong
kubectl rollout undo deployment/myapp
```

### Interview Perspective
**Q: What is a rolling update, and why is it preferable to simply replacing all Pods at once?**
> A rolling update gradually replaces old Pods with new ones, a portion at a time, rather than terminating everything and starting fresh simultaneously — this keeps the application continuously available throughout the update (no full downtime), since some old Pods remain serving traffic while new ones are being brought up and verified healthy.

**Q: How would you roll back a Deployment after a bad update?**
> `kubectl rollout undo deployment/<name>` — Kubernetes retains a rollout history for Deployments, letting you revert to the previous (or a specific prior) revision if the newly rolled-out version turns out to be broken, without needing to manually reconstruct the old configuration.

**Q: What's the difference between `kubectl rollout restart` and `kubectl rollout undo`?**
> `rollout restart` restarts the existing Pods (recreating them) without changing the Deployment's actual specification — useful for picking up a change to something the Pods reference indirectly, like an updated ConfigMap, without an image/spec change of its own. `rollout undo` actually reverts the Deployment's specification back to a previous revision — a genuine rollback to prior configuration, not just a restart of the current one.

⭐ **Extremely frequently asked** — rolling updates and rollback are core to how Kubernetes handles safe deployments in practice; expect a scenario-based question here.

---

## 3. ConfigMaps

### Learning Perspective
A **Config Map** is an API object used to **store non-confidential data** in **key-value pairs**. **Pods can consume ConfigMaps** as:
- **Environment variables**
- **Command-line arguments**
- **Configuration files in a volume**

The key qualifier is **non-confidential** — ConfigMaps are meant for ordinary configuration data (feature flags, non-sensitive settings, URLs), **not** for secrets/credentials, which have a dedicated, more carefully-handled object type instead (Section 4).

```bash
kubectl create configmap app-config --from-literal=LOG_LEVEL=debug
```

```yaml
# Consuming a ConfigMap as environment variables in a Pod spec
env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: LOG_LEVEL
```

### Interview Perspective
**Q: What is a ConfigMap used for, and how can a Pod consume its data?**
> A ConfigMap stores non-confidential, plain configuration data as key-value pairs — separate from an application's actual code/image, so config can change without rebuilding the image. Pods can consume this data in three ways: as environment variables, as command-line arguments passed to the container, or as files mounted into the container via a volume.

**Q: Why would you use a ConfigMap instead of hardcoding configuration values directly into your application's container image?**
> It decouples configuration from the container image — the same image can be reused across different environments (dev, staging, production) with different config values supplied externally via different ConfigMaps, rather than needing to rebuild a separate image per environment just to change a config value.

---

## 4. Secrets

### Learning Perspective
**Secrets** store **sensitive information**, such as **passwords, OAuth tokens, and SSH keys** — the counterpart to ConfigMaps, specifically for data that needs careful, restricted handling.

**Key distinctions from ConfigMaps:**
- Secrets are stored **base64-encoded** by default in `etcd` (note: base64 encoding is **not encryption** — it's easily reversible; encryption-at-rest for Secrets requires additional cluster-level configuration)
- Kubernetes and its tooling generally treat Secrets with more care than ConfigMaps — e.g., avoiding printing their full contents in logs/output by default
- Secrets can be consumed similarly to ConfigMaps — as environment variables or mounted as files in a volume

```bash
kubectl create secret generic db-credentials --from-literal=password=mysecretpassword
```

### Interview Perspective
**Q: What's the difference between a ConfigMap and a Secret in Kubernetes?**
> Both store key-value configuration data consumable by Pods, but Secrets are specifically intended for sensitive information — passwords, tokens, keys — and are handled with additional care by Kubernetes tooling (though base64 encoding alone isn't true encryption; genuine encryption-at-rest for Secrets requires separate cluster configuration). ConfigMaps are meant strictly for non-sensitive, ordinary configuration data.

**Q: Is base64 encoding sufficient to protect a Secret's contents?**
> No — base64 is an encoding scheme, not encryption; it's trivially reversible by anyone who can read the encoded value. By default, Secrets stored in `etcd` are only base64-encoded, so genuine confidentiality requires additional measures — like enabling encryption-at-rest for `etcd`, and tightly restricting who/what has RBAC access to read Secret objects in the first place.

---

## 5. Persistent Volumes & Persistent Volume Claims

### Learning Perspective
Kubernetes storage for genuinely persistent data revolves around two related objects:

- **Persistent Volume (PV)** — an **API object** that **represents a piece of storage** in the cluster. Available as a **general, pluggable resource** that **persists beyond the lifecycle of any individual Pod** — a PV exists independently of whichever Pod happens to be using it at a given moment.

- **Persistent Volume Claim (PVC)** — **claims storage resources** defined in a PersistentVolume, so that it can be **mounted as a volume** in a container. A PVC is essentially a **request** for storage — a Pod doesn't directly reference a PV; it references a PVC, which in turn is matched/bound to an appropriate PV.

**The relationship, and why it's split into two objects:** this separation lets **administrators** provision and manage the underlying storage infrastructure (PVs) independently from **developers**, who simply *request* storage (via PVCs) without needing to know the underlying storage details (which specific disk, which cloud provider's storage service, etc.) — a clean separation of concerns between infrastructure provisioning and application-level storage requests.

```
Pod  --references-->  PersistentVolumeClaim  --bound to-->  PersistentVolume  --backed by-->  actual storage
```

### Interview Perspective
**Q: What's the relationship between a PersistentVolume and a PersistentVolumeClaim, and why does Kubernetes split storage into these two separate objects?**
> A PersistentVolume represents an actual piece of provisioned storage in the cluster, existing independently of any specific Pod. A PersistentVolumeClaim is a request for storage that a Pod actually references, which gets bound to a matching PersistentVolume. This separation decouples storage *provisioning* (typically an administrator's concern — configuring the underlying disks/cloud storage) from storage *consumption* (a developer's concern — simply requesting "give my Pod 10GB of storage" without needing to know the specific underlying infrastructure details).

**Q: Why does a PersistentVolume "persist beyond the lifecycle of any individual Pod" matter in practice?**
> Because Pods themselves are ephemeral and disposable — they can be rescheduled, restarted, or replaced at any time. If storage were tied to a Pod's own lifecycle, any data would be lost every time that happened. A PersistentVolume existing independently means the underlying data survives Pod restarts/rescheduling — a new Pod (or the replacement Pod) can reclaim the same PVC and pick up right where the data left off, which is essential for genuinely stateful workloads like databases.

---

## 6. Volumes, Volume Mounts & Volume Plugins

### Learning Perspective
- **Volume** — a **directory containing data**, **accessible to multiple containers** in a Pod — the more general storage concept, of which PersistentVolumes are one particular (durable) kind; Kubernetes also supports simpler, Pod-lifetime-scoped volume types for temporary shared storage between containers in the same Pod.
- **Volume Mount** — entails **mounting** the declared volume **into a container** in the same Pod — the step that actually makes a defined volume accessible at a specific filesystem path inside a given container.
- **Volume Plugin** — enables **integration of storage** within a Pod — the extensibility mechanism letting Kubernetes support many different underlying storage backends (cloud block storage, network file systems, local disks, etc.) through a consistent volume interface.

```yaml
spec:
  containers:
    - name: myapp
      volumeMounts:
        - mountPath: /data
          name: my-storage
  volumes:
    - name: my-storage
      persistentVolumeClaim:
        claimName: my-pvc
```

### Interview Perspective
**Q: What's the difference between a "volume" and a "volume mount" in a Pod spec?**
> The `volumes` section declares the actual storage source available to the Pod (e.g., referencing a PersistentVolumeClaim, or a simpler temporary volume type). The `volumeMounts` section, defined per-container, specifies *where* within that specific container's filesystem the declared volume should actually appear (the mount path) — a volume can be declared once at the Pod level and mounted into multiple containers within that same Pod, each at its own chosen path.

**Q: What role do volume plugins play?**
> They provide the actual integration logic connecting Kubernetes's generic volume abstraction to specific underlying storage backends — cloud block storage, network file systems, local disks, and so on — letting Kubernetes support a wide range of storage technologies through one consistent Pod-facing interface, without needing built-in, hardcoded support for every possible storage system.

---

## 7. Service Binding (IBM Cloud Context)

### Learning Perspective
**Service binding** is the **process needed to consume external Services or backing Services** — including **REST APIs, databases, and event buses** — in your applications. In a Kubernetes context, this typically means securely connecting a running application (Pod) to some external, managed service it depends on (often provided through the underlying cloud platform).

**The IBM Cloud catalog** provides **various Services** — ranging from **visual recognition** to **natural language processing** and **creating chatbots** — that applications running on a cluster might need to bind to and consume.

**Tone Analyzer Service** — used as a concrete example for explaining service binding: this **IBM Cloud Service** uses **linguistic analysis** to **detect tone in a given text**. **Linguistic Analysis**, in this context, refers to the underlying technique of **detecting tone in a given text**.

**Why this matters operationally:** connecting a cluster-hosted application to an external managed service (like Tone Analyzer) typically involves securely injecting connection details/credentials — commonly via **Secrets** (Section 4) — rather than hardcoding API keys/endpoints directly into application code, tying service binding conceptually back to the Secrets mechanism already covered.

### Interview Perspective
**Q: What is "service binding," and why is it relevant to applications running on Kubernetes?**
> Service binding is the process of connecting an application to an external or backing service it depends on — a REST API, a database, an event bus, or a managed cloud service. It's relevant to Kubernetes-hosted applications because those apps frequently need credentials or connection details for such services, and the standard, secure way to inject that information into a running Pod is through Kubernetes Secrets, rather than hardcoding it into the application's image or source code.

**Q: How would the Tone Analyzer example illustrate a typical service binding scenario?**
> An application running as a Pod on a cluster needs to call the external Tone Analyzer service to detect the tone of some text — to do this, it needs Tone Analyzer's API credentials. Rather than hardcoding those credentials into the application, they'd be stored as a Kubernetes Secret and injected into the Pod as environment variables (or mounted files), which the application then reads at runtime to authenticate its calls to the external service.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Cluster Autoscaler (CA)** | Autoscales the cluster itself — the number of available nodes |
| **Config Map** | Stores non-confidential key-value data, consumable by Pods |
| **Horizontal Pod Autoscaler (HPA)** | Automatically scales the number of Pod replicas based on metrics |
| **Linguistic Analysis** | Detects the tone in a given text |
| **IBM Cloud catalog** | Provides various services — visual recognition, NLP, chatbots, and more |
| **Persistent Volume** | Represents a piece of cluster storage, persisting beyond any individual Pod's lifecycle |
| **Persistent Volume Claim** | Claims storage defined in a PersistentVolume, mountable in a container |
| **Rolling Updates** | Automated, controlled rollout of changes across Pods, with rollback support |
| **Secrets** | Stores sensitive information — passwords, OAuth tokens, SSH keys |
| **Service binding** | Process of connecting an application to external/backing services (APIs, DBs, event buses) |
| **Tone Analyzer Service** | An IBM Cloud service using linguistic analysis to detect tone in text |
| **Vertical Pod Autoscaler (VPA)** | Adjusts resource allocation within existing Pods — vertical scaling |
| **Volume** | A data directory accessible to multiple containers in a Pod |
| **Volume Mount** | Mounts a declared volume into a container in the same Pod |
| **Volume Plugin** | Enables integration of specific storage backends within a Pod |

---

## Quick Reference: kubectl Commands

| Command | Description |
|---|---|
| `kubectl autoscale deployment` | Autoscales a Kubernetes Deployment (creates an HPA) |
| `kubectl create configmap` | Creates a ConfigMap resource |
| `kubectl get deployments -o wide` | Lists Deployments with additional details |
| `kubectl get hpa` | Lists Horizontal Pod Autoscalers |
| `kubectl scale deployment` | Scales a Deployment manually |
| `kubectl set image deployment` | Updates a running Deployment's container image (triggers a rolling update) |
| `kubectl rollout` | Manages the rollout of a resource |
| `kubectl rollout restart` | Restarts a resource so its containers restart |
| `kubectl rollout undo` | Rolls back a resource to a previous revision |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| HPA / VPA / CA | Scales Pod count / scales Pod resource size / scales cluster node count |
| Rolling updates | Gradual, zero-downtime Pod replacement, with rollback support |
| `kubectl rollout undo` | Reverts a Deployment to its previous configuration/revision |
| ConfigMap | Non-confidential key-value config, consumable as env vars/args/files |
| Secrets | Sensitive data (passwords, tokens, keys) — base64-encoded, not encrypted by default |
| PersistentVolume vs. PVC | Actual provisioned storage vs. a Pod's request/claim for that storage |
| Why PV/PVC are separate | Decouples storage provisioning (admin) from storage consumption (developer) |
| Volume vs. Volume Mount | Declared storage source vs. where it's actually attached inside a container |
| Volume Plugin | Connects Kubernetes's generic volume interface to a specific storage backend |
| Service binding | Securely connecting an app to an external service, typically via Secrets |