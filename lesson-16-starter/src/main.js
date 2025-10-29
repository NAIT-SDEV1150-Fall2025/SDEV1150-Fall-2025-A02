// Import the functions necessary to make the API calls
import { getData, postData } from './utils';
// this is named so I need to put curly braces around it.
// Select the necessary DOM elements
let loadButton = document.querySelector('#loadBooks');
let list = document.querySelector('#bookList');
let addForm = document.querySelector('#addBook');

// Define the API endpoint
const ENDPOINT = 'http://localhost:3000/books';

// Define a function to handle loading and displaying the list of books
async function loadBooksHander() {
  // before we make the request we're going to create
  // to let the user know it's loading.
  list.innerHTML = '<li>Loading...</li>';
  // let's make the fetch request using our getData function
  try {
    // since our getData function is async we need to
    // await it.
    const books = await getData(ENDPOINT);
    // books after this line above is now a concrete value
    // you can use it as is.
    console.log('books', books);
    // clear the html so that it's not loading any more
    list.innerHTML = '';

    // display it the user.
    books.forEach((book) => {
      // creating the element
      const bookLi = document.createElement('li');
      // appending the data to the textContent of our created element
      bookLi.textContent = `${book.title} by ${book.author}`;
      // adding it to the page.
      list.append(bookLi);
    });
  } catch (error) {
    // error while fetching.
    console.log(error);
  }
}
// Define a function to handle form submission for adding a new book
async function submitHandler(event) {
  event.preventDefault();

  const form = event.target;
  // a lot of times you'll need to use the formData obj
  // another way to get form data from the html.
  const formData = new FormData(form);
  console.log(formData);

  // what we're going to next class is
  // hook it all up with the backend.

}


// Attach event listeners to the button and form
loadButton.addEventListener('click', loadBooksHander);
// this is another way of writing event listeners
// passing the function by reference which means
// not executing it because it will be executed
// on the click of the load button
addForm.addEventListener('submit', submitHandler);
// TODO: Add delete functionality
