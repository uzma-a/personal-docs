# Deployment in Microservices

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Ties together `intro-to-microservices.md` (why microservices), `containers-and-containerization.md` (the container fundamentals underpinning deployment), and `kubernetes-ecosystem.md`/`serverless-overview.md` (the two main managed deployment paths) — this file focuses specifically on the practical challenge of actually *deploying* a microservices architecture, using IBM Cloud Code Engine as the concrete example platform.

---

## 1. Why Self-Hosting Microservices Is Hard

### Learning Perspective
**Self-hosted microservices can be very complex and challenging** — this is the central operational tension microservices introduce, already touched on in `intro-to-microservices.md`'s discussion of benefits and anti-patterns.

**What makes it complex, concretely:**
- **Many independent deployments to manage** — instead of one application to deploy, you now have as many deployment pipelines as you have services
- **Inter-service networking** — service discovery, load balancing, and secure communication between many services (the problems `kubernetes-ecosystem.md`'s Services/Ingress and `openshift.md`'s Istio sections address)
- **Infrastructure provisioning and scaling** — provisioning servers/clusters, configuring autoscaling, and managing capacity across potentially dozens of independently-scaling services
- **Observability across a distributed system** — tracing a single request across many services, aggregating logs and metrics from many independent processes
- **Operational overhead falls on the team** — someone has to patch servers, manage the orchestration platform (Kubernetes/OpenShift) itself, handle security updates to the underlying infrastructure, and so on

**Why this motivates managed platforms:** given this operational burden, **fully managed platforms** that abstract away infrastructure concerns become especially attractive for microservices specifically — since the *number* of things needing deployment/management scales directly with the number of services, the value of offloading that operational burden to a managed platform scales right alongside it.

### Interview Perspective
**Q: Why does self-hosting a microservices architecture tend to be more operationally complex than self-hosting a monolith?**
> Because the operational surface area multiplies with the number of services — instead of managing one deployment pipeline, you're managing many; instead of one application's networking, you need service discovery and secure inter-service communication across many services; instead of scaling one thing, you need independent scaling and capacity management per service; and observability (tracing, logging, metrics) becomes significantly harder across a distributed system with many independent processes, compared to one unified application process.

**Q: Why do managed deployment platforms become especially valuable specifically for microservices architectures?**
> Because the operational burden of self-hosting scales with the *number* of services being deployed and managed — a burden that grows directly with microservices adoption. A managed platform that abstracts away infrastructure provisioning, scaling, and networking removes exactly the kind of multiplying operational complexity that makes self-hosted microservices challenging, letting teams capture microservices' architectural benefits without absorbing the full corresponding operational cost themselves.

---

## 2. IBM Cloud Code Engine: Overview

### Learning Perspective
**IBM Cloud Code Engine** is a **fully managed platform** that **takes care of all the hard deployment work**, allowing developers to **focus on their code** — a concrete example of exactly the kind of managed platform motivated by Section 1's challenges. It's built on top of Kubernetes and Knative (covered in `serverless-overview.md`) under the hood, but abstracts that complexity away from the developer entirely.

**Code Engine has three main use cases:**
1. **Deploy applications**
2. **Build and deploy applications**
3. **Run jobs**

This maps closely onto the core object types covered in Section 4 (Application, Build, Job) — each use case corresponds to working primarily with one (or a combination) of those object types.

### Interview Perspective
**Q: What is IBM Cloud Code Engine, and what problem is it designed to solve?**
> A fully managed platform that handles the underlying deployment infrastructure — provisioning, scaling, networking — so developers can focus purely on their application code rather than infrastructure operations. It's designed to address exactly the operational complexity described in Section 1: rather than a team self-hosting and managing their own Kubernetes cluster and all the associated orchestration concerns, Code Engine abstracts that away as a managed service.

**Q: What are the three main use cases for IBM Cloud Code Engine?**
> Deploying applications (running pre-built container images to serve requests), building and deploying applications (going from source code directly to a running application, including the build step), and running jobs (executing code that runs to completion, rather than serving ongoing requests).

---

## 3. Projects

### Learning Perspective
A **project** is a **grouping of Code Engine entities**, such as **applications, jobs, and builds** — the organizational container within Code Engine that holds all the related resources for a given piece of work, similar in spirit to a Kubernetes Namespace (covered in `kubernetes-ecosystem.md`) providing logical grouping/isolation within a cluster.

### Interview Perspective
**Q: What is a "project" in IBM Cloud Code Engine, and why does this kind of grouping matter?**
> A project groups related Code Engine entities together — applications, jobs, and builds that belong to the same piece of work or team. This grouping matters for the same reasons namespacing matters in any cloud platform — it provides logical organization, makes access control and resource management more tractable, and keeps unrelated workloads cleanly separated from each other, even when running on the same underlying managed platform.

---

## 4. Core Code Engine Entities: Application, Build, Job

### Learning Perspective
Three core entity types, corresponding directly to Code Engine's three main use cases from Section 2:

