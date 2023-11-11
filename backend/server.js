const express = require("express");
const cors = require("cors");
const routes = require("./routes/dataRoutes");
const mongoose = require("mongoose");
const { connectToDatabase } = require("./controllers/dataControllers");
const databaseRoutes = require("./routes/databaseRoute");

const app = express();
const port = 3001;

app.use(cors());

const uri =
  "mongodb+srv://suryakommanapalli:Nai2NI9zA0dpC0oF@cluster0.jposfio.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.use("/", databaseRoutes);
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
