import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

const TransactionStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/statistics?month=${month}`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className="statistics-container">
      <div className="heading-container">
        <h2>{`Statistics - ${month}`}</h2>
      </div>
      <div className="data-container">
        {statistics ? (
          <>
            <div className="statistics">
              <p>Total Sale</p>
              <p>{statistics.totalSaleAmount}</p>
            </div>
            <div className="statistics">
              <p>Total Sold item</p>
              <p> {statistics.totalSoldItems}</p>
            </div>
            <div className="statistics">
              <p>Total not sold item</p>
              <p> {statistics.totalNotSoldItems}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TransactionStatistics;
