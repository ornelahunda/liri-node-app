# liri-node-app

#LIRI - Language Interpretation and Recognition Interface
LIRI is like SIRI, but you run it  through command line node app, which  takes in arguments and outputs data.

* Use LIRI to get your latest tweets, find out about a song, or a movie, or just choose a random action from your own random file.

# Node Packages used:
1.Twitter
npm install twitter
2.Spotify
npm install spotify
3.Request
npm install request
4.FS
npm install fs

#What Each Command Should Do

* node liri.js my-tweets 

This will show your last 20 tweets and when they were created at, in your terminal/bash window.
And also all your entries will log in a text file, log.txt.

* node liri.js spotify-this-song <song title here> 

This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
if no song is provided then your program will default to
"The Sign" by Ace of Base

node liri.js movie-this <movie title here>

This will output the following information to your terminal/bash window:
Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.

* node liri.js do-what-it-says

This uses the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


