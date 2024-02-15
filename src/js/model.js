import { AJAX, randomNumber } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const sectionHero = document.querySelector(".section-hero");

const loadHeroContent = function (movies) {
  const randomNum = randomNumber(movies.length);
  const movie = movies[randomNum];
  const date = new Date(movie.release_date);
  const year = date.getFullYear();
  movie.year = year;

  const markup = heroView.generateMarkup(movie);
  sectionHero.innerHTML = markup;
};

const loadNewMovies = function (movies) {
  for (let i = 0; i < movies.length; i++) {
    const markup = cardView.generateMarkup(movies[i]);
    newMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const loadTopMovies = function (movies) {
  for (let i = 0; i < movies.length; i++) {
    const markup = cardView.generateMarkup(movies[i]);
    topMovies.insertAdjacentHTML("afterbegin", markup);
  }
};

const cycleHeroContent = async function (movies) {
  const randomNum = randomNumber(movies.length);
  const movie = movies[randomNum];
  const date = new Date(movie.release_date);
  const year = date.getFullYear();
  movie.year = year;

  const markup = heroView.generateMarkup(movie);

  sectionHero.classList.toggle("u-opacity-none");
  setTimeout(() => {
    sectionHero.innerHTML = markup;
    setTimeout(() => {
      sectionHero.classList.toggle("u-opacity-none");
    }, 100);
  }, 500);
};

const init = async function () {
  const newMovies = await AJAX("popular");
  const topMovies = await AJAX("top_rated");
  loadHeroContent(newMovies);
  loadNewMovies(newMovies);
  loadTopMovies(topMovies);
  setInterval(() => {
    cycleHeroContent(newMovies);
  }, 6000);
};

init();
