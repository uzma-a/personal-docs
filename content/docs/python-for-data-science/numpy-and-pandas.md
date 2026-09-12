# NumPy & Pandas

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. NumPy: The Foundation

### Learning Perspective
**NumPy** ("Numerical Python") is a **fundamental library for numerical computing** in Python — it provides support for **large, multi-dimensional arrays and matrices**, along with a **variety of high-level mathematical functions** to operate on them efficiently.

**Libraries** more generally are collections of **pre-written code modules** providing reusable functions and classes, simplifying and enhancing software development — NumPy is one of the most foundational libraries in Python's data science ecosystem, underpinning many other libraries (including **Pandas**, which lists NumPy as a **dependency** — an external library another library relies on for core functionality).

**Why NumPy over plain Python lists?** NumPy arrays are stored in **contiguous memory blocks** and operations are implemented in optimized, compiled C code — making numerical operations dramatically faster than equivalent operations on plain Python lists, especially at scale.

```python
import numpy as np
```

### Interview Perspective
**Q: What is NumPy, and why is it foundational to Python's data science ecosystem?**
> NumPy is a library providing efficient, multi-dimensional array support and high-level mathematical operations for numerical computing. It's foundational because many other data science libraries — including Pandas — are built directly on top of it, relying on NumPy's array structures and optimized operations for their own core functionality.

**Q: Why are NumPy arrays generally much faster than plain Python lists for numerical work?**
> NumPy arrays store data in contiguous memory blocks with a fixed, uniform type, and NumPy's operations are implemented in optimized, compiled C code under the hood — avoiding the overhead of Python's per-element type-checking and pointer-chasing that a plain list incurs. This makes vectorized NumPy operations dramatically faster, especially as array size grows.

---

## 2. One-Dimensional & Two-Dimensional Arrays

### Learning Perspective
- **One-dimensional NumPy array** — a **linear data structure** storing elements in a **single sequence**, often used for straightforward numerical computations and data manipulation.
  ```python
  arr1d = np.array([1, 2, 3, 4, 5])
  ```
- **Two-dimensional NumPy array** — a **structured data representation** with **rows and columns**, resembling a **matrix or table**, ideal for more complex data manipulation and analysis tasks.
  ```python
  arr2d = np.array([[1, 2, 3], [4, 5, 6]])
  ```

**Shape** — in NumPy, "shape" refers to an array's **dimensions** (number of rows and columns), describing its **size and structure**.
```python
arr1d.shape   # (5,) — 5 elements, one dimension
arr2d.shape   # (2, 3) — 2 rows, 3 columns
```

**Grid** — in Python more generally, a "grid" refers to a **two-dimensional structure** composed of rows and columns, often used to represent data in tabular format or to organize objects in a coordinate system — conceptually what a 2D NumPy array (or a Pandas DataFrame) represents.

**Component** — in NumPy, a "component" typically refers to a **specific element or value** within a multi-dimensional array, accessible via **indexing**.
```python
arr2d[0, 1]   # 2 — the component at row 0, column 1
```

### Interview Perspective
**Q: What's the difference between a one-dimensional and a two-dimensional NumPy array?**
> A one-dimensional array is a single linear sequence of elements — think of a plain list of numbers. A two-dimensional array has rows and columns, structurally resembling a matrix or table — used for more complex, tabular data representations.

**Q: What does an array's `shape` tell you?**
> Its dimensions — for a 1D array, the number of elements; for a 2D array, the number of rows and columns as a tuple `(rows, columns)`. It describes the array's overall size and structure, and is commonly checked before performing operations that require compatible shapes (like matrix multiplication or broadcasting).

---

## 3. Indexing & Slicing

### Learning Perspective
**Index** — in Python broadly, a position or identifier used to access elements within a sequence or data structure (a list, string, or array).

**Slicing** in NumPy entails **extracting specific portions of an array** by specifying a **range of indices**, letting you work with **subsets of the data** without copying or manually looping.

