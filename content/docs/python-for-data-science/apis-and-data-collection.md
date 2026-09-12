# APIs & Web Scraping in Python

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. What Is an API? (Python Context)

### Learning Perspective
**Simple APIs** in Python are application programming interfaces that provide **straightforward, easy-to-use methods** for interacting with services, libraries, or data — often with **minimal configuration or complexity**. Fundamentally, an **API lets two pieces of software talk to each other**.

**Using an API library in Python** typically involves three steps:
1. **Importing the library** (e.g., `requests`)
2. **Calling its functions/methods** to make HTTP requests
3. **Parsing the responses** to access the data or service the API provides

Even Pandas can be thought of through this lens — the **Pandas API processes data by communicating with other software components** (e.g., reading from a CSV, a database, or the results of a web request), exposing that data through its own consistent interface (like DataFrames).

### Interview Perspective
**Q: What does it mean to "use an API" in a Python script, at a high level?**
> Typically: import a library that handles the HTTP communication (like `requests`), call its functions to send a request to the API's server, and then parse the response (often JSON) to extract the actual data or trigger the actual operation the API provides — all without needing to know how the API's underlying service is implemented internally.

---

## 2. HTTP Fundamentals

### Learning Perspective
**HTTP (HyperText Transfer Protocol)** transfers data — including web pages and resources — between a **client** (e.g., a web browser, or a Python script) and a **server** on the World Wide Web. HTTP is the protocol commonly used to implement **REST APIs**.

**REST APIs** let you communicate through the internet, taking advantage of remote resources — storage, additional data, AI algorithms/services, and more — without needing that capability to exist locally.

**HTTP methods** transmit data over the internet, and correspond to different types of operations:

| Method | Purpose |
|---|---|
| **GET** | Requests/reads information from the server — one of the most commonly used methods |
| **POST** | Submits data **to** the server (e.g., creating a new resource) |
| **PUT** | Updates data **already on** the server |
| **DELETE** | Deletes data from the server |

**HTTP messages:**
- A request typically includes a **JSON file/body** with instructions for the operation being requested
- The server returns an HTTP **response**, also often containing a **JSON file**, back to the client
- A **response** contains a **version** and a **body**, and includes information like the **type of resource**, its **length**, and so on (typically communicated via **HTTP headers**)

### Interview Perspective
**Q: What's the relationship between HTTP and REST APIs?**
> HTTP is the underlying protocol that transfers data between clients and servers. REST is an architectural style built *on top of* HTTP — REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs, making HTTP the practical transport mechanism most REST APIs are implemented with.

**Q: Map the four core HTTP methods to what they do.**
> GET reads/retrieves data, POST submits new data to be created, PUT updates existing data on the server, and DELETE removes data from the server.

---

## 3. URLs

### Learning Perspective
A **Uniform Resource Locator (URL)** is the most popular way to **find resources on the web**. A URL is divided into **three parts**:

1. **Scheme** — the protocol being used (e.g., `https://`)
2. **Internet address / base URL** — the domain/host (e.g., `api.example.com`)
3. **Route** — the specific path to the resource on that host (e.g., `/data`)

```
https://api.example.com/data
└─scheme┘└──base URL───┘└route┘
```

**Query strings** let you pass additional parameters as part of a URL, letting you **obtain multiple pieces of information** in a single request — like a name, an ID, or various filtering options — appended after a `?`, and you can effectively **modify the results of your GET request** by including them.

```
https://api.example.com/data?page=1&per_page=10
```

### Interview Perspective
**Q: What are the three components of a URL?**
> Scheme (the protocol, like `https://`), the base URL/internet address (the domain/host), and the route (the specific path to the resource on that host).

**Q: What's the purpose of a query string, and how does it modify a GET request?**
> It appends additional parameters to a URL (after a `?`, with `key=value` pairs joined by `&`), letting you filter, paginate, or otherwise customize what a GET request returns — e.g., requesting a specific page of results — without needing a different endpoint for every possible variation of the request.

---

## 4. The `requests` Library

### Learning Perspective
**Requests** is a Python library that allows you to **send HTTP/1.1 requests easily** — the de facto standard for making HTTP calls from Python (far more ergonomic than using lower-level built-in modules directly).

```python
import requests
```

**Making a GET request:**
```python
response = requests.get("https://api.example.com/data")
```

**Making a GET request with query parameters:**
```python
base_url = "https://api.example.com/data"
params = {"page": 1, "per_page": 10}
response = requests.get(base_url, params=params)
```

