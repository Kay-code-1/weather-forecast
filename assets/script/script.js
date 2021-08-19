const APIKey = "7f73e548f4acafe9c628ae333ee106f5";

//Function to view weather by city name only

function weatherCityName() {
  let locationEl = document.getElementById("location-input");
  const current = `https://api.openweathermap.org/data/2.5/weather?q=${locationEl.value}&appid=${APIKey}&units=imperial`;
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIKey}&units=imperial`;

  const weatherIcon = 'https://openweathermap.org/img/wn/';
  fetch(current)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let locNameEl = document.getElementById("location-name");
      locNameEl.textContent = data.name;

      let currDayEl = document.getElementById("current-day");
      
      let currentDate = new Date(data.dt * 1000);
      currDayEl.textContent = `${
        currentDate.getMonth() + 1
      }\\${currentDate.getDate()}\\${currentDate.getFullYear()}`;
      
      let weatherImgEl = document.getElementById("weather-icon");
      weatherImgEl.setAttribute("src",`${weatherIcon}${data.weather[0].icon}@2x.png`);
      weatherImgEl.setAttribute("alt",`${data.weather[0].main}`);

      let weatherDescEl = document.getElementById("weather-desc");
      weatherDescEl.textContent = data.weather[0].description;

      let humidityEl = document.getElementById("humidity");
      humidityEl.textContent = "Humidity: " + data.main.humidity;
      console.log(humidityEl);

      let currentTemp = document.getElementById("temperature");
      currentTemp.textContent = data.main.temp;

      let windSpeedEl = document.getElementById("wind-speed");
      windSpeedEl.textContent = "Wind Speed: " + data.wind.speed;
     
      let uvIndexEl = document.getElementById("uv-index");
    })

    

    .catch((err) => {
      console.log(err);
    });
}
