# Web Apps Using Flask

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Libraries vs. Frameworks

### Learning Perspective
**Python libraries** are like **toolkits** — each library has **specific tools** to simplify and expedite certain programming tasks. You choose which library functions to call, when, and how they fit into *your* program's structure.

**Frameworks** are **predefined structures for application development** — rather than you calling into the framework, the framework calls into your code at the appropriate points, providing the overall skeleton your application is built around.

**The core distinction:**
> A **framework** enables you to build the **complete application** — it dictates the structure. A **library** aids with **specific functionality** — you control the structure and pull in the library where needed.

This is sometimes summarized as **"inversion of control"**: with a library, *you* call it; with a framework, *it* calls you (your code fills in specific pieces the framework expects, like route handlers).

### Interview Perspective
**Q: What's the fundamental difference between a library and a framework?**
> A library provides specific, reusable tools you call into as needed, while your code retains overall control of the program's structure and flow. A framework provides the overall structure/skeleton of the application itself — you build your code to fit into the framework's expected shape, and the framework calls your code at the appropriate points, rather than the other way around. This inversion of control is the key distinguishing factor.

**Q: Is Flask a library or a framework, and why does that distinction matter?**
> Flask is a framework — specifically a "microframework" (see Section 2). It provides the structural skeleton for building a complete web application (routing, request/response handling, the app's overall run loop), rather than being a standalone tool you'd call from an otherwise self-directed script. Understanding this distinction clarifies why you build *within* Flask's conventions (defining routes, registering handlers) rather than just importing functions and calling them freely, as you would with a typical library.

---

## 2. Flask: A Microframework

### Learning Perspective
**Flask** is a **microframework** that ships with **minimal dependencies** — it provides just the essential building blocks for web development, rather than a large, all-encompassing toolkit.

**Flask's core built-in features** for building websites include:
- **A debugging server** — a built-in development server with helpful error output and auto-reload during development
- **Routing** — mapping URLs to the Python functions that should handle them
- **Templates** — rendering dynamic HTML (via the **Jinja2** templating engine)
- **Error handling** — mechanisms for responding to and customizing error scenarios

**Installing Flask:** Flask can be installed as a standard Python package, via `pip`:
```bash
pip install Flask
```

**Flask vs. Django:** **Django is a full-stack framework** compared to Flask. Django ships with far more built-in functionality out of the box — an ORM, admin panel, authentication system, and more — following a more opinionated, "batteries-included" philosophy. Flask, by contrast, deliberately stays minimal, letting developers choose and plug in only the specific additional pieces (database libraries, authentication tools, etc.) their particular project actually needs.

### Interview Perspective
**Q: What does it mean that Flask is a "microframework"?**
> It means Flask ships with a deliberately minimal core — just the essentials for building a web app (routing, request/response handling, templating, a dev server) — rather than a large, comprehensive, all-in-one toolkit. It's not "micro" in terms of what kind of applications you can build with it, but in terms of how much functionality is included by default; you add exactly what you need via extensions/other libraries.

**Q: How does Flask compare to Django?**
> Django is a full-stack, "batteries-included" framework — it ships with an ORM, admin interface, authentication, and much more built in by default, following strong conventions. Flask is minimal and unopinionated by comparison — it gives you the core web-framework essentials and lets you choose your own additional pieces (database layer, auth, etc.), offering more flexibility but requiring more manual setup for features Django provides out of the box.

**Q: How do you install Flask, and what does that installation give you?**
> `pip install Flask` — it's installed like any standard Python package. This gives you the `Flask` class and its associated modules for building routes, handling requests/responses, rendering templates, and running a development server.

---

## 3. Creating a Basic Flask Application

### Learning Perspective
**You can create a server by instantiating the `Flask` class.** The basic structure to create a web application using Flask follows three steps:

1. **Import Flask**
2. **Instantiate Flask**
3. **Run the app**

```python
from flask import Flask   # 1. Import Flask

app = Flask(__name__)     # 2. Instantiate Flask

@app.route("/")
def home():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)   # 3. Run the app
```

**Key pieces:**
- **`Flask(__name__)`** — `__name__` tells Flask the name of the current module, which it uses to determine paths for things like templates and static files relative to your application
- **`@app.route("/")`** — a **decorator** that registers the function below it as the handler for requests to the `"/"` URL — this is how routing is defined in Flask
- **`app.run(debug=True)`** — starts the built-in development server; `debug=True` enables the debugging server, giving detailed error pages and automatic reloading when code changes

### Interview Perspective
**Q: Walk through the minimal steps to create and run a Flask application.**
> Import the `Flask` class, instantiate it (typically `app = Flask(__name__)`), define route handlers using the `@app.route()` decorator, and call `app.run()` to start the development server — commonly guarded with `if __name__ == "__main__":` so the server only starts when the script is run directly, not when imported as a module elsewhere.

**Q: What does passing `__name__` into `Flask(__name__)` actually do?**
> It tells Flask the name of the current module, which Flask uses internally to determine the correct root path for locating resources like templates and static files relative to the application's location — important for Flask to correctly resolve relative paths regardless of how/where the app is actually run from.

---

## 4. Request & Response Objects

### Learning Perspective
Flask provides a **Request** object and a **Response** object for **each client call** — representing the incoming HTTP request and the outgoing HTTP response, respectively.

**The Request object:**
- Gives you access to **additional information** about the incoming request, like **headers**
- Can be **parsed** to extract:
  - **Query parameters** — via `request.args`
  - **Body/form data** — via `request.form` (form submissions) or `request.get_json()` (JSON payloads)
  - **Other arguments** — such as uploaded files (`request.files`), or route-embedded values (see Section 5)

```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/search")
def search():
    query = request.args.get("q")          # query parameter, e.g., /search?q=books
    auth_header = request.headers.get("Authorization")  # a specific header
    return f"Searching for: {query}"

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()               # parse a JSON request body
    return f"Received: {data}"
```

**The Response object:**
- You can **set the status code** on a Response object **before sending it back** to the client, giving explicit control over what HTTP status accompanies your response (see Section 6)

```python
from flask import make_response

@app.route("/custom")
def custom():
    response = make_response("Custom response")
    response.status_code = 201
    response.headers["X-Custom-Header"] = "value"
    return response
```

### Interview Perspective
**Q: How would you access a query parameter and a JSON body in a Flask route handler?**
> Query parameters via `request.args.get("param_name")`, and a JSON request body via `request.get_json()` — Flask's global `request` object (imported from the `flask` package) represents the current incoming request within any route handler, giving access to headers, query args, form data, and JSON payloads through dedicated attributes/methods.

**Q: How would you explicitly set a custom status code on a Flask response?**
> Using `make_response()` to construct a Response object, then setting `.status_code` on it directly before returning it — or more simply, returning a tuple of `(body, status_code)` directly from the route handler, which Flask automatically converts into a properly-coded response.

---

## 5. Dynamic Routes & RESTful Endpoints

### Learning Perspective
**Dynamic routes** let you embed **variable segments** directly in a URL path, letting a single route handler respond to many different specific URLs — the foundation for building **RESTful endpoints**.

```python
@app.route("/users/<int:user_id>")
def get_user(user_id):
    return f"User ID is {user_id}"
```

Visiting `/users/123` calls `get_user(123)` — Flask extracts the `123` from the URL, converts it to the specified type (`int`), and passes it directly as an argument to the handler function.

**Common type converters** for dynamic route segments: `<string:...>` (default), `<int:...>`, `<float:...>`, `<path:...>` (allows slashes within the segment).

**Building out a RESTful resource with multiple dynamic routes:**
```python
@app.route("/books", methods=["GET"])
def list_books():
    return "All books"

@app.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    return f"Book {book_id}"

@app.route("/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    return f"Updated book {book_id}"

@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    return f"Deleted book {book_id}"
```

### Interview Perspective
**Q: What is a dynamic route in Flask, and how does it relate to building RESTful endpoints?**
> A dynamic route embeds a variable segment directly in the URL pattern (e.g., `/users/<int:user_id>`), letting one route handler serve requests for many specific resources, with Flask automatically extracting and passing that segment's value into the handler function. This directly enables REST-style endpoints, where a resource is identified by its URL (e.g., `/books/<id>`) and the specific operation is determined by the HTTP method used on that same URL pattern.

**Q: What does specifying a type converter like `<int:user_id>` actually do, versus just `<user_id>`?**
> It tells Flask to both validate and convert the URL segment to that specific type before passing it to the handler — `<int:user_id>` only matches numeric segments and hands the handler an actual Python `int`, rather than a raw string. Using a plain `<user_id>` (equivalent to `<string:user_id>`) matches any string, giving you a raw `str` regardless of its content, requiring you to handle any needed validation/conversion manually.

---

## 6. HTTP Status Codes in Flask

### Learning Perspective
There are **multiple classes** of HTTP status codes, broadly grouped by their leading digit:

| Class | Range | Meaning |
|---|---|---|
| **2xx** | 200–299 | **Success** |
| **3xx** | 300–399 | Redirection |
| **4xx** | 400–499 | **User/client error** (e.g., bad request, not found) |
| **5xx** | 500–599 | **Server error** |

**Flask's default behavior:** Flask **implicitly returns a success code of 200** along with the response, if you don't specify one — simply returning a string from a route handler is enough to produce a working `200 OK` response.

**You can also provide status codes explicitly**, when a different code is appropriate:
```python
@app.route("/create", methods=["POST"])
def create():
    # ... creation logic ...
    return "Created successfully", 201   # explicit status code, as a tuple

@app.route("/missing")
def missing():
    return "Not found", 404
```

**Application-level error handlers:** Flask also provides a way to define **custom handlers for specific error scenarios**, applied across the whole application, rather than handling errors individually in every single route:
```python
@app.errorhandler(404)
def not_found(error):
    return "Custom 404 page — resource not found", 404

@app.errorhandler(500)
def server_error(error):
    return "Something went wrong on our end", 500
```

### Interview Perspective
**Q: What status code does Flask return by default, and how would you override it?**
> Flask implicitly returns `200 OK` if you don't specify anything else — just returning a string is enough. To override it, return a tuple of `(response_body, status_code)` from the route handler, e.g., `return "Created", 201`.

**Q: What's the purpose of `@app.errorhandler()`, and why use it instead of handling errors individually in each route?**
> It defines a centralized handler for a specific error code (or exception type) across the *entire* application — e.g., a custom 404 page — rather than needing to duplicate that same error-handling logic inside every individual route function. It keeps error-handling logic DRY and consistent across the whole app.

---

## 7. Templates (Static & Dynamic Rendering)

### Learning Perspective
Flask supports rendering both **static** and **dynamic templates** — using the built-in **Jinja2** templating engine to generate HTML dynamically, inserting data computed in your Python code directly into the rendered page.

**Static assets** (CSS, JS, images) are typically placed in a `static/` folder, and served automatically by Flask at a `/static/...` URL path.

**Dynamic templates** are placed in a `templates/` folder, and rendered using `render_template()`:

```
myapp/
├── app.py
├── static/
│   └── style.css
└── templates/
    └── index.html
```

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="My Site", books=["JS Basics", "Node Intro"])
```

```html
<!-- templates/index.html -->
<!DOCTYPE html>
<html>
<head><title>{{ title }}</title></head>
<body>
  <h1>Book List</h1>
  <ul>
    {% for book in books %}
      <li>{{ book }}</li>
    {% endfor %}
  </ul>
