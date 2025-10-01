console.log('Lesson 08 starter loaded');

// 1. load event (document ready) - NOTE this is unnecessary if using `defer` in the script tag or using module type
// the window contains information about the browser, everything in js.
// the page and where you're at.
console.log(window);
// add event listener takes two arguments
// 'DOMContentLoaded' is the event type (first arg)
// () => { /* ... */ } is the function (second arg)
// all event listeners look like this.
// note this is not needed if you use defer or using type="module"
window.addEventListener('DOMContentLoaded', () => {
  // 2. Selecting elements
  /* select with the following ids
  btn-toggle
  btn-message
  message
  hover-card
  key-output
  list
  selection
  */
  const btnToggle = document.querySelector('#btn-toggle');
  const btnMessage = document.querySelector('#btn-message');
  const message = document.querySelector('#message');
  const hoverCard = document.querySelector('#hover-card');
  const keyOutput = document.querySelector('#key-output');
  const list = document.querySelector('#list');
  const selection = document.querySelector('#selection');

  console.log({
    btnToggle,
    btnMessage,
    message,
    hoverCard,
    keyOutput,
    list,
    selection,
  });

  // 3. click: toggle a highlight class on the body
  // 'click' means when you actually use the mouse to click
  btnToggle.addEventListener('click', () => {
    // we're going to add the toggle on the body
    // on classList there's a function called toggle
    document.body.classList.toggle('highlight');
    // we're check to see if that element contains the class (with classList)
    const on = document.body.classList.contains('highlight');
    // on is going to be a true or false
    if (on) { // you can also do if (on === true) { ... }
      btnToggle.textContent = 'Highlight is ON!';
    } else {
      btnToggle.textContent = 'Highlight is OFF!';
    }
  });
  // if I click any where else on the page than this button
  // this code won't execute.

  // 4. click: change message textContent (no HTML parsing)

  // 5. mouseover / mouseout: display hover status on the card

  // 6. keydown: show last key pressed (global listener)

  // 7. Event delegation: one listener on the <ul> for all <li> elements

});

