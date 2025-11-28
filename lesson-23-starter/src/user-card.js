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
  // our internal state as private variables.
  #followed = false;
  #user = null;

  constructor() {
    super();

    // Added property to track follow state
    this.#followed = false;
    this.#user = null;
    // bind a button handler function
    this._onButtonClick = this._onButtonClick.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);

    // our new image property
    this._img = content.querySelector('img');
    // remove the funcitonality from the constructor
    // img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';

    this._btn = content.querySelector('button');
    // remove the funcitonality from the constructor
    // this._btn.addEventListener('click', () => this._onFollow());
    // not here: we're going to move these to the lifecycle
    // call back function.
    shadow.appendChild(content);
  }

  // we're going to create from the user object.
  // we also want to trigger this whenever we set the user object.
  _renderFromUser() {
    // lets just check if the user exists
    if (this.#user) {
      // handle each attribute.
      // handle avatar
      console.log(this._img);
      if (this.#user.avatar) {
        this._img.src = this.#user.avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
      // handle the id
      // we're just going to set it as an attribute
      this.setAttribute('user-id', this.#user.id || '');
      // the above handles both cases if it's blank it'll just set it
      // to an empty string.

      // handle the name
      // select the name slot from the shadow root
      const nameSlot = this.shadowRoot.querySelector('[name="name"]');
      // [name="name"] css selector to select by attribute name, value pair.
      if (nameSlot) {
        // set it the user name if exists otherwise empty string.
        nameSlot.textContent = this.#user.name || '';
      }
      // handle the description
      const descriptionSlot = this.shadowRoot.querySelector('[name="description"]');
      // [description="description"] css selector to select by attribute description, value pair.
      if (descriptionSlot) {
        // set it the user description if exists otherwise empty string.
        descriptionSlot.textContent = this.#user.description || '';
      }
    }
  }

  // set this is going to look like we're assigning via an attribute
  // but will call this setter function.
  set user(obj) {
    console.log('from the user setter');
    console.log(obj);
    // set the object
    // our object will have the follow {id, name, avatar, description}
    this.#user = obj;
    // later we're going to render from the user object.
    this._renderFromUser();
  }

  // since the #user is private. if we want to make it accessible we need to have
  // a getter
  get user() {
    return this.#user;
  }

  // we have our event handler fro the button
  _onButtonClick() {
    this._setFollow(!this.#followed);
  }

  // LifeCycle method
  // fired when the component is added to the page.
  connectedCallback() {
    // attach local listeners.
    this._btn.addEventListener('click', this._onButtonClick);
    // if the property of user was added before it's connected to the
    if (this.#user) {
      // render it
      this._renderFromUser();
    } else {
      // fall back to the attributes.
      const avatar = this.getAttribute('avatar');
      if (avatar) {
        this._img.src = avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
    }
  }

  // LifeCycle method
  // fired when removed
  disconnectCallback() {
    this._btn.removeEventListener('click', this._onButtonClick);
  }

  follow() {
    this._setFollow(true);
  }

  unfollow() {
    this._setFollow(false);
  }

  // Property to read followed state
  get followed() {
    return this.#followed;
  }

  _setFollow(value) {
    this.#followed = value;
    this._btn.textContent = this.#followed ? 'Following' : 'Follow';
    this.dispatchEvent(new CustomEvent('follow-change', {
      detail: {
        id: this.getAttribute('user-id') || null,
        followed: this.#followed,
      },
      bubbles: true,
      composed: true,
    }));
  }

  // Follow button handler
  _onFollow() {
    this._setFollow(!this.#followed);
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
