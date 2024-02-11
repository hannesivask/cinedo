import { API_URL, KEY } from "./config_temp.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const hero = document.querySelector(".section-hero");

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
    // console.log(data);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data.results;
  } catch (err) {}
};

const getTrailer = async function (movie) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    // console.log(data.results);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // return data.results;
  } catch (err) {}
};

// window.onload = function () {
//   console.log("now");
//   setInterval(setHero, 5000);
// };

const setHero = async function () {
  const newMovies = await AJAX("popular");
  updateHero(newMovies);
};

const loadHero = async function (movies) {
  const random = Math.floor(Math.random() * 20);
  const date = new Date(movies[random].release_date);
  const year = date.getFullYear();

  const movie = movies[random];

  const markup = generateHeroMarkup(movie, year);
  // console.log(movie);
  // const trailer = await getTrailer(movie);
  // debugger;
  hero.insertAdjacentHTML("afterbegin", markup);
  // updateMarkup(markup);
};

const generateHeroMarkup = function (movie, year) {
  return `
        <a href="movie.html?${movie.id}">
        <div class="image-box">
          <img class="image-box__img--movie" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title} Backdrop" />
          <img class="image-box__img--poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" />
        </div>
        </a>
        <div class="info-box">
          <div class="button-box">
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
          <div class="info-box__title">
            <h1 class="hero-title heading-primary">${movie.title}</h1>
            <span class="hero-year heading-tertiary">${year}</span>
          </div>

          <div class="info-box__paragraph">
            <p class="hero-summary paragraph">${movie.overview}</p>
          </div>
        </div>
        `;
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

const init = async function () {
  const newMovies = await AJAX("popular");
  const topMovies = await AJAX("top_rated");

  loadHero(newMovies);
  loadNewMovies(newMovies);
  loadTopMovies(topMovies);
};

init();

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

const updateMarkup = function (markup) {
  const newMarkup = markup;

  const newDOM = document.createRange().createContextualFragment(newMarkup);
  // console.log(newDOM);
  const newElements = Array.from(newDOM.querySelectorAll("*"));
  // console.log(newElements);
  const curElements = Array.from(hero.querySelectorAll("*"));
  // console.log(curElements);

  newElements.forEach((newEl, i) => {
    const curEl = curElements[i];
    console.log(curEl, newEl.isEqualNode(curEl));

    // Updates changed TEXT
    if (
      !newEl.isEqualNode(curEl) &&
      newEl.firstChild?.nodeValue.trim() !== ""
    ) {
      console.log("💥", newEl.firstChild.nodeValue.trim());
      curEl.textContent = newEl.textContent;
    }

    // Updates changed ATTRIBUES
    if (!newEl.isEqualNode(curEl))
      Array.from(newEl.attributes).forEach((attr) =>
        curEl.setAttribute(attr.name, attr.value)
      );
  });
};
