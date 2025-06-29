// External modules
const express = require('express');
const storeRouter = express.Router();

// Local modules
const storeController = require('../controllers/storeController');
const router = express.Router();


storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

storeRouter.get("/homes/:homeId", storeController.getHomesDetails);
storeRouter.get("/house-rules/:homeId", storeController.getHouseRules);
storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

module.exports = storeRouter;