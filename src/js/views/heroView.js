class HeroView {
  generateMarkup(movie) {
    return `
      <a href="movie.html?${movie.id}">
        <div class="hero__image-box">
          <img class="hero__image-box--movie" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title} Backdrop" />
          <img class="hero__image-box--poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" />
        </div>  
      </a>
      <div class="hero__info-box">
        <div class="hero__button-box">
          <button class="btn">
            <svg class="btn__icon">
              <use href="/src/img/sprite.svg#icon-play"></use>
            </svg>
          </button>

          <button class="btn">
            <svg class="btn__icon">
              <use href="/src/img/sprite.svg#icon-bookmark-outline"></use>
            </svg>
          </button>
        </div>
        
        <h1 class="hero-title heading-primary">${movie.title}</h1>
        <span class="hero-year heading-tertiary">${movie.year}</span>
        <p class="hero-summary paragraph">${movie.overview}</p>
      </div>`;
  }
}

export default new HeroView();
