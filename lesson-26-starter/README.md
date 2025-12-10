# Lesson 26 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-26`
1. Move into the lesson-26/ directory:
```sh
cd lesson-26
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

- Use the Sources panel to set breakpoints, step through code execution, and inspect variables.
- Use the Application panel to explore storage and assets for the running app.
- Capture and inspect Memory snapshots to reason about DOM nodes and potential leaks.
- Record and analyze a Performance profile to identify what runs when you interact with the page.
- Run a Lighthouse report and interpret the main performance and accessibility signals.

## App overview

This starter includes two main JavaScript files:
- `src/user-card.js`
  Defines a <user-card> web component that:
  - Renders an avatar image and "Follow" button inside a Shadow DOM.
  - Tracks internal followed state.
  - Dispatches a follow-change custom event when the follow state changes.
  - Accepts a user property, which includes id, name, avatar, and description.

- `src/main.js`
  Bootstraps the example app:
  - Imports and registers <user-card>.
  - Creates an array of user objects and renders one <user-card> per user.
  - Listens for follow-change events on the <main> element and updates a "Followed: X" counter.
  - Implements a theme toggle button that changes CSS custom properties on document.documentElement.

You'll use the DevTools panels to see how all of this behaves at runtime.

## Instructor Demo

### Sources Panel - Breakpoints and Call Stack

**Goal:** Ppause execution in `user-card.js` and inspect what's going on inside the component.

1. Open DevTools and go to the Sources panel.
2. Locate `src/user-card.js` in the file navigator.
3. Scroll to the `_setFollow` method:
    ```js
    _setFollow(value) {
      this.#followed = value;
      this._btn.textContent = this.#followed ? 'Following' : 'Follow';
      this.dispatchEvent(new CustomEvent('follow-change', {
        detail: { id: this.getAttribute('user-id') || null, followed: this.followed },
        bubbles: true,
        composed: true,
      }));
    }
    ```
4. Set a breakpoint on the first line inside `_setFollow`.
5. In the page, click the Follow button on one of the cards.
6. Point out:
    - Execution pauses at the breakpoint.
    - The Call Stack shows how the browser got here, including `_onButtonClick`.
    - The Scope panel shows local variables and private fields.
7. Step over a few lines to show how `#followed` and `this._btn.textContent` change.

*Optional extra:* Set a breakpoint in `main.js` inside the `follow-change` event listener to show how the event bubbles out of the Shadow DOM.

### Application Panel - Storage and Assets

Even though this app doesn't use storage yet, the Application panel is still useful.
1. Switch to the Application panel.
2. View:
    - The Manifest and Service Workers sections, if present.
    - The Frames section and Storage options.
3. In the Console, run:
    ```js
    localStorage.setItem('devtools-demo-theme', 'darkMode');
    sessionStorage.setItem('demo-user', 'Zelda');
    ```
4. Refresh the Application -> Storage -> Local Storage / Session Storage views and show:
    - Keys and values now appear.
    - You can edit or delete storage entries directly from DevTools.
5. Think of how this feature mighte be used for a theme toggle or user preferences.

### Memory Panel - Heap Snapshots

**Goal:** A brief intro for how to reason about memory usage.
1. Open the Memory panel.
2. Select Heap snapshot.
3. Click Take snapshot with the app in its initial state.
4. Interact with the page:
    - Follow and unfollow users.
    - Toggle the theme a few times.
5. Take another snapshot.
6. Point out:
    - The total size and number of objects.
    - That DOM nodes and JS objects for the cards appear in the snapshot.
    - You can compare snapshots to look for unexpected growth in a real app.

This exploration is about getting familiar with the tool, not diagnosing a real leak here.

### Performance Panel - Recording User Interactions

**Goal:** Capture and inspect what happens when the user clicks or toggles things.
1. Go to the Performance panel.
2. Click Start recording.
3. On the page:
    - Click a few Follow buttons.
    - Toggle the theme button several times.
4. Stop recording.
5. Walk through the result:
    - The Summary at the top.
    - The flame chart timeline.
    - The main thread activity and how JS function calls appear.
