# JavaScript Fundamentals

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general industry knowledge, matching Module 5's "JS Fundamentals" section of your NAV. Worth cross-checking against your actual course material for alignment, same as the HTML/CSS files. Given how heavily JavaScript is tested in interviews, this file goes deeper than the HTML/CSS ones.

---

## 1. Variables: `var`, `let`, `const`

### Learning Perspective
JavaScript has three ways to declare variables, each with different scoping and reassignment rules:

- **`var`** — function-scoped (or global if declared outside a function), **hoisted** and initialized to `undefined`. Can be redeclared and reassigned. Largely considered legacy/outdated in modern code.
- **`let`** — **block-scoped** (confined to the nearest `{ }`), hoisted but **not initialized** (sits in the "temporal dead zone" until its declaration line runs). Can be reassigned, but not redeclared in the same scope.
- **`const`** — block-scoped like `let`, **cannot be reassigned** after initialization. Note: this means the *binding* is constant, not the *value* — a `const` object or array can still have its contents mutated, just not be reassigned to a different object/array entirely.

```js
var x = 1;    // function-scoped, avoid in modern code
let y = 2;    // block-scoped, reassignable
const z = 3;  // block-scoped, not reassignable

const obj = { a: 1 };
obj.a = 2;      // fine — mutating contents
obj = { a: 3 }; // TypeError — reassigning the binding itself
```

### Interview Perspective
**Q: What's the difference between `var`, `let`, and `const`?**
> `var` is function-scoped, hoisted, and initialized as `undefined` — largely avoided in modern code. `let` is block-scoped, reassignable, but not redeclarable in the same scope. `const` is block-scoped and can't be reassigned — though objects/arrays declared with `const` can still have their contents mutated, since only the binding is frozen, not the value itself.

**Q: What is the "temporal dead zone"?**
> The period between entering a scope and the actual `let`/`const` declaration line executing, during which the variable exists but can't be accessed — attempting to reference it throws a `ReferenceError`. It's why `let`/`const` behave more predictably than `var`, which silently returns `undefined` if accessed before its declaration.

⭐ **Very frequently asked** — this is one of the most common JS fundamentals questions; know the scoping and hoisting distinctions cold.

---

## 2. Data Types

### Learning Perspective
JavaScript has two categories of types:

**Primitive types** (immutable, compared by value):
- `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`

**Reference type:**
- `object` (which includes arrays, functions, and plain objects — all technically objects under the hood, compared by reference, not value)

**Important nuances:**
- `typeof null` returns `"object"` — a long-standing, well-known JavaScript quirk/bug that's never been fixed for backward-compatibility reasons
- `undefined` means a variable has been declared but not assigned a value; `null` is an intentional, explicit "no value"
- JavaScript is **dynamically typed** — variables aren't bound to a type; the same variable can hold different types over its lifetime

### Interview Perspective
**Q: What's the difference between `null` and `undefined`?**
> `undefined` means a variable has been declared but hasn't been assigned a value yet — it's JavaScript's default. `null` is an explicit, intentional assignment representing "no value" or "empty" — a developer sets it deliberately, whereas `undefined` usually just means "nothing has happened here yet."

**Q: Why does `typeof null` return `"object"`?**
> It's a bug from JavaScript's original implementation that was never fixed, because fixing it could break existing code across the web. It's a well-known quirk, not a logical design decision.

**Q: What's the difference between primitive and reference types in JavaScript?**
> Primitives (string, number, boolean, etc.) are compared and copied **by value** — each variable holds its own independent copy. Objects (including arrays and functions) are compared and copied **by reference** — variables hold a reference to the same underlying object in memory, so mutating it through one reference affects all references to it.

---

## 3. Equality: `==` vs `===`

### Learning Perspective
- **`===` (strict equality)** — compares both **value and type**, with no type coercion. Generally the recommended default.
- **`==` (loose equality)** — compares values **after type coercion**, which can produce surprising, hard-to-predict results (e.g., `0 == "0"` is `true`, `null == undefined` is `true`, but `null == 0` is `false`).

```js
0 == "0"        // true  (coercion)
0 === "0"       // false (different types)
null == undefined  // true
null === undefined // false
NaN === NaN     // false! (NaN is never equal to anything, including itself)
```

