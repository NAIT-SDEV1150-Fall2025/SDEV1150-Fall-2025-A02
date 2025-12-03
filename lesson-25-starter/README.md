# Lesson 25 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-25`
1. Move into the lesson-25/ directory:
```sh
cd lesson-25
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

- Identify and diagnose common issues in web components using DevTools and automated tests
- Apply debugging techniques including inspecting Shadow DOM, analyzing events, and verifying component state
- Write targeted tests that reveal broken behaviour in components
- Fix failing behaviour by correcting attribute handling, slot rendering, and event detail propagation

## Intentional Bugs & Debugging Walkthrough

The example `user-card` component and `main.js` script include a few **intentional bugs** for you to discover and fix. These are designed so that your tests (and DevTools) will help you identify what is wrong.

### Bug 1: Avatar attribute does not update the image

<details>
  <summary>
    <b>Symptom:</b>
    <p>Setting the <code>avatar</code> attribute on <code>&lt;user-card&gt;</code> does <b>not</b> change the image <code>src</code>, even though <code>observedAttributes</code> includes <code>avatar</code>.</p>
  </summary>
  
  **Cause:**
  `attributeChangedCallback` checks for the wrong attribute name.
  
  ```js
  static get observedAttributes() {
    return ['avatar'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Bug: name check does not match the observed attribute
    if (name === 'avatars' && this.shadowRoot) {
      const img = this.shadowRoot.querySelector('img');
      if (img) {
        img.src = newValue;
      }
    }
  }
  ```

  **Fix:**
  Update the condition to check for `'avatar'` so it matches the observed attribute.

  ```js
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'avatar' && this.shadowRoot) {
      const img = this.shadowRoot.querySelector('img');
      if (img) {
        img.src = newValue;
      }
    }
  }
  ```

  Writing a test that sets `element.setAttribute('avatar', 'some-url.png')` and then asserts on the `img.src` will expose this bug immediately.

</details>

### Bug 2: Description does not render from the `user` property

<details>
  <summary>
    <b>Symptom:</b>
    <p>When setting the <code>user</code> property (e.g., <code>card.user = { id: 'u1', name: 'Zelda', description: 'Princess of Hyrule' }</code>), the name appears correctly, but the description does <b>not</b> show up in the card.</p>
  </summary>

  **Cause:**
  The selector for the description slot is slightly wrong.

  ```js
  _renderFromUser() {
    if (this.#user) {
      // ... avatar and name logic ...
      const descSlot = this.shadowRoot.querySelector('[name="descriptions"]');
      if (descSlot) {
        descSlot.textContent = this.#user.description || '';
      }
    }
  }
  ```

  **Fix:**
  - Correct the selector so it matches the `slot` name in the template (`name="description"`).

  ```js
  const descSlot = this.shadowRoot.querySelector('[name="description"]');
  if (descSlot) {
    descSlot.textContent = this.#user.description || '';
  }
  ```

  A test that sets the `user` property and then asserts that the rendered description text matches the expected value will fail until this bug is fixed.

</details>

### Bug 3: Follow counter does not update correctly in `main.js`

<details>
  <summary>
    <b>Symptom:</b>
    <p>Clicking the Follow button on a card toggles its visual state, but the <code>#follow-counter</code> text does not change as expected.</p>
  </summary>

  **Cause:**
  The event listener in `main.js` is reading the wrong property from the custom event `detail` object.

  ```js
  main.addEventListener('follow-change', (e) => {
    // Bug: uses e.detail.isFollowed, but the event detail uses "followed"
    followedCount += e.detail.isFollowed ? 1 : -1;
    const counterEl = document.querySelector('#follow-counter');
    counterEl.textContent = `Followed: ${followedCount}`;
    console.log('follow-change:', e.detail);
  });
  ```

  The component dispatches the event like this:

  ```js
  this.dispatchEvent(new CustomEvent('follow-change', {
    detail: { id: this.getAttribute('user-id') || null, followed: this.followed },
    bubbles: true,
    composed: true,
  }));
  ```

  **Fix:**
  Update the listener to use the correct property name (`followed`).

  ```js
  main.addEventListener('follow-change', (e) => {
    followedCount += e.detail.followed ? 1 : -1;
    const counterEl = document.querySelector('#follow-counter');
    counterEl.textContent = `Followed: ${followedCount}`;
    console.log('follow-change:', e.detail);
  });
  ```

  You can also write a test for the `follow-change` event (or manually trigger it in DevTools) to confirm that the `detail` payload matches what your listener expects.

</details>

---

These intentional bugs are meant to be discovered via failing tests and by inspecting the DOM and events in DevTools:
- Write tests **first** for the expected behaviour.
- Run the tests and observe which assertions fail.
- Use the failures to guide you to the corresponding bug in the component or script.

## Student Exercise

*NOTE: if you've already completed the following from the previous lesson, use those tests to help diagnose and fix the errors described above.*

- Add a test for the `avatar` attribute, specifically, that setting this attribute will udpate the img src attribute.
- Add a test for the `user` property, specifically, that setting this attribute will update the expected slots and image elements.

## Push changes

```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 25 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```
