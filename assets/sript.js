var apiKey = "81cbf1ebdb55fbe936d5592aa68a8afa";
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var weatherContainer = document.getElementById("weather-display");
var currentWeather = document.getElementById("current-weather");
var futureWeather = document.getElementById("future-weather");
var currentCard = document.getElementById("current-card");
var currentDate = moment().format("dddd");


function locationSearch(city) {  //Converts city searched into coordinates
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
function getCurrentWeather(lat, long) {  //uses the coorndinates pulled from the location fetch to grab today's forecast
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
    fetch(queryURL)
    .then(function(data){
        return data.json()
    })
    .then(function(data) {  //takes data pulled from api and fills static html elements.
        document.querySelector("#today").textContent = "Today's Forecast"
        document.querySelector("#city-name").textContent = data.name;
        document.querySelector("#cTemp").textContent = "Temp: " + data.main.temp + "Fº";
        var iconCImage = document.createElement("img");
        var icon = data.weather[0].icon;
        iconCImage.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        );
        currentCard.append(iconCImage);
        document.querySelector("#cWind").textContent = "Wind Speed: " + data.wind.speed + "MPH";
        document.querySelector("#cHumidity").textContent = "Humidity: " + data.main.humidity + "%";

    })
}
function getFutureWeather(lat, long) {   //uses the coorndinates pulled from the location fetch to grab future forecasts
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
    fetch(queryURL)
    .then(function(data){
        return data.json()
    })
    .then(function(data) {
        console.log("Future weather ",data);
        for (var i =0; i< 40; i+=8) {   //generates html elements for each day of the 5-day forecast
            var column = document.createElement("div");
            column.setAttribute("class", "column");
            weatherContainer.append(column);

            var card = document.createElement("div");
            card.setAttribute("class", "card pl-1");
            column.append(card);

            var fDate = document.createElement("h1");
            fDate.textContent = data.list[i].dt_txt;
            card.append(fDate)
            console.log(data.list[0].dt_txt)

            var fTemp = document.createElement("h1");
            fTemp.textContent = "Temp: " + data.list[i].main.temp + "Fº";
            card.append(fTemp)

            var fWind = document.createElement("p");
            fWind.textContent = "Wind Speed: " + data.list[i].wind.speed + "MPH";
            card.append(fWind);
            console.log(data.list[i].wind.speed);

            var fHumidity = document.createElement("p");
            fHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            card.append(fHumidity);

            var iconImage = document.createElement("img");
            var icon = data.list[i].weather[0].icon;
            iconImage.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            );
            card.append(iconImage);

        }
    })
}

searchButton.addEventListener("click", function() {   //initiates api calls after search button is clicked if something is searched.
    var searchedCity = searchInput.value;
    if (!searchedCity) {
        return;
    }
    locationSearch(searchedCity);


})


