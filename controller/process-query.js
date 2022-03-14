const Movie = require("../model/movie");

const processQuery = async (req, res) => {
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
    hasfield,
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
    const genreList = genre.split(",").map((genre) => new RegExp(genre, "i"));
    queryObj.genres = {
      $in: genreList,
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

  if (hasfield) {
    hasfield.split(",").forEach((field) => {
      queryObj[field] = {
        ...queryObj[field],
        $exists: true,
      };
    });
  }

  console.log(queryObj);

  nMovies = await Movie.count(queryObj);

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
  res.status(200).json({ nMovies: nMovies, movies: movies });
};

module.exports = processQuery;
