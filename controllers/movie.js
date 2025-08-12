const Movie = require("../models/movie");

async function getMovies(director, genre, rating) {
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
  return movies;
}

async function getMovie(id) {
  const movie = await Movie.findById(id);
  return movie;
}

async function addMovie(title, director, release_year, genre, rating) {
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

  return newMovie;
}

async function updateMovie(id, title, director, release_year, genre, rating) {
  return await Movie.findByIdAndUpdate(
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
}

async function deleteMovie(id) {
  return await Movie.findByIdAndDelete(id);
}

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie };
