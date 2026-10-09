# Operating Systems Fundamentals

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Built from general computer science fundamentals, since no source content was provided. Worth cross-checking against your actual course material for exact terminology or emphasis. Complements `containers-and-containerization.md` (which touches OS-level virtualization) and `git-and-github-fundamentals.md`/`server-side-js.md` (which assume familiarity with processes and files).

---

## 1. What Is an Operating System?

### Learning Perspective
An **operating system (OS)** is the software layer that sits between hardware and application programs, **managing hardware resources** (CPU, memory, storage, I/O devices) and **providing services** that applications rely on, so individual programs don't need to talk to hardware directly.

**Core responsibilities of an OS:**
- **Process management** — creating, scheduling, and terminating processes
- **Memory management** — allocating and tracking memory for running programs
- **File system management** — organizing and providing access to persistent storage
- **I/O management** — coordinating communication with devices (disks, network, keyboard, etc.)
- **Security and access control** — enforcing permissions between users/processes

**Two key abstractions an OS provides, which make everything else possible:**
- **The process** — the illusion that each program has the entire CPU (and its own memory) to itself, even though many programs run concurrently on shared hardware
- **The file** — a uniform way of naming and accessing persistent data, hiding the physical details of the underlying storage device

### Interview Perspective
**Q: What is an operating system, and what's its core purpose?**
> The OS is the software layer managing a computer's hardware resources and providing services that applications rely on — so individual programs don't need to directly manage the CPU, memory, or devices themselves. Its core purpose is abstraction and resource management: giving each running program the illusion of having dedicated resources, while actually sharing limited physical hardware safely and efficiently among many programs.

**Q: What are the main resources an OS manages?**
> The CPU (via process scheduling), memory (via memory management), persistent storage (via the file system), and I/O devices (via device drivers and I/O management) — plus security/access control governing how processes and users can interact with these resources.

---

## 2. Processes & Threads

### Learning Perspective
A **process** is a program in execution — it has its own memory space, its own set of resources (open files, etc.), and represents one independent unit of work the OS schedules and manages.

**Process states** (a simplified state machine every process moves through):
- **New** — being created
- **Ready** — waiting to be assigned to a CPU
- **Running** — currently executing on a CPU
- **Waiting/Blocked** — waiting for an event (I/O completion, a resource) before it can continue
- **Terminated** — finished executing

**A thread** is a smaller unit of execution *within* a process — multiple threads within the same process **share the same memory space** (and other process resources), but each thread has its own **program counter, stack, and register set**, letting them execute independently.

**Process vs. thread — the key distinction:**
| | Process | Thread |
|---|---|---|
| Memory | Own, isolated memory space | Shares memory with sibling threads in the same process |
| Creation cost | Heavier (more overhead) | Lighter (faster to create) |
| Communication | Requires inter-process communication (IPC) — more complex | Direct (shared memory) — simpler, but requires careful synchronization |
| Isolation | Strong — a crash in one process doesn't directly affect another | Weaker — a bug in one thread can corrupt shared memory affecting other threads in the same process |

**Context switching** — the act of the CPU saving the state of a currently running process/thread and loading the state of another, so the CPU can switch to executing something else. This is what makes it *appear* as though many processes run simultaneously on a machine with fewer CPU cores than running processes — the OS rapidly switches between them.

### Interview Perspective
**Q: What's the difference between a process and a thread?**
> A process is an independent program in execution with its own memory space and resources. A thread is a unit of execution within a process — multiple threads in the same process share that process's memory, but each has its own stack and program counter. Because threads share memory, creating them is cheaper and inter-thread communication is faster than inter-process communication, but that shared memory also means threads need careful synchronization to avoid corrupting shared data, and a bug in one thread can more easily affect the whole process.

**Q: What is context switching, and why does it introduce overhead?**
> Context switching is the OS saving the current process/thread's state (registers, program counter, memory mappings) and loading another's, so the CPU can move on to executing something else. It introduces overhead because saving/restoring that state takes actual CPU cycles that aren't spent doing useful work — plus, switching often invalidates CPU caches (data that was "hot" for the previous process needs to be reloaded for the new one), which is why excessive context switching ("thrashing") can meaningfully hurt overall system performance.

