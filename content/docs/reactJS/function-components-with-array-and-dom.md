# React — Functional Components, Arrays, and the DOM

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Props Principles

### Learning Perspective
Props aren't just "data passed to a component" — they're guided by a set of underlying **principles**:

- **Reusability** — a component receiving different props can be rendered in many different contexts, without rewriting its internals
- **Unidirectional data flow** — props always move **one direction**: parent → child. A child never sends data back up through props (communication upward requires other mechanisms, like a callback function passed down as a prop)
- **Customization** — props let a parent tailor how a child behaves or appears each time it's used, without modifying the child component's own code
- **Composition** — props (including the special `children` prop) allow components to be **combined and nested**, building complex UI out of simpler, composable pieces

**Props Default** — you can define a **default value** for a prop (traditionally via `defaultProps`), ensuring the component still renders sensibly if a parent doesn't explicitly pass that prop — improving predictability and robustness.

### Interview Perspective
**Q: What principles guide how props are used in React?**
> Reusability (same component, different data), unidirectional data flow (parent to child only), customization (tailoring a child's behavior/appearance per use), and composition (combining components together, often via `children`).

**Q: Why does React enforce unidirectional data flow with props instead of allowing two-way binding?**
> It makes data flow predictable and easier to debug — you always know data originates from a single source (a parent or ancestor) and flows downward, so when something renders incorrectly, you can trace it up the tree rather than chasing changes coming from multiple directions.

**Q: What's the benefit of setting default prop values?**
> It ensures the component behaves predictably even if a parent forgets (or chooses not) to pass a given prop, preventing `undefined`-related bugs and making the component more robust and self-contained.

---

## 2. Using `useState` with Events to Control a Child Component

### Learning Perspective
A common pattern: a **parent** component holds state (via `useState`), and passes both the **state value** and a **function to update it** down to a child as props. The child then triggers that function in response to an event (like a click), effectively letting the child **control** — or request changes to — state that actually lives in the parent.

```jsx
function Parent() {
  const [isOpen, setIsOpen] = useState(false);

  return <Child isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />;
}

function Child({ isOpen, onToggle }) {
  return (
    <button onClick={onToggle}>
      {isOpen ? "Close" : "Open"}
    </button>
  );
}
```

This is often called **"lifting state up"** — placing state in the nearest common ancestor of the components that need to read or modify it, then passing state and updater functions down as props.

### Interview Perspective
**Q: How would a child component trigger a state change that lives in its parent?**
> The parent passes an event handler function (often one that calls its own `setState`/`useState` updater) down to the child as a prop. The child calls that function in response to a user event (like a click), which updates the parent's state — since state itself can't be passed "back up," you pass a function reference down instead.

**Q: What is "lifting state up," and why is it necessary?**
> It's the pattern of moving state to the closest common ancestor of all components that need access to it, then passing the state (and functions to update it) down via props. It's necessary because React's data flow is unidirectional — sibling components can't share state directly, so a shared parent needs to own it.

---

## 3. Component Composition

### Learning Perspective
**Component composition** is the practice of combining **multiple smaller components** to build **complex functionality/UI** — rather than building one large, monolithic component.

**Principles of component composition:**
- **Abstraction principle** — a way to build reusable components that **encapsulate UI features**, hiding internal implementation details behind a clean interface
- **Reuse principle** — reuse chunks of code/components, making applications **easier to organize and maintain**
- **Hierarchy principle** — arrange components in a **hierarchy**, with clear parent-child relationships
- **Props and children** — components communicate and compose via **props**, including the special `children` prop, which lets a parent pass arbitrary nested content into a child (e.g., a `<Card>` component that renders whatever is placed between its opening and closing tags)
- **Higher-order components (HOCs)** — a function that lets you **add features** (like state management or shared logic) to a component **without modifying its implementation** directly

### Interview Perspective
**Q: What is component composition, and what principles guide it?**
> Component composition means building complex UIs by combining smaller components. It's guided by abstraction (encapsulating UI behind a clean interface), reuse (avoiding duplicated code), hierarchy (clear parent-child structure), props/children (the communication and nesting mechanism), and higher-order components (adding shared logic without touching a component's own implementation).

