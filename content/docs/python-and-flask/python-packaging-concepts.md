# Python Packaging Concepts

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** This topic doesn't currently have a matching slug in your NAV file — worth adding one (e.g., under `python-for-data-science` or a new section) so it's reachable from your sidebar/routing.

---

## 1. The Application Development Lifecycle (7 Phases)

### Learning Perspective
The **application development lifecycle** has **seven phases**, guiding an app from initial idea through to ongoing support:

1. **Requirement Gathering** — collect **user, business, and technical requirements** for the app — understanding what needs to be built and why, from every relevant stakeholder's perspective
2. **Analysis** — **analyze the requirements**, working out feasibility, dependencies, and how they fit together into a coherent plan
3. **Design** — **design the complete solution** — architecture, data models, interfaces, and how components will interact
4. **Code and Test** — **build and test the different components** of the app, implementing the design and verifying each piece works as intended
5. **User and System Test** — **users test the app for usability**, while the team performs **system integration testing** and **performance testing** — verifying the pieces work correctly *together*, and under realistic load
6. **Production** — the application is made **available to all end users** — the actual release/launch
7. **Maintenance** — **upgrade or fix any user or system issues** that arise after release, and continue evolving the application over time

### Interview Perspective
**Q: Walk me through the seven phases of the application development lifecycle.**
> Requirement gathering (collecting user/business/technical needs), analysis (assessing those requirements), design (planning the full solution), code and test (building and testing individual components), user and system test (usability testing plus integration/performance testing), production (release to end users), and maintenance (ongoing fixes and upgrades after launch).

**Q: What's the difference between the "Code and Test" phase and the "User and System Test" phase?**
> "Code and test" focuses on testing individual components in isolation as they're built — verifying each piece works correctly on its own. "User and system test" happens after components come together — testing the *integrated* system as a whole (system integration and performance testing), plus getting real users to evaluate usability, which individual component-level testing can't capture.

---

## 2. Web Apps vs. APIs

### Learning Perspective
A precise but often-confused distinction: **all web apps are APIs, but not all APIs are web apps**.

