# Containers & Containerization (Docker)

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. What Is a Container?

### Learning Perspective
A **container** is a **software unit** that **packages everything needed to build, ship, and run an application** — the application code, runtime, system tools, system libraries, and settings, all bundled together as one **standard unit of software**, powered by a **containerization engine**.

**Why containers matter — the key benefits:**
- **Reduce deployment time and costs** — a container runs consistently across environments, eliminating "works on my machine" debugging
- **Improve resource utilization** — containers are lightweight compared to full VMs (see Section 8), letting more workloads run on the same physical hardware
- **Automate processes** — containers fit naturally into automated CI/CD pipelines (see Section 12)
- **Support next-generation applications**, such as **microservices** (see Section 13) — containers are the natural deployment unit for small, independently deployable services

**Popular container technologies and vendors** include **Docker**, **Podman**, **LXC**, and **Vagrant** — Docker being by far the most widely adopted in modern development workflows.

### Interview Perspective
**Q: What is a container, in your own words?**
> A standard, portable unit of software packaging an application together with everything it needs to run — code, runtime, system libraries, and configuration — so it runs consistently regardless of the underlying host environment.

**Q: What are the key benefits containers provide over traditional deployment approaches?**
> Faster, cheaper deployment (consistent behavior across environments), better resource utilization (containers are far lighter than full VMs), easier process automation (fitting naturally into CI/CD), and native support for modern architectural patterns like microservices, where many small, independently deployable services need a lightweight, consistent deployment unit.

---

## 2. Docker: Overview & When (Not) to Use It

### Learning Perspective
**Docker** is an **open platform** used to **develop, ship, and run applications in containers** — the dominant containerization platform in modern software development.

**Docker containers may not be the best fit for:**
- **Monolithic applications** — a single, large, tightly-coupled application often doesn't benefit much from containerization's core advantages (isolation, independent scaling of small pieces), since there's nothing to independently scale or isolate within a monolith
- **Workloads with strict high-performance requirements** — containers introduce a thin layer of overhead (though much less than VMs) that can matter for the most latency/performance-sensitive workloads
- **Workloads with strict security requirements** — since containers **share the host's kernel** (see Section 8), they offer a **thinner isolation boundary** than full VMs, which can be a meaningful concern for certain high-security, multi-tenant scenarios

### Interview Perspective
**Q: When might Docker/containerization NOT be the right choice for a given workload?**
> For large monolithic applications that don't benefit from independent scaling/isolation of smaller pieces, for workloads with extremely strict performance requirements where even minimal container overhead matters, or for workloads with strict security/isolation requirements — since containers share the host kernel, they offer a thinner security boundary than full VM-level isolation.

**Q: What is Docker, at a high level?**
> An open platform for developing, shipping, and running applications inside containers — providing the tooling (CLI, daemon, image format, registry ecosystem) that makes building and operating containerized applications practical.

---

## 3. Docker Architecture: Client, Host, Registry

### Learning Perspective
**Docker architecture consists of three main components**: the **Docker client**, the **Docker host**, and the **container registry**.

- **Docker client** — the **primary way many Docker users interact with Docker**. When you run commands like `docker run`, the client **sends these commands to `dockerd`** (the Docker daemon), which **carries them out**. The `docker` command uses the **Docker API**, and a single Docker client **can communicate with more than one daemon**.
  - The client provides the **Docker Command Line Interface (CLI)** — allowing you to issue build, run, and stop commands to a Docker daemon.

- **Docker host** — where the **Docker daemon (`dockerd`)** actually runs, and **manages Docker objects** such as **Dockerfiles, images, containers, networks, storage volumes, plugins, and add-ons**.
  - **Docker daemon (`dockerd`)** — **creates and manages Docker objects**, including images, containers, networks, and volumes — the actual engine doing the work behind every client command.

- **Container registry** — used for the **storage and distribution of named container images**. While many features can be built on top of a registry, its **most basic functions are to store images and retrieve them**.

```
Docker Client  --(Docker API)-->  dockerd (Docker Host)  <-->  Registry
    (CLI)                    (creates/manages objects)    (stores/retrieves images)
```

### Interview Perspective
**Q: What are the three main components of Docker's architecture, and how do they interact?**
> The Docker client (the CLI you interact with), the Docker host (running `dockerd`, the daemon that actually creates and manages containers/images/networks/volumes), and the container registry (which stores and distributes images). The client sends commands to the daemon via the Docker API; the daemon does the actual work and can pull/push images to a registry as needed.

