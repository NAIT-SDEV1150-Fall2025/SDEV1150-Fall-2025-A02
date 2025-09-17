console.log('Lesson 04 starter loaded');

// First we're going to take a look an error.
const SOMETHING = "ELSE"; // add semi colon on the end.

// let's change it, it's going to break because it's unchangeable
// SOMETHING = "TEST"

// Instructor TODO:
// 1. Simple if
// these are really similar to what you're learning
// in python, this falls under the 90% of programming
// languages are the same.
const x = 5;

console.log(`x is ${x}`);
if (x > 0) {
  // this code will only execute if condition x > 0 is true
  console.log('x is positive');
}

// 2. if-else
// in javascript you use === instead of == (checks for the type as well)
// modulo % is the remainder
// I'm going to check if a value is even or odd
if (x % 2 === 0) {
  console.log(`x is even`)
} else {
  // this will only execute if the condition in
  // the if statement is false.
  console.log(`x is odd`)
}

// 3. Nested if-else
// this is when you have more than one condition
// that you want to check.
// let's add a command here called debugger.
// debugger;
if (x > 10) {
  console.log('x is greater than 10');
} else if (x > 5) { // this will execute only if x > 10 is false
  console.log('x is greater than 5');
} else if (x > 1) { // this will only execute if both above are false.
  console.log('x is greater than 1')
} else {
  console.log('x is less than 1')
}
// 4. while loop
// loops are structure that's super important
let count = 0;

while (count < 3) {
  // the condition needs to be true
  // to execute this piece
  console.log(`the count is ${count}`);
  // you need to increase the counter
  count = count + 1;
  // if you don't have this line or an exit
  // condition you are going to what's called an infinite loop
}

// 5. do-while loop
// I never use these and I never see them used
// or I see them used very very seldomly.
// this executes at least once
// debugger;
do {
  console.log('in the do while loop at least once');
  console.log(x);
} while (x < 5) // x < 5 is false
// same rules apply except it executes once.

// 6. for loop
// you're going to use this a ton because a lot of times
// you're going to be looping over a list of items
for (let i = 0; i < 4; i = i + 1) {
  console.log(`in iteration ${i}`);
}

// Student TODO:
// 7. Snippet with bugs for debugging practice
// Snippet with bugs for debugging practice - uncomment when ready

const num = 10;

// second bug here for you to solve.
// num < 5 change to num > 5 so that it behaves properly
if (num > 5) { // Intentional bug: should be num > 5
  console.log('num is greater than 5');
} else {
  console.log('num is 5 or less');
}

// this  k = k - 1 will cause the bug because the
// condition will always be true
for (let k = 0; k < 3; k = k + 1) { // Intentional bug: k should increment
  console.log(k);
}

// 8. Debugging practice