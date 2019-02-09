require("dotenv").config();

//REQURE MODULES
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotifykeys = require("./keys.js");
var spotify = new Spotify(spotifykeys.spotify);

var userInput = process.argv[2];
var userQuery;
   
switch (userInput){  
        
    case "concert-this":
        concertThis();
        break;

    case "movie-this":
        movieThis();
        break;
    
    case "spotify-this-song":
        spotifySong();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;            
}


function spotifySong() {

    if(process.argv[3]===undefined){
       userQuery = "The Sign";
       console.log(userQuery);
    } 

   else{
       userQuery = process.argv[3]; 
       console.log(userQuery);
    }

   spotify.search({type: 'track', query: userQuery, limit: 1 }, function(err, data){
        
    if (err) {
          return console.log(err);
        }
    
        data.tracks.items.forEach(function (element) {
          console.log("Artists: " + element.artists);
          console.log("Song: " + element.name);
          console.log("Spotify Preview link: "+ element.preview_url);
          console.log("Album: "+ element.album);
        });
    });
};    



function movieThis(){
   
    if(process.argv[3]===undefined){
         userQuery = "Mr.+Nobody";
     } 
 
    else{
       userQuery = process.argv.slice(3).join("+"); 
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";
 
    axios.get(queryUrl)
    
         .then(function(response) {
                 console.log("Movie Title: " + response.data.Title);        
                 console.log("Year: " + response.data.Year);
                 console.log("IMDB Rating: " + response.data.imdbRating);
                 console.log("Rotten Tomatoes Rating: " + response.data.rottenTomatoesRating);
                 console.log("Produced: " + response.data.Country);
                 console.log("Language: " + response.data.Language);
                 console.log("Plot: " + response.data.Plot);
                 console.log("Actors: " + response.data.Actors);
             })
 
         .catch(function(err){
             console.log(err);
         });
  
 };


function doWhatItSays() {

   fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
        console.log(error);
    }
    
    else{  
            
        var dataArr = data.split(",");
        console.log(dataArr);

        switch (dataArr[0]){  

            case "movie-this":
           
                var userQuery = dataArr[1];
                console.log(userQuery);

                var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";

                axios.get(queryUrl)
            
                     .then(function(response) {
                         console.log("Movie Title: " + response.data.Title);        
                         console.log("Year: " + response.data.Year);
                         console.log("IMDB Rating: " + response.data.imdbRating);
                         console.log("Rotten Tomatoes Rating: " + response.data.rottenTomatoesRating);
                         console.log("Produced: " + response.data.Country);
                         console.log("Language: " + response.data.Language);
                         console.log("Plot: " + response.data.Plot);
                         console.log("Actors: " + response.data.Actors);
                     })
         
                 .catch(function(err){
                     console.log(err);
                 });
               break;

            case "spotify-this-song":
               spotifySong(dataArr[1]);
               break;
        }
    }  
  
  });
};