import {Movie, MoviesSearchQuery} from "./Interfaces"

const searchBox  = document.getElementById("search-box") as HTMLInputElement;
const searchButton = document.getElementById("search-button") as HTMLButtonElement;
const populatedMovies  = document.getElementById("populated-movies") as HTMLDivElement;
const noResultScreen  = document.getElementById("no-result") as HTMLParagraphElement;
const placeHolder = document.querySelector(".explore") as HTMLDivElement;

let addedMovies : Movie[] = [];
let movieArrayData : Movie[] = [];

const movie = {
  apiKey: "ccdb7259",
  fetchMovie: async function (movie: string) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${movie}`
      );
      const data = await response.json();
      return this.getMoviesHtml(data);
    } catch {
      noResultScreen.style.display = "block";
    }
  },

  getMoviesHtml: async function (data : MoviesSearchQuery) {
    console.log(data)
    let moviesHtml = "";
    for (let movie of data.Search) {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=ccdb7259&i=${movie.imdbID}`
      );
      const data = await res.json();
      const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = data;
      moviesHtml += `
      <div class="movie-container">
        <img src="${Poster}" alt="Image of movie">
        <div class="info-row">
        <div class="row-1">
            <h3 class="movie-title">${Title}</h3>
            <i class="star-icon">⭐</i> <span class="rating-value">${imdbRating}</span>
        </div>
        <div class="row-2">
            <p class="movie-runtime">${Runtime}</p>
            <p class="movie-genre">${Genre}</p>
            <button id="add-to-watchlist-btn" data-movie="${imdbID}"></button><p class="button-content">Watchlist</p>
        </div>
        <p class="movie-content">${Plot}</p>
        </div>
    </div>
  `;
      movieArrayData.push(data);
    }
    populatedMovies.innerHTML = moviesHtml;
  },

  search: function () {
    this.fetchMovie(searchBox.value);
  },
};

searchButton.addEventListener("click", () => {
  movie.search();
  placeHolder.style.display = "none";
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    movie.search();
    placeHolder.style.display = "none";
  }
});

// Adding to the watchlist function

document.addEventListener("click", (event : Event) => {
  const targetElement = event.target as HTMLElement
  if (targetElement?.dataset?.movie) {
    addMovies(targetElement.dataset.movie);
    alert("Movie added to watchlist!");
  }
});

function addMovies(movieId : string) {
  const targetMovie = movieArrayData.filter((movie) => {
    // eslint-disable-next-line eqeqeq
    return movie.imdbID == movieId;
  })[0];
  addedMovies.push(targetMovie);
  localStorage.setItem("addedMovies", JSON.stringify(addedMovies));
}
