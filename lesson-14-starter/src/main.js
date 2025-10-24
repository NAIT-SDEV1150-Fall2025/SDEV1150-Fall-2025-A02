// let's import animejs into our project
import { animate } from 'animejs';

// let's import our function from the same folder.
// use it in our code.
// named imports can all be imported like so.
import { greetUser, getDate, getTime } from './utils';
// 2. I want you import the date function
// we did this above, for named exports you can have
// how every you'd like.
// I want to update the date and time of ids today, time
// let's test it out

// select the ids
let today = document.querySelector('#today');
let time = document.querySelector('#time');
// render the times
today.textContent = `the date is ${getDate()}`;
time.textContent = `the time is ${getTime()}`;

const greeting = greetUser('dan');

console.log('We used modules!');
console.log(greeting);

// let's add the greeting
let greetingElement = document.querySelector('#greet');
greetingElement.textContent = greeting;

// we're going to use anime to create animation
// note go explore the documentation more
// here for different types of animations
animate('#greet', {
  translateY: [-20, 0],
  opacity: [0, 1],
  duration: 5000,
  easing: 'easeOutQuad',
});
