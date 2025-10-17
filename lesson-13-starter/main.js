// we're create the main.js file.
import dayjs from "dayjs";

// let's get todays date
let now = dayjs()

console.log("A node example")
console.log(`time: ${now}`)
console.log(`the date is ${now.format('YYYY-MM-DD')}`)
console.log(`the the time is ${now.format('HH:mm:ss')}`)
// refernce docs: https://day.js.org/docs/en/display/format#docsNav

// we're going to run this project
// locally outside of the browser (OOOH)
// we're going do this with `node main.js`
