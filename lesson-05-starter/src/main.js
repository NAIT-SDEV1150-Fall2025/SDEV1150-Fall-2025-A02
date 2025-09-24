console.log('Lesson 03 starter loaded');

// 1. Selecting elements
/*
I want you to select the following elements
page title (id selector): <h1 id="page-title">Lesson 05 - Intro to Document Object Model (DOM)</h1>
tagline (class selector): <p class="tagline">...</p>
hero img (id selector): <img id="hero-img" src="/manipulation.jpg" alt="Hero image" />
caption (id selector): <p id="hero-caption">...</p>

to do this we're going to use the querySelector
*/
const titleEl = document.querySelector('#page-title');
const taglineEl = document.querySelector('.tagline');
const heroImg = document.querySelector('#hero-img');
const heroCaption = document.querySelector('#hero-caption');
// one min select the footer-note and the dynamic-box
const dynamicBox = document.querySelector('#dynamic-box');
const footerNote = document.querySelector('#footer-note');

// print out all values to the console
console.log('values', {
  titleEl,
  taglineEl,
  heroImg,
  heroCaption,
  dynamicBox,
  footerNote,
});

// 2. textContent vs innerHTML
// text content only modifies the text of an element
// you can't modify the html using this technique
titleEl.textContent = 'Using the DOM in Javascript';

// let's modify the dynamicBox innerHTML and see what the difference
// is if i make it text content.
dynamicBox.innerHTML = `<p class="desc">
  This was injected with <em>innerHTML</em>. <br/>
  You can add markup to this <strong>like so</strong>
</p>`;

// 3. Attributes & styles
// let's change the border color of the image.
heroImg.style.borderColor = '#451202';
// let's also change the alt attribute of the hero img
heroImg.setAttribute('alt', 'Modified by the javascript');

// 4. Create small helper functions for reuse
// we're going to do this after the break
// this is going to be handy for your assignment future examples
function updateText(selector, text) {
  // we're going to use the arguments that we passed in to
  // select an element. Note arguments are like variables that
  // are passed into a function.
  const el = document.querySelector(selector);
  if (!el) { // checks to see if there's no element
    console.warn(`No element found for "${selector}"`);
    return; // if we hit this line nothing after executes
  }
  el.textContent = text; // updating the text of the selected element
}

function updateHTML(selector, html) {
  // we need to select
  const el = document.querySelector(selector);
  if (!el) { // checks to see if there's no element
    console.warn(`No element found for "${selector}"`);
    return; // if we hit this line nothing after executes
  }
  el.innerHTML = html;
}

function setAttr(selector, name, value) {
  // selecting the element is the same as before.
  const el = document.querySelector(selector);
  if (!el) { // checks to see if there's no element
    console.warn(`No element found for "${selector}"`);
    return; // if we hit this line nothing after executes
  }
  // is that we need to use the setAttribute on the element
  el.setAttribute(name, value);
}

function setStyle(selector, styleObj = {}) {
  const el = document.querySelector(selector);
  if (!el) { // checks to see if there's no element
    console.warn(`No element found for "${selector}"`);
    return; // if we hit this line nothing after executes
  }
  // what were going to do is that we're going to loop through js object
  // and set those keys to the style of the element
  // this is a bit advanced you can use this without fully understanding so far.
  Object.entries(styleObj).forEach(([k, v]) => {
    el.style[k] = v;
  });
}

// 5. Use helpers to perform simple tasks
// we're passing concrete values to the function
updateText('h2', 'Updated with updateText function');

// let's update the first feature list item
updateHTML('.feature', `This is updated
  <strong style="color: red;">with our updateHTML function</strong>
`);

setAttr('#hero-img', 'title', 'A hover title from JS');

setStyle('#hero-img', { borderWidth: '5px', borderStyle: 'dashed' });

// let's do an example for what happens when we can't find an element
updateText('gary', 'this does not exist');

// 6. Footer text tweak (demonstrate class toggle & style change)
// one thing that's a special attribute is classes
// classes are used to apply style so you're going to have many them
// on our elements there's a special attribute called
// classList that you can add and remove them
footerNote.classList.add('footer-strong');

// let's add a few classes that don't do anything
footerNote.classList.add('js-fun', 'wow-cool');
// you can also use classList.remove to remove those pieces
footerNote.classList.remove('wow-cool');

// Require innerHTML here to render the &copy; entity correctly
footerNote.innerHTML = `&copy; 2025 Frontend fundamentals`;

// 7. Null-safety tip: check selections before using them
// this is the technique that we used in the functions here
const testElement = document.querySelector('#i-am-not-real');
if (!testElement) {
  console.warn('Element with selector "#i-am-not-real" does not exist');
}
