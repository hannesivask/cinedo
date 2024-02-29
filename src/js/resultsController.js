import * as model from "./model.js";

import searchView from "./views/searchView.js";
import scrollerView from "./views/scrollerView.js";
import bookmarkView from "./views/bookmarkView.js";
import randomizerView from "./views/randomizerView.js";
import resultsView from "./views/resultsView.js";

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
  scrollerView.toggleBookmarksButton(cardBtn, true);
  controlViewBookmarks();
  model.persistBookmarks();
};

const controlRandomizeMovie = async function (data) {
  const formData = await model.loadMovieGenreID(data);
  const randomMovieID = await model.loadRandomMovie(formData);
  randomizerView.setLocation(randomMovieID);
};

const controlResultsGrid = async function (query) {
  await model.loadSearchResults(query);

  model.state.search.forEach((el) => {
    if (!el.poster_path) return;

    if (model.state.bookmarks.some((bookmark) => el.id === bookmark.id)) {
      resultsView.renderGrid(el, true);
    } else {
      resultsView.renderGrid(el);
    }
  });
};

const controlAddGridBookmark = async function (id, target) {
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

const init = function () {
  bookmarkView.addHandlerRemoveBookmarks(controlRemoveBookmark);
  bookmarkView.addHandlerRender(controlViewBookmarks);
  bookmarkView.addHandlerShowBookmarkList();

  searchView.addHandlerSearch(controlSearchResults);

  randomizerView.addHandlerShowRandomizer();
  randomizerView.addHandlerRandomize(controlRandomizeMovie);

  resultsView.addHandlerRender(controlResultsGrid);
  resultsView.addHandlerAddBookmarks(controlAddGridBookmark);
};

init();
