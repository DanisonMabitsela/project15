const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token and attach user to req object
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  // Log the received token
  console.log("Received token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    res.sendStatus(401);
  }
};

module.exports = authenticateUser;
