import { randomNumber } from "../helpers.js";
import { CYCLE_TIME } from "../config.js";

import * as model from "../model.js";

class HeroView {
  _parentElement = document.querySelector(".section-hero");

  _movieImgEl = document.querySelector(".hero__image-box--movie");
  _posterImgEl = document.querySelector(".hero__image-box--poster");
  _imageLinkEl = document.querySelector(".hero__link");
  _btnTrailerEl = document.querySelector(".btn-trailer");
  _titleEl = document.querySelector(".hero-title");
  _yearEl = document.querySelector(".hero-year");
  _summaryEl = document.querySelector(".hero-summary");
  _btnBookmarkEl = document.querySelector(".btn-bookmark");

  loadHeroContent(movies) {
    const randomNum = randomNumber(movies.length);
    const movie = movies[randomNum];
    this._setHeroContent(movie);
  }

  loadMovieHeroContent(movie) {
    this._setHeroContent(movie);
  }

  cycleHeroContent(movies) {
    setInterval(() => {
      const randomNum = randomNumber(movies.length);
      const movie = movies[randomNum];

      this._movieImgEl.classList.add("u-opacity-none");
      this._posterImgEl.classList.add("u-opacity-none");
      this._toggleTextVisibility();

      setTimeout(() => {
        this._setHeroContent(movie);
        this._toggleTextVisibility();
      }, 300);

      this._movieImgEl.addEventListener("load", () => {
        this._movieImgEl.classList.remove("u-opacity-none");
      });

      this._posterImgEl.addEventListener("load", () => {
        this._posterImgEl.classList.remove("u-opacity-none");
      });
    }, CYCLE_TIME);
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
