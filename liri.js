// This is included to read and set any environment variables with the dotenv package
var dotenv = require("dotenv").config();
// console.log(dotenv);

// Load the user keys
var keys = require('./keys/ keys.js');
// console.log(keys);

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
// check if we min 3 arg in argv array
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

        // case "spotify-this-song":
        //     spotifySong();
        //     break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        random();
        break;
}



// TWITTER 
// Passes Twitter keys into call to Twitter API.



// This function will  be used to get back latest 20 tweets with a request from command line
function getTweets() {
    var twitterClient = new Twitter(keys.twitter);
    var params = {
        screen_name: 'ornelahunda',
        count: 20
    };
    twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('log.txt', ('=============== Tweets Entry Start ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function (err) {
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
            fs.appendFile('log.txt', ('=============== LOG ENTRY END ===============\r\n \r\n'), function (err) {
                if (err) throw err;
            });
        }
    });
}


// function spotifySong() {

//     var spotify = new Spotify(keys.spotify);

//     var song;
//     if (song === '') {
//         search = 'The Sign Ace Of Base';
//     } else {
//         search = song;
//     }

// }
// // Append the command to the log file
// fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song ' + song + '\n\n', function (err) {
//     if (err) throw err;
// });

// If no song is provided, LIRI defaults to 'The Sign' by Ace Of Base


// spotify
//     .request('https://api.spotify.com/v1/search?q=' + searchFor + '&type=track')
//     .catch(function (err) {
//         console.error('Error occurred: ' + err);
//     });
//     .then(function (data) {
//         if (!error && response.statusCode == 200) {
//             jsonBody = JSON.parse(body);
//             console.log(data);
//         }
//     });

// }

//         spotify
//         .request('https://api.spotify.com/v1/search?q=' + searchFor + '&type=track', function(error, response, body) {
//                     if (!error && response.statusCode == 200) {
//                         jsonBody = JSON.parse(body);
//           console.log(data); 
//                     } .catch(function(err) {
//           console.error('Error occurred: ' + err); 
//         });
// }
//     }
//     // Default search value if no song is given
//     if (searchFor == "") {
//         searchFor = "The Sign Ace of Base";
//     } else{
//         request('https://api.spotify.com/v1/search?q=' + searchFor + '&type=track', function (error, response, body) {
//             .then(function () {

//                     if (!error && response.statusCode == 200) {
//                         jsonBody = JSON.parse(body);
//                         console.log(' ');
//                         console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
//                         console.log('Song: ' + jsonBody.tracks.items[0].name);
//                         console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
//                         console.log('Album: ' + jsonBody.tracks.items[0].album.name);
//                         console.log(' ');
//                         fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv +
//                             '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + jsonBody.tracks.items[0].artists[0].name +
//                             '\r\nSong: ' + jsonBody.tracks.items[0].name + '\r\nPreview Link: ' + jsonBody.tracks.items[0].preview_url + '\r\nAlbum: ' + jsonBody.tracks.items[0].album.name + '\r\n=============== LOG ENTRY END ===============\r\n \r\n'), function (err) {
//                             if (err) throw err;
//                         });
//                     })
//             }
//         });

// }
// }}



// Uses fs node package to take the text inside random.txt,
// and do something with it.
function random() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            logOutput.error(err);
        } else {

            // Creates array with data.
            var randomArray = data.split(",");

            // Sets action to first item in array.
            action = randomArray[0];

            // Sets optional third argument to second item in array.
            argument = randomArray[1];

            // Calls main controller to do something based on action and argument.
            doSomething(action, argument);
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

function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + searchFor + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log("Release Year: " + JSON.parse(body).Year);
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);


            console.log('Rotten Tomatoes URL: ' + jsonBody.tomatoURL);

            //             fs.appendFile('log.txt', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function (err) {
            //                 if (err) throw err;
            //             });
        }
    });
}