import { AJAX, getYear } from "./helpers.js";

export const state = {
  movie: {},
  newMovies: {},
  topMovies: {},
  search: {},
};

const createMovieObject = function (movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: getYear(movie.release_date),
    overview: movie.overview,
    vote_average: movie.vote_average,
    backdrop_path: movie.backdrop_path,
    poster_path: movie.poster_path,
  };
};

export const loadMovies = async function (query) {
  try {
    const data = await AJAX(`/movie/${query}?language=en-US&page=1`);

    const results = data.results.map((movie) => {
      return createMovieObject(movie);
    });

    results.forEach(async (res) => {
      res.trailer = await loadMovieTrailer(res.id);
    });

    query === "popular"
      ? (state.newMovies = results)
      : (state.topMovies = results);

    return results;
  } catch (err) {
    console.error(`${err}: Movies did not load`);
    throw err;
  }
};

// This needs refactoring into loadMovies function TODO

export const loadSingleMovie = async function (query) {
  try {
    const data = await AJAX(`/movie/${query}?language=en-US&page=1`);
    state.movie = createMovieObject(data);

    state.movie.trailer = await loadMovieTrailer(state.movie.id);
    return data;
  } catch (err) {
    console.error(`${err}: Movies did not load`);
    throw err;
  }
};

export const loadSearchResults = async function (searchInput) {
  try {
    const data = await AJAX(
      `/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
    );
    const results = data.results.map((result) => {
      return createMovieObject(result);
    });

    state.search = results;
    return results;
  } catch (err) {
    console.error(`${err}: Search results did not load`);
    throw err;
  }
};

export const loadMovieTrailer = async function (id) {
  try {
    const data = await AJAX(`/movie/${id}/videos?language=en-US`);
    const result = data.results.find((movie) => {
      return movie.type === "Trailer";
    });

    return `https://www.youtube.com/watch?v=` + result.key;
  } catch (err) {
    console.error(`${err}: Movie trailer did not load`);
    throw err;
  }
};
