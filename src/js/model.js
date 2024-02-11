import { API_URL, KEY } from "./config_temp.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const heroBackdrop = document.querySelector(".image-box__img--movie");
const heroPoster = document.querySelector(".image-box__img--poster");
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

const AJAX = async function () {
  try {
    const data = await fetch(
      `${API_URL}/movie/popular?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    // console.log(json);
    const movies = json.results;
    // console.log(movies);
    return movies;
  } catch (err) {}
};

const loadHero = function (movies) {
  const random = Math.floor(Math.random() * 20);
  const date = new Date(movies[random].release_date);
  const year = date.getFullYear();

  console.log(random);
  heroBackdrop.src = `https://image.tmdb.org/t/p/original${movies[random].backdrop_path}`;
  heroBackdrop.alt = `${movies[random].title} Backdrop`;
  heroPoster.src = `https://image.tmdb.org/t/p/w500${movies[random].poster_path}`;
  heroPoster.alt = `${movies[random].title} Poster`;

  heroTitle.textContent = movies[random].title;
  heroYear.textContent = year;
  heroSummary.textContent = movies[random].overview;
};

const loadNewMovies = function (movies) {
  for (let i = 5; i < 10; i++) {
    const poster = movies[i].poster_path;
    const title = movies[i].title;
    const rating = movies[i].vote_average;
    const id = movies[i].id;
    const markup = generateMarkup(rating, poster, title, id);
    newMovies.insertAdjacentHTML("afterbegin", markup);
    topMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const loadMovies = async function () {
  try {
    const movies = await AJAX();
    console.log(movies);
    loadHero(movies);

    loadNewMovies(movies);
  } catch (error) {
    console.log(err);
  }
};

loadMovies();

const generateMarkup = function (rating, poster, title, id) {
  return `
  <div class="card">
    <span class="card__rating">
    <svg class="card__rating-icon">
      <use href="/src/img/sprite.svg#icon-star-full"></use>
    </svg>${rating.toFixed(1)}</span>
    <div class="card__img-box">
      <a href="src/html/movie.html?id=${id}" class="card__link">
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

// carouselRight.addEventListener("click", loadNext);

function loadNext(e) {
  e.preventDefault();
  loadMov();
}

const loadMov = async function () {
  try {
    const movies = await AJAX();
    console.log(movies);
    // loadHero(movies);

    loadNewMovies(movies);
  } catch (error) {
    console.log(err);
  }
};
