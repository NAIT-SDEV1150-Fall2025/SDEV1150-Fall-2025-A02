import { fetchData, postData } from './utils';

const loadButton = document.getElementById('loadBooks');
const addForm = document.getElementById('addBook');
const list = document.getElementById('bookList');
// break this again
const endpoint = 'http://localhost:3000/books';

async function loadHandler() {
  list.innerHTML = '<li>Loading...</li>';

  // we can access the button and add a piece that
  // will the button.
  console.log('loadButton.disabled', loadButton.disabled);
  loadButton.disabled = true;
  try {
    // somethings wrong what's wrong here?
    // we fixed this by adding the "await"
    // keyword because fetchData is an async function
    const books = await fetchData(endpoint);
    // if the above fails (and it throws an error)
    // we need to handle it.
    console.log(books);
    // Simulate a delay for demonstration purposes
    await new Promise(resolve => setTimeout(resolve, 5000));

    list.innerHTML = '';

    books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      list.appendChild(li);
    });
  } catch (error) {
    // render the error to the user
    list.innerHTML = `Error while fetching ${error}`;
  } finally {
    // set it false reenable the button.
    loadButton.disabled = false;
  }
}

async function submitHandler(e) {
  e.preventDefault(); // never reload the page
  const form = e.target;
  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());
  data['year'] = Number(data.year); // convert year to number

  try {
    await postData(endpoint, data);

    // Call loadHandler to refresh the list
    await loadHandler();
    // Reset the form
    form.reset();
  } catch (error) {
    // TODO: Display a better error for the user
    console.error('Error submitting form:', error);
  }
}

loadButton.addEventListener('click', loadHandler);
addForm.addEventListener('submit', submitHandler);
