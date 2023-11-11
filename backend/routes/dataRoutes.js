// routes.js

const express = require("express");
const router = express.Router();
const controllers = require("../controllers/dataControllers");

// const logMiddleware = (req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// };

// router.use(logMiddleware);

// Middleware to ensure database is initialized before handling any routes
router.get("/initialize-data", async (req, res) => {
  try {
    await controllers.initializeDatabase();
    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error initializing database:", error.message);
    res.status(500).json({ error: "Failed to initialize database" });
  }
});

router.get("/transactions", (req, res) => {
  const month = req.query.month;
  const page = parseInt(req.query.page) || 1; // Parse page parameter, default to 1 if not provided
  const transactions = controllers.getTransactions(month, page);
  res.json(transactions);
});

router.get("/statistics", (req, res) => {
  const month = req.query.month;
  const statistics = controllers.getStatistics(month);
  res.json(statistics);
});

router.get("/bar-chart", (req, res) => {
  const month = req.query.month;
  const barChart = controllers.getBarChart(month);
  res.json(barChart);
});

router.get("/pie-chart", (req, res) => {
  const month = req.query.month;
  const pieChart = controllers.getPieChart(month);
  res.json(pieChart);
});

module.exports = router;

router.get("/combined", (req, res) => {
  const transactions = controllers.getTransactions();
  const statistics = controllers.getStatistics();
  const barChart = controllers.getBarChart();
  const pieChart = controllers.getPieChart();

  const combinedData = {
    transactions,
    statistics,
    barChart,
    pieChart,
  };

  res.json(combinedData);
});

module.exports = router;
