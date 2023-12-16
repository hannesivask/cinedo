const state = {
  movies: {},
};

export const loadmovies = async function () {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "",
      },
    };

    console.log(options);
    const movies = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );

    const json = await movies.json();
    console.log(json);
  } catch (err) {
    console.error(err);
  }
};
