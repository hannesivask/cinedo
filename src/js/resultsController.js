import * as model from "./model.js";

// import { randomNumber, getYear, getMovies, searchMovies } from "./helpers.js";

import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

// This needs refactoring and sorting to model or view files TODO

const init = function () {
  resultsView.loadGridMovies();
  searchView.addHandlerSearch();
};

init();
