# Lesson 21 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-21`
1. Move into the lesson-21/ directory:
```sh
cd lesson-21
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

## Instructor Demo

### Add Button to Trigger Custom Event

In `user.card.js`, update the template markup by adding a Follow `<button>`:

```js
// user-card.js
...
<slot name="name" class="name"></slot>
<slot name="description" class="description"></slot>
<button>Follow</button>
...
```

This button will be used to dispatch a custom event when clicked with user id in event.detail.

### Add Property to Custom Component

To track the current state of being "followed", add a private property to the `UserCard`:

```js
// user-card.js
...
constructor() {
  super();

  // Added property to track follow state
  this._followed = false;
  ...
```

Now, we need to add support for toggling the followed state for the component. 

```js
// user-card.js
...
constructor() {
  ...
}

_setFollow(value) {
  this._followed = value;
}
...
```

The last thing to do is connect the button to the followed state. Add an event listener to the button in the constructor:

```js
// user-card.js
...
constructor() {
  super();
  this._followed = false;
  const shadow = this.attachShadow({ mode: 'open' });
  const content = template.content.cloneNode(true);
  const img = content.querySelector('img');
  img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
  
  this._btn = content.querySelector('button');
  this._btn.addEventListener('click', () => {
    this._setFollow(!this._followed);
    console.log('Follow button clicked');
  });

  shadow.appendChild(content);
}
...
```

### Improve the UX

Update the example so that the state change is reflected in the UI. Add a private method for updating the state (`_onFollow()`) and update the text in the Follow button:

```js
// user-card.js
...
constructor() {
  super();
  this._followed = false;
  const shadow = this.attachShadow({ mode: 'open' });
  const content = template.content.cloneNode(true);
  const img = content.querySelector('img');
  img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
  this._btn = content.querySelector('button');

  this._btn.addEventListener('click', () => this._onFollow());

  shadow.appendChild(content);
}

_setFollow(value) {
    this._followed = value;
    this._btn.textContent = this._followed ? 'Following' : 'Follow';
  }

// Follow button handler
_onFollow() { 
  this._setFollow(!this._followed); 
}
```

### Enable Programmatic Access

Expose `follow()` and `unfollow()` methods that toggles an internal follow state. This will allow external APIs to interact with the component programmatically.

```js
// user-card.js
...
constructor() {
  ...
}

follow() {
  this._setFollow(true);
}
unfollow() {
  this._setFollow(false);
}
...
```
We can now set the followed state from our JS. Select the first user-card and `follow()` and `unfollow()` it programmatically:

```js
// main.js
...
// Programmatically follow the first user card
document.querySelector('user-card').follow();
```

When the page loads, you should now see that the first `<user-card>` is followed (e.g., the button text shows "Following").

Open the console and enter the following to see the effect of unfollowing a user:

```js
document.querySelector('user-card').unfollow();
```

### Dispatch a Custom Event and Property for External Communication

Finally, let's dispatch a custom event (`follow-change`) in case any listeners want to be notified when a `<user-card>` is followed/unfollowed. Add a read-only property to read the state of `_followed` as well:

```js
// user-card.js
...
constructor() {
  ...
}
...
_setFollow(value) {
  this._followed = value;
  this._btn.textContent = this._followed ? 'Following' : 'Follow';
  // emit event so parent can react
  this.dispatchEvent(new CustomEvent('follow-change', {
    detail: { id: this.getAttribute('user-id') || null, followed: this._followed },
    bubbles: true,
    composed: true
  }));
}

// Property to read followed state
get followed() {
  return this._followed;
}
...
```

Listen for and respond to the event in the main application:

```js
// main.js
document.querySelector('user-card').addEventListener('follow-change', (e) => {
  const card = e.target;
  const name = card.querySelector('[slot=name]').textContent;
  console.log(`User ${name} is ${card.followed? 'followed' : 'not followed'}`);
});
```

## Student Exercise

### Styling Update
Add styling for the added Follow button.

### Toggle the Details
If you have completed the previous student task of adding a "Details" section to the card, add the ability to toggle the visiblity of the "Details" within the component (e.g., CSS display update). Trigger an event whenever the details display is toggled.

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Styles not applied | `<style>` not inside template or shadow root | Move scoped styles into the template appended to shadow root.<br>Use Elements panel to inspect the component's shadow root to see applied CSS. |
| Slots empty | Slot name mismatch | Match slot="name" with <slot name="name"> exactly |
| Avatar missing for programmatic element | Attribute set after construction and constructor uses it | Set attributes before appending or handle in connectedCallback / attributeChangedCallback |

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 21 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Parent doesn't receive event | CustomEvent not bubbled/composed | Use { bubbles: true, composed: true } when dispatching |
| Property updates not reflected | Using attributes only or missing setter | Implement a setter that updates internal state and the rendered UI |
| Can't call method on element | Query happened before element parsed/connected | Query after DOMContentLoaded or place code after import that defines the custom element |
