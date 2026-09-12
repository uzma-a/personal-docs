# ORM — Object-Relational Mapping (with Django ORM)

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. The Problem: OOP vs. SQL Paradigm Mismatch

### Learning Perspective
**Object-Oriented Programming (OOP) and SQL model data differently** — this is often called the **"object-relational impedance mismatch."**

- **OOP** thinks in terms of **objects** — instances with attributes and behaviors (methods), often connected through inheritance, composition, and references to other objects
- **SQL/relational databases** think in terms of **rows and tables** — flat, tabular data connected through primary/foreign key relationships, with no inherent concept of "behavior" attached to the data itself

Working directly with SQL from an OOP codebase means constantly **translating** between these two mental models by hand — writing raw queries, manually mapping result rows into objects, and vice versa — which is repetitive and error-prone.

### Interview Perspective
**Q: What is the "object-relational impedance mismatch," and why does it matter?**
> It refers to the fundamental difference in how OOP and relational databases model data — OOP works with objects, inheritance, and behavior; relational databases work with flat rows, tables, and key-based relationships. This mismatch matters because without something bridging the two, developers end up writing a lot of repetitive, error-prone manual translation code — converting query results into objects and objects back into rows/parameters — every time they interact with the database.

---

## 2. What Is ORM?

### Learning Perspective
**Object Relational Mapping (ORM)** **bridges the gap** between OOP and SQL. **ORM libraries or tools** can **map and transfer**:
- Data stored in a relational database **as rows**, into **objects**
- **Objects**, back into database **rows**

**ORM allows developers to use OOP to query and manipulate data**, because it handles this bidirectional translation automatically — you work with familiar objects and method calls in your programming language, and the ORM generates and executes the corresponding SQL behind the scenes.

**Why this matters practically:**
- You write **less repetitive boilerplate** — no manually writing SQL strings and manually parsing result sets for every operation
- Your database interactions become **more type-safe and IDE-friendly**, since you're working with actual language objects/classes rather than raw strings
- Many ORMs provide a degree of **database portability** — the same code can often work across different underlying database engines (MySQL, PostgreSQL, SQLite, etc.) with minimal changes

### Interview Perspective
**Q: What is an ORM, and what problem does it solve?**
> An ORM (Object-Relational Mapper) bridges the gap between object-oriented code and relational databases — it maps database rows into objects and objects back into rows, letting developers query and manipulate data using familiar OOP syntax rather than writing raw SQL and manually converting between rows and objects by hand.

