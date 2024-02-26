import * as model from "../model";

// This needs refactoring TODO
class RandomizerView {
  _parentElement = document.querySelector(".filter");

  _openRandomizerButtonEl = document.querySelector(".btn--random");
  _randomizerButtonEl = document.querySelector(".btn--randomize");
  _randomizerFormInputsEl = document.querySelectorAll(".filter__input");

  randomize() {
    this._randomizerButtonEl.addEventListener("click", async (e) => {
      e.preventDefault();
      const data = Array.from(formInputs).map((el) => el.value);

      const formData = { year: data[0], genreName: data[1] };

      await model.loadMovieGenreID(formData);

      await model.loadRandomMovie(formData);
      window.location.href = `../../movie.html?id=${model.state.movie.id}`;
    });
  }

  _generateError() {
    return `<span class="bookmarks__empty">No Bookmarks found</span>`;
  }

  // REMOVE THE u-hidden CLASS from the button to use it TODO
  _generateMarkup(movie) {
    return ``;
  }
}

export default new RandomizerView();
