# UltreX

UltreX is a small immutable state management library. It provides similar functionality to many of the other state management libraries (like flux or redux) but with a lot fewer concepts to learn and much less boilerplate code required to get sorted.

### Install

To get started simply install the package via npm or yarn:

```bash
npm install ultrex
```

or 

```bash
yarn install ultrex
```

### The Basics

There are two simple concepts to learn to use UltreX.

**1. The Store**

The store is simply the place where your application state lives.

**2. Actions**

Actions are a very simple class that have an `apply` function which receives the current application state. It should return a new object with the updated state.

Your application will have many actions. Each action should be responsible for handling a specific task.

### Example

Below is a simple counter example:

```javascript
import { Store, Action } from 'ultrex';

// create increment action
class IncrementAction {
    apply(state) {
        return { counter: state.counter + 1};
    }
}

// create decrement action
class DecrementAction {
    apply(state) {
        return { counter: state.counter - 1};
    }
}

// create the store
const store = new Store({ counter: 0 });

// subscribe to any changes to the counter - and print out the latest value
store.subscribe(state => console.log(state.counter));

// dispatch some actions
store.dispatch(new Increment()); // counter will be 1
store.dispatch(new Increment()); // counter will be 2
store.dispatch(new Decrement()); // counter will be 1

```

### Documentation

**Store**

```typescript
dispatch(action: Action): void;
```

Dispatch a new action to update the state.

- `action` - The Action to dispatch.

```typescript
subscribe(listener: (snapshot: State) => void, type?: Action): void;
```

Subscribe to changes to the state.

- `listener` - A function that gets called when the state changes. It will receive a snapshot of the current state.

- `type` - If specified this will only get fired when actions of this type are fired.

```typescript
unsubscribe(listener: (snapshot: State) => void): void;
```

The listener will no longer be fired on state changes.

- `listener` - The function that is currently being called on state change.

```typescript
getSnapshot(): State;
```

This returns a snapshot of the current state. Note that altering this object will not affect the state in the store.

**Action**

An action is just a class with an apply function. It should implement the following interface:

```typescript
export interface Action {
    /**
     * This function will be called by the store to update the state.
     * This should return a new instance of the state object
     */
    apply(state: State): State;
}

```

### TypeScript

UltreX is written in TypeScript so full type definitions are availble as standard.

### License

MIT License