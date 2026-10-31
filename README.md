# Dev Notes Hub

A personal developer documentation site for my IBM Full Stack Software Developer
learning journey — notes, revision material, and interview prep, organized like
real developer docs and searchable like a second brain.

**Structure:** Home dashboard → topic docs (Markdown-driven) → revision mode →
search → bookmarks.

## Tech stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **JavaScript** (no TypeScript)
- **Markdown** content system (`gray-matter` + `remark`)
- **Mermaid** for in-page diagrams
- **Fuse.js** for fuzzy search
- **lucide-react** for icons

## Features

- Collapsible sidebar with the full IBM Full Stack curriculum tree
- Global fuzzy search (`⌘K` / `Ctrl+K`)
- Auto-generated table of contents per page, with scroll-spy
- Copy-to-clipboard buttons on every code block
- Reading progress bar
- Dark/light mode toggle (persisted, no flash on load)
- Bookmarks (saved per-browser via `localStorage`)
- **Revision Mode** — collapses every page down to just *Key Points* and
  *Interview Answer*, for fast pre-interview review
- Fully responsive, mobile-friendly sidebar
- Homepage roadmap rendered as a commit-log-style timeline

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new topic

1. Add an entry to `src/lib/nav-config.js` under the right section:

   ```js
   { slug: "my-new-topic", title: "My New Topic", status: "todo" }
   ```

2. Create `content/docs/<section>/my-new-topic.md` following the standard
   structure (or just visit the page — a stub is generated automatically
   until you do):

   ```md
   # My New Topic

   ## Simple Definition
   ## Real World Example
   ## How It Works
   ## Visual Explanation
   ## Code Example
   ## Key Points
   ## Interview Answer
   ## Common Interview Questions
   ## My Notes
   ```

3. Set `status` to `"done"`, `"learning"`, or `"todo"` — this drives the
   sidebar badges and the homepage progress cards automatically.

## Cloud Computing topic list

The Cloud Computing section has grown — here's the full, ordered list this
module now covers (sidebar order matches this):

**Foundations**
1. Definition & why cloud computing
2. Cloud adoption & the business case for cloud computing
3. Networking basics — IP address, routing, VPN
4. Virtualization, VMs, host, hypervisor
5. OS fundamentals in a cloud context

**Service & deployment models**
6. Service models — IaaS, PaaS, SaaS
7. Deployment models — public, private, hybrid, and community cloud
8. Cloud bursting
9. Hybrid & multi-cloud

**Cloud infrastructure**
10. Overview of cloud infrastructure
11. Virtualization and virtual machines (deep dive)
12. Types of VM
13. Bare metal servers
14. Containers
15. Microservices
16. Serverless computing
17. Cloud-native applications, DevOps, and application modernization
18. Cloud directory services

**Storage on cloud**
19. Basics of storage on cloud
20. File storage
21. Block storage
22. Object storage overview
23. Object storage — tiers and APIs
24. CDN (Content Delivery Network)

**Secure networking**
25. Secure networking in cloud

**Emerging workloads on cloud**
26. IoT in the cloud
27. AI on the cloud
28. Blockchain in the cloud
29. Analytics on cloud

**Cloud security**
30. Policies and principles of access management
31. Principle of least privilege, user access levels
32. Identity and Access Management (IAM)
33. Standard Password Policy (SPP)
34. Identity provider standards (SAML, OpenID)
35. Cloud encryption
36. Cloud monitoring and its benefits

**Applied**
37. Case studies in different industry verticals

## Project structure

```
content/docs/<section>/<slug>.md   # Your notes, in Markdown
src/lib/nav-config.js              # Sidebar tree + progress source of truth
src/lib/markdown.js                # Markdown → HTML pipeline, stub generator
src/components/                    # Sidebar, search, TOC, revision mode, etc.
src/app/docs/[...slug]/page.js     # Renders any topic from its .md file
src/app/page.js                    # Homepage dashboard
```

## Notes

- Diagrams use triple-backtick mermaid code blocks — they render as live SVG diagrams.
- Revision Mode and Bookmarks are stored in `localStorage`, so they're
  per-device, not synced anywhere.
- Built as a personal learning + portfolio project.
