const express = require("express");

// create express router
const router = express.Router();

const Movie = require("../models/movie");
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

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

  const movies = await getMovies(director, genre, rating);
  res.status(200).send(movies);
});

// GET /movies/[id] - specific movie by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await getMovie(id);
  res.status(200).send(movie);
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

    const newMovie = await addMovie(
      title,
      director,
      release_year,
      genre,
      rating
    );

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

    res
      .status(200)
      .send(
        await updateMovie(id, title, director, release_year, genre, rating)
      );
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

// DELETE /movies/[id] - delete movie by id

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteMovie(id);
    res.status(200).send({
      message: `${id} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

module.exports = router;