### Interview Perspective
**Q: What's the difference between `==` and `===`, and which should you use?**
> `===` compares value and type with no coercion; `==` coerces types before comparing, which can lead to unpredictable, error-prone results. Best practice is to default to `===` unless there's a specific, deliberate reason to allow coercion.

**Q: Why is `NaN === NaN` false, and how would you actually check if a value is `NaN`?**
> `NaN` represents "not a number," and by IEEE 754 spec, it's defined as never equal to anything, including itself. To reliably check for it, use `Number.isNaN(value)` (or `Object.is(value, NaN)`) rather than direct equality comparison.

---

## 4. Functions

### Learning Perspective
JavaScript supports multiple function syntaxes with meaningful behavioral differences:

- **Function declaration** — hoisted entirely (can be called before its definition in the code):
  ```js
  function greet(name) { return `Hello, ${name}`; }
  ```
- **Function expression** — assigned to a variable; **not** hoisted in a callable way (the variable is hoisted per `var`/`let` rules, but the function assignment happens at that line):
  ```js
  const greet = function(name) { return `Hello, ${name}`; };
  ```
- **Arrow function** — concise syntax; **does not have its own `this`, `arguments`, or `super`** — it inherits `this` lexically from its surrounding scope, which is a key behavioral difference from regular functions:
  ```js
  const greet = (name) => `Hello, ${name}`;
  ```

**Default parameters and rest parameters:**
```js
function greet(name = "friend") { return `Hello, ${name}`; }
function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }
```

### Interview Perspective
**Q: What's the key behavioral difference between a regular function and an arrow function?**
> Arrow functions don't have their own `this` — they inherit `this` lexically from the enclosing scope at the time they're defined, rather than depending on how they're called. Regular functions get their own `this`, determined dynamically by their call-site (unless bound otherwise). This makes arrow functions especially useful inside callbacks where you want to preserve the outer `this`.

**Q: Are function declarations and function expressions both hoisted the same way?**
> No — function declarations are fully hoisted, including their implementation, so they can be called before they appear in the code. Function expressions are only hoisted as a variable (per `var`/`let`/`const` rules) — the function itself isn't available until the assignment line actually executes.

⭐ **Very frequently asked** — the arrow function `this` behavior is one of the most commonly tested JS concepts.

---

## 5. Scope & Hoisting

### Learning Perspective
**Scope** determines where a variable is accessible:
- **Global scope** — accessible anywhere in the program
- **Function scope** — accessible only within the function it's declared in (`var`-style)
- **Block scope** — accessible only within the nearest enclosing `{ }` (`let`/`const`-style)

**Hoisting** is JavaScript's behavior of processing variable and function declarations **before** executing code, effectively "moving" declarations (not initializations) to the top of their scope during compilation.
- `var` declarations are hoisted and initialized to `undefined`
- `let`/`const` declarations are hoisted but left uninitialized (temporal dead zone)
- Function declarations are hoisted **with their full body**

**Lexical scope / closures** — a function retains access to variables from the scope in which it was **defined**, even after that outer scope has finished executing. This is the foundation of **closures**:

```js
function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 — `count` persists between calls, private to this closure
```

### Interview Perspective
**Q: What is a closure, and why is it useful?**
> A closure is a function that retains access to variables from its outer (enclosing) scope, even after that outer function has returned. It's useful for creating private state (data encapsulation without classes), function factories, and memoization — the classic example being a counter function where `count` stays private and persistent between calls.

**Q: Explain hoisting, and how it differs between `var`, `let`/`const`, and function declarations.**
> Hoisting moves declarations to the top of their scope before execution. `var` is hoisted and initialized to `undefined`, so accessing it early gives `undefined` rather than an error. `let`/`const` are hoisted but not initialized — accessing them before their declaration line throws a `ReferenceError` (temporal dead zone). Function declarations are hoisted with their entire body, so they're fully callable before their point of definition in the code.

---

## 6. `this` Keyword

### Learning Perspective
`this` refers to the **execution context** — but critically, its value is determined by **how a function is called**, not where it's defined (except for arrow functions, which inherit `this` lexically — see Section 4).

**Common `this` binding rules:**
- **Default binding** — in a regular function call, `this` is `undefined` in strict mode (or the global object in non-strict mode)
- **Implicit binding** — when called as a method (`obj.method()`), `this` refers to `obj`
- **Explicit binding** — using `call()`, `apply()`, or `bind()` to manually set `this`
- **New binding** — when called with `new`, `this` refers to the newly created object
- **Arrow functions** — ignore all the above rules; they use `this` from their enclosing lexical scope

