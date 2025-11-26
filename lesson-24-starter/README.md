# Lesson 24 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-24`
1. Move into the lesson-24/ directory:
```sh
cd lesson-24
```
2. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```

## Objectives

- Explain the pros and cons of automated testing
- Describe the process for applying automated tests
- Add automated tests for a web component

## Instructor Demo

### Install Required Testing Packages

Because we won't be running the tests live in the browser, we need to use a package to simulate the browser environment. Both `jsdom` and `happy-dom` provide this browser environment, with `jsdom` being a more comprehensive, but a little slow, and `happy-dom` giving up some web API completeness in exchange for speed. You can install both and then see which you like to use.

```sh
npm install -D vitest jsdom happy-dom
```

### Configure the Test Environment

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
  },
});
```

### Add the `test` Script to `package.json`

```json
"scripts": {
  ...
  "test": "vitest",
  "test:watch": "vitest --watch"
},
```

## Writing Tests

You can now create test files (e.g., user-card.test.js) to test your web components.

1. Render the component: Use standard DOM manipulation methods within your test to create and append your web component to the document body.
2. Use `shadow-dom-testing-library` if needed
   - If your component uses a shadow DOM, you may need an external library like `@testing-library/user-event` (for user interactions) or specifically the `shadow-dom-testing-library` to interact with elements inside the shadow root.
3. Make assertions: Use Vitest's expect API to check the component's state, rendered output, or behavior.

### Create the `__tests__` Directory

```sh
mkdir __tests__
```

### Create the `__tests__/user-card.test.js` File

```js
// user-card.test.js
import { expect, test, describe } from 'vitest';
import '../src/user-card.js'; // Import the web component definition

describe('UserCard', () => {
  test('renders with default properties', () => {
    // Create an instance of the component
    const element = document.createElement('user-card');
    document.body.appendChild(element);

    // Make assertions using standard DOM APIs or Testing Library utilities
    expect(element.shadowRoot.querySelector('img').getAttribute('src')).toBe('https://placehold.co/80x80/0077ff/ffffff');
    expect(element.followed).toBe(false);

    // Clean up
    document.body.removeChild(element);
  });

  test('renders name and description', async () => {
    const element = document.createElement('user-card');
    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('slot', 'name');
    nameSpan.textContent = 'Vitest User';

    const descSpan = document.createElement('span');
    descSpan.setAttribute('slot', 'description');
    descSpan.textContent = 'A user for testing with Vitest';

    element.appendChild(nameSpan);
    element.appendChild(descSpan);

    document.body.appendChild(element);

    // Assert the result
    const nameSlot = element.shadowRoot.querySelector('slot[name="name"]');
    const descSlot = element.shadowRoot.querySelector('slot[name="description"]');
    expect(nameSlot.assignedNodes()[0].textContent).toBe('Vitest User');
    expect(descSlot.assignedNodes()[0].textContent).toBe('A user for testing with Vitest');
  });
});
```

### Efficiency Updates

For common setup and teardown tasks, you can use the `beforeEach` and `afterEach` (also have `beforeAll` and `afterAll` helpers). As the names imply, you can include common setup tasks for each test in `beforeEach` and common teardown tasks for each test in `afterEach`. For our case, creating a new element and removing it from the dom are common to each test.

Update the imports:

```js
// user-card.test.js
import { ..., beforeEach, afterEach } from 'vitest';
```

Add the `beforeEach` and `afterEach` function calls, and remove the duplicate statements from the tests:

```js
// user-card.test.js
let element;

beforeEach(() => {
  // Set up a new instance of the component before each test
  element = document.createElement('user-card');
});

afterEach(() => {
  // Clean up after each test
  element.remove();
  element = null;
});
```

## Student Exercise

- Add a test for the `avatar` attribute, specifically, that setting this attribute will udpate the img src attribute.
- Add a test for the `user` property, specifically, that setting this attribute will update the expected slots and image elements.

### Stretch Challenge Exercise

- Add tests for following and unfollowing a user, both programmatically and by clicking the button.

## Common Errors & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Slotted text not updated | Tests or component code update the shadow DOM instead of the light DOM nodes that provide slot content | Update the light DOM children (elements with `slot` attributes) before attaching the host to `document.body`, or render text inside the shadow DOM. In tests, append slotted nodes (with correct `slot` values) prior to appending the component. |
| Event listener not fired in tests or app | Custom event dispatched without `bubbles`/`composed`, or listener attached on the wrong node | Dispatch events with `{ bubbles: true, composed: true }` when they must cross the shadow boundary, or attach the listener on an appropriate parent/host (use delegation when helpful). |
| Property/attribute changes ignored when set before mount | Setter relied on the element being connected (render executed only in `connectedCallback`) | Have the setter store incoming values and ensure `connectedCallback` (or later lifecycle) calls `render()`. Use `observedAttributes` + `attributeChangedCallback` to sync attributes to properties. |
| Module import or resolution errors in tests | Incorrect import path, missing export, or ESM/CJS mismatch with Vitest | Confirm test import paths are correct (e.g., `import '../src/user-card.js'`), ensure `package.json` `type` matches your module format, and configure Vitest resolve aliases if you use them. |
| Shadow DOM elements undefined in tests | Test environment missing full shadow DOM behavior or accessing nodes before render | Ensure component is registered/imported, append it to `document.body`, and await any async rendering (use `await Promise.resolve()`). Choose `jsdom` (more complete) or `happy-dom` (faster) depending on needs. |

## Push changes

```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 24 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```