</body>
</html>
```

**Jinja2 syntax basics:**
- **`{{ variable }}`** — inserts a Python value directly into the HTML
- **`{% ... %}`** — control structures, like `{% for %}` loops and `{% if %}` conditionals

### Interview Perspective
**Q: How does Flask render dynamic HTML content, and what templating engine does it use?**
> Flask uses `render_template()` to render an HTML file from the `templates/` folder, passing in Python variables as keyword arguments — the templating engine (Jinja2) then substitutes those values into the template using `{{ variable }}` syntax, and supports control structures like `{% for %}` loops and `{% if %}` conditionals directly within the HTML.

**Q: Where do static assets like CSS and images typically live in a Flask project, and how are they served?**
> Conventionally in a `static/` folder at the project root — Flask automatically serves anything in that folder at the `/static/...` URL path, without needing to manually define a route for each static file.

---

## 8. Flask & CRUD

### Learning Perspective
**Flask is a microframework for creating web applications and supports CRUD** — mapping naturally onto REST's HTTP-method-based operations (as covered in `express-framework.md`'s REST section, applying identically here):

| HTTP Method | CRUD Operation |
|---|---|
| **GET** | Read |
| **POST** | Create |
| **PUT** (or PATCH) | Update |
| **DELETE** | Delete |

A complete CRUD-supporting Flask resource combines everything covered above — dynamic routes, request parsing, explicit status codes, and templating (or JSON responses for an API) — into a cohesive set of endpoints for a given resource.

```python
books = {}

