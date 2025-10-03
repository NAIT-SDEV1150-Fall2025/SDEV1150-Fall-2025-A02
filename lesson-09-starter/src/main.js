console.log('Lesson 10 starter loaded');

// ============== Propagation demo

// 1. Select required elements
const log = document.getElementById('log');
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');
const button = document.getElementById('btn-propagate');
// 2. Add event listeners

// 2.1 Outer div - using a named function
function outerClick() { // another way to write a function
  log.textContent += `Outer clicked (captured) |`; // are going to continuous add to the log.
}
// if you use the above function in an event listener, you need to pass by reference(just the definition)
outer.addEventListener('click', outerClick);
// 2.2 Inner div - using an anonymous function
// to add the text `Inner clicked (captured) |`
// the inner div when clicked.
inner.addEventListener('click', function () { // is equivalent to () => { in case you were wondering
  log.textContent += `Inner clicked (captured) |`;
});

// 2.3 Button - using an arrow function
// we're going to see if we stopProgatation it will not bubble to the parents.
button.addEventListener('click', (event) => {
  // stop the propagation (a method on the event object)
  event.stopPropagation();
  log.textContent += `Button clicked (captured) |`;
  // this is the only function that fires it does not bubble up to the event
  // listeners of the inner and outer divs.
});

// ============== Gallery demo

// 1. Select required elements

// 2. Add event listeners

// 2.1 Thumbnails container - using an arrow function

// 2.2 Close button - using an arrow function

// Student TODO: Add event listener to document, which closes
// the viewer when the Escape key is pressed
