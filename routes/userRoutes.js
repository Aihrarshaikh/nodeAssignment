const express = require('express');

// Creating an instance of an Express router
const router = express.Router();

// Importing the 'authController' module for handling user authentication-related routes
const authController = require('../controllers/userController');

// Route for handling POST requests to the '/login' path
router.post('/login', authController.loginUser);

// Route for handling POST requests to the '/register' path
router.post('/register', authController.registerUser);

module.exports = router;
