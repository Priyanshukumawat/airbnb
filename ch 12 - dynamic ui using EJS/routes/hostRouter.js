// Core Modules
const path = require('path');

// External modules
const express = require('express');
const hostRouter = express.Router();

// Local modules
const rootDir = require('../utils/pathUtil');

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', { title: 'Add Home' });
})


const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Registration Successful for:', req.body, req.body.houseName);
  registeredHomes.push({ houseName: req.body.houseName });
  res.render('homeAdded', { title: 'Home Added Successfully', houseName: req.body.houseName });
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;