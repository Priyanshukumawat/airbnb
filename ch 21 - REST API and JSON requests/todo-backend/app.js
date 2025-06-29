// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const DB_PATH = "mongodb+srv://root:root@priyanshu.8wr624m.mongodb.net/todo?retryWrites=true&w=majority&appName=Priyanshu";

// Local Module
const errorsController = require('./controllers/errors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // or `true`, depending on your needs
// ✅ Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));


// 404 Error Handling
app.use(errorsController.pageNotFound);


const PORT = 3000;


mongoose.connect(DB_PATH, {
  autoSelectFamily: false
}).then(() => {
  console.log("Connected to Mongo");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log("Error while connecting to Mongo : ", err);
})