**Q: What does the Docker daemon (`dockerd`) actually do?**
> It's the persistent background process that does the real work — creating and managing all Docker objects (images, containers, networks, volumes) — in response to commands received from a Docker client, whether that's the local CLI or a remote client communicating with a remote Docker host.

---

## 4. Images vs. Containers

### Learning Perspective
- **Image** — an **immutable file** containing the **source code, libraries, and dependencies** necessary for an application to run. Images are **templates or blueprints** for a container.
- **Container** — a **running instance** of an image — the actual live, executing unit created *from* that blueprint.

**Immutability** — a defining property of images: **images are read-only**; **if you change an image, you create a new image** (rather than modifying the original in place). This is a foundational property enabling consistency and reproducibility — an image, once built, never silently changes underneath you.

### Interview Perspective
**Q: What's the relationship between a Docker image and a Docker container?**
> An image is an immutable, read-only template/blueprint — containing everything an application needs to run. A container is a live, running instance created from that image. You can start multiple independent containers from the exact same image, each running in isolation from the others.

**Q: Why does image immutability matter?**
> Because it guarantees an image behaves identically every time it's used — you can't accidentally alter an existing image in place; any change produces a *new* image (a new version/tag). This makes deployments reproducible and predictable — the exact same image that passed testing is guaranteed to be the exact same image running in production, with nothing having silently drifted in between.

---

## 5. Dockerfile

### Learning Perspective
A **Dockerfile** is a **text document** that contains **all the commands** you would normally execute **manually** in order to **build a Docker image**. Docker can **build images automatically** by **reading the instructions from a Dockerfile**.

```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Common Dockerfile instructions** (not exhaustively covered in the source glossary, but standard):
- **`FROM`** — the base image to build on top of
- **`WORKDIR`** — sets the working directory inside the container
- **`COPY`** — copies files from the host into the image
- **`RUN`** — executes a command during the **build** process (e.g., installing dependencies)
- **`EXPOSE`** — documents which port the container listens on
- **`CMD`** — the default command run when a container **starts**

### Interview Perspective
**Q: What is a Dockerfile, and what's its role in the image-building process?**
> A text file listing, in order, the exact commands and instructions Docker needs to build an image automatically — base image, dependency installation, file copying, and the startup command — rather than manually configuring the environment by hand every time. Running `docker build` reads and executes these instructions to produce a reproducible image.

**Q: What's the difference between the `RUN` and `CMD` instructions in a Dockerfile?**
> `RUN` executes during the *build* process, producing a new layer baked into the resulting image (e.g., installing dependencies). `CMD` specifies the default command that runs when a container is *started* from the built image — it doesn't execute at build time at all, only at container runtime.

---

## 6. Docker CLI: Building, Running & Managing Containers

### Learning Perspective
Common Docker CLI workflows, corresponding to the glossary terms provided:

**Building images:**
```bash
docker build .              # builds an image from a Dockerfile in the current directory
docker build . -t myapp:latest   # builds AND tags the image at the same time
```

**Running & inspecting containers:**
```bash
docker run myapp                  # runs a command in a new container
docker run -p 8080:80 myapp        # runs the container, publishing/mapping ports (host:container)
docker ps                          # lists currently running containers
docker ps -a                       # lists ALL containers, including ones that exited
docker images                      # lists locally available images
```

**Stopping & cleaning up:**
```bash
docker stop <container_id>              # stops one or more running containers
docker stop $(docker ps -q)              # stops ALL running containers
docker container rm <container_id>        # removes a (stopped) container
```

**Working with registries:**
```bash
docker pull <image>          # pulls the latest image/repository FROM a registry
docker push <image>          # pushes an image/repository TO a registry
docker tag <source> <target>   # creates a tag for a target image, referring to a source image
```

**Miscellaneous:**
```bash
docker --version              # displays the Docker CLI version
```

### Interview Perspective
**Q: What's the difference between `docker ps` and `docker ps -a`?**
> `docker ps` lists only currently *running* containers. `docker ps -a` lists *all* containers, including ones that have already stopped/exited — useful when you need to find and clean up (or inspect) a container that ran and finished, rather than one still actively running.

**Q: Walk through the basic Docker workflow to build, run, and publish an image.**
> `docker build . -t myapp:latest` builds an image from the local Dockerfile and tags it. `docker run -p 8080:80 myapp` starts a container from that image, mapping a host port to a container port so it's actually reachable. `docker push myapp` (after appropriate tagging/login) sends the image to a registry, making it available for others (or other environments) to `docker pull` and run elsewhere.

**Q: What does `docker stop $(docker ps -q)` do, and how does it work?**
> It stops every currently running container in one command. `docker ps -q` lists only the container IDs (quiet mode) of running containers; wrapping that in `$(...)` substitutes those IDs directly as arguments to `docker stop`, effectively stopping all of them at once.

⭐ **Frequently asked** — be ready to write basic build/run/push commands from memory; this is one of the most common practical Docker interview checks.

---

## 7. Registries, Repositories & Tags

### Learning Perspective
- **Registry** — a **hosted service** containing **repositories of images**, which responds to the **Registry API**. **Docker Hub** is the most well-known public registry — described as "the world's easiest way to create, manage, and deliver your team's container applications."
- **Repository** — a **set of Docker images**. A repository can be **shared by pushing it to a registry server**. The **different images in the repository** can be **labelled using tags**.
- **Tag** — a **label applied to a Docker image** in a repository. Tags are how **various images in a repository are distinguished from each other** (e.g., `myapp:1.0`, `myapp:latest`).
- **Private Registry** — **restricts access to images** so that **only authorized users** can view and use them (as opposed to a public registry like the default Docker Hub).
- **IBM Cloud Container Registry** — an example of a **fully managed private registry**, storing and distributing container images.

```bash
docker tag myapp myapp:1.0        # tag an image
docker push myregistry.com/myapp:1.0   # push a specific tagged image to a registry
```

### Interview Perspective
**Q: What's the relationship between a registry, a repository, and a tag?**
> A registry is the hosted service that stores and serves images (like Docker Hub). Within a registry, images are organized into repositories — a named collection of related images. Within a repository, individual images are distinguished from each other using tags (like version numbers, e.g., `1.0`, `latest`) — so a full image reference typically looks like `registry/repository:tag`.

**Q: Why would an organization use a private registry instead of a public one like Docker Hub?**
> To restrict access to their images to only authorized users/systems — public registries make images available to anyone, which isn't appropriate for proprietary application code or images containing anything sensitive. A private registry (self-hosted, or a managed offering like IBM Cloud Container Registry) keeps images restricted to the organization's own authorized access.

---

## 8. Container Networking & the Isolation Model

### Learning Perspective
**Docker networks** help **isolate communication between containers** — controlling which containers can talk to each other and to the outside world, rather than every container being able to freely reach every other one by default.

**Underlying isolation mechanisms** — how Docker actually achieves this isolation:
- **Namespace** — a **Linux kernel feature** that **isolates and virtualizes system resources**. Processes restricted to a namespace can **only interact with resources or processes that are part of the same namespace**. Namespaces are an **important part of Docker's isolation model**, and **exist for each type of resource** — including **networking, storage, processes, hostname control**, and others.
- **Operating System (OS) Virtualization** — the broader paradigm this fits into: an operating system approach in which the **kernel allows multiple isolated user-space instances** — variously called **containers, zones, virtual private servers, partitions, virtual environments, virtual kernels, or jails**, depending on the specific technology.
- **LXC (LinuX Containers)** — an **OS-level virtualization technology** that allows the **creation and running of multiple isolated Linux virtual environments (VEs)** on a **single control host** — one of the foundational technologies containerization builds on.

**Docker localhost specifics:** Docker provides a **host network**, which lets containers **share the host's networking stack**. With this approach, **`localhost` inside a container resolves to the physical host**, instead of the container itself — an important nuance when debugging networking inside containers.

**Docker remote host:** a **remote Docker host** is a machine — **inside or outside your local network** — that is **running a Docker Engine** and has **ports exposed for querying the Engine API**, letting a local Docker client control containers running on a completely different machine.

### Interview Perspective
**Q: How does Docker achieve isolation between containers, at a technical level?**
> Primarily through Linux namespaces — a kernel feature that isolates and virtualizes system resources (networking, storage, processes, hostnames, etc.) per namespace, so processes in one namespace can't see or interact with resources in another. This is the foundational isolation mechanism Docker builds its container model on top of, part of the broader category of OS-level virtualization.

**Q: What's the difference between Docker's default networking and "host" networking, particularly regarding `localhost`?**
> By default, each container gets its own isolated network namespace, so `localhost` inside a container refers to the container itself, not the host machine. With Docker's host network mode, the container shares the host's actual networking stack directly — meaning `localhost` inside that container now resolves to the physical host machine instead, which is an important distinction when debugging network connectivity issues.

---

## 9. Storage: Volumes, Bind Mounts & Plugins

### Learning Perspective
**Docker storage** uses **volumes and bind mounts** to **persist data even after a running container is stopped** — since a container's own filesystem is ephemeral by default (changes disappear when the container is removed), anything genuinely needing to persist must live outside the container's own writable layer.

- **Volumes** — storage managed by Docker itself, independent of the host's specific filesystem structure — the generally **recommended** approach for persisting container data
- **Bind mounts** — map a **specific path on the host machine** directly into the container — more directly tied to the host's filesystem layout, often used in development for live-reloading code

**Docker plugins** — such as a **storage plugin** — provide the ability to **connect external storage platforms** to Docker, extending its storage capabilities beyond local volumes/bind mounts to external systems (e.g., cloud block storage).

### Interview Perspective
**Q: Why does Docker need volumes/bind mounts at all — why can't data just live inside the container?**
> A container's own filesystem is ephemeral by design — when the container is removed, its writable layer (and anything written to it) is gone. Volumes and bind mounts provide storage that exists *outside* that ephemeral container lifecycle, so data (like a database's actual data files) persists even if the container running it is stopped, removed, and recreated.

**Q: What's the practical difference between a volume and a bind mount?**
> A volume is storage managed entirely by Docker, abstracted away from the host's specific directory structure — generally the recommended, more portable approach. A bind mount maps a specific, explicit path on the host filesystem directly into the container — more tightly coupled to the host machine's layout, but useful in scenarios like local development, where you want a container to directly reflect live changes to source files on your host machine.

---

## 10. Container Runtimes & Related Virtualization Concepts

### Learning Perspective
- **Daemon-less** — a container runtime that **does not run any specific program (daemon)** to create objects such as images, containers, networks, and volumes — contrasting with Docker's traditional architecture, which relies on the persistent `dockerd` daemon (Section 3). Some newer container tools (like Podman) are explicitly daemon-less, as an architectural alternative.
- **Server Virtualization** — the **process of dividing a physical server into multiple unique and isolated virtual servers**, by means of a software application. **Each virtual server can run its own operating system independently** — this describes traditional **VM-based virtualization**, distinct from container-based OS virtualization.

**Containers vs. traditional VMs — the key architectural difference:** containers **share the host's OS kernel** (via namespaces and related isolation mechanisms), whereas traditional VMs each run a **complete, independent guest operating system** on top of virtualized hardware (via a hypervisor). This is why containers are dramatically lighter-weight and faster to start than VMs, at the cost of a thinner isolation boundary (as noted in Section 2).

### Interview Perspective
**Q: What does "daemon-less" mean in the context of container runtimes, and how does it contrast with Docker's traditional architecture?**
> A daemon-less runtime doesn't rely on a persistent background daemon process (like Docker's `dockerd`) to create and manage containers/images/etc. Docker's traditional architecture depends on `dockerd` running continuously; some alternative tools (like Podman) are explicitly designed without this daemon dependency, which can have implications for security (no long-running root process) and resource usage.

**Q: What's the fundamental architectural difference between containers and traditional virtual machines?**
> Containers share the host machine's OS kernel, using kernel-level isolation (namespaces) to separate workloads — much lighter-weight, faster to start. Traditional VMs each run a full, independent guest operating system on top of virtualized hardware via a hypervisor — heavier, slower to start, but with a stronger, hardware-level isolation boundary between workloads.

---

## 11. Cloud-Native, Serverless & REST APIs (Related Context)

### Learning Perspective
A few adjacent concepts commonly discussed alongside containerization:

- **Cloud native** — a **cloud-native application** is a program **designed for a cloud computing architecture** — run and hosted in the cloud, and designed to **capitalize on the inherent characteristics** of a cloud computing software delivery model (elasticity, distributed infrastructure, managed services — see `cloud-native-applications` coverage in your cloud-computing notes for more depth).
- **Serverless** — a **cloud-native development model** that allows developers to **build and run applications without having to manage servers** at all — the cloud provider handles all underlying infrastructure automatically.
- **Client-server architecture** — a **distributed application structure** that **partitions tasks or workloads** between **providers of a resource/service** (**servers**) and **service requesters** (**clients**) — the foundational architectural pattern underlying most networked applications, including containerized ones.
- **REST API** — (also called a **RESTful API**) — an application programming interface that **conforms to the constraints of REST architectural style**, allowing interaction with **RESTful web services** (covered in depth in `express-framework.md` and `api-and-authentication.md`).

### Interview Perspective
**Q: How does containerization relate to cloud-native application development?**
> Containers are one of the foundational building blocks of cloud-native applications — they provide the consistent, portable, lightweight deployment unit that lets cloud-native apps (often built as microservices) be deployed, scaled, and orchestrated efficiently across cloud infrastructure, capitalizing on the cloud's elasticity and distributed nature.

---

## 12. Containers in CI/CD & DevOps Workflows

### Learning Perspective
- **DevOps** — a set of **practices, tools, and a cultural philosophy** that **automate and integrate the processes between software development and IT teams**.
- **Agile** — an **iterative approach** to project management and software development that helps teams **deliver value to their customers faster and with fewer issues**.
- **CI/CD pipelines** — a **continuous integration and continuous deployment (CI/CD) pipeline** is a **series of steps** that must be performed in order to **deliver a new version of software**. CI/CD pipelines are a **practice focused on improving software delivery** throughout the software development lifecycle **via automation**.

**Why containers and CI/CD pair so naturally:** a container image, once built and tested in a CI pipeline, is the **exact same artifact** deployed to production — eliminating environment-related surprises between testing and production deployment, and making automated build/test/deploy pipelines far more reliable and reproducible than deploying loosely-defined server configurations.

### Interview Perspective
**Q: Why do containers fit so naturally into CI/CD pipelines?**
> Because the container image built and tested during CI is the exact same artifact deployed to production during CD — there's no "rebuilding" or reconfiguring between environments, eliminating a common source of environment-related deployment failures. This consistency, combined with containers' fast startup time, makes automated build-test-deploy pipelines significantly more reliable and efficient.

**Q: How does DevOps relate to practices like CI/CD and containerization?**
> DevOps is the broader cultural/organizational philosophy of unifying development and operations to improve software delivery speed and reliability. CI/CD pipelines and containerization are concrete practices/technologies that *implement* DevOps principles in practice — automating integration, testing, and deployment (CI/CD), using a consistent, portable deployment unit (containers) to make that automation reliable across environments.

---

## 13. Microservices & Containers

### Learning Perspective
**Microservices** are a **cloud-native architectural approach** in which a **single application contains many loosely coupled and independently deployable smaller components or services** (covered in more depth in `modern-cloud-computing-technologies.md`).

**Why containers are the natural fit for microservices:** each microservice can be packaged as its **own independent container image**, deployed, scaled, and updated **independently** of every other service — directly mirroring microservices' core principle of independent deployability. Without containers (or similar lightweight, portable packaging), achieving genuinely independent deployment of many small services at scale would be significantly more operationally complex.

### Interview Perspective
**Q: Why are containers so commonly paired with a microservices architecture?**
> Because microservices are defined by independent deployability — each service should be buildable, deployable, and scalable on its own. Containers provide exactly the lightweight, consistent, portable packaging unit needed to achieve that in practice — each microservice becomes its own container image, independently versioned and deployed, without needing to coordinate deployment with every other service in the system.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Agile** | Iterative project management/development approach, delivering value faster with fewer issues |
| **Client-server architecture** | Distributed structure partitioning work between servers (providers) and clients (requesters) |
| **Container** | Standard unit of software packaging code, runtime, tools, libraries, and settings |
| **Container Registry** | Storage/distribution service for named container images |
| **CI/CD pipeline** | Automated series of steps to deliver a new software version |
| **Cloud native** | An application designed specifically for cloud computing architecture |
| **Daemon-less** | A container runtime without a persistent background daemon process |
| **DevOps** | Practices/tools/culture automating and integrating dev and IT/ops processes |
| **Docker** | Open platform for developing, shipping, and running applications in containers |
| **Dockerfile** | Text document with build instructions for creating a Docker image |
| **Docker client** | The primary interface (CLI) users interact with to send commands to `dockerd` |
| **Docker CLI** | The command-line interface provided by the Docker client |
| **Docker daemon (dockerd)** | Creates and manages Docker objects (images, containers, networks, volumes) |
| **Docker Hub** | A public registry for creating, managing, and delivering container applications |
| **Docker localhost** | Host networking mode where `localhost` in a container resolves to the physical host |
| **Docker remote host** | A separate machine running a Docker Engine, with an exposed, queryable API |
| **Docker networks** | Isolate communication between containers |
| **Docker plugins** | Extend Docker's capabilities — e.g., connecting external storage platforms |
| **Docker storage** | Volumes and bind mounts, used to persist data beyond a container's lifecycle |
| **LXC** | Linux Containers — OS-level virtualization for isolated Linux virtual environments |
| **IBM Cloud Container Registry** | A fully managed private container registry |
| **Image** | An immutable file/blueprint containing source code, libraries, and dependencies |
| **Immutability** | Images are read-only; changing one creates a new image |
| **Microservices** | Cloud-native architecture of many loosely coupled, independently deployable services |
| **Namespace** | Linux kernel feature isolating/virtualizing system resources per process group |
| **OS Virtualization** | Kernel-level paradigm enabling multiple isolated user-space instances (containers) |
| **Private Registry** | A registry restricting image access to authorized users only |
| **REST API** | An API conforming to REST architectural constraints |
| **Registry** | A hosted service containing repositories of images |
| **Repository** | A set of Docker images, distinguishable via tags |
| **Server Virtualization** | Dividing a physical server into multiple isolated virtual servers, each with its own OS |
| **Serverless** | A cloud-native model letting developers build/run apps without managing servers |
| **Tag** | A label distinguishing images within a repository |

---

## Quick Reference: Docker & IBM Cloud CLI Commands

| Command | Description |
|---|---|
| `curl localhost` | Pings the running application |
| `docker build .` | Builds an image from a Dockerfile |
| `docker build . -t <name>` | Builds and tags the image in one step |
| `docker container rm <id>` | Removes a container |
| `docker images` | Lists locally available images |
| `docker ps` | Lists currently running containers |
| `docker ps -a` | Lists all containers, including exited ones |
| `docker pull <image>` | Pulls the latest image/repository from a registry |
| `docker push <image>` | Pushes an image/repository to a registry |
| `docker run <image>` | Runs a command in a new container |
| `docker run -p <host>:<container>` | Runs a container, publishing/mapping ports |
| `docker stop <id>` | Stops one or more running containers |
| `docker stop $(docker ps -q)` | Stops all running containers |
| `docker tag <source> <target>` | Creates a tag for an image |
| `docker --version` | Displays the Docker CLI version |
| `exit` | Closes the terminal session |
| `export MY_NAMESPACE` | Exports a namespace as an environment variable |
| `git clone <url>` | Clones a repository containing needed artifacts |
| `ibmcloud cr images` | Lists images in the IBM Cloud Container Registry |
| `ibmcloud cr login` | Logs your local Docker daemon into IBM Cloud Container Registry |
| `ibmcloud cr namespaces` | Views namespaces you have access to |
| `ibmcloud cr region-set` | Sets the target region for your cloud account |
| `ibmcloud target` | Shows info about the account you're targeting |
| `ibmcloud version` | Displays the IBM Cloud CLI version |
| `ls` | Lists directory contents |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Container | Portable unit packaging app code + runtime + dependencies + config |
| Docker | Open platform to build, ship, run containerized applications |
| When NOT to containerize | Monolithic apps, extreme performance needs, extreme security/isolation needs |
| Docker architecture | Client (CLI) → dockerd (host, manages objects) → Registry (stores images) |
| Image vs. container | Immutable blueprint vs. a running instance of that blueprint |
| Dockerfile | Text file of build instructions, read by `docker build` |
| `docker ps` vs `docker ps -a` | Running containers only vs. all containers (including exited) |
| Registry / Repository / Tag | Hosting service → named image collection → version label within it |
| Namespaces | Linux kernel feature isolating resources — Docker's core isolation mechanism |
| Containers vs. VMs | Share host kernel (light) vs. full guest OS per VM (heavy, stronger isolation) |
| Volumes/bind mounts | Persist data beyond a container's ephemeral filesystem lifecycle |
| Why containers + CI/CD fit | Same image built, tested, and deployed — no environment drift |
| Containers + microservices | Each service = its own independently deployable container image |