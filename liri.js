// This is included to read and set any environment variables with the dotenv package
var dotenv = require("dotenv").config();

// Passes Twitter and Spotify keys into call to their API.
var keys = require('./keys/ keys.js');

// Node modules
// Requesting twitter package
var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

// Load the fs package to read and write
var fs = require('fs');

// READ COMMAND LINE ARGUMENTS
var arg = process.argv;

// This app will take two arguments.
// The first will be the action 
// (i.e. `my-tweets`, `spotify-this-song`,`movie-this`,`do-what-it-says`)
// The second will be the song or movie title, etc.
var action = "";
var searchFor = "";
// check if we have 3 arg in argv array
if (arg.length > 2) {
    action = process.argv[2];
    if (arg.length > 4) {
        for (var i = 3; i < arg.length; i++) {
            searchFor += arg[i] + ' ';
        }
    } else {
        searchFor = process.argv[3];
    }
} else {
    action = process.argv[2];
}





// Create a switch-case statement 
// Cases will be the first argument the user is giving
switch (action) {
    case "my-tweets":
        getTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        random();
        break;
}



// TWITTER 

// This function will  be used to get back latest 20 tweets with a request from command line
function getTweets() {
    var twitterClient = new Twitter(keys.twitter);
    var params = {
        screen_name: 'ornelahunda',
        count: 20
    };
    twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('log.txt', (' ================ LOG ENTRY START ================\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function (err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Your latest Tweets:');
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('log.txt', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function (err) {
                    if (err) throw err;
                });
            }
            fs.appendFile('log.txt', ('================ LOG ENTRY END ================\r\n \r\n'), function (err) {
                if (err) throw err;
            });
        }
    });
}

// spotify calling function


function spotifySong() {

    var spotify = new Spotify(keys.spotify);

    // Default search value if no song is given
    if (searchFor === undefined) {
        searchFor = "The Sign Ace of Base";
        //    console.log(searchFor); 
    }
    var url = 'https://api.spotify.com/v1/search?q=' + searchFor + '&type=track';
    spotify
        .request(url)
        .then(function (data) {
            // console.log(data); 
            console.log(' ');
            var artist = data.tracks.items[0].artists[0].name;
            console.log('Artist:' + artist);
            var song = data.tracks.items[0].name;
            console.log('Song title: ' + song);
            var preview = data.tracks.items[0].preview_url;
            console.log('Preview Link: ' + preview);
            var album = data.tracks.items[0].album.name;
            console.log('Album: ' + album);
            console.log(' ');

            fs.appendFile('log.txt', ('=============== LOG ENTRY START ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv +
                '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + artist + '\r\nSong: ' + song + '\r\nPreview Link: ' + preview + '\r\nAlbum: ' + album +
                '\r\n=============== LOG ENTRY END ===============\r\n \r\n'), function (err) {
                if (err) throw err;
            });

        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });


}



// Uses fs node package to take the text inside random.txt,
// and return a response from spotify.
function random() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var commandsArr = data.split(',');
            if (commandsArr[0] === 'spotify-this-song') {
                spotifySong(commandsArr[1]);
            } 
        } 
    });
}
// Function movie, is going to be used to give user information about the movie they want to search
// This function should give back:
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// '&tomatoes=true&r=json' 
function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + searchFor + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.Ratings[1].Value);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);


            fs.appendFile('log.txt', ('=============== LOG ENTRY START ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.Ratings[1].Value + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function (err) {
                if (err) throw err;
            });
        }
    });
}