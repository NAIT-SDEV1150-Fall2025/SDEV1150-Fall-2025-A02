console.log('Lesson 10 starter loaded');

// 1. Select required elements
const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');

// 2. Function to gather and structure form data

// Access values using both form.elements and query selectors

// 3. Handle form submission
// Use 'submit' event on the form, not 'click' on the button
// Prevent default behavior (navigation/reload) using event.preventDefault()
form.addEventListener('submit', (event) => {
  // we learned last class about stopPropagation
  // in this class we don't want the page to execute the
  // default action of the form when I click submit
  // we can do this with event.preventDefault()
  event.preventDefault();
  console.log('not refreshed');
});

// 4. Handle form reset - reset the result area text when the form is reset
