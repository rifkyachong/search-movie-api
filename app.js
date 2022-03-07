require("dotenv").config();
// pre-process (all imports)
const express = require("express");
const query = require("express/lib/middleware/query");
const connectDB = require("./database/connect");
const errorHandler = require("./middleware/error-handler");
let mongoose;
const Movie = require("./model/movie");
require("express-async-error");

// server metadata
const app = express();

// middleware
const notFound = (req, res, next) => {
  return res.status(404).send("route is not available");
};

// app.use(express.static("public"));
app.use(express.json());

app.get("/static", async (req, res) => {
  const movies = await Movie.find({
    title: "Titanic",
    // genres: {
    //   $ne: "History",
    // },
  })
    .limit(20)
    .select("title genres");
  res.status(200).json({ nMovie: movies.length, movies: movies });
});

// router
app.get("/search", async (req, res) => {
  let { title, genre, limit, page, sort, select } = req.query;
  let queryObj = {};
  if (title) {
    const wordList = title.trim().split(/\s+/);
    const regExp = wordList.map((str) => `(?=.*${str})`).join("");
    queryObj.title = {
      $regex: regExp,
      $options: "i",
    };
  }
  if (genre) {
    const genreList = genre.trim().split(/\s+/);
    queryObj.genres = {
      $all: genreList,
    };
  }
  queryObj = Movie.find(queryObj);
  // sort
  if (select) {
    const selectStr = select.trim().replace(",", " ");
    queryObj.select(selectStr);
  }
  if (sort) {
    const sortStr = sort.trim().replace(",", " ");
    console.log(sortStr);
    queryObj.sort(sortStr);
  }
  limit = limit || 10;
  page = page || 1;
  let skip = (page - 1) * limit;
  queryObj.limit(limit);
  queryObj.skip(skip);
  const movies = await queryObj;
  res.status(200).json({ nMovies: movies.length, movies: movies });
});

// catch-all
// app.use(errorHandler);
app.use(notFound);

// start the server
const port = 8080;

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
