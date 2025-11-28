import { expect, describe, test } from 'vitest';
// we're going to import our card.
import '../src/user-card.js';

// let's create a section
describe('UserCard', () => {
  // we're going to put a few tests.
  test('renders with the default properties', () => {
    // Arrange step
    // create an element
    const element = document.createElement('user-card');
    document.body.appendChild(element);
    // Act (we're not going to do here)
    // where you do the thing

    // Assert make sure that's it's correct
    // first we're going to check that the shadowroot has
    // the image placeholder
    const EXPECTED_IMAGE = 'https://placehold.co/80x80/0077ff/ffffff';
    expect(
      element.shadowRoot.querySelector('img').getAttribute('src'),
    ).toBe(EXPECTED_IMAGE);
    // if you add .not in front of to be it tests the opposite.
    // the followed to be false
    const EXPECTED_FOLLOWED = false;
    expect(element.followed).toBe(EXPECTED_FOLLOWED);
  });

  // we're going test the slots
  test('renders a name and a description', () => {
    // Arrange step
    // create an element
    const element = document.createElement('user-card');
    document.body.appendChild(element);
    // create two spans and insert them in the slots.
    const EXPECTED_NAME_SLOT = 'Vitest user';
    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('slot', 'name');
    nameSpan.textContent = EXPECTED_NAME_SLOT;

    const EXPECTED_DESCRIPTION_SLOT = 'Vitest Description of User';
    const descriptionSpan = document.createElement('span');
    descriptionSpan.setAttribute('slot', 'description');
    descriptionSpan.textContent = EXPECTED_DESCRIPTION_SLOT;

    // I need to append the slots to the element
    element.appendChild(nameSpan);
    element.appendChild(descriptionSpan);

    // go to ASSERT step
    // check that our slots are correct.
    // let's get the slots
    const nameSlot = element.shadowRoot.querySelector('slot[name="name"]');
    const descriptionSlot = element.shadowRoot.querySelector('slot[name="description"]');
    expect(nameSlot.assignedNodes()[0].textContent).toBe(EXPECTED_NAME_SLOT);
    expect(descriptionSlot.assignedNodes()[0].textContent).toBe(EXPECTED_DESCRIPTION_SLOT);
  });

  // I want you to write a test that the avatar attribute is set correctly
  test('sets an avatar attribute', () => {
    // create an element
    const element = document.createElement('user-card');
    // set an avatar with setAttribte on that element
    const TEST_AVATAR_URL = 'http://example.com/lol/avatar/hi.jpg';
    element.setAttribute('avatar', TEST_AVATAR_URL);
    // append it to the page.
    document.body.appendChild(element);

    // assert that the image is update to that element
    expect(
      element.shadowRoot.querySelector('img').getAttribute('src'),
    ).toBe(TEST_AVATAR_URL);
  });

  // try to test setting the user
  // try to test the follow and unfollow methods
  // try to test the button click on the follow of the element.
});
