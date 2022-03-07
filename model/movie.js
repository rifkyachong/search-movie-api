const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({}, { strict: false });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
