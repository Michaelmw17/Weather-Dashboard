//define the varibles that we'll need to append data pulled from api to cards above---------------------------------//
var APIkey = "&appid=79665c3a613bbe39f50d60745b2798c6";
var cityName = "";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=79665c3a613bbe39f50d60745b2798c6";

//Search Function for Current City Weather

function searchCity(cityname) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=79665c3a613bbe39f50d60745b2798c6";
  var queryURLforcast =
    "https://api.openweathermap.org/data/2.5/forecast?q=sydney&appid=79665c3a613bbe39f50d60745b2798c6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(queryURL);
    //empty divs and ids that we need to dump content into
    $("#current").empty();

    // $('#UV').empty();

    //create HTML for city information

    var cityNameEl = $("<h2>").text(response.name);
    var tempEL = $("<p>").text(response.main.temp);
    var humEl = $("<p>").text(response.main.humidity);

    //create HTML div to append new elements to render on page....
    var newDiv = $("<div>");

    newDiv.append(cityNameEl, tempEL, humEl);

    $("#current").html(newDiv);
  });

  $.ajax({
    url: queryURLforcast,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(queryURLforcast);

    // Storing an array of results in the results variable
    var results = response.list;

    //empty 5day div--------
    $("#5day").empty();

    //create HTML for 5day forcast...........................
    for (var i = 0; i < results.length; i + 3) {
      // Creating a div
      var fiveDayDiv = $("<div>");
      //Storing the responses date
      var date = results[i].dt_txt;
      //creating a header tag with the result items date
      var h5date = $("<h5>").text(date);
      //creating a p tag for the temp
      var pTemp = $("<p>");
      //Giving the p tag the temp pulled from the results
      pTemp.text(results[i].main.temp);
      //creating a p tag for the humidity
      var pHum = $("<p>");
      //Giving the p tag the humidity pulled from the results
      pHum.text(results[i].main.humidity);

      fiveDayDiv.append(pTemp);
      fiveDayDiv.append(pHum);

      $("#5day").prepend(fiveDayDiv);
    }
  });
}

//Event handler for user city search//

$("#select-city").on("click", function (event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the city name
  var cityInput = $("#city-input").val().trim();

  //save search term to local storage
  var textContent = $(this).siblings("input").val();
  localStorage.setItem(cityInput, textContent);

  // Running the searchCity function (passing in the city as an argument)
  searchCity(cityInput);
});