```python
arr = np.array([10, 20, 30, 40, 50])
arr[1:4]      # array([20, 30, 40]) — elements at index 1, 2, 3

arr2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
arr2d[0:2, 1:3]   # rows 0-1, columns 1-2 — a sub-matrix
```

**Important nuance:** unlike slicing a plain Python list, slicing a NumPy array typically returns a **view** into the original array (not a copy) — modifying the sliced result can **modify the original array** too, unless you explicitly call `.copy()`.

```python
arr = np.array([1, 2, 3, 4, 5])
sub = arr[1:3]
sub[0] = 99
print(arr)   # [1, 99, 3, 4, 5] — the original array changed too!
```

### Interview Perspective
**Q: How does slicing a NumPy array differ from slicing a plain Python list, in terms of the returned object?**
> Slicing a NumPy array returns a **view** into the original array's underlying data — not an independent copy. Modifying the sliced result modifies the original array as well. Slicing a plain Python list, by contrast, always returns a new, independent list. If you need an independent copy of a NumPy slice, you must call `.copy()` explicitly.

**Q: How would you extract a sub-matrix from a 2D array using slicing?**
> Using comma-separated slice ranges for each dimension — `arr2d[row_start:row_end, col_start:col_end]` — e.g., `arr2d[0:2, 1:3]` extracts rows 0–1 and columns 1–2 as a sub-matrix.

⭐ **Frequently asked "gotcha"** — the view-vs-copy slicing behavior is one of the most commonly tested NumPy pitfalls; be ready to explain it with a concrete example.

---

## 4. Broadcasting

### Learning Perspective
**Broadcasting** in NumPy allows arrays with **different shapes** to be combined in **element-wise operations** by **automatically extending smaller arrays** to match the shape of larger ones — making operations more **flexible**, without requiring manual reshaping or explicit loops.

```python
arr = np.array([1, 2, 3])
result = arr + 10        # [11, 12, 13] — the scalar 10 is "broadcast" to match arr's shape

matrix = np.array([[1, 2, 3], [4, 5, 6]])
row = np.array([10, 20, 30])
result = matrix + row    # row is broadcast across each row of the matrix
# [[11, 22, 33], [14, 25, 36]]
```

**The core rule:** broadcasting works when, comparing shapes from the **trailing dimension backward**, dimensions are either **equal** or one of them is **1** (or missing entirely) — NumPy then conceptually "stretches" the smaller dimension to match, without actually duplicating data in memory (making it also **memory-efficient**, not just convenient).

### Interview Perspective
**Q: What is broadcasting in NumPy, and why is it useful?**
> Broadcasting lets NumPy perform element-wise operations between arrays of different (but compatible) shapes, by automatically "stretching" the smaller array to match the larger one's shape — without writing explicit loops or manually reshaping/duplicating data. It's useful because it makes vectorized operations far more concise and efficient, e.g., adding a single scalar or a 1D array directly to every row of a 2D matrix.

**Q: What determines whether two array shapes are compatible for broadcasting?**
> Comparing dimensions from the trailing (rightmost) dimension backward, each pair of dimensions must either be equal, or one of them must be 1 (or that dimension is simply absent in the smaller array) — if every dimension pair satisfies this, the arrays are broadcast-compatible; otherwise, a `ValueError` is raised for a shape mismatch.

---

## 5. Vector & Matrix Operations

### Learning Perspective
- **Vector addition** — involves **adding corresponding elements** of two or more vectors, producing a new vector containing the **sum of their components**.
  ```python
  v1 = np.array([1, 2, 3])
  v2 = np.array([4, 5, 6])
  v1 + v2   # array([5, 7, 9])
  ```
- **Hadamard Product** — a mathematical operation involving **element-wise multiplication** of two matrices or arrays of the **same shape**, producing a new matrix where each element is the **product of the corresponding elements** in the input matrices. **Not** the same as standard matrix multiplication.
  ```python
  a = np.array([[1, 2], [3, 4]])
  b = np.array([[5, 6], [7, 8]])
  a * b   # Hadamard product: [[5, 12], [21, 32]]
  a @ b   # standard matrix multiplication (different result entirely)
  ```
