# File Handling in Python

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general Python knowledge, since no source content was provided. Worth cross-checking against your actual course material for alignment, same as the other general-knowledge files. Matches the `file-handling` slug in your NAV.

---

## 1. Opening & Closing Files: `open()` and File Modes

### Learning Perspective
Python's built-in **`open()`** function is the entry point for reading from or writing to a file. It returns a **file object**, through which you perform all subsequent read/write operations.

```python
file = open("data.txt", "r")   # opens for reading
# ... do something with the file ...
file.close()                    # must explicitly close it
```

**Common file modes** (the second argument to `open()`):

| Mode | Meaning |
|---|---|
| `"r"` | **Read** (default) — file must already exist, or `FileNotFoundError` is raised |
| `"w"` | **Write** — creates the file if it doesn't exist; **overwrites/truncates** existing content entirely |
| `"a"` | **Append** — creates the file if it doesn't exist; adds new content to the **end** without touching existing content |
| `"x"` | **Exclusive creation** — creates a new file, but raises `FileExistsError` if it already exists |
| `"r+"` | Read **and** write — file must already exist |
| `"b"` (combined, e.g. `"rb"`, `"wb"`) | **Binary mode** — for non-text files (images, executables, etc.); reads/writes `bytes` instead of `str` |
| `"t"` (combined, e.g. `"rt"`) | **Text mode** (default) — reads/writes `str`, handling text encoding automatically |

**Why explicitly closing matters:** an unclosed file can lead to **resource leaks** (the OS has a limited number of file handles a process can hold open) and, critically, **data loss** — writes may be buffered in memory and not actually flushed to disk until the file is properly closed.

### Interview Perspective
**Q: What does `open()` return, and what are the main file modes?**
> It returns a file object used for subsequent read/write operations. Key modes: `"r"` for reading (file must exist), `"w"` for writing (creates or overwrites/truncates), `"a"` for appending (creates or adds to the end without touching existing content), and `"x"` for exclusive creation (fails if the file already exists). Adding `"b"` switches to binary mode for non-text files.

**Q: What's the practical difference between `"w"` mode and `"a"` mode?**
> `"w"` mode truncates the file immediately upon opening — any existing content is wiped, even if you never actually write anything before closing it. `"a"` mode preserves existing content and only adds new writes to the end of the file — a common and costly mistake is reaching for `"w"` when you actually meant to append.

**Q: Why is it important to close a file after you're done with it?**
> To release the OS-level file handle (processes have a limited number available) and, critically, to ensure any buffered writes are actually flushed to disk — data written to a file object isn't always immediately persisted; closing (or explicit flushing) guarantees it is, preventing silent data loss if the program exits unexpectedly.

---

## 2. The `with` Statement (Context Managers)

### Learning Perspective
Manually calling `.close()` is risky — if an exception occurs between `open()` and `.close()`, the file might never get closed. The **`with`** statement solves this by using a **context manager**, which **automatically closes the file** when the block exits, **even if an exception occurs** inside it.

```python
with open("data.txt", "r") as file:
    content = file.read()
    # file is automatically closed here, even if an error occurred above
```

This is the **strongly preferred, idiomatic** way to handle files in Python — manual `open()`/`.close()` pairs should generally be avoided in favor of `with`.

**Multiple files in one `with` statement:**
```python
with open("input.txt", "r") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read())
```

### Interview Perspective
**Q: Why is the `with` statement preferred over manually calling `open()` and `.close()`?**
> `with` guarantees the file is properly closed when the block exits, *even if an exception is raised inside it* — with manual `open()`/`.close()`, an exception between those two calls would skip `.close()` entirely, leaking the file handle and risking unflushed data. `with` uses a context manager to handle that cleanup automatically and reliably, regardless of how the block exits.

**Q: What is a context manager, conceptually?**
> An object that defines setup and teardown behavior around a block of code — implementing `__enter__` (run when entering the `with` block) and `__exit__` (run when leaving it, whether normally or via an exception). File objects implement this protocol, which is exactly what makes `with open(...) as f:` work; you can also implement this protocol on your own custom classes for the same guaranteed-cleanup behavior.

⭐ **Very frequently asked** — expect a direct question on *why* `with` is preferred; a clear answer referencing exception safety is the strongest response.

---

## 3. Reading Files

### Learning Perspective
Several methods exist for reading file content, each suited to different situations:

- **`.read()`** — reads the **entire file** into a single string. Simple, but risky for very large files (loads everything into memory at once).
  ```python
  with open("data.txt", "r") as file:
      content = file.read()
  ```
- **`.readline()`** — reads a **single line** at a time (including the trailing `\n`), advancing an internal position each call.
  ```python
  with open("data.txt", "r") as file:
      first_line = file.readline()
      second_line = file.readline()
  ```
