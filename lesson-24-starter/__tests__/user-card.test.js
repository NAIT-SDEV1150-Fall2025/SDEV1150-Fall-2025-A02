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
})
