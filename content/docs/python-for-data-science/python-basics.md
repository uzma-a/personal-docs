# Python Basics

## Simple Definition
Python is a high-level, interpreted programming language known for its clean, readable syntax. It's one of the most popular languages for data science, AI, automation, and web development because it lets you express ideas in code with very little boilerplate.

## Real World Example
If programming languages were modes of writing, Python would be plain conversational English, while a language like C would be precise legal language — more powerful in some ways, but far more verbose for everyday tasks. You can read a Python script almost like a recipe and understand what it does, even before learning the syntax in depth.

## How It Works
Python code runs through an interpreter (CPython, the standard implementation) which reads and executes your code line by line — there's no separate compile step you have to manage yourself.

# Python Basics

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Data Types

### Learning Perspective
**Data type** refers to the type of value a variable has, and what type of mathematical, relational, or logical operations can be applied to it without causing an error. Python can distinguish among several core types automatically (Python is **dynamically typed** — you don't declare a variable's type explicitly):

- **Integer** — the number zero, a positive natural number, or a negative whole number (e.g., `-3, -2, -1, 0, 1, 2, 3`) — **whole numbers**, no decimal component
- **Float** — a number **with a decimal point**; can represent whole or fractional values (e.g., `12.4`, `3.0`)
- **String** — an ordered **sequence of characters** — in Python, strings are technically arrays of bytes representing Unicode characters
- **Boolean** — denotes a system of algebraic notation representing logical propositions via the binary values `0` (**False**) and `1` (**True**)

```python
x = 7          # Integer
y = 12.4       # Float
is_valid = True   # Boolean
F_Name = "John"   # String
```

### Interview Perspective
**Q: What are Python's core built-in data types, and how does Python know which type a variable is?**
> The core types are integer, float, string, and boolean (among others, like lists, tuples, and dictionaries for more complex data). Python is dynamically typed — you don't declare a type explicitly; Python infers the type from the assigned value at runtime, and that type can even change if the variable is later reassigned to a different kind of value.

**Q: What's the difference between an integer and a float?**
> An integer is a whole number, positive or negative, with no decimal component. A float has a decimal point and can represent fractional values — even `3.0` is a float, distinct from the integer `3`, because of that decimal point.

---

## 2. Type Casting

### Learning Perspective
**Type casting** (also called type coercion or type conversion) is the process of **converting one data type to another**.

