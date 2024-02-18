import { randomNumber, getYear, getMovies, searchMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";

const sectionHero = document.querySelector(".section-hero");

const loadHeroContent = function (movie) {
  movie.year = getYear(movie.release_date);
  const markup = heroView.generateMarkup(movie);
  sectionHero.innerHTML = markup;
};

// const loadNewMovies = function (movies) {
//   for (let i = 0; i < movies.length; i++) {
//     const markup = cardView.generateMarkup(movies[i]);
//     newMovies.insertAdjacentHTML("afterbegin", markup);
//   }
// };

const init = async function () {
  const searchParams = new URLSearchParams(window.location.search);
  const movieID = searchParams.get("id");
  const movie = await getMovies(movieID);
  console.log(movie);

  loadHeroContent(movie);
  searchView.addHandlerSearch();
};

init();
