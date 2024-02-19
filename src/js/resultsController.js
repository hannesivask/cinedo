import { randomNumber, getYear, getMovies, searchMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";

const resultGridEl = document.querySelector(".results__grid");

const loadGridMovies = async function () {
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("search");
  const searchResults = await searchMovies(searchQuery);

  searchResults.results.forEach((movie) => {
    if (!movie.poster_path) return;
    const markup = cardView.generateMarkup(movie);
    resultGridEl.insertAdjacentHTML("beforeend", markup);
  });
};

const init = function () {
  loadGridMovies();
  searchView.addHandlerSearch();
};

init();
