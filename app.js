// pre-process (all imports)
const express = require("express");
const connectDB = require("./database/connect");
require("dotenv").config();
// const errorHandler = require("./middleware/error-handler");

// server metadata
const appServer = express();
const port = 8080;

// middleware
appServer.use(express.static("public"));
appServer.use(express.json());

// router

// catch-all
appServer.get("*", (req, res, next) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});
// appServer.use(errorHandler);

// start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database...");
    appServer.listen(
      port,
      console.log(`server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
