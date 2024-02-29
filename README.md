# Cinedo

Movie database web application using the TMDb API.

https://cinedo.netlify.app/

![Sample App Image](./src/img/screenshot.png)

## Dependencies

- Netlify-cli

## Dev Dependencies

- Parcel
- Sass
- Dotenv
- Netlify-lambda
- Concurrently

## Usage

Clone it!

```
git clone https://github.com/hannesivask/cinedo.git
```

Create a .env file for the API key:

```
TMDB_API_KEY=yourApiKey
TMDB_API_LINK=https://api.themoviedb.org/3
```

Install npm dependencies

```
npm i
```

Run npm script:

```
npm run dev
```

## TO-DO

- Add more info to the movie page
- Add more options other than "popular" or "top-rated" to the home page
- Add "popular" page where all popular tv-shows, actors and movies are avaible
- Add other pages like last point
- Add movies page content and styling for separate movie pages
- Add spinners for loading content
- Add error handling and error messages
- Refine styiling and design
- If selected search item is not a movie, then change API call for movie.html

## DONE

- Add search functionality
- Add bookmarks/watchlist functionality with local storage
- Add randomizer button functionality
- Add responsive design
- Add trailer watching ability to hero section

## Contributors

@hannesivask
