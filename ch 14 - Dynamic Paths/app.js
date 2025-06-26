/*
Resuse the app from the last assignment and add the following features:
1. Add more fields in the add home page like price per night, location, rating and photo.
2. Design the home card to show all of this information.
3. Make the selected tab active on top.
*/

// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

// 404 Error Handling
app.use(errorsController.pageNotFound);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});