
// let's import our function from the same folder.
// use it in our code.
import { greetUser, getDate, getTime } from './utils';
// 2. I want you import the date function
// we did this above, for named exports you can have
// how every you'd like.
// I want to update the date and time of ids today, time
// let's test it out
console.log(getDate());
console.log(getTime());

const greeting = greetUser('dan');

console.log('We used modules!');
console.log(greeting);

