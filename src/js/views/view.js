import icons from "url:../../img/icons.svg"; // Parcel 2

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> 
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
