export const randomNumber = function (range) {
  return Math.floor(Math.random() * range);
};

export const getMovies = async function (type) {
  try {
    const result = await fetch(`/.netlify/functions/AJAX?parameter=${type}`);
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
