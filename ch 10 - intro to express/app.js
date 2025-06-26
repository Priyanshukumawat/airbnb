
// external module
const express = require('express');

// local module
const requestHandler = require('./user');


const app = express();

app.use("/", (req, res, next) => {
  console.log("came in first middleware", req.url, req.method);
  // res.send("<p>come from first middleware</p>")
  next();
})

app.use("/", (req, res, next) => {
  console.log("came in another middleware", req.url, req.method);
  // res.send("<p>come in another middleware</p>")
  next();
})

app.get("/submit-details", (req, res, next) => {
  console.log("came in second middleware", req.url, req.method);
  res.send(`<p>Welcome to second page</p>`)
})


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server runnig on address http://localhost:${PORT}`)
});