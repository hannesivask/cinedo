import { API_URL, KEY } from "./config_temp.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const hero = document.querySelector(".section-hero");

const heroBackdropImg = document.querySelector(".image-box__img--movie");
const heroPosterImg = document.querySelector(".image-box__img--poster");
const heroTitle = document.querySelector(".hero-title");
const heroYear = document.querySelector(".hero-year");
const heroSummary = document.querySelector(".hero-summary");

const carouselRight = document.querySelector(".carousel__right");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: KEY,
  },
};

const AJAX = async function (type) {
  try {
    const response = await fetch(
      `${API_URL}/movie/${type}?language=en-US&page=1`,
      options
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data.results;
  } catch (err) {}
};

/* const getTrailer = async function (movie) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {}
}; */

window.onload = function () {
  setInterval(setHero, 5000);
};

const setHero = async function () {
  const newMovies = await AJAX("popular");
  loadHero(newMovies);
};

const loadHero = async function (movies) {
  const random = Math.floor(Math.random() * 20);
  const date = new Date(movies[random].release_date);
  const year = date.getFullYear();

  const movie = movies[random];

  heroBackdropImg.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  heroPosterImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  heroTitle.textContent = `${movie.title}`;
  heroYear.textContent = `${year}`;
  heroSummary.textContent = `${movie.overview}`;
};

const loadNewMovies = function (movies) {
  for (let i = 5; i < 10; i++) {
    const poster = movies[i].poster_path;
    const title = movies[i].title;
    const rating = movies[i].vote_average;
    const id = movies[i].id;
    const markup = generateMarkup(rating, poster, title, id);
    newMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const loadTopMovies = function (movies) {
  for (let i = 5; i < 10; i++) {
    const poster = movies[i].poster_path;
    const title = movies[i].title;
    const rating = movies[i].vote_average;
    const id = movies[i].id;
    const markup = generateMarkup(rating, poster, title, id);
    topMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const generateMarkup = function (rating, poster, title, id) {
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

  loadHero(newMovies);
  loadNewMovies(newMovies);
  loadTopMovies(topMovies);
};

init();
