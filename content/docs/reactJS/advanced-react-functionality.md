# React — Advanced Functionality (Effects, Forms, Redux, Async)

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. The `useEffect` Hook & Dependencies

### Learning Perspective
The **`useEffect` hook** enables the execution of **side effects** within functional components — operations you need to run as a byproduct of rendering, but that aren't part of the pure rendering logic itself: fetching data from an API, subscribing to events, manipulating the DOM directly, or setting timers.

**Dependencies** — in `useEffect`, dependencies refer to the **variables or values that determine when `useEffect` should run**. They're passed as the second argument, in an array:

```jsx
useEffect(() => {
  // side effect logic
}, [dependency1, dependency2]);
```

**Three common dependency-array patterns:**
- **No array at all** — the effect runs after **every** render
- **Empty array `[]`** — the effect runs **only once**, right after the initial mount (equivalent to "mounting phase" behavior)
- **Array with values `[dep1, dep2]`** — the effect runs on mount, and **again whenever any listed dependency changes** between renders

**Cleanup:** returning a function from `useEffect` lets you define cleanup logic (e.g., unsubscribing, clearing a timer), which React runs before the effect re-runs, and again when the component unmounts.

### Interview Perspective
**Q: What is `useEffect`, and what role does the dependency array play?**
> `useEffect` lets functional components run side effects — things like data fetching, subscriptions, or DOM manipulation — that shouldn't happen during the pure render itself. The dependency array controls *when* the effect re-runs: omitted entirely means every render, an empty array means only once on mount, and a populated array means it re-runs whenever any listed value changes.

**Q: Why is it important to include every value the effect actually uses in the dependency array?**
> Because omitting a used variable creates a "stale closure" — the effect keeps referencing the value from whenever it last ran, not the current one, leading to subtle, hard-to-debug bugs. This is why linters (like the `eslint-plugin-react-hooks` exhaustive-deps rule) flag missing dependencies.

⭐ **Very frequently asked** — be ready to explain all three dependency-array patterns and what problem cleanup functions solve.

---

## 2. Custom Hooks

### Learning Perspective
A **custom hook** is a **new composition of one or multiple hooks** — essentially, your own reusable function (conventionally prefixed with `use`) that packages up stateful logic so it can be **shared across multiple components**, without duplicating code or changing the component hierarchy.

Custom hooks **allow you to abstract complex logic** — e.g., form handling, data fetching, or subscription management — and **reuse it easily** wherever it's needed.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

