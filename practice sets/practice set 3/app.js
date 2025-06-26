
/*****practice set 3 -
 #install nodemon and express.
 #add two dummy middleware that logs request path and result method respectively.
 #add a third middleware that returns a responnse.
 #now aa handling using two more middleware that handle path /, a request to /contact-us page.
 #contact us shou;d return a form with name and email as input field that submits to /contact-us page also.
 #also handle POST incoming requests to /contact-us path a seperate middleware.****
*/


// external module
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log("first dummy middleware", req.url, req.method)
  next();
})
app.use((req, res, next) => {
  console.log("Second dummy middleware", req.url, req.method)
  next();
})

// app.use((req, res, next) => {
//   console.log("Third dummy middleware", req.url, req.method)
//   res.send("<h1>Third dummy middleware</h1>")
// })

app.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method)
  res.send("<h1>Welcome to routes handling</h1>")
})

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for GET", req.url, req.method)
  res.send(`<h1>Please give your details</h1>
    <form action="/contact-us" method="POST">
    <input type="text" name="name" placeholder="enter your name" />
    <input type="email" name="email" placeholder="enter your email" />
    <input type="Submit" />
    </form>
    
    `)
})

app.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for POST", req.url, req.method)
  res.send("<h1>Thanks for your details.</h1>")
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runnig on address http://localhost:${PORT}`)
});