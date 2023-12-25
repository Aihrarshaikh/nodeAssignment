const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Secret key for JWT token generation obtained from environment variable
const secretKey = process.env.ACCESS_TOKEN_SECERT;

// In-memory user data store (for demonstration purposes)
let users = [];

// Controller function for user login
const loginUser = (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;

  // Finding a user with the provided username and password in the in-memory data store
  const user = users.find(u => u.username === username && u.password === password);

  // If a user is found, generate a JWT token and send it as a JSON response; otherwise, return authentication failed message
  if (user) {
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Controller function for user registration
const registerUser = (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;

  // Check if the username is already taken; if so, return a response indicating the username is already in use
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Creating a new user instance using the User model and adding it to the in-memory data store
  const newUser = new User(users.length + 1, username, password);
  users.push(newUser);

  // Generate a JWT token for the new user and send it as a JSON response
  const token = jwt.sign({ userId: newUser.id, username: newUser.username }, secretKey, { expiresIn: '1h' });
  res.status(201).json({ token });
};

// Exporting the controller functions for use in other files
module.exports = {
  loginUser,
  registerUser,
};
