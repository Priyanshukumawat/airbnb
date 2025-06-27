// External modules
const express = require('express');
const authRouter = express.Router();

// Local modules
const authController = require('../controllers/authController');

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;