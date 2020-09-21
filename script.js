//define the varibles that we'll need to append data pulled from api to cards above//
// var APIkey = "&appid=79665c3a613bbe39f50d60745b2798c6";
// var cityName = "";
// var queryURL =
//   "https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=79665c3a613bbe39f50d60745b2798c6";
moment().format("L");

//Search Function for Current City Weather//
function searchCity(cityname) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=79665c3a613bbe39f50d60745b2798c6";
  var queryURLforcast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&appid=79665c3a613bbe39f50d60745b2798c6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(queryURL);
    //empty divs and ids that we need to dump content into.....
    $("#current").empty();
    var mainDate = moment().format("L");
    // $('#UV').empty();

    //create HTML for city information......
    var cityNameEl = $("<h2>").text(response.name);
    var displayMainDate = cityNameEl.append(" " + mainDate);
    var tempEL = $("<p>").text("Tempraturer: " + response.main.temp);
    var humEl = $("<p>").text("Humidity: " + response.main.humidity);
    var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
    var iconEl = $("<i class='fas fa-cloud-showers-heavy'></i>");
    //create HTML div to append new elements to render on page....
    var newDiv = $("<div>");

    newDiv.append(displayMainDate, iconEl, tempEL, humEl, windEl);

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
    //create HTML for 5day forcast................
    for (var i = 0; i < results.length; i += 9) {
      // Creating a div
      var fiveDayDiv = $(
        "<div class='card text-white bg-primary mx-auto' style='width: 8.5rem; height: 11rem;'>"
      );
      //Storing the responses date temp and humidity.......
      var date = results[i].dt_txt;
      var temp = results[i].main.temp;
      var hum = results[i].main.humidity;
      console.log(date);
      console.log(temp);
      console.log(hum);
      //creating a tags with the result items information.....
      var h5date = $("<h5 class='card-title'>").text(date);
      var pTemp = $("<p class='card-text'>").text("Temp: " + temp);
      var pHum = $("<p class='card-text'>").text("Humidity " + hum);
      var iconEl = $("<i class='fas fa-cloud-showers-heavy'></i>");
      //append items to.......
      fiveDayDiv.append(h5date);
      fiveDayDiv.append(iconEl);
      fiveDayDiv.append(pTemp);
      fiveDayDiv.append(pHum);
      $("#5day").prepend(fiveDayDiv);
    }
  });
}
pageLoad();
//Event handler for user city search//

$("#select-city").on("click", function (event) {
  // Preventing the button from trying to submit the form......
  event.preventDefault();
  // Storing the city name........
  var cityInput = $("#city-input").val().trim();

  //save search term to local storage.....
  var textContent = $(this).siblings("input").val();
  var storearr = [];
  storearr.push(textContent);
  localStorage.setItem("cityName", JSON.stringify(storearr));

  searchCity(cityInput);
  pageLoad();
});
//---------------------------Call stored items on page load-------------------------------------//
function pageLoad() {
  var lastSearch = JSON.parse(localStorage.getItem("cityName"));
  var searchDiv = $(
    "<div class='card border text-muted' style='width: 12rem;'>"
  );
  var psearch = $("<div class='text-muted p-1 ml-1'>").text(lastSearch);
  searchDiv.append(psearch);
  $("#searchhistory").prepend(searchDiv);
}