**Q: What's the role of the `children` prop in composition?**
> `children` lets a parent pass arbitrary nested content into a child component — e.g., `<Card><p>Some content</p></Card>` — the `Card` component receives that `<p>` as `props.children` and decides where/how to render it. It's what makes components like layout wrappers, modals, or cards genuinely reusable regardless of what's inside them.

**Q: How does a higher-order component relate to composition?**
> An HOC is itself a composition tool — it wraps an existing component to inject additional behavior or state, producing a new component, without modifying the original component's source code. It's composition applied to *behavior*, not just visual structure.

---

## 4. State Management

### Learning Perspective
**State management** involves **handling and updating data over time**, allowing components to **dynamically change their appearance and behavior** in response to user actions or other events. It's the mechanism that makes an interface feel "alive" rather than static.

**State** itself is the **condition of a component at a specific time** — it holds information that influences the component's behavior and how it renders, based on that current information.

### Interview Perspective
**Q: What does "state management" mean in the context of a React component?**
> It's the practice of tracking data that can change over a component's lifetime, and updating that data in response to events — user interaction, network responses, timers, etc. — so the UI can dynamically reflect the current state of the application rather than staying static.

---

## 5. The `useState` Hook

### Learning Perspective
The **`useState` hook** is a built-in React Hook that lets **functional components manage state locally** — the functional-component equivalent of `this.state`/`this.setState()` in class components.

It provides a way to **declare state variables** and **update them**; when the state changes, **React automatically re-renders the component** to reflect the update.

**Syntax pattern:**
1. Call the `useState` function, passing in the **initial state value** as a parameter
2. Assign the return value to a **`const` array variable**, using **array destructuring**
3. The returned array has exactly **two values**: the **state variable itself**, and an **updater function**, conventionally named with the `set` prefix

```jsx
const [count, setCount] = useState(0);
```

Here, `count` is the current state value (starting at `0`), and `setCount` is the function used to update it — calling `setCount(newValue)` triggers React to update `count` and re-render the component.

### Interview Perspective
**Q: Walk me through the `useState` syntax and what each part does.**
> You call `useState(initialValue)`, which returns an array with exactly two elements: the current state value and an updater function. You destructure that array into two `const` variables — by convention, the state variable and its updater prefixed with `set` (e.g., `const [count, setCount] = useState(0)`). Calling the updater function changes the state and triggers a re-render.

**Q: Why is the return value destructured into a `const` array rather than, say, an object?**
> `useState` returns a fixed-order array specifically so you can name the two values however you like via array destructuring (rather than being locked into fixed property names, as you would be with object destructuring) — this is why the convention of `[value, setValue]` naming works cleanly for many different state variables in the same component.

**Q: Why use `const` for the destructured variables, since the state clearly changes?**
> The *binding* itself never changes — you never reassign `count` directly. Instead, `setCount` triggers React to call the component function again, which runs `useState` again and returns a **new** `count` value scoped to that render. Each render gets its own fresh `const count`, so `const` is entirely appropriate.

⭐ **Very frequently asked** — be ready to write this syntax from memory and explain *why* `const` and array destructuring are used, not just recite the pattern.

---

## 6. Functional Component Lifecycle

### Learning Perspective
Functional components go through the same conceptual three lifecycle phases as class components, but implemented differently — primarily via Hooks (especially `useEffect`) rather than dedicated lifecycle methods.

**1. Mounting phase**
- React **initializes** the component, preparing it for rendering on the DOM
- **Initialization** — React runs the function body of the component, setting up its initial structure and behavior
- **State initialization** — React uses the `useState` hook to declare and initialize state variables
- **Side effects** — steps like data fetching, subscriptions, or DOM manipulation, handled via the `useEffect` hook with an **empty dependency array** (`[]`), ensuring the effect runs only once, right after the initial mount

**2. Updating phase**
- React **responds to changes** in the component's state or props by **re-invoking the function body** of the component — i.e., React re-runs the whole function and **re-evaluates the JSX** it returns, to determine what (if anything) needs to change in the actual DOM

**3. Unmounting phase**
- React executes **cleanup operations** when removing the component from the DOM — e.g., clearing timers, unsubscribing from subscriptions, or canceling in-flight network requests, typically handled via a **cleanup function returned from `useEffect`**

