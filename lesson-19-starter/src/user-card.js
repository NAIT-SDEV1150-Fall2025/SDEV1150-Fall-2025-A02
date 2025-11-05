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
    const template = document.querySelector(
      '#user-card-template',
    );
    // we're going to create a copy of this element
    // so that we can modify and change it and it
    // won't modify the existing template.
    const content = template.content.cloneNode(true);

    // add the html to our component
    shadow.appendChild(content);
  }
}

// in here we need to register our component with
// customElements object.
customElements.define('user-card', UserCard);
