import { AJAX, randomNumber } from "./helpers.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const heroImageBox = document.querySelector(".hero__image-box");
const heroInfoBox = document.querySelector(".hero__info-box");

const loadHeroImages = function (movie) {
  const heroImages = Array.from(heroImageBox.children);
  heroImages.forEach((el) => {
    el.className === "hero__image-box--movie"
      ? (el.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`)
      : (el.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
  });
};

const loadHeroTitle = function (movie) {
  const heroTitles = Array.from(heroInfoBox.children);

  const date = new Date(movie.release_date);
  const year = date.getFullYear();

  heroTitles.forEach((titleEl) => {
    if (titleEl.classList.contains("hero-title")) {
      titleEl.textContent = movie.title;
    }
    if (titleEl.classList.contains("hero-year")) {
      titleEl.textContent = year;
    }
    if (titleEl.classList.contains("hero-summary")) {
      titleEl.textContent = movie.overview;
    }
  });
};

const loadHeroContent = function (movies) {
  const randomNum = randomNumber(20);
  const movie = movies[randomNum];

  loadHeroImages(movie);
  loadHeroTitle(movie);
};

const loadNewMovies = function (movies) {
  for (let i = 5; i < 10; i++) {
    const poster = movies[i].poster_path;
    const title = movies[i].title;
    const rating = movies[i].vote_average;
    const id = movies[i].id;
    const markup = generatCardMarkup(rating, poster, title, id);
    newMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const loadTopMovies = function (movies) {
  for (let i = 5; i < 10; i++) {
    const poster = movies[i].poster_path;
    const title = movies[i].title;
    const rating = movies[i].vote_average;
    const id = movies[i].id;
    const markup = generatCardMarkup(rating, poster, title, id);
    topMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const generatCardMarkup = function (rating, poster, title, id) {
  return `
  <div class="card">
    <span class="card__rating">
    <svg class="card__rating-icon">
      <use href="/src/img/sprite.svg#icon-star-full"></use>
    </svg>${rating.toFixed(1)}</span>
    <div class="card__img-box">
      <a href="movie.html?id=${id}" class="card__link">
        <img
          src="https://image.tmdb.org/t/p/w500${poster}"
          alt="Poster image"
          class="card__img"
        />
      </a>
    </div>
    <span class="card__title">${title}</span>
    <button class="btn btn--filled card__btn">&plus; watchlist</button>
  </div>`;
};

const init = async function () {
  const newMovies = await AJAX("popular");
  const topMovies = await AJAX("top_rated");
  loadHeroContent(newMovies);
  loadNewMovies(newMovies);
  loadTopMovies(topMovies);
};

init();
