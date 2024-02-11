import { API_URL, KEY } from "./config_temp.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const heroBackdrop = document.querySelector(".image-box__img--movie");
const heroPoster = document.querySelector(".image-box__img--poster");
const heroTitle = document.querySelector(".hero-title");
const heroYear = document.querySelector(".hero-year");
const heroSummary = document.querySelector(".hero-summary");

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
      `${API_URL}/movie/popular?language=en-US&page=1`,
      options
    );
    const json = await data.json();
    console.log(json);

    const date = new Date(json.results[2].release_date);
    const year = date.getFullYear();

    const random = Math.floor(Math.random() * 20);

    console.log(random);
    heroBackdrop.src = `https://image.tmdb.org/t/p/original${json.results[random].backdrop_path}`;
    heroPoster.src = `https://image.tmdb.org/t/p/w500${json.results[random].poster_path}`;

    heroTitle.textContent = json.results[random].title;
    heroYear.textContent = year;
    heroSummary.textContent = json.results[random].overview;

    for (let i = 5; i < 10; i++) {
      const poster = json.results[i].poster_path;
      const title = json.results[i].title;
      const rating = json.results[i].vote_average;
      const id = json.results[i].id;
      const markup = generateMarkup(rating, poster, title, id);
      newMovies.insertAdjacentHTML("afterbegin", markup);
      topMovies.insertAdjacentHTML("afterbegin", markup);
    }
  } catch (err) {
    console.log(err);
  }
};

getMovie();

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