```js
const obj = {
  name: "Alice",
  greet() { return `Hi, I'm ${this.name}`; },       // implicit binding — works
  greetArrow: () => `Hi, I'm ${this.name}`,          // arrow — `this` is NOT obj here
};
```

### Interview Perspective
**Q: How is `this` determined in JavaScript?**
> `this` is determined by *how* a function is called (its call-site), not where it's defined — implicit binding for method calls, explicit binding via `call`/`apply`/`bind`, `new` binding for constructors, and default binding (undefined/global) for plain function calls. Arrow functions are the exception — they don't bind their own `this` at all, inheriting it lexically from the surrounding scope instead.

**Q: What's the difference between `call()`, `apply()`, and `bind()`?**
> All three let you explicitly set `this` for a function call. `call(thisArg, arg1, arg2, ...)` invokes the function immediately with individual arguments. `apply(thisArg, [argsArray])` invokes immediately but takes arguments as an array. `bind(thisArg, ...)` doesn't invoke immediately — it returns a **new function** with `this` permanently bound, to be called later.

---

## 7. Objects & Arrays

### Learning Perspective
**Objects** are collections of key-value pairs:
```js
const person = { name: "Alice", age: 30 };
person.age;        // dot notation
person["age"];      // bracket notation (needed for dynamic/computed keys)
```

**Common object methods:**
- `Object.keys(obj)` — array of keys
- `Object.values(obj)` — array of values
- `Object.entries(obj)` — array of `[key, value]` pairs
- `Object.assign(target, source)` — shallow-merges properties into target
- **Spread syntax** — `{ ...obj, newProp: 1 }` — creates a shallow copy with additions/overrides

**Arrays** are ordered, index-based collections. Key methods worth knowing well for interviews:
- **`map()`** — transforms each element, returns a **new array** of the same length
- **`filter()`** — returns a **new array** containing only elements that pass a test
- **`reduce()`** — accumulates array elements into a single value (sum, object, another array, etc.)
- **`forEach()`** — iterates for side effects only; **returns `undefined`**, doesn't produce a new array
- **`find()`** — returns the **first** matching element (or `undefined`)
- **`some()` / `every()`** — return a boolean: whether *any*/*all* elements pass a test

```js
const nums = [1, 2, 3, 4];
nums.map(n => n * 2);              // [2, 4, 6, 8]
nums.filter(n => n % 2 === 0);     // [2, 4]
nums.reduce((sum, n) => sum + n, 0); // 10
```

### Interview Perspective
**Q: What's the difference between `map()` and `forEach()`?**
> `map()` returns a new array built from transforming each element, making it ideal for creating derived data. `forEach()` just iterates for side effects (like logging or mutating something external) and returns `undefined` — it shouldn't be used when you actually need a new array back.

**Q: Explain how `reduce()` works, with an example beyond summing numbers.**
> `reduce()` walks through an array, applying a callback that accumulates a single result across all elements — the callback receives the running accumulator and the current element. Beyond summing, it's commonly used to transform an array into an object (e.g., grouping items by a property) or to flatten nested arrays.

**Q: What's the difference between shallow copy and deep copy, and how does spread syntax relate?**
> A shallow copy (e.g., via spread `{...obj}` or `Object.assign`) copies top-level properties, but nested objects/arrays are still shared by reference — mutating a nested object in the copy also mutates the original. A deep copy fully duplicates nested structures too (commonly via `structuredClone()`, or historically `JSON.parse(JSON.stringify(obj))`, which has its own limitations with functions, dates, etc.).

⭐ **Very frequently asked** — array method behavior (mutating vs. non-mutating, return values) is one of the highest-yield JS interview topics.

---

## 8. Array Mutating vs. Non-Mutating Methods

### Learning Perspective
A common source of bugs: some array methods **mutate the original array**, others return a **new array** and leave the original untouched.

**Mutating (changes the original array):**
- `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`

**Non-mutating (returns a new array/value):**
- `map()`, `filter()`, `reduce()`, `slice()`, `concat()`, spread syntax

```js
const arr = [3, 1, 2];
arr.sort();          // mutates arr in place — [1, 2, 3]

