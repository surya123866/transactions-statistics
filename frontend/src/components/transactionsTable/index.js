import React, { useState, useEffect } from "react";
import "./index.css"; // Make sure to create a CSS file for styling
import TransactionStatistics from "../transctionsStatistics";
import BarChart from "../bar-chart";

const TransactionsTable = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const emptyRows = Array.from({ length: 10 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const response = await fetch(
          `http://localhost:3001/transactions?page=${currentPage}?month=${selectedMonth}`
        );
        const data = await response.json();

        // Filter transactions based on search text
        const filtered = data.transactions.filter(
          (transaction) =>
            transaction.title
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            transaction.description
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            transaction.price.toString().includes(searchText)
        );
        setFilteredTransactions(filtered);

        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, selectedMonth, searchText]);

  const handlePrevPage = () => {
    // Prevent setting currentPage to zero or negative values
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    // Prevent setting currentPage to zero or negative values
    if (currentPage < 10) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="transactions-table-container">
      <div className="transactions-container">
        <div className="transactions-header">
          <h2>Transactions Dashboard</h2>
        </div>

        <div className="search-container">
          <div>
            <input
              className="search-input"
              type="text"
              placeholder="Search Transaction"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <select
            className="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        {loading ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Sold</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0
                  ? filteredTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.title}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.price}</td>
                        <td>{transaction.category}</td>
                        <td>{`${transaction.sold ? "Sold" : "UnSold"}`}</td>
                        <td>
                          <img
                            className="image"
                            src={transaction.image}
                            alt="Transaction"
                          />
                        </td>
                      </tr>
                    ))
                  : emptyRows.map((_, index) => (
                      <tr key={index}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className="pagination">
          <p>{`Page No:${currentPage}`}</p>
          <div className="pagination-bottons-container">
            <button className="pagination-bottons" onClick={handlePrevPage}>
              Previous
            </button>
            <button className="pagination-bottons" onClick={handleNextPage}>
              Next
            </button>
          </div>
          <p>Per Page:10</p>
        </div>
      </div>
      <TransactionStatistics month={selectedMonth} />
      <BarChart month={selectedMonth} />
    </div>
  );
};

export default TransactionsTable;
