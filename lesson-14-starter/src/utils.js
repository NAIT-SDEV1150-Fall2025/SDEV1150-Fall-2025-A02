// let's use an external module/package like dayjs
import dayjs from 'dayjs';

// we're going to define a function
// and explicitly export it.
// the exporting piece is different than python but otherwise
// you can think of this the same idea as modules

// below this is a bit different than a normal function
// definition because you have export in front of it.
// this allows other files to import this function
export function greetUser(user) {
  // export above is a named export*
  if (!user) {
    user = 'Bucko';
  }
  return `Welcome to lesson 14 ${user}`;
}

// 1. we're going to create two functions
// get date and get time.
// write these!
// I want you to export them
