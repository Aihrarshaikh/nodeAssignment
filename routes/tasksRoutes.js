const express = require('express');

// Creating an instance of an Express router
const router = express.Router();

// Importing the 'taskController' module for handling tasks-related routes
const taskController = require('../controllers/tasksController');

// Route for handling GET requests to the root path ('/')
router.get('/', taskController.getAllTasks);

module.exports = router;
