// const name = "Jaydan"

// console.log(`Hello, ${name}! This is Deno speaking!`)

console.log(`Hello, this is Deno speaking. What's your name?`)

const name = prompt(`Enter your name:`)

const helloText = `Hello, ${name}! Nice to meet you!`

const helloConfirmation = confirm(`Would you like us to make a hello file?`)

if (helloConfirmation) {
  await Deno.writeTextFile(`hello.txt`, helloText)
} else {
  console.log(`No file created.`)
}