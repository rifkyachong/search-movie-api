require("dotenv").config();
require("express-async-error");
// pre-process (all imports)
const express = require("express");
const connectDB = require("./database/connect");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const movieApi = require("./router/movie-api");

// build server
const app = express();

// middleware

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).sendFile("./public/index.html");
});

app.get("/search", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

// router
app.use("/api/v1", movieApi);

// catch all
app.use("/", notFound);
app.use("/", errorHandler);

// start the server
const port = process.env.port || 8080;

const start = async () => {
  try {
    mongoose = await connectDB(process.env.MONGO_URI);
    console.log("Connected to database...");
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
