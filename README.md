Backend Task
This repository contains the backend task for handling product transactions from a third-party API. The task involves fetching data, initializing a database, and creating various APIs for querying and analyzing transaction data.

Data Source
Product Transactions JSON API URL:https://s3.amazonaws.com/roxiler.com/product_transaction.json
Request Method: GET
Response Format: JSON


Setup Instructions

1 Clone the Repository:

git clone https://github.com/surya123866/transactions-statistics.git
cd your-repository

2 Install Dependencies:

npm install

3 Configure Database:
Ensure your database is up and running and update the database configuration in config.js or .env file as per your database setup.

4 Initialize Database:
Fetch the JSON data from the third-party API and initialize the database with seed data by running:
npm run init-db

API Endpoints

Initialize Database

Endpoint: /api/init
Method: GET
Description: Fetches JSON from the third-party API and initializes the database with seed data.
List All Transactions


Endpoint: /api/transactions
Method: GET
Query Parameters:
month (required): Month for filtering transactions (values: January to December).
page (optional): Page number for pagination (default: 1).
per_page (optional): Number of transactions per page (default: 10).
search (optional): Search text for filtering transactions based on product title, description, or price.
Description: Lists all transactions filtered by month. Supports search and pagination.
Statistics


Endpoint: /api/statistics
Method: GET
Query Parameters:
month (required): Month for filtering transactions (values: January to December).
Description: Provides statistics for the selected month, including total sale amount, total number of sold items, and total number of not sold items.
Bar Chart Data


Endpoint: /api/bar-chart
Method: GET
Query Parameters:
month (required): Month for filtering transactions (values: January to December).
Description: Returns data for a bar chart showing the number of items in various price ranges for the selected month.
Pie Chart Data


Endpoint: /api/pie-chart
Method: GET
Query Parameters:
month (required): Month for filtering transactions (values: January to December).
Description: Returns data for a pie chart showing unique categories and the number of items in each category for the selected month.
Combined Data


Endpoint: /api/combined-data
Method: GET
Query Parameters:
month (required): Month for filtering transactions (values: January to December).
Description: Fetches data from all three APIs (/api/statistics, /api/bar-chart, /api/pie-chart) and returns it in a single response.

Running the Server
Start the server using the following command:
npm start

The server will start on the port specified in your configuration. You can then access the APIs using a tool like Postman or via a web browser.