### Interview Perspective
**Q: What are the three lifecycle phases of a functional component, and how are they generally handled?**
> Mounting (initial render, state setup, and one-time side effects via `useEffect` with an empty dependency array), updating (React re-invokes the function body and re-evaluates JSX in response to state/prop changes), and unmounting (cleanup operations, typically via a function returned from `useEffect`, when the component is removed from the DOM).

**Q: What actually happens during the "updating" phase — does React re-run the entire component function?**
> Yes — unlike class components with granular lifecycle methods, a functional component's entire function body re-runs whenever its state or props change, producing new JSX. React then compares this against the previous render (via the virtual DOM/reconciliation — see Section 8) to figure out the minimal set of actual DOM changes needed, rather than re-rendering the real DOM wholesale.

**Q: How would you replicate "mounting-only" behavior (like a class component's `componentDidMount`) using Hooks?**
> `useEffect(() => { /* side effect */ }, [])` — passing an empty dependency array tells React the effect has no dependencies to watch, so it only runs once, right after the initial mount, not on every re-render.

⭐ **Very frequently asked** — the `useEffect` dependency array's role in each lifecycle phase is one of the highest-yield React interview topics.

---

## 7. Working with Arrays: `map()` and `forEach()`

### Learning Perspective
Two closely related but distinctly-purposed array methods, both essential in React for handling lists of data:

- **`map()`** — iterates over each element of an array, applying a function to each, and **returns a new array**. In React, `map()` is commonly used to transform an array of data into an **array of React elements** for rendering (e.g., turning an array of objects into a list of `<li>` items).
- **`forEach()`** — iterates over each element and **executes a callback function**, but does **not** create or return a new array — it's used purely for **side effects** (e.g., logging, pushing into an external array, calling an API for each item).

**Rendering an array in JSX:**
```jsx
function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

This is the standard pattern for **rendering an array** — dynamically generating and displaying elements based on the contents of a data array, typically via `map()`.

**Also relevant here:**
- **Array** — a JavaScript data structure storing multiple values in a single variable
- **Array literal** — the `[element1, element2, ...]` syntax for defining an array directly
- **Array destructuring** — extracting values from an array into individual variables (the same mechanism `useState`'s return value relies on — see Section 5)

### Interview Perspective
**Q: What's the difference between `map()` and `forEach()`, and why does React specifically favor `map()` for rendering lists?**
> `map()` returns a new array built by transforming each element; `forEach()` just runs a callback for side effects and returns `undefined`. React needs `map()` when rendering lists because JSX requires an actual array of elements to render — `forEach()` can't produce that returned array, so it's unsuitable for generating JSX output, even though both methods iterate the same way.

**Q: Why does each item in a `map()`-rendered list need a `key` prop?**
> React uses the `key` to track which items have changed, been added, or been removed between renders, enabling efficient reconciliation (updating only what actually changed rather than re-rendering the whole list). Keys should be stable, unique identifiers (like a database ID) — not array index, when the list can be reordered/filtered, since index-based keys can cause subtle rendering bugs.

---

## 8. The DOM and React's Virtual DOM

### Learning Perspective
**The DOM (Document Object Model)** is an interface representing a web page/document as a **tree-like structure**, allowing programmatic access to, and dynamic manipulation of, a document's **content, structure, and style**. **Elements** — the building blocks of HTML documents — become nodes in this tree, and **attributes** provide additional information about those elements (properties, styles, behavior).

**Directly manipulating the real DOM is comparatively slow** — every change can trigger layout recalculation and repainting in the browser. React addresses this with the **Virtual DOM**:

- **Virtual DOM** — an **abstraction of the actual DOM**, implemented **in memory**. It's a lightweight JavaScript representation of what the real DOM *should* look like.
- **Reconciliation** — React's process of keeping the virtual DOM **in sync with the real DOM**. When state or props change, React builds a new virtual DOM tree, **compares it (diffs it)** against the previous version, and calculates the **minimal set of actual changes** needed.
- **Selective updates** — React then updates **only the necessary parts** of the real DOM, rather than re-rendering everything — significantly **improving performance**, especially in applications where only specific components or elements need to change on a given update.

### Interview Perspective
**Q: What is the virtual DOM, and why does React use it?**
> The virtual DOM is an in-memory, lightweight JavaScript representation of the real DOM. React uses it because direct DOM manipulation is comparatively expensive — by building a new virtual DOM tree on each update and diffing it against the previous one (reconciliation), React can calculate the minimal set of real DOM changes needed and apply only those, rather than re-rendering the entire page.

**Q: What is reconciliation?**
> The process by which React compares a newly rendered virtual DOM tree to the previous one, determines what actually changed, and updates only those specific parts of the real DOM — keeping the virtual DOM and real DOM in sync efficiently rather than doing a full re-render on every state change.

**Q: Does using the virtual DOM mean React never touches the real DOM directly?**
> No — React still updates the real DOM; the virtual DOM's role is to make those updates efficient and minimal. React computes *what* changed via the virtual DOM comparison, then applies just those specific changes to the actual DOM, rather than tearing down and rebuilding everything on every update.

⭐ **Extremely frequently asked** — the virtual DOM / reconciliation explanation is one of the single most common React interview questions; be ready to give a clear, concise answer without rambling.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Abstraction principle** | A principle for building reusable components that encapsulate UI features |
| **Array** | A JavaScript data structure storing multiple values in a single variable |
| **Array destructuring** | Extracting values from an array and assigning them to individual variables |
| **Array literal** | Syntax for creating an array by enclosing a comma-separated list of elements in square brackets |
| **Attributes** | Provide additional information about elements — properties, styles, or behavior |
| **Component composition** | Combining multiple smaller components to create complex functionality |
| **Document Object Model (DOM)** | An interface representing an HTML document as a tree-like structure |
| **Elements** | The building blocks of HTML documents |
| **`forEach()`** | Iterates over each array element, executing a callback function, without returning a new array |
| **Hierarchy principle** | Arranging components in a hierarchy, with parent and child components |
| **Higher-order component** | A function that adds features (state, logic) to a component without modifying its implementation |
| **Hook** | A function enabling code-logic reuse across components without changing component hierarchy or adding nesting |
| **Initialization** | The step where React runs a functional component's function body, setting up its initial structure/behavior |
| **`map()`** | Iterates over array elements, commonly used to return a new array of React elements |
| **Mounting phase** | The lifecycle phase where React initializes a functional component, preparing it for DOM rendering |
| **Props Default** | A default value for a prop (via `defaultProps`), ensuring predictable rendering if the prop isn't passed |
| **Properties (props)** | The mechanism for passing data from parent to child components |
| **Rendering array** | Dynamically generating/displaying elements based on array contents, typically via `map()` |
| **Reuse principle** | Reusing chunks of code to make applications easier to organize and maintain |
| **Side effects** | Steps like data fetching, subscriptions, or DOM manipulation, handled via `useEffect` with an empty dependency array |
| **State** | A component's condition at a specific time, holding information that influences its behavior/rendering |
| **State management** | Handling and updating data over time so components can dynamically change appearance/behavior |
| **State initialization** | The step where React uses `useState` to declare and initialize state variables |
| **Updating phase** | The lifecycle phase where React re-invokes the function body in response to state/prop changes |
| **Unmounting phase** | The lifecycle phase where React executes cleanup operations when removing a component from the DOM |
| **`useState` hook** | A built-in Hook letting functional components declare and update local state, triggering re-renders on change |
| **Virtual DOM** | An in-memory abstraction of the real DOM, kept in sync via React's reconciliation process |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Props principles | Reusability, unidirectional data flow, customization, composition |
| Controlling a child with `useState` | Parent owns state, passes value + updater function down as props |
| Lifting state up | Move state to the nearest common ancestor that needs to share it |
| Component composition principles | Abstraction, reuse, hierarchy, props/children, higher-order components |
| `useState` syntax | `const [value, setValue] = useState(initialValue)` — array destructuring |
| Mounting phase | Initialize component, set up state, run one-time side effects (`useEffect`, `[]`) |
| Updating phase | React re-invokes the function body and re-evaluates JSX |
| Unmounting phase | Cleanup operations, typically via a function returned from `useEffect` |
| `map()` vs `forEach()` | Returns a new array (used for rendering) vs. side-effects only, no return |
| DOM | Tree-like interface for accessing/manipulating a document's content, structure, style |
| Virtual DOM | In-memory abstraction of the real DOM; kept in sync via reconciliation |
| Reconciliation | Diffing new vs. old virtual DOM to update only the necessary real DOM parts |