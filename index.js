let movie = {
  apiKey: "",
  fetchMovies: async function (movie) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${movie}apikey=${this.apiKey}&`
      );
      const data = await response.json();
      return this.displayMovies(data);
    } catch {
      alert("No movie found.");
    }
  },

  displayMovies: function (data) {},
};
