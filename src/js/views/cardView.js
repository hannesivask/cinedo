class CardView {
  generateMarkup(movie) {
    return `
    <div class="card">
      <span class="card__rating">
      <svg class="card__rating-icon">
        <use href="/src/img/sprite.svg#icon-star-full"></use>
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
      <button class="btn btn--filled card__btn">&plus; watchlist</button>
    </div>`;
  }
}

export default new CardView();
