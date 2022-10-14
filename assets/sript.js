var apiKey = "81cbf1ebdb55fbe936d5592aa68a8afa";
// var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");

function locationSearch(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(queryURL)
    .then(function(data){
        return data.json()
    })
    .then(function(data) {
        console.log("location ",data);
        var lat = data.coord.lat;
        var long = data.coord.lon;
        getCurrentWeather(lat, long);
        getFutureWeather(lat, long);
    })
    
}
//use name taken from location data
//keep it modular, seperate functions for rendering current/future weather displays and saving to local storage

function getCurrentWeather(lat, long) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
    fetch(queryURL)
    .then(function(data){
        return data.json()
    })
    .then(function(data) {
        console.log("current weather ",data);
    })
}
//increment by 8 due to getting a forecast for 3 hours

function getFutureWeather(lat, long) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`
    fetch(queryURL)
    .then(function(data){
        return data.json()
    })
    .then(function(data) {
        console.log("Future weather ",data);
    })
}

searchButton.addEventListener("click", function() {
    var searchedCity = searchInput.value;
    if (!searchedCity) {
        return;
    }
    locationSearch(searchedCity);
})