**Common conversions:**
- **Integer ↔ Float** — `float(7)` → `7.0`; `int(7.9)` → `7` (truncates the decimal, doesn't round)
- **Integer/Float → String** — `str(7)` → `"7"`; `str(12.4)` → `"12.4"`
- **Integer/Float → Boolean** — **`0` becomes `False`**; **any non-zero value becomes `True`** (this applies to `0.0` as well — becomes `False`; any non-zero float becomes `True`)

```python
x = 7
x_float = float(x)     # 7.0
x_str = str(x)         # "7"
x_bool = bool(x)       # True (non-zero)
zero_bool = bool(0)    # False
```

### Interview Perspective
**Q: What happens when you convert an integer or float to a Boolean in Python?**
> Zero (`0` or `0.0`) converts to `False`; any non-zero value converts to `True` — this applies regardless of sign, so both `5` and `-5` convert to `True`.

**Q: Does converting a float to an integer round the value?**
> No — `int()` truncates the decimal portion rather than rounding, so `int(7.9)` gives `7`, not `8`. If you need actual rounding, you'd use `round()` instead.

---

## 3. Expressions & Mathematical Operations

### Learning Perspective
An **expression** is a combination of **operators and operands** that is interpreted to produce a single resulting value. **Operands** are the quantities an operation is performed on; **operators** perform the actual operation.

**Mathematical operations** ("the mathematical operation") refers to calculating a value using operands and a math operator — following standard **arithmetic operations**: addition, subtraction, multiplication, and division (also called algebraic or mathematical operations, governed by broadly agreed-upon **mathematical conventions**).

**Python's arithmetic operators:**

| Operator | Name | Description | Example |
|---|---|---|---|
| `+` | Addition | Adds two values | `9 + 4` → `13` |
| `-` | Subtraction | Subtracts one value from another | `9 - 4` → `5` |
| `*` | Multiplication | Multiplies two values | `9 * 4` → `36` |
| `/` | Division | Divides one value by another, **returns a float** | `9 / 4` → `2.25` |
| `//` | Floor (Integer) Division | Divides, returns the quotient as an **integer**, **discarding the fractional part** | `9 // 4` → `2` |
| `%` | Modulo | Returns the **remainder** after division | `9 % 4` → `1` |

**Order of operations** — Python follows the standard mathematical **order of operations** (commonly remembered as **BODMAS**: Brackets, Orders/exponents, Division and Multiplication, Addition and Subtraction) when evaluating expressions with multiple operators, ensuring predictable, mathematically-consistent results.

```python
x = 9
y = 4
result_add  = x + y   # 13
result_sub  = x - y   # 5
result_mul  = x * y   # 36
result_div  = x / y   # 2.25
result_fdiv = x // y  # 2
result_mod  = x % y   # 1
```

### Interview Perspective
**Q: What's the difference between `/` and `//` in Python?**
> `/` performs standard division and always returns a float, even if the result divides evenly (`8 / 4` → `2.0`). `//` performs floor/integer division — it divides and then discards the fractional part, returning an integer-valued result (`9 // 4` → `2`, not `2.25`).

**Q: What does the modulo operator (`%`) return, and what's a common practical use for it?**
> It returns the remainder left over after division — e.g., `9 % 4` is `1`. A common use is checking whether a number is even or odd (`n % 2 == 0`), or cycling through a fixed range of values (like wrapping an index around an array's length).

**Q: How does Python decide the order to evaluate an expression with multiple operators?**
> It follows standard mathematical order of operations (BODMAS/PEMDAS) — brackets/parentheses first, then exponents, then multiplication and division (left to right), then addition and subtraction (left to right) — the same convention used in standard math notation, ensuring expressions evaluate predictably.

---

## 4. Variables

### Learning Perspective
**Variables** are **containers for storing data values** — they let you **store and manipulate data**, accessing and modifying values throughout your code, rather than hardcoding raw values everywhere they're needed.

**The assignment operator (`=`)** — a type of **binary operator** — **assigns a value to a variable**, modifying the variable on its left using the value on its right.

**Reassignment overrides the previous value:**
```python
x = 5
x = 10   # x is now 10; the previous value (5) is gone
```

**Performing math operations on variables** — using the same or different variables:
```python
a = 5
b = 3
total = a + b   # 8
a = a + 1       # 6 — reassigns a using its own previous value
```

**Mutability and shared references — an important nuance:** modifying the value of one variable will affect **other variables only if they reference the same mutable object**. For simple immutable types (integers, floats, strings, booleans — see Section 6), reassigning one variable never affects another, even if they previously held "the same value," because each variable simply points to its own independent value. This distinction matters much more with mutable objects (like lists or dictionaries), where two variables can genuinely point to — and share changes to — the exact same underlying object in memory.

```python
x = [1, 2, 3]
y = x            # y references the SAME list object as x
y.append(4)
print(x)         # [1, 2, 3, 4] — x is affected too, since they share the same object

a = 5
b = a            # b gets a COPY of the value 5 (int is immutable)
b = 10
print(a)         # 5 — a is unaffected
```

### Interview Perspective
**Q: What does the assignment operator do, and what happens when you assign a new value to an existing variable?**
> `=` assigns the value on its right to the variable on its left. Reassigning a variable simply overrides its previous value — the old value is discarded (unless something else still references it).

**Q: Why does modifying one variable sometimes affect another variable, and sometimes not?**
> It depends on whether the underlying object is mutable and whether the two variables reference the *same* object. With immutable types (int, float, string, bool), each variable holds its own independent value, so reassigning one never affects another. With mutable types (like lists or dictionaries), two variables can point to the exact same object in memory — modifying the object through one variable is visible through the other, since there's genuinely only one object being shared, not two copies.

⭐ **Frequently asked** — the mutable-vs-immutable shared-reference behavior is a classic Python "gotcha" question; be ready to demonstrate it with a short code example.

---

## 5. Strings & String Operations

### Learning Perspective
A **string** is an **ordered sequence of characters** — including letters, whitespace, digits, or special characters — usually written within **double quotes (`" "`)** or **single quotes (`' '`)**. A string can be **assigned to a variable**, just like any other value.

**String operations** involve manipulating text data via tasks like **indexing, concatenation, slicing, and formatting**. **Manipulating** a string means modifying it or creating a new string by making changes to an existing one.

### 5a. Indexing & Negative Indexing
Each character in a string has an **index number**, which can be **positive or negative**:
- **Positive indexing** starts at `0` for the first character, counting forward
- **Negative indexing** allows you to access elements **from the end** of a sequence (string, list, or tuple), using negative numbers — `-1` refers to the **last** character, `-2` the second-to-last, and so on

```python
my_string = "Hello"
char = my_string[0]     # "H" — positive index
last_char = my_string[-1]  # "o" — negative index
```

### 5b. Slicing & Stride
**Slicing** is used to **return a portion** of a defined sequence (like a string or list), using the syntax `sequence[start:end]` — extracting the substring from `start` up to (but **not including**) `end`.

```python
my_string = "Hello"
substring = my_string[0:5]   # "Hello"
```

You can also input a **stride value** — a third value in the slice syntax (`sequence[start:end:stride]`) — controlling the **step size** between characters included in the slice (e.g., a stride of `2` takes every other character).

```python
my_string = "Hello World"
every_other = my_string[::2]   # "HloWrd" — stride of 2
```

### 5c. Immutability
**You cannot modify an existing string — strings are immutable** in Python. Operations that appear to "change" a string (like `.replace()` or `.upper()`) actually **produce a brand-new string**, leaving the original untouched.

```python
my_string = "Hello"
new_string = my_string.upper()  # creates a NEW string "HELLO"
print(my_string)  # still "Hello" — the original is unchanged
```

### 5d. Concatenation & Replication
- **Concatenation** — **linking things together in a chain/series**; combines two or more strings into one, typically via `+`
  ```python
  result = "Hello" + " John"   # "Hello John"
  ```
- **Replication** — to **make an exact copy of** something; in Python, multiplying a string by an integer repeats it that many times
  ```python
  repeated = "Ha" * 3   # "HaHaHa"
  ```
- **`len()`** — returns the **length** of a string (a number, not another string)
  ```python
  length = len("Hello")   # 5
  ```

### 5e. Escape Sequences
An **escape sequence** consists of **two or more characters**, often beginning with an **escape character** (the **backslash**, `\`), telling the computer to perform a special function rather than inserting the literal characters. A **backslash** signals that the character immediately following it should be treated specially (as an escaped or raw-string character).

**Common escape sequences:**
| Sequence | Effect |
|---|---|
| `\n` | New line |
| `\t` | Tab |
| `\\` | A literal backslash |
| `\'` | A literal single quote (inside a single-quoted string) |
| `\"` | A literal double quote (inside a double-quoted string) |

```python
print("Line 1\nLine 2")   # prints on two separate lines
print("Column1\tColumn2") # inserts a tab between the two
```

### Interview Perspective
**Q: What's the difference between positive and negative indexing in a string?**
> Positive indexing starts at 0 for the first character and counts forward. Negative indexing counts from the end, with `-1` referring to the last character — useful when you want to access elements relative to the end without knowing the string's exact length.

**Q: How does string slicing work, including the stride value?**
> `string[start:end]` extracts characters from index `start` up to (but not including) `end`. Adding a third value, `string[start:end:stride]`, controls the step size between included characters — e.g., a stride of 2 takes every other character, and a negative stride can be used to reverse the string.

**Q: Why are strings described as immutable, and what actually happens when you call a method like `.upper()`?**
> Strings can't be modified in place — once created, their content never changes. Methods like `.upper()` or `.replace()` don't alter the original string; they construct and return a brand-new string with the transformation applied, leaving the original object completely untouched in memory.

**Q: What's the difference between concatenation and replication?**
> Concatenation joins two or more different strings together (via `+`). Replication repeats a single string a specified number of times (via `*` with an integer) — different operation, different intent, but both produce a new string.

⭐ **Very frequently asked** — string immutability and slicing syntax (including stride) are two of the most commonly tested Python fundamentals.

---

## 6. Immutable vs. Mutable Objects

### Learning Perspective
**Immutable objects** are built-in data types that **can't be changed after creation** — this includes `int`, `float`, `bool`, `string`, `Unicode`, and `tuple`. Any operation that appears to modify an immutable object actually creates and returns a **new** object instead.

(Mutable types, like lists, dictionaries, and sets, are the counterpart — **not** covered by this specific term, but relevant context: those types *can* be changed in place, which is exactly the behavior demonstrated in the shared-reference example in Section 4.)

### Interview Perspective
**Q: Which of Python's built-in types are immutable?**
> Integers, floats, booleans, strings, and tuples. Once created, their value can't be changed in place — any apparent modification actually produces a new object.

**Q: Why does immutability matter practically, beyond strings?**
> It affects behavior around variable references and function arguments — passing an immutable object into a function can't result in the caller's original value being modified, since any change inside the function just creates a new local object. It also makes immutable types safe to use as dictionary keys (since their value, and therefore their hash, can never change unexpectedly) — mutable types like lists cannot be used as dictionary keys for this reason.

---

## 7. Sequences, Arrays & Related Concepts

### Learning Perspective
- **Sequence** — formally defined as a **function whose domain is an interval of integers** — in practical Python terms, this describes ordered, indexable collections like strings, lists, and tuples, where each element has a defined position (index)
- **Array of numbers** — a set of numbers or objects following a pattern, arranged in **rows and columns** (conceptually related to how multiplication and structured numeric data are often visualized/explained)
- **Substring** — a sequence of characters that are **part of** an original, longer string (what slicing typically extracts)

### Interview Perspective
**Q: What makes something a "sequence" type in Python?**
> A sequence is an ordered collection where each element occupies a defined, indexable position — strings, lists, and tuples are all sequences. This shared structure is why the same indexing and slicing syntax (`obj[start:end:stride]`) works consistently across all of them.

---

## 8. Operators, Symbols & Special Syntax

### Learning Perspective
A quick reference for symbols mentioned throughout Python syntax:

- **Operators in Python** — used to **perform operations on variables and values** (arithmetic, comparison, logical, and assignment operators are the main categories)
- **Asterisk (`*`)** — used to perform **various operations** in Python — multiplication (`3 * 4`), string replication (`"Ha" * 3`), and (in more advanced usage) unpacking arguments
- **Forward slash (`/`)** — used to perform **various operations** — most notably standard division
- **Colon (`:`)** — used to represent an **indented block** (e.g., after `if`, `for`, `def`), and also used to **fetch data and index ranges** (as in slicing syntax, `string[0:5]`)
- **Parentheses (`()`)** — used to **call an object** (like calling a function: `print()`, `len()`)
- **Single quote (`' '`) / Double quote (`" "`)** — both used to represent **strings** in Python; functionally interchangeable for basic strings, though useful to mix when a string itself contains one type of quote
- **Special characters** — characters that are **not** considered a number or letter — symbols, accent marks, and punctuation marks

### Interview Perspective
**Q: Does it matter whether you use single or double quotes for a string in Python?**
> Functionally, no — both work identically for defining a string. The practical difference comes up when a string itself contains a quote character: using double quotes lets you include a literal single quote without escaping (and vice versa), which is a common reason to choose one over the other in a given case.

**Q: What role does the colon (`:`) play in Python syntax?**
> Two main roles: it introduces an indented code block (after control structures like `if`, `for`, `while`, or a function/class definition), and it's used in slicing syntax to separate the start/end/stride values when extracting a portion of a sequence.

---

## 9. Related Fields: AI, Data Science & Data Engineering

### Learning Perspective
Python is a **foundational** language (denoting an underlying basis or principle — fundamental) across several closely related but distinct technical fields:

- **AI (Artificial Intelligence)** — the ability of a digital computer or computer-controlled robot to perform tasks **commonly associated with intelligent beings**
- **Data science** — an **interdisciplinary field** focused on **extracting knowledge from typically huge data sets** — encompassing analysis, preparing data for analysis, and presenting findings to inform high-level organizational decisions
- **Data engineering** — the discipline responsible for **turning raw data into information** an organization can understand and use, via **blending, testing, and optimizing** data pulled from numerous sources
- **Application development** — the process of **planning, designing, creating, testing, and deploying** a software application to perform various business operations

### Interview Perspective
**Q: How would you distinguish data science from data engineering, in one sentence each?**
> Data science focuses on extracting insights and knowledge from data — analysis, modeling, and presenting findings to support decisions. Data engineering focuses on the pipeline that makes that analysis possible in the first place — collecting, blending, cleaning, and optimizing raw data from multiple sources so it's usable and reliable.

---

## Quick Reference: Common String Methods & Built-ins

| Method/Function | Description | Example |
|---|---|---|
| **`len()`** | Returns the length of a string | `len("Hello")` → `5` |
| **Indexing** | Accesses a character at a specific index | `"Hello"[0]` → `"H"` |
| **Slicing** | Extracts a portion of the string | `"Hello"[0:5]` → `"Hello"` |
| **`.lower()`** | Converts string to lowercase | `"Hello".lower()` → `"hello"` |
| **`.upper()`** | Converts string to uppercase | `"Hello".upper()` → `"HELLO"` |
| **`.replace(old, new)`** | Replaces substrings | `"Hello".replace("Hello", "Hi")` → `"Hi"` |
| **`.split(delimiter)`** | Splits a string into a list based on a delimiter | `"a,b,c".split(",")` → `["a", "b", "c"]` |
| **`.strip()`** | Removes leading/trailing whitespace | `"  Hello  ".strip()` → `"Hello"` |
| **Concatenation (`+`)** | Combines strings | `"Hello" + " John"` → `"Hello John"` |
| **`print()`** | Prints a message or variable | `print("Hello, world")` |
| **Comments (`#`)** | Lines ignored by the Python interpreter | `# This is a comment` |

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **AI** | The ability of a computer/robot to perform tasks commonly associated with intelligent beings |
| **Application development** | Planning, designing, creating, testing, and deploying a software application |
| **Arithmetic Operations** | Basic calculations — addition, subtraction, multiplication, division |
| **Array of numbers** | A set of numbers/objects following a pattern, arranged in rows and columns |
| **Assignment operator** | A binary operator (`=`) that modifies the variable on its left using the value on its right |
| **Asterisk** | `*` symbol used for various operations (multiplication, replication, unpacking) |
| **Backslash** | An escape character indicating the next character should be treated specially |
| **Boolean** | A binary logical value: `0` (False) or `1` (True) |
| **Colon** | Represents an indented block; also used in slicing/index ranges |
| **Concatenate** | Link things together in a chain or series |
| **Data engineering** | Turning raw data into usable information by blending, testing, and optimizing it |
| **Data science** | An interdisciplinary field extracting knowledge from large data sets |
| **Data type** | The type of value a variable has, determining what operations can be applied |
| **Double quote** | `" "` symbol used to represent strings |
| **Escape sequence** | Two+ characters, often starting with `\`, telling the computer to perform a special function |
| **Expression** | A combination of operators and operands interpreted to produce a value |
| **Float** | A number with a decimal point |
| **Forward slash** | `/` symbol used for various operations, notably division |
| **Foundational** | Denoting an underlying basis or principle; fundamental |
| **Immutable** | Built-in types (int, float, bool, string, Unicode, tuple) that can't be changed after creation |
| **Integer** | A whole number — positive, negative, or zero |
| **Manipulate** | Modifying a string, or creating a new one by changing an existing string |
| **Mathematical conventions** | Facts, names, notations, or usages generally agreed upon by mathematicians |
| **Mathematical expressions** | Statements with 2+ terms (numbers/variables) connected by an operator |
| **Mathematical operations** | Calculating a value using operands and a math operator |
| **Negative indexing** | Accessing sequence elements from the end, using negative index numbers |
| **Operands** | The quantity an operation is performed on |
| **Operators in Python** | Used to perform operations on variables and values |
| **Parentheses** | `()` used to call an object |
| **Replicate** | To make an exact copy of something |
| **Sequence** | A function whose domain is an interval of integers (in practice: ordered, indexable collections) |
| **Single quote** | `' '` symbol used to represent strings |
| **Slicing in Python** | Returns a portion of a defined sequence |
| **Special characters** | Characters that aren't a number or letter — symbols, accents, punctuation |
| **Stride value** | Controls the step size between elements included in a slice |
| **Strings** | Arrays of bytes representing Unicode characters |
| **Substring** | A sequence of characters that is part of an original string |
| **Type casting** | Converting one data type to another |
| **Types in Python** | Classification/categorization of data items, determining valid operations |
| **Variables** | Containers for storing data values |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Core data types | int, float, string, boolean |
| Type casting to boolean | `0`/`0.0` → False; any non-zero value → True |
| `/` vs `//` | Always returns float vs. floor/integer division, discards fraction |
| `%` (modulo) | Returns the remainder after division |
| Order of operations | BODMAS — brackets, orders, division/multiplication, addition/subtraction |
| Assignment (`=`) | Assigns the right-hand value to the left-hand variable |
| Mutable vs. immutable variables | Shared object → changes visible via both variables; immutable → each variable independent |
| String indexing | Positive from start (0-based); negative from end (`-1` = last char) |
| Slicing | `[start:end:stride]` — end is exclusive |
| String immutability | Strings can't be modified in place — methods return new strings |
| Concatenation vs. replication | Joining different strings (`+`) vs. repeating one string (`*`) |
| Escape sequences | `\n` newline, `\t` tab, `\\` literal backslash |
| Immutable built-in types | int, float, bool, string, Unicode, tuple |