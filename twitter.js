var request = require("request");
var express = require('express');
var app = express();
var twitterAPI = require('twitter');
//just storing these as plaintext, pulled straight off the oath 
//twitter tool
var secrets = require(__dirname + '/creds.js'); //read the keys.js file
var mytwitterkeys = require('./keys.js');



var twitter = new twitterAPI({
    consumerKey: mytwitterkeys.consumer_key,
    consumerSecret: mytwitterkeys.consumer_secret,
    access_token_key: mytwitterkeys.access_token_key,
    access_token_secrets: mytwitterkeys.access_token_secret
});

console.log("Consumer Key: " + mytwitterkeys.consumer_key);
console.log("Consumer Secret: " + mytwitterkeys.consumer_secret);
console.log("Access Token Key: " + mytwitterkeys.access_token_key);
console.log("Access Token Secret: " + mytwitterkeys.access_token_secret);


//send a get request to trends/place
twitter.get('trends/place', { id: 1 }, function(error, tweets, response) {
    console.log('myerror is: ', error);
});

app.get('/', function(req, res) {
    res.send('test');
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Prompter listening on port 3000.");
});