⭐ **Very frequently asked** — process vs. thread is one of the single most common OS interview questions; be ready to also state a concrete example (e.g., "a web browser runs each tab as a separate process for isolation, but within a tab, multiple threads might handle rendering, JS execution, and network requests concurrently").

---

## 3. CPU Scheduling

### Learning Perspective
Since there are typically more processes wanting to run than there are CPU cores available, the OS's **scheduler** decides which process gets the CPU next, and for how long — governed by a **scheduling algorithm**.

**Common scheduling algorithms:**
- **First-Come, First-Served (FCFS)** — processes run in the order they arrive; simple, but a long process can delay everything behind it ("convoy effect")
- **Shortest Job First (SJF)** — runs the process with the smallest expected execution time next; minimizes average waiting time, but requires knowing job lengths in advance (often unrealistic) and can starve longer jobs
- **Round Robin (RR)** — each process gets a small, fixed **time slice (quantum)**; after its slice, it's moved to the back of the queue, and the next process runs — fair, and commonly used in general-purpose, interactive systems (this is why your computer feels responsive even when many programs run "simultaneously")
- **Priority Scheduling** — processes are assigned a priority, and the highest-priority ready process runs next; risks **starvation** of low-priority processes unless mitigated (e.g., via **aging** — gradually increasing a waiting process's priority the longer it waits)
- **Multilevel Queue / Multilevel Feedback Queue** — processes are grouped into multiple queues (e.g., interactive vs. batch), each potentially with its own scheduling algorithm, and processes can move between queues based on behavior (a feedback queue specifically allows this dynamic movement)

**Preemptive vs. non-preemptive scheduling:**
- **Preemptive** — the OS can forcibly interrupt a running process to give the CPU to another (e.g., Round Robin, when a time slice expires)
- **Non-preemptive** — once a process starts running, it keeps the CPU until it voluntarily yields (finishes, or blocks on I/O)

### Interview Perspective
**Q: What's the difference between preemptive and non-preemptive scheduling?**
> In preemptive scheduling, the OS can interrupt a currently-running process to give the CPU to another — e.g., when a Round Robin time slice expires. In non-preemptive scheduling, once a process gets the CPU, it keeps it until it finishes or voluntarily blocks (e.g., waiting on I/O) — the OS can't forcibly take it back. Preemptive scheduling generally provides better responsiveness for interactive systems, at the cost of the overhead of more frequent context switching.

**Q: What is "starvation" in the context of CPU scheduling, and how can it be mitigated?**
> Starvation is when a process (typically low-priority) never gets scheduled to run, because higher-priority processes keep arriving and taking precedence indefinitely. It's commonly mitigated via **aging** — gradually increasing a waiting process's priority the longer it sits in the ready queue, eventually guaranteeing it becomes high-priority enough to run.

**Q: Why is Round Robin commonly used for general-purpose, interactive operating systems?**
> Because it guarantees every process gets a fair, bounded share of CPU time relatively quickly (within one full cycle of the queue), which keeps the system feeling responsive to interactive users — no single process can monopolize the CPU indefinitely, unlike FCFS, and unlike SJF/priority scheduling, it doesn't require predicting job length or risk starving any particular process (as long as the time quantum is reasonably chosen).

---

## 4. Memory Management

### Learning Perspective
The OS is responsible for allocating memory to processes, tracking what's in use, and reclaiming it when no longer needed.

**Key concepts:**
- **Logical (virtual) address vs. physical address** — a process operates using **virtual addresses**, which the OS/hardware (via the **Memory Management Unit, MMU**) translates into actual **physical addresses** in RAM. This indirection is what allows several important capabilities (below).
- **Virtual memory** — lets a process use more memory than is physically available as RAM, by using disk storage as an overflow ("swap space"), and lets each process believe it has its own large, contiguous, private address space, isolated from other processes.
- **Paging** — divides physical memory into fixed-size blocks called **frames**, and a process's virtual memory into equally-sized **pages**. The OS maintains a **page table** mapping virtual pages to physical frames — pages don't need to be stored contiguously in physical memory, which eliminates a major source of wasted, unusable memory (external fragmentation) that plagued older, contiguous-allocation approaches.
- **Segmentation** — divides memory into variable-sized **segments** based on logical program divisions (code, data, stack), rather than fixed-size pages — more aligned with how a program is actually structured, but can suffer from external fragmentation, unlike paging.
- **Page fault** — occurs when a process accesses a virtual page that isn't currently loaded into a physical frame (e.g., it's been swapped out to disk) — the OS intercepts this, loads the needed page from disk into memory, updates the page table, and lets the process continue, transparently to the process itself.
- **Thrashing** — when a system spends more time swapping pages in and out of memory than actually executing useful work, typically because too many processes are competing for too little physical RAM — a severe performance pathology.

