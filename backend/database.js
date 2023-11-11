const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Replace the connection string and database name with your actual values
const uri =
  "mongodb+srv://suryakommanapalli:Ph7W2xv7qmDuOAKv@moviesdb.kscgqcp.mongodb.net/ReelBook?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = { db };
