// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://root:root@priyanshu.8wr624m.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Priyanshu";

// Local Module
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');


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


// random string (filename/custom name) for uploaded images
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result;
}

const fs = require('fs');
// Create 'rules' folder if it doesn't exist
const rulesDir = path.join(__dirname, 'rules');
if (!fs.existsSync(rulesDir)) {
  fs.mkdirSync(rulesDir);
}

// crating storage for image file and custom name with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isDocument = file.fieldname === 'document';
    const uploadPath = isDocument ? 'rules' : 'uploads';

    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '_' + file.originalname);
  }
});

// file filter (image restrictions for specific file type)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf',
    'application/vnd.ms-powerpoint',                 // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.ms-excel',                      // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
  ];

  cb(null, allowedTypes.includes(file.mimetype));
};

// sending storage to multer
const multerOptions = {
  storage, fileFilter
}

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // or `true`, depending on your needs

// Accept both photo and document fields using multer
app.use(multer(multerOptions).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]));

// ✅ Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static images from public folder
app.use("/uploads", express.static(path.join(rootDir, 'uploads'))); // for direct (image) uploads
app.use("/rules", express.static(path.join(rootDir, 'rules'))); // for rules (doc.) uploads
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads'))); //for host
app.use("/host/edit-home/uploads", express.static(path.join(rootDir, 'uploads'))); //for host edit home
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads'))); //for home details


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