# Lesson 19 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-19`
1. Move into the lesson-19/ directory:
```sh
cd lesson-19
```
2. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```
3. Run the dev server with the `dev` script:
```sh
npm run dev
```
4. Open the provided development server URL in your browser
5. You should see the default render for the vite project.
6. Use this as the base for today's examples.

## Objectives

Students will create and debug a **custom web component** using the **Web Components API**.  
The lesson focuses on:
- Understanding `customElements.define()`  
- Using **Shadow DOM** for encapsulated styles  
- Working with **HTML templates** and **slots**  
- Basic debugging of DOM and Shadow DOM behavior

### Starter Files

The project includes the following JS files:
```
src/
|-- main.js
|-- user-card.js
```

## Instructor Demo

### Create the Template

Open `index.html` and add a template for a user card:

```html
<!-- index.html -->
...
<body>
  <template id="user-card-template">
    <div class="card">
      <img src="assets/zelda-avatar.png" width="80" height="80" alt="avatar">
      <div class="info">
        <span class="name">Zelda</span>
        <span class="description">Princess of Hyrule</span>
      </div>
    </div>
  </template>
...
```

> **NOTE**: the template tags will not be rendered by the browser, and we are including an `id` so we can query for the template in our JS.

### Create the Component Logic

In `user-card.js`, define the class and register it:

```js
// user-card.js
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);

    shadow.appendChild(content);
  }
}
customElements.define('user-card', UserCard);

export default UserCard;
```

Import the UserCard into the `main.js` file so it is registered with the browser:

```js
// main.js
import './user-card.js';
```

### Render A `user-card`

In the `index.html`, you can now use the custom component. Add a `user-card` in the `body` of the document:

```html
<!-- index.html -->
<user-card></user-card>
```

You should see a user card for Princess Zelda.

### Add Shadow DOM Styles

Right now, all styling for the user cards is contained in the `main.css` file, which is not a good idea (why not?). Web components allow for scoping the styling of the component to itself, preventing leakage of styling into the parent document and providing more control over how the component is styled.

Copy the user card styles from `main.css` into `<style>` tags inside the `<template>`. Examine how styles inside the `<template>` are **scoped** only to the component.

Modifying the `.card` background or text color will not affect the global page; change the `.card` background color in `main.css` to see if there's any effect.

### Add Attributes and Slots

We can use attributes to add flexibility and reusability to our components. Add an `avatar` attribute, which can be used to pass in the desired avatar image source for the component;

```html
<user-card avatar="assets/zelda-avatar.png"></user-card>
```

Remove the `img` src in the template markup:

```html
<!-- index.html -->
<div class="card">
  <img src="" width="80" height="80" alt="avatar">
  <div class="info">
    <span class="name">Zelda</span>
    <span class="description">Princess of Hyrule</span>
  </div>
</div>
```

We can now update the component class to make use of this passed in avatar attribute:

```js
// user-card.js
class UserCard extends HTMLElement {
    ...
    const img = content.querySelector('img');
    // if no avatar value is provied, fallback to the placeholder
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80';

    shadow.appendChild(content);
    ...
```

Slot values can also be used to pass data to the component. Update the current `<user-card>` in `index.html` to accept the following child elements:

```html
<!-- index.html -->
<user-card avatar="assets/zelda-avatar.png">
  <span slot="name">Zelda</span>
  <span slot="description">Princess of Hyrule</span>
</user-card>
```

The `slot` attributes on the spans are used to inform the component about where these elements should be placed within the template. Now, update the template markup to include the necessary slot elements:

```html
<!-- index.html -->
<div class="card">
  <img src="" width="80" height="80" alt="avatar">
  <div class="info">
    <slot name="name" class="name"></slot>
    <slot name="description" class="description"></slot>
  </div>
</div>
```

Add a second user card for Link to the `index.html` to see how our custom component can be reused.

### Self-Contained Templates

Having the template markup separate from the class definition could be problematic if the component is shared across many pages. Move the template into the `user-card.js` file to keep all the custom components parts in one place:

```js
// user-card.js
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card {
      background: #ffffff;
      color: #222222;
      border: 1px solid #e6e6e6;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      gap: 12px;
      align-items: center;
      width: 320px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }
    .name {
      font-size: 1.2em;
      font-weight: bold;
      margin: 0;
    }
  </style>
  
  <div class="card">
    <img src="" width="80" height="80" alt="avatar">
    <div class="info">
      <slot name="name" class="name"></slot>
      <slot name="description" class="description"></slot>
    </div>
  </div>
`;
document.body.appendChild(template);

class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    // Use the template defined above, no longer need to query the document
    // const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);
    const img = content.querySelector('img');
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80';
    shadow.appendChild(content);
  }
}
customElements.define('user-card', UserCard);

export default UserCard;
```

Now, the `<user-card>` web component has its entire definition contained in one file.

## Add `<user-card>`s Programatically 

We can of course add new `<user-card>`s using JavaScript as well. Update the `main.js` to create two additional cards:

```js
import './user-card.js';

// Create an additional user card using HTML and append it to the main element
const dynamicUserCard = `
    <user-card avatar="https://placehold.co/80x80/7700ff/ffffff">
      <span slot="name">Jane Doe</span>
      <span slot="description">Software Engineer</span>
    </user-card>`;

document.querySelector('main').insertAdjacentHTML('beforeend', dynamicUserCard);

// Create another user card using JavaScript DOM API only and append it to the main element
const anotherUserCard = document.createElement('user-card');
anotherUserCard.setAttribute('avatar', 'https://placehold.co/80x80/770000/ffffff');
const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'John Smith';
const descSpan = document.createElement('span');
descSpan.setAttribute('slot', 'description');
descSpan.textContent = 'Frontend Developer';
anotherUserCard.appendChild(nameSpan);
anotherUserCard.appendChild(descSpan);

document.querySelector('main').appendChild(anotherUserCard);
// Why doesn't the custom avatar show up for this element?

```

## Student Exercise

### Extend the Component
Add a "Details" slot within the shadow DOM that shows a random "status" message (e.g., "Ready for adventure!").

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|--------|-----------|
| Component not appearing | `customElements.define` missing or misspelled | Define before first use |
| Styles not applied | Added styles outside shadow root | Move `<style>` into the shadow DOM |
| Slots empty | Slot name mismatch | Match slot attributes in both template and element |
| Template not found | `getElementById` or `querySelector` returns null | Ensure `<template id="user-card-template">` exists before script runs |

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 19 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```