- **Application** — **runs your code to serve HTTP requests or to create WebSocket sessions** — a long-running (though still elastically scaled, including to zero) service handling ongoing incoming traffic, conceptually similar to a Kubernetes Deployment (covered in `kubernetes-ecosystem.md`) serving a stateless web workload.

- **Build** — a **process to create a container image from your source code** — taking raw source code and producing a runnable container image out of it, without the developer needing to manually write a Dockerfile or run `docker build` themselves (conceptually similar to OpenShift's Source-to-Image, covered in `openshift.md`).

- **Job** — **runs one or more instances of your executable code** — for tasks meant to **run to completion** rather than serve ongoing requests (directly analogous to a Kubernetes Job, covered in `kubernetes-ecosystem.md`) — e.g., a batch data-processing task, a one-off migration script, or a scheduled maintenance task.

**How these map to the three use cases:**
| Use case | Primary entity involved |
|---|---|
| Deploy applications | **Application** (using an already-built image) |
| Build and deploy applications | **Build** → **Application** (build from source, then deploy) |
| Run jobs | **Job** |

### Interview Perspective
**Q: What's the difference between an Application, a Build, and a Job in Code Engine?**
> An Application runs continuously (though elastically scaled) to serve HTTP requests or WebSocket sessions — a long-running service. A Build is the process of turning your source code into a runnable container image. A Job runs one or more instances of code meant to execute *to completion*, rather than serve ongoing traffic — for batch tasks, migrations, or one-off processing work.

**Q: How would "build and deploy applications" (Code Engine's second use case) actually work, in terms of these entities?**
> A Build entity takes your source code and produces a container image from it. That resulting image is then used to create/run an Application entity, which actually serves traffic using that freshly-built image — so this use case chains a Build entity into an Application entity, rather than requiring you to separately build an image yourself (e.g., locally via Docker) before deploying it.

⭐ **Frequently asked** — be ready to map Job vs. Application onto the same run-to-completion vs. run-continuously distinction covered for Kubernetes Jobs vs. Deployments in `kubernetes-ecosystem.md` — interviewers often check whether this concept transfers across platforms.

---

## 5. Containers: The Underlying Deployment Unit

### Learning Perspective
Regardless of which platform (Code Engine, raw Kubernetes, or otherwise) actually runs a microservice, the deployment unit itself is almost always a **container** — as covered in depth in `containers-and-containerization.md`, briefly recapped here in this deployment-focused context:

**A container is a standalone executable software unit** packaged with **all its dependencies** — code, runtime, libraries, and configuration, bundled together so it runs consistently regardless of the underlying host.

**Docker is a popular container building and running platform** — the dominant tool for actually creating and running containers in practice (also covered in depth in `containers-and-containerization.md`).

**You can compose a Dockerfile** to **instruct the Docker platform** to **build a container image** — the text-based recipe (also covered in `containers-and-containerization.md`) specifying exactly how to assemble a given application into a container image.

**After the container image is built, it can be pushed to the container registry**, and then **pulled by its image name** — the standard build → push → pull workflow: build locally (or via a CI/build pipeline), push the resulting image to a registry for storage/distribution, then any environment needing to run that image simply pulls it by name/tag from the registry.

```
Dockerfile → docker build → Container Image → docker push → Registry → docker pull → Running Container
```

### Interview Perspective
**Q: Why is the container the standard deployment unit for microservices, regardless of which specific orchestration/deployment platform is being used?**
> Because a container packages an application together with its exact runtime dependencies, guaranteeing consistent behavior regardless of the underlying host environment — this consistency is exactly what's needed when deploying many small, independently-built services (potentially in different languages/frameworks, as covered in `intro-to-microservices.md`'s technology-flexibility benefit) across a shared infrastructure platform. Whether that platform is raw Kubernetes, OpenShift, or a managed service like Code Engine, they all fundamentally operate on containers as their common, portable unit of deployment.

**Q: Walk through the standard workflow from source code to a running containerized microservice.**
> Write a Dockerfile describing how to build the application into a container image. Run `docker build` to produce that image locally (or this step happens automatically via a managed platform's Build entity, as in Code Engine). Push the resulting image to a container registry, making it available for distribution. The target deployment platform then pulls that image by its name/tag from the registry and runs it as a live container instance.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Self-hosted microservices challenge | Operational complexity multiplies with the number of independently deployed services |
| Why managed platforms help | Abstracts infrastructure/scaling/networking burden that scales with service count |
| IBM Cloud Code Engine | Fully managed platform — handles deployment infrastructure so devs focus on code |
| 3 Code Engine use cases | Deploy applications, build & deploy applications, run jobs |
| Project | Groups related Code Engine entities (apps, jobs, builds) together |
| Application | Runs continuously to serve HTTP requests/WebSocket sessions |
| Build | Creates a container image from source code |
| Job | Runs code to completion — batch/one-off tasks, not ongoing requests |
| Container | Standalone unit packaging code + all dependencies |
| Docker | Popular platform for building/running containers |
| Dockerfile | Text recipe instructing Docker how to build an image |
| Build → push → pull workflow | Build image → push to registry → pull by name to run elsewhere |