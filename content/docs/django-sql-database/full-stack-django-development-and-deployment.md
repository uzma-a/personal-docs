# Full-Stack Django Development & Deployment

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Django Project Structure & the MVT Pattern

### Learning Perspective
Django follows the **MVT (Model-View-Template)** pattern — a variation on the classic MVC pattern (covered in `express-framework.md`), with slightly different terminology and responsibility split:

| MVT term | Roughly equivalent to (MVC) | Responsibility |
|---|---|---|
| **Model** | Model | Defines data structure, interacts with the database (covered in depth in `orm.md`) |
| **View** | Controller | Contains the logic that processes a request and decides what data/response to return |
| **Template** | View | Handles presentation — the HTML rendering layer |

**Why the naming differs from MVC:** in Django, the framework itself acts as the "controller" — routing requests and invoking the right view function automatically — so what other frameworks call a "controller," Django calls a "view" (since it's the piece deciding what to display), and what other frameworks call a "view" (the presentation layer), Django calls a "template," to avoid the terminology clash.

**Typical project layout** (created via `django-admin startproject` and `python manage.py startapp`):
```
myproject/
├── manage.py                 # command-line utility for admin tasks
├── myproject/                 # project-level configuration
│   ├── settings.py            # all project settings
│   ├── urls.py                 # root URL configuration
│   ├── wsgi.py                  # WSGI entry point (for deployment)
│   └── asgi.py                  # ASGI entry point (for async/deployment)
└── myapp/                      # an individual Django "app"
    ├── models.py                # data models
    ├── views.py                 # view functions/classes
    ├── urls.py                   # app-specific URL routes
    ├── admin.py                  # admin panel registration
    ├── apps.py                    # app configuration
    ├── migrations/                 # generated migration files
    └── templates/                  # HTML templates for this app
```

**Project vs. app** — an important Django-specific distinction: a **project** is the overall Django installation/configuration; an **app** is a self-contained module of functionality (e.g., a "blog" app, a "users" app) that can, in principle, be reused across different projects. A single project typically contains multiple apps.

### Interview Perspective
**Q: What does MVT stand for in Django, and how does it map to the more familiar MVC pattern?**
> Model-View-Template. Model matches MVC's Model directly. Django's "View" is roughly MVC's Controller — it contains the request-handling logic. Django's "Template" is roughly MVC's View — the presentation/HTML layer. The naming differs because Django itself handles routing/dispatching (what MVC usually calls the controller's job at a framework level), so Django reserves "view" for the request-handling logic instead.

**Q: What's the difference between a Django "project" and a Django "app"?**
> A project is the overall Django installation — its configuration, settings, and root URL routing. An app is a self-contained, ideally reusable module of specific functionality (e.g., a blog, a user-auth system) that lives within a project. A single project commonly contains several apps working together.

---

## 2. Views

### Learning Perspective
A **view** is a Python function (or class) that takes a web request and returns a web response — the core request-handling logic in Django.

**Function-Based Views (FBVs):**
```python
from django.http import HttpResponse
from django.shortcuts import render

def book_list(request):
    books = Book.objects.all()
    return render(request, "books/list.html", {"books": books})
```

**Class-Based Views (CBVs)** — an alternative, more structured approach for common patterns, built on Django's generic view classes:
```python
from django.views.generic import ListView

class BookListView(ListView):
    model = Book
    template_name = "books/list.html"
    context_object_name = "books"
```

**Common generic CBVs:** `ListView` (display a list), `DetailView` (display a single object), `CreateView`/`UpdateView`/`DeleteView` (handle CRUD forms automatically) — these encapsulate common, repetitive view patterns so you don't have to hand-write the same boilerplate logic for every model.

### Interview Perspective
**Q: What's the difference between function-based views and class-based views in Django, and when might you choose one over the other?**
> Function-based views are plain Python functions — simple, explicit, and easy to follow line-by-line, well-suited for custom or one-off logic. Class-based views use Django's class-based structure (often extending generic views like `ListView` or `DetailView`) to eliminate repetitive boilerplate for common CRUD-style patterns, at the cost of being somewhat less explicit/more "magic" — you need to know the parent class's conventions to fully understand what's happening. FBVs are often preferred for highly custom logic; CBVs for standard CRUD-style views where the generic classes already do most of the work.

