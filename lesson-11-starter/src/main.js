console.log('Lesson 10 starter loaded');

const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');

function serializeForm(formEl) {
  const { fullName, email, bio } = formEl.elements;

  const plan = formEl.elements.plan.value;

  const topics = Array.from(formEl.querySelectorAll('input[name="topics"]:checked'))
    .map(cb => cb.value);

  return {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    plan,
    topics,
    bio: bio.value.trim(),
    submittedAt: new Date().toLocaleString(),
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // just a note this won't get fired if attributes with
  // required aren't filled out.
  const data = serializeForm(form);

  result.textContent
    = `Submission received:
      - Name: ${data.fullName || '(none)'}
      - Email: ${data.email || '(none)'}
      - Skill: ${data.plan || '(none)'}
      - Strengths: ${data.topics.length ? data.topics.join(', ') : '(none)'}
      - Bio: ${data.bio || '(none)'}
      - Time: ${data.submittedAt}`;
});

form.addEventListener('reset', () => {
  result.textContent = 'Awaiting submission...';
});

// 1. Add validation logic to the form on 'input' events
// we're going to listen a new event which is the input event.
// this will fire whenever we change an input
form.addEventListener('input', (event) => {
  // we're going to get the element that the "input" event
  // is happening on with the event.target.
  const element = event.target;
  console.log('input event fired on');
  console.log(element);
});

// 1.1 custom validation for fullName (must contain two words)

// 1.2 custom validation for bio (minimum length)

// 1.3 custom validation for email (basic pattern check)

// 1.4 report the validity status to the user
