import { CYCLE_TIME } from "./config.js";
import { randomNumber } from "./helpers.js";

import * as model from "./model.js";

import heroView from "./views/heroView.js";
import searchView from "./views/searchView.js";
import scrollerView from "./views/scrollerView.js";
import bookmarkView from "./views/bookmarkView.js";
import randomizerView from "./views/randomizerView.js";

const controlHeroContent = async function () {
  await model.loadMovies("popular");
  const random = randomNumber(model.state.newMovies.length);
  const id = model.state.newMovies[random].id;
  if (model.state.bookmarks.some((bookmark) => id === bookmark.id)) {
    heroView.loadHeroContent(model.state.newMovies[random], true);
  } else {
    heroView.loadHeroContent(model.state.newMovies[random]);
  }
};

const cycleHeroContent = async function () {
  await model.loadMovies("popular");

  setInterval(() => {
    const randomNum = randomNumber(model.state.newMovies.length);
    heroView.hideHeroContent();

    setTimeout(() => {
      const movie = model.state.newMovies[randomNum];
      if (model.state.bookmarks.find((bookmark) => movie.id === bookmark.id)) {
        heroView.cycleHeroContent(movie, true);
      } else {
        heroView.cycleHeroContent(movie);
      }
    }, 500);

    heroView.showHeroImages();
  }, CYCLE_TIME);
};

const controlAddHeroBookmark = async function (id) {
  const movie = await model.loadMovieForBookmark(id);

  if (
    model.state.bookmarks.some((bookmark) => {
      return movie.id === bookmark.id;
    })
  ) {
    heroView.toggleBookmarksButton();

    model.state.bookmarks = model.state.bookmarks.filter(
      (el) => el.id !== movie.id
    );
  } else {
    heroView.toggleBookmarksButton(true);
    model.state.bookmarks.push(movie);
  }

  model.persistBookmarks();
  controlViewBookmarks();
};

const controlScroller = async function () {
  await model.loadMovies("popular");

  model.state.newMovies.forEach((el) => {
    if (model.state.bookmarks.some((bookmark) => el.id === bookmark.id)) {
      scrollerView.renderScrollerCards(el, "popular", true);
    } else {
      scrollerView.renderScrollerCards(el, "popular");
    }
  });

  await model.loadMovies("top_rated");

  model.state.topMovies.forEach((el) => {
    if (model.state.bookmarks.some((bookmark) => el.id === bookmark.id)) {
      scrollerView.renderScrollerCards(el, "top", true);
    } else {
      scrollerView.renderScrollerCards(el, "top");
    }
  });
};

const controlAddBookmark = async function (id, target) {
  const movie = await model.loadMovieForBookmark(id);

  if (
    model.state.bookmarks.some((bookmark) => {
      return movie.id === bookmark.id;
    })
  ) {
    scrollerView.toggleBookmarksButton(target);
    model.state.bookmarks = model.state.bookmarks.filter(
      (el) => el.id !== movie.id
    );
  } else {
    scrollerView.toggleBookmarksButton(target, false);
    model.state.bookmarks.push(movie);
  }

  model.persistBookmarks();
  controlViewBookmarks();
};

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  await model.loadSearchResults(query);

  searchView.renderSearchResults(model.state.search);
};

const controlViewBookmarks = function () {
  const bookmarks = model.state.bookmarks;

  if (bookmarks.length === 0) {
    bookmarkView.renderEmptyBookmarks();
  } else {
    bookmarkView.renderBookmarks(bookmarks);
  }
};

const controlRemoveBookmark = function (id, cardBtn) {
  const book = model.state.bookmarks.filter((el) => {
    return el.id !== id * 1;
  });
  model.state.bookmarks = book;
  heroView.toggleBookmarksButton(false);
  scrollerView.toggleBookmarksButton(cardBtn, true);
  controlViewBookmarks();
  model.persistBookmarks();
};

const controlRandomizeMovie = async function (data) {
  const formData = await model.loadMovieGenreID(data);
  const randomMovieID = await model.loadRandomMovie(formData);
  randomizerView.setLocation(randomMovieID);
};

const init = function () {
  heroView.addHandlerRender(controlHeroContent);
  heroView.addHandlerCycle(cycleHeroContent);
  heroView.addHandlerAddBookmark(controlAddHeroBookmark);

  scrollerView.addHandlerRender(controlScroller);
  scrollerView.addHandlerAddBookmarks(controlAddBookmark);

  bookmarkView.addHandlerRemoveBookmarks(controlRemoveBookmark);
  bookmarkView.addHandlerRender(controlViewBookmarks);
  bookmarkView.addHandlerShowBookmarkList();

  searchView.addHandlerSearch(controlSearchResults);

  randomizerView.addHandlerShowRandomizer();
  randomizerView.addHandlerRandomize(controlRandomizeMovie);
};

init();