### Interview Perspective
**Q: What is virtual memory, and what two main benefits does it provide?**
> Virtual memory is an abstraction giving each process its own private, seemingly large address space, translated by the OS/MMU into actual physical memory addresses. It provides two key benefits: it lets the total memory used across all processes exceed physically available RAM (using disk as overflow), and it provides memory isolation between processes — one process can't directly read or corrupt another's memory, since each only ever deals with its own virtual address space.

**Q: What's the difference between paging and segmentation?**
> Paging divides memory into fixed-size blocks (pages/frames), independent of a program's logical structure — this avoids external fragmentation since any free frame can hold any page, but it's less aligned with how the programmer actually thinks about memory. Segmentation divides memory into variable-sized segments matching a program's logical divisions (code, data, stack) — more intuitive, but can suffer from external fragmentation as segments of different sizes are allocated and freed over time.

**Q: What is a page fault, and is it always a bad thing?**
> A page fault occurs when a process accesses a virtual page not currently loaded into physical memory — the OS transparently loads it from disk and lets execution continue. It's not inherently catastrophic — a "minor" page fault, resolved quickly, is a completely normal part of how virtual memory works. It becomes a real problem when page faults happen excessively (thrashing) — indicating the system doesn't have enough physical memory for its current workload, causing constant disk swapping that severely degrades performance.

⭐ **Frequently asked** — paging vs. segmentation, and the concept of a page fault, are classic OS fundamentals questions.

---

## 5. Concurrency & Synchronization

### Learning Perspective
When multiple processes/threads run concurrently and access **shared resources**, careful coordination is needed to avoid corrupting data or producing incorrect results.

**Race condition** — occurs when the outcome of a program depends on the **unpredictable timing/interleaving** of multiple threads/processes accessing shared data — without proper synchronization, two threads incrementing a shared counter "simultaneously" might both read the same initial value, both increment it, and both write back the same result — losing one of the two increments.

**Critical section** — the specific portion of code where a process/thread accesses shared resources, and which therefore must not be executed by more than one thread/process at the same time.

**Common synchronization mechanisms:**
- **Mutex (mutual exclusion lock)** — ensures only **one** thread can hold the lock (and therefore access the critical section) at a time; other threads attempting to acquire it block until it's released
- **Semaphore** — a more general synchronization tool than a mutex, maintaining a **counter** — allows up to N threads to access a resource simultaneously (a **binary semaphore**, with a count of 1, behaves like a mutex)
- **Monitor** — a higher-level synchronization construct bundling shared data together with the procedures that operate on it, automatically ensuring mutual exclusion for those procedures (used in languages like Java, via `synchronized`)

### Interview Perspective
**Q: What is a race condition, and how do synchronization mechanisms prevent it?**
> A race condition occurs when the correctness of a program depends on the unpredictable timing of concurrent operations on shared data — e.g., two threads both reading, incrementing, and writing back a shared counter, potentially losing an update if their operations interleave badly. Synchronization mechanisms like mutexes prevent this by ensuring only one thread can execute the critical section (the code touching the shared data) at a time — forcing other threads to wait their turn, so operations on the shared data happen safely, one at a time, rather than overlapping unpredictably.

**Q: What's the difference between a mutex and a semaphore?**
> A mutex allows exactly one thread to hold it at a time — pure mutual exclusion. A semaphore is more general, maintaining a counter that can allow up to N threads simultaneous access to a resource (e.g., a connection pool with a fixed number of available connections) — a semaphore with a count of exactly 1 (a "binary semaphore") behaves equivalently to a mutex, but semaphores can represent broader resource-counting scenarios that a plain mutex can't.

---

## 6. Deadlock

### Learning Perspective
**Deadlock** occurs when two or more processes are each waiting for a resource held by another, in a cycle, such that **none of them can ever proceed**.

