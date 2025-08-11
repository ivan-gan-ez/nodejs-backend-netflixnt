const { Schema, model } = require("mongoose");

// declare schema for Movies
const movieSchema = new Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// create model from schema
const Movie = model("Movie", movieSchema);

module.exports = Movie;
