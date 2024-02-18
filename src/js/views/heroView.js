class HeroView {
  generateMarkup(movie) {
    return `
      <a href="movie.html?id=${movie.id}">
        <div class="hero__image-box">
          <img class="hero__image-box--movie" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title} Backdrop" />
          <img class="hero__image-box--poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" />
        </div>  
      </a>
      <div class="hero__info-box">
        <div class="hero__button-box">
          <button class="btn">
            <svg class="btn__icon">
              <symbol id="icon-play" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6z"></path>
              </symbol>
              <use href="#icon-play" />
            </svg>
          </button>

          <button class="btn">
            <svg class="btn__icon">
              <symbol id="icon-bookmark-outline" viewBox="0 0 20 20">
                <path d="M2 2c0-1.1 0.9-2 2-2h12c1.105 0 2 0.895 2 2v0 18l-8-4-8 4v-18zM4 2v15l6-3 6 3v-15h-12z"></path>
              </symbol>
              <use href="#icon-bookmark-outline" />
            </svg>
          </button>
        </div>     
        <h1 class="hero-title heading-primary">${movie.title}  <span class="hero-year heading-tertiary">${movie.year}</span></h1>     
        <p class="hero-summary paragraph">${movie.overview}</p>
      </div>`;
  }
}

export default new HeroView();
