import scrollerView from "./scrollerView.js";

class ResultsView {
  _parentElement = document.querySelector(".results__grid");

  addHandlerRender(handler) {
    window.addEventListener("load", () => {
      const searchParams = new URLSearchParams(window.location.search);
      const searchQuery = searchParams.get("search");
      handler(searchQuery);
    });
  }

  addHandlerAddBookmarks(handler) {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("card__btn")) return;
      const id = e.target.dataset.id;
      handler(id, e.target);
    });
  }

  renderGrid(movie, bookmarked = false) {
    const markup = scrollerView._generateMarkup(movie, bookmarked);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
}

export default new ResultsView();