const arr2 = [3, 1, 2];
const sorted = [...arr2].sort(); // copies first, leaving arr2 untouched
```

### Interview Perspective
**Q: Why does it matter whether an array method mutates the original array?**
> Mutating methods can introduce subtle bugs, especially in frameworks like React that rely on detecting state changes by reference — mutating an array in place doesn't create a new reference, so the framework may not detect the change and won't re-render. Understanding which methods mutate is essential for predictable state management.

**Q: How would you sort an array without mutating the original?**
> Create a shallow copy first (e.g., `[...arr].sort()` or `arr.slice().sort()`), then sort the copy — leaving the original array untouched.

---

## 9. Asynchronous JavaScript: Callbacks, Promises, Async/Await

### Learning Perspective
JavaScript is **single-threaded**, but handles asynchronous operations (network requests, timers, file I/O) via the **event loop**, without blocking the main thread.

**Evolution of async patterns:**

1. **Callbacks** — a function passed to be executed later, when an async operation completes. Prone to **"callback hell"** — deeply nested, hard-to-read callback chains when multiple async steps depend on each other.
   ```js
   getData(function(result) {
     processData(result, function(processed) {
       saveData(processed, function() { console.log("done"); });
     });
   });
   ```

2. **Promises** — an object representing the eventual completion (or failure) of an async operation, with three states: **pending**, **fulfilled**, or **rejected**. Chained via `.then()`/`.catch()`, avoiding deep nesting.
   ```js
   getData()
     .then(result => processData(result))
     .then(processed => saveData(processed))
     .then(() => console.log("done"))
     .catch(error => console.error(error));
   ```

3. **`async`/`await`** — syntactic sugar over Promises, letting async code **read like synchronous code**, while still being non-blocking under the hood.
   ```js
   async function run() {
     try {
       const result = await getData();
       const processed = await processData(result);
       await saveData(processed);
       console.log("done");
     } catch (error) {
       console.error(error);
     }
   }
   ```

**The event loop, briefly:** the JS engine runs synchronous code first (the **call stack**), then processes queued async callbacks — **microtasks** (Promise callbacks) are processed before **macrotasks** (e.g., `setTimeout` callbacks), which is why Promise resolutions often "jump ahead" of timers even with a 0ms delay.

### Interview Perspective
**Q: What's the difference between callbacks, Promises, and async/await?**
> They're an evolution of the same underlying idea — handling asynchronous operations. Callbacks are simple but lead to deeply nested "callback hell" for sequential async steps. Promises represent an eventual result with cleaner `.then()`/`.catch()` chaining. `async`/`await` is syntactic sugar over Promises that lets async code read like synchronous code, typically the most readable and preferred modern approach.

**Q: What are the three states of a Promise?**
> Pending (not yet resolved), fulfilled (completed successfully), and rejected (failed). Once a Promise settles (fulfilled or rejected), it can't change state again.

**Q: How does the event loop prioritize microtasks vs. macrotasks?**
> Microtasks (like Promise `.then()` callbacks) are processed before macrotasks (like `setTimeout` callbacks), and the microtask queue is fully drained before the next macrotask runs — which is why a `Promise.resolve().then(...)` will run before a `setTimeout(..., 0)`, even though both are "async."

⭐ **Extremely frequently asked** — expect at least one question on async patterns in almost any JS interview; be ready to write a small async/await example with error handling on the spot.

---

## 10. Prototypes & Object-Oriented JavaScript

### Learning Perspective
JavaScript uses **prototypal inheritance** — objects can inherit properties/methods directly from other objects via an internal link called the **prototype chain**, rather than class-based inheritance found in languages like Java (though ES6 `class` syntax provides a more familiar-looking layer on top of the same underlying prototype mechanism).

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound.`;
};

const dog = new Animal("Rex");
dog.speak(); // "Rex makes a sound." — found via the prototype chain
```

**ES6 `class` syntax** — cleaner syntax for the same prototypal mechanism underneath:
```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound.`; }
}
class Dog extends Animal {
  speak() { return `${this.name} barks.`; }  // overrides parent method
}
```

**Key OOP concepts in JS:**
- **`extends`** — sets up inheritance between classes
- **`super`** — calls the parent class's constructor or methods
- **Encapsulation** — achievable via closures (pre-ES2022) or, more recently, native **private class fields** (`#fieldName`)

