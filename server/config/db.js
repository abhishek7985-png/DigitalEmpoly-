const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("================================");
    console.log("MongoDB Connected Successfully");
    console.log("Database :", mongoose.connection.name);
    console.log("Host :", mongoose.connection.host);
    console.log("================================");

    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB Disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("🔥 Mongo Error:", err);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
