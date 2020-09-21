//define the varibles that we'll need to append data pulled from api to cards above---------------------------------//
var APIkey = "&appid=79665c3a613bbe39f50d60745b2798c6";
var cityName = "Seattle";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=ecc0be5fd92206da3aa90cc41c13ca56";

//Functions for current weather by city//
function displayWeather() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIkey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
displayWeather();

//Function for 5 day forecast by city//