### Interview Perspective
**Q: What's the difference between classical (class-based) inheritance and JavaScript's prototypal inheritance?**
> Classical inheritance (e.g., Java) defines rigid, compile-time class hierarchies. JavaScript's prototypal inheritance links objects directly to other objects at runtime via the prototype chain — when a property/method isn't found on an object, JS looks up its prototype chain until it finds it (or reaches `null`). ES6 `class` syntax is just cleaner syntax over this same underlying prototype mechanism — it doesn't change how inheritance actually works internally.

**Q: How would you achieve private state on a class in modern JavaScript?**
> Using native private class fields, prefixed with `#` (e.g., `#balance`), which are only accessible from within the class itself — not from outside instances. Before this was standardized, private-like behavior was commonly simulated with closures.

---

## 11. DOM Manipulation & Events

### Learning Perspective
JavaScript interacts with the **DOM** (see the HTML notes for the DOM concept itself) to dynamically read, create, modify, and remove page content.

**Common DOM selection methods:**
- `document.getElementById(id)` — single element by ID
- `document.querySelector(selector)` — first element matching a CSS selector
- `document.querySelectorAll(selector)` — all matching elements (returns a `NodeList`, not a true array)

**Common manipulation:**
```js
const el = document.querySelector(".title");
el.textContent = "New Text";       // sets text content
el.classList.add("active");        // adds a CSS class
el.style.color = "navy";           // sets an inline style
document.createElement("div");     // creates a new element (not yet attached)
parent.appendChild(newEl);         // attaches it to the DOM
```

**Events:**
```js
button.addEventListener("click", function(event) {
  console.log("Clicked!", event.target);
});
```

**Event bubbling and delegation:**
- Events **bubble** upward from the target element through its ancestors by default
- **Event delegation** exploits this: attach a single listener to a common parent, and check `event.target` to determine which child actually triggered it — more efficient than attaching individual listeners to many child elements, and automatically works for dynamically added children

### Interview Perspective
**Q: What is event delegation, and why is it useful?**
> Event delegation attaches a single event listener to a common ancestor rather than individual listeners on many child elements, relying on event bubbling — the listener inspects `event.target` to determine which specific child triggered it. It's more memory-efficient for large lists of elements, and automatically handles dynamically added children without needing to reattach listeners.

**Q: What's the difference between `event.target` and `event.currentTarget`?**
> `event.target` is the actual element that triggered the event (e.g., the specific `<li>` clicked). `event.currentTarget` is the element the listener is actually attached to (e.g., the parent `<ul>`, in a delegation scenario) — these can differ significantly when using event delegation.

---

## 12. ES6+ Features Worth Knowing

### Learning Perspective
A grab-bag of modern JavaScript features that come up constantly in both real code and interviews:

- **Template literals** — string interpolation with backticks: `` `Hello, ${name}!` ``
- **Destructuring** — extracting values from objects/arrays into variables concisely:
  ```js
  const { name, age } = person;
  const [first, second] = arr;
  ```
- **Spread/rest syntax** — `...` expands (spread) or collects (rest) values:
  ```js
  const combined = [...arr1, ...arr2];
  function sum(...nums) { /* nums is an array */ }
  ```
- **Optional chaining (`?.`)** — safely access nested properties without manual null-checks at every level:
  ```js
  user?.address?.city  // undefined instead of throwing, if any link is null/undefined
  ```
- **Nullish coalescing (`??`)** — provides a fallback **only** for `null`/`undefined`, unlike `||` which also falls back on any other falsy value (`0`, `""`, `false`):
  ```js
  const count = input ?? 0;   // only falls back if input is null/undefined
  const count2 = input || 0;  // also falls back if input is 0, "", false — often wrong!
  ```
- **Modules (`import`/`export`)** — native way to split code across files:
  ```js
  export function greet() { /* ... */ }
  import { greet } from "./utils.js";
  ```

### Interview Perspective
**Q: What's the difference between `??` (nullish coalescing) and `||` (logical OR) when providing a default value?**
> `||` falls back to the default for **any** falsy value — `0`, `""`, `false`, `NaN`, `null`, and `undefined` — which can cause bugs when `0` or `""` are actually valid, intentional values. `??` only falls back specifically for `null` or `undefined`, making it the safer choice when a legitimate falsy value should be preserved.

**Q: What does optional chaining (`?.`) solve?**
> It lets you safely access deeply nested properties without manually checking each level for `null`/`undefined` first — instead of `user && user.address && user.address.city`, you write `user?.address?.city`, which short-circuits to `undefined` the moment any link in the chain is nullish, rather than throwing a `TypeError`.

