// Self-contained user card web component with Shadow DOM
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --card-bg: var(--global-card-bg, #ffffff);
      --card-color: var(--global-card-color, #222222);
      --card-accent: var(--global-card-accent, #0077ff);
      display: block;
    }
    .card {
      background: var(--card-bg);
      color: var(--card-color);
      border: 1px solid #e6e6e6;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      gap: 12px;
      align-items: center;
      width: 320px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }
    .name {
      color: var(--card-accent);
      display: block;
      font-size: 1.2em;
      font-weight: bold;
      margin: 0;
    }
    .description {
      font-size: 0.9rem;
      color: #666;
      display: block;
      margin-top: 4px;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      flex: 0 0 80px;
    }
  </style>

  <div class="card">
    <img src="" width="80" height="80" alt="avatar">
    <div class="info">
      <slot name="name" class="name"></slot>
      <slot name="description" class="description"></slot>
    </div>
  </div>
`;
document.body.appendChild(template);

class UserCard extends HTMLElement {
  // this essentially fires only when the component is created.
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    // Use the template defined above, no longer need to query the document
    // const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);
    const img = content.querySelector('img');
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
    shadow.appendChild(content);
  }

  // we're going to respond to the changes in avatar
  // built in to web components.
  static get observedAttributes() {
    return ['avatar']; // the only attribute that we'll observe here is
    // the avatar attribute
  }

  // below here let's do something when the attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback');
    console.log(name);
    console.log(oldValue);
    console.log(newValue);
    console.log('------------------');
    // because these values have changed we're going to update the
    // value of the image
    if (name === 'avatar' && this.shadowRoot) {
      // we can select the img from the shadowRoot using our querySelector
      // here
      const img = this.shadowRoot.querySelector('img');
      img.src = newValue; // is what the new value of the attribute is.
    }
  }
}
customElements.define('user-card', UserCard);

export default UserCard;
