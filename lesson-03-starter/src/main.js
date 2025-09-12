console.log('Lesson 03 starter loaded');

// Instructor TODO:
// 1. Declare variables using var, let, const
let name = "Danny"
let classes = 1 // note that numbers don't have double quotes
console.log(name)
console.log(classes)

// 2. Log their types with console.log(typeof …)
// 3. Try built-in functions: alert(), prompt(), parseInt(), toString()
alert("My first alert")
// prompt is a to get data from a user
let favouriteFood = prompt("what is your favourite food?")

console.log('favourite food: ' + favouriteFood)

// in tmeplate strings variables use ${variablegoesher} and the string is
// defined with backticks
let continueDemo = confirm(`hello ${name}, would you like to continue the demo?`)

console.log(`does ${name} choose to continue the demo? ${continueDemo}`)

// 4. Manipulate values and observe results in the console

// Student TODO:
// Prompt the user for their name and age
// Log a greeting message using the provided name and age