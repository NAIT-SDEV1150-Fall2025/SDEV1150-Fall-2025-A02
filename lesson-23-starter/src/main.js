// Import the user-card component to register the custom element
import './user-card.js';

const users = [
  { id: 'u1', name: 'Zelda', avatar: 'assets/zelda-avatar.png', description: 'Princess of Hyrule' },
  { id: 'u2', name: 'Link', avatar: 'assets/link-avatar.png', description: 'Hero of Hyrule' },
  { id: 'u3', name: 'Mipha', description: 'Zora Champion' },
];

const main = document.querySelector('main');
// loop through all users
users.forEach((userObject) => {
  // we're going to create a card
  const card = document.createElement('user-card');
  // we're going to use the setter that we've created here.
  card.user = userObject;
  // append to the page.
  main.appendChild(card);
});

// listen to the follow change event on main
// I want you to update the followed count based on
// if the event target (a user card) is being followed (property)
// get the total and update it on the element select with
// #follow-counter
let followCount = 0;

main.addEventListener('follow-change', (event) => {
  // get the element
  let element = event.target;
  console.log(element);
  console.log(element.followed);
  console.log(event.detail);
  if (element.followed) {
    followCount++; // followCount = followCount + 1;
  } else {
    followCount--; // followCount = followCount - 1;
  }
  console.log(`Total followed: ${followCount}`);
  // counter element
  const counterElement = document.querySelector('#follow-counter');
  counterElement.textContent = `Followed: ${followCount}`;
});

// Theme toggle button logic
let dark = false;
const toggleBtn = document.querySelector('#btn-theme');
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.style.setProperty('--global-card-bg', dark ? '#1f2937' : '#ffffff');
  document.documentElement.style.setProperty('--global-card-color', dark ? '#e5e7eb' : '#222222');
  document.documentElement.style.setProperty('--global-card-accent', dark ? 'gold' : '#0077ff');
  toggleBtn.textContent = dark ? '☀️' : '🌙';
});
