// core modules

const path = require('path');

// External modules
const express = require('express');
const userRouter = express.Router();

// Local modules
const rootDir = require('../utils/pathUtil');
const { registeredHomes } = require('./hostRouter');
const { title } = require('process');

userRouter.get("/", (req, res, next) => {
  console.log('Registered Homes:', registeredHomes);
  res.render('home', { registeredHomes: registeredHomes, title: 'Home', currentPage: 'Home' });
})

module.exports = userRouter;