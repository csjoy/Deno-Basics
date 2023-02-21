import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
import { setDoc, doc, query, where, getFirestore, collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
import { CORS } from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";

const firebaseConfig = {
  apiKey: "AIzaSyBHWsTGNENsGGZgJGv5qJl9Pzf_GbSZY0M",
  authDomain: "deno-rest-api-a0aa9.firebaseapp.com",
  projectId: "deno-rest-api-a0aa9",
  storageBucket: "deno-rest-api-a0aa9.appspot.com",
  messagingSenderId: "684724885910",
  appId: "1:684724885910:web:a998fd88f5c60fc36465b7"
};

const firebaseApp = initializeApp(firebaseConfig, "deno-rest-api")
const db = getFirestore(firebaseApp)

// const app = new Application();

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

// await app.listen({ port: 8000 });

const app = new Application()

// const people = [
//   {
//     id: 1,
//     slug: 'luke-skywalker',
//     name: 'Luke Skywalker',
//     homeWorld: 'Tatooine',
//   },
//   {
//     id: 2,
//     slug: 'leia-organa',
//     name: 'Leia Organa',
//     homeWorld: 'Alderaan',
//   },
//   {
//     id: 3,
//     slug: 'han-solo',
//     name: 'Han Solo',
//     homeWorld: 'Corellia',
//   },
//   {
//     id: 4,
//     slug: 'darth-vader',
//     name: 'Darth Vader',
//     homeWorld: 'Tatooine',
//   },
// ]

const router = new Router()

router
.get('/', (ctx) => {
  ctx.response.body = 'Hello from our API 🦒'
})
.get('/people', async (ctx) => {
  // ctx.response.body = people
  try {
    const people = await getDocs(collection(db, 'people'))
    const data = people.docs.map((doc) => doc.data())
    ctx.response.body = data
    // const data = people.docs
  } catch (e) {
    console.log(e)
    ctx.response.body = "Something went wrong :("
  }
})
.get('/people/:slug', async (ctx) => {
  const {slug} = ctx.params;
  try {
    // const person = people.find((person) => person.slug === slug);
    const peopleRef = collection(db, 'people')
    const q = query(peopleRef, where("slug", "==", slug));

    const getSnapshot = await getDocs(q)
    const data = getSnapshot.docs.map((doc) => doc.data())
    const person = data[0]

    if(person) {
      ctx.response.body = person;
    } else {
      ctx.response.body = 'That person was not found 😭'
    }
  } catch (e) {
    console.log(e)
    ctx.response.body = "Something went wrong :("
  }
})
.post('/people', async (ctx) => {
  const {slug, name, homeWorld, profileURL} = await ctx.request.body('json').value
  const person = {
    slug,
    name,
    homeWorld,
    profileURL,
  }
  if (person) {
    await setDoc(doc(db, 'people', slug), person)
    // await addDoc(collection(db, 'people'), person)
    ctx.response.body = 'Person added to Firebase 🔥'
  } else {
    ctx.response.body = 'Person not added 😢'
  }
})


app.use(CORS());
app.use(router.routes())
app.use(router.allowedMethods())


app.addEventListener('listen', () => {
  console.log('App is running on http://localhost:8000')
})

await app.listen({ port: 8000 })