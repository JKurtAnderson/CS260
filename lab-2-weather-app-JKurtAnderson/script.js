document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  let instructions = document.getElementById("instructions");
  if (instructions != null) {
    instructions.parentNode.removeChild(instructions);
  }
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=000b48262a0ff241a79797a117c317cb";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let city = document.getElementById("city").textContent = "Weather in " + json.name;

      // TODAY WEATHER
      let results = '<div class="today-weather"><div class = "current-weather">';
      // results += '</div></div>'
      results += '<h1>' + Math.round(json.main.temp) + '&degF</h1>'
      results += '<h3>'
      for (let i = 0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += '</h3>'
      results += '<p>' + json.wind.speed + " mph ";
      if (json.wind.deg < 22.5) {
        results += "East"
      } else if (json.wind.deg < 67.5) {
        results += "South-East"
      } else if (json.wind.deg < 112.5) {
        results += "South"
      } else if (json.wind.deg < 157.5) {
        results += "South-West"
      } else if (json.wind.deg < 202.5) {
        results += "West"
      } else if (json.wind.deg < 247.5) {
        results += "North-West"
      } else if (json.wind.deg < 292.5) {
        results += "North"
      } else if (json.wind.deg < 337.5) {
        results += "North-East"
      } else {
        results += "East"
      }
      results += ' winds</p>'
      results += '</div><div class = "current-forecast">'
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png"/>'
      results += '<h3>' + Math.round(json.main.temp_min) + '&deg/' + Math.round(json.main.temp_max) + '&deg</h3>'
      results += '</div></div>'

      // MAP
      let lat = json.coord.lat;
      let long = json.coord.lon;
      results += "<div id='map'>" + '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + long + '&zoom=10&size=500x500&maptype=roadmap&key=AIzaSyDUJgXN4HfKLfRHZXQJIR5WCS8-OMQtRWI" style=width: 100px; height: 100px; />' + "</div>";

      document.getElementById("weather-results").innerHTML = results;
    });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=000b48262a0ff241a79797a117c317cb";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = "";

      // Hourly Forecast
      let currentHour = new Date().getHours();
      let nextHourIndex = 0;
      while (moment(json.list[nextHourIndex].dt_txt).format('H') < currentHour) {
        nextHourIndex++;
      }
      forecast += '<div class="forecast"><h2>Hourly Forecast</h2><div class="forecasts">';
      for (let i = 0; i < 5; i++) {
        if (i == 4) {
          forecast += '<div class="forecast-item last-item">';
        } else {
          forecast += '<div class="forecast-item">';
        }
        forecast += "<h3>" + moment(json.list[nextHourIndex + i].dt_txt).format('h:mm a') + "</h3>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[nextHourIndex + i].weather[0].icon + '.png"/>';
        forecast += "<h2>" + Math.round(json.list[nextHourIndex + i].main.temp) + "&degF</h2>";
        forecast += "<h3><em>Feels like " + Math.round(json.list[nextHourIndex + i].main.feels_like) + "&deg</em></h3>";
        forecast += "<p>Humidity: " + json.list[nextHourIndex + i].main.humidity + "%</p>";
        forecast += '</div>';
      }
      forecast += '</div></div>';

      // Daily Forecast
      forecast += '<div class="forecast"><h2>Daily Forecast</h2><div class="forecasts">';
      let forecastIndex = 0;
      for (let i = 0; i < 5; i++) { //for each day
        let currentDay = moment(json.list[forecastIndex].dt_txt).format('MMM Do');
        let maxTemp = json.list[forecastIndex].main.temp_max;
        let minTemp = json.list[forecastIndex].main.temp_min;
        let icon = "http://openweathermap.org/img/w/" + json.list[forecastIndex].weather[0].icon + ".png"
        let humidity = json.list[forecastIndex].main.humidity;
        while (moment(json.list[forecastIndex].dt_txt).format('MMM Do') == currentDay) {
          if (moment(json.list[forecastIndex].dt_txt).format('h') == "12 pm") {
            icon = "http://openweathermap.org/img/w/" + json.list[forecastIndex].weather[0].icon + ".png";
            humidity = json.list[forecastIndex].main.humidity;
          }
          if (json.list[forecastIndex].main.temp_max > maxTemp) {
            maxTemp = json.list[forecastIndex].main.temp_max;
          }
          if (json.list[forecastIndex].main.temp_min < minTemp) {
            minTemp = json.list[forecastIndex].main.temp_min;
          }
          forecastIndex++;
        }
        if (i == 4) {
          forecast += '<div class="forecast-item last-item">';
        } else {
          forecast += '<div class="forecast-item">';
        }
        if (i == 0) {
          forecast += "<h3>Today</h3>";
        } else if (i == 1) {
          forecast += "<h3>Tomorrow</h3>";
        } else {
          forecast += "<h3>" + currentDay + "</h3>";
        }
        forecast += '<img src="' + icon + '"/>';
        forecast += "<h2>" + Math.round(minTemp) + "&degF</h2>";
        forecast += "<h2>" + Math.round(maxTemp) + "&degF</h2>";
        forecast += "<p>Humidity: " + humidity + "%</p>";
        forecast += '</div>';
      }
      forecast += '</div></div>';

      document.getElementById("forecast-results").innerHTML = forecast;
    });
});