@app.route("/books", methods=["GET"])
def list_books():
    return books, 200

@app.route("/books/<int:book_id>", methods=["POST"])
def create_book(book_id):
    data = request.get_json()
    books[book_id] = data
    return data, 201

@app.route("/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()
    books[book_id] = data
    return data, 200

@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    books.pop(book_id, None)
    return "", 204
```

### Interview Perspective
**Q: How would you structure a full set of CRUD endpoints for a "books" resource in Flask?**
> Define routes on the same base path (`/books` and `/books/<int:book_id>`), differentiated by HTTP method: GET for listing/reading, POST for creating, PUT for updating, and DELETE for removing — each handler parsing `request` data as needed and returning an appropriate response body and status code (e.g., 201 for successful creation, 204 for a successful delete with no content to return).

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Library vs. framework | You call a library; a framework calls you (inversion of control) |
| Flask | A minimal "microframework" — routing, templates, request/response handling, dev server |
| Flask vs. Django | Minimal/flexible vs. full-stack/batteries-included |
| Creating a Flask app | Import Flask → `Flask(__name__)` → define routes → `app.run()` |
| `request` object | Access headers, query params (`.args`), body (`.get_json()`/`.form`) |
| Setting a response status | Return `(body, status_code)`, or use `make_response()` |
| Dynamic routes | `<int:id>` etc. — embed and type-convert URL segments into handler arguments |
| Default Flask status code | 200, unless explicitly overridden |
| `@app.errorhandler()` | Centralized, app-wide handling for a specific error code |
| Templates | `render_template()` + Jinja2 (`{{ }}` for values, `{% %}` for control structures) |
| Static files | Served automatically from the `static/` folder at `/static/...` |
| CRUD in Flask | GET=Read, POST=Create, PUT=Update, DELETE=Delete |