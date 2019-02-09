var Spotify = require('node-spotify-api');
var spotifykeys = require("./keys.js"); 
var spotify = new Spotify(spotifykeys.spotify);


// var spotify = new Spotify({
//   id: f82f61d1c3864d128f18f2194493cb1a,
//   secret: 9f287e4d3bd14a10863e91ccfe4e1cf4
// });
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});