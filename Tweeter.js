var Twitter = require('twitter');

var mytwitterkeys = require('./keys.js');

var consumer_key = mytwitterkeys.consumer_key;
var consumer_secret = mytwitterkeys.consumer_secret;
var access_token_key = mytwitterkeys.access_token_key;
var access_token_secret = mytwitterkeys.access_token_secret;





var client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});