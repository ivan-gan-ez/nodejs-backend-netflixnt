const express = require("express");

// create express router
const router = express.Router();

const Show = require("../models/tvshow");

/*
  GET /tvshows - all tvshows
  GET /tvshows/[id] - specific movie by id
  POST /tvshows - add new movie
  PUT /tvshows/[id] - update movie by id
  DELETE /tvshows/[id] - delete movie by id
*/

// GET /tvshows - all tvshows

router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const show = await Show.findById(id);
  res.send(show);
});

module.exports = router;