// Usage in any component:
function MyComponent() {
  const width = useWindowWidth();
  return <p>Window width: {width}</p>;
}
```

**Key point:** a custom hook doesn't create shared state between components that use it — each component calling the hook gets its **own independent instance** of that state/logic, unless the underlying logic explicitly connects to something shared (like context or a global store).

### Interview Perspective
**Q: What is a custom hook, and why would you create one?**
> A custom hook is a reusable function (prefixed with `use`) built from one or more existing hooks, letting you extract and share stateful logic across components without duplicating code or changing the component tree's structure — e.g., a `useFetch` hook that handles a common data-fetching pattern used in many components.

**Q: Does using the same custom hook in two different components share state between them?**
> No — each component gets its own independent instance of the hook's state. Custom hooks share *logic*, not state, unless that logic explicitly taps into something shared, like React Context or a Redux store.

---

## 3. External Services & APIs

### Learning Perspective
**External services** are any program, platform, or infrastructure your application uses to **connect to and work with other applications over a network** — third-party backends, cloud services, payment processors, and so on.

**APIs (Application Programming Interfaces)** are the mechanism by which your app talks to these external services — they **enable you to acquire data, execute operations, or add extra features** to your application without building that functionality yourself.

**Common tools for making HTTP requests to APIs from a React app:**
- **`fetch`** — a modern, **built-in browser JavaScript API** for making asynchronous HTTP requests. Commonly used to retrieve JSON data from a server/backend API.
- **Axios** — a popular **third-party JavaScript library** for making HTTP requests, offering a somewhat more convenient API than raw `fetch` (e.g., automatic JSON parsing, built-in request/response interceptors, and more consistent error handling across browsers).

These calls to external APIs are almost always **side effects** — meaning they typically live inside a `useEffect` hook (or an event handler, for user-triggered requests) rather than directly in a component's render logic.

### Interview Perspective
**Q: What's the difference between `fetch` and Axios?**
> `fetch` is a native browser API, requiring no extra dependency, but it's a bit more manual — e.g., you must explicitly call `.json()` to parse a response, and it doesn't reject on HTTP error status codes by default. Axios is a third-party library offering more convenience — automatic JSON parsing, more intuitive error handling (it does reject on non-2xx responses), and built-in interceptors — at the cost of an added dependency.

**Q: Why do API calls in React typically go inside `useEffect` rather than directly in the component body?**
> Because a component's render logic should be a pure function of its props/state — an API call is a side effect (it interacts with something outside the component and can't run synchronously as part of rendering). Calling it directly in the render body would trigger it on every single render, and could even become an infinite loop if the call itself triggers a state update.

---

## 4. Forms: Controlled vs. Uncontrolled Components

### Learning Perspective
**Forms** allow users to interact with data on a web page, made up of **fields** — the areas where users actually enter/interact with data. Within React, **components typically manage form data** directly, rather than relying purely on native browser form behavior.

React classifies form inputs into **two categories:**

- **Uncontrolled component** — React places the initial value on the page, and the **browser keeps track of the rest** (the current value lives in the DOM itself, not in React state). To read the value, you typically use a `ref`.
  ```jsx
  function UncontrolledInput() {
    const inputRef = useRef();
    const handleSubmit = () => alert(inputRef.current.value);
    return <input ref={inputRef} defaultValue="Hello" />;
  }
  ```

- **Controlled component** — **React state manages the form data** directly. You must **explicitly write the code** to create the state and tell it how to update whenever the data changes (typically via an `onChange` handler updating a `useState` value, which is then fed back into the input's `value`).
  ```jsx
  function ControlledInput() {
    const [value, setValue] = useState("");
    return (
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    );
  }
  ```

### Interview Perspective
**Q: What's the difference between a controlled and an uncontrolled component?**
> In a controlled component, React state is the single source of truth for the input's value — you explicitly manage it via `useState` and update it on every change event. In an uncontrolled component, the DOM/browser manages the current value itself, and React only sets an initial value (via `defaultValue`) — you'd read the current value on demand using a `ref`, rather than tracking it continuously in state.

**Q: When might you prefer an uncontrolled component over a controlled one?**
> For simple forms where you only need the value at submission time (not on every keystroke), uncontrolled inputs can be simpler and involve less re-rendering. Controlled components are generally preferred when you need real-time validation, conditional UI based on input value, or to synchronize the input with other application state.

---

## 5. Redux Core Concepts: Actions, Store, Reducers

### Learning Perspective
**Redux** is a library that **maintains application state** and passes information about the application to a component whenever it's needed.

**A key philosophical difference from plain React state:** Redux uses the **entire application's state**, as opposed to state scoped to individual components — this is called **application state**: a single state holding information about the **whole application**, rather than many separate, disconnected local states.

**The three core pieces, and how they work together:**

1. **Store** — the data structure that **stores and manages** all of this application state. All existing application state resides within this single object, sometimes described as the **store in RTK** — where all "slices" combine to form the complete state tree.
2. **Actions** — **payloads of information** that send data **from the application to the Redux store**, describing **"what happened"** in the application. An action is a plain object with at minimum a **`type` property** (a string identifying the action) and, optionally, a **`payload` property** (data needed to perform the task).
   - An **action creator** is simply a function that **returns an action object**.
3. **Reducers** — **pure functions** that receive the **current state** and an **action object**, and return a **new state** with the actions performed. Reducers themselves don't perform the update — they describe **how** the application should respond to a given action.

**Putting it together:** you use **action objects** to communicate to the store **what data you need updated**, and **reducers** to tell the application **how to make that update**. The elements involved in updating component properties, together, are: **actions, the Store, and reducers**.

```js
// Action creator
function increment() {
  return { type: "INCREMENT" };
}

// Reducer (pure function)
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

**`combineReducers()`** — a Redux function used to combine **multiple reducers into a single root reducer** for the store, letting you split state-management logic into manageable, feature-specific pieces while still producing one unified store.

**`getState()`** — a function on the store that allows **access to the current state**.

**Subscription** — the mechanism allowing components to **subscribe to state changes** in the store, ensuring they receive updates and can react accordingly whenever the state they care about changes.

### Interview Perspective
**Q: Explain the relationship between actions, the store, and reducers in Redux.**
> Actions are plain objects describing "what happened" (with a `type`, and optionally a `payload`), dispatched to the store. The store holds the entire application's state. Reducers are pure functions that take the current state and an action, and return a new state reflecting what should change — they define *how* the state responds to each action type. The store calls the reducer whenever an action is dispatched, then updates itself to the returned new state.

**Q: Why must reducers be pure functions?**
> Because Redux relies on predictability — pure functions (same input always produces same output, no side effects, no mutating the input) make state changes traceable, debuggable (e.g., via time-travel debugging in Redux DevTools), and testable. A reducer that mutates state directly or produces different output for the same input breaks Redux's fundamental guarantees.

**Q: What's the difference between component state (`useState`) and Redux's application state?**
> Component state is local — scoped to a single component (and shared only with its children via props). Redux's application state is global — a single store holding state relevant across the *entire* application, accessible to any connected component regardless of where it sits in the component tree, without needing to pass props down through every intermediate level ("prop drilling").

⭐ **Extremely frequently asked** — the actions/store/reducers relationship is the single most commonly tested Redux concept; be ready to describe the full data flow (dispatch → reducer → new state → subscribed components re-render) fluently.

---

## 6. Redux Toolkit (RTK)

### Learning Perspective
**Redux Toolkit (RTK)** is the **official package** provided by the Redux team to **simplify Redux development** and make it more efficient — addressing common complaints about "vanilla" Redux requiring a lot of boilerplate.

**Key RTK utilities:**
- **`configureStore()`** — combines several pieces of Redux setup logic (like middleware configuration and combining reducers) into a **single function call**, replacing the more manual, verbose `createStore()` setup from vanilla Redux
- **`createSlice()`** — lets developers define **"slice reducers"** that **automatically handle immutable updates** to the state — you can write logic that *looks* like it's directly mutating state (thanks to the Immer library working under the hood), while RTK ensures the actual state updates remain properly immutable
- **Slice** — represents a **portion of the Redux state**, bundling together the reducer logic and action creators for updating that specific slice of state, in one place

### Interview Perspective
**Q: What problem does Redux Toolkit solve, compared to "vanilla" Redux?**
> Vanilla Redux requires a lot of boilerplate — manually writing action type constants, action creators, and reducers with careful immutable update logic, then manually wiring them together with `combineReducers` and `createStore`. RTK simplifies this significantly: `createSlice()` auto-generates action creators and lets you write reducer logic that looks mutative (safely, via Immer) while `configureStore()` handles setup in one call — dramatically reducing boilerplate while keeping the same underlying Redux principles.

**Q: What is a "slice" in Redux Toolkit?**
> A slice represents one portion/feature of the overall Redux state — e.g., a `usersSlice` or `cartSlice` — bundling that feature's reducer logic and auto-generated action creators together via `createSlice()`. The complete application state (the store) is formed by combining all these individual slices.

---

## 7. Redux Middleware: Thunk & Saga

### Learning Perspective
Plain Redux reducers must be pure and synchronous — but real applications need to handle **asynchronous** logic (like API calls) as part of updating state. **Middleware** extends Redux to handle this.

- **Redux Thunk** — middleware that allows **action creators to return functions instead of plain objects**, enabling asynchronous logic (like AJAX/API requests) to live within Redux actions. Simple, minimal, commonly the default choice for straightforward async needs.
  ```js
  function fetchUser(id) {
    return async (dispatch) => {
      dispatch({ type: "FETCH_USER_START" });
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      dispatch({ type: "FETCH_USER_SUCCESS", payload: user });
    };
  }
  ```
- **Redux Saga** — a more powerful middleware that exposes a set of **helper functions ("sagas")** to create **declarative effects** — plain JavaScript objects that your sagas can **`yield`** (using generator functions), describing complex async workflows (e.g., cancellation, debouncing, running tasks in parallel, retry logic) more explicitly than Thunk typically allows.

### Interview Perspective
**Q: Why does Redux need middleware like Thunk or Saga for async logic?**
> Because reducers must be pure, synchronous functions — they can't directly perform side effects like API calls. Middleware sits between dispatching an action and it reaching the reducer, intercepting and handling asynchronous logic there instead — Thunk lets action creators return functions (which can dispatch further actions after an async operation completes), and Saga uses generator functions to describe more complex async workflows declaratively.

**Q: When might you reach for Redux Saga instead of Redux Thunk?**
> When async logic gets more complex than simple request/response — e.g., needing to cancel in-flight requests, debounce/throttle dispatched actions, coordinate multiple async operations together, or implement retry logic. Saga's generator-based approach makes these patterns more explicit and testable, at the cost of a steeper learning curve compared to Thunk's simpler function-based approach.

---

## 8. Synchronous vs. Asynchronous Code

### Learning Perspective
- **Synchronous (sync) code** — runs in an **orderly, first-to-last sequence**. Each operation must **wait for the previous one to complete** before the next begins — nothing happens "at the same time."
- **Asynchronous (async) code** — runs **in parallel**, meaning an operation can occur while another is still being processed. Async operations **don't require** the previous operation to finish before the next one begins.

This distinction underlies why hooks like `useEffect` are essential for things like API calls: since JavaScript is single-threaded, async operations (network requests, timers) are handled via mechanisms like Promises/`async`-`await`, letting the rest of the application keep running without blocking on a slow operation.

### Interview Perspective
**Q: What's the core difference between synchronous and asynchronous code?**
> Synchronous code executes strictly in order — each step waits for the previous one to finish. Asynchronous code allows operations to run without blocking each other — an operation (like a network request) can be "in flight" while the rest of the program continues executing, and its result is handled later (via a callback, Promise, or `await`) once it completes.

**Q: Why does this distinction matter specifically for React applications making API calls?**
> API calls are inherently async — you can't know how long a network request will take, and blocking the entire UI thread while waiting would freeze the application. Async patterns (via `fetch`/Axios combined with Promises or `async`/`await`) let the UI remain responsive while data loads, typically paired with loading/error state in the component to reflect the request's current status.

---

## Glossary of Key Terms

| Term | Definition |
|---|---|
| **Action creator** | A function that returns an action object, containing a `type` property and optionally a `payload` |
| **Actions (Redux)** | Payloads of information sent from the application to the Redux store, describing "what happened" |
| **Application state** | A state holding information about the entire application (as opposed to a single component) |
| **Asynchronous (async) code** | Code that can run in parallel — an operation can occur while another is still processing |
| **Axios** | A popular third-party JavaScript library for making HTTP requests from web browsers |
| **`combineReducers()`** | A Redux function combining multiple reducers into a single root reducer for the store |
| **`createSlice()`** | An RTK function letting developers define slice reducers that automatically handle immutable state updates |
| **`configureStore()`** | An RTK function combining several pieces of Redux setup logic into a single function call |
| **Controlled component** | A component where React state manages the form data explicitly |
| **Custom hook** | A new composition of one or multiple hooks, for reusing logic across components |
| **`fetch`** | A native browser API for making asynchronous HTTP requests, commonly used for data fetching |
| **Fields** | Areas in a form where users interact with data |
| **Forms** | Allow users to interact with data on a web page |
| **`getState()`** | A store function allowing access to the current state |
| **Hook** | A function enabling code-logic reuse across components without changing component hierarchy |
| **Payload property** | An optional property containing data required to perform a task |
| **Reducers (Redux)** | Pure functions that return the new state based on the current state and an action |
| **Redux** | A library that maintains application state and passes information to components as needed |
| **Redux store** | A data structure that stores and manages application data |
| **Redux Saga** | Middleware exposing helper functions ("sagas") to create declarative effects, yielded from generator functions |
| **Redux Thunk** | Middleware letting action creators return functions instead of plain objects, enabling async logic in actions |
| **Redux Toolkit (RTK)** | The official Redux package simplifying and streamlining Redux development |
| **Side effects** | Operations executed as a byproduct of rendering — data fetching, subscriptions, DOM manipulation, timers |
| **Slice** | A portion of Redux state, including the reducer logic and action creators for updating it |
| **Store (RTK)** | The combination of all slices, forming the complete application state tree |
| **Subscription** | A mechanism letting components subscribe to store state changes and react accordingly |
| **Synchronous (sync) code** | Code that runs in an orderly, top-to-bottom sequence, waiting for each operation to complete |
| **Type property** | A string identifying an action |
| **Uncontrolled component** | A component where React sets an initial value, and the browser tracks the rest |
| **`useContext` hook** | Manages context changes and provides access to a React context |
| **`useEffect` hook** | Manages side effects such as document changes and HTTP requests |
| **`useReducer` hook** | Facilitates complex state logic in functional components, often used for Redux-like local state updates |
| **`useState` hook** | Adds state management functionality to functional components |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| `useEffect` dependencies | No array = every render; `[]` = once on mount; `[deps]` = on mount + when deps change |
| Custom hooks | Reusable logic (not shared state) built from existing hooks, prefixed `use` |
| `fetch` vs Axios | Native, manual JSON parsing vs. third-party, more convenient error handling |
| Controlled vs. uncontrolled | React state owns the value vs. the DOM/browser owns the value (accessed via `ref`) |
| Redux core flow | Action (what happened) → dispatched to Store → Reducer (pure function) computes new state |
| Why reducers must be pure | Predictability, debuggability (time-travel debugging), testability |
| Component state vs. Redux state | Local, scoped vs. global, app-wide, avoids prop drilling |
| Redux Toolkit | Official package reducing boilerplate — `configureStore()`, `createSlice()` |
| Redux Thunk vs. Saga | Functions-as-actions for simple async vs. generator-based sagas for complex async workflows |
| Sync vs. async code | Waits for each step to finish vs. can run operations in parallel/without blocking |

---

*Notes organized for both conceptual understanding and rapid interview recall. Star (⭐) topics indicate areas frequently probed in technical interviews.*