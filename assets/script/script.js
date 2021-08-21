const APIKey = "7f73e548f4acafe9c628ae333ee106f5";
//const LocAPIKey = "8165bcb067887509897788e62fbcda1b";

var latitudeEl = document.getElementById("latitude");
var longitudeEl = document.getElementById("longitude");

let uvIndexEl = document.getElementById("uv-index");

//Function to view weather by city name only

function weatherCityName() {
  let locationEl = document.getElementById("location-input");
  let weatherCardEl = document.getElementById("weather-card");

  const current =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationEl.value +
    "&appid=" +
    APIKey +
    "&units=imperial";
  const weatherIcon = "https://openweathermap.org/img/wn/";

  fetch(current)
    .then(function (response) {
      if (response.status !== 200) {
        alert("City not found. Enter correct location!");
        weatherCardEl.style.visibility = "none";
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);

      weatherCardEl.style.visibility = "visible";

      let locNameEl = document.getElementById("location-name");
      locNameEl.textContent = data.name;

      let currDayEl = document.getElementById("current-day");

      let currentDate = new Date(data.dt * 1000);
      currDayEl.textContent =
        currentDate.getMonth() +
        1 +
        "/" +
        currentDate.getDate() +
        "/" +
        currentDate.getFullYear();

      //}\\${currentDate.getDate()}\\${currentDate.getFullYear()}`;

      let weatherImgEl = document.getElementById("weather-icon");
      weatherImgEl.setAttribute(
        "src",
        weatherIcon + data.weather[0].icon + "@2x.png"
      );
      // `${weatherIcon}${data.weather[0].icon}@2x.png`);

      weatherImgEl.setAttribute("alt", data.weather[0].main);

      let weatherDescEl = document.getElementById("weather-desc");
      weatherDescEl.textContent = data.weather[0].description;

      let humidityEl = document.getElementById("humidity");
      humidityEl.textContent = "Humidity: " + data.main.humidity;
      console.log(humidityEl);

      let currentTemp = document.getElementById("temperature");
      currentTemp.textContent = data.main.temp;

      let windSpeedEl = document.getElementById("wind-speed");
      windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + "mph";

      getUVIndexandForecast(data.coord.lat, data.coord.lon);
    })

    .catch(function (err) {
      console.log(err);
    });
}

function getUVIndexandForecast(lat, lon) {
  let futureWeather = document.querySelector(".future-weather");

  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      futureWeather.style.visibility = "visible";

      let futureWeatherArr = data.daily;
      console.log("next day weather" + futureWeatherArr);

      for (let i = 1; i <= 5; i++) {
        console.log("Weather array" + futureWeatherArr.length);

        let dayEl = document.getElementById("nextday" + i);
        dayEl.innerHTML = "";
        let futureDate = new Date(futureWeatherArr[i].dt * 1000);
        console.log("Future date is: " + futureDate);

        let futureDateEl = document.createElement("div");
        futureDateEl.textContent =
          futureDate.getMonth() +
          1 +
          "/" +
          futureDate.getDate() +
          "/" +
          futureDate.getFullYear();
        dayEl.appendChild(futureDateEl);

        let weatherIcon = document.createElement("div");
        let image = document.createElement("img");
        const icon = "https://openweathermap.org/img/wn/";
        image.setAttribute(
          "src",
          icon + futureWeatherArr[i].weather[0].icon + "@2x.png"
        );

        weatherIcon.appendChild(image);
        dayEl.appendChild(weatherIcon);

        let tempEl = document.createElement("div");
        tempEl.textContent = futureWeatherArr[i].temp.day;
        tempEl.classList.add("forecast-measure");
        dayEl.appendChild(tempEl);

        let weatherDescEl = document.createElement("div");
        weatherDescEl.textContent = futureWeatherArr[i].weather[0].description;
        weatherDescEl.classList.add("desc");
        dayEl.appendChild(weatherDescEl);

        let windSpeedEl = document.createElement("div");
        windSpeedEl.textContent =
          "Wind: " + futureWeatherArr[i].wind_speed + "mph";
        windSpeedEl.classList.add("conditions");
        dayEl.appendChild(windSpeedEl);

        let humidityEl = document.createElement("div");
        humidityEl.textContent =
          "Humidity: " + futureWeatherArr[i].humidity + "%";
        humidityEl.classList.add("conditions");
        dayEl.appendChild(humidityEl);
      }
      //call function to display UV index on Current weather card
      highlightUVIndex(data.current.uvi);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Display and Highlight UV Index based on intensity
function highlightUVIndex(uviData) {
  uvIndexEl.textContent = "UV Index: " + uviData;
  // let uvi = data.current.uvi;
  if (uviData >= 0 || uviData <= 3) {
    uvIndexEl.classList.add("green-uvi");
  }
  if (uviData > 3 && uviData <= 6) {
    uvIndexEl.classList.add("yellow-uvi");
  }
  if (uviData > 6 && uviData <= 8) {
    uvIndexEl.classList.add("orange-uvi");
  }
  if (uviData > 8 && uviData <= 10) {
    uvIndexEl.classList.add("red-uvi");
  }
  document.append(uvIndexEl);
  return;
}

// }
