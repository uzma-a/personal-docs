# Python Fundamentals — Control Structures & Functions

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general Python knowledge, since no source content was provided. Covers control flow and functions — the logical next topics after data types/variables (`python-basics.md`) and collections (`lists-tuples-set-dictionaries.md`). Closest matching NAV slug is `functions-in-python`; worth checking against your course material or updating the NAV to include a control-structures topic if it should be split out separately.

---

## 1. Conditional Statements

### Learning Perspective
Conditional statements let a program **branch** — executing different code depending on whether a condition is true or false.

```python
rating = 4.5

if rating > 4:
    print("Highly rated!")
elif rating > 2:
    print("Decent.")
else:
    print("Needs improvement.")
```

**Key points:**
- Python uses **indentation** (not braces `{}`) to define code blocks — this is enforced, not just stylistic; inconsistent indentation causes an `IndentationError`
- **`elif`** (short for "else if") checks additional conditions in sequence, only evaluated if the preceding `if`/`elif` was false
- **`else`** catches everything not matched by the prior conditions — always optional
- Conditions are evaluated for **truthiness** — any expression that evaluates to a truthy or falsy value can be used, not just explicit booleans (see Section 5)

**Ternary (conditional) expressions** — a compact, single-line way to choose between two values based on a condition:
```python
status = "Highly rated" if rating > 4 else "Needs improvement"
```

**Chained comparisons** — Python allows a readable shorthand for range checks:
```python
if 0 <= rating <= 5:   # equivalent to: 0 <= rating and rating <= 5
    print("Valid rating")
```

### Interview Perspective
**Q: How does Python define code blocks, and why does that matter?**
> Python uses indentation to define blocks (unlike languages using `{}`), and that indentation is *syntactically enforced* — inconsistent indentation raises an `IndentationError`. This makes indentation a functional part of the code, not just a style preference, so consistent spacing (spaces vs. tabs) matters a great deal.

**Q: What's a ternary expression, and when would you use one?**
> A compact, single-line conditional: `value_if_true if condition else value_if_false`. It's useful for simple, single-value assignments based on a condition, improving readability over a full multi-line `if`/`else` block — but it should be avoided for complex logic, where a full conditional block stays more readable.

---

## 2. Loops: `for` and `while`

### Learning Perspective
Python has two loop constructs:

**`for` loop** — iterates over the items of any **iterable** (a list, tuple, string, dictionary, range, etc.):
```python
tags = ["JavaScript", "Express"]
for tag in tags:
    print(tag)

for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for index, tag in enumerate(tags):   # get index + value together
    print(index, tag)
```

**`while` loop** — repeats **as long as a condition remains true**, checked before each iteration:
```python
count = 0
while count < 5:
    print(count)
    count += 1   # Python has no ++ operator; use += 1 instead
```

**Loop control statements:**
- **`break`** — exits the loop entirely, immediately
- **`continue`** — skips the rest of the current iteration, moves to the next one
- **`else` on a loop** — runs **only if the loop completes without hitting a `break`** (an underused but occasionally useful Python-specific feature)

```python
for n in range(2, 10):
    if n % 2 == 0:
        continue  # skip even numbers
    print(n)

for n in range(2, 10):
    if n == 100:
        break
else:
    print("Loop completed without breaking")  # this WILL print, since break never fired
```

### Interview Perspective
**Q: When would you use a `for` loop versus a `while` loop?**
> `for` loops are ideal when iterating over a known collection or a fixed range — the number of iterations is generally known or bounded by the iterable's length. `while` loops are better when the number of iterations isn't known in advance and depends on a condition that changes during the loop (e.g., waiting for user input, or polling until some state changes).

**Q: What's the difference between `break` and `continue`?**
> `break` exits the loop entirely and immediately, skipping any remaining iterations. `continue` skips only the *rest of the current iteration*, then proceeds to the next one — the loop itself keeps running.

**Q: What does the `else` clause on a loop actually do? (This one trips people up.)**
> It runs only if the loop finishes normally, without ever hitting a `break`. It's essentially "if this loop searched for something and *didn't* find it (never broke early), do this" — commonly used in search-style loops to handle the "not found" case cleanly, without needing a separate flag variable.

⭐ **Frequently asked as a "gotcha"** — the loop `else` clause is a distinctly Python feature that many candidates from other languages don't expect; knowing it demonstrates real Python fluency.

---

## 3. Functions

### Learning Perspective
Functions **encapsulate reusable logic** — a named, callable block of code that can accept inputs (**parameters**) and optionally return an output.

```python
def greet(user):
    return f"Hello, {user}"   # f-string for formatted output

print(greet("Dev"))   # Hello, Dev
```

**Default parameter values** — let a parameter be optional, falling back to a specified default if not provided:
```python
def greet(user="friend"):
    return f"Hello, {user}"

greet()          # "Hello, friend"
greet("Alice")   # "Hello, Alice"
```

**`*args` and `**kwargs`** — let a function accept a **variable number of arguments**:
- **`*args`** — collects any number of extra **positional** arguments into a tuple
- **`**kwargs`** — collects any number of extra **keyword** arguments into a dictionary

```python
def total(*args):
    return sum(args)

total(1, 2, 3)   # 6 — args is (1, 2, 3)

def describe(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

describe(name="Alice", age=30)   # kwargs is {'name': 'Alice', 'age': 30}
```

**Return values** — a function without an explicit `return` implicitly returns `None`. A function can also return **multiple values**, which Python packages as a tuple:
```python
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5])   # tuple unpacking — lo=1, hi=5
```

### Interview Perspective
**Q: What's the difference between `*args` and `**kwargs`?**
> `*args` collects extra positional arguments into a tuple, letting a function accept any number of unnamed arguments. `**kwargs` collects extra keyword arguments into a dictionary, letting a function accept any number of named arguments. Both are used when you don't know in advance exactly how many arguments will be passed.

