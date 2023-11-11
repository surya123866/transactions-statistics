import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import "./index.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/bar-chart?month=${month}`
        );
        const chartDataResponse = response.data;

        // Split values into labels and data
        const labels = Object.keys(chartDataResponse);
        const data = Object.values(chartDataResponse);
        const dataValues = data.map((value) => value * 20);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Price Ranges",
              data: dataValues,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className="bar-chart-container">
      <div className="chart-container">
        <h2>{`Bar Chart Stats - ${month}`}</h2>
        {chartData ? (
          <Bar options={options} data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BarChart;
