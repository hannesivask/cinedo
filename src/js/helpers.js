export const randomNumber = function (range) {
  return Math.floor(Math.random() * range);
};

export const getYear = function (movieDate) {
  const fullDate = new Date(movieDate);
  return fullDate.getFullYear();
};

export const AJAX = async function (url) {
  try {
    const fetchPro = await fetch(`/.netlify/functions/AJAX?query=${url}`);

    // Need to add a timeout function for API calls TODO

    // const res = await Promise.race([fetch, timeout(10)])
    const data = await fetchPro.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
