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
      <button>Follow</button>
    </div>
  </div>
`;
document.body.appendChild(template);

class UserCard extends HTMLElement {
  #followed = false;
  #user = null;

  constructor() {
    super();
    this.#followed = false;
    this.#user = null;
    // Bind the button handler to the custom element
    this._onButtonClick = this._onButtonClick.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    this._img = content.querySelector('img');
    this._btn = content.querySelector('button');
    shadow.appendChild(content);
  }

  _renderFromUser() {
    if (this.#user) {
      if (this.#user.avatar) {
        this._img.src = this.#user.avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }

      this.setAttribute('user-id', this.#user.id || '');
      const nameSlot = this.shadowRoot.querySelector('[name="name"]');
      if (nameSlot) {
        nameSlot.textContent = this.#user.name || '';
      }

      const descSlot = this.shadowRoot.querySelector('[name="description"]');
      if (descSlot) {
        descSlot.textContent = this.#user.description || '';
      }
    }
  }

  set user(obj) {
    this.#user = obj;
    this._renderFromUser();
  }

  get user() {
    return this.#user;
  }

  _onButtonClick() {
    this._setFollow(!this.#followed);
  }

  connectedCallback() {
    this._btn.addEventListener('click', this._onButtonClick);

    if (this.#user) {
      this._renderFromUser();
    } else {
      const avatar = this.getAttribute('avatar');
      if (avatar) {
        this._img.src = avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
    }
  }

  disconnectedCallback() {
    this._btn.removeEventListener('click', this._onButtonClick);
  }

  follow() {
    this._setFollow(true);
  }

  unfollow() {
    this._setFollow(false);
  }

  get followed() {
    return this.#followed;
  }

  _setFollow(value) {
    this.#followed = value;
    this._btn.textContent = this.#followed ? 'Following' : 'Follow';
    this.dispatchEvent(new CustomEvent('follow-change', {
      detail: { id: this.getAttribute('user-id') || null, followed: this.followed },
      bubbles: true,
      composed: true,
    }));
  }

  // Respond to attribute changes if needed in the future
  static get observedAttributes() {
    return ['avatar'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'avatar' && this.shadowRoot) {
      const img = this.shadowRoot.querySelector('img');
      if (img) {
        img.src = newValue;
      }
    }
  }
}

customElements.define('user-card', UserCard);

export default UserCard;
