import * as model from "../model";

class CardView {
  // This needs refactoring TODO

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  loadNewMovies(movies) {
    const newMovies = document.querySelector(".new-movies");
    this._loadCardContent(movies, newMovies);
  }

  _loadCardContent(movies, elHTML) {
    movies.forEach((movie) => {
      const markup = this._generateMarkup(movie);
      elHTML.insertAdjacentHTML("afterbegin", markup);

      const btnBookmarkCardEl = document.querySelector(".card__btn");

      if (model.state.bookmarks.includes(`${movie.id}`)) {
        btnBookmarkCardEl.textContent = "✓ watchlist";
        btnBookmarkCardEl.classList.toggle("u-bookmarked");
      }

      // WATCHLIST BUTTON FUNCTIONALITY NEEDS REFACTORING - TODO

      btnBookmarkCardEl.addEventListener("click", () => {
        // console.log(btnBookmarkCardEl.dataset.id);

        if (!model.state.bookmarks.includes(btnBookmarkCardEl.dataset.id)) {
          btnBookmarkCardEl.textContent = "✓ watchlist";
          btnBookmarkCardEl.classList.toggle("u-bookmarked");

          model.state.bookmarks.push(btnBookmarkCardEl.dataset.id);
          model.persistBookmarks();
        } else {
          btnBookmarkCardEl.textContent = "+ watchlist";
          btnBookmarkCardEl.classList.toggle("u-bookmarked");

          model.state.bookmarks = model.state.bookmarks.filter(
            (el) => el !== btnBookmarkCardEl.dataset.id
          );
          model.persistBookmarks();
        }
      });
    });
  }

  // This needs refactoring with last function TODO
  // Also need to create a general render function for this TODO

  loadTopMovies(movies) {
    const topMovies = document.querySelector(".top-movies");
    this._loadCardContent(movies, topMovies); // This does not work for these cards for some reason TODO
  }

  _generateMarkup(movie) {
    return `
    <div class="card">
      <span class="card__rating">
      <svg class="card__rating-icon">
        <symbol id="icon-star-full" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.090 1.123-6.545-4.756-4.635 6.572-0.955 2.939-5.955 2.939 5.955 6.572 0.955-4.756 4.635 1.123 6.545z"></path>  
        </symbol>
        <use href="#icon-star-full"></use>
      </svg>${movie.vote_average.toFixed(1)}</span>
      <div class="card__img-box">
        <a href="movie.html?id=${movie.id}" class="card__link">
          <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title} Poster image"
            class="card__img"
          />
        </a>
      </div>
      <span class="card__title">${movie.title}</span>
      <button data-id="${
        movie.id
      }" class="btn btn--filled card__btn">&plus; watchlist</button>
    </div>`;
  }
}

export default new CardView();