**Q: What does `render()` do in a Django view?**
> It combines a template file with a context dictionary (data to inject into the template) and returns a fully rendered `HttpResponse` — effectively a shortcut combining template loading, rendering, and response construction into one call.

---

## 3. URL Routing

### Learning Perspective
Django's URL routing maps incoming request paths to specific views, defined in `urls.py` files — typically a **root** `urls.py` at the project level, which commonly **includes** app-specific `urls.py` files, keeping routing modular.

```python
# myproject/urls.py (root)
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("books/", include("myapp.urls")),   # delegate /books/* routes to the app's urls.py
]
```

```python
# myapp/urls.py (app-level)
from django.urls import path
from . import views

urlpatterns = [
    path("", views.book_list, name="book_list"),
    path("<int:book_id>/", views.book_detail, name="book_detail"),
]
```

**Named URL patterns** (`name="book_list"`) let you reference a URL by name elsewhere in the codebase (in templates via `{% url %}`, or in Python via `reverse()`), rather than hardcoding the URL path directly — so if the actual path ever changes, you only need to update it in one place.

### Interview Perspective
**Q: Why does Django encourage splitting URL configuration across a root `urls.py` and per-app `urls.py` files, connected via `include()`?**
> It keeps each app's routing self-contained and modular — an app's URL patterns live alongside that app's own code, rather than all being centralized in one giant, unwieldy root file. It also makes apps more genuinely reusable, since an app's URL structure travels with it rather than being tightly coupled to one specific project's root configuration.

**Q: Why use named URL patterns instead of hardcoding URL paths directly in templates and code?**
> Named patterns (`name="..."`) let you reference a URL by a stable identifier rather than its literal path string — via `{% url 'book_list' %}` in templates or `reverse('book_list')` in Python. If the actual URL path ever changes, you update it once in `urls.py`, rather than hunting down every hardcoded reference across the codebase.

---

## 4. Templates & Django Template Language (DTL)

### Learning Perspective
Django templates use the **Django Template Language (DTL)**, syntactically very similar to Jinja2 (covered in `web-app-using-flask.md`), for good reason — Jinja2 was influenced by DTL's design.

```html
<!-- books/list.html -->
{% extends "base.html" %}

{% block content %}
  <h1>Books</h1>
  <ul>
    {% for book in books %}
      <li>{{ book.title }} — {{ book.rating }}</li>
    {% empty %}
      <li>No books found.</li>
    {% endfor %}
  </ul>
{% endblock %}
```

**Key DTL concepts:**
- **`{{ variable }}`** — outputs a value
- **`{% tag %}`** — control structures (`{% if %}`, `{% for %}`) and other logic
- **Template inheritance** (`{% extends %}` + `{% block %}`) — lets child templates inherit a shared base layout, overriding only specific named blocks — avoiding duplicating the surrounding page structure (nav, footer, etc.) across every template
- **Filters** — transform a variable's output using `|`, e.g., `{{ title|upper }}`, `{{ date|date:"Y-m-d" }}`

### Interview Perspective
**Q: What is template inheritance in Django, and why is it useful?**
> A base template defines the overall page structure with named `{% block %}` sections; child templates `{% extends %}` that base template and override specific blocks with their own content, while everything outside those blocks (navigation, footer, etc.) is inherited automatically. It avoids duplicating shared layout markup across every individual page template — change the base once, and every page inheriting from it updates.

**Q: What are template filters, and how are they used?**
> Filters transform a variable's displayed value directly within a template, applied with a pipe (`|`) — e.g., `{{ title|upper }}` uppercases text, `{{ date|date:"Y-m-d" }}` formats a date. They let you handle common display-formatting needs directly in the template layer, without needing to pre-format the data in the view.

