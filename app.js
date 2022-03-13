require("dotenv").config();
// pre-process (all imports)
const express = require("express");
// const query = require("express/lib/middleware/query");
const connectDB = require("./database/connect");
// const errorHandler = require("./middleware/error-handler");
let mongoose;
const Movie = require("./model/movie");
require("express-async-error");

// server metadata
const app = express();

// middleware
const notFound = (req, res, next) => {
  return res.status(404).json({ msg: "route is not available" });
};

// app.use(express.static("public"));
app.use(express.json());

app.use(express.static("public"));

// app.get("/static", async (req, res) => {
//   const movies = await Movie.find({
//     title: /Titanic/i,
//     released: { $gt: "1975-08-17" },
//   }).select("title genres runtime imdb released lastupdated");
//   res.status(200).json({ nMovie: movies.length, movies: movies });
// });

app.get("/", (req, res) => {
  res.status(200).sendFile("./public/index.html");
});

app.get("/search", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

// router
app.get("/api/v1/movies", async (req, res) => {
  let {
    title,
    genre,
    numericFilter,
    dateFilter,
    limit,
    page,
    sort,
    select,
    distinct,
  } = req.query;
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
  if (numericFilter) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      ">": "$gt",
      ">=": "$gte",
    };
    numericFilter = numericFilter.replace(
      /\b(<|<=|>|>=)\b/g,
      (item) => `-${operatorMap[item]}-`
    );
    // release date numeric filter
    const allowedFilter = ["imdb.rating", "runtime"];
    numericFilter.split(",").forEach((filter) => {
      const [field, operator, value] = filter.split("-");
      if (allowedFilter.includes(field))
        queryObj[field] = { ...queryObj[field], [operator]: Number(value) };
    });
  }
  if (dateFilter) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      ">": "$gt",
      ">=": "$gte",
    };
    dateFilter = dateFilter.replace(
      /\b(<|<=|>|>=)\b/g,
      (item) => `--${operatorMap[item]}--`
    );
    const allowedFilter = ["released"];
    dateFilter.split(",").forEach((filter) => {
      const [field, operator, value] = filter.split("--");
      if (allowedFilter.includes(field))
        queryObj[field] = {
          ...queryObj[field],
          [operator]: new Date(value),
        };
    });
  }
  console.log(queryObj);

  queryObj = Movie.find(queryObj);
  // sort
  if (select) {
    const selectStr = select.trim().replace(/,/g, " ");
    console.log(selectStr);
    queryObj.select(selectStr);
  }
  if (sort) {
    const sortStr = sort.trim().replace(/,/g, " ");
    console.log(sortStr);
    queryObj.sort(sortStr);
  }

  limit = limit || 10;
  page = page || 1;
  let skip = (page - 1) * limit;
  queryObj.limit(limit);
  queryObj.skip(skip);

  if (distinct) {
    queryObj.distinct(distinct);
  }

  const movies = await queryObj;
  res.status(200).json({ nMovies: movies.length, movies: movies });
});

// catch-all
// app.use(errorHandler);
app.use("/", notFound);

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
