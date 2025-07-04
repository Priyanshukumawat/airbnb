// External modules
const express = require('express');
const storeRouter = express.Router();

// Local modules
const homesController = require('../controllers/storeController');

storeRouter.get("/", homesController.getIndex);
storeRouter.get("/homes", homesController.getHomes);
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavouriteList);

module.exports = storeRouter;