- **Universal Functions (ufuncs)** — functions that operate **element-wise on arrays**, providing **efficient, vectorized operations** for a wide range of mathematical and logical operations (e.g., `np.sqrt()`, `np.exp()`, `np.sin()` — all apply their operation to every element at once, without an explicit loop).
  ```python
  np.sqrt(np.array([1, 4, 9, 16]))   # [1., 2., 3., 4.]
  ```
- **`linspace`** — a NumPy function that generates an array of **evenly spaced values** within a specified range.
  ```python
  np.linspace(0, 10, 5)   # [0., 2.5, 5., 7.5, 10.] — 5 evenly spaced points from 0 to 10
  ```

### Interview Perspective
**Q: What's the difference between the Hadamard product and standard matrix multiplication in NumPy?**
> The Hadamard product (via `*`) performs element-wise multiplication — each output element is simply the product of the corresponding input elements, requiring both matrices to have the same shape. Standard matrix multiplication (via `@` or `np.matmul()`) follows the mathematical rules of matrix multiplication — row-by-column dot products — and produces a genuinely different result, with different shape-compatibility requirements (inner dimensions must match, not the full shape).

**Q: What are "universal functions" (ufuncs) in NumPy, and why do they matter for performance?**
> Functions that apply an operation element-wise across an entire array in one vectorized call (e.g., `np.sqrt()`, `np.exp()`), rather than requiring an explicit Python-level loop over each element. They matter for performance because the looping happens in optimized C code internally, avoiding Python's per-iteration overhead — this is the core reason NumPy code processing large arrays is so much faster than equivalent hand-written Python loops.

**Q: What does `np.linspace()` do, and how is it different from `np.arange()`?**
> `linspace(start, stop, num)` generates exactly `num` evenly spaced values between `start` and `stop` (inclusive by default) — you specify *how many points* you want. `arange(start, stop, step)` generates values based on a fixed *step size* instead, and the exact count of resulting values depends on that step — useful when you care about the increment size rather than the total number of points.

---

## 6. Pandas: Overview & DataFrames

### Learning Perspective
**Pandas** is a popular Python library for **data manipulation and analysis**, offering **data structures and tools** for working with **structured data** — like tables and time series. The **Pandas library** encompasses the various modules and functions providing these data structures and analysis tools.

**Importing Pandas:**
```python
import pandas as pd   # the near-universal convention: import as "pd"
```

**DataFrames** — a **two-dimensional, tabular data structure** in Pandas for storing and analyzing data, consisting of **rows and columns** — conceptually similar to a spreadsheet or a SQL table, and built directly on top of NumPy arrays internally.

```python
data = {"title": ["JS Basics", "Node Intro"], "rating": [5, 3]}
df = pd.DataFrame(data)

print(df)
#         title  rating
# 0   JS Basics       5
# 1  Node Intro       3
```

**Common DataFrame operations:**
```python
df.head()          # first 5 rows
df.shape            # (rows, columns) — same "shape" concept as NumPy
df["rating"]        # select a single column (returns a Series)
df[df["rating"] > 4]  # filter rows by condition
df.sort_values("rating")  # sort by a column
df.groupby("category").mean()  # group and aggregate
```

### Interview Perspective
**Q: What is a Pandas DataFrame, and how does it relate to NumPy?**
> A DataFrame is a two-dimensional, tabular data structure with labeled rows and columns — similar to a spreadsheet or SQL table. It's built on top of NumPy internally (each column is typically backed by a NumPy array), which is why Pandas lists NumPy as a core dependency and why many NumPy-style operations (broadcasting, vectorization) carry over naturally into Pandas.

**Q: How would you filter rows of a DataFrame based on a column's value?**
> Using boolean indexing — `df[df["column"] > value]` — the condition inside the brackets produces a boolean array (True/False per row), and Pandas returns only the rows where that condition evaluates to True.

---

## 7. Data Analysis Workflow

