// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://root:root@priyanshu.8wr624m.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Priyanshu";


// Local Module
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');
const { default: mongoose } = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions',
  connectionOptions: {
    autoSelectFamily: false, // ✅ disable IPv6 to avoid TLS error
  }
})


// ✅ Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // or `true`, depending on your needs

// session
app.use(session({
  secret: "Priyanshu Kumawat - Nodejs",
  resave: false,
  saveUninitialized: true,
  store
}))



// cookies
app.use((req, res, next) => {
  // console.log("cookies check mmiddelware", req.get('Cookie'));
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});


app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);


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