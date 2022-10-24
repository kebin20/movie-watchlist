const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const populatedMovies = document.getElementById("populated-movies");
const noResultScreen = document.getElementById("no-result");

let movie = {
  apiKey: "ccdb7259",
  fetchMovie: async function (movie) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${movie}`
      );
      const data = await response.json();
      console.log(data);
      return this.getMoviesHtml(data);
    } catch {
      noResultScreen.style.display = "block"
      // alert("No movie found.");
    }
  },

  getMoviesHtml: async function (data) {
    let moviesHtml = "";
    for (let movie of data.Search) {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=ccdb7259&i=${movie.imdbID}`
      );
      const data = await res.json();

      const { Poster, Title, imdbRating, Runtime, Genre, Plot } = data;
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
            <a href="#" id="add-to-watchlist-btn"><i class="fa-solid fa-circle-plus fa-lg"></i></a><p class="button-content">Watchlist</p>
        </div>
        <p class="movie-content">${Plot}</p>
        </div>
    </div>
  `;
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
  if (e.key == "Enter") {
    movie.search();
    document.querySelector(".explore").style.display = "none";
  }
});


 // return this.displayMovies(data)
  //THIS IS TO DISPLAY ONE MOVIE ONLY
//   displayMovies: function (data) {
//     const poster = data.Poster;
//     const title = data.Title;
//     const rating = data.imdbRating;
//     const runTime = data.Runtime;
//     const genre = data.Genre;
//     const plot = data.Plot;

//     populatedMovies.innerHTML = `
//         <img src="${poster}" alt="Image of movie">
//         <div class="info-row">
//         <div class="row-1">
//             <h3 class="movie-title">${title}</h3>
//             <i class="star-icon">⭐</i> <span class="rating-value">${rating}</span>
//         </div>
//         <div class="row-2">
//             <p class="movie-runtime">${runTime}</p>
//             <p class="movie-genre">${genre}</p>
//             <a href="#" id="add-to-watchlist-btn"><i class="fa-solid fa-circle-plus fa-lg"></i></a><p class="button-content">Add to Watchlist</p>
//         </div>
//         <p class="movie-content">${plot}</p>
//         </div>
//     `;
//   },