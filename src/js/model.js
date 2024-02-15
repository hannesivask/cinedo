import { AJAX, randomNumber } from "./helpers.js";

const newMovies = document.querySelector(".new-movies");
const topMovies = document.querySelector(".top-movies");
const heroImageContainer = document.querySelector(".image-box");
const heroInfoContainer = document.querySelector(".info-box");

const heroImages = Array.from(heroImageContainer.children);
const heroInfo = Array.from(heroInfoContainer.children);
// console.log(heroImages);

const loadHeroContent = async function () {
  const movies = await AJAX("popular");
  const randomNum = randomNumber(20);
  const movie = movies[randomNum];

  loadHeroImages(movie);
  loadHeroTitle(movie);
};

loadHeroContent();

const loadHeroImages = function (movie) {
  heroImages.forEach((el) => {
    el.className === "image-box__img--movie"
      ? (el.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`)
      : (el.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
  });
};

const loadHeroTitle = function (movie) {
  // console.log(heroInfo);

  const date = new Date(movie.release_date);
  const year = date.getFullYear();

  heroInfo.forEach((el) => {
    if (el.className === "info-box__title") {
      const heroTitles = Array.from(el.children);
      heroTitles.forEach((titleEL) => {
        titleEL.classList.contains("hero-title")
          ? (titleEL.textContent = movie.title)
          : (titleEL.textContent = year);

        console.log();
      });
    }

    if (el.className === "info-box__paragraph") {
      console.log(el);
    }
  });
};

// const loadHeroTitle =

// console.log(heroInfo);

// const arr = Array.from(sectionHero);
// console.log(arr);

const heroBackdropImg = document.querySelector(".image-box__img--movie");
const heroPosterImg = document.querySelector(".image-box__img--poster");
const heroTitle = document.querySelector(".hero-title");
const heroYear = document.querySelector(".hero-year");
const heroSummary = document.querySelector(".hero-summary");

const carouselRight = document.querySelector(".carousel__right");

// const fetchNowPlaying = function () {
//   try {
//     const heroMovie = AJAX("popular");
//     return heroMovie;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const displayHeroMovie = function () {
//  const loadHeroMovie()
// }

// const setHero = async function () {
//   const newMovies = await AJAX("popular");
//   loadHero(newMovies);
// };

// const loadHero = async function (movies) {
//   const random = randomNumber(20);
//   console.log(random);
//   const date = new Date(movies[random].release_date);
//   const year = date.getFullYear();

//   const movie = movies[random];

//   heroBackdropImg.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
//   heroPosterImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//   heroTitle.textContent = `${movie.title}`;
//   heroYear.textContent = `${year}`;
//   heroSummary.textContent = `${movie.overview}`;
// };

// const loadNewMovies = function (movies) {
//   for (let i = 5; i < 10; i++) {
//     const poster = movies[i].poster_path;
//     const title = movies[i].title;
//     const rating = movies[i].vote_average;
//     const id = movies[i].id;
//     const markup = generateMarkup(rating, poster, title, id);
//     newMovies.insertAdjacentHTML("afterbegin", markup);
//   }
// };

// const loadTopMovies = function (movies) {
//   for (let i = 5; i < 10; i++) {
//     const poster = movies[i].poster_path;
//     const title = movies[i].title;
//     const rating = movies[i].vote_average;
//     const id = movies[i].id;
//     const markup = generateMarkup(rating, poster, title, id);
//     topMovies.insertAdjacentHTML("afterbegin", markup);
//   }
// };

// const generateMarkup = function (rating, poster, title, id) {
//   return `
//   <div class="card">
//     <span class="card__rating">
//     <svg class="card__rating-icon">
//       <use href="/src/img/sprite.svg#icon-star-full"></use>
//     </svg>${rating.toFixed(1)}</span>
//     <div class="card__img-box">
//       <a href="movie.html?id=${id}" class="card__link">
//         <img
//           src="https://image.tmdb.org/t/p/w500${poster}"
//           alt="Poster image"
//           class="card__img"
//         />
//       </a>
//     </div>
//     <span class="card__title">${title}</span>
//     <button class="btn btn--filled card__btn">&plus; watchlist</button>
//   </div>`;
// };

// const init = async function () {
//   const topMovies = await AJAX("");

//   loadHero(newMovies);
//   loadNewMovies(newMovies);
//   loadTopMovies(topMovies);
//   setInterval(setHero, 5000);
// };

// init();
