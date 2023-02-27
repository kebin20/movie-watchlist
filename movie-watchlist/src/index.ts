/* eslint-disable prefer-const */
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const populatedMovies = document.getElementById("populated-movies");
const noResultScreen = document.getElementById("no-result");

let addedMovies = [];
let movieArrayData = [];

const movie = {
  apiKey: "ccdb7259",
  fetchMovie: async function (movie) {
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

  getMoviesHtml: async function (data) {
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
  document.querySelector(".explore").style.display = "none";
});

searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    movie.search();
    document.querySelector(".explore").style.display = "none";
  }
});

// Adding to the watchlist function

document.addEventListener("click", (e) => {
  if (e.target.dataset.movie) {
    addMovies(e.target.dataset.movie);
    alert("Movie added to watchlist!");
  }
});

function addMovies(movieId) {
  const targetMovie = movieArrayData.filter((movie) => {
    // eslint-disable-next-line eqeqeq
    return movie.imdbID == movieId;
  })[0];
  addedMovies.push(targetMovie);
  localStorage.setItem("addedMovies", JSON.stringify(addedMovies));
}
