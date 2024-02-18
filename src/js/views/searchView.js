import { randomNumber, getYear, getMovies, searchMovies } from "../helpers.js";

class SearchView {
  _parentElement = document.querySelector(".search__results");

  _input = document.querySelector(".search__input");

  addHandlerSearch() {
    this._input.addEventListener("input", async () => {
      if (!this._input.value || this._input.value === " ")
        this._parentElement.innerHTML = "";
      this._parentElement.innerHTML = "";

      // every input triggers new api call - DONE
      const searchResults = await searchMovies(this._input.value);
      // console.log(searchResults);

      searchResults.results.forEach((movie) => {
        movie.year = getYear(movie.release_date);

        const markup = this.generateMarkup(movie);

        // after api data has been collected then generate markup with results - DONE
        this._parentElement.insertAdjacentHTML("beforeend", markup);
      });

      // if new event happens then last api call is cancelled - TODO

      // Add error handling - TODO

      // Add render error - TODO

      // Render spinner while api call not resolved - TODO
    });
  }

  generateMarkup(movie) {
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
