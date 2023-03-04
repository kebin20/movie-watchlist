export interface Movie {
    Title: string;
    imdbID: string;
    Poster: string;
    imdbRating: string;
    Runtime: string;
    Genre: string;
    Plot: string;
  }

  export interface MoviesSearchQuery {
    Search: Movie[];
    totalResults: string;
    Response: string;
  }
  

