// Import express and mongooese packages
const express = require("express");
const mongoose = require("mongoose");

//import router
const routes = require("./Routes/Routers");

const host = "localhost";
const port = 8900;
// MogngoDB connecting string

const uri = "mongodb://127.0.0.1:27017/Zomato";
const app = express();
// Middleware to handle json data
app.use(express.json());

// Handling CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

// Navigate all req to router
app.use("/", routes);

// Connect to Database and starting server
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 8900, host, () => {
      console.log(`Server running at ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
