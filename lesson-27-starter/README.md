# Lesson 27 Starter

In this lesson you will take a local front end app, build it for production, and deploy it to Netlify using the drag and drop workflow.

The goal is that, by the end of class, you have a live URL you can share that is running the built version of this app.

## Install dependencies and run the dev server (quick check)

0. Extract the starter zip for **lesson-27-starter**.
1. Move into the project directory:

   ```sh
   cd lesson-27-starter
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. (Optional but recommended) Run the dev server once to make sure the app works locally:

   ```sh
   npm run dev
   ```

   Open the URL shown in the terminal and quickly click around to confirm the app runs as expected. When you are satisfied, stop the dev server (ctrl + c in the terminal).

## Objectives

By the end of this walkthrough you should be able to:

- Explain why front end apps are **built for production** before deployment.
- Run the `npm run build` script to generate an optimized production bundle.
- Locate and understand the `dist` directory that contains the built app.
- Create or sign in to a Netlify account.
- Use Netlify's **drag and drop** deployment flow to deploy the contents of the `dist` folder.
- Verify that the deployed app is working at its public Netlify URL.

## Why build for production?

Modern front end tooling (Vite, React, etc.) usually has two modes:

- **Development mode** (`npm run dev`)
  - Fast rebuilds and hot reloading for local coding.
  - Extra debugging helpers and warnings.
  - Not optimized for performance or file size.

- **Production build** (`npm run build`)
  - Bundles your JavaScript modules together.
  - Minifies and compresses files to reduce file size.
  - Can remove unused code and debug-only helpers.
  - Generates static assets that are ready to be served by a simple web server or hosting provider.

Netlify does not need your source files or dev server. It just needs the **built output**. That is why we run the build script and deploy the contents of the `dist` folder, not the entire project.

## Part 1: Build the app

### 1. Check the build script

Open `package.json` and find the `scripts` section. You should see something like:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

We are going to use the `build` script.

### 2. Run the build

In the project folder, run:

```sh
npm run build
```

Watch the terminal output. You should see Vite or the build tool report a successful build and mention an output directory.

### 3. Inspect the `dist` directory

After the build finishes, you should see a new folder called `dist` in the project root. This folder contains:

- An `index.html` file.
- One or more JavaScript files with hashed names (for example, `assets/index-ABCD1234.js`).
- CSS files and other static assets.

This `dist` folder **is what you will deploy to Netlify**.

### 4. Preview the production build locally [OPTIONAL]

If you want to see exactly what Netlify will serve, you can run:

```sh
npm run preview
```

This starts a local server that serves the built files from `dist`. Open the URL it prints in the terminal and verify that everything still works.

## Part 2: Set up Netlify

### 1. Create or sign in to a Netlify account

1. Go to [https://app.netlify.com](https://app.netlify.com) in your browser.
2. If you already have an account, sign in.
3. If you do not have an account, sign up using your NAIT email (or another provider) and complete any required setup steps.

Keep this tab open. You will come back to it in a moment.

### 2. Open the deploy manually screen

1. In the Netlify dashboard, go to the **Projects** page.

You should see a drop zone that says something like *"Drag and drop your project folder here"*.

## Part 3: Deploy the `dist` folder with drag and drop

Now you will deploy the built app.

### 1. Locate the `dist` folder in your file explorer

1. In the File Explorer, open your `lesson-27` project folder.
2. Confirm that the `dist` folder exists and contains `index.html` and an `assets` folder.

### 2. Drag and drop to Netlify

1. With the Netlify deploy drop zone visible in your browser, drag the **`dist` folder itself** from your file system onto the drop area.
2. Netlify will upload the contents and start the deployment process.
3. Wait until Netlify shows that the site has been deployed.

Netlify will generate a random site name (for example, `sparkling-forest-12345.netlify.app`). You can rename it later if you want.

### 3. Test the deployed site

1. Click the generated site URL in the Netlify dashboard.
2. Verify that your app loads in the browser.
3. Click around and confirm that the app behaves the same as it did when you ran `npm run preview` locally.

If something is broken, go back to the steps above and check:

- Did you run `npm run build` after your last code changes?
- Did you drag the **`dist`** folder, not the entire project folder?
- Does the `dist/index.html` file exist and work when previewed locally?

## Assignment deployment 

Work through the following steps to deploy your Assignment 4 production build when you're ready. Ask for help if you get stuck.

1. Navigate to your assignment 4 project directory.
3. Run `npm run build` to generate a production build.
4. Inspect the `dist` folder and confirm that it contains `index.html` and an `assets` folder.
5. Sign in to Netlify.
6. Use the manual drag and drop flow demonstrated above to deploy the **`dist`** folder.
7. Open your live Netlify URL and confirm the app works.
8. Submit your deployed URL through the method your instructor specifies (include the URL at the top of the assignment README.md file).

## Stretch goals

If you finish early, try one or more of these:

- **Change and redeploy**  Make a small visible change in the app (for example, text in a heading), run `npm run build` again, and redeploy the updated `dist` folder. Confirm that the change appears on your Netlify site.
- **Custom site name**  In the Netlify project configuration, rename your site to something more meaningful instead of the random default name.
- **Preview vs dev**  Compare how the app behaves and loads when running `npm run dev` versus `npm run preview` and your Netlify deployment.