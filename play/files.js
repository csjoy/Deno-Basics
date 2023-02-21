// // Read files
// const decoder = new TextDecoder('utf-8')
// const data = await Deno.readFile('./hello.txt')
// console.log(decoder.decode(data))

// Write files
// const encoder = new TextEncoder()
const newText = `Hello world, from the files.js file`
// await Deno.writeFile('./hello.txt', encoder.encode(newText))

await Deno.writeTextFile('./hello.txt', newText)

// Renaming files
const renameConfirmation = confirm(`Do you want to rename the file?`)

if (renameConfirmation) {
  await Deno.rename('./hello.txt', './greetings.txt')
} else {
  console.log('File not renamed')
}

// Removing files
const removeConfirmation = confirm(`Do you want to remove the file?`)
if (removeConfirmation) {
  await Deno.remove('./greetings.txt')
}