// Core Modules
const path = require('path');

// External modules
const express = require('express');
const hostRouter = express.Router();

// Local modules
const rootDir = require('../utils/pathUtil');

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', { title: 'Add Home', currentPage: 'Add Home' });
})


const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Registration Successful for:', req.body);
  registeredHomes.push(req.body);
  res.render('homeAdded', { title: 'Home Added Successfully', currentPage: 'HomeAdded', houseName: req.body.houseName });
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;