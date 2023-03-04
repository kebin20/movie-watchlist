## movie-watchlist
You can search your favourite movies and add them to your personal watchlist. Movie data is provided by the OMDb API and the data stored will be in localStorage

This app is a very good practice of displaying relevant info onto the HTML webpage using an API and the async/await function, coupled with try and catch. 

# Challenges:

- Struggled with displaying multiple movies after clicking search for the specified movie. Was able to display just one only before. However, I realised that I needed to somehow loop over the multiple imdbIDs into the fetch function to obtain the specific data needed for each of the movies.  

Interesting thing to note is that you can't use a forEach or map for async. 

- 24/10 New challenge faced: Difficulty in accessing the data/value solved by a promise otuside the scope. This data is needed so that I can push the selected movie into a global array after clicking the watchlist button. Will need to figure out how to solve this. 
SOLVED: Set a global variable and pushed the data array into it from getMoviesHtml function in the movie object.


# Continued Development:  
 
 ~- To enable users to store the selected movie into their personal watchlist using localStorage. The CSS and HTML setup will need to be done for the watchlist.html along with populating the js code.~ 

 ~- Make the remove button work in order to remove the movie items from the DOM and from the Array.~

 - Make it so that when you press the add button, a tick + added element will appear(IN PROGRESS)

 - Make a light/dark mode toggle (IN PROGRESS)
 
 Future Implementation:

 ~- Implemented Typescript~
 
 - Recreate this using React and specifically only for games
