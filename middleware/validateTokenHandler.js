// Load environment variables from a .env file
require('dotenv').config();

// Importing the 'jsonwebtoken' library for token handling
const jwt = require('jsonwebtoken');

// Accessing the secret key for JWT token verification from environment variables
const secretKey = process.env.ACCESS_TOKEN_SECERT; // Replace with your own secret key

// Middleware function for verifying JWT tokens
const verifyToken = (req, res, next) => {
  // Extracting the token from the 'Authorization' header in the request
  const token = req.headers['authorization'];

  // If the token is missing, return a 401 Unauthorized response with a corresponding message
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  // Verifying the token using the 'jsonwebtoken' library
  jwt.verify(token, secretKey, (err, decoded) => {
    // If there is an error during verification, return a 401 Unauthorized response with an 'Invalid token' message
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // If verification is successful, attach the decoded user information to the request object and proceed to the next middleware or route handler
    req.user = decoded;
    next();
  });
};

// Exporting the middleware function for use in other files
module.exports = verifyToken;
