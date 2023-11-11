import React, { useEffect, useState } from "react";
import TransactionsTable from "./components/transactionsTable";
import "./App.css";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Simulate a delay for demonstration purposes (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Replace the URL with the actual endpoint for initializing the database
        await fetch("http://localhost:3001/initialize-data");

        // Set loading to false once initialization is complete
        setLoading(false);
      } catch (error) {
        console.error("Error initializing database:", error);
        // Handle error scenarios if needed
      }
    };

    initializeDatabase();
  }, []);

  return (
    <div className="App">
      {loading ? <h3>Initializing Database...</h3> : <TransactionsTable />}
    </div>
  );
};

export default App;
