console.log('Lesson 06 starter loaded');

// Selecting elements
const titleEl = document.querySelector('#page-title');
const taglineEl = document.querySelector('.tagline');
const heroImg = document.querySelector('#hero-img');
const heroCaption = document.querySelector('#hero-caption');
const dynamicBox = document.querySelector('#dynamic-box');
const footerNote = document.querySelector('#footer-note');

// 1. Create a new variable for the feature list element
// select the list element
let featureList = document.querySelector('#feature-list');

// 2. Add feature list to the displayed elements below
console.log('Selected elements:', {
  titleEl, taglineEl, heroImg, heroCaption, dynamicBox, footerNote,
});

// 3. Modify list content

// 4. Add a new item dynamically
// to add a list element, we're going to create an item
// modify it's classList and textContent
const newLi = document.createElement('li');
newLi.classList.add('feature');
newLi.textContent = 'Flexible';
console.log(newLi);
// we need to attach to the list.
featureList.appendChild(newLi); // note you can use append as well.

// 5. Retreive all list items (querySelectorAll) and update their text
// we're going to modify the text content of all list items
// with querySelectorAll and loops.
// we're going to select all items with the class "feature"
let featureItems = document.querySelectorAll('.feature');

console.log(featureItems); // multiple items in a NodeList.
// with NodeLists you can loop through each item with
// forEach (and a function that will execute every iteration.)
// debugger; if you want to see the functionality (step the forEach)
// and uncomment the debugger line.
featureItems.forEach((element, index) => { // a function syntax
  // console.log(index, element);
  // we're going to add the index + 1 to the text content
  // of the element
  element.textContent = `feature: ${index + 1} ${element.textContent}`;
});

// 6. Removing the first item from the list using DOM relationships to find it
// you can access the first element child of parent by using the
// .firstElementChild attribute
console.log('The first element child of the list is');
console.log(featureList.firstElementChild);

// we're going to remove it.
featureList.removeChild(featureList.firstElementChild);

// 7. Update the second item using nextElementSibling
// we're going to see that the first element child is now different
// console.log(featureList.firstElementChild);
// we can use .nextElementSibling to access the next sibling (going downwards)
featureList.firstElementChild.nextElementSibling.textContent += ' (updated!)';

// 8. Move the last item to the front of the list
// this is the same access as above but you can always put it in a variable
// that is more readable and understandable.
const firstElement = featureList.firstElementChild;
const lastElement = featureList.lastElementChild;

featureList.insertBefore(
  lastElement,
  firstElement,
);

// 9. Use a timer to add a new item after 3 seconds have passed
// time in timers in javascript in in milliseconds.
// so what we're going to is were going add the item after 3 seconds
const THREE_SECONDS = 3000;
setTimeout(() => {
  // console.log('hello after 3 seconds');
  // add an item to the list.
  const liAfterThree = document.createElement('li');
  liAfterThree.classList.add('feature');
  liAfterThree.textContent = 'Added after three seconds.';
  console.log(liAfterThree);
  // we need to attach to the list.
  featureList.appendChild(liAfterThree);
}, THREE_SECONDS);

// **** THE FOLLOWING IS EXISTING CODE FROM LESSON 05

// textContent vs innerHTML
titleEl.textContent = 'DOM: Your JavaScript Window into Page Structure';

dynamicBox.innerHTML = `
  <p class="desc">
    This block was injected with <em>innerHTML</em>. It can include <strong>markup</strong>.
  </p>
`;

// When you only need text (no markup), prefer textContent:
heroCaption.textContent = 'This caption was updated using textContent.';

// Attributes & styles
heroImg.setAttribute('alt', 'A replaceable sample image');
heroImg.style.borderColor = '#0d6efd'; // inline style to illustrate visual change

// Create small helper functions for reuse
function updateText(selector, text) {
  const el = document.querySelector(selector);
  if (!el) return console.warn('No element found for', selector);
  el.textContent = text;
}

function updateHTML(selector, html) {
  const el = document.querySelector(selector);
  if (!el) return console.warn('No element found for', selector);
  el.innerHTML = html;
}

function setAttr(selector, name, value) {
  const el = document.querySelector(selector);
  if (!el) return console.warn('No element found for', selector);
  el.setAttribute(name, value);
}

function setStyle(selector, styleObj = {}) {
  const el = document.querySelector(selector);
  if (!el) return console.warn('No element found for', selector);
  Object.entries(styleObj).forEach(([k, v]) => {
    el.style[k] = v;
  });
}

// Use helpers to perform simple tasks
updateText('.tagline', 'Selecting, reading, and modifying nodes with JavaScript.');
updateHTML('#dynamic-box', `
  <p class="desc">
    Replaced again via <code>updateHTML()</code>. Notice how we can inject different markup here.
  </p>
`);

setAttr('#hero-img', 'title', 'Hover title set from JS');
setStyle('#hero-img', { borderColor: 'navy' });

// Footer text tweak (demonstrate class toggle & style change)
footerNote.classList.add('footer-strong');
// Require innerHTML here to render the &copy; entity correctly
footerNote.innerHTML = '&copy; 2025 Front End Fundamentals';

// Null-safety tip: check selections before using them
const missing = document.querySelector('#does-not-exist');
if (!missing) {
  console.warn('Selector #does-not-exist did not match any element.');
}
