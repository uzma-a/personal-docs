# Python — Lists, Tuples, Sets & Dictionaries

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general Python knowledge, since no source content was provided. Worth cross-checking against your actual course material for alignment, same as the other general-knowledge files.

---

## 1. Lists

### Learning Perspective
A **list** is an **ordered, mutable** collection that can hold items of **mixed data types** — defined with square brackets `[ ]`.

```python
fruits = ["apple", "banana", "cherry"]
mixed = [1, "two", 3.0, True]
```

**Key characteristics:**
- **Ordered** — items maintain the position they were inserted in
- **Mutable** — items can be added, removed, or changed after creation
- **Allows duplicates** — the same value can appear multiple times
- **Indexed** — accessed via positive or negative indices, and sliceable, just like strings

**Common list operations:**
```python
fruits = ["apple", "banana", "cherry"]

fruits.append("date")        # adds to the end: ["apple", "banana", "cherry", "date"]
fruits.insert(1, "avocado")  # inserts at index 1
fruits.remove("banana")      # removes the first matching value
fruits.pop()                 # removes and returns the last item
fruits.pop(0)                # removes and returns item at index 0
fruits.sort()                # sorts in place
fruits.reverse()             # reverses in place
len(fruits)                  # number of items
"apple" in fruits            # membership check → True/False
```

**List comprehensions** — a concise way to build a new list by applying an expression to each item in an iterable, optionally with a filter:
```python
squares = [x**2 for x in range(5)]           # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0] # [0, 2, 4, 6, 8]
```

### Interview Perspective
**Q: What defines a Python list, and what are its key properties?**
> A list is an ordered, mutable collection defined with `[ ]`, capable of holding mixed data types and duplicate values. Being mutable means you can add, remove, or modify elements after creation — unlike tuples.

**Q: What is a list comprehension, and why would you use one over a `for` loop?**
> A concise, single-line way to build a new list by applying an expression (and optionally a filter condition) to each item of an existing iterable — e.g., `[x**2 for x in range(5)]`. It's generally preferred for simple transformations because it's more readable and often faster than the equivalent explicit `for` loop with repeated `.append()` calls.

**Q: What's the difference between `.remove()` and `.pop()`?**
> `.remove(value)` deletes the first occurrence of a specific *value* and returns nothing. `.pop(index)` deletes and *returns* the item at a specific *index* (defaulting to the last item if no index is given) — useful when you actually need the removed value.

---

## 2. Tuples

### Learning Perspective
A **tuple** is an **ordered, immutable** collection — defined with parentheses `( )` (or often no brackets at all, just commas).

```python
coordinates = (10, 20)
single_item = (5,)   # note the trailing comma — required for a single-item tuple
no_parens = 1, 2, 3  # also valid — parentheses are optional
```

**Key characteristics:**
- **Ordered** — like lists, items maintain their insertion order
- **Immutable** — once created, a tuple's contents **cannot be changed**, added to, or removed
- **Allows duplicates**
- **Indexed and sliceable**, same as lists/strings

**Why use a tuple instead of a list?**
- **Intent/safety** — signals that this data shouldn't change, preventing accidental modification
- **Performance** — tuples are generally slightly faster to create and iterate over than lists, due to their immutability
- **Hashability** — because they're immutable, tuples (containing only immutable elements) **can be used as dictionary keys** or added to a set — lists cannot, since they're mutable

```python
point = (3, 4)
# point[0] = 5  # TypeError — tuples don't support item assignment

locations = {(0, 0): "origin", (1, 1): "diagonal"}  # tuple as a dict key — valid
```

**Tuple unpacking** — assigning a tuple's values directly to multiple variables:
```python
x, y = (3, 4)   # x = 3, y = 4
```

### Interview Perspective
**Q: What's the core difference between a list and a tuple?**
> Both are ordered collections, but lists are mutable (can be changed after creation) and tuples are immutable (cannot). This makes tuples suitable for fixed, "shouldn't change" data — and it's also why tuples can be used as dictionary keys or set members, while lists cannot, since dictionary keys and set members must be hashable, and mutable objects aren't hashable.

**Q: Why can a tuple be used as a dictionary key, but a list can't?**
> Dictionary keys (and set elements) must be hashable — their hash value must never change over their lifetime, which is only guaranteed if the object is immutable. Tuples are immutable, so they're hashable (as long as everything inside them is also immutable). Lists are mutable, so their contents — and therefore their hash — could change after being used as a key, which Python disallows entirely by making lists unhashable.