### Learning Perspective
**Data analysis** is the process of **inspecting, cleaning, transforming, and interpreting data** to **discover useful information**, draw conclusions, and support decision-making. Pandas is one of the primary tools used to execute this workflow in Python:

- **Inspecting** — `.head()`, `.info()`, `.describe()` to get a quick sense of the data's shape, types, and summary statistics
- **Cleaning** — handling missing values (`.dropna()`, `.fillna()`), removing duplicates (`.drop_duplicates()`), correcting data types
- **Transforming** — reshaping, filtering, grouping, merging datasets together
- **Interpreting** — aggregating and summarizing to surface patterns, trends, and insights

### Interview Perspective
**Q: Walk through the typical stages of a data analysis workflow using Pandas.**
> Start by inspecting the data to understand its shape and quality (`.head()`, `.info()`, `.describe()`), then clean it — handling missing values, removing duplicates, correcting types. From there, transform the data as needed — filtering, grouping, merging with other datasets — and finally aggregate/summarize it to interpret patterns and support a conclusion or decision.

---

## 8. File I/O: `.csv` and `.txt` Files

### Learning Perspective
- **`.csv` file** (Comma-Separated Values) — a **plain text file format** for storing **tabular data**, where each **line represents a row**, and **commas separate values** in different columns. Extremely common as the interchange format between Pandas and external data sources.
- **`.txt` file** (Text) — a common file format containing **plain text without specific formatting**, suitable for storing and editing general textual data (not necessarily tabular/structured).

**Reading and writing CSVs with Pandas** (the most common way DataFrames are loaded/saved):
```python
df = pd.read_csv("books.csv")     # load a CSV directly into a DataFrame
df.to_csv("output.csv", index=False)  # write a DataFrame back out to CSV
```

**Related general Python file concepts** (also covered in more depth in `file-handling.md`):
- **File object** — represents an **open file** in Python, allowing reading from or writing to it
- **Open function** — Python's built-in `open()`, used to access and manipulate files, letting you read from or write to a specified file
- **Append** — adding or attaching something to the **end** of an existing object — in file terms, adding data to the end of a file (mode `"a"`) without overwriting existing content
- **File attribute** — properties or **metadata** associated with files, managed at the **operating system level** (e.g., creation date, permissions, size) — distinct from a Python object's **attribute** (a property/characteristic of an object, accessed via dot notation)

### Interview Perspective
**Q: How would you load a CSV file into a Pandas DataFrame, and save one back out?**
> `pd.read_csv("filename.csv")` reads a CSV directly into a DataFrame. `df.to_csv("filename.csv", index=False)` writes a DataFrame back to a CSV file — the `index=False` argument is commonly used to avoid writing the DataFrame's row index as an extra, usually unwanted, column in the output file.

**Q: What's the difference between a Python object's "attribute" and a "file attribute"?**
> A Python object's attribute is a property or characteristic of that specific object, accessed via dot notation (e.g., `df.shape`). A file attribute refers to metadata about a file itself, managed by the operating system (creation date, permissions, size) — a different, OS-level concept from Python's object-attribute mechanism, even though both use similar terminology.

---

## 9. Visualizations & Plotting

### Learning Perspective
**Visualizations** in Python refer to the creation of **graphical representations** — charts, plots, and graphs — to **illustrate and communicate data and trends visually**. Pandas and NumPy are frequently paired with dedicated plotting libraries to turn analyzed data into visual output.

