class SearchView {
  _parentElement = document.querySelector(".search");

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("input", (e) => {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._parentElement.querySelector(".search__input").value;
    this._clearList();
    return query;
  }

  _clearList() {
    this._parentElement.querySelector(".search__results").innerHTML = "";
  }

  render(movie) {
    const markup = this._generateMarkup(movie);
    this._parentElement
      .querySelector(".search__results")
      .insertAdjacentHTML("beforeend", markup);
  }

  renderSearchResults(results) {
    results.forEach((result) => {
      this.render(result);
    });
    // if new event happens then last api call is cancelled - TODO
    // Add error handling - TODO
    // Add render error - TODO
    // Render spinner while api call not resolved - TODO
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
