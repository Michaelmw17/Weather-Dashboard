moment().format("L");

// Search Function for Current City Weather
function searchCity(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid=79665c3a613bbe39f50d60745b2798c6";
  var queryURLForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=metric&appid=79665c3a613bbe39f50d60745b2798c6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(queryURL);
    // Empty divs and ids that we need to dump content into.
    $("#current").empty();
    var mainDate = moment().format("L");

    // Create HTML for city information.
    var cityNameEl = $("<h2>").text(response.name);
    var displayMainDate = cityNameEl.append(" " + mainDate);
    var tempEL = $("<p>").text("Temperature: " + response.main.temp);
    var humEl = $("<p>").text("Humidity: " + response.main.humidity);
    var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
    var currentWeather = response.weather[0].main;

    if (currentWeather === "Snow") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/13d.png"
      );
      currentIcon.attr("style", "height: 90px; width: 90px");
    } else if (currentWeather === "Clouds") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/03d.png"
      );
      currentIcon.attr("style", "height: 90px; width: 90px");
    } else if (currentWeather === "Clear") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/01d.png"
      );
      currentIcon.attr("style", "height: 90px; width: 90px");
    } else if (currentWeather === "Drizzle") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/10d.png"
      );
      currentIcon.attr("style", "height: 90px; width: 90px");
    } else if (currentWeather === "Rain") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/09d.png"
      );
      currentIcon.attr("style", "height: 90px; width: 90px");
    }
    // Create HTML div to append new elements to render on page.
    var newDiv = $("<div>");

    newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

    $("#current").html(newDiv);

    // UV call

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryURLUv =
      "https://api.openweathermap.org/data/2.5/uvi?&appid=79665c3a613bbe39f50d60745b2798c6&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryURLUv,
      method: "GET",
    }).then(function (response) {
      $("#uvl-display").empty();
      var uvlResults = response.value;
      //Create HTML for new div.
      var uvlEl = $(
        "<button class='btn bg-warning' style='border-radius: 20px;'>"
      ).text("UV Index: " + response.value);

      $("#uvl-display").html(uvlEl);
    });
  });

  // 5 Day forecast call.

  $.ajax({
    url: queryURLForecast,
    method: "GET",
  }).then(function (response) {
    // Storing an array of results in the results variable.
    var results = response.list;
    // Empty 5day div.
    $("#5day").empty();
    // Create HTML for 5day forecast.
    for (var i = 0; i < results.length; i += 8) {
      // Creating a div
      var fiveDayDiv = $(
        "<div class='card shadow-lg text-white bg-primary mx-auto mb-9 p-1' style='width: 8.5rem;  height: 10rem; padding: 20px;'>"
      );

      // Storing the responses date temp and humidity.
      var date = results[i].dt_txt;
      var setD = date.substr(0, 10);
      var temp = results[i].main.temp;
      var hum = results[i].main.humidity;

      // Creating tags with the result items information.
      var h5date = $("<h5 class='card-title'>").text(setD);
      var pHum = $("<p class='card-text'>").text("Humidity: " + hum);
      var pTemp = $("<p class='card-text'>").text("Temp: " + temp);

      var weather = results[i].weather[0].main;

      if (weather === "Rain") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/09d.png"
        );
        icon.attr("style", "height: 60px; width: 40px");
      } else if (weather === "Clouds") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/03d.png"
        );
        icon.attr("style", "height: 60px; width: 60px");
      } else if (weather === "Clear") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d.png"
        );
        icon.attr("style", "height: 60px; width: 60px");
      } else if (weather === "Drizzle") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d.png"
        );
        icon.attr("style", "height: 60px; width: 60px");
      } else if (weather === "Snow") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d.png"
        );
        icon.attr("style", "height: 60px; width: 60px");
      }

      // Append items to.
      fiveDayDiv.append(h5date);
      fiveDayDiv.append(pTemp);
      fiveDayDiv.append(icon);
      fiveDayDiv.append(pHum);
      $("#5day").append(fiveDayDiv);
    }
  });
}
pageLoad();
// Event handler for user city search.

$("#select-city").on("click", function (event) {
  // Preventing the button from trying to submit the form.
  event.preventDefault();
  // Storing the city name.
  var cityInput = $("#city-input").val().trim();

  // Save search term to local storage.
  var textContent = $(this).siblings("input").val();
  var storeArr = [];
  storeArr.push(textContent);
  localStorage.setItem("cityName", JSON.stringify(storeArr));

  searchCity(cityInput);
  pageLoad();
});

// Call stored items on page load
function pageLoad() {
  var lastSearch = JSON.parse(localStorage.getItem("cityName"));
  var searchDiv = $(
    "<button id='searchBtn' class='btn border shadow-sm bg-primary text-white rounded' style='width: 7rem;'>"
  ).text(lastSearch);
  var psearch = $("<div>");
  psearch.append(searchDiv);
  $("#searchHistory").prepend(psearch);
}

// Event.
$("#searchHistory").on("click", ".btn", function (event) {
  event.preventDefault();
  console.log($(this).text());
  searchCity($(this).text());
});
