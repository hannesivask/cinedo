import { AJAX, getYear, randomNumber } from './helpers.js';

export const state = {
  movie: {},
  newMovies: {},
  topMovies: {},
  search: {},
  bookmarks: [],
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
    const data = await AJAX(`/movie/${query}?language=en-US&page=`);

    const results = data.results.map((movie) => {
      return createMovieObject(movie);
    });

    results.forEach(async (res) => {
      res.trailer = await loadMovieTrailer(res.id);
    });

    query === 'popular'
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

    try {
      state.movie.trailer = await loadMovieTrailer(state.movie.id);
    } catch (error) {
      state.movie.trailer = 'none';
    }

    return data;
  } catch (err) {
    console.error(`${err}: Movies did not load`);
    throw err;
  }
};

export const loadMovieForBookmark = async function (query) {
  try {
    const data = await AJAX(`/movie/${query}?language=en-US&page=1`);
    movie = createMovieObject(data);
    return movie;
  } catch (err) {
    console.error(`${err}: Movies did not load`);
    throw err;
  }
};

export const loadSearchResults = async function (searchInput) {
  try {
    const data = await AJAX(
      `/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`,
    );

    const results = data.results.map((result) => createMovieObject(result));

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
      return movie.type === 'Trailer';
    });

    return `https://www.youtube.com/watch?v=` + result.key;
  } catch (err) {
    console.error(`${err}: Movie trailer did not load`);
    throw err;
  }
};

export const loadRandomMovie = async function (query) {
  try {
    const page = randomNumber(28);
    // For some reason API call returns popular movies not discover
    const data = await AJAX(
      `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${query.year}&with_genres=${query.genreID}`,
    );

    const index = randomNumber(data.results.length);
    const movieID = data.results[index].id;

    return movieID;
  } catch (err) {
    console.error(`${err}: Movies did not load`);
    throw err;
  }
};

// loadRandomMovie({ year: 2020, genreID: 35 });

export const loadMovieGenreID = async function (formData) {
  try {
    const data = await AJAX(`/genre/movie/list?language=en`);

    const genre = data.genres.find((el) => el.name === formData.genreName);

    formData.genreID = genre.id;
    return formData;
  } catch (err) {
    console.error(`${err}: Genre ID did not load`);
    throw err;
  }
};

export const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();
