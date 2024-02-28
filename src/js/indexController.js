import { CYCLE_TIME } from "./config.js";
import { randomNumber } from "./helpers.js";

import * as model from "./model.js";

import heroView from "./views/heroView.js";
import searchView from "./views/searchView.js";
import scrollerView from "./views/scrollerView.js";
import bookmarkView from "./views/bookmarkView.js";
import randomizerView from "./views/randomizerView.js";

// This needs refactoring and sorting to model or view files TODO

const controlHeroContent = async function () {
  await model.loadMovies("popular");

  const id = model.state.newMovies[0].id;
  

  if (model.state.bookmarks.includes(id.toString())) {
    heroView.loadHeroContent(model.state.newMovies[0], true);
  } else {
    heroView.loadHeroContent(model.state.newMovies[0]);
  }
};

const cycleHeroContent = async function () {
  await model.loadMovies("popular");

  setInterval(() => {
    const randomNum = randomNumber(model.state.newMovies.length);
    heroView.hideHeroContent();

    setTimeout(() => {
      if (
        model.state.bookmarks.includes(
          model.state.newMovies[randomNum].id.toString()
        )
      ) {
        heroView.cycleHeroContent(model.state.newMovies[randomNum], true);
      } else {
        heroView.cycleHeroContent(model.state.newMovies[randomNum]);
      }
    }, 500);

    heroView.showHeroImages();
  }, CYCLE_TIME);
};

const controlScroller = async function () {
  await model.loadMovies("popular");

  model.state.newMovies.forEach((el) => {
    if (model.state.bookmarks.includes(el.id.toString())) {
      scrollerView.renderScrollerCards(el, "popular", true);
    } else {
      scrollerView.renderScrollerCards(el, "popular");
    }
  });

  await model.loadMovies("top_rated");
  model.state.topMovies.forEach((el) => {
    if (model.state.bookmarks.includes(el.id.toString())) {
      scrollerView.renderScrollerCards(el, "top", true);
    } else {
      scrollerView.renderScrollerCards(el, "top");
    }
  });
};

const controlAddBookmark = async function (id, target) {
  const movie = await model.loadMovieForBookmark(id);

  if (model.state.bookmarks.includes(movie)) {
    scrollerView.toggleBookmarksButton(target);
    model.state.bookmarks = model.state.bookmarks.filter((el) => el !== movie);
  } else {
    scrollerView.toggleBookmarksButton(target, false);
    model.state.bookmarks.push(movie);
  }

  model.persistBookmarks();
};

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  await model.loadSearchResults(query);

  searchView.renderSearchResults(model.state.search);
};

// Need to change bookmarks logic so whole movie object is added to array TODO

const controlViewBookmarks = async function () {
  // const bookmarks = model.state.bookmarks;
  // if (bookmarks.length === 0) {
  //   bookmarkView.renderEmptyBookmarks();
  // } else {
  //   bookmarks.forEach(async (el) => {
  //     console.log(el);
  //     const movie = await model.loadMovieForBookmark(el);
  //     console.log(movie);
  //     bookmarkView.renderBookmarks(movie);
  //   });
  // }
};

const init = function () {
  heroView.addHandlerRender(controlHeroContent);
  heroView.addHandlerCycle(cycleHeroContent);
  scrollerView.addHandlerRender(controlScroller);
  scrollerView.addHandlerAddBookmarks(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  bookmarkView.addHandlerRender(controlViewBookmarks);

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