**Q: What is tuple unpacking, and where might you see it used?**
> Assigning a tuple's individual values directly to multiple variables in one line, e.g., `x, y = (3, 4)`. It's commonly used when a function returns multiple values as a tuple, letting you unpack them directly into separate named variables at the call site — e.g., `quotient, remainder = divmod(9, 4)`.

---

## 3. Sets

### Learning Perspective
A **set** is an **unordered, mutable** collection of **unique** items — defined with curly braces `{ }` (or `set()` for an empty set — `{}` alone creates an empty **dictionary**, not a set).

```python
unique_numbers = {1, 2, 3, 3, 2}   # becomes {1, 2, 3} — duplicates automatically removed
empty_set = set()                   # NOT {} — that's an empty dict
```

**Key characteristics:**
- **Unordered** — no guaranteed position/index; sets **cannot** be indexed or sliced
- **Mutable** — items can be added or removed (though the *items themselves* must be immutable/hashable — so a set can't contain lists, but can contain tuples)
- **No duplicates** — automatically enforced; adding a duplicate value has no effect
- **Optimized for membership testing** — checking `item in my_set` is significantly faster on average than checking `item in my_list`, especially for large collections, due to how sets are implemented internally (hash-based, similar to dictionary keys)

**Common set operations, including mathematical set operations:**
```python
a = {1, 2, 3}
b = {2, 3, 4}

a.add(5)          # {1, 2, 3, 5}
a.remove(1)        # removes 1 (raises an error if not present)
a.discard(10)       # removes if present, no error if not

a | b   # union → {1, 2, 3, 4, 5}
a & b   # intersection → {2, 3}
a - b   # difference → {1}
a ^ b   # symmetric difference (in one but not both) → {1, 4}
```

### Interview Perspective
**Q: What defines a set, and how does it differ from a list?**
> A set is an unordered, mutable collection of unique items — duplicates are automatically discarded, and sets can't be indexed or sliced since there's no defined order. Lists, by contrast, are ordered, allow duplicates, and support indexing.

**Q: Why is membership testing (`in`) typically much faster on a set than on a list?**
> Sets are implemented using a hash table internally (similar to how dictionary keys work) — checking membership is roughly O(1) on average, since the item's hash directly indicates where to look. Checking membership in a list is O(n) — it has to scan through elements one by one in the worst case, since there's no hash-based shortcut.

**Q: What are the core mathematical set operations Python supports, and what do they return?**
> Union (`|`) combines all unique elements from both sets. Intersection (`&`) returns only elements present in both. Difference (`-`) returns elements in the first set but not the second. Symmetric difference (`^`) returns elements in either set, but not both. These mirror standard set theory operations and are commonly used for tasks like deduplication, comparing two datasets, or finding overlaps/differences between collections.

⭐ **Frequently asked** — be ready to explain *why* sets have faster membership testing (the hash-table reasoning), not just state that they do.

---

## 4. Dictionaries

### Learning Perspective
A **dictionary** is an **unordered (technically insertion-ordered as of Python 3.7+) collection of key-value pairs** — defined with curly braces `{ }`, using `key: value` syntax. Keys must be **unique** and **hashable** (immutable); values can be anything, including other dictionaries or lists.

```python
person = {"name": "Alice", "age": 30, "city": "New York"}
```

**Key characteristics:**
- **Key-value pairs** — every item is accessed by its **key**, not a positional index
- **Keys must be unique and hashable** — duplicate keys aren't allowed (assigning to an existing key overwrites its value); keys are typically strings, numbers, or tuples (never lists or other dicts, since those are mutable/unhashable)
- **Values can be any type**, including mutable types like lists or nested dictionaries
- **Insertion-ordered** (since Python 3.7) — iterating over a dictionary yields items in the order they were added, though dictionaries are still conceptually "keyed" collections rather than positionally-indexed ones

**Common dictionary operations:**
```python
person = {"name": "Alice", "age": 30}

person["age"]              # 30 — direct access (raises KeyError if missing)
person.get("age")          # 30 — safer access, returns None (or a default) if missing
person.get("email", "N/A") # "N/A" — default value if key doesn't exist

person["city"] = "Boston"  # adds a new key-value pair
person["age"] = 31         # updates an existing key's value
del person["city"]         # removes a key-value pair
person.pop("age")          # removes and returns the value for "age"

"name" in person           # membership check on KEYS by default → True

person.keys()     # dict_keys(['name', 'age'])
person.values()   # dict_values(['Alice', 30])
person.items()    # dict_items([('name', 'Alice'), ('age', 30)])

for key, value in person.items():
    print(key, value)
```

**Dictionary comprehensions** — the dict equivalent of list comprehensions:
```python
squares = {x: x**2 for x in range(5)}   # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Interview Perspective
**Q: What's the difference between accessing a dictionary value with `dict[key]` versus `dict.get(key)`?**
> `dict[key]` raises a `KeyError` if the key doesn't exist. `dict.get(key)` returns `None` if the key is missing (or a specified default value, via `dict.get(key, default)`), avoiding the exception entirely — generally preferred when a missing key is a normal, expected possibility rather than a bug.

**Q: Are Python dictionaries ordered?**
> As of Python 3.7+, yes — dictionaries maintain **insertion order**, meaning iterating over a dict yields items in the order keys were first added. This wasn't guaranteed in earlier Python versions, where dict ordering was an implementation detail, not a language guarantee.

**Q: Why must dictionary keys be immutable/hashable?**
> Because dictionaries are implemented as hash tables — a key's hash value determines where it's stored internally, and that hash must never change over the key's lifetime for lookups to remain consistent and correct. Mutable objects (like lists) don't guarantee a stable hash, so Python disallows them as keys entirely; strings, numbers, and tuples (of immutable elements) are all valid, hashable key types.

**Q: What does `dict.items()` return, and why is it commonly used in a `for` loop?**
> It returns a view of the dictionary's key-value pairs as tuples, letting you unpack both the key and value directly in a loop: `for key, value in my_dict.items():` — more convenient than iterating over just the keys and looking up each value separately with `my_dict[key]`.

---

## 5. Comparing Lists, Tuples, Sets & Dictionaries

### Learning Perspective
A single side-by-side comparison ties these four structures together:

| Property | List | Tuple | Set | Dictionary |
|---|---|---|---|---|
| **Syntax** | `[ ]` | `( )` | `{ }` (or `set()`) | `{key: value}` |
| **Ordered** | Yes | Yes | No | Yes (insertion order, 3.7+) |
| **Mutable** | Yes | No | Yes | Yes |
| **Duplicates allowed** | Yes | Yes | No | Keys: No / Values: Yes |
| **Indexed access** | Yes (by position) | Yes (by position) | No | Yes (by key) |
| **Hashable (usable as a dict key/set member)** | No | Yes (if contents are immutable) | No | No |

### Interview Perspective
**Q: If you had to choose between a list, tuple, set, and dictionary for a given task, what factors would drive that choice?**
> Whether order matters (list/tuple/dict preserve it, set doesn't), whether the data needs to change after creation (tuple if not, list/set/dict if so), whether duplicates should be allowed or automatically removed (set removes them), and whether you need fast key-based lookup versus positional access (dict for key-based, list/tuple for positional). For example: use a tuple for fixed coordinate data, a set for deduplicating values or fast membership checks, a dict for structured key-based records, and a list for a general-purpose, ordered, changeable collection.

**Q: Why can't a list or dictionary be used as a set element or dictionary key, but a tuple can?**
> Set elements and dictionary keys must be hashable, which requires immutability — a guarantee that the object's value (and therefore its hash) never changes. Lists and dictionaries are mutable, so Python disallows them here entirely. Tuples are immutable (as long as everything inside them is also immutable), so they satisfy the hashability requirement and can be used in both roles.

⭐ **Extremely frequently asked** — this comparison table (or some version of "when would you use X vs. Y") is one of the single most common Python fundamentals interview questions.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| List | Ordered, mutable, allows duplicates — `[ ]` |
| Tuple | Ordered, immutable, allows duplicates — `( )`, hashable if contents are immutable |
| Set | Unordered, mutable, unique elements only — `{ }`, fast membership testing via hashing |
| Dictionary | Key-value pairs, insertion-ordered (3.7+), keys must be unique and hashable |
| `.remove()` vs `.pop()` (list) | Removes by value, no return vs. removes by index, returns the value |
| Why tuples are hashable, lists aren't | Immutability guarantees a stable hash; mutability doesn't |
| `dict[key]` vs `dict.get(key)` | Raises `KeyError` if missing vs. returns `None`/default safely |
| Set operations | `\|` union, `&` intersection, `-` difference, `^` symmetric difference |
| Fast membership testing | Sets and dict keys — O(1) average via hashing vs. O(n) for list scanning |
| Choosing a structure | Order? → list/tuple/dict. Fixed? → tuple. Unique/fast lookup? → set. Key-based? → dict |