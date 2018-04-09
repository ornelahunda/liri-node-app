
// This is included to read and set any environment variables with the dotenv package
require("dotenv").config();

// Importing keys.js file and storing it in a variable.
var keys = require("./keys.js");

// Accessing keys information.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Load the fs package to read and write
var fs = require("fs");
// Take two arguments.
// The first will be the action 
// (i.e. `my-tweets`, `spotify-this-song`,`movie-this`,`do-what-it-says`)
// The second will be the song or movie title, etc.
var action = process.argv[2];
var value = process.argv[3];

// Create a switch-case statement 
// Cases will be the first argument the user is giving
switch (action) {
    case "my-tweets":
      total();
      break;
    
    case "spotify-this-song":
      deposit();
      break;
    
    case "movie-this":
      withdraw();
      break;
    
    case "do-what-it-says":
      lotto();
      break;
    }






// var Twitter = require('twitter');

// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });