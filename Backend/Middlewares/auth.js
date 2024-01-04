// middleware/auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'xyz123#'

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Auth.js: Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("decoded user : ", decoded); 
    req.user = decoded; // Add the decoded user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: ' Auth.js: Invalid token' });
  }
};

module.exports = verifyToken;
