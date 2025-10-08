console.log('Lesson 10 starter loaded');

// 1. Select required elements
const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');

// 2. Function to gather and structure form data
function serializeForm(formElement) {
  // we're going to gather the data from the elements
  console.log(formElement.elements);
}
// Access values using both form.elements and query selectors

// 3. Handle form submission
// Use 'submit' event on the form, not 'click' on the button
// Prevent default behavior (navigation/reload) using event.preventDefault()
form.addEventListener('submit', (event) => {
  console.log('form submitted');
  // we learned last class about stopPropagation
  // in this class we don't want the page to execute the
  // default action of the form when I click submit
  // we can do this with event.preventDefault()
  event.preventDefault();
  // the main thing you want to do with forms is get the form data
  // and do something with that form data.
  const data = serializeForm(form);
  // a note the above line is equivalent to
  // const data = serializeForm(event.target);
  // because the event.target is the form in this instance.
  console.log('data', data);
});

// 4. Handle form reset - reset the result area text when the form is reset
