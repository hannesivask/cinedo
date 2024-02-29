class HeroView {
  _parentElement = document.querySelector(".section-hero");

  _movieImgEl = this._parentElement.querySelector(".hero__image-box--movie");
  _posterImgEl = this._parentElement.querySelector(".hero__image-box--poster");
  _imageLinkEl = this._parentElement.querySelector(".hero__link");
  _btnTrailerEl = this._parentElement.querySelector(".btn-trailer");
  _titleEl = this._parentElement.querySelector(".hero-title");
  _yearEl = this._parentElement.querySelector(".hero-year");
  _summaryEl = this._parentElement.querySelector(".hero-summary");
  _btnBookmarkEl = this._parentElement.querySelector(".btn-bookmark");
  _bookmarkIconEl = this._parentElement.querySelector(".bookmark-icon");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerCycle(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-bookmark")) return;
      const id = e.target.closest(".btn-bookmark").dataset.id;
      handler(id);
    });
  }

  loadHeroContent(data, bookmarked = false) {
    this._setHeroContent(data);
    this._setBookmarkIcon(bookmarked);
  }

  cycleHeroContent(movie, bookmarked = false) {
    this._setHeroContent(movie);
    this._toggleTextVisibility();
    this._setBookmarkIcon(bookmarked);
  }

  toggleBookmarksButton(bookmarked = false) {
    this._setBookmarkIcon(bookmarked);
  }

  _setBookmarkIcon(bookmarked) {
    const markup = this._generateBtnMarkup(bookmarked);
    this._btnBookmarkEl.innerHTML = markup;
  }

  hideHeroContent() {
    this._movieImgEl.classList.add("u-opacity-none");
    this._posterImgEl.classList.add("u-opacity-none");
    this._toggleTextVisibility();
  }

  showHeroImages() {
    this._movieImgEl.onload = () => {
      this._movieImgEl.classList.remove("u-opacity-none");
    };

    this._posterImgEl.onload = () => {
      this._posterImgEl.classList.remove("u-opacity-none");
    };
  }

  _setHeroContent(movie) {
    this._movieImgEl.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    // this._movieImgEl.src = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;  // - low reso for lazy loading TODO
    this._posterImgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    // this._posterImgEl.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;  // - low reso for lazy loading TODO
    this._imageLinkEl.href = `movie.html?id=${movie.id}`;
    if (movie.trailer === "none")
      this._btnTrailerEl.classList.toggle("u-hidden");
    else this._btnTrailerEl.href = movie.trailer;
    this._titleEl.textContent = movie.title;
    this._yearEl.textContent = movie.year;
    this._summaryEl.textContent = movie.overview;
    this._btnBookmarkEl.dataset.id = movie.id;
  }

  _toggleTextVisibility() {
    this._titleEl.classList.toggle("u-opacity-none");
    this._yearEl.classList.toggle("u-opacity-none");
    this._summaryEl.classList.toggle("u-opacity-none");
  }

  _generateBtnMarkup(bookmarked) {
    return `
    <svg class="btn__icon">
    ${
      bookmarked
        ? `<symbol id="icon-bookmark" viewBox="0 0 20 20">
              <path d="M2 2c0-1.1 0.9-2 2-2h12c1.105 0 2 0.895 2 2v0 18l-8-4-8 4v-18z"></path>
            </symbol>
            <use href="#icon-bookmark"></use>`
        : `<symbol id="icon-bookmark-outline" viewBox="0 0 20 20">
              <path path d="M2 2c0-1.1 0.9-2 2-2h12c1.105 0 2 0.895 2 2v0 18l-8-4-8 4v-18zM4 2v15l6-3 6 3v-15h-12z"></path>
            </symbol>
            <use href="#icon-bookmark-outline"></use>
      </svg>`
    }
      
`;
  }
}

export default new HeroView();
