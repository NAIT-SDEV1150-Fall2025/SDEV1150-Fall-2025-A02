// let's import our function from the same folder.
// use it in our code.
import { greetUser } from './utils';

const greeting = greetUser('dan');

console.log('We used modules!');
console.log(greeting);
