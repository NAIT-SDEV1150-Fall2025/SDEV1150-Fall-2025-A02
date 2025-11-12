// Import the user-card component to register the custom element
import './user-card.js';

// Create an additional user card using HTML and append it to the main element
const dynamicUserCard = `
  <user-card>
      <span slot="name">Dan</span>
      <span slot="description">Prince of nothing</span>
  </user-card>
`;
let main = document.querySelector('main');
main.insertAdjacentHTML('beforeend', dynamicUserCard);

// Create another user card using JavaScript DOM API only and append it to the main element
// add it using the dom api!
const anotherUserCard = document.createElement('user-card');
anotherUserCard.setAttribute('avatar', 'https://placehold.co/80x80/green/red');
// create a name span
const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'Gary Steves';
// description
const descSpan = document.createElement('span');
descSpan.setAttribute('slot', 'description');
descSpan.textContent = 'A great frontend developer';

// attach them
anotherUserCard.appendChild(nameSpan);
anotherUserCard.appendChild(descSpan);

// attach to page.
main.appendChild(anotherUserCard);