6. Zoom into a region where you clicked the Follow button and connect it back to `_setFollow` and the event listener in `main.js`.

### Lighthouse - Quick Audit

**Goal:** Run a simple audit to see performance and accessibility hints.
1. Open the Lighthouse panel.
2. Choose:
    - Mode: Navigation.
    - Device: Desktop.
    - Categories: at least Performance and Accessibility.
3. Click Analyze page load.
4. Once the report is generated, inspect:
    - Overall scores.
    - A couple of specific recommendations.
    - How small changes in HTML, CSS, or JS can impact these scores.

## Student Exercise

Work through the following tasks, using the same app and DevTools panels.
1. Sources - Debug the follow counter
    - Set a breakpoint in `main.js` inside the `follow-change` event listener:
      ```js
      main.addEventListener('follow-change', (e) => {
        // breakpoint here
        followedCount += e.detail.followed ? 1 : -1;
        const counterEl = document.querySelector('#follow-counter');
        counterEl.textContent = `Followed: ${followedCount}`;
        console.log('follow-change:', e.detail);
      });
      ```
    - Click Follow and step through the code.
    - Inspect e.detail, followedCount, and counterEl.
    - Answer: what value does followedCount have before and after the line that updates it?
2. Sources - Inspect Shadow DOM behavior
    - In `user-card.js`, set a breakpoint in `_renderFromUser`.
    - Refresh the page so the app recreates the cards and hits that code.
    - Inspect the `this.#user` object and `this._img`.
    - Compare `this.#user.name` to what you see in the rendered card on the page. Do you actually see the name and description? Why or why not, based on what `_renderFromUser` is doing?
3. Application - Experiment with storage
    - In the Console, store the current theme in localStorage:
      ```js
      localStorage.setItem('user-card-theme', 'dark');
      ```
    - In the Application panel, verify the key and value under Local Storage.
    - Change the value in DevTools and read it back in the console:
      ```js
      localStorage.getItem('user-card-theme');
      ```
4. Memory - Snapshot and compare
    - Take a heap snapshot with no interactions.
    - Follow all users, toggle the theme five times, and take another snapshot.
    - Compare the snapshots and look for:
      - The total JS heap size.
      - Node counts for DOM elements.
    - Answer: did the number of DOM nodes change in a way that surprises you?
5. Performance - Record a "Follow all" action
    - Start a new Performance recording.
    - Quickly click Follow on each card.
    - Stop the recording and zoom into your click interactions.
    - Find:
      - The tasks associated with your clicks.
      - Any obvious long-running script segments.
6. Lighthouse - Identify one improvement
    - Run a Lighthouse audit.
    - Pick one recommendation the report gives.
    - Describe how you might address it in this project, even if you don't implement it right now.

## Stretch Challenge Exercise

If you finish early, try one or more of these.

- **Theme toggling and `localStorage`**
Use what you have seen in this exercise to connect the overal theme for the page (dark/light mode toggle) to `localStorage`. Set the value when the switch is toggled and on page load, look for the local storage value and, if set, apply it to the page.
- **Follow state accuracy**
Use DevTools to test edge cases. For example, click Follow repeatedly on one card and watch the counter. Does the counter always stay in sync with the visual state of each card? Use breakpoints and the console to investigate.
- **Custom event inspection**
In the Console, add an event listener directly on document:
  ```js
  document.addEventListener('follow-change', (e) => console.log('Global listener:', e.detail));
  ```
  Then click Follow on the page and watch the logs. Compare the event you see here to what you see paused at breakpoints in Sources.

## Common Investigation Patterns

You'll often combine these tools:
  - Set a breakpoint in Sources, reproduce the issue, then step through the code.
  - Check Application -> Storage to confirm that data is actually stored and updated.
  - Use Performance to find which functions run during slow interactions.
  - Take Memory snapshots when you suspect a leak and compare before and after.
  - Run a Lighthouse audit periodically while building a feature, not just at the end.

These are the workflows you'll keep building on in future projects.

## Push changes

```sh
git add .
```
1. Commit the changes:
```sh
git commit -m 'Lesson 26 Example'
```
1. Push your changes to the remote workbook repository: 
```sh
git push origin main
```
