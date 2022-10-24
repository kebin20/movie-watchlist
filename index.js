const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const populatedMovies = document.getElementById("populated-movies");
const populatedWatchlist = document.getElementById(
  "populated-movies-watchlist"
);
const noResultScreen = document.getElementById("no-result");

let addedMovies = [];
let movieArrayData = [];

let movie = {
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
            <button id="add-to-watchlist-btn" data-movie="${imdbID}">ADD</button><p class="button-content">Watchlist</p>
        </div>
        <p class="movie-content">${Plot}</p>
        </div>
    </div>
  `;
      movieArrayData.push(data);
      console.log(movieArrayData); //check; its working!
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

//Adding to the watchlist function

// TESTING LOCALSTORAGE
// localStorage.setItem("addedMovies", JSON.stringify(addedMovies));
// let moviesFromLocalStorage = JSON.parse(localStorage.getItem("addedMovies"));
// console.log(moviesFromLocalStorage);

document.addEventListener("click", (e) => {
  if (e.target.dataset.movie) {
    console.log(e.target.dataset.movie); //check; its working!
    addMovies(e.target.dataset.movie);
  } else if (e.target.dataset.indexNumber) {
    removeMovie(e.target.dataset.indexNumber);
  }
});

function addMovies(movieId) {
  const targetMovie = movieArrayData.filter((movie) => {
    return movie.imdbID == movieId;
  })[0];
  addedMovies.push(targetMovie);
  console.log(addedMovies); //check; its working!
  //Problem? Can't stringify an object.... check how to use localsStorage properly since this flow might work without localStorage
  // localStorage.setItem("addedMovies", JSON.stringify(addedMovies)); //check; not working :(
  // let moviesFromLocalStorage = JSON.parse(localStorage.getItem("addedMovies"));
  // renderWatchlist(moviesFromLocalStorage);
}

function removeMovie(index) {
  addedMovies.splice(index, 1);
  renderWatchlist();
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
            <a href="#" id="remove-from-watchlist-btn" data-index-number="${index}"><i class="fa-solid fa-circle-plus fa-lg"></i></a><p class="button-content">REMOVE PLS</p>
        </div>
        <p class="movie-content">${watchlist.Plot}</p>
        </div>
    </div>
    `;
  });
  document.getElementById("populated-movies-watchlist").innerHTML =
    watchlistHtml;
}

// /* <i class="fa-solid fa-circle-plus fa-lg"></i> */

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
