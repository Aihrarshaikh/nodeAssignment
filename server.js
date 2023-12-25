// Load environment variables from a .env file
require('dotenv').config();

// Importing the 'express' library
const express = require('express');

// Importing user and tasks routes
const userRoute = require('./routes/userRoutes');
const taskRoutes = require('./routes/tasksRoutes');

// Importing error middleware
const errorMiddleware = require('./middleware/errorMiddleware');

// Importing the 'cors' library for enabling Cross-Origin Resource Sharing
var cors = require('cors');

// Creating an instance of the Express application
const app = express();

// Port configuration
const PORT = process.env.PORT || 3000;

// Frontend URL obtained from environment variables
const FRONTEND = process.env.FRONTEND;

// Configuring CORS options
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Applying CORS middleware with configured options
app.use(cors(corsOptions));

// Applying middleware to parse JSON and handle URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// Authentication routes
app.use('/api/auth', userRoute);
// Tasks routes
app.use('/api/tasks', taskRoutes);

// Error middleware for handling errors in the application
app.use(errorMiddleware);

// Starting the server and listening on the specified port
app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
});
