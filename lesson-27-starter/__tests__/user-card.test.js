// user-card.test.js
import { expect, test, describe, beforeEach, afterEach } from 'vitest';

import '../src/user-card.js'; // Import the web component definition
let element;

beforeEach(() => {
  // Set up a new instance of the component before each test
  element = document.createElement('user-card');
});

afterEach(() => {
  // Clean up after each test
  element.remove();
  element = null;
});

describe('UserCard', () => {
  test('renders with default properties', () => {
    // Act
    document.body.appendChild(element);

    // Assert
    expect(element.shadowRoot.querySelector('img').getAttribute('src')).toBe('https://placehold.co/80x80/0077ff/ffffff');
    expect(element.followed).toBe(false);
  });

  test('renders name and description', async () => {
    // Arrange
    const element = document.createElement('user-card');
    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('slot', 'name');
    nameSpan.textContent = 'Vitest User';

    const descSpan = document.createElement('span');
    descSpan.setAttribute('slot', 'description');
    descSpan.textContent = 'A user for testing with Vitest';

    element.appendChild(nameSpan);
    element.appendChild(descSpan);

    // Act
    document.body.appendChild(element);

    // Assert the result
    const nameSlot = element.shadowRoot.querySelector('slot[name="name"]');
    const descSlot = element.shadowRoot.querySelector('slot[name="description"]');
    expect(nameSlot.assignedNodes()[0].textContent).toBe('Vitest User');
    expect(descSlot.assignedNodes()[0].textContent).toBe('A user for testing with Vitest');
  });

  test('sets avatar attribute', () => {
    // Arrange
    const element = document.createElement('user-card');
    const testAvatarUrl = 'https://example.com/avatar.png';
    element.setAttribute('avatar', testAvatarUrl);

    // Act
    document.body.appendChild(element);

    // Assert
    const img = element.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).toBe(testAvatarUrl);
  });

  test('updates avatar attribute', () => {
    // Arrange
    const element = document.createElement('user-card');
    document.body.appendChild(element);

    // Act
    const testAvatarUrl = 'https://example.com/avatar.png';
    element.setAttribute('avatar', testAvatarUrl);

    // Assert
    const img = element.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).toBe(testAvatarUrl);
  });

  test('sets user property', () => {
    // Arrange
    const user = {
      id: 'user123',
      name: 'Test User',
      description: 'This is a test user.',
      avatar: 'https://example.com/user-avatar.png',
    };

    // Act
    element.user = user;
    document.body.appendChild(element);

    // Assert
    const img = element.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).toBe(user.avatar);

    const nameSlot = element.shadowRoot.querySelector('[name="name"]');
    expect(nameSlot.textContent).toBe(user.name);

    const descSlot = element.shadowRoot.querySelector('[name="description"]');
    expect(descSlot.textContent).toBe(user.description);

    expect(element.getAttribute('user-id')).toBe(user.id);
  });

  test('follow and unfollow methods', () => {
    // Arrange
    const element = document.createElement('user-card');
    document.body.appendChild(element);

    // Act
    element.follow();
    expect(element.followed).toBe(true);

    element.unfollow();
    expect(element.followed).toBe(false);
  });

  test('button click toggles follow state', () => {
    // Arrange
    const element = document.createElement('user-card');
    document.body.appendChild(element);
    const button = element.shadowRoot.querySelector('button');

    // Act
    button.click();
    expect(element.followed).toBe(true);

    button.click();
    expect(element.followed).toBe(false);
  });
});