- Both **share data between applications**
- But **not all APIs require networks** the way web apps do — an API can be a purely local interface between two pieces of software on the same machine (e.g., a library's function signatures), whereas a **web app** inherently involves network communication (typically HTTP, between a client and server)

In other words: **"API" is the broader category** — any defined interface for software-to-software communication. A **web app** happens to expose (or *is*, functionally) a network-accessible API, but plenty of APIs exist entirely outside a networked, web context (e.g., a Python library's public functions form an API, with no network involved at all).

### Interview Perspective
**Q: Explain the relationship between web apps and APIs — why is "all web apps are APIs, but not all APIs are web apps" a true statement?**
> An API is any defined interface that lets software components share data or functionality — this doesn't require a network at all; a local library's public functions/classes constitute an API. A web app specifically exposes its functionality over a network (typically via HTTP), making it inherently API-like in how it shares data with clients — so every web app qualifies as a kind of API. But the reverse isn't true: many APIs (like a local Python package's public interface) have nothing to do with networks or the web at all.

---

## 3. PEP 8: Style Guidelines for Readability

### Learning Perspective
**PEP 8** is Python's official style guide, aimed at keeping code **readable and consistent** across the Python community. Its guidelines split roughly into two concerns: **readability** and **consistency/manageability**.

**PEP 8 guidelines for code readability:**
- **Four spaces** for indentation (not tabs, and not any other number of spaces)
- **Blank lines** to separate **functions and classes**, visually grouping related code and separating distinct logical units
- **Spaces around operators** and **after commas** — e.g., `x = 1 + 2`, not `x=1+2`; `func(a, b, c)`, not `func(a,b,c)`

```python
# Readable, PEP 8-compliant
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b
```

### Interview Perspective
**Q: What are PEP 8's core readability guidelines?**
> Four-space indentation, blank lines separating functions and classes, and consistent spacing around operators and after commas — all aimed at making code visually consistent and easy to scan, regardless of who wrote it.

**Q: Why does Python specifically standardize on four spaces (not tabs) for indentation?**
> Since Python uses indentation to define code blocks (rather than braces), inconsistent indentation characters (mixing tabs and spaces) can cause subtle bugs or outright errors — Python 3 explicitly disallows mixing tabs and spaces in the same file. Standardizing on four spaces specifically is a community convention (via PEP 8) that keeps code visually consistent across different editors/environments, since tab width can render differently depending on settings.

---

## 4. PEP 8: Naming & Structural Conventions

### Learning Perspective
**PEP 8 coding conventions for consistency and manageability:**

- **Add larger blocks of code inside functions** — rather than leaving substantial logic loose at the top level of a script, encapsulating it in functions improves reusability, testability, and readability
- **Name functions and files** using **lowercase with underscores** (`snake_case`) — e.g., `calculate_total()`, `data_utils.py`
- **Name classes** using **CamelCase** (also called PascalCase) — e.g., `class UserAccount:`
- **Name constants** in **capital letters**, with **underscores separating words** — e.g., `MAX_RETRIES = 5`, `DEFAULT_TIMEOUT = 30`

```python
MAX_RETRIES = 5              # constant — ALL_CAPS

class UserAccount:            # class — CamelCase
    def calculate_balance(self):  # function/method — snake_case
        ...

def process_user_data(data):  # function — snake_case
    ...
```

### Interview Perspective
**Q: What are PEP 8's naming conventions for functions, classes, and constants?**
> Functions and files use lowercase with underscores (`snake_case`, e.g., `process_data()`). Classes use CamelCase (e.g., `UserAccount`). Constants use all capital letters with underscores separating words (e.g., `MAX_RETRIES`). Following these consistently makes it immediately clear, just from a name's casing, what kind of thing you're looking at.

**Q: Why does PEP 8 recommend putting larger blocks of code inside functions rather than leaving them at the top level of a script?**
> Code inside functions is reusable (can be called multiple times without duplication), more testable (you can call and test the function in isolation), and generally more readable (a clear, named unit of logic rather than a long, undifferentiated sequence of top-level statements). It also avoids accidentally polluting the global namespace with variables only meant for temporary/local use.

⭐ **Frequently asked** — PEP 8 naming conventions (function/file vs. class vs. constant casing) are a common quick-fire Python style question.

---

## 5. Static Code Analysis

### Learning Perspective
**Static code analysis** is a method used to ensure your code **adheres to a predefined style and standard**, **without actually executing the code**. It examines the source code itself — structure, formatting, naming, potential bugs, style violations — purely by analyzing the text/syntax, rather than running it.

**Common Python static analysis tools:**
- **`pylint`** — checks for style violations, potential bugs, and code smells, following PEP 8 and additional configurable rules
- **`flake8`** — combines PEP 8 style checking with basic error detection
- **`black`** — an automatic code *formatter* (not just a checker) that reformats code to a consistent style automatically
- **`mypy`** — performs static *type* checking, if you're using Python's optional type hints

### Interview Perspective
**Q: What is static code analysis, and how is it different from testing?**
> Static code analysis examines source code without running it — checking for style violations, structural issues, and potential bugs purely through analysis of the code's text/syntax. Testing, by contrast, actually *executes* the code (or portions of it) to verify its runtime behavior matches expectations. They're complementary — static analysis catches style/structural issues and some classes of bugs early, cheaply, and without needing to run anything, while testing verifies actual behavior.

**Q: Name some common Python static analysis tools and what each focuses on.**
> `pylint`/`flake8` for PEP 8 style compliance and basic bug detection, `black` for automatic code formatting (not just checking, but actually rewriting code to a consistent style), and `mypy` for static type checking when using Python's type hints.

---

## 6. Unit Testing

### Learning Perspective
**Unit testing** is a method to **validate that code units are operating as designed** — a "unit" typically refers to the smallest testable piece of code, most often a single function or method, tested in isolation from the rest of the system.

**Key principle:** you must **test every unit before integration** with the final codebase — catching problems at the smallest, most isolated level, before they compound or become harder to trace once integrated with everything else.

```python
# A simple function to test
def add(a, b):
    return a + b

# A unit test for it, using Python's built-in unittest module
import unittest

class TestMathFunctions(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

if __name__ == "__main__":
    unittest.main()
```

**Why test at the unit level specifically, before integration:**
- **Isolation** — pinpoints exactly which piece of code is broken, rather than searching through a larger, integrated system
- **Speed** — unit tests are typically fast to run, enabling frequent execution during development
- **Confidence for refactoring** — a solid unit test suite lets you change implementation details safely, as long as tests still pass

### Interview Perspective
**Q: What is unit testing, and why should units be tested before integrating them into the larger codebase?**
> Unit testing validates that a small, isolated piece of code (typically a single function or method) behaves as designed. Testing at the unit level *before* integration matters because it's far easier to pinpoint and fix a bug in an isolated, individually-tested unit than to trace the same bug once it's tangled up with the rest of an integrated system — catching problems early, cheaply, and precisely.

**Q: What makes a good unit test?**
> It should be isolated (testing one specific unit of behavior, ideally without dependencies on external systems like databases or networks — using mocks/stubs where needed), fast (so it can run frequently during development), repeatable (same result every time, regardless of execution order or environment), and clearly indicate exactly what failed when it does fail.

---

## 7. Creating a Python Package

### Learning Perspective
A **package** in Python is a way of organizing related modules together into a directory structure, making them importable as a cohesive unit. **To create a package:**

1. **Create a folder** with the package name
2. **Create an empty `__init__.py` file** inside that folder — this file's presence is what tells Python the folder should be treated as a package (rather than just a regular directory)
3. **Create the required modules** — the individual `.py` files containing your actual code, placed inside the package folder
4. **In the `__init__.py` file, add code to reference the modules** needed in the package — controlling what gets exposed/imported when someone imports the package itself

```
mypackage/
├── __init__.py
├── math_utils.py
└── string_utils.py
```

```python
# math_utils.py
def add(a, b):
    return a + b
```

```python
# __init__.py
from .math_utils import add
from .string_utils import capitalize_words
```

```python
# Now, from outside the package:
from mypackage import add
result = add(2, 3)
```

### Interview Perspective
**Q: What are the steps to create a Python package, and what role does `__init__.py` play?**
> Create a folder for the package, add an (initially empty) `__init__.py` file inside it, create the actual module files with your code, then update `__init__.py` to import and reference whichever modules/functions should be accessible directly from the package. `__init__.py`'s presence is what tells Python to treat that folder as an importable package rather than a plain directory, and its contents control what's exposed when someone does `from mypackage import something`.

**Q: Why would you explicitly import specific functions into `__init__.py`, rather than leaving it empty?**
> Leaving it empty still makes the folder a valid package, but consumers would then need to import from the specific submodule directly (e.g., `from mypackage.math_utils import add`). Populating `__init__.py` with explicit imports lets consumers do the simpler `from mypackage import add` instead — controlling and simplifying the package's public interface, hiding internal module organization details from external users.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| App dev lifecycle (7 phases) | Requirement gathering → analysis → design → code & test → user/system test → production → maintenance |
| Web apps vs. APIs | All web apps are APIs; not all APIs require a network like web apps do |
| PEP 8 readability | 4-space indentation, blank lines between functions/classes, spacing around operators/commas |
| PEP 8 naming | Functions/files: `snake_case`; Classes: `CamelCase`; Constants: `ALL_CAPS_WITH_UNDERSCORES` |
| Static code analysis | Checks code style/structure without executing it (e.g., `pylint`, `flake8`, `mypy`) |
| Unit testing | Validates individual code units work correctly, in isolation, before integration |
| Creating a package | Folder → empty `__init__.py` → module files → reference modules inside `__init__.py` |