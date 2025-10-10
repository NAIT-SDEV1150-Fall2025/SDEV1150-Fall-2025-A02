console.log('Lesson 10 starter loaded');

// 1. Select required elements
const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');

// 2. Function to gather and structure form data
function serializeForm(formElement) {
  // we're going to gather the data from the elements
  // console.log(formElement.elements);
  // let's get the fullname with the . notation
  // let fullName = formElement.elements.fullName; // fullName is the "name" attribute on the html element here.
  // now that we know that this element is defined
  // console.log(fullName);
  // you can access the value with .value
  // console.log(fullName.value);

  // get the email and the bio from the form.
  // let email = formElement.elements.email;
  // let bio = formElement.elements.bio;
  // below is the same as the above just done in a
  // different with destructuring. You're
  // going to see it elsewhere so the abve you can
  // do multiple assignment with object destructuring
  let { fullName, bio, email } = formElement.elements;
  // the way that it's connecting the name to the varaible
  // is that the name is the same as the property/attribute
  // on the formElement.elements

  // let's select select the plan
  // this is a radio which is a bit different
  // a radio you can only select a single item.
  let plan = formElement.elements.plan; // plan is the name of the input
  // since it's a single item you can just get the value.
  // console.log(plan.value);
  // note: the value is equivalent to the value in the input.

  // we're going to do a few steps in one line.
  // 1. we're going to select the inputs with that element (querySelectorAll)
  // the css selector that you folks will use input[name="topics"]:checked
  // console.log(formElement.querySelectorAll('input[name="topics"]:checked'));
  // this is selecting all elements that are checked.
  // 2. we're going to convert to an array
  // we need to do this because a NodeList doesn't have map.
  let topicElementsArray = Array.from(formElement.querySelectorAll('input[name="topics"]:checked'));
  console.log('topicElementsArray', topicElementsArray);

  // just an array note: Array.from converts non arrays to arrays.
  // 3. we're going to use a new loop called map, it behaves the same way as
  // a forEach loop but you can return a modified array. This is a technique
  // that you'll use a ton in the second level of this program.
  let topics = topicElementsArray.map((topicElement) => {
    // you're returning the modified value to the new array
    return topicElement.value;
  });
  console.log('topics', topics);

  return {
    fullName: fullName.value,
    bio: bio.value,
    email: email.value,
    plan: plan.value,
    topics: topics
  };
}
// Access values using both form.elements and query selectors

// 3. Handle form submission
// Use 'submit' event on the form, not 'click' on the button
// Prevent default behavior (navigation/reload) using event.preventDefault()
form.addEventListener('submit', (event) => {
  console.log('form submitted');
  // we learned last class about stopPropagation
  // in this class we don't want the page to execute the
  // default action of the form when I click submit
  // we can do this with event.preventDefault()
  event.preventDefault(); // this is needed on every form.
  // the main thing you want to do with forms is get the form data
  // and do something with that form data.
  const data = serializeForm(form);
  // a note the above line is equivalent to
  // const data = serializeForm(event.target);
  // because the event.target is the form in this instance.
  // console.log('data', data);
});


// 4. Handle form reset - reset the result area text when the form is reset
