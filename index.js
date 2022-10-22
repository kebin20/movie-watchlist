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
        <div class="row-1">
            <h3 class="movie-title">${title}</h3>
            <i class="star-icon">Star</i> <span class="rating-value">${rating}</span>
        </div>
        <div class="row-2">
            <h4 class="movie-runtime">${runTime}</h4>
            <h4 class="movie-genre">${genre}</h4>
            <button class="add-to-watchlist" type="submit">+</button>
            <p class="button-content">Add to watchlist</p>
        </div>
        <p class="movie-content">${plot}</p>
    `;
  },

  search: function () {
    this.fetchMovies(searchBox.value);
  },
};

searchButton.addEventListener("click", () => {
  movie.search();
});

searchBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    movie.search();
  }
});

fetch("http://www.omdbapi.com/?i=tt3896198&apikey=ccdb7259&t=fast&s=fast")
  .then((res) => res.json())
  .then((data) => console.log(data));
