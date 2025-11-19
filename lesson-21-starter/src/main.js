// Import the user-card component to register the custom element
import './user-card.js';

// Create an additional user card using HTML and append it to the main element
const dynamicUserCard = `
    <user-card
      avatar="https://placehold.co/80x80/7700ff/ffffff"
    >
      <span slot="name">Mipha</span>
      <span slot="description">Zora Champion</span>
    </user-card>`;

document.querySelector('main').insertAdjacentHTML('beforeend', dynamicUserCard);

// Create another user card using JavaScript DOM API only and append it to the main element
const anotherUserCard = document.createElement('user-card');
anotherUserCard.setAttribute('avatar', 'https://placehold.co/80x80/770000/ffffff');
const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'Yunobo';
const descSpan = document.createElement('span');
descSpan.setAttribute('slot', 'description');
descSpan.textContent = 'President of YunoboCo';
anotherUserCard.appendChild(nameSpan);
anotherUserCard.appendChild(descSpan);

document.querySelector('main').appendChild(anotherUserCard);

// Add a button to toggle the theme accent color (used to demonstrate CSS variables cascading into Shadow DOM)
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Toggle theme';
document.body.prepend(toggleBtn);

let dark = false;
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.style.setProperty('--global-card-bg', dark ? '#1f2937' : '#ffffff');
  document.documentElement.style.setProperty('--global-card-color', dark ? '#e5e7eb' : '#222222');
  document.documentElement.style.setProperty('--global-card-accent', dark ? 'gold' : '#0077ff');
});

// we can select a card programmatically and follow
// or unfollow it.
// let's select this first one
let firstCard = document.querySelector('user-card');

// we can use our follow and unfollow in our code.
firstCard.follow();

// this is essentially using the getter here.
console.log(firstCard.followed);

// we're going to listen to the event of
// follow-change that we emitted in our function
// here.
firstCard.addEventListener('follow-change', (event) => {
  console.log('Follow change triggered');
  console.log(event.detail);
});
// if you want this from all cards here.
// document.addEventListener('follow-change', (event) => {
// or the parent here.
