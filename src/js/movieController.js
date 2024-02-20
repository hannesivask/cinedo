import * as model from "./model.js";

// import { randomNumber, getYear, getMovies, searchMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";

// This needs refactoring and sorting to model or view files TODO

const init = async function () {
  const searchParams = new URLSearchParams(window.location.search);
  const movieID = searchParams.get("id");

  await model.loadSingleMovie(movieID);

  heroView.loadMovieHeroContent(model.state.movie);
  searchView.addHandlerSearch();
};

init();
