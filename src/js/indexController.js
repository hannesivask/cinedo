import * as model from "./model.js";

// import { getMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";

// This needs refactoring and sorting to model or view files TODO

const init = async function () {
  await model.loadMovies("popular");
  await model.loadMovies("top_rated");
  // console.log(model.state);

  heroView.loadHeroContent(model.state.newMovies);
  heroView.cycleHeroContent(model.state.newMovies);
  cardView.loadNewMovies(model.state.newMovies);
  cardView.loadTopMovies(model.state.topMovies);

  searchView.addHandlerSearch();

  // Testing functionality
  randomButton();
  random();
};

init();

// Testing functionality
const randomButton = function () {
  const btn = document.querySelector(".btn--random");
  const filter = document.querySelector(".filter");

  btn.addEventListener("click", function () {
    filter.classList.toggle("u-hidden");
  });
};

const randomizer = document.querySelector(".btn--randomize");
const formInputs = document.querySelectorAll(".filter__input");

const random = function () {
  randomizer.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = {};
    Array.from(formInputs).forEach((el) => {
      el.id === "year"
        ? (formData.year = el.value)
        : (formData.genreName = el.value);
    });

    await model.loadMovieGenreID(formData);
    console.log(formData);
    await model.loadRandomMovie(formData);

    console.log(state);
  });
};
