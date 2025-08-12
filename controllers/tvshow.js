const Show = require("../models//tvshow");

async function getShows(genre, rating, premiere_year) {
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

  const show = await Show.find(filter).sort({ id: 1 });
  return show;
}

async function getShow(id) {
  const show = await Show.findById(id);
  return show;
}

async function addShow(
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  // create new show
  const newShow = new Show({
    title: title, // alternatively, "title," is enough
    creator: creator,
    premiere_year: premiere_year,
    end_year: end_year,
    seasons: seasons,
    genre: genre,
    rating: rating,
  });

  // save the new show into mongodb
  await newShow.save();

  return newShow;
}

async function updateShow(
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  const updatedShow = await Show.findByIdAndUpdate(
    id,
    {
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    },
    { new: true }
  );

  return updatedShow;
}

async function deleteShow(id) {
  const deletedShow = await Show.findByIdAndDelete(id);
  return deletedShow;
}

module.exports = { getShows, getShow, addShow, updateShow, deleteShow };