---

## 5. Forms

### Learning Perspective
Django's **Forms** framework handles rendering HTML forms, validating submitted data, and converting it into usable Python data — closely paralleling how Django Models handle database data.

```python
from django import forms

class BookForm(forms.Form):
    title = forms.CharField(max_length=100)
    rating = forms.FloatField(min_value=0, max_value=5)
```

**`ModelForm`** — an even more convenient variant that **automatically generates form fields directly from a Model**, avoiding duplicating field definitions between the model and the form:
```python
from django.forms import ModelForm

class BookModelForm(ModelForm):
    class Meta:
        model = Book
        fields = ["title", "rating"]
```

**Using a form in a view:**
```python
def book_create(request):
    if request.method == "POST":
        form = BookModelForm(request.POST)
        if form.is_valid():
            form.save()             # ModelForm can save directly to the database
            return redirect("book_list")
    else:
        form = BookModelForm()
    return render(request, "books/form.html", {"form": form})
```

### Interview Perspective
**Q: What's the difference between a regular Django `Form` and a `ModelForm`?**
> A regular `Form` requires you to manually define every field, independent of any model — useful for forms not directly tied to database data. A `ModelForm` automatically generates form fields based on a specified model's fields, avoiding duplicated field definitions, and provides a `.save()` method that can directly create or update a model instance from the validated form data.

**Q: What does `form.is_valid()` actually do?**
> It runs all the form's validation logic (required fields, type checks, custom `clean_*` methods, model-level constraints for `ModelForm`) against the submitted data, populates `form.errors` with any validation failures, and returns `True` only if every check passes — you should always check this before trusting/saving submitted data.

---

## 6. Django Admin

### Learning Perspective
Django ships with a **built-in, automatically-generated admin interface** — one of its most distinctive features — letting you manage your application's data through a web UI with minimal extra code.

```python
# admin.py
from django.contrib import admin
from .models import Book

admin.site.register(Book)
```

This single line registers the `Book` model with the admin site, immediately giving you a full CRUD interface for it at `/admin/`, with no additional HTML/views/forms needing to be hand-written.

**Customizing the admin interface:**
```python
class BookAdmin(admin.ModelAdmin):
    list_display = ["title", "rating"]     # columns shown in the list view
    search_fields = ["title"]                # enables a search box
    list_filter = ["rating"]                  # adds sidebar filtering

admin.site.register(Book, BookAdmin)
```

### Interview Perspective
**Q: What is the Django admin interface, and why is it considered such a significant feature?**
> A built-in, auto-generated web interface for managing your application's data — registering a model gives you an immediate, full CRUD UI for it at `/admin/`, without writing any dedicated views, forms, or templates yourself. It's significant because it dramatically speeds up internal tooling and early development — content management, debugging data, or giving non-technical staff a way to manage data — essentially "for free."

**Q: How would you customize the columns shown in the admin's list view for a model?**
> Create a class extending `admin.ModelAdmin`, set its `list_display` attribute to the list of field names you want shown as columns, then register the model with that custom admin class instead of the bare model — e.g., `admin.site.register(Book, BookAdmin)`.

---

## 7. Settings & Configuration

### Learning Perspective
Django's `settings.py` centralizes the project's configuration. Key settings worth knowing:

- **`DEBUG`** — when `True`, shows detailed error pages with stack traces (essential for local development); **must be `False` in production** (see Section 10 — leaving it `True` in production is a serious security risk, potentially exposing sensitive internals to end users)
- **`ALLOWED_HOSTS`** — a list of host/domain names the Django site is allowed to serve; Django refuses requests with a `Host` header not in this list, as a security measure against certain attacks
- **`INSTALLED_APPS`** — the list of Django apps (built-in and your own) active in the project
- **`DATABASES`** — database connection configuration (engine, name, credentials, host)
- **`MIDDLEWARE`** — an ordered list of middleware classes processing every request/response (similar in concept to Express middleware, covered in `express-framework.md`)
- **`STATIC_URL` / `STATIC_ROOT`** — configuration for serving static files (CSS, JS, images) — see Section 8
- **`SECRET_KEY`** — used for cryptographic signing (sessions, CSRF tokens, etc.) — **must be kept secret** and never committed to version control in a real project

