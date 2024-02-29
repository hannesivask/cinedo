class ScrollerView {
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerAddBookmarks(handler) {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("card__btn")) return;
      const id = e.target.dataset.id;
      handler(id, e.target);
    });
  }

  renderScrollerCards(entry, type, bookmarked = false) {
    const parentElement = document.querySelector(`.scroller__${type}`);

    const markup = this._generateMarkup(entry, bookmarked);
    parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  toggleBookmarksButton(target, bookmarked = true) {
    if (bookmarked) {
      target.textContent = "+ watchlist";
      target.classList.remove("u-bookmarked");
    } else {
      target.textContent = "in watchlist";
      target.classList.add("u-bookmarked");
    }
  }

  _generateMarkup(movie, bookmarked) {
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
            loading="lazy"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title} Poster image"
            class="card__img"
          />
        </a>
      </div>
      <span class="card__title">${movie.title}</span>
      <button data-id="${movie.id}" class="btn btn--filled card__btn ${
      bookmarked ? "u-bookmarked" : ""
    }">${bookmarked ? "in" : "+"} watchlist</button>
    </div>`;
  }
}

export default new ScrollerView();
