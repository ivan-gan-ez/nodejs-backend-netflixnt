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

  const movies = await Movie.find(filter).sort({ _id: 1 });
  res.send(movies);
});

// GET /movies/[id] - specific movie by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

//  POST /movies - add new movie
/*
  following params required:
  - title
  - director
  - release_year
  - genre
  - rating
*/

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({ message: "You're missing something." });
    }

    // create new movie
    const newMovie = new Movie({
      title: title,
      director: director,
      release_year: release_year,
      genre: genre,
      rating: rating,
    });

    // save the new movie into mongodb
    await newMovie.save();

    res.send(newMovie);
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

// PUT /movies/[id] - update movie by id

router.put("/:id", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const id = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        director: director,
        release_year: release_year,
        genre: genre,
        rating: rating,
      },
      { new: true }
    );
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

// DELETE /movies/[id] - delete movie by id

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    res.status(200).send({
      message: `${deletedMovie.title} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

module.exports = router;
