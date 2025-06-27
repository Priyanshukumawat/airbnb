const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const User = require("../models/user");



exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    title: 'SignUp',
    currentPage: 'SignUp',
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
    user: {},
  });
}

exports.postSignup = [

  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)  //+ : should have min. one character
    .withMessage("First Name should contail only alphabets"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/) // * : should have one or morethan one character 
    .withMessage("Last Name should contail only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?": {}|<>]/)
    .withMessage('Password must contain at least one special character')
    .trim(),

  // Confirm password validation
  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(['guest', 'host'])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),


  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        title: 'SignUp',
        currentPage: 'SignUp',
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
        user: {},
      })
    }

    bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({ firstName, lastName, email, password: hashedPassword, userType });
        return user.save();
      })
      .then(() => {
        res.redirect('/login');
      }).catch(err => {
        return res.status(422).render('auth/signup', {
          title: 'SignUp',
          currentPage: 'SignUp',
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, password, userType },
          user: {},
        });
      });
  }
];


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    currentPage: 'Login',
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
}

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(422).render('auth/login', {
        title: 'Login',
        currentPage: 'Login',
        isLoggedIn: false,
        errors: ["User does not exist."],
        oldInput: { email },
        user: {},
      });
    }

    // Compare plain password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(422).render('auth/login', {
        title: 'Login',
        currentPage: 'Login',
        isLoggedIn: false,
        errors: ["Invalid password."],
        oldInput: { email },
        user: {},
      });
    }

    // Set session
    req.session.isLoggedIn = true;
    req.session.user = user; // Optional: store user in session
    await req.session.save();
    res.redirect('/');

  } catch (err) {
    console.log('Login error:', err);
    return res.status(500).render('auth/login', {
      title: 'Login',
      currentPage: 'Login',
      isLoggedIn: false,
      errors: ["Something went wrong. Please try again."],
      oldInput: { email },
      user: {},
    });
  }
};


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
}