**Q: What does a Python function return if there's no explicit `return` statement?**
> `None` — every function returns *something*, and if no `return` is specified (or `return` is used with no value), the function implicitly returns `None`.

**Q: How does Python let a function "return multiple values"?**
> Technically, it doesn't — a function can only return one object. But when you write `return a, b`, Python packages `a` and `b` into a tuple automatically, and that single tuple is what's actually returned — which is then commonly unpacked at the call site into multiple variables, like `x, y = get_coordinates()`.

---

## 4. Lambda Functions (Arrow-Function Equivalent)

### Learning Perspective
A **lambda function** is a small, **anonymous** (unnamed) function defined in a single expression — Python's equivalent of a concise, throwaway function, often used where a full `def` would be overkill.

```python
add = lambda a, b: a + b
add(3, 4)   # 7

# Common use: as a short callback passed to another function
books = [{"title": "JS Basics", "rating": 5}, {"title": "Node Intro", "rating": 3}]
sorted_books = sorted(books, key=lambda book: book["rating"])
```

**Key constraints:**
- A lambda can only contain a **single expression** — no statements, no multiple lines, no assignments
- Lambdas are commonly used as the `key` argument for `sorted()`, or with `map()`/`filter()`

```python
titles = list(map(lambda book: book["title"], books))
top_rated = list(filter(lambda book: book["rating"] > 4, books))
```

### Interview Perspective
**Q: What is a lambda function, and when would you use one over a regular `def` function?**
> A lambda is a small, anonymous, single-expression function. It's used for short, throwaway logic passed directly into another function — most commonly as the `key` argument to `sorted()`, or with `map()`/`filter()` — where defining a full named function would feel like unnecessary overhead for something used only once.

**Q: What are the limitations of a lambda function compared to a regular function?**
> A lambda can only contain a single expression — no multiple statements, no assignments, no loops inside it. If the logic is more complex than a single expression can express, it needs to be a regular `def` function instead.

---

## 5. Scope

### Learning Perspective
**Scope** determines where a variable is accessible within a program:

- **Local scope** — a variable defined **inside a function** is only accessible within that function
- **Global scope** — a variable defined at the **top level of a module** is accessible throughout that module (and inside functions, for *reading* — see below)
- **Enclosing scope** — relevant for nested functions; an inner function can access variables from its enclosing (outer) function's scope

**A common gotcha:** a function can **read** a global variable without any special syntax, but **assigning** to a variable inside a function creates a new **local** variable by default, rather than modifying the global one — unless you explicitly declare it with the **`global`** keyword:

```python
count = 0

def increment():
    global count   # without this line, `count += 1` below would raise an error
    count += 1

increment()
print(count)   # 1
```

### Interview Perspective
**Q: Why does assigning to a variable inside a function sometimes raise an error or behave unexpectedly, even though the variable already exists globally?**
> By default, any assignment inside a function creates a new *local* variable with that name, shadowing the global one — it doesn't automatically modify the global variable. If you try to reference the variable before that local assignment happens (e.g., `count += 1` when Python sees `count` will be assigned locally somewhere in the function), Python raises an `UnboundLocalError`, since it treats `count` as local throughout the whole function due to that later assignment. To actually modify the global variable, you need the `global` keyword.

**Q: When would you need the `global` keyword?**
> Specifically when you want to *reassign* a global variable from inside a function — not when you're just *reading* its value, which works without any special keyword. It's generally used sparingly, since heavy reliance on global state makes code harder to reason about and test.

---

## 6. Truthy & Falsy Values

### Learning Perspective
Like JavaScript, Python evaluates non-boolean values as truthy/falsy in conditional contexts (`if`, `while`, boolean operators).

**Falsy values in Python:**
`False`, `None`, `0`, `0.0`, `""` (empty string), `[]` (empty list), `()` (empty tuple), `{}` (empty dict), `set()` (empty set)

**Everything else is truthy** — including non-empty strings, non-zero numbers, and non-empty collections of any kind.

```python
if []:
    print("won't print — empty list is falsy")

if [0]:
    print("will print — this list has one item, so it's truthy, even though the item is 0")
```

### Interview Perspective
**Q: What values does Python consider "falsy"?**
> `False`, `None`, `0`/`0.0`, and any empty collection — empty string, list, tuple, dict, or set. Everything else is truthy, including a list containing only falsy items (like `[0]` or `[False]`) — the *list itself* isn't empty, so it's still truthy.

**Q: Why might checking `if my_list:` be preferred over `if len(my_list) > 0:`?**
> Both work, but `if my_list:` is more idiomatic ("Pythonic") — it relies on the collection's inherent truthiness (empty = falsy) rather than explicitly computing and comparing a length, and it works uniformly across any collection type without needing to think about the specific comparison.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Code blocks | Defined by indentation, not braces — syntactically enforced |
| Ternary expression | `value_if_true if condition else value_if_false` |
| `for` vs `while` | Known/bounded iteration vs. condition-dependent iteration |
| `break` vs `continue` | Exits the loop entirely vs. skips to the next iteration |
| Loop `else` | Runs only if the loop completes without hitting `break` |
| `*args` / `**kwargs` | Extra positional args as a tuple / extra keyword args as a dict |
| Function with no `return` | Implicitly returns `None` |
| "Multiple return values" | Actually one tuple, commonly unpacked at the call site |
| Lambda function | Small, anonymous, single-expression function — used for short callbacks |
| `global` keyword | Needed to reassign (not just read) a global variable inside a function |
| Falsy values | `False, None, 0, 0.0, ""`, and any empty collection |