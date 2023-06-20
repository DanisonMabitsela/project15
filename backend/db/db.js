const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

module.exports = {
  connectToDB,
};