- **`.readlines()`** — reads **all lines** into a **list of strings**, one per line (each retaining its trailing `\n`).
  ```python
  with open("data.txt", "r") as file:
      lines = file.readlines()   # ["line1\n", "line2\n", ...]
  ```
- **Iterating directly over the file object** — the most **memory-efficient** way to process a file **line by line**, since it doesn't load the whole file (or even a whole list of lines) into memory at once — it reads lazily, one line at a time.
  ```python
  with open("data.txt", "r") as file:
      for line in file:
          print(line.strip())   # .strip() removes the trailing newline
  ```

### Interview Perspective
**Q: What are the main ways to read a file in Python, and when would you choose each?**
> `.read()` for loading the whole file into a single string (fine for small files). `.readlines()` for getting a list of all lines at once, when you need list-like access to every line. Direct iteration (`for line in file:`) for the most memory-efficient line-by-line processing, especially important for very large files, since it never loads the entire file into memory at once.

**Q: Why is iterating directly over a file object generally preferred over `.readlines()` for large files?**
> `.readlines()` reads the *entire* file into memory as a list before you can process anything — for a very large file, this could exhaust available memory. Direct iteration reads lazily, one line at a time, so memory usage stays constant regardless of the file's total size — critical when processing large log files or datasets that might not comfortably fit in memory.

---

## 4. Writing Files

### Learning Perspective
- **`.write(string)`** — writes a **string** to the file. Unlike `print()`, it does **not** automatically add a newline — you must include `\n` explicitly if you want one.
  ```python
  with open("output.txt", "w") as file:
      file.write("Hello\n")
      file.write("World\n")
  ```
- **`.writelines(list_of_strings)`** — writes a **list of strings** to the file, one after another — but like `.write()`, it does **not** insert newlines between them automatically; each string must already include its own `\n` if line breaks are wanted.
  ```python
  lines = ["Hello\n", "World\n"]
  with open("output.txt", "w") as file:
      file.writelines(lines)
  ```

### Interview Perspective
**Q: Does `.write()` automatically add a newline character, like `print()` does?**
> No — `.write()` writes exactly the string you give it, with no automatic newline. If you want line breaks, you need to include `\n` explicitly in the string you're writing, unlike `print()`, which appends a newline by default.

**Q: What's the difference between `.write()` and `.writelines()`?**
> `.write()` writes a single string. `.writelines()` writes a list (or any iterable) of strings, one after another — but crucially, it doesn't insert separators or newlines between them automatically either; each item in the list needs to already contain its own line break if that's the desired formatting.

---

## 5. File Position: `seek()` and `tell()`

### Learning Perspective
A file object maintains an internal **position** (a "cursor") tracking where the next read/write operation will occur.

- **`.tell()`** — returns the **current position** (in bytes) within the file
- **`.seek(offset)`** — **moves the position** to a specific byte offset, letting you jump around within the file rather than only reading sequentially from the start

```python
with open("data.txt", "r") as file:
    print(file.tell())     # 0 — at the start
    file.read(5)             # reads first 5 characters
    print(file.tell())     # 5 — position has advanced
    file.seek(0)             # jump back to the beginning
    print(file.read(5))    # reads the same first 5 characters again
```

### Interview Perspective
**Q: What do `.tell()` and `.seek()` do, and when might you use them?**
> `.tell()` reports the current read/write position within the file (in bytes). `.seek(offset)` moves that position to a specific point, letting you re-read earlier content or jump to a specific location rather than only reading sequentially. Useful for things like re-reading a file's header after processing its body, or implementing custom parsing logic that needs to jump around within a file.

---

## 6. Working with File Paths

### Learning Perspective
While you can use plain strings for file paths, Python's **`pathlib`** module (modern, object-oriented) or the older **`os.path`** module provide more robust, cross-platform-safe ways to construct and manipulate paths.

**`pathlib` (modern, generally preferred):**
```python
from pathlib import Path

p = Path("data") / "files" / "report.txt"   # builds a path using `/` — works on any OS
print(p.exists())     # checks if the path exists
print(p.name)          # "report.txt"
print(p.suffix)        # ".txt"
print(p.parent)        # "data/files"

for file in Path("data").glob("*.txt"):   # find all .txt files in a directory
    print(file)
```

