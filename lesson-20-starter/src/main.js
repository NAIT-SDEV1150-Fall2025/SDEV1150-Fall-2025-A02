// Import the user-card component to register the custom element
import './user-card.js';

// Create an additional user card using HTML and append it to the main element
const dynamicUserCard = `
    <user-card avatar="https://placehold.co/80x80/red/blue">
      <span slot="name">Mipha</span>
      <span slot="description">Zora Champion</span>
    </user-card>`;

document.querySelector('main').insertAdjacentHTML('beforeend', dynamicUserCard);

// Create another user card using JavaScript DOM API only and append it to the main element
const anotherUserCard = document.createElement('user-card');
// below that this style is not being updated in our component.

// for this line to be applied below we need to "observe" the changes
anotherUserCard.setAttribute('avatar', 'https://placehold.co/80x80/green/yellow');




const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'Yunobo';
const descSpan = document.createElement('span');
descSpan.setAttribute('slot', 'description');
descSpan.textContent = 'President of YunoboCo';
anotherUserCard.appendChild(nameSpan);
anotherUserCard.appendChild(descSpan);

document.querySelector('main').appendChild(anotherUserCard);
// Why doesn't the custom avatar show up for this element?

// something very common is adding a "dark mode"
// we're going to create a toggle button here

const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Toggle Theme (change to dark)';

document.body.prepend(toggleBtn);

// I'm going create a variable
let dark = false;

toggleBtn.addEventListener('click', () => {
  // trigger it back and forth from true to false.
  dark = !dark;
  // inside of our code we're going check if it's dark
  let cardBGColor = '#ffffff';
  let cardColor = '#222222';
  let cardAccentColor = '#0077ff';
  toggleBtn.textContent = 'Toggle Theme (change to dark)';
  // if it's dark we're going to change these colors
  if (dark) {
    cardBGColor = '#1f2937';
    cardColor = '#e5e7eb';
    cardAccentColor = 'gold';
    toggleBtn.textContent = 'Toggle Theme (change to light)';
  }
  console.log(cardBGColor);
  console.log(cardColor);
  console.log(cardAccentColor);
  // let's set the --global-card-bg etc properties on the css
  // globally so that our card will use the colors defined.
  document.documentElement.style.setProperty(
    '--global-card-bg', cardBGColor,
  );
  document.documentElement.style.setProperty(
    '--global-card-color', cardColor,
  );
  document.documentElement.style.setProperty(
    '--global-card-accent', cardAccentColor,
  );
});