⭐ **Frequently asked** — the `??` vs `||` distinction is a common "gotcha" question, especially with the `0`/`""` falsy-value trap.

---

## 13. Error Handling

### Learning Perspective
```js
try {
  riskyOperation();
} catch (error) {
  console.error("Something went wrong:", error.message);
} finally {
  cleanup(); // always runs, regardless of success/failure
}
```

- **`try`** — code that might throw an error
- **`catch`** — handles the error if one is thrown
- **`finally`** — runs regardless of whether an error occurred (commonly used for cleanup, like closing a connection)
- **`throw`** — manually raises an error (can throw any value, but throwing an `Error` object — or subclass — is best practice, since it captures a stack trace)
- **Custom errors** — extending the built-in `Error` class for domain-specific error types:
  ```js
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  ```

**With async code**, `try`/`catch` works naturally with `await` (as shown in Section 9), but **does not** catch errors inside unrelated Promise chains unless they're properly `await`ed or `.catch()`-handled.

### Interview Perspective
**Q: How does error handling work with async/await, compared to Promises?**
> With `async`/`await`, you can wrap `await` calls in a standard `try`/`catch` block, just like synchronous code — any rejected Promise being awaited throws, and `catch` handles it. With plain Promises, you handle errors via `.catch()` chained onto the Promise. Both approaches are handling the same underlying rejection mechanism, just with different syntax.

**Q: Why might you create a custom error class instead of just throwing a string or plain object?**
> Custom error classes (extending `Error`) preserve stack traces, integrate properly with `try`/`catch`/`instanceof` checks, and let you attach domain-specific properties/behavior (e.g., an error code) — making errors easier to distinguish, debug, and handle differently based on type, compared to throwing a generic string that loses debugging context.

---

## 14. `null`/`undefined` Checks & Truthy/Falsy Values

### Learning Perspective
JavaScript coerces values to booleans in conditional contexts (`if`, `&&`, `||`, ternaries).

**Falsy values (there are exactly eight):**
`false`, `0`, `-0`, `0n` (BigInt zero), `""` (empty string), `null`, `undefined`, `NaN`

**Everything else is truthy** — including, notably, `"0"` (non-empty string), `[]` (empty array), and `{}` (empty object), which surprise many developers since they're falsy-*seeming* but are actually objects/truthy.

### Interview Perspective
**Q: Name the falsy values in JavaScript.**
> `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN` — that's the complete list. Everything else, including `[]` and `{}`, is truthy.

**Q: Why is `if ([])` true, even though an empty array might seem "empty" or "falsy"?**
> Because arrays (and objects) are always truthy, regardless of their contents — only the eight specific primitive falsy values listed above are falsy. This is a common source of bugs when developers assume "empty" collections behave like falsy values.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| `var` / `let` / `const` | Function-scoped, legacy vs. block-scoped, reassignable vs. block-scoped, not reassignable |
| `null` vs `undefined` | Intentional "no value" vs. "not yet assigned" |
| `==` vs `===` | Coerces types vs. strict, no coercion — default to `===` |
| Arrow vs. regular functions | Arrow: no own `this`, inherits lexically; regular: `this` depends on call-site |
| Closures | Function retains access to its defining scope's variables even after that scope exits |
| `this` binding | Determined by call-site (implicit/explicit/`new`/default); arrow functions ignore this and use lexical `this` |
| `map`/`filter`/`reduce` vs `forEach` | Return new arrays/values vs. side-effects only, returns `undefined` |
| Mutating vs. non-mutating array methods | `push`/`sort`/`splice` mutate; `map`/`filter`/`slice` return new arrays |
| Callbacks → Promises → async/await | Increasing readability/maintainability for handling async operations |
| Microtasks vs. macrotasks | Promise callbacks run before `setTimeout` callbacks |
| Prototypal inheritance | Objects link to other objects via prototype chain; ES6 `class` is sugar over this |
| Event delegation | One listener on a parent, using `event.target` to identify the actual child triggered |
| `??` vs `||` | `??` only falls back on `null`/`undefined`; `||` falls back on any falsy value |
| Falsy values | `false, 0, -0, 0n, "", null, undefined, NaN` — exactly eight, everything else is truthy |

---

*Notes organized for both conceptual understanding and rapid interview recall. Star (⭐) topics indicate areas frequently probed in technical interviews — and in JavaScript, that's most of them.*