**Making a GET request with headers** (headers include custom, additional information for the server — e.g., authentication tokens or content types):
```python
base_url = "https://api.example.com/data"
headers = {"Authorization": "Bearer YOUR_TOKEN"}
response = requests.get(base_url, headers=headers)
```

**Making POST, PUT, and DELETE requests:**
```python
# POST — create/submit data
response = requests.post("https://api.example.com/submit", data={"key": "value"})

# PUT — update existing data (typically sent as JSON)
response = requests.put("https://api.example.com/update", data={"key": "value"})

# DELETE — remove a resource
response = requests.delete("https://api.example.com/delete")
```

**Working with the response:**
```python
response = requests.get("https://api.example.com/data")

response.status_code   # check the HTTP status code (200, 404, 500, etc.)
data = response.json()  # parses JSON data from the response into a Python dict/list
```

**`.json()`** specifically **parses JSON data from the response**, extracting and working with the data returned by the API — converting the raw JSON response into a usable Python data structure, typically a **dictionary or list**.

### Interview Perspective
**Q: How would you make a GET request with query parameters using the `requests` library?**
> `requests.get(url, params={"key": "value"})` — passing a dictionary via the `params` argument automatically builds and appends the correct query string to the URL, rather than manually formatting it into the URL string yourself.

**Q: What does `response.json()` do, and what does it typically return?**
> It parses the response body (assuming it's JSON-formatted) into a native Python data structure — usually a dictionary or a list, depending on the shape of the returned JSON — so you can work with the data directly using normal Python syntax instead of manually parsing a raw JSON string.

**Q: Why would you check `response.status_code` before processing a response's data?**
> To confirm the request actually succeeded before assuming the response body contains valid, expected data — a non-2xx status code (like 404 or 500) indicates a failure, and blindly calling `.json()` on an error response could raise an exception or return unexpected/error-formatted data instead of the data you were expecting.

⭐ **Very frequently asked** — be ready to write GET/POST examples with `requests` from memory, including query parameters and headers.

---

## 5. Web Scraping Fundamentals

### Learning Perspective
**Web scraping** in Python involves **extracting and parsing data from websites** to gather information for various applications, commonly using libraries like **Beautiful Soup** and **requests** together.

**Why scraping is sometimes necessary:** not every website offers a formal API — scraping lets you programmatically extract data directly from a page's HTML when no structured API access is available.

**A basic understanding of HTML is essential for scraping:**
- **HTML** comprises text surrounded by elements enclosed in angular brackets, called **tags**
- Each **HTML document is like a tree** — an **"HTML Tree"** — which may contain strings and other nested tags
- Web pages may also contain **CSS** and **JavaScript** alongside HTML elements (scraping generally targets the raw HTML structure, not JS-rendered dynamic content, unless additional tooling like a headless browser is used)
- You can **select/inspect an HTML element** on a web page using browser developer tools, to identify exactly what tags/attributes/structure you need to target when scraping

**HTML tables specifically** are comprised of **table tags**, structured with elements such as **rows, headers, and body** — a common target for scraping tabular data.

### Interview Perspective
**Q: What is web scraping, and when might it be necessary instead of using an API?**
> Web scraping is programmatically extracting and parsing data directly from a website's HTML. It's necessary when a website doesn't offer a formal, structured API for the data you need — you're working directly with the page's rendered (or raw) HTML structure instead of a clean, documented data interface.

**Q: Why is understanding HTML structure important before writing a scraper?**
> Because scraping relies on identifying and targeting specific HTML tags, attributes, and the document's tree structure to extract the desired data reliably — without understanding how the target page is structured (e.g., inspecting it via browser dev tools first), you can't write selectors/filters that accurately and robustly locate the data you're after.

---

## 6. Beautiful Soup

### Learning Perspective
**Beautiful Soup** is a Python library for **parsing and navigating HTML and XML documents**, making it much more accessible to **extract and manipulate data** from web pages than working with raw HTML strings directly.

**Parsing a document:**
```python
from bs4 import BeautifulSoup

html = "..." # raw HTML content, e.g., from response.text
soup = BeautifulSoup(html, "html.parser")
```

To parse a document, you pass it through the **Beautiful Soup constructor** to get a **BeautifulSoup object**, representing the document as a **nested data structure** — Beautiful Soup represents HTML as a set of **tree-like objects**, with methods to navigate and parse that tree.

**Navigable String** — behaves like a Python string, but supports Beautiful Soup's additional functionality (e.g., navigating to parent/sibling elements from a piece of text itself).

### Interview Perspective
**Q: What does Beautiful Soup do, and why is it preferred over manually parsing raw HTML strings?**
> It parses raw HTML/XML into a structured, tree-like object model, giving you convenient, purpose-built methods to search, filter, and navigate that structure (by tag, attribute, text content, position in the tree, etc.) — far more robust and readable than trying to manually parse or regex-match raw HTML text, which is fragile and error-prone given HTML's flexible, often inconsistent formatting.

---

## 7. Finding Elements: `find()`, `find_all()`, `select()`

### Learning Perspective
**`find_all()`** — a method used to extract content based on the **tag's name**, its **attributes**, the **text of a string**, or some **combination of these**. It looks through a tag's **descendants** and retrieves **all** descendants matching the given filters. The result is a **Python iterable**, like a list.

```python
all_links = soup.find_all("a", {"class": "link"})
```

**`find()`** — finds the **first** matching HTML element (same filtering logic as `find_all()`, but returns a single element, not a list).
```python
first_link = soup.find("a", {"class": "link"})
```

**Common HTML tags used with `find`/`find_all`:**
| Tag | Finds |
|---|---|
| `a` | Anchor (link) tags |
| `p` | Paragraph tags |
| `h1`–`h6` | Heading tags, level 1 through 6 |
| `table` | Table tags |
| `tr` | Table row tags |
| `td` | Table cell (data) tags |
| `th` | Table header cell tags |
| `img` | Image tags |
| `form` | Form tags |
| `button` | Button tags |

**`select()`** — selects HTML elements using a **CSS selector**, offering a more flexible/familiar syntax for anyone who's worked with CSS.
```python
titles = soup.select("h1")   # all <h1> elements
```

### Interview Perspective
**Q: What's the difference between `find()` and `find_all()`?**
> `find()` returns the *first* matching element (or `None` if nothing matches). `find_all()` returns *all* matching elements as an iterable (list-like) collection, letting you loop over every match rather than just the first one.

**Q: How would you find all links on a page with a specific CSS class using Beautiful Soup?**
> `soup.find_all("a", {"class": "link"})` — passing the tag name and a dictionary of attribute filters, or equivalently `soup.select("a.link")` using CSS-selector syntax via `.select()`.

**Q: What does `find_all()` actually search through — just the immediate children of an element, or more?**
> It looks through a tag's *descendants* — not just direct children, but all nested elements at any depth beneath the starting point — retrieving every element anywhere in that subtree that matches the given filters.

---

## 8. Navigating the Parsed Tree

### Learning Perspective
Beyond searching by tag/attribute, Beautiful Soup lets you navigate the parsed HTML tree relationally, similar to navigating the DOM:

- **`.parent`** — accesses the **parent element** in the document tree
  ```python
  parent_div = paragraph.parent
  ```
- **`.find_next_sibling()`** — finds the **next sibling element** in the tree (an element at the same nesting level, appearing after the current one)
  ```python
  next_sibling = current_element.find_next_sibling()
  ```
- **`.findChildren()`** — finds **all child elements** of a given element
  ```python
  child_elements = parent_div.findChildren()
  ```
- **Accessing an element's attribute value** — treating the element somewhat like a dictionary, using the attribute name as the key
  ```python
  href = link_element["href"]
  ```
- **`.text`** — retrieves the **text content** of an HTML element (stripped of the surrounding tags)
  ```python
  text = element.text
  ```

### Interview Perspective
**Q: How would you extract the URL from an anchor (`<a>`) tag once you've located it with Beautiful Soup?**
> Access it like a dictionary key on the element: `link_element["href"]` — Beautiful Soup lets you retrieve any HTML attribute's value this way, treating the parsed element similarly to a dict for attribute access.

**Q: What's the difference between `.text` and accessing an attribute like `["href"]`?**
> `.text` retrieves the visible, human-readable text content *inside* the tag (with the surrounding markup stripped away). Accessing `["attribute_name"]` retrieves the value of a specific HTML *attribute* on the tag itself (like `href`, `src`, or `class`) — two different pieces of information the tag can carry.

---

## 9. Extracting Tabular Data with Pandas

### Learning Perspective
Since HTML tables are a common scraping target, Pandas offers a dedicated shortcut: **tabular data can be extracted directly from web pages using the `read_html` method in Pandas** — bypassing the need to manually parse `<table>`, `<tr>`, and `<td>` tags with Beautiful Soup for straightforward tabular data.

```python
import pandas as pd

tables = pd.read_html("https://example.com/page-with-a-table")
df = tables[0]   # read_html returns a LIST of DataFrames — one per <table> found on the page
```

### Interview Perspective
**Q: When would you use `pd.read_html()` instead of manually scraping a table with Beautiful Soup?**
> When the data you need is already in a well-formed HTML `<table>` — `read_html()` automatically parses every table on a page directly into a list of DataFrames, saving you from manually locating and looping through `<tr>`/`<td>` elements yourself. It's the more efficient choice specifically for genuinely tabular HTML content; Beautiful Soup remains necessary for more complex, non-tabular scraping tasks.

**Q: What does `pd.read_html()` return, and why?**
> A *list* of DataFrames — one for each `<table>` element found on the page — since a single page can contain multiple tables, and Pandas has no way of knowing in advance which one you actually want, so it returns all of them for you to select from by index.

---

## 10. File Formats & Parsing

### Learning Perspective
**File formats** refer to the **specific structure and encoding rules** used to store and represent data in files — e.g., `.txt` for plain text, `.csv` for comma-separated values. Python works with a wide range of formats: **CSV, XML, JSON, xlsx**, and more.

**The file extension** tells you what type of file it is, and hints at what tool/method it needs to be opened/parsed with.

**Common parsing approaches by format:**
- **CSV** — accessed via libraries like **Pandas** (`pd.read_csv()`)
- **JSON** — parsed via Python's built-in `json` module, or automatically via `response.json()` when working with API responses directly
- **XML** — parsed with dedicated libraries (e.g., `xml.etree.ElementTree`, or `xml2js`-equivalent tools)
- **Excel (.xlsx)** — accessed via Pandas as well (`pd.read_excel()`)

### Interview Perspective
**Q: How does the file extension relate to how you'd process a file in Python?**
> The extension signals the file's format/encoding rules, which in turn determines which library/method is appropriate to parse it correctly — e.g., `.csv` files are typically read with `pd.read_csv()`, `.json` files with the `json` module (or `.json()` on an HTTP response), and `.xlsx` files with `pd.read_excel()`. Using the wrong parser for a given format will fail or produce garbled results.

---

## 11. Time Series Data & Plotting (Applied Example)

### Learning Perspective
Combining APIs, Pandas, and visualization is common in applied data work — a representative example is **financial time series data**:

- **Dealing with time series data** involves using **Pandas' time series functionality** (e.g., `pd.to_datetime()`, date-indexed DataFrames, resampling methods)
- A common applied workflow: **get data for daily candlesticks** (via an API), then **plot the chart using Plotly** with a **candlestick plot** — a specialized chart type showing open/high/low/close price movement over time, common in financial data visualization

```python
import plotly.graph_objects as go

fig = go.Figure(data=[go.Candlestick(
    x=df['date'],
    open=df['open'], high=df['high'],
    low=df['low'], close=df['close']
)])
fig.show()
```

### Interview Perspective
**Q: What does a typical end-to-end workflow look like for pulling and visualizing time series data from an API?**
> Fetch the raw data via a GET request using `requests` (or a dedicated API client library), parse the JSON response into a Pandas DataFrame, convert the relevant column into proper datetime objects (`pd.to_datetime()`), then feed the structured data into a plotting library like Plotly — e.g., building a candlestick chart from open/high/low/close columns to visualize price movement over time.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| API | Lets two pieces of software communicate — import, call, parse the response |
| REST + HTTP | REST APIs are typically implemented over HTTP, using GET/POST/PUT/DELETE |
| URL structure | Scheme + base URL/internet address + route |
| Query string | `?key=value&...` — filters/customizes a GET request |
| `requests` library | `requests.get/post/put/delete(url, params=, headers=, data=)` |
| `response.json()` | Parses the response body into a Python dict/list |
| `response.status_code` | Check before processing — confirms success vs. failure |
| Web scraping | Extracting data directly from HTML when no API is available |
| Beautiful Soup | Parses HTML/XML into a navigable, tree-like object |
| `find()` vs `find_all()` | First match vs. all matches (as an iterable) |
| `.select()` | Finds elements using CSS selector syntax |
| `.parent` / `.find_next_sibling()` / `.findChildren()` | Tree navigation relative to an element |
| Extracting an attribute | `element["href"]` — dict-style access |
| `.text` | Visible text content of an element, tags stripped |
| `pd.read_html()` | Extracts all `<table>` elements on a page as a list of DataFrames |
| File format → parser | `.csv` → Pandas, `.json` → `json` module/`.json()`, `.xlsx` → `pd.read_excel()` |