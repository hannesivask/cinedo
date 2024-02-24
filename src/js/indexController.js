import * as model from "./model.js";

// import { getMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";
import bookmarkView from "./views/bookmarkView.js";

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
  bookmarkButton();
};

init();

/// Randomizer - need to refactor to heroView.js TODO

const randomButton = function () {
  const btn = document.querySelector(".btn--random");
  const filter = document.querySelector(".filter");

  btn.addEventListener("click", function () {
    filter.classList.toggle("u-hidden");

    window.addEventListener("click", ({ target }) => {
      const randomizerFilter = document.querySelector(".filter");
      const isBtnRandom = target.closest(".btn--random");
      const isRandomizerFilter = target.closest(".filter");
      if (!isRandomizerFilter && target !== randomizerFilter && !isBtnRandom)
        randomizerFilter.classList.add("u-hidden");
    });
  });
};

const randomizer = document.querySelector(".btn--randomize");
const formInputs = document.querySelectorAll(".filter__input");

const random = function () {
  randomizer.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = Array.from(formInputs).map((el) => el.value);

    const formData = { year: data[0], genreName: data[1] };

    await model.loadMovieGenreID(formData);

    await model.loadRandomMovie(formData);
    window.location.href = `../../movie.html?id=${model.state.movie.id}`;
  });
};

/// Bookmark button for HERO - need to refactor to bookmarkView.js TODO

const btnBookmarkEl = document.querySelector(".btn-bookmark");
const bookmarkIconEl = document.querySelector(".bookmark-icon");

btnBookmarkEl.addEventListener("click", () => {
  if (bookmarkIconEl.href.baseVal.slice(-8) === "-outline") {
    const iconFilled = bookmarkIconEl.href.baseVal.substring(0, 34);
    bookmarkIconEl.setAttribute("href", iconFilled);

    if (!model.state.bookmarks.includes(btnBookmarkEl.dataset.id))
      model.state.bookmarks.push(btnBookmarkEl.dataset.id);

    model.persistBookmarks();
  } else {
    const iconOutline = bookmarkIconEl.href.baseVal + "-outline";
    bookmarkIconEl.setAttribute("href", iconOutline);

    if (model.state.bookmarks.includes(btnBookmarkEl.dataset.id)) {
      model.state.bookmarks = model.state.bookmarks.filter(
        (el) => el !== btnBookmarkEl.dataset.id
      );
      model.persistBookmarks();
    }
  }
});

/// Bookmark list - need to refactor to bookmarkView.js TODO

const bookmarkButton = function () {
  const btn = document.querySelector(".btn-bookmarks");
  const bookmarksListEl = document.querySelector(".bookmarks__list");

  btn.addEventListener("click", function () {
    bookmarksListEl.classList.toggle("u-hidden");
    if (bookmarksListEl.classList.contains("u-hidden")) return;

    bookmarkView.loadBookmarks();

    window.addEventListener("click", ({ target }) => {
      const bookmarksList = document.querySelector(".bookmarks__list");
      const isBtnBookmarks = target.closest(".btn-bookmarks");
      const isBookmarksList = target.closest(".bookmarks__list");
      if (!isBookmarksList && target !== bookmarksList && !isBtnBookmarks)
        bookmarksList.classList.add("u-hidden");
    });
  });
};

window.addEventListener("click", ({ target }) => {
  const randomizerFilter = document.querySelector(".filter");
  const isBtnRandom = target.closest(".btn--random");
  const isRandomizerFilter = target.closest(".filter");
  if (!isRandomizerFilter && target !== randomizerFilter && !isBtnRandom)
    randomizerFilter.classList.add("u-hidden");
});

// window.addEventListener("click", ({ target }) => {
//   console.log(target);
// });
