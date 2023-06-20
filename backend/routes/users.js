const express = require("express");
const UserController = require("../controllers/Usercontroller");

const router = express.Router();

// GET all users
router.get("/", UserController.getAllUsers);

module.exports = router;
