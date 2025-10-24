# Lesson 18 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-18`
1. Move into the lesson-18/ directory:
```sh
cd lesson-18
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

## Start the API (JSON Server)

A `db.json` file is provided with a books collection (same theme as Lesson 15/18).

Start JSON Server:

```sh
npm run api-server
# or
npx json-server --watch db.json --port 3000
```

Verify that the routes are working as expected in the browser:
- http://localhost:3000/books
- http://localhost:3000/books/1

Keep this running while working in your project.

## Inspect the UI

Open `index.html`. The page has:
- A Load Books button to fetch and render books
- A Quick Add form to POST a new book (title + author)
- A list `<ul id="bookList">` that renders results

You'll notice odd behaviours (empty list, errors, "Promise" showing on the page, duplicate renders). That's by design.

## Instructor Demo

### Check Operability of the Application

Follow this flow before changing any code:
1. Open DevTools --> Network (if you are working in a browser other than Chrome, you should be able to find and update similar settings)
    - Enable `Preserve log` and `Disable cache`
    - Filter on `Fetch/XHR`
1. Click "Load Books" button
    - What request was sent? URL? Status?
    - If 404/500, open the Response and Preview tabs
1. Open DevTools --> Console
    - Any uncaught (promise) errors? Warnings?
1. Open DevTools --> Sources
    - Click Pause on exceptions (and Pause on caught exceptions if needed)
    - Try "Load Books" again. Where does execution pause?
1. Submit the "Add Book" form (no validation yet)
    - Check Network: is it POST /books? Status code? Body sent?

### Known Bugs List

**Bug A - Wrong endpoint (404)**

Symptom: GET /book --> 404 (typo)
Where: `main.js` in the ndpoint string
Fix: Use the correct route: `http://localhost:3000/books`
Why: JSON Server routes are pluralized collections by default. Spelling matters.

**Bug B — Missing await (renders `[object Promise]` or nothing at all)**

Symptom: UI shows "Promise" or doesn’t render data
Where: `main.js` `const books = fetchData(endpoint);` used without `await`
Fix:

```js
const books = await fetchData(endpoint);
```

Why: `fetchData()` returns a `Promise`; you must await it.

**Bug C — Not checking response.ok (silent failures)**

Symptom: 404/500 still goes to `json()` and throws cryptic errors
Where: `utils.js` fetch and post functions
Fix:

```js
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
const data = await response.json();
```

Why: Always guard `json()` behind an ok check.

**Bug D — Unhandled promise rejection**

Symptom: Console warns about unhandled Promise rejection when API is down
Where: `main.js` Async functions lacking try/catch
Fix:

```js
try {
  // fetch...
} catch (error) {
  console.error(error);
  showError('Unable to reach the API. Is it running?');
}
```
Why: Async/await errors must be caught to avoid silent failures.

**Bug E — Double-click race / duplicate renders**

Symptom: Rapid clicks produce duplicate requests or conflicting states
Where: `main.js` load button handler
Fix:

Disable while in-flight, re-enable when done:

```js
loadBtn.disabled = true;
try {
  const books = await fetchData(endpoint);
  ...
} finally {
  loadBtn.disabled = false;
}
```

Why: Prevent overlapping requests and non-deterministic UI.

**Bug F — Wrong body or headers on `POST`**

Symptom: 400 Bad Request or 500 Internal Server Error from JSON Server
Where: `utils.js` post function
Fix:

Ensure valid JSON and headers:

```js
await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', },
  body: JSON.stringify(payload),
});
```
Why: JSON Server requires `Content-Type: application/json` and a valid JSON body.

## Student Exercise

Complete the following, in order:
1. Reproduce each bug (A–F) and capture proof in DevTools:
    - Network request + status
    - Console error message or pause stack
1. Fix bugs A–F one by one.
1. Add one more improvement of your choice:
    - Add a Delete button per list item (with optimistic UI or re-load)
    - Show a "No results" message when API returns []
    - Add basic retry (e.g., retry once on a network error)
    - Debounce the Load Books button to avoid rapid repeats

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|--------|-----------|
| `TypeError: Failed to fetch` | JSON Server not running/wrong port| Start the server (`npx json-server --watch db.json --port 3000`) |
| CORS error | Using `file://` path | Run your page through `vite` (`npm run dev`) |
| Empty list | API returned no data | Check `db.json` contents |
| Error message shows on screen | Network or code issue | Inspect console for detailed error |
|JSON parse error|Calling json() on non-2xx response|Guard with if (!res.ok) throw|
|Promise in UI|Missing await|const data = await res.json()|
|Duplicate list items|Multiple concurrent requests|Disable button during load; debounce|

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 18 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```