class RandomizerView {
  _parentElement = document.querySelector(".filter");

  _formInputs = this._parentElement.querySelectorAll(".filter__input");

  addHandlerRandomize(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.classList.contains("btn--randomize")) return;
      const data = Array.from(this._formInputs).map((el) => el.value);
      const formData = { year: data[0], genreName: data[1] };

      handler(formData);
    });
  }

  addHandlerShowRandomizer() {
    window.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--random");
      if (
        (!btn || !btn.classList.contains("btn--random")) &&
        !this._parentElement.contains(e.target)
      ) {
        this._parentElement.closest(".filter").classList.add("u-hidden");
      } else {
        this._parentElement.closest(".filter").classList.remove("u-hidden");
      }
    });
  }

  setLocation(id) {
    window.location.href = `../../movie.html?id=${id}`;
  }
}

export default new RandomizerView();
