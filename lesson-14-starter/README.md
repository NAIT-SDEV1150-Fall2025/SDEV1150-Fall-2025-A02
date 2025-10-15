# Lesson 14 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-14`
1. Move into the lesson-14/ directory:
```sh
cd lesson-14
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

### Using packages walkthrough

1. Install Day.js for date formatting as a normal dependency:
```sh
npm i dayjs
```
2. Import the dayjs library into `main.js`:
```js
// main.js
import dayjs from 'dayjs';

const currentDate = dayjs().format('dddd, MMMM D, YYYY');
document.querySelector('#today').textContent = `Today is ${currentDate}`;
```

Run your project and see the results.

### User-defined imports

1. Create a second JavaScript file in the `src/` directory named `utils.js`.
  *NOTE: we won't be adding a script tag to the index.html file, we will use ES Modules to connect our scripts*
2. Create a `greetUser` function in the `utils.js` file:
    ```js
    // utils.js
    function greetUser(name) {
      return `Welcome to the app, ${name}!`;
    }
    ```
3. Finally, to make the function available in other scripts, export it with the `export` keyword:
   ```js
    // utils.js
    export function greetUser(name) {
      return `Welcome to the app, ${name}!`;
    }
    ```
    
    *NOTE: We can also create named exports using the object notation `export { greetUser };`*
4. We can also define a default export usign the `default` keyword.  Add a default export to the `utils.js` file:
    ```js
    // utils.js
    export default { defaultName: 'Jane Doe' };
    ```
5. Import the default from `utils.js` and use the defaultName in the `main.js` script:
    ```js
    // main.js
    import dayjs from 'dayjs';
    import { greetUser } from './utils.js';
    import utils from './utils.js'; // can be any name you like
    
    const user = prompt('Enter your name:');
    const message = greetUser(user || utils.defaultName); // use default if no name entered
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    
    document.querySelector('#greeting').textContent = message;
    document.querySelector('#today').textContent = `Today is ${currentDate}`;
    ```

## Student Exercise

Use what you have learned to use the [AnimeJS](https://animejs.com/documentation/) library to animate the greeting element.

1. Install the `animejs` library as a normal dependency
2. Import the named `animate` animejs function into `main.js`
3. Add the following to your `main.js` script to animate the greeting:
    ```js
    animate('#greeting', {
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
    });
    ```

If all of the above have been done correctly, you should see the greeting heading fade slightly down and into view.

## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 14 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```