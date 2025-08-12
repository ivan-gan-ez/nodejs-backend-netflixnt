const express = require("express");

// create express router
const router = express.Router();

const Show = require("../models/tvshow");
const {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
} = require("../controllers/tvshow");

/*
  GET /shows - all shows
  GET /shows/[id] - specific show by id
  POST /shows - add new show
  PUT /shows/[id] - update show by id
  DELETE /shows/[id] - delete show by id
*/

// GET /shows - all shows

router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  const show = await getShows(genre, rating, premiere_year);
  res.status(200).send(show);
});

// GET /shows/[id] - specific tv show by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const show = await getShow(id);
  res.status(200).send(show);
});

//  POST /shows - add new show
/*
  following params required:
  - title
  - creator
  - premiere_year
  - end_year (optional)
  - seasons
  - genre
  - rating
*/

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({ message: "You're missing something." });
    }

    res
      .status(200)
      .send(
        await addShow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

// PUT /shows/[id] - update show by id

router.put("/:id", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const id = req.params.id;
    res
      .status(200)
      .send(
        await updateShow(
          id,
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

// DELETE /shows/[id] - delete show by id

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedShow = await deleteShow(id);
    res.status(200).send({
      message: `${deletedShow.title} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({ message: "my ass is grass. send help" });
  }
});

module.exports = router;
