let moviesFromLocalStorage =
  JSON.parse(localStorage.getItem("addedMovies")) || [];
console.log(moviesFromLocalStorage); //check; its working!
// localStorage.clear();



if (moviesFromLocalStorage.length === 0) {
  document.querySelector(".empty-watchlist").style.display = "block";
}

function renderWatchlist(moviesFromLocalStorage) {
  const watchlistHtml = moviesFromLocalStorage.map((watchlist, index) => {
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

  if (document.getElementById("populated-movies-watchlist") != null) {
    document.getElementById("populated-movies-watchlist").innerHTML +=
      watchlistHtml.join("");
  }
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.indexNumber) {
    console.log(e.target.dataset.indexNumber);
    removeMovie(e.target.dataset.indexNumber);
  }
});

function removeMovie(index) {
  moviesFromLocalStorage.splice(index, 1);
  localStorage.setItem(
    " moviesFromLocalStorage",
    JSON.stringify(moviesFromLocalStorage)
  );
  // renderWatchlist(moviesFromLocalStorage);
}

renderWatchlist(moviesFromLocalStorage);

