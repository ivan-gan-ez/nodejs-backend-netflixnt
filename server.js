const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect to mongodb with a mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/netflix");
  } catch (error) {
    console.log("ERORE");
  }
}

// declare schema for Movies
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// create model from schema
const Movie = mongoose.model("Movie", movieSchema);

// declare schema for tvshows
const tvshowSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

// create model from schema
const Show = mongoose.model("Show", tvshowSchema);

// trogger de function
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Greetings and salutations!");
});

/*
  GET /movies - all movies
  GET /movies/[id] - specific movie by id
  POST /movies - add new movie
  PUT /movies/[id] - update movie by id
  DELETE /movies/[id] - delete movie by id
*/

// GET /movies - all movies

app.get("/movies", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create empty object for filter
  let filter = {};
  // if director exists, then add to filter
  if (director) {
    filter.director = director;
  }
  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }

  const movies = await Movie.find(filter);
  res.send(movies);
});

// GET /movies/[id] - specific movie by id
app.get("/movies/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

/*
  GET /tvshows - all tvshows
  GET /tvshows/[id] - specific movie by id
  POST /tvshows - add new movie
  PUT /tvshows/[id] - update movie by id
  DELETE /tvshows/[id] - delete movie by id
*/

// GET /tvshows - all tvshows

app.get("/tvshows", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  // create empty object for filter
  let filter = {};
  // if director exists, then add to filter
  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  const show = await Show.find(filter);
  res.send(show);
});

// GET /tvshows/[id] - specific tv show by id
app.get("/tvshows/:id", async (req, res) => {
  const id = req.params.id;
  const show = await Show.findById(id);
  res.send(show);
});

app.listen(6789, () => {
  console.log("Server currently running at http://localhost:6789");
});
