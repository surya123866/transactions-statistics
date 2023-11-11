const express = require("express");
const router = express.Router();
const { initializeDatabase } = require("../controllers/databaseController");

router.get("/initialize-database", async (req, res) => {
  await initializeDatabase(res);
});

module.exports = router;