### Interview Perspective
**Q: Why is it critical to set `DEBUG = False` in a production Django deployment?**
> With `DEBUG = True`, Django shows detailed error pages on any unhandled exception — including full stack traces, local variable values, and settings information. In production, this could expose sensitive internal details (database credentials, file paths, code structure) to any user who triggers an error, which is a serious security risk. `DEBUG` should always be `False` in production, with proper logging/error tracking used instead to diagnose issues.

**Q: What's the purpose of `ALLOWED_HOSTS`?**
> It's a security measure — a list of hostnames Django will accept requests for. If a request arrives with a `Host` header not matching anything in this list, Django rejects it with an error, protecting against HTTP Host header attacks (where an attacker manipulates the Host header to poison cache entries, generate malicious links, or bypass certain security checks).

---

## 8. Static & Media Files

### Learning Perspective
Django distinguishes between two categories of non-code files:

- **Static files** — CSS, JavaScript, and images that are part of the **application itself** (not user-uploaded), typically stored in each app's `static/` directory during development
- **Media files** — files **uploaded by users** at runtime (e.g., profile pictures), configured via `MEDIA_URL`/`MEDIA_ROOT`, handled differently from static files since they're dynamic, user-generated content

**In development**, Django's development server can serve static files automatically. **In production**, this is explicitly discouraged — Django's built-in static file serving is not optimized for production traffic. Instead:

```bash
python manage.py collectstatic
```

**`collectstatic`** gathers static files from every app's individual `static/` directory into a single, unified location (`STATIC_ROOT`), which a **dedicated web server or CDN** (like Nginx, or a cloud storage/CDN service) then serves directly and efficiently — bypassing Django/Python entirely for these requests, which is both faster and reduces load on the application server.

### Interview Perspective
**Q: Why shouldn't Django serve static files directly in production?**
> Django's built-in static file serving is designed for development convenience, not production performance or scale — it's not optimized for high-traffic, concurrent file serving the way a dedicated web server (like Nginx) or a CDN is. Running `collectstatic` consolidates all static files into one location, which a properly configured web server or CDN then serves directly, bypassing the Python/Django application layer entirely for these requests — much faster and reduces unnecessary load on your application server.

**Q: What's the difference between "static files" and "media files" in Django?**
> Static files are part of the application itself — CSS, JS, images bundled with your code, not expected to change at runtime. Media files are user-uploaded content (e.g., avatar images, document uploads) — dynamic, generated by user activity rather than shipped with the codebase, and configured separately (`MEDIA_URL`/`MEDIA_ROOT`) since they're managed differently (often requiring separate storage considerations, like cloud object storage in production).

---

## 9. WSGI & ASGI

### Learning Perspective
- **WSGI (Web Server Gateway Interface)** — the traditional, standard interface between Python web applications and web servers — a specification defining how a web server communicates with a Python application, letting different servers and frameworks interoperate. Django's `wsgi.py` file is the entry point production WSGI servers use to actually run the application.
- **ASGI (Asynchronous Server Gateway Interface)** — a newer standard, extending WSGI's concept to support **asynchronous** applications — enabling features like WebSockets, long-lived connections, and async views, which the purely synchronous WSGI standard can't natively support. Django's `asgi.py` file serves the equivalent role for ASGI-based deployment.

