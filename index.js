const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const populatedMovies = document.getElementById("populated-movies");

let movie = {
  apiKey: "ccdb7259",
  fetchMovies: async function (movie) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${this.apiKey}&t=${movie}`
      );
      const data = await response.json();
      console.log(data);
      return this.displayMovies(data);
    } catch {
      alert("No movie found.");
    }
  },

  displayMovies: function (data) {
    const poster = data.Poster;
    const title = data.Title;
    const rating = data.imdbRating;
    const runTime = data.Runtime;
    const genre = data.Genre;
    const plot = data.Plot;

    populatedMovies.innerHTML = `
        <img src="${poster}" alt="Image of movie">
        <div class="info-row">
        <div class="row-1">
            <h3 class="movie-title">${title}</h3>
            <i class="star-icon">⭐</i> <span class="rating-value">${rating}</span>
        </div>
        <div class="row-2">
            <p class="movie-runtime">${runTime}</p>
            <p class="movie-genre">${genre}</p>
            <button class="add-to-watchlist fa-solid fa-circle-plus fa-lg" type="submit"></button>
            <p class="button-content">Watchlist</p>
        </div>
        <p class="movie-content">${plot}</p>
        </div>
    `;
  },

  search: function () {
    this.fetchMovies(searchBox.value);
  },
};

searchButton.addEventListener("click", () => {
  movie.search();
  document.querySelector(".explore").style.display = "none";
});

searchBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    movie.search();
    document.querySelector(".explore").style.display = "none";
  }
});

fetch("http://www.omdbapi.com/?i=tt3896198&apikey=ccdb7259&t=fast&s=fast")
  .then((res) => res.json())
  .then((data) => console.log(data));
