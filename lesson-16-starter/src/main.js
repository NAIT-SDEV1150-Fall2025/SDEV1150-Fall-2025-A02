// Import the functions necessary to make the API calls
import { getData } from './utils';
// this is named so I need to put curly braces around it.
// Select the necessary DOM elements
let loadButton = document.querySelector('#loadBooks');
let list = document.querySelector('#bookList');

// Define the API endpoint
const ENDPOINT = 'http://localhost:3000/books';

// Define a function to handle loading and displaying the list of books
async function loadBooksHander() {
  // let's make the fetch request using our getData function
  try {
    // since our getData function is async we need to
    // await it.
    const books = await getData(ENDPOINT);
    console.log('books', books);
  } catch (error) {
    // error while fetching.
    console.log(error);
  }
}
// Define a function to handle form submission for adding a new book

// Attach event listeners to the button and form
loadButton.addEventListener('click', loadBooksHander);
// this is another way of writing event listeners
// passing the function by reference which means
// not executing it because it will be executed
// on the click of the load button

// TODO: Add delete functionality
