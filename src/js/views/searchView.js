import { getYear } from "../helpers.js";
import * as model from "../model.js";

class SearchView {
  _parentElement = document.querySelector(".search__results");

  _input = document.querySelector(".search__input");

  // This needs refactoring and sorting to model or controller files TODO

  addHandlerSearch() {
    this._input.addEventListener("input", async () => {
      if (!this._input.value || this._input.value === " ")
        this._parentElement.innerHTML = "";
      this._parentElement.innerHTML = "";

      // every input triggers new api call - DONE
      await model.loadSearchResults(this._input.value);

      model.state.search.forEach((movie) => {
        const markup = this._generateMarkup(movie);

        // after api data has been collected then generate markup with results - DONE
        this._parentElement.insertAdjacentHTML("beforeend", markup);
      });

      // if new event happens then last api call is cancelled - TODO

      // Add error handling - TODO

      // Add render error - TODO

      // Render spinner while api call not resolved - TODO
    });
  }

  _generateMarkup(movie) {
    return `
    <li class="search__result">
      <a href="movie.html?id=${movie.id}" class="search__link">
        <span class="title">${movie.title}</span>
        <span class="year">${movie.year}</span>
      </a>
    </li>
    `;
  }
}

export default new SearchView();
