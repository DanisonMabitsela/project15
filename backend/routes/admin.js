const express = require("express");
const router = express.Router();
const UserController = require("../controllers/Usercontroller");

// Admin-only route for user management
router.post("/users", UserController.createUser); // Create a new user
router.get("/users", UserController.getAllUsers); // Get all users
router.get("/users/:id", UserController.getUserById); // Get a specific user by ID
router.put("/users/:id", UserController.updateUser); // Update a user by ID
router.delete("/users/:id", UserController.deleteUser); // Delete a user by ID

module.exports = router;
