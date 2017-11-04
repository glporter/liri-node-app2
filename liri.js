var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
//read the keys.js file
var mytwitterkeys = require('./keys.js');

var consumer_key = mytwitterkeys.consumer_key;
var consumer_secret = mytwitterkeys.consumer_secret;
var access_token_key = mytwitterkeys.access_token_key;
var access_token_secret = mytwitterkeys.access_token_secret;

console.log("Consumer Key: " + mytwitterkeys.consumer_key);
console.log("Consumer Secret: " + mytwitterkeys.consumer_secret);
console.log("Access Token Key: " + mytwitterkeys.access_token_key);
console.log("Access Token Secret: " + mytwitterkeys.access_token_secret);

var mySpotifykeys = require('./spotifyKeys.js');

var spotifyID = mySpotifykeys.spotifyId;
var spotifySecret = mySpotifykeys.spotifySecret;

console.log("Spotify Key: " + mySpotifykeys.spotifyId);
console.log("Spotify Secret: " + mySpotifykeys.spotifySecret);


//reaad the argv array
var inputString = process.argv;
//read the argv[2] argument which should be the command you want to perform

var command = inputString[2]
var aSong = inputString[3]
var aMovie = inputString[3]

if (command === "my-tweets") {
    console.log("Execute my-tweets command")
} else if (command === "spotify-this-song") {
    console.log("Execute spotify-this-song command");
    spotifyThisSong();
} else if (command === "movie-this") {
    console.log("Execute movie-this command");
    movieThis();
} else if (command === "do-what-it-says") {
    console.log("Execute do-what-it-says command")
    doWhatItSays();
} else {
    console.log("Error: Invalid command entered")
}

//function called if command entered was 'my-tweets'
// Sorry but wasn't able to complete this api due to workload
// Work activity picks up significantly prior to year-end freeze and
// I simply ran out of time. Will commit to completing later
// I set up a Twitter account
// Got the credentials and keys, so everything is ready except the logic
function showTweets() {


}


//function called if command entered was 'spotify-this-song'
function spotifyThisSong(aSong) {

    // This example is from: https://www.npmjs.com/package/node-spotify-api
    //  https://developer.spotify.com/web-api/search-item/


    var spotify = new Spotify({
        //id: "'" + spotifyID + "'",
        //secret: "'" + spotifySecret + "'"
        id: '202eff3761cb4eaca4f8f5c34038b23f',
        secret: 'b8b86823badb41618e3e4539e5e9346c'
    });

    console.log("aSong = " + aSong);

    spotify.search({
        type: 'album',
        query: "'" + aSong + "'",
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist(): ");
        console.log("The Song's name: ");
        console.log("Prview link: " + data.albums.href);
        console.log("Album: ");
        console.log(JSON.stringify(data));
        console.log(data.items);

    });

}

//function called if command entered was 'movie-this' 
function movieThis() {
    // alert("Inside the movieThis function()");
    // Then run a request to the OMDB API with the movie specified
    //console.log("aMovie: " + aMovie);

    if (aMovie === undefined) {
        aMovie = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + aMovie + "&y=&plot=short&apikey=40e9cece";


    // This line is just to help us debug against the actual URL.
    console.log("Query URL: " + queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            //console.log("Response: " + response);
            //console.log("Body: " + body);
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Rated);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
        }
    });


}

//function called if command entered was 'do-what-it-says' 
function doWhatItSays() {
    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);
        spotifyThisSong(data);

        // Then split it by commas (to make it more readable)
        //var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        //console.log(dataArr);

    });

}