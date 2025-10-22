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
  // console.log(element);
  console.log(element.name); // name of the element
  console.log(element.value);
  // remember that this element above will depend on which
  // input you are changing!
  // now that we know we have the element we can begin to check
  // what element we've selected, and also perform some validation

  // 1.1 custom validation for fullName (must contain two words)
  if (element.name === 'fullName') {
    console.log('fullName Selected');
    const REQUIRED_NAME_PARTS = 2;
    // ensure that the user inputs a value that's two words.
    // we'll use split (trim just removes space on either side)
    const fullNameParts = element.value.trim().split(' ');
    if (fullNameParts.length < REQUIRED_NAME_PARTS) {
      // this is a function on elements on the dom.
      element.setCustomValidity('Full Name must contain at least two words');
    } else {
      // remove this validity if valid (because it has more than two)
      element.setCustomValidity('');
    }
  }

  // 1.2 custom validation for bio (minimum length)
  // I want you to check the bio, add a message if it's less than 40 characters
  // and that message can say "Bio is too short (must be 40 characters)"
  // use what you've learned to do this.
  // first step is to check if it's the correct element
  if (element.name === 'bio') {
    // I want to check to see if the length
    // is greater than 40
    const MIN_LENGTH = 40;
    const bioLength = element.value.trim().length;
    if (bioLength < MIN_LENGTH) {
      // if my bio is less than the min case we need to handle it
      element.setCustomValidity('Bio is too short (must be 40 characters)');
    } else {
      // this is the valid case
      element.setCustomValidity('');
    }
  }
  // 1.3 custom validation for email (basic pattern check)
  // I want you to check to if the string as an @ in it.
  // remember that strings are character arrays NOTE!
  // show an error message that says "invalid email".
  if (element.name === 'email') {
    // for character arrays you can check to see if a string includes
    // another with .includes!
    // method 1
    // if (!element.value.includes('@')) {
    //   element.setCustomValidity('Invalid email must contain @ symbol');
    // } else {
    //   element.setCustomValidity('');
    // }
    // method 2: regex (the bazooka you didn't need but have)
    // you can take a look at an email regex here: https://regex101.com/r/SOgUIV/2
    // always take a look at someone else's first.
    const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    // in a regex you can use .test(yourString); which will return true or false
    if (!EMAIL_REGEX.test(element.value.trim())) {
      element.setCustomValidity('Invalid email, trust the regex!');
    } else {
      element.setCustomValidity('');
    }
  }

  // useful for assingment 2
  // you can use validationMessage property on the element
  // once you've set the customValidity.
  console.log('Element selected');
  console.log(element);
  console.log('validationMessage on the element itself');
  console.log(element.validationMessage);
  // the validation message above is going to show something
  // what is passed into the setCustomValidity or the html
  // validity message.

  // 1.4 report the validity status to the user
  element.reportValidity();
  // to show the validity on the page you need this line to execute.
});
