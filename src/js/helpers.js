export const randomNumber = function (range) {
  return Math.floor(Math.random() * range);
};

export const getYear = function (movieDate) {
  const fullDate = new Date(movieDate);
  return fullDate.getFullYear();
};

export const getMovies = async function (type) {
  try {
    const query = `/movie/${type}?language=en-US&page=1`;
    const result = await fetch(`/.netlify/functions/AJAX?query=${query}`);
    const resultJSON = await result.json();
    return resultJSON;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch. ${err}`,
      }),
    };
  }
};

export const searchMovies = async function (searchInput) {
  try {
    const query = `/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`;

    const result = await fetch(`/.netlify/functions/AJAX?query=${query}`);
    const resultJSON = await result.json();
    return resultJSON;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch. ${err}`,
      }),
    };
  }
};
