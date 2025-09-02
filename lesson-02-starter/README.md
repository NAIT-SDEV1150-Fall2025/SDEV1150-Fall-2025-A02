# Lesson 02 Starter

## Git

[Git](https://git-scm.com/) is a distributed version control system (DVCS). We will be using it to help us with our development and as a means to backup our work.

Visit the Git website and install git on your machine.

## GitHub

Sign up for a [GitHub](https://github.com/) account, if you haven't already done so, and sign in.

Follow the workbook link provided by your instructor and accept the assignment.

Clone your workbook repository to your machine and open the new repository directory in VS Code.

## Node.js

The build tools we will use in this course rely on [Node.js](https://nodejs.org/en). Visit the Node.js site and download and install Node on your machine.

## Vite

[Vite](https://vite.dev/) is a frontend build tool used for building web applications.

Create a new project using the following command:

```sh
npm create vite@latest
```

Or, you can skip some configuration steps with the following:

```sh
npm create vite@latest lesson-02 -- --template vanilla
```

## Install dependencies and run the dev server

1. Move into the lesson-02/ directory:
```sh
cd lesson-02
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

## Make your own edits

Update the html, css, and js files with your own custom content (your instructor will guide you)

## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 02 updates'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```