class CardView {
  generateMarkup(movie) {
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
      <button class="btn btn--filled card__btn">&plus; watchlist</button>
    </div>`;
  }
}

export default new CardView();
