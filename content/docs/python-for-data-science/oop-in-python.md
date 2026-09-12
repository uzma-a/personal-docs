# OOP in Python

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general Python knowledge, since no source content was provided. Worth cross-checking against your actual course material for alignment, same as the other general-knowledge files. Matches the `oop-in-python` slug in your NAV.

---

## 1. Classes & Objects

### Learning Perspective
A **class** is a **blueprint** for creating objects — it defines the **attributes** (data) and **methods** (behavior) that its instances will have. An **object** (or **instance**) is a specific realization of that class, with its own actual data.

```python
class Book:
    def __init__(self, title, rating):
        self.title = title      # instance attribute
        self.rating = rating

    def describe(self):
        return f"{self.title} has a rating of {self.rating}"

b1 = Book("Node Basics", 4.2)   # creating an instance
print(b1.describe())            # "Node Basics has a rating of 4.2"
```

**Key pieces:**
- **`class` keyword** — begins a class definition
- **`__init__`** — the **constructor** method, automatically called when a new instance is created, used to initialize the object's attributes
- **`self`** — refers to the **current instance**; must be the **first parameter** of every instance method (though it's passed automatically — you never pass it explicitly when calling the method)
- **Instance attributes** — data unique to each object, typically set inside `__init__` via `self.attribute_name = value`

### Interview Perspective
**Q: What's the difference between a class and an object/instance?**
> A class is the blueprint — it defines what attributes and methods any object created from it will have. An object (instance) is a specific realization of that blueprint, holding its own actual data.

**Q: What is `self`, and why does every instance method need it as a parameter?**
> `self` refers to the specific instance the method is being called on — it's how a method accesses that instance's own attributes and other methods. Python passes it automatically when you call `instance.method()`, but it must still be explicitly declared as the first parameter in the method's definition, since Python doesn't do this implicitly like some other languages do.

**Q: What is `__init__`, and when does it run?**
> The constructor method, automatically called when a new instance is created via `ClassName(...)`. It's where you typically set up the instance's initial attributes, using the arguments passed in at creation time.

---

## 2. Instance Attributes vs. Class Attributes

### Learning Perspective
- **Instance attributes** — belong to **one specific object**; set via `self.attr = value`, typically inside `__init__`. Each instance has its **own independent copy**.
- **Class attributes** — belong to the **class itself**, shared across **all instances** unless explicitly overridden on a specific instance. Defined directly inside the class body, outside any method.

```python
class Book:
    genre_default = "Unknown"   # class attribute — shared by all instances

    def __init__(self, title):
        self.title = title       # instance attribute — unique per instance

b1 = Book("Node Basics")
b2 = Book("JS Guide")

print(b1.genre_default)   # "Unknown" — inherited from the class
b1.genre_default = "Tech"  # creates a NEW instance attribute on b1 only
print(b1.genre_default)   # "Tech"
print(b2.genre_default)   # still "Unknown" — b2 is unaffected
```

**Important gotcha:** if a class attribute holds a **mutable** object (like a list), and you *mutate* it (rather than reassign it) through one instance, that change **is** shared across all instances — since they're all still referencing the exact same underlying object.

```python
class Team:
    members = []   # class attribute — a SHARED mutable list, likely a bug

t1 = Team()
t2 = Team()
t1.members.append("Alice")
print(t2.members)   # ["Alice"] — unexpectedly shared! This is a common bug.
```

### Interview Perspective
**Q: What's the difference between an instance attribute and a class attribute?**
> Instance attributes are unique to each object, typically set in `__init__` via `self.attr`. Class attributes are shared across all instances of the class, defined directly in the class body — every instance sees the same value unless it's specifically overridden on that instance.

**Q: Why is using a mutable object (like a list) as a class attribute considered risky?**
> Because all instances share the *same* underlying object by default — mutating it (e.g., `.append()`) through one instance affects every other instance too, since they're all referencing that one shared list, not independent copies. This is a classic, easy-to-hit Python bug; mutable default state generally belongs in `__init__` as an instance attribute instead, so each instance gets its own independent copy.

⭐ **Frequently asked "gotcha"** — the shared-mutable-class-attribute bug is one of the most commonly tested Python OOP pitfalls.

---

## 3. Inheritance

### Learning Perspective
**Inheritance** lets a class (the **subclass**/**child class**) derive attributes and methods from another class (the **superclass**/**parent class**), enabling code reuse and hierarchical relationships between related classes.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound."

class Dog(Animal):        # Dog inherits from Animal
    def speak(self):       # overrides the parent's method
        return f"{self.name} barks."

class Cat(Animal):
    pass                   # inherits speak() unchanged, no override needed

d = Dog("Rex")
c = Cat("Whiskers")
print(d.speak())   # "Rex barks." — overridden
print(c.speak())   # "Whiskers makes a sound." — inherited as-is
```

**`super()`** — calls a method from the **parent class**, commonly used inside an overridden `__init__` to still run the parent's initialization logic, without duplicating that code:

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # runs Animal's __init__ first
        self.breed = breed       # then adds Dog-specific setup
```

### Interview Perspective
**Q: What is inheritance, and why is it useful?**
> Inheritance lets a subclass derive attributes and methods from a superclass, enabling code reuse — shared behavior lives once in the parent class, and child classes can reuse it as-is or override specific pieces, rather than duplicating logic across every related class.

**Q: What does `super()` do, and why would you use it inside a subclass's `__init__`?**
> `super()` gives access to the parent class's methods — most commonly used to call the parent's `__init__` from within the child's own overridden `__init__`, so the parent's initialization logic still runs (setting up any attributes it manages) without needing to duplicate that code manually in the child class.

**Q: What happens if a subclass doesn't override a parent method at all?**
> It simply inherits that method unchanged — calling it on a subclass instance runs the exact same implementation defined in the parent class, with no need to redefine anything in the child.

---

## 4. Method Overriding & Polymorphism

### Learning Perspective
**Method overriding** — a subclass providing its **own implementation** of a method that's already defined in its parent class (as `Dog.speak()` did above), replacing the inherited behavior with subclass-specific logic.

**Polymorphism** — the ability to treat objects of **different classes** through a **common interface**, where each object responds to the same method call according to its own specific implementation. This is a direct consequence of method overriding:

```python
animals = [Dog("Rex"), Cat("Whiskers"), Animal("Generic")]

for animal in animals:
    print(animal.speak())   # each object responds differently to the SAME method call
```

This is useful because the calling code (the `for` loop above) doesn't need to know or care about each object's specific class — it just calls `.speak()` uniformly, and each object handles that call according to its own type.

### Interview Perspective
**Q: What is polymorphism, and how does it relate to method overriding?**
> Polymorphism is the ability to call the same method on objects of different classes and have each respond according to its own specific implementation. It's enabled by method overriding — since each subclass can define its own version of an inherited method, calling that method uniformly across a mixed collection of objects still produces the correct, type-specific behavior for each one.

**Q: Give a practical example of why polymorphism is useful.**
> It lets you write generic code that works across a family of related classes without needing to check each object's specific type — e.g., iterating over a list of different shape objects and calling `.area()` on each, where each shape class calculates area differently, but the calling code stays simple and uniform.

---

## 5. Encapsulation & Access Modifiers

### Learning Perspective
**Encapsulation** is the practice of **bundling data and the methods that operate on it** within a class, and **controlling access** to that data — restricting direct external modification where appropriate.

Python doesn't have true "private" attributes enforced by the language (unlike some other OOP languages) — instead, it relies on **naming conventions**:

- **`self.attribute`** — public; freely accessible from outside the class (no protection)
- **`self._attribute`** — a **single leading underscore** signals "protected"/"internal use" **by convention only** — Python doesn't actually prevent external access; it's a hint to other developers not to touch it directly
- **`self.__attribute`** — a **double leading underscore** triggers **name mangling** — Python internally renames it to `_ClassName__attribute`, making accidental external access harder (though still technically possible if you know the mangled name) — the closest Python gets to genuinely "private"

```python
class Account:
    def __init__(self, balance):
        self.__balance = balance   # name-mangled — harder to access directly

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

acc = Account(100)
print(acc.get_balance())   # 100 — accessed via a public method
# print(acc.__balance)     # AttributeError — name-mangled, not directly accessible as written
print(acc._Account__balance)  # 100 — still technically reachable if you know the mangled name
```

**Properties (`@property`)** — a more Pythonic way to control access to an attribute, letting you expose what looks like a plain attribute externally, while actually running code (like validation) behind the scenes:

```python
class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance can't be negative")
        self._balance = value

acc = Account(100)
acc.balance = 200      # runs the setter, with validation, but LOOKS like plain attribute access
print(acc.balance)     # 200 — runs the getter
```

### Interview Perspective
**Q: How does Python implement "private" attributes, given that it doesn't have a true `private` keyword like some other languages?**
> Through naming convention, not actual enforcement. A single leading underscore (`_attr`) signals "internal use, please don't touch" by convention only — Python doesn't prevent access. A double leading underscore (`__attr`) triggers name mangling — Python renames it internally to `_ClassName__attr`, making accidental external access much less likely, though not technically impossible if someone knows the mangled name.

**Q: What is the `@property` decorator used for, and why would you use it instead of a plain public attribute?**
> It lets you define methods that behave like plain attributes from the outside (accessed without parentheses), while actually running code behind the scenes — commonly used to add validation on assignment (via a paired `@x.setter`) or compute a derived value on access, without changing how the attribute is used externally, which also means you can retrofit validation onto an existing plain-attribute-style API without breaking callers.

⭐ **Frequently asked** — be ready to clearly state that Python's encapsulation is convention-based (underscore prefixes), not truly enforced like `private` in Java/C++.

---

## 6. Class Methods, Static Methods & Instance Methods

### Learning Perspective
Python distinguishes **three kinds of methods** within a class, using decorators to mark the non-default two:

- **Instance method** (default) — takes **`self`** as the first parameter; operates on a **specific instance's** data
- **Class method** — decorated with **`@classmethod`**; takes **`cls`** (the class itself) as the first parameter instead of `self`; operates on **class-level** data, or is commonly used as an **alternative constructor**
- **Static method** — decorated with **`@staticmethod`**; takes **neither `self` nor `cls`**; behaves like a **regular function** that's just logically grouped inside the class namespace, with no access to instance or class data at all

```python
class Book:
    total_books = 0

    def __init__(self, title):
        self.title = title
        Book.total_books += 1

    @classmethod
    def from_string(cls, book_string):   # alternative constructor pattern
        title = book_string.split(",")[0]
        return cls(title)

    @staticmethod
    def is_valid_title(title):
        return len(title) > 0             # doesn't need self or cls at all

b1 = Book("Node Basics")
b2 = Book.from_string("JS Guide, 2023")   # created via the classmethod
print(Book.total_books)                    # 2
print(Book.is_valid_title("Node Basics"))  # True
```

### Interview Perspective
**Q: What's the difference between an instance method, a class method, and a static method?**
> An instance method operates on a specific object's data, taking `self`. A class method (`@classmethod`) takes `cls` instead, operating on class-level data or commonly used as an alternative constructor. A static method (`@staticmethod`) takes neither — it's just a regular function grouped inside the class for organizational purposes, with no access to instance or class state at all.

**Q: When would you use a class method as an "alternative constructor," and why?**
> When you want to create instances from data in a different format than the standard `__init__` expects — e.g., `Book.from_string(...)` parsing a raw string into constructor arguments, then calling `cls(...)` to build the instance. It's useful because it gives you multiple, clearly-named ways to construct an object, without overloading `__init__` itself with complex conditional logic to handle different input shapes.

---

## 7. Dunder (Magic/Special) Methods

### Learning Perspective
**Dunder methods** (short for "double underscore," e.g., `__init__`) are special methods Python calls automatically in response to certain built-in operations or syntax — they let your custom classes integrate naturally with Python's built-in behaviors (printing, comparison, length, iteration, etc.).

**Commonly used dunder methods:**
| Method | Triggered by |
|---|---|
| `__init__` | Object creation — `ClassName(...)` |
| `__str__` | `str(obj)` or `print(obj)` — human-readable representation |
| `__repr__` | `repr(obj)` — unambiguous, developer-facing representation (used as a fallback if `__str__` isn't defined) |
| `__len__` | `len(obj)` |
| `__eq__` | `obj1 == obj2` |
| `__lt__` | `obj1 < obj2` |
| `__getitem__` | `obj[key]` — indexing/subscripting |
| `__iter__` | Enables the object to be used in a `for` loop |

```python
class Book:
    def __init__(self, title, rating):
        self.title = title
        self.rating = rating

    def __str__(self):
        return f"'{self.title}' ({self.rating}★)"

    def __eq__(self, other):
        return self.title == other.title and self.rating == other.rating

b1 = Book("Node Basics", 4.2)
print(b1)   # 'Node Basics' (4.2★) — uses __str__ automatically

b2 = Book("Node Basics", 4.2)
print(b1 == b2)   # True — uses our custom __eq__, not default identity comparison
```

### Interview Perspective
**Q: What are dunder methods, and why would you implement one in your own class?**
> Special methods (like `__init__`, `__str__`, `__eq__`) that Python calls automatically for built-in operations and syntax — implementing them lets your custom objects behave naturally with Python's built-in functions and operators (printing nicely with `print()`, comparing with `==`, being iterable in a `for` loop, etc.), rather than relying on default, often unhelpful behavior (like the default `__eq__` just comparing object identity).

**Q: What's the difference between `__str__` and `__repr__`?**
> `__str__` is meant to produce a readable, user-facing string (what `print()` and `str()` use). `__repr__` is meant to produce an unambiguous, developer-facing representation — ideally one that could recreate the object if evaluated (ideally, `eval(repr(obj)) == obj`) — and it's used as a fallback when `__str__` isn't explicitly defined. In interactive sessions and debugging output, `__repr__` is what's shown by default.

⭐ **Frequently asked** — `__init__`, `__str__`, and `__eq__` are the most commonly tested dunder methods; be ready to write a class implementing at least these three from memory.

---

## 8. Abstract Classes & Interfaces

### Learning Perspective
An **abstract class** defines a **common interface** that subclasses **must** implement, but **cannot itself be instantiated directly** — it exists purely as a template/contract for its subclasses.

Python implements this via the built-in **`abc`** (Abstract Base Classes) module:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass   # no implementation — subclasses MUST provide one

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

# shape = Shape()      # TypeError — can't instantiate an abstract class directly
circle = Circle(5)     # fine — Circle implements the required area() method
```

If a subclass **fails** to implement an `@abstractmethod`, attempting to instantiate that subclass also raises a `TypeError`.

### Interview Perspective
**Q: What is an abstract class, and why would you use one?**
> A class that defines a required interface (via `@abstractmethod`) that subclasses must implement, but can't be instantiated on its own. It's used to enforce a contract across a family of related classes — guaranteeing that every subclass provides a specific method (like `area()` for different shape types), without dictating how each subclass implements it internally.

**Q: What happens if a subclass of an abstract class doesn't implement all the required abstract methods?**
> Attempting to instantiate that subclass raises a `TypeError` — Python enforces that every abstract method must have a concrete implementation somewhere in the inheritance chain before an actual object can be created.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Class vs. object | Blueprint vs. a specific instance built from it |
| `self` | Refers to the current instance; must be the method's first parameter |
| Instance vs. class attributes | Unique per object vs. shared across all instances |
| Mutable class attribute gotcha | Shared across instances unless set as an instance attribute in `__init__` |
| Inheritance | Subclass reuses/extends a superclass's attributes and methods |
| `super()` | Calls the parent class's methods, commonly used in an overridden `__init__` |
| Method overriding | Subclass provides its own implementation of an inherited method |
| Polymorphism | Same method call, different behavior per object's actual class |
| Encapsulation in Python | Convention-based — `_attr` (soft-private) vs. `__attr` (name-mangled) |
| `@property` | Attribute-like access that runs code (e.g., validation) behind the scenes |
| Instance / class / static methods | `self`-based / `cls`-based (often alt-constructors) / no access to instance or class data |
| Dunder methods | Special methods (`__init__`, `__str__`, `__eq__`) tying custom classes into Python's built-in behavior |
| `__str__` vs `__repr__` | User-facing readable string vs. unambiguous developer-facing representation |
| Abstract class | Can't be instantiated directly; enforces subclasses implement required methods |