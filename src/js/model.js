import { API_URL, KEY } from "./config_temp.js";

const grid = document.querySelector(".grid");
const heroBackdrop = document.querySelector(".hero__image--movie");
const heroPoster = document.querySelector(".hero__image--poster");
const heroTitle = document.querySelector(".title");
const heroYear = document.querySelector(".year");
const heroSummary = document.querySelector(".summary");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: KEY,
  },
};

const getMovie = async function () {
  try {
    const data = await fetch(
      `${API_URL}/movie/top_rated?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    console.log(json);
    heroBackdrop.src = `https://image.tmdb.org/t/p/original${json.results[2].backdrop_path}`;
    heroPoster.src = `https://image.tmdb.org/t/p/w500${json.results[2].poster_path}`;

    const date = new Date(json.results[2].release_date);
    const year = date.getFullYear();
    heroTitle.textContent = json.results[2].original_title;
    heroYear.textContent = year;
    heroSummary.textContent = json.results[2].overview;

    for (let i = 0; i < 5; i++) {
      const poster = json.results[i].poster_path;
      const title = json.results[i].original_title;
      const rating = json.results[i].vote_average;
      const markup = generateMarkup(rating, poster, title);
      grid.insertAdjacentHTML("afterbegin", markup);
    }
  } catch (err) {
    console.log(err);
  }
};

getMovie();

const generateMarkup = function (rating, poster, title) {
  return `
  <div class="card">
    <span class="card__rating">
    <svg class="card__rating-icon">
      <use href="/src/img/sprite.svg#icon-star-full"></use>
    </svg>${rating.toFixed(2)}</span>
    <div class="card__img-box">
      <img  
        src="https://image.tmdb.org/t/p/w500${poster}"
        alt="Poster image"
        class="card__img"
      />  
    </div>
    <span class="card__title">${title}</span>
    <button class="btn btn--filled card__btn">&plus; watchlist</button>
  </div>`;
};
