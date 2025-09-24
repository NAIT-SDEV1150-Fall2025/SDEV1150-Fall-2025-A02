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

// 5. Use helpers to perform simple tasks

// 6. Footer text tweak (demonstrate class toggle & style change)

// Require innerHTML here to render the &copy; entity correctly

// 7. Null-safety tip: check selections before using them