**Q: What are some practical benefits of using an ORM, beyond just convenience?**
> Less repetitive/error-prone boilerplate, better type safety and IDE support (since you're working with actual classes/objects rather than raw query strings), and often a degree of database portability — the same ORM code can frequently run against different underlying database engines with little to no change.

---

## 3. Django ORM — Overview

### Learning Perspective
**Django ORM** is a **Python ORM component** that belongs to the **Django web application framework** — one of the most widely used ORMs in the Python ecosystem, deeply integrated into Django's overall structure (models, views, admin interface, etc.).

**Django ORM can help speed up database development** because you **define a model** that **maps to a database table**, for each Django model — rather than manually writing `CREATE TABLE` statements and separately writing code to interact with that table, you define both simultaneously via a single Python class.

**Each Django field maps to a column type** — the field types you choose on your model (e.g., `CharField`, `IntegerField`, `DateField`) directly correspond to appropriate underlying SQL column types, handled automatically by Django.

```python
from django.db import models

class MyModel(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.IntegerField()
```

**Django automatically creates tables** once models and fields are defined — via the **migration** system (see Section 4) — you don't write `CREATE TABLE` SQL yourself at all.

### Interview Perspective
**Q: What is Django ORM, and how does defining a model relate to the underlying database?**
> Django ORM is the ORM built into the Django web framework. Defining a Django model (a Python class inheriting from `models.Model`) simultaneously defines both your application's data structure *and* the corresponding database table — each field on the model maps to a specific column type in the database, and Django handles creating the actual table for you, rather than requiring you to write raw SQL DDL statements.

**Q: Why does using Django ORM speed up database development compared to writing raw SQL?**
> You define your schema once, as Python code (a model class), and Django handles generating the corresponding SQL to create/modify the actual database table — plus generates a full set of Python methods for querying and manipulating that data. This eliminates the need to separately write and maintain raw `CREATE TABLE` statements alongside hand-written query code, keeping the schema and the application logic in one consistent place.

---

## 4. Migrations: Creating Tables from Models

### Learning Perspective
Django doesn't create database tables the instant you define a model — you need to run the **migration** workflow:

```bash
python manage.py makemigrations   # generate migration files describing the schema change
python manage.py migrate           # actually apply those changes to the database
```

- **`makemigrations`** — inspects your models and generates **migration files** — a record of what schema changes need to happen (new tables, new columns, altered fields, etc.) based on differences between your current models and the last known migration state
- **`migrate`** — actually **applies** those pending migration files to the database, creating/altering the real tables to match

**Why the two-step process matters:** it lets Django track the database's schema history **incrementally, as version-controlled files** — every schema change is recorded as its own migration, letting you (or teammates) apply the exact same sequence of changes consistently across development, staging, and production databases, and even roll back specific changes if needed.

### Interview Perspective
**Q: What's the difference between `makemigrations` and `migrate`?**
> `makemigrations` generates migration files — a record of what schema changes are needed, based on comparing your current models to the previously recorded state. `migrate` actually applies those pending migration files to the real database, creating or altering tables to match. Running `makemigrations` alone doesn't touch the database at all — it just prepares the plan; `migrate` executes it.

**Q: Why does Django track schema changes as a sequence of migration files, rather than just directly syncing models to the database?**
> Because it gives you a version-controlled, incremental history of schema changes — the same set of migrations can be applied consistently across different environments (dev, staging, production), reviewed in code review like any other code change, and in many cases rolled back if a change causes problems, rather than the database schema being an untracked, implicit side effect of whatever the current model definitions happen to be.

---

## 5. CRUD Operations with Django ORM

### Learning Perspective
**Django APIs can perform Create, Read, Update, and Delete (CRUD) operations** on database objects — each mapping to specific ORM method calls.

### Create
**In a Django model, you create an object and call the model's `save()` method** to insert it into the database as a record:
```python
obj = MyModel(field1="value", field2=5)
obj.save()   # INSERTs a new row into the database
```

### Read
**You must construct a `QuerySet` using a Manager** on your model class to read objects using the Django Model API. The **`Manager`** is accessed via `.objects` on the model class, and provides methods like `.all()`, `.filter()`, and `.get()` — each returning (or working with) a **`QuerySet`**, Django's representation of a database query.

```python
MyModel.objects.all()                     # retrieves ALL instances/rows
MyModel.objects.filter(field1="value")    # filters based on a condition
MyModel.objects.get(field1="value")        # retrieves a SINGLE specific instance
```

### Update
**There are several ways to update database records in Django** by updating objects — the most common being: fetch the object, change an attribute, then save:
```python
obj.field1 = "new value"
obj.save()   # UPDATEs the existing row
```

### Delete
**To delete records in a database, you call Django ORM's `delete()` method** on a model object or query set:
```python
obj.delete()                                # deletes a single object/row
MyModel.objects.filter(field1="value").delete()   # deletes ALL matching rows
```

### Interview Perspective
**Q: Walk through how you'd perform each CRUD operation using Django ORM.**
> Create: instantiate the model class with field values, then call `.save()`, which inserts a new row. Read: use the model's Manager (`.objects`) to build a QuerySet — `.all()` for everything, `.filter()` for conditional matches, `.get()` for a single specific object. Update: fetch an existing object, modify its attribute(s) directly, then call `.save()` again — Django detects it's an existing record (based on its primary key) and issues an `UPDATE` rather than a new `INSERT`. Delete: call `.delete()` on a specific object instance, or on a filtered QuerySet to delete multiple matching rows at once.

**Q: How does Django's `.save()` method know whether to INSERT a new row or UPDATE an existing one?**
> It checks whether the object already has a primary key value set. If not (a newly instantiated object with no primary key assigned yet), `.save()` performs an `INSERT`. If the object already has a primary key (e.g., it was previously fetched from the database, or already saved once), `.save()` performs an `UPDATE` against that existing row instead.

⭐ **Very frequently asked** — be ready to write the basic create/read/update/delete pattern from memory; it's one of the most common Django-specific interview questions.

---

## 6. Working with Related Models

### Learning Perspective
Since relational databases connect data via foreign keys, Django ORM provides convenient ways to **navigate relationships between models** directly through object attributes, rather than manually writing JOINs.

**Following a Foreign Key / OneToOneField "forward"** — accessing the **related model** associated with an object:
```python
obj.related_model   # accesses the related object directly
```

**Following a relationship "in reverse"** — from the "one" side of a one-to-many relationship, accessing **all** related objects on the "many" side, via the automatically-generated `_set` attribute:
```python
obj.model_set.all()   # fetches ALL related objects pointing back to this obj
```

**Filtering across a relationship** — you can filter a model's QuerySet based on a **related model's field value**, using Django's double-underscore (`__`) lookup syntax to "traverse" the relationship:
```python
MyModel.objects.filter(related_model__field="value")
```

### Interview Perspective
**Q: How would you access a related object through a foreign key in Django, and how would you go the "other direction"?**
> Following the relationship forward (from the model that *has* the foreign key) is just direct attribute access: `obj.related_model`. Going in reverse (from the model being *referenced*, to find everything that points to it) uses the automatically-generated `<model>_set` manager: `obj.model_set.all()`, since a single object could have many related objects pointing back to it.

**Q: How would you filter a QuerySet based on a field belonging to a related model, rather than the model itself?**
> Using Django's double-underscore lookup syntax to traverse the relationship: `MyModel.objects.filter(related_model__field="value")` — this generates the equivalent of a SQL JOIN behind the scenes, letting you filter based on a related table's column without writing any explicit JOIN syntax yourself.

---

## 7. Field Lookups

### Learning Perspective
Django's **field lookups** — appended to a field name using `__` inside `.filter()` — let you express a wide variety of query conditions beyond simple equality, corresponding to different SQL comparison operators/functions under the hood.

| Lookup | Description | Example |
|---|---|---|
| **`exact`** | Value is **exactly** equal (this is also the implicit default if no lookup is specified at all) | `MyModel.objects.filter(field__exact="value")` |
| **`iexact`** | **Case-insensitive** exact match | `MyModel.objects.filter(field__iexact="value")` |
| **`contains`** | Checks if the value is a **substring** within the field | `MyModel.objects.filter(field__contains="value")` |
| **`startswith`** | Value **begins with** the given string | `MyModel.objects.filter(field__startswith="value")` |
| **`endswith`** | Value **ends with** the given string | `MyModel.objects.filter(field__endswith="value")` |
| **`in`** | Value is present in a given **list** of values | `MyModel.objects.filter(field__in=["value1", "value2"])` |
| **`gt`** | Value is numerically **greater than** | `MyModel.objects.filter(field__gt=5)` |
| **`lt`** | Value is numerically **less than** | `MyModel.objects.filter(field__lt=10)` |

(Related lookups following the same pattern, not explicitly listed in the source but standard Django: `gte`/`lte` for greater/less-than-**or-equal**, and case-insensitive variants like `icontains`, `istartswith`, `iendswith`.)

### Interview Perspective
**Q: What's the difference between `exact` and `iexact`?**
> `exact` performs a case-sensitive exact match — `"Hello"` and `"hello"` would not match. `iexact` performs the same exact match, but case-insensitively — `"Hello"` and `"hello"` would both match.

**Q: How would you filter for records where a numeric field falls within a specific range?**
> Combine two lookups on the same field in one `.filter()` call: `MyModel.objects.filter(field__gt=5, field__lt=10)` — Django combines multiple keyword arguments in a single `.filter()` call with an implicit `AND`, so this returns records where the field's value is strictly between 5 and 10.

**Q: What does the `in` lookup do, and when would you use it?**
> It checks whether a field's value is present within a given list of values — `MyModel.objects.filter(field__in=["value1", "value2"])` — useful when you want to match against several possible discrete values at once, rather than chaining multiple `OR`-equivalent conditions manually.

⭐ **Frequently asked** — be ready to translate a plain-English filtering requirement (e.g., "find all books with a rating above 4, published this year") directly into Django's `.filter()` + lookup syntax on the spot.

---

## Quick Reference: Django ORM Methods & Lookups

| Package/Method | Description | Code Example |
|---|---|---|
| `django.db.models.Model` | Define a model | `class MyModel(models.Model): field1 = models.CharField(max_length=100)` |
| `makemigrations` / `migrate` | Create database tables based on models | `python manage.py makemigrations` / `python manage.py migrate` |
| `.all()` | Retrieves all instances of a model | `MyModel.objects.all()` |
| `.filter()` | Filter objects using conditions | `MyModel.objects.filter(field1="value")` |
| `.get()` | Retrieves a single, specific instance | `MyModel.objects.get(field1="value")` |
| `obj.save()` (create) | Creates and saves a new instance | `obj = MyModel(field1="value"); obj.save()` |
| `obj.save()` (update) | Updates and saves an existing instance | `obj.field1 = "new value"; obj.save()` |
| `.delete()` | Deletes an object (or all matching a QuerySet) | `obj.delete()` |
| `obj.related_model` | Access a related object (forward FK/OneToOne) | `obj.related_model` |
| `obj.model_set.all()` | Access related objects in reverse (FK) | `obj.model_set.all()` |
| `related_model__field` | Filter based on a related model's field | `MyModel.objects.filter(related_model__field="value")` |
| `__exact` | Exact match | `MyModel.objects.filter(field__exact="value")` |
| `__iexact` | Case-insensitive exact match | `MyModel.objects.filter(field__iexact="value")` |
| `__contains` | Substring match | `MyModel.objects.filter(field__contains="value")` |
| `__startswith` | Starts with | `MyModel.objects.filter(field__startswith="value")` |
| `__endswith` | Ends with | `MyModel.objects.filter(field__endswith="value")` |
| `__in` | Value in a list | `MyModel.objects.filter(field__in=["value1", "value2"])` |
| `__gt` | Greater than | `MyModel.objects.filter(field__gt=5)` |
| `__lt` | Less than | `MyModel.objects.filter(field__lt=10)` |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Object-relational impedance mismatch | OOP models objects/behavior; SQL models flat rows/tables — ORMs bridge the two |
| ORM | Maps DB rows ↔ objects, letting you query/manipulate data with OOP syntax instead of raw SQL |
| Django ORM | Python ORM built into the Django framework; models define both structure and DB schema |
| `makemigrations` vs `migrate` | Generates the schema change plan vs. actually applies it to the database |
| Create | `MyModel(...); obj.save()` — INSERTs |
| Read | `.objects.all() / .filter() / .get()` via the Manager, returning a QuerySet |
| Update | Fetch, mutate attribute, `.save()` again — Django detects existing PK, issues UPDATE |
| Delete | `.delete()` on an object or a filtered QuerySet |
| Forward vs. reverse relations | `obj.related_model` vs. `obj.model_set.all()` |
| Filtering across relationships | `related_model__field="value"` — double-underscore traversal |
| Common field lookups | `exact`, `iexact`, `contains`, `startswith`, `endswith`, `in`, `gt`, `lt` |