# React Basics

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. What Is React & Why Components?

### Learning Perspective
**React** is an open-source JavaScript library that facilitates the creation of **dynamic and interactive user interfaces** for web applications.

Its core idea: **React components** enable you to break up the user interface into **separate, reusable, independently-handled parts**. Instead of building one giant, tangled page, you compose the UI out of smaller building blocks — each responsible for its own piece of the interface, its own logic, and (optionally) its own data.

**Why this matters:**
- **Reusability** — build a component once, use it in multiple places
- **Independence** — a component can be developed, tested, and reasoned about on its own
- **Composability** — small components combine to build larger, complex UIs

### Interview Perspective
**Q: What is React, and why does it use a component-based architecture?**
> React is a JavaScript library for building dynamic, interactive UIs. It's built around components — self-contained, reusable pieces of UI that can be developed and managed independently, then composed together. This makes large interfaces easier to build, reuse, test, and maintain compared to one monolithic page.

---

## 2. Types of React Components

### Learning Perspective
There are **three types** of React components:

1. **Functional components** — plain JavaScript functions that return JSX. Modern React (with Hooks) does virtually everything class components can do, and is the **recommended default** for new code.
2. **Class components** — JavaScript classes that extend React's `Component` class (see Section 3). The original way to manage state and lifecycle before Hooks existed.
3. **Higher-order components (HOCs)** — a **function** that takes a component as an argument and returns a **new, enhanced component** — a pattern for reusing component logic across multiple components (e.g., adding shared behavior like authentication checks or data-fetching to several different components without duplicating code).

### Interview Perspective
**Q: What are the three types of React components?**
> Functional components (plain functions returning JSX — the modern default), class components (ES6 classes extending `Component`, used for the original state/lifecycle model), and higher-order components (functions that wrap a component to inject or share reusable logic across multiple components).

**Q: What is a higher-order component, in plain terms?**
> A function that takes a component in and returns a new, enhanced version of it — a pattern for sharing cross-cutting logic (like access control or data-loading) across many components without repeating the same code in each one.

---

## 3. Class Components

### Learning Perspective
A **class component** is a JavaScript class that **extends the `Component` class** from the React library. Extending `Component` gives the class access to React's internal machinery — state management, lifecycle methods, and rendering.

**Class components are responsible for:**
- **Managing state** — via `this.state` and `this.setState()`
- **Handling lifecycle events** — hooking into mounting, updating, and unmounting (see Section 8)
- **Defining component methods** — including the required `render()` method, which returns the JSX to display

```jsx
import React, { Component } from 'react'

export default class Extra extends Component {
  render() {
    return (
      <>
        <p>This is class component</p>
      </>
    )
  }
}
```

**Related OOP vocabulary (relevant since class components use inheritance):**
- **Class** — a template or blueprint for creating objects
- **Subclass** — the class that is **inheriting** another class (here, your component)
- **Superclass** — the class **being inherited** (here, React's `Component`)
- **`this`** — a reference to the current object/instance — essential in class components for accessing `this.state`, `this.props`, and defined methods

### Interview Perspective
**Q: What is a class component, and what is it responsible for?**
> A class component is a JavaScript class extending React's `Component` class, which gives it access to state management, lifecycle methods, and a required `render()` method that returns the component's JSX.

**Q: In the context of a class component, what's the relationship between "subclass" and "superclass"?**
> Your component class is the subclass, and React's `Component` class is the superclass it inherits from — extending `Component` gives your class access to React's built-in features like state and lifecycle hooks.

---

## 4. Props

### Learning Perspective
**Props** (short for **properties**) send data **from a parent component to a child component**. Props flow in **one direction** — parent → child — a design known as "unidirectional data flow." A child cannot directly modify the props it receives; it can only read and use them.

**Sending props (from the parent):**
```jsx
import React, { Component } from 'react'
import ChildComponent from './ChildComponent'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      title: "Manager"
    }
  }
  render() {
    return (
      <>
        <Extra title={this.state.title} />
      </>
    )
  }
}
```

**Accessing props (in the child, class component):**
```jsx
import React, { Component } from 'react'

export default class Extra extends Component {
  constructor(props) {
    super();
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <>
        <p>The count value is {this.props.title}</p>
      </>
    )
  }
}
```

Notice props are accessed via **`this.props.propertyName`** in a class component.

### Interview Perspective
**Q: What are props, and how does data flow with them?**
> Props (properties) pass data from a parent component down to a child component. Data flows in one direction — parent to child — and a child cannot modify the props it receives directly; it just reads and uses them.

**Q: How do you access a prop inside a class component?**
> Via `this.props.propertyName` — e.g., if a parent passes `title={someValue}`, the child accesses it as `this.props.title`.

---

## 5. State

### Learning Perspective
**State** is a **plain JavaScript object** that React uses to represent information about a component's **current situation** — data that can change over the component's lifetime and directly affects what's rendered.

**Critical behavior:** any change to state data **causes the component to re-render**, so the UI reflects the updated data. This is the core mechanism that makes React "reactive."

**State vs. props — the core distinction:**
- **State** — data a component **creates and manages itself**, internal to that component
- **Props** — data a component **receives from outside** (its parent)

**Setting up and using state in a class component:**
```jsx
import React, { Component } from 'react'

export default class Extra extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <>
        <p>the count is {this.state.count}</p>
      </>
    )
  }
}
```

State is initialized inside the **constructor**, after calling `super()` (required so the class properly inherits from `Component` before you can use `this`). Data is accessed via **`this.state.propertyName`**, and referenced in JSX using curly braces `{ }`.

### Interview Perspective
**Q: What is state, and how is it different from props?**
> State is a plain JavaScript object representing a component's current, internal data — something the component creates and manages itself. Props, by contrast, are external data passed in from a parent. State changes trigger a re-render; props are read-only from the receiving component's perspective.

**Q: Why does state need to be initialized in the constructor, and why is `super()` called first?**
> `super()` calls the parent class's (`Component`'s) constructor, which must happen before you can use `this` inside your own constructor — including setting `this.state`. Skipping `super()` (or calling it after using `this`) throws an error, since the instance isn't properly set up yet.

