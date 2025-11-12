// create the element
const template = document.createElement('template');
template.innerHTML = `
<!-- CSS for our card -->
<style>
.card {
  background: #ffffff;
  color: #222222;
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
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
}
</style>

<!-- HTML for our card -->
<div class="card">
  <!-- We're going to remove the image src -->
  <img src="" width="80" height="80" alt="avatar">
  <div class="info">
    <!-- A slot allows you define where -->
    <slot name="name" class="name"></slot>
    <br/>
    <slot name="description" class="description"></slot>
  </div>
</div>
`;

// create a class that extends HTMLElement
class UserCard extends HTMLElement {
  // remember from 1001 that the constructor
  // is the method on the class that is called
  // when you create an instance of this class
  constructor() {
    // pretty common syntax
    super(); // call the contructor() method on
    // the HTML class.
    // "this" in javascript is equivalent to
    // "self" in python
    // "this" refers the instance created.
    const shadow = this.attachShadow({ mode: 'open' });
    // we're going to clone and attach the template
    // to the shadowDom.
    // when we were using the templat in the html file.
    // const template = document.querySelector(
    //   '#user-card-template',
    // );
    // we're going to create a copy of this element
    // so that we can modify and change it and it
    // won't modify the existing template.
    const content = template.content.cloneNode(true);
    // above we have the template that's created by the template
    // string, with the styles in it so it's fully self contained.

    // below here we've used an attribute to actually create an element here.
    // we're going get the attribute avatar from the user card call
    // <user-card avatar="assets/zelda-avatar.png"></user-card>
    let avatarAttribute = this.getAttribute('avatar');
    // console.log(avatarAttribute || 'https://placehold.co/80x80/0077ff/ffffff');
    // if the above is empty it'll default to placeholder.
    // select the image from the content
    let image = content.querySelector('img');
    // set the attribute
    // if avatarAttribute exists, then use that, otherwise use the placeholder
    image.src = avatarAttribute || 'https://placehold.co/80x80/0077ff/ffffff';

    // add the html to our component
    shadow.appendChild(content);
  }
}

// in here we need to register our component with
// customElements object.
customElements.define('user-card', UserCard);