**Four necessary conditions for deadlock** (all must hold simultaneously — this is a classic, frequently-tested list):
1. **Mutual exclusion** — at least one resource must be held in a non-shareable way (only one process can use it at a time)
2. **Hold and wait** — a process holding at least one resource is waiting to acquire additional resources currently held by other processes
3. **No preemption** — a resource can only be released voluntarily by the process holding it, not forcibly taken away
4. **Circular wait** — a cycle of processes exists, where each is waiting for a resource held by the next process in the cycle

**Deadlock handling strategies:**
- **Prevention** — design the system so at least one of the four conditions can never hold (e.g., requiring processes to request all needed resources upfront, eliminating "hold and wait")
- **Avoidance** — dynamically examine resource-allocation requests to ensure the system never enters an unsafe state (e.g., the **Banker's Algorithm**)
- **Detection and recovery** — allow deadlock to occur, but periodically check for it, and recover by forcibly terminating or rolling back one of the involved processes
- **Ignorance** (the "ostrich algorithm") — simply assume deadlock is rare enough not to be worth the overhead of prevention/detection, and handle it manually if it ever happens (this is, pragmatically, what many general-purpose operating systems actually do)

### Interview Perspective
**Q: What are the four necessary conditions for deadlock to occur?**
> Mutual exclusion (a resource can only be used by one process at a time), hold and wait (a process holds one resource while waiting for another), no preemption (resources can't be forcibly taken away, only voluntarily released), and circular wait (a cycle of processes each waiting on the next). All four must hold simultaneously for deadlock to be possible — breaking even one of them prevents deadlock.

**Q: Give a simple, concrete example of a deadlock.**
> Process A holds Resource 1 and is waiting for Resource 2. Process B holds Resource 2 and is waiting for Resource 1. Neither can proceed — A can't get Resource 2 until B releases it, but B won't release it until it gets Resource 1, which A is holding. This is the classic two-process circular wait scenario.

**Q: What's the difference between deadlock prevention and deadlock avoidance?**
> Prevention takes a static approach — designing the system so that one of the four necessary conditions structurally can never occur (e.g., requiring all resources be requested at once, upfront). Avoidance is more dynamic — the system examines each resource request as it comes in and only grants it if doing so keeps the system in a provably "safe" state (one where a sequence exists allowing all processes to eventually complete), rejecting or delaying requests that would risk an unsafe state — more flexible than prevention, but requires more runtime overhead and advance knowledge of processes' maximum resource needs.

⭐ **Extremely frequently asked** — the four conditions for deadlock are one of the most commonly tested exact-recall facts in OS interviews; know them cold, in order.

---

## 7. File Systems

### Learning Perspective
A **file system** organizes how data is stored, named, and retrieved on persistent storage (disks, SSDs).

**Key concepts:**
- **File** — a named collection of related data, treated as a single logical unit
- **Directory (folder)** — a structure organizing files (and other directories) hierarchically
- **File Allocation Table (FAT), inode-based systems (like ext4), NTFS** — different concrete implementations of how a file system tracks which physical disk blocks belong to which file
- **inode** — in Unix-like systems, a data structure storing a file's metadata (permissions, owner, size, timestamps, and pointers to the actual data blocks on disk) — separate from the filename itself (a directory just maps names to inode numbers, which is why a file can have multiple names/hard links pointing to the same underlying inode)
- **Journaling file system** — maintains a **log (journal)** of changes about to be made, before actually making them, so the file system can recover cleanly to a consistent state after a crash or power failure, by replaying or rolling back incomplete journal entries

### Interview Perspective
**Q: What is an inode, and why is it separate from a file's name?**
> An inode is a data structure storing a file's metadata (permissions, owner, size, timestamps, and pointers to its actual data blocks) — but not the filename itself. The filename lives in a directory entry, which just maps a name to an inode number. This separation is why hard links work — multiple different filenames (even in different directories) can point to the exact same inode, meaning they refer to the literal same underlying file data, not copies.

**Q: What is a journaling file system, and what problem does it solve?**
> A journaling file system records intended changes to a log (the journal) before actually applying them to the main file system structure. If the system crashes or loses power mid-operation, the file system can recover cleanly on reboot by replaying completed journal entries or rolling back incomplete ones — preventing the kind of corruption that could occur if a crash happened mid-write, leaving the file system's structural metadata in an inconsistent, unrecoverable state.

---

## 8. I/O Management

### Learning Perspective
The OS coordinates communication between the CPU/software and physical I/O devices (disks, network interfaces, keyboards, etc.) via **device drivers** — specialized software translating generic OS I/O requests into device-specific commands.

**I/O approaches:**
- **Polling** — the CPU repeatedly checks ("polls") whether a device is ready, wasting CPU cycles while waiting
- **Interrupt-driven I/O** — the device notifies the CPU (via a hardware **interrupt**) when it's ready/done, letting the CPU do other useful work in the meantime rather than actively waiting
- **DMA (Direct Memory Access)** — lets a device transfer data directly to/from memory **without** requiring the CPU to manage every individual byte of the transfer, freeing the CPU to do other work during large data transfers (e.g., reading a large file from disk)

### Interview Perspective
**Q: Why is interrupt-driven I/O generally preferred over polling?**
> Polling wastes CPU cycles by repeatedly checking device status, even when the device isn't ready yet — the CPU can't do anything else useful during that busy-waiting. Interrupt-driven I/O lets the CPU move on to other work entirely, and the device signals the CPU (via an interrupt) only once it's actually ready or has completed its operation — a far more efficient use of CPU time.

**Q: What problem does DMA solve?**
> Without DMA, the CPU itself would need to manage every individual byte of a data transfer between a device and memory — an enormous waste of CPU time for large transfers (like reading a big file from disk). DMA lets the device transfer data directly to/from memory independently, with the CPU only involved at the start (initiating the transfer) and end (handling a completion interrupt) — freeing the CPU to do other useful work throughout the bulk of the transfer.

---

## 9. Types of Operating Systems

### Learning Perspective
- **Batch OS** — processes jobs in batches without user interaction during execution (largely historical)
- **Time-sharing/multitasking OS** — allows multiple users/processes to share the system, giving each the illusion of dedicated attention via rapid context switching (most general-purpose modern OSes)
- **Real-time OS (RTOS)** — guarantees that certain operations complete within a **strict, predictable time bound** — critical for systems like industrial control, medical devices, or automotive systems, where a late response can be as bad as a wrong one. Divided into **hard real-time** (missing a deadline is a total system failure) and **soft real-time** (missing a deadline degrades quality but isn't catastrophic).
- **Distributed OS** — manages a group of independent, networked computers, making them appear to users as a single coherent system (connecting to the "distributed systems" concept covered in `software-engineering.md`)

### Interview Perspective
**Q: What distinguishes a real-time operating system from a general-purpose OS like Windows or Linux?**
> A general-purpose OS optimizes for overall throughput and fairness across many processes, without hard guarantees on exactly when any given task completes. A real-time OS guarantees that certain critical operations complete within a strict, predictable time bound — prioritizing predictability and deadline-adherence over overall average throughput, which is essential for contexts like industrial control or medical devices where a late response is unacceptable, not just suboptimal.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| OS core purpose | Manages hardware, provides abstractions (processes, files) so apps don't touch hardware directly |
| Process vs. thread | Independent, isolated memory vs. shared memory within the same process |
| Context switching | Saving/restoring process state to let the CPU run something else — has real overhead |
| Preemptive vs. non-preemptive scheduling | OS can interrupt a running process vs. process keeps CPU until it yields |
| Starvation fix | Aging — gradually raise a waiting process's priority |
| Virtual memory | Private per-process address space + lets total memory exceed physical RAM |
| Paging vs. segmentation | Fixed-size blocks, no external fragmentation vs. variable, logical divisions |
| Page fault | Accessed page isn't in physical memory — OS loads it from disk transparently |
| Race condition | Outcome depends on unpredictable thread/process timing on shared data |
| Mutex vs. semaphore | Exactly one holder vs. a counting lock allowing up to N holders |
| 4 conditions for deadlock | Mutual exclusion, hold-and-wait, no preemption, circular wait |
| inode | File metadata + data pointers, separate from the filename (enables hard links) |
| Polling vs. interrupts | CPU wastes cycles checking vs. device signals CPU when ready |
| DMA | Device transfers data to/from memory without CPU handling every byte |
| RTOS | Guarantees strict, predictable timing — not just fast on average |
