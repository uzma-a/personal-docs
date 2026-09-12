# Generative AI in Software Development

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Builds on `ai-fundamentals.md` (core ML/AI concepts) — this file focuses specifically on how generative AI and LLMs are applied across the software development lifecycle, from requirements through deployment and operations.

---

## 1. Foundations: LLMs, NLP & the Underlying Technology

### Learning Perspective
- **Large language model (LLM)** — an **advanced AI system trained on massive datasets** to **process and generate language, code, and multimodal content** — the underlying technology behind most modern AI-native development tooling.
- **Natural language processing (NLP)** — a **field of AI** that enables computers to **understand, analyze, and generate human language** — the broader discipline LLMs are the current state-of-the-art expression of (connecting back to `ai-fundamentals.md`'s NLP section).
- **Machine learning (ML)** — the **field of AI** where **models use algorithms to learn from data** to **make predictions and automate decisions** — the foundational discipline underlying LLMs and every other AI capability covered in this file.
- **Transformer model** — a **neural architecture** using **self-attention** to **understand context in text** — the specific architectural breakthrough that made modern LLMs possible, letting a model weigh the relevance of every other word/token in its input when processing any given part of the text.
- **Multimodal capabilities** — the ability of AI models to **understand and generate text, images, audio, video, and code** — modern frontier models increasingly handle more than just text.
- **Context window** — the **amount of information** a large language model can **process at one time** — a hard limit on how much text (code, conversation history, documents) can be fed into a model in a single interaction, directly affecting how much project/codebase context a coding assistant can actually "see" at once.

### Interview Perspective
**Q: What is a transformer model, and why was it significant for the development of modern LLMs?**
> A transformer is a neural network architecture using self-attention to weigh the relevance of every other token in the input when processing any given token — letting the model understand context and relationships across a passage of text far more effectively than earlier architectures (like RNNs) that processed text more sequentially. This architecture is the foundational breakthrough underlying essentially all modern large language models.

**Q: Why does a model's "context window" matter practically for AI coding assistants?**
> The context window limits how much text — code files, conversation history, documentation — the model can actually consider at once. A coding assistant with a small context window might only "see" a single file or function, missing broader project context, while a larger context window lets it reason across multiple files or an entire codebase section at once, generally producing more contextually accurate and consistent suggestions.

---

## 2. Prompting, Fine-Tuning & Model Limitations

### Learning Perspective
- **Prompt engineering** — **crafting precise prompts** to **guide LLM behavior** — since an LLM's output quality depends heavily on how a request is phrased, structured, and contextualized, deliberately designing effective prompts has become its own practical skill.
- **Fine-tuning** — **training a pre-trained model further** using **domain-specific data** — adapting a general-purpose LLM to perform better on a narrower, specialized task or domain (e.g., a specific codebase's conventions, or a particular industry's terminology) than the base model would achieve out of the box.
- **Hallucination** — when an LLM **generates plausible but incorrect or fabricated outputs** — a fundamental limitation of how LLMs work (predicting statistically likely text, not verifying factual accuracy), and a key reason human review remains essential when using AI-generated code or content.

### Interview Perspective
**Q: What's the difference between prompt engineering and fine-tuning as ways to improve an LLM's output for a specific use case?**
> Prompt engineering shapes the model's behavior through how you phrase and structure the input at inference time — no changes to the model itself, just better-crafted requests. Fine-tuning actually further trains the model's own parameters on domain-specific data, adapting the model itself to perform better on a narrower task or domain going forward. Prompt engineering is faster and cheaper to iterate on; fine-tuning is more involved but can produce deeper, more consistent domain adaptation.

**Q: What is "hallucination," and why does it matter specifically for AI-assisted software development?**
> Hallucination is when an LLM generates confident-sounding but factually incorrect or fabricated output — a fundamental consequence of how LLMs work (generating statistically plausible text, not verified fact). For software development, this means AI-generated code can look correct and even run without errors while containing subtle bugs, referencing non-existent library functions, or misunderstanding requirements — which is exactly why human code review remains essential even when using AI-assisted code generation tools.

⭐ **Frequently asked** — be ready to explain *why* hallucination happens (it's inherent to how LLMs generate text, not a bug that will simply be "fixed"), not just define the term.

---

## 3. Retrieval-Augmented Generation (RAG) & Vector Search

### Learning Perspective
- **Retrieval-augmented generation (RAG)** — an **architectural framework** that **improves the accuracy and reliability of LLM outputs** by **retrieving relevant, up-to-date information** from **external data sources**, **before generating a response**. RAG directly addresses hallucination and knowledge-cutoff limitations — instead of relying purely on what the model "remembers" from training, RAG grounds the model's response in actual, current, retrieved source material.

- **Vector embeddings** — **numerical vector representations of text** used for **semantic comparison and retrieval** — text is converted into a vector (a list of numbers) positioned in a high-dimensional space such that semantically similar text ends up positioned nearby (connecting back to `ai-fundamentals.md`'s NLP embeddings coverage).

- **Vector database** — a **specialized storage system** that **indexes data as high-dimensional vector embeddings**, enabling **efficient similarity searches** to retrieve the **most contextually relevant information** — the infrastructure component that makes RAG practical at scale, letting a system quickly find the most semantically relevant documents/code out of a huge corpus.

- **Semantic search** — a **search method** that **retrieves meaning-related results**, rather than **keyword matches** — the retrieval mechanism RAG relies on, powered by vector embeddings and vector databases, finding content that's conceptually relevant even if it doesn't share exact keywords with the query.

**How these pieces fit together in a RAG pipeline:**
```
Query → converted to a vector embedding → searched against a vector database (semantic search)
      → most relevant retrieved documents/code → fed into the LLM's prompt as context
      → LLM generates a response grounded in that retrieved, up-to-date information
```

### Interview Perspective
**Q: What problem does retrieval-augmented generation (RAG) solve?**
> It addresses two core LLM limitations: hallucination and knowledge staleness. Rather than relying purely on what a model memorized during training (which is fixed as of its training cutoff, and can be misremembered/hallucinated), RAG retrieves relevant, current information from an external data source at query time and includes it directly in the prompt — grounding the model's response in actual retrieved facts, rather than relying entirely on its internal, potentially outdated or imperfect memory.

**Q: How do vector embeddings and a vector database work together to enable RAG?**
> Text (both the stored source documents/code, and the incoming query) is converted into vector embeddings — numerical representations capturing semantic meaning, positioned so similar-meaning text ends up near each other in vector space. A vector database indexes these embeddings efficiently, allowing a fast similarity search (semantic search) that finds the stored content most semantically relevant to a given query's embedding — that retrieved content is then what gets fed into the LLM as grounding context.

**Q: How might RAG specifically apply to an AI coding assistant working within a large codebase?**
> Instead of relying purely on general programming knowledge from training, a RAG-based coding assistant could retrieve the actual relevant files, functions, or documentation from *your specific* codebase (indexed in a vector database) based on semantic similarity to your current query/code context, and include that retrieved, codebase-specific information in its prompt — letting it give suggestions genuinely grounded in your project's actual conventions, existing functions, and architecture, rather than generic, potentially mismatched suggestions.

⭐ **Extremely frequently asked** — RAG is one of the most heavily tested modern AI/LLM concepts; be ready to explain the full pipeline (embed → retrieve → augment prompt → generate) fluently.

---

## 4. AI Agents & Agentic Capabilities

### Learning Perspective
- **Agentic capabilities** — LLM features that enable **tool use, function calling, web search, and autonomous task execution** — the set of capabilities that let an LLM go beyond simply generating text in response to a single prompt, and instead actively *do* things (call APIs, search the web, run code) as part of accomplishing a broader goal.

- **AI agent** — a **system using LLMs and tools** to **execute multi-step workflows autonomously** — rather than a single prompt-response interaction, an agent can plan a sequence of steps, use tools/functions to gather information or take actions, evaluate the results, and adapt its next steps accordingly, working toward a larger goal with reduced need for step-by-step human direction at each stage.

**Why agentic capabilities matter for software development specifically:** many real development tasks aren't single-shot ("write this one function") — they're multi-step workflows ("investigate this bug, find the root cause across multiple files, propose and implement a fix, then run the tests to verify it"). Agentic AI systems are designed to handle exactly this kind of extended, multi-step, tool-using workflow.

### Interview Perspective
**Q: What distinguishes an "AI agent" from a standard, single-turn LLM interaction?**
> A standard LLM interaction is typically one prompt, one response — the model generates text based on the given input and stops. An AI agent uses the LLM as a reasoning/planning engine within a larger, multi-step loop — it can call tools/functions (searching, running code, calling APIs), observe the results of those actions, and decide on subsequent steps autonomously, continuing until a broader goal is accomplished, rather than requiring a human to manually direct every individual step.

**Q: Give an example of how agentic capabilities might apply to a software development task.**
> An AI agent tasked with fixing a reported bug might autonomously: search the codebase for relevant code (using a tool call), analyze the code to identify a likely root cause, propose a fix, apply that fix, run the existing test suite (another tool call) to verify the fix didn't break anything, and report back — all without a human needing to manually direct each of those individual steps, though human review of the final result remains important given the hallucination risk covered in Section 2.

---

## 5. LLM Frameworks & Tooling Ecosystem

### Learning Perspective
**LLM frameworks** — libraries such as **Hugging Face, LangChain, and LlamaIndex** for **building NLP applications** — the software tooling layer that developers use to actually build applications on top of LLMs, rather than working with raw model APIs directly for every piece of functionality (prompt chaining, RAG pipelines, agent orchestration, etc.).

### Interview Perspective
**Q: What role do frameworks like LangChain or LlamaIndex play in building LLM-powered applications?**
> They provide reusable, higher-level building blocks for common LLM application patterns — chaining multiple prompts/model calls together, implementing RAG pipelines (connecting to vector databases, managing retrieval), and orchestrating agentic workflows (tool use, multi-step reasoning) — so developers don't need to build all of that infrastructure and glue logic from scratch for every project using an LLM.

---

## 6. AI-Native Software Development

### Learning Perspective
**AI-native development** — a **development approach** that **embeds AI models and automation into every phase** of the **software development lifecycle (SDLC)** — to **improve speed, quality, and collaboration**. This is the umbrella concept the rest of this file's specific tools/capabilities fall under — rather than AI being a single, isolated tool bolted onto one part of the process, AI-native development treats AI assistance as a pervasive, integrated part of how software gets built, at every stage.

**Software development lifecycle (SDLC)** — a **structured process** for **planning, designing, building, testing, deploying, and maintaining** software systems (covered in more general depth in `software-engineering.md`) — the framework AI-native development maps its capabilities onto, phase by phase.

The following sections walk through AI capabilities **mapped to each SDLC phase**, in roughly the order they'd apply during a project.

### Interview Perspective
**Q: What does "AI-native development" mean, as distinct from simply "using an AI coding assistant occasionally"?**
> AI-native development means AI and automation are embedded systematically across *every* phase of the SDLC — requirements analysis, design, coding, testing, deployment, and ongoing operations — rather than AI being used as an isolated point tool for just one narrow task (like autocomplete while coding). It reflects a broader shift in how the entire development process is structured and executed, not just an incremental addition of one new tool to an otherwise unchanged workflow.

---

## 7. AI in Requirements & Planning

### Learning Perspective
- **Requirements analysis** — the process of **interpreting business needs** and **converting them into clear, structured requirements** — an AI-assisted version of this traditionally manual, interview/documentation-heavy process.
- **Requirement validation** — a **quality check** ensuring requirements are **accurate, consistent, and aligned with business rules** — AI can help catch contradictions, ambiguities, or gaps in a requirements document before development begins.
- **Predictive requirement modeling** — AI analysis that **forecasts future requirements** and **estimates complexity**, using **historical data** — using patterns from past projects to anticipate what a new project will likely need, and how much effort it will likely take.
- **User story generation** — the **automated creation of user stories and acceptance criteria** from **high-level business descriptions** — turning a rough business goal directly into structured, development-ready user stories.

### Interview Perspective
**Q: How might AI assist specifically during the requirements-gathering phase of a project?**
> By helping interpret and structure raw business needs into clear requirements (requirements analysis), checking those requirements for internal consistency and alignment with business rules (requirement validation), forecasting likely future requirements and complexity based on historical project data (predictive requirement modeling), and directly generating structured user stories with acceptance criteria from a high-level business description (user story generation) — collectively accelerating and improving the quality of the earliest, traditionally most manual phase of the SDLC.

---

## 8. AI in Design & Architecture

### Learning Perspective
- **Architectural recommendations** — AI-driven **suggestions for optimal system architecture**, based on **requirements and constraints** — analyzing a project's stated needs (scale, latency, budget, team skills) and suggesting architectural patterns/technology choices suited to them.
- **Design pattern recognition** — AI **detection of proven design patterns** from **past projects**, to **guide new system designs** — surfacing relevant, previously-successful patterns based on similarities to the current project's requirements.

### Interview Perspective
**Q: How could AI-driven architectural recommendations be useful, and what would you still want to verify independently?**
> They can quickly surface relevant architectural patterns and technology suggestions based on a project's stated constraints, drawing on much broader pattern recognition across many past projects than a single team's own direct experience. You'd still want to independently verify these suggestions against the project's *actual* nuanced context and trade-offs — an AI recommendation reflects statistical patterns in its training data, not genuine judgment about your specific organization's constraints, team expertise, or long-term strategic considerations that might not be fully captured in the stated requirements.

---

## 9. AI-Assisted Coding

### Learning Perspective
- **AI pair programming** — **real-time coding assistance** provided by AI tools such as **GitHub Copilot and CodeWhisperer** — an AI acting as a continuous collaborator during active coding, suggesting completions and code as you type.
- **AI-assisted code generation** — tools such as **Copilot, Cursor, and Windsurf** that **generate code or refactor existing code** based on **natural-language prompts and project context** — a broader category than just inline autocomplete, including generating entire functions/files or refactoring existing code from a natural-language description of the desired change.
- **Code generation** — the **ability of an LLM** to **create complete functions or applications** from **natural language prompts** — the underlying LLM capability that both AI pair programming and AI-assisted code generation tools are built on.
- **Intelligent refactoring** — AI-powered **restructuring of code** to **improve clarity and maintainability**, while **preserving behavior** — using AI specifically for the "clean up existing code without changing what it does" task, distinct from generating new functionality.

### Interview Perspective
**Q: What's the distinction between "AI pair programming" and "AI-assisted code generation," as described here?**
> AI pair programming (tools like GitHub Copilot/CodeWhisperer) refers specifically to real-time, in-the-moment assistance as you actively type — suggesting completions and small chunks of code continuously. AI-assisted code generation (tools like Cursor/Windsurf) is a broader category, including generating larger, complete pieces of functionality or refactoring existing code from an explicit natural-language prompt describing what's wanted — a more deliberate, prompt-driven interaction rather than continuous inline suggestion.

**Q: What must intelligent refactoring preserve, and why is that the defining constraint?**
> It must preserve the code's existing *behavior* while improving its structure/clarity/maintainability — the defining constraint of refactoring (as a general software engineering concept) is that external behavior stays identical; only the internal implementation changes. An AI refactoring tool that improved code clarity but subtly changed behavior wouldn't actually be performing a valid refactor — it would be introducing a bug, which is exactly why verification (like running the existing test suite) remains essential after AI-assisted refactoring.

---

## 10. AI in Testing & Quality Assurance

### Learning Perspective
- **Intelligent test generation** — **automatic creation** of **unit, integration, and end-to-end tests** based on **code and requirements** — generating test coverage for existing or newly-written code without a developer manually writing every test case.
- **Automated test maintenance** — AI **updates or removes tests** as the **codebase evolves**, to **keep test suites accurate and relevant** — addressing the common real-world problem of test suites gradually becoming stale/broken as the underlying code changes.
- **Autonomous testing** — AI systems that **independently detect, analyze, and fix software defects** — an agentic (Section 4) application specifically targeted at the testing/QA phase.
- **AI bug detection** — an AI process that **identifies and proposes fixes** for **code issues**, based on **patterns and runtime behavior** — pattern-matching against known bug signatures and/or analyzing actual runtime behavior to flag likely defects.
- **Predictive defect detection** — AI analysis that **identifies high-risk areas of code** **likely to contain defects** — proactively flagging risky code (e.g., based on complexity metrics, change frequency, historical defect patterns) *before* those defects are actually discovered through testing or production incidents.
- **Real-time code review** — **instant AI feedback** that **flags security issues, style errors, and best-practice violations** **as code is written** — shifting code review feedback earlier, to the moment of writing rather than a later, separate review step.

### Interview Perspective
**Q: What's the difference between "intelligent test generation" and "automated test maintenance"?**
> Intelligent test generation creates new tests based on code/requirements — filling in coverage that doesn't yet exist. Automated test maintenance addresses the *ongoing* problem of existing tests becoming stale or broken as the codebase changes over time — updating or removing outdated tests to keep the existing suite accurate, rather than generating new coverage from scratch.

**Q: How does "predictive defect detection" differ from more traditional bug detection?**
> Traditional bug detection (like AI bug detection, above) typically identifies actual, already-present issues based on patterns or runtime behavior. Predictive defect detection is more proactive — it identifies *high-risk areas* of code statistically likely to contain undiscovered defects (e.g., based on complexity, churn, historical patterns), even before any specific bug has actually been found — helping prioritize where testing/review effort should focus, rather than reacting to defects already known to exist.

**Q: Why might "real-time code review" be more valuable than traditional, later-stage code review, without necessarily replacing it?**
> Catching issues (security, style, best practices) at the moment of writing gives the fastest possible feedback loop — the context is freshest in the developer's mind, and fixing something immediately is typically cheaper than fixing it after it's already been committed, reviewed by a human, and potentially built upon by other code. It doesn't fully replace human code review, though, since human reviewers can catch higher-level design/logic issues, business-context mismatches, and subtleties that pattern-based AI feedback may miss.

---

## 11. AI in CI/CD, Deployment & Operations

### Learning Perspective
- **CI/CD (continuous integration / continuous deployment)** — **automated processes** that **build, test, and deploy code** to **streamline software delivery** (covered in depth in `git-and-github-fundamentals.md` and `containers-and-containerization.md`) — the pipeline AI capabilities in this section enhance.
- **Intelligent CI/CD orchestration** — **AI-enhanced pipeline management** that **predicts build times**, **analyzes changes**, and **recommends optimal deployments** — applying AI specifically to make the CI/CD pipeline itself smarter, not just automated.
- **Performance testing optimization** — **AI-driven load simulations** that **uncover performance bottlenecks** **before deployment** — proactively surfacing performance issues in a controlled testing environment, rather than discovering them in production.
- **Predictive deployment analytics** — AI **analysis of patterns and history** to **identify the safest and most efficient deployment windows** — recommending *when* to deploy, based on learned patterns of what times/conditions have historically correlated with safer, smoother deployments.
- **Automated security integration** — **continuous AI-based vulnerability scanning**, **embedded directly** into **development and deployment workflows** — security scanning as a continuous, automated part of the pipeline itself, rather than a separate, periodic manual audit.
- **DevSecOps** — a **practice** that **integrates continuous security checks** into **DevOps workflows** throughout **development and deployment** — the broader practice/philosophy that automated security integration is one concrete implementation of.
- **Infrastructure optimization** — **AI-driven monitoring** that **automatically adjusts computing resources** to **maintain optimal performance** and **manage costs** — an AI-enhanced version of the autoscaling concepts covered in `managing-app-with-kubernetes.md` (HPA/VPA/Cluster Autoscaler), potentially with more sophisticated, learned prediction driving the scaling decisions rather than purely reactive metric thresholds.
- **Performance optimization modeling** — AI **simulation** that **predicts system performance** under **different loads**, and **recommends scaling strategies** — modeling ahead of time how a system would behave under various future load scenarios, to inform capacity/scaling planning proactively.
- **Incident prediction** — AI **detection of anomalies and early-warning signals** that **forecast system failures** **before they occur** — shifting incident response from purely reactive (responding after something breaks) toward proactive (catching warning signs before a full failure/outage happens).

### Interview Perspective
**Q: How does "DevSecOps" relate to "automated security integration"?**
> DevSecOps is the broader organizational practice/philosophy of embedding continuous security checks throughout the entire development and deployment workflow, rather than treating security as a separate, late-stage gate. Automated security integration is a specific, concrete AI-powered implementation of that philosophy — continuous, automated vulnerability scanning built directly into the pipeline itself.

**Q: What's the difference between "predictive deployment analytics" and "incident prediction"?**
> Predictive deployment analytics focuses specifically on *when* to deploy — analyzing historical patterns to identify the safest, most efficient windows for rolling out a change. Incident prediction is broader and ongoing — continuously monitoring for anomalies and early-warning signals that a system failure may be approaching, regardless of whether a deployment is happening at that moment — one is about timing a specific action safely, the other is about ongoing proactive failure detection.

**Q: How does AI-driven "infrastructure optimization" build on standard autoscaling concepts (like Kubernetes HPA)?**
> Standard autoscaling (like Kubernetes's HPA, covered in `managing-app-with-kubernetes.md`) typically reacts to current metric thresholds — CPU utilization crossing a set percentage, for example. AI-driven infrastructure optimization can incorporate more sophisticated, learned prediction — potentially anticipating load changes *before* they fully manifest in current metrics, based on patterns, and adjusting resources proactively rather than purely reactively, aiming to maintain performance and manage costs more precisely than simple threshold-based rules alone.

⭐ **Frequently asked** — this section has many closely related, easily-confused terms (predictive deployment analytics vs. incident prediction vs. performance optimization modeling); be ready to distinguish them precisely rather than treating them as interchangeable.

---

## 12. AI-Generated Documentation

### Learning Perspective
**AI-generated documentation** — **automatic creation of diagrams and technical documents** **directly from code or system context** — generating up-to-date documentation (architecture diagrams, API docs, technical write-ups) directly from the actual current state of a codebase or system, rather than relying on developers to separately write and manually keep documentation in sync with the code (a chronically under-resourced task in most real projects).

### Interview Perspective
**Q: Why is AI-generated documentation particularly valuable, given how documentation is typically handled in real software projects?**
> Documentation is notoriously prone to going stale — written once, then not consistently updated as the code evolves, since it's a manual, often deprioritized task. AI-generated documentation, produced directly from the current code/system context, can be regenerated on demand or continuously, keeping it far more likely to accurately reflect the system's actual current state than manually-maintained documentation typically does.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Agentic capabilities** | LLM features enabling tool use, function calling, web search, autonomous task execution |
| **AI agent** | A system using LLMs and tools to execute multi-step workflows autonomously |
| **AI bug detection** | AI process identifying and proposing fixes for code issues, based on patterns/runtime behavior |
| **AI pair programming** | Real-time coding assistance (e.g., GitHub Copilot, CodeWhisperer) |
| **AI-assisted code generation** | Tools (Copilot, Cursor, Windsurf) generating/refactoring code from natural-language prompts |
| **AI-generated documentation** | Automatic diagram/document creation from code or system context |
| **AI-native development** | Embedding AI/automation into every SDLC phase to improve speed, quality, collaboration |
| **Architectural recommendations** | AI suggestions for optimal architecture based on requirements/constraints |
| **Automated security integration** | Continuous AI vulnerability scanning embedded in dev/deployment workflows |
| **Automated test maintenance** | AI updates/removes tests as the codebase evolves |
| **Autonomous testing** | AI independently detects, analyzes, and fixes software defects |
| **CI/CD** | Automated build/test/deploy processes streamlining software delivery |
| **Code generation** | LLM ability to create complete functions/applications from natural language |
| **Context window** | Amount of information an LLM can process at one time |
| **Design pattern recognition** | AI detection of proven patterns from past projects to guide new designs |
| **DevSecOps** | Integrates continuous security checks into DevOps workflows |
| **Fine-tuning** | Further training a pre-trained model using domain-specific data |
| **Hallucination** | LLM generates plausible but incorrect or fabricated outputs |
| **Incident prediction** | AI detects anomalies/early-warning signals forecasting failures before they occur |
| **Infrastructure optimization** | AI monitoring auto-adjusts compute resources for performance/cost |
| **Intelligent CI/CD orchestration** | AI predicts build times, analyzes changes, recommends optimal deployments |
| **Intelligent refactoring** | AI restructures code for clarity/maintainability, preserving behavior |
| **Intelligent test generation** | Automatic creation of unit/integration/e2e tests from code and requirements |
| **Large language model (LLM)** | AI system trained on massive datasets to process/generate language, code, multimodal content |
| **LLM frameworks** | Libraries (Hugging Face, LangChain, LlamaIndex) for building NLP applications |
| **Machine learning (ML)** | AI field where models learn from data to predict and automate decisions |
| **Multimodal capabilities** | AI models understanding/generating text, images, audio, video, code |
| **Natural language processing (NLP)** | AI field enabling computers to understand/analyze/generate human language |
| **Performance optimization modeling** | AI simulation predicting system performance under different loads |
| **Performance testing optimization** | AI-driven load simulations uncovering bottlenecks before deployment |
| **Predictive defect detection** | AI identifies high-risk, defect-likely areas of code |
| **Predictive deployment analytics** | AI identifies the safest, most efficient deployment windows |
| **Predictive requirement modeling** | AI forecasts future requirements and estimates complexity |
| **Prompt engineering** | Crafting precise prompts to guide LLM behavior |
| **Real-time code review** | Instant AI feedback flagging issues as code is written |
| **Requirement validation** | Quality check ensuring requirements are accurate/consistent/aligned |
| **Requirements analysis** | Interpreting business needs into clear, structured requirements |
| **Retrieval-augmented generation (RAG)** | Retrieves relevant external info before generating a response, improving accuracy |
| **Semantic search** | Retrieves meaning-related results, not just keyword matches |
| **Software development lifecycle (SDLC)** | Structured process for planning through maintaining software systems |
| **Transformer model** | Neural architecture using self-attention to understand text context |
| **User story generation** | Automated creation of user stories/acceptance criteria from business descriptions |
| **Vector database** | Storage system indexing vector embeddings for efficient similarity search |
| **Vector embeddings** | Numerical vector representations of text for semantic comparison/retrieval |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Transformer | Self-attention architecture — the foundation of modern LLMs |
| Context window | How much text/info an LLM can process in one interaction |
| Prompt engineering vs. fine-tuning | Shaping output via input phrasing vs. further training the model itself |
| Hallucination | Plausible but incorrect/fabricated LLM output — inherent, not a rare bug |
| RAG | Retrieve relevant external info → ground the LLM's response in it |
| Vector embeddings + DB | Semantic numeric representations + efficient similarity search index |
| AI agent | LLM + tools executing multi-step workflows autonomously |
| AI-native development | AI embedded across every SDLC phase, not just one point tool |
| AI in requirements | Analysis, validation, predictive modeling, user story generation |
| AI in coding | Pair programming (real-time) vs. code generation (prompt-driven, broader) |
| AI in testing | Test generation, test maintenance, bug detection, predictive defect detection |
| AI in CI/CD/ops | Orchestration, deployment timing, security scanning, infra optimization, incident prediction |
| AI-generated docs | Keeps documentation current by generating it directly from code/system state |