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
  const hoverStatus = document.querySelector('#hover-status');
  const keyOutput = document.querySelector('#key-output');
  const list = document.querySelector('#list');
  const selection = document.querySelector('#selection');

  console.log({
    btnToggle,
    btnMessage,
    message,
    hoverCard,
    hoverStatus,
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
  // on the btnElement change the message element text
  btnMessage.addEventListener('click', () => {
    // the date object
    console.log(new Date());
    // get the time of an element slightly formatted
    const timeString = new Date().toLocaleTimeString();
    // we're going to use the Date object more s othat we can
    // use time in our applciation.
    // update the element
    message.textContent = `Updated at ${timeString}`;
  });

  // 5. mouseover / mouseout: display hover status on the card
  // the mouseover and mouseout event fire when you move
  // your mouse over it.
  hoverCard.addEventListener('mouseover', () => {
    hoverStatus.textContent = 'Status: HOVERING';
  });
  // note: mouseover and mouseout are different events
  // we need to make a second event listener for this.
  hoverCard.addEventListener('mouseout', () => {
    hoverStatus.textContent = 'Status: NOT HOVERING';
  });

  // 6. keydown: show last key pressed (global listener)
  // create an event listener that listens to keydown event
  // to pass the "event" object to the function and use
  // event.key to populate the keyOutput.
  // instead of an element, we're going to add the event listener
  // to the document itself.
  document.addEventListener('keydown', (event) => {
    // we're going to talk about this more but the event object
    // is a special object that javascript provides us
    // that has a lot of information about the event.
    // console.log(event);
    // on the event object we're going to event.key
    keyOutput.textContent = `Last key: ${event.key}`;
  });

  // 7. Event delegation: one listener on the <ul> for all <li> elements
  list.addEventListener('click', (event) => {
    // remember the event object gives us more infor on the event.
    // we're going to talk about the event target.
    // this is the most specific element that the event
    // is happening on.
    console.log(event.target);
    // note here that if I click any of the items, I'm
    // still clicking the list.
    // we're only going to do something if the tagName is
    // a list item (li)
    console.log(event.target.tagName);

    if (event.target.tagName === 'LI') {
      // we're going to remove the active class from
      // existing items we'll see how this looks after.
      // we can do this with querySelectorAll
      const activeItems = document.querySelectorAll('li.active');
      // loop through each and remove the active class
      activeItems.forEach((element) => {
        // remove the active class from those elements
        element.classList.remove('active');
      });
      // I'm going to add the active class
      // on the event.target element
      event.target.classList.add('active');
    }
  });
});
