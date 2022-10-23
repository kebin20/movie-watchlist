# movie-watchlist
You can search your favourite movies and add them to your personal watchlist. Movie data is provided by the OMDb API and the data stored will be in localStorage

This app is a very good practice of displaying relevant info onto the HTML webpage using an API and the async/await function, coupled with try and catch. 

Challenges:

- Struggled with displaying multiple movies after clicking search for the specified movie. Was able to display just one only before. However, I realised that I needed to somehow loop over the multiple imdbIDs into the fetch function to obtain the specific data needed for each of the movies.  

Interesting thing to note is that you can't use a forEach or map for async. 

Next steps: 
 
 - To enable users to store the selected movie into their personal watchlist using localStorage. The CSS and HTML setup will need to be done for the watchlist.html along with populating the js code. 