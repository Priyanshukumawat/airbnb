// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// ✅ Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'page not found' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});