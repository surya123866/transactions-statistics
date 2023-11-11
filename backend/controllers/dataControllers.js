const axios = require("axios");

let productData = [];

function initializeDatabase() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
      productData = response.data;
      resolve({ message: "Database initialized successfully" });
    } catch (error) {
      console.error("Error initializing database:", error.message);
      reject({ error: "Failed to initialize database" });
    }
  });
}

const monthNameToNumber = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

function getMonthNumber(monthName) {
  return monthNameToNumber[monthName] || null;
}

const ITEMS_PER_PAGE = 10;

function getTransactions(monthName, page = 1) {
  const month = getMonthNumber(monthName);

  // Filter transactions based on the month (if provided)
  let filteredTransactions = productData;
  if (month) {
    filteredTransactions = productData.filter((transaction) =>
      transaction.dateOfSale.includes(month)
    );
  }

  // Calculate start and end indices for the requested page
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the transactions for the requested page
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  return { transactions: paginatedTransactions };
}

function getStatistics(monthName) {
  const month = getMonthNumber(monthName);
  // Filter transactions based on the month (if provided)
  const filteredTransactions = month
    ? productData.filter((transaction) =>
        transaction.dateOfSale.includes(month)
      )
    : productData;

  // Calculate total sale amount, total sold items, and total not sold items
  const totalSaleAmount = filteredTransactions.reduce(
    (total, transaction) => total + (transaction.sold ? transaction.price : 0),
    0
  );

  const totalSoldItems = filteredTransactions.filter(
    (transaction) => transaction.sold
  ).length;

  const totalNotSoldItems = filteredTransactions.filter(
    (transaction) => !transaction.sold
  ).length;
  return {
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  };
}

function getBarChart(monthName) {
  const month = getMonthNumber(monthName);
  // Filter transactions based on the month (if provided)
  const filteredTransactions = month
    ? productData.filter((transaction) =>
        transaction.dateOfSale.includes(month)
      )
    : productData;

  // Define the price ranges
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Number.POSITIVE_INFINITY }, // "above" category
  ];

  // Initialize an object to store the count for each price range
  const barChartData = {};

  // Initialize counts for each price range
  priceRanges.forEach((range) => {
    barChartData[
      `${range.min}-${
        range.max === Number.POSITIVE_INFINITY ? "above" : range.max
      }`
    ] = 0;
  });

  // Count the number of items in each price range
  filteredTransactions.forEach((transaction) => {
    const price = transaction.price;

    // Find the appropriate price range and increment the count
    const range = priceRanges.find(
      (range) => price >= range.min && price <= range.max
    );

    if (range) {
      barChartData[
        `${range.min}-${
          range.max === Number.POSITIVE_INFINITY ? "above" : range.max
        }`
      ]++;
    }
  });

  return barChartData;
}

function getPieChart(monthName) {
  const month = getMonthNumber(monthName);
  // Filter transactions based on the month (if provided)
  const filteredTransactions = month
    ? productData.filter((transaction) =>
        transaction.dateOfSale.includes(month)
      )
    : productData;

  // Initialize an object to store the count for each category
  const pieChartData = {};

  // Count the number of items in each category
  filteredTransactions.forEach((transaction) => {
    const category = transaction.category;

    // Increment the count for the category
    pieChartData[category] = (pieChartData[category] || 0) + 1;
  });

  // Convert the data to the required format (category: count)
  const formattedData = Object.keys(pieChartData).map((category) => ({
    category,
    count: pieChartData[category],
  }));

  return formattedData;
}

module.exports = {
  initializeDatabase,
  productData,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
};
