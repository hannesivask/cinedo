import * as model from "./model.js";

import heroView from "./views/heroView.js";
import searchView from "./views/searchView.js";
import bookmarkView from "./views/bookmarkView.js";
import randomizerView from "./views/randomizerView.js";

const controlHeroContent = async function (id) {
  await model.loadSingleMovie(id);

  if (model.state.bookmarks.some((bookmark) => id * 1 === bookmark.id)) {
    heroView.loadHeroContent(model.state.movie, true);
  } else {
    heroView.loadHeroContent(model.state.movie);
  }
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

const controlRemoveBookmark = function (id, _) {
  const book = model.state.bookmarks.filter((el) => {
    return el.id !== id * 1;
  });
  model.state.bookmarks = book;
  heroView.toggleBookmarksButton(false);
  controlViewBookmarks();
  model.persistBookmarks();
};

const controlRandomizeMovie = async function (data) {
  const formData = await model.loadMovieGenreID(data);
  const randomMovieID = await model.loadRandomMovie(formData);
  randomizerView.setLocation(randomMovieID);
};

const init = function () {
  heroView.addHandlerRenderMovie(controlHeroContent);
  heroView.addHandlerAddBookmark(controlAddHeroBookmark);

  bookmarkView.addHandlerRemoveBookmarks(controlRemoveBookmark);
  bookmarkView.addHandlerRender(controlViewBookmarks);
  bookmarkView.addHandlerShowBookmarkList();

  searchView.addHandlerSearch(controlSearchResults);

  randomizerView.addHandlerShowRandomizer();
  randomizerView.addHandlerRandomize(controlRandomizeMovie);
};

init();

// const init = async function () {
//   const searchParams = new URLSearchParams(window.location.search);
//   const movieID = searchParams.get("id");

//   await model.loadSingleMovie(movieID);

//   heroView.loadMovieHeroContent(model.state.movie);
//   searchView.addHandlerSearch();
// };

// init();
