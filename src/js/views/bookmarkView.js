import * as model from '../model';

class BookmarkView {
  _parentElement = document.querySelector('.bookmarks__list');
  // This needs refactoring TODO

  addHandlerRender(handler) {
    window.addEventListener('load', () => {
      handler();
    });
  }

  renderEmptyBookmarks() {
    const markup = this._generateError();
    this._parentElement.innerHTML = markup;
  }

  renderBookmarks(bookmarks) {
    this._parentElement.innerHTML = '';
    bookmarks.forEach((el) => {
      const markup = this._generateMarkup(el);
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    });
    // this._parentElement.innerHTML = '';

    // const btn = document.querySelector(".bookmarks__btn-remove");
    // this.removeBookmark(btn);
  }

  // bookmarkButton() {
  //   const btn = document.querySelector(".btn-bookmarks");
  //   const bookmarksListEl = document.querySelector(".bookmarks__list");

  //   btn.addEventListener("click", function () {
  //     bookmarksListEl.classList.toggle("u-hidden");
  //     if (bookmarksListEl.classList.contains("u-hidden")) return;

  //     this.loadBookmarks;

  //     window.addEventListener("click", ({ target }) => {
  //       const bookmarksList = document.querySelector(".bookmarks__list");
  //       const isBtnBookmarks = target.closest(".btn-bookmarks");
  //       const isBookmarksList = target.closest(".bookmarks__list");
  //       if (!isBookmarksList && target !== bookmarksList && !isBtnBookmarks)
  //         bookmarksList.classList.add("u-hidden");
  //     });
  //   });
  // }

  // Need to add button that removes bookmark and refreshes the list TODO

  removeBookmark(btn) {
    btn.addEventListener('click', (el) => {
      const index = model.state.bookmarks.indexOf(btn.dataset.id);

      model.state.bookmarks = model.state.bookmarks.splice(index, 1);
      if (model.state.bookmarks.length === 1) {
        model.state.bookmarks = [];
      }

      model.persistBookmarks();
      // this.loadBookmarks();
    });
  }

  _generateError() {
    return `<span class="bookmarks__empty">No Bookmarks found</span>`;
  }

  // REMOVE THE u-hidden CLASS from the button to use it TODO
  _generateMarkup(movie) {
    return `
      <li class="bookmarks__item">
        <a href="movie.html?id=${movie.id}" class="bookmarks__link">
          <img
            src="https://image.tmdb.org/t/p/w200/${movie.poster_path}"
            alt="${movie.title} Poster"
            class="bookmarks__img"
          />
          <div class="bookmarks__text">
            <h3 class="bookmarks__title">
             ${movie.title}
            </h3>
            <p class="bookmarks__year">${movie.year}</p>
          </div>
        </a>
        <button data-id="${movie.id}" class="bookmarks__btn-remove u-hidden"> 
            <svg class="bookmarks__icon">
              <symbol id="icon-close-outline" viewBox="0 0 20 20">
                <path d="M2.93 17.070c-1.884-1.821-3.053-4.37-3.053-7.193 0-5.523 4.477-10 10-10 2.823 0 5.372 1.169 7.19 3.050l0.003 0.003c1.737 1.796 2.807 4.247 2.807 6.947 0 5.523-4.477 10-10 10-2.7 0-5.151-1.070-6.95-2.81l0.003 0.003zM4.34 15.66c1.449 1.449 3.45 2.344 5.66 2.344 4.421 0 8.004-3.584 8.004-8.004 0-2.21-0.896-4.211-2.344-5.66v0c-1.449-1.449-3.45-2.344-5.66-2.344-4.421 0-8.004 3.584-8.004 8.004 0 2.21 0.896 4.211 2.344 5.66v0zM14.24 7.17l-2.83 2.83 2.83 2.83-1.41 1.41-2.83-2.83-2.83 2.83-1.41-1.41 2.83-2.83-2.83-2.83 1.41-1.41 2.83 2.83 2.83-2.83 1.41 1.41z">
                </path>
              </symbol>
              <use href="#icon-close-outline"></use>
            </svg>
          </button>
      </li>
    `;
  }
}

export default new BookmarkView();
