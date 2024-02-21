import * as model from "../model.js";

import cardView from "./cardView.js";

class ResultsView {
  _parentElement = document.querySelector(".results__grid");

  async loadGridMovies() {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("search");

    await model.loadSearchResults(searchQuery);

    model.state.search.forEach((movie) => {
      if (!movie.poster_path) return;
      const markup = cardView._generateMarkup(movie);
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    });
  }
}

export default new ResultsView();