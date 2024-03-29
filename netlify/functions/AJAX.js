require("dotenv").config();

const process = require("process");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

exports.handler = async function (event, context) {
  try {
    const query = event.queryStringParameters.query;
    const response = await fetch(
      `${process.env.TMDB_API_LINK}${query}`,
      options
    );

    const resultJSON = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(resultJSON),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch. ${err}`,
      }),
    };
  }
};