**Plotting Mathematical Functions** — using libraries like **Matplotlib** to create **graphical representations of mathematical equations**, aiding both **visualization and analysis**.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.title("Sine Wave")
plt.show()
```

**Pandas also has built-in, convenience plotting** (itself a thin wrapper around Matplotlib):
```python
df["rating"].plot(kind="hist")   # quick histogram straight from a DataFrame column
```

### Interview Perspective
**Q: Why would you use NumPy's `linspace()` when plotting a mathematical function?**
> `linspace()` generates a smooth, evenly-spaced set of x-values across a specified range — feeding that into a function (like `np.sin()`, which applies element-wise as a ufunc) produces the corresponding y-values needed to plot a smooth curve. Without evenly spaced, sufficiently dense x-values, the resulting plot would look jagged or incomplete.

**Q: What's the relationship between Pandas' built-in `.plot()` and Matplotlib?**
> Pandas' `.plot()` method is a convenience wrapper built directly on top of Matplotlib — it lets you generate common chart types (line, histogram, bar, scatter) directly from a DataFrame or Series with minimal code, while still using Matplotlib underneath, meaning you can further customize the resulting plot using standard Matplotlib functions if needed.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **.csv file** | A plain text format for tabular data — rows as lines, commas separating column values |
| **.txt file** | A plain text file format without specific formatting |
| **Append** | Adding/attaching something to the end of an existing object (a file or data structure) |
| **Attribute** | A property/characteristic of a Python object, accessed via dot notation |
| **Broadcasting** | NumPy's automatic extension of smaller arrays to match larger ones in element-wise operations |
| **Component** | A specific element/value within a multi-dimensional NumPy array, accessed via indexing |
| **Computation** | Performing numerical operations on arrays/matrices in NumPy |
| **Data analysis** | Inspecting, cleaning, transforming, and interpreting data to inform decisions |
| **DataFrames** | A two-dimensional, tabular Pandas data structure of rows and columns |
| **Dependencies** | External libraries (like NumPy) that another library (like Pandas) relies on |
| **File attribute** | OS-level metadata associated with a file |
| **File object** | Represents an open file in Python, for reading/writing |
| **Grid** | A two-dimensional structure of rows and columns |
| **Hadamard Product** | Element-wise multiplication of two same-shaped matrices/arrays |
| **Importing pandas** | `import pandas as pd` |
| **Index** | A position/identifier used to access elements within a sequence |
| **Libraries** | Collections of pre-written, reusable code modules |
| **Linspace** | A NumPy function generating evenly spaced values within a range |
| **NumPy** | A fundamental Python library for numerical computing with multi-dimensional arrays |
| **One-dimensional NumPy array** | A linear array storing elements in a single sequence |
| **Open function** | Python's `open()`, used to access/manipulate files |
| **Pandas** | A Python library for data manipulation and analysis, using structures like DataFrames |
| **Pandas library** | The modules/functions within Pandas providing data structures and analysis tools |
| **Plotting Mathematical Functions** | Using libraries like Matplotlib to graph mathematical equations |
| **Shape** | An array's dimensions (rows/columns), describing its size and structure |
| **Slicing** | Extracting a portion of an array via a range of indices |
| **Two-dimensional NumPy array** | A structured array with rows and columns, like a matrix/table |
| **Universal Functions (ufuncs)** | Functions that operate element-wise on arrays, vectorized and efficient |
| **Vector addition** | Adding corresponding elements of two or more vectors |
| **Visualizations** | Graphical representations (charts, plots, graphs) of data |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| NumPy | Foundational library for fast, multi-dimensional array-based numerical computing |
| Why NumPy is faster than lists | Contiguous memory + compiled C operations, avoiding Python-level per-element overhead |
| Array `shape` | Its dimensions — e.g., `(rows, columns)` for a 2D array |
| Slicing gotcha | NumPy slices are views (share memory with the original), not independent copies |
| Broadcasting | Auto-extends smaller arrays to match shape in element-wise ops — compatible if dims match or are 1 |
| Hadamard product vs. matrix multiplication | Element-wise (`*`) vs. true matrix multiplication (`@`) |
| Universal functions (ufuncs) | Vectorized, element-wise operations — fast, no explicit Python loop |
| `linspace` vs `arange` | Specify count of evenly spaced points vs. specify step size |
| Pandas DataFrame | 2D, tabular, labeled rows/columns — built on top of NumPy |
| Loading/saving CSV | `pd.read_csv()` / `df.to_csv(..., index=False)` |
| Pandas `.plot()` | Convenience wrapper around Matplotlib for quick charts directly from a DataFrame |