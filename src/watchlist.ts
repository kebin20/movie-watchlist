import {Movie, MoviesSearchQuery} from "./Interfaces"

const placeHolder = document.querySelector(".empty-watchlist") as HTMLDivElement
const populatedMovies = document.getElementById("populated-movies-watchlist") as HTMLDivElement
const localStorageItem = localStorage.getItem("addedMovies")

const moviesFromLocalStorage =
 localStorageItem ?  JSON.parse(localStorageItem) : [];

if (moviesFromLocalStorage.length === 0) {
  placeHolder.style.display = "block";
} else {
  renderWatchlist(moviesFromLocalStorage);
}

console.log(moviesFromLocalStorage)

function renderWatchlist() {
  const watchlistHtml = moviesFromLocalStorage.Search.map((watchlist : Movie[] , index: number) => {
    return `
          <div class="movie-container">
          <img src="${watchlist.Poster}" alt="Image of movie">
          <div class="info-row">
          <div class="row-1">
              <h3 class="movie-title">${watchlist.Title}</h3>
              <i class="star-icon">⭐</i> <span class="rating-value">${watchlist.imdbRating}</span>
          </div>
          <div class="row-2">
              <p class="movie-runtime">${watchlist.Runtime}</p>
              <p class="movie-genre">${watchlist.Genre}</p>
              <button id="remove-from-watchlist-btn" data-index-number="${index}"></button><p class="button-content">Remove</p>
          </div>
          <p class="movie-content">${watchlist.Plot}</p>
          </div>
      </div>
      `;
  });

  if (populatedMovies != null) {
    populatedMovies.innerHTML =
      watchlistHtml.join("");
  }
}

document.addEventListener("click", (event : Event) => {
  const targetElement = event.target as HTMLElement
  if (targetElement.dataset.indexNumber) {
    removeMovie(targetElement.dataset.indexNumber);
  }
});

function removeMovie(index: number) {
  moviesFromLocalStorage.splice(index, 1);
  if (moviesFromLocalStorage.length === 0) {
    placeHolder.style.display = "block";
    localStorage.clear();
    localStorage.setItem(
      "moviesFromLocalStorage",
      JSON.stringify(moviesFromLocalStorage)
    );
  }
  renderWatchlist();
}

