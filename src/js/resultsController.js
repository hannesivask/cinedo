import { randomNumber, getYear, getMovies, searchMovies } from "./helpers.js";
import heroView from "./views/heroView.js";
import cardView from "./views/cardView.js";
import searchView from "./views/searchView.js";

// const loadNewMovies = function (movies) {
//   for (let i = 0; i < movies.length; i++) {
//     const markup = cardView.generateMarkup(movies[i]);
//     newMovies.insertAdjacentHTML("afterbegin", markup);
//   }
// };

const init = async function () {
  searchView.addHandlerSearch();
};

init();