**Q: What happens when state changes?**
> React automatically re-renders the component (and its children, as needed) to reflect the updated data — you don't manually update the DOM; you just update the state, and React handles reflecting that change in the UI.

---

## 6. Event Handling

### Learning Perspective
**Event handling** is the process of responding to **user interactions** — clicks, mouseovers, mouseouts, form submissions, and so on — within a React application.

In a class component, this is typically done by **defining a method** on the class, then referencing that method in the JSX via an event prop like `onClick`.

```jsx
import React, { Component } from 'react';

class MyComponent extends Component {
  handleClick() {
    alert('Button clicked!');
  }
  render() {
    return (
      <div>
        <h1>Event Handling in Class Component</h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default MyComponent;
```

Note: the handler is defined **before** the `render()` method, and passed to `onClick` **without calling it** (`this.handleClick`, not `this.handleClick()`) — passing it *with* parentheses would call it immediately during render, rather than when the button is actually clicked.

### Interview Perspective
**Q: How is event handling done in a React class component?**
> By defining a method on the class (e.g., `handleClick()`) and referencing it, unexecuted, on the relevant JSX element's event prop — like `<button onClick={this.handleClick}>`. React uses camelCase event names (`onClick`, not `onclick`) and passes a reference to the function rather than calling it directly.

**Q: What's a common mistake when wiring up event handlers, and why does it cause problems?**
> Writing `onClick={this.handleClick()}` instead of `onClick={this.handleClick}` — the parentheses call the function immediately during render, rather than passing a reference to be called later when the event actually fires. This usually causes unwanted behavior (like the alert firing on page load) or errors.

---

## 7. JSX (JavaScript XML)

### Learning Perspective
**JSX (JavaScript XML)** is a JavaScript syntax extension that enables **HTML-like code within JavaScript**. It's what lets you write markup directly inside your component functions/classes, which is then compiled (typically by **Babel**) into regular JavaScript function calls that React understands.

**Key JSX rule: a component can only return a single parent element.** To include multiple sibling tags, you must wrap them in one of two ways:

**Using a real parent tag (e.g., `<div>`):**
```jsx
<div>
  <h1>This is a heading tag</h1>
</div>
```

**Using a fragment (`<></>`)** — an "empty" wrapper that groups elements **without adding an extra node to the actual rendered DOM**:
```jsx
<>
  <h1>This is a heading tag</h1>
</>
```

Fragments are useful when you need to satisfy JSX's single-parent-element rule but don't want (or need) an extra wrapping `<div>` cluttering the actual HTML output.

### Interview Perspective
**Q: What is JSX, and why can't a component return multiple sibling elements directly?**
> JSX is a syntax extension letting you write HTML-like markup inside JavaScript, compiled (via Babel) into regular JS. A component must return a single root element because JSX ultimately compiles down to a single function call tree — multiple top-level siblings have no single node to represent. You either wrap them in a real tag (like `<div>`) or a fragment (`<></>`).

**Q: Why would you use a fragment instead of a wrapping `<div>`?**
> A fragment groups sibling elements to satisfy JSX's single-root rule without adding an actual extra DOM node — useful when an unnecessary wrapping `<div>` would interfere with CSS layout (e.g., Flexbox/Grid rules expecting specific direct children) or just adds clutter to the rendered HTML.

---

## 8. Component Lifecycle

### Learning Perspective
The lifecycle of every React component encompasses **three key phases**:

1. **Mounting** — the component is **created and inserted** into the DOM for the first time
2. **Updating** — the component **re-renders** in response to changes (state changes, new props, etc.) — this is the "growing" phase
3. **Unmounting** — the component is **removed** from the DOM (its "death")

In short: components are **created (mounted)** on the DOM, **grow (update)**, and eventually **die (unmount)** from the DOM. (Class components expose specific lifecycle methods for hooking into each phase — e.g., logic to run right after mounting, right after updating, or right before unmounting — though the specific method names weren't covered in this note set.)

### Interview Perspective
**Q: What are the three phases of a React component's lifecycle?**
> Mounting (created and inserted into the DOM), updating (re-rendering in response to state/prop changes), and unmounting (removed from the DOM). It's often summarized as: components are born (mounted), grow (update), and die (unmount).

**Q: What typically triggers the "updating" phase?**
> A change to the component's state or the props it receives from its parent — either of these causes React to re-render the component to reflect the new data.

---

## Project Structure & Tooling Glossary

Terms related to a typical React project (e.g., one scaffolded with Vite):

| Term | Definition |
|---|---|
| **App.jsx** | The root component of the React application |
| **Babel** | A tool used to compile JSX code in the browser |
| **Class** | A template or blueprint for creating objects |
| **`const`** | Declares constants whose values cannot be reassigned |
| **`.eslintrc.cjs`** | A configuration file for ESLint (a popular JS/React linting tool); the `.cjs` extension indicates it's a CommonJS module |
| **ECMAScript 6 (ES6)** | Refers to Ecma's ES6 specification (released 2015), which JavaScript adheres to — Ecma is a standards organization creating global ICT standards |
| **Framework** | A comprehensive software development platform providing a foundation and structure for building entire applications |
| **Front-end framework** | A framework focused specifically on building the user-facing side of web applications |
| **`.gitignore`** | Specifies which files/directories Git should ignore |
| **Hook** | A feature letting developers handle state and other React features in functional components, without needing class-based code |
| **`index.html`** | The entry point for the web application |
| **JavaScript XML (JSX)** | A JS syntax extension enabling HTML-like code within JavaScript |
| **`let`** | Restricts a variable's scope to the block in which it's declared |
| **`main.jsx`** | The entry point for the React application (renders the root `App` component into the DOM) |
| **Node modules** | Directory containing all dependencies installed via npm/yarn |
| **`package.json`** | Contains metadata about the project and its dependencies |
| **Public directory** | Contains static assets — HTML files, images, fonts |
| **React** | An open-source JS library for building dynamic, interactive UIs |
| **`README.md`** | Provides project info — setup instructions, usage guidelines, documentation |
| **`src` directory** | Contains the source code of the React application |
| **Subclass** | The class inheriting another class |
| **Superclass** | The class being inherited by the subclass |
| **`this`** | A reference to the current object |
| **`var`** | A variable accessible/referable from anywhere in the code (function-scoped, legacy) |
| **Vite** | A build tool that speeds up building/development by optimally leveraging how modern browsers handle JS modules |
| **`vite.config.js`** | Configuration settings for the Vite build tool |

### Interview Perspective on the Glossary
**Q: What's the relationship between JSX and Babel?**
> Browsers don't understand JSX natively — Babel compiles JSX syntax into plain `React.createElement()` JavaScript calls that browsers (and React itself) can actually execute.

**Q: What's the difference between `App.jsx` and `main.jsx` in a typical React project?**
> `main.jsx` is the true entry point — it renders the root component into the actual DOM (usually targeting a `<div id="root">` in `index.html`). `App.jsx` is that root component itself, which then contains/composes the rest of the application's component tree.

**Q: What are Hooks, in one sentence?**
> Hooks are functions that let functional components use state and other React features (like lifecycle-equivalent behavior) that used to require writing a class component.

---

## Quick Reference: Vite Setup Command

| Description | Code |
|---|---|
| Create a new React project with the latest Vite tooling | `npm create vite@latest` |

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| React | JS library for building dynamic, interactive UIs, composed of independent components |
| Component types | Functional (modern default), class (state/lifecycle via `Component`), higher-order (logic-sharing wrapper) |
| Class component | Extends `Component`; manages state, lifecycle, and defines methods including required `render()` |
| Props | Data passed parent → child, one-directional, read-only in the child |
| State | Component's own internal, mutable data; changing it triggers a re-render |
| State vs. props | Created/managed internally vs. received from outside |
| Event handling | Define a method, reference it (unexecuted) on a JSX event prop like `onClick` |
| JSX | HTML-like syntax in JS, compiled by Babel; must return a single root element (real tag or fragment `<></>`) |
| Component lifecycle | Mounting (created) → Updating (re-renders) → Unmounting (removed) |
| Subclass / Superclass | Your component / React's `Component` class it extends |