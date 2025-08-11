const express = require("express");

// create express router
const router = express.Router();

const Movie = require("../models/movie");

/*
  GET /movies - all movies
  GET /movies/[id] - specific movie by id
  POST /movies - add new movie
  PUT /movies/[id] - update movie by id
  DELETE /movies/[id] - delete movie by id
*/

// GET /movies - all movies

router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

module.exports = router;
