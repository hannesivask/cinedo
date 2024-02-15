import { API_URL, KEY } from "./config_temp.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: KEY,
  },
};

export const AJAX = async function (type) {
  try {
    const response = await fetch(
      `${API_URL}/movie/${type}?language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.results;
  } catch (err) {}
};

export const randomNumber = function (range) {
  return Math.floor(Math.random() * range);
};