**In practice, deploying a Django application means running it behind a production-grade WSGI/ASGI server** (not Django's built-in development server, which is explicitly not meant for production use) — common choices include **Gunicorn** (WSGI) or **Uvicorn**/**Daphne** (ASGI).

### Interview Perspective
**Q: What's the difference between WSGI and ASGI, and why does it matter for deployment?**
> WSGI is the traditional standard interface between Python web apps and servers, but it's inherently synchronous — one request handled at a time per worker. ASGI extends that concept to support asynchronous applications, enabling things like WebSockets and async views that WSGI can't handle natively. It matters for deployment because you need a server compatible with whichever interface your application actually uses — a traditional synchronous Django app typically runs behind a WSGI server like Gunicorn, while an app using Django's async features or needing WebSocket support needs an ASGI server like Uvicorn or Daphne.

**Q: Why shouldn't you use Django's built-in development server (`python manage.py runserver`) in production?**
> It's explicitly designed for local development convenience — auto-reloading on code changes, simple error pages — not for production-level performance, concurrency, or security. It's single-threaded/lightweight by design and not hardened against production traffic patterns or malicious requests; production deployments should always run behind a dedicated WSGI/ASGI server (Gunicorn, Uvicorn) fronted by a proper web server/reverse proxy (like Nginx).

---

## 10. Production Security Checklist

### Learning Perspective
Beyond `DEBUG = False` and `ALLOWED_HOSTS` (Section 7), Django provides a built-in check command and several settings specifically for production hardening:

```bash
python manage.py check --deploy
```
This command reviews your settings against Django's recommended production security practices, flagging anything that looks risky.

**Common production security settings:**
- **`SECRET_KEY`** — pulled from an environment variable, never hardcoded/committed to source control
- **`SECURE_SSL_REDIRECT = True`** — forces all traffic to HTTPS
- **`SESSION_COOKIE_SECURE = True`** / **`CSRF_COOKIE_SECURE = True`** — ensures cookies are only sent over HTTPS connections
- **`SECURE_HSTS_SECONDS`** — enables HTTP Strict Transport Security, telling browsers to only ever connect via HTTPS for a specified duration
- Database credentials and other secrets pulled from **environment variables**, not hardcoded in `settings.py`

### Interview Perspective
**Q: What does `python manage.py check --deploy` do, and why is it useful before going to production?**
> It runs Django's built-in deployment checklist against your current settings, flagging configuration that deviates from recommended production security practices — like `DEBUG` still being `True`, missing `ALLOWED_HOSTS`, or insecure cookie settings. It's useful as an automated, standardized final check before deploying, catching common oversights that are easy to miss manually.

**Q: Why should secrets like `SECRET_KEY` and database credentials be loaded from environment variables rather than hardcoded in `settings.py`?**
> Hardcoding secrets directly in source code means they end up committed to version control, visible to anyone with repository access (and permanently present in Git history even if later removed — see the leaked-secret discussion in `git-and-github-fundamentals.md`). Environment variables keep secrets out of the codebase entirely, configured separately per environment (dev/staging/production), and easily rotated without needing a code change/deployment.

---

## 11. Database Configuration for Production

### Learning Perspective
Django's default `settings.py` (from `startproject`) typically configures **SQLite** — a simple, file-based database, great for local development, but **not recommended for production** in most real-world deployments, since it doesn't handle concurrent write access well and isn't designed for the scale/reliability needs of a live application.

**Production deployments typically switch to PostgreSQL or MySQL**, configured via the `DATABASES` setting:
```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PASSWORD"),
        "HOST": os.environ.get("DB_HOST"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}
```

Note how every credential is pulled from an **environment variable** rather than hardcoded, consistent with the security practices in Section 10.

### Interview Perspective
**Q: Why is SQLite generally not recommended for a production Django deployment?**
> SQLite is a simple, file-based, single-writer database — it handles concurrent write access poorly, which becomes a real bottleneck under genuine production traffic with multiple simultaneous users. It's excellent for local development and testing (zero setup, no separate database server needed), but production deployments typically use a proper client-server database like PostgreSQL or MySQL, which are built for concurrent access, scaling, and the reliability guarantees a live application needs.

---

## 12. Deployment Platforms & Containerization

### Learning Perspective
Common approaches to actually hosting a Django application in production:

- **PaaS (Platform as a Service)** — platforms like **Heroku**, **Render**, or **Railway** handle much of the underlying infrastructure automatically — you push code, and the platform handles provisioning servers, running your WSGI/ASGI server, and often provides an add-on managed database. Simpler to get started with, less granular control.
- **IaaS (Infrastructure as a Service)** — platforms like **AWS EC2**, **DigitalOcean Droplets**, or **Google Compute Engine** — you provision and configure the actual servers yourself (installing Gunicorn, Nginx, the database, etc.). More control and typically more cost-effective at scale, but more setup/maintenance responsibility.
- **Containerization (Docker)** — packaging the application, its dependencies, and its runtime environment into a **container image**, ensuring the application runs identically across development, staging, and production, regardless of the underlying host's configuration. A basic Django `Dockerfile` typically installs dependencies, copies the code, runs `collectstatic`, and starts Gunicorn as the container's entry point.

**A typical production request path**, tying several of these concepts together:
```
Client request → Nginx (reverse proxy, serves static files) → Gunicorn (WSGI server) → Django application
```

### Interview Perspective
**Q: What's the difference between deploying to a PaaS versus an IaaS?**
> A PaaS (like Heroku) abstracts away server management — you push code, and the platform handles provisioning, running the app server, and often the database, in exchange for less granular control and typically higher cost at scale. An IaaS (like AWS EC2) gives you raw servers you configure yourself — installing and managing the WSGI server, reverse proxy, and database manually — offering more control and often better cost efficiency at scale, at the cost of more setup and ongoing maintenance responsibility.

**Q: Why is Docker commonly used when deploying a Django application, even to a traditional server?**
> It packages the application together with its exact dependencies and runtime environment into a single, portable container image — eliminating "it works on my machine" inconsistencies between development, staging, and production environments. It also makes deployment more reproducible and makes it easier to scale horizontally (spinning up multiple identical container instances) or migrate between hosting providers, since the container itself is largely environment-agnostic.

**Q: Describe a typical production request path for a deployed Django application.**
> A client request first hits a reverse proxy/web server (commonly Nginx) — which serves static files directly if applicable, and otherwise forwards the request to a WSGI (or ASGI) server like Gunicorn, which actually runs the Django application and generates the response, passed back through Nginx to the client. This layering exists because Django/Gunicorn shouldn't handle raw internet traffic and static file serving directly — Nginx is far more efficient at both, and adds a layer of buffering/protection in front of the application server.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| MVT | Model (data), View (request logic), Template (presentation) — Django's take on MVC |
| Project vs. app | Overall configuration/installation vs. a self-contained, reusable functionality module |
| FBV vs. CBV | Plain function, explicit and simple vs. class-based, less boilerplate for common CRUD patterns |
| `urls.py` + `include()` | Modular, per-app routing delegated from a root URL config |
| Named URL patterns | Reference URLs by name (`{% url %}`, `reverse()`), not hardcoded paths |
| Template inheritance | `{% extends %}` + `{% block %}` — shared layout, overridden per-page content |
| `Form` vs. `ModelForm` | Manually defined fields vs. auto-generated from a model, with built-in `.save()` |
| Django admin | Auto-generated CRUD UI from `admin.site.register(Model)` |
| `DEBUG = False` in production | Prevents leaking stack traces/internals on error pages |
| `ALLOWED_HOSTS` | Rejects requests with an unrecognized Host header — prevents Host header attacks |
| `collectstatic` | Consolidates static files for a dedicated web server/CDN to serve, not Django itself |
| WSGI vs. ASGI | Synchronous standard vs. async-capable standard (WebSockets, async views) |
| Why not `runserver` in production | Not built for production performance/security — use Gunicorn/Uvicorn behind Nginx |
| SQLite in production | Generally avoided — poor concurrent write handling; use PostgreSQL/MySQL instead |
| PaaS vs. IaaS | Managed, less control (Heroku) vs. self-managed servers, more control (AWS EC2) |
| Docker for Django | Consistent, portable environment across dev/staging/production |
| Typical prod request path | Client → Nginx (static + reverse proxy) → Gunicorn (WSGI) → Django |