const mongoose = require("mongoose");
const axios = require("axios");

const Transaction = mongoose.model("TransactionData", {
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean,
  image: String,
});

const initializeDatabase = async (res) => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;

    // Insert data into the database
    await Transaction.insertMany(data);

    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ error: "Failed to initialize database" });
  }
};

module.exports = {
  initializeDatabase,
};