**Why not just concatenate path strings manually?** Because path separators differ across operating systems (`/` on macOS/Linux, `\` on Windows) — `pathlib` (and `os.path`) handle this automatically, producing correctly-formatted paths regardless of the platform the code runs on.

### Interview Perspective
**Q: Why should you use `pathlib` (or `os.path`) instead of manually concatenating path strings with `+`?**
> Because file path separators differ across operating systems — Windows uses backslashes, macOS/Linux use forward slashes. Manually building paths with string concatenation produces code that only works correctly on one platform. `pathlib`'s `Path` objects (and the `/` operator overload for joining) handle this automatically, producing correct paths regardless of the underlying OS — making the code portable.

**Q: What's a practical benefit of `pathlib.Path` objects beyond just building paths?**
> They provide convenient built-in methods and properties for common path operations — checking existence (`.exists()`), extracting the filename (`.name`) or extension (`.suffix`), getting the parent directory (`.parent`), and finding files matching a pattern (`.glob()`) — replacing what would otherwise require several separate `os.path` function calls or manual string manipulation.

---

## 7. Exception Handling with File Operations

### Learning Perspective
File operations are prone to various runtime failures — the file might not exist, permissions might be insufficient, the disk might be full, and so on. Wrapping file operations in `try`/`except` is standard practice:

```python
try:
    with open("data.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File does not exist.")
except PermissionError:
    print("Insufficient permissions to read this file.")
except IOError as e:
    print(f"An I/O error occurred: {e}")
```

**Common file-related exceptions:**
- **`FileNotFoundError`** — attempting to open a file in read mode (`"r"`) that doesn't exist
- **`PermissionError`** — insufficient OS-level permissions for the requested operation
- **`FileExistsError`** — attempting exclusive creation (`"x"` mode) on a file that already exists
- **`IsADirectoryError`** — attempting to open a directory as if it were a file

### Interview Perspective
**Q: What are some common exceptions you might handle when working with files, and why?**
> `FileNotFoundError` when reading a file that doesn't exist, `PermissionError` for insufficient access rights, `FileExistsError` when using exclusive creation mode on an existing file, and `IsADirectoryError` if a path unexpectedly points to a directory instead of a file. Handling these explicitly (rather than letting a generic exception crash the program) lets you respond appropriately — e.g., prompting the user, creating a default file, or logging a clear error — instead of an unhandled crash.

**Q: Does using `with` eliminate the need for `try`/`except` around file operations?**
> No — `with` guarantees the file gets closed properly regardless of what happens, but it doesn't prevent or suppress exceptions from occurring in the first place (like the file not existing to begin with). You'd typically combine both: `try`/`except` to handle expected failure scenarios gracefully, and `with` inside the `try` block to guarantee proper cleanup regardless of whether an exception occurs.

---

## 8. Working with Structured File Formats: CSV & JSON

### Learning Perspective
Beyond plain text, Python's standard library includes dedicated modules for common structured file formats:

**CSV (`csv` module):**
```python
import csv

# Reading
with open("books.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)   # each row is a list of strings

# Reading with headers as dict keys
with open("books.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["title"])   # access by column name

# Writing
with open("output.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["title", "rating"])
    writer.writerow(["Node Basics", 4.2])
```

**JSON (`json` module)** — connects directly to the `JSON.parse`/`JSON.stringify`-equivalent concepts covered elsewhere in these notes:
```python
import json

# Reading a JSON file into a Python object
with open("data.json", "r") as file:
    data = json.load(file)      # file → Python dict/list

# Writing a Python object to a JSON file
with open("output.json", "w") as file:
    json.dump(data, file, indent=2)   # Python dict/list → file, pretty-printed
```

**Note the naming distinction:** `json.load()`/`json.dump()` work directly with **file objects**, while `json.loads()`/`json.dumps()` (with an "s," for "string") work with **strings already in memory** — a common point of confusion.

### Interview Perspective
**Q: What's the difference between `json.load()` and `json.loads()`?**
> `json.load()` reads directly from a file object, parsing its contents into a Python object. `json.loads()` (with the trailing "s," for "string") parses a JSON string that's already in memory — you'd use it if you already have JSON as a string (e.g., from an API response) rather than reading it fresh from a file. The same distinction applies to `json.dump()` (writes to a file) versus `json.dumps()` (returns a JSON-formatted string).

**Q: What's the advantage of `csv.DictReader` over the plain `csv.reader`?**
> `csv.reader` returns each row as a plain list, requiring you to access columns by numeric index (which breaks if column order changes). `csv.DictReader` uses the first row as column headers automatically, letting you access each field by name (`row["title"]`) — more readable and more resilient to column reordering.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| `open()` modes | `r` read, `w` write (overwrites), `a` append, `x` exclusive create, `+` add read/write, `b` binary |
| `"w"` vs `"a"` | Truncates existing content vs. preserves it, adding only to the end |
| `with` statement | Guarantees the file closes even if an exception occurs — the idiomatic default |
| `.read()` / `.readlines()` / iteration | Whole file as a string / list of lines / memory-efficient line-by-line |
| `.write()` newlines | Not automatic — must include `\n` explicitly, unlike `print()` |
| `.tell()` / `.seek()` | Report current position / move to a specific byte offset |
| `pathlib` over string concatenation | Handles OS-specific path separators automatically — portable |
| Common file exceptions | `FileNotFoundError`, `PermissionError`, `FileExistsError`, `IsADirectoryError` |
| `json.load`/`dump` vs `loads`/`dumps` | File object vs. in-memory string |
| `csv.reader` vs `csv.DictReader` | Rows as lists (index access) vs. rows as dicts (name access via header row) |