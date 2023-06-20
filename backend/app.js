const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readdirSync } = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;
const jwtSecretKey = process.env.JWT_SECRET;
const mongoURL = process.env.MONGO_URL.replace("DB_NAME", process.env.DB_NAME);

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const validateContentType = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    return res.sendStatus(415);
  }
  next();
};

// Register a new user
app.post("/api/register", validateContentType, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Registering user:", username);
  console.log("Hashed password:", hashedPassword);

  try {
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });
    await newUser.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("Registration failed:", error);
    res.sendStatus(500);
  }
});

app.post("/api/login", validateContentType, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Invalid password for user:", username);
      return res.sendStatus(401);
    }

    const token = jwt.sign({ username }, jwtSecretKey);
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Login failed:", error);
    res.sendStatus(500);
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.sendStatus(500);
});

const server = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Listening to port:", PORT);
    });
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

server();
module.exports = app;
