const User = require("../models/User");

const UserController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Failed to create user:", error);
      res.sendStatus(500);
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      res.sendStatus(500);
    }
  },

  // Get a specific user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      res.sendStatus(500);
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    } catch (error) {
      console.error("Failed to update user:", error);
      res.sendStatus(500);
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Failed to delete user:", error);
      res.sendStatus(500);
    }
  },
};

module.exports = UserController;
