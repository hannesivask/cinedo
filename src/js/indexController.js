import { CYCLE_TIME } from "./config.js";
import * as model from "./model.js";
import { randomNumber } from "./helpers.js";
// import { getMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
// import cardView from "./views/scrollerView.js";
import searchView from "./views/searchView.js";
import bookmarkView from "./views/bookmarkView.js";
import randomizerView from "./views/randomizerView.js";
import scrollerView from "./views/scrollerView.js";

// This needs refactoring and sorting to model or view files TODO

const controlHeroContent = async function () {
  await model.loadMovies("popular");

  const randomNum = randomNumber(model.state.newMovies.length);

  heroView.loadHeroContent(model.state.newMovies[randomNum]);
};

const cycleHeroContent = async function () {
  await model.loadMovies("popular");

  setInterval(() => {
    const randomNum = randomNumber(model.state.newMovies.length);
    heroView.hideHeroContent();

    setTimeout(() => {
      heroView.cycleHeroContent(model.state.newMovies[randomNum]);
    }, 500);

    heroView.showHeroImages();
  }, CYCLE_TIME);
};

const controlScroller = async function () {
  await model.loadMovies("popular");
  scrollerView.loadScroller(model.state.newMovies, "popular");

  await model.loadMovies("top_rated");
  scrollerView.loadScroller(model.state.topMovies, "top");
};

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  await model.loadSearchResults(query);

  searchView.renderSearchResults(model.state.search);
};

const init = function () {
  heroView.addHandlerRender(controlHeroContent);
  heroView.addHandlerCycle(cycleHeroContent);
  scrollerView.addHandlerRender(controlScroller);
  searchView.addHandlerSearch(controlSearchResults);

  //

  // window.addEventListener("click", ({ target }) => {
  //   const isBtnRandom = target.closest(".btn--random");
  //   const isRandomizerFilter = target.closest(".filter");
  //   if (
  //     !isRandomizerFilter &&
  //     target !== randomizerView._parentElement &&
  //     !isBtnRandom
  //   ) {
  //     randomizerView._parentElement.classList.add("u-hidden");
  //   } else {
  //     randomizerView._parentElement.classList.toggle("u-hidden");
  //   }
  // });

  // bookmarkView.bookmarkButton();
};

init();

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
