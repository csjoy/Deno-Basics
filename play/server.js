// import { Server } from "https://deno.land/std@0.177.0/http/server.ts"

// oak server
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts"

const data = await Deno.readFile('./data.json', { encoding: 'utf-8' })

// const handler = () => {
//   return new Response(data, {
//     headers: {
//       "content-type": "application/json",
//     },
//   })
// }
// const server = new Server({handler})
// const listener = Deno.listen({port: 4505})

// console.log("server listening on http://localhost:4505")
// await server.serve(listener)


const app = new Application()

app.use((ctx) => {
  ctx.response.body = data
})

await app.listen({ port: 8000 });

