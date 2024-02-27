import { randomNumber } from "../helpers.js";

import * as model from "../model.js";

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

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerCycle(handler) {
    window.addEventListener("load", handler);
  }

  loadHeroContent(data) {
    this._setHeroContent(data);
  }

  cycleHeroContent(movie) {
    this._setHeroContent(movie);
    this._toggleTextVisibility();
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
    this._setBookmarkIcon(movie);
  }

  _toggleTextVisibility() {
    this._titleEl.classList.toggle("u-opacity-none");
    this._yearEl.classList.toggle("u-opacity-none");
    this._summaryEl.classList.toggle("u-opacity-none");
  }

  _setBookmarkIcon(movie) {
    const bookmarkIconEl = document.querySelector(".bookmark-icon");
    if (model.state.bookmarks.includes(`${movie.id}`)) {
      const iconFilled = bookmarkIconEl.href.baseVal.substring(0, 34);
      bookmarkIconEl.setAttribute("href", iconFilled);
    } else {
      if (bookmarkIconEl.href.baseVal.slice(-8) !== "-outline") {
        const iconOutline = bookmarkIconEl.href.baseVal + "-outline";
        bookmarkIconEl.setAttribute("href", iconOutline);
      }
    }
  }
}

export default new HeroView();
