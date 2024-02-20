import { randomNumber, getYear, getMovies, searchMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const sectionHero = document.querySelector(".section-hero");

const loadHeroContent = function (movies) {
  const randomNum = randomNumber(movies.length);
  const movie = movies[randomNum];
  movie.year = getYear(movie.release_date);

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

const cycleHeroContent = function (movies) {
  const randomNum = randomNumber(movies.length);
  const movie = movies[randomNum];
  movie.year = getYear(movie.release_date);

  const markup = heroView.generateMarkup(movie);

  sectionHero.classList.toggle("u-opacity-none");
  setTimeout(() => {
    sectionHero.innerHTML = markup;
    setTimeout(() => {
      sectionHero.classList.toggle("u-opacity-none");
    }, 100);
  }, 500);
};

const fetchMovies = async function (type) {
  const newMovies = await getMovies(type);
  const movieMap = newMovies.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview,
      vote_average: movie.vote_average,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
    };
  });
  return movieMap;
};

const init = async function () {
  const newMovies = await fetchMovies("popular");
  const topMovies = await fetchMovies("top_rated");

  loadHeroContent(newMovies);
  loadNewMovies(newMovies);
  loadTopMovies(topMovies);
  setInterval(() => {
    cycleHeroContent(newMovies);
  }, 6000);

  searchView.addHandlerSearch();
};

init();
