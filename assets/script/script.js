const APIKey = "7f73e548f4acafe9c628ae333ee106f5";
//const LocAPIKey = "8165bcb067887509897788e62fbcda1b";

var latitudeEl = document.getElementById("latitude");
var longitudeEl = document.getElementById("longitude");

//Function to view weather by city name only

function weatherCityName() {
  let locationEl = document.getElementById("location-input");
  let weatherCardEl = document.getElementById("weather-card");
  const current = `https://api.openweathermap.org/data/2.5/weather?q=${locationEl.value}&appid=${APIKey}&units=imperial`;
  const weatherIcon = "https://openweathermap.org/img/wn/";

  fetch(current)
    .then((response) => {
      if (response.status !== 200) {
        alert("City not found. Enter correct location!");
        weatherCardEl.style.visibility = "none";
      } else {
        return response.json();
      }
    })
    .then((data) => {
        console.log(data);
        
        weatherCardEl.style.visibility = "visible";
  
        let locNameEl = document.getElementById("location-name");
        locNameEl.textContent = data.name;
  
        let currDayEl = document.getElementById("current-day");
  
        let currentDate = new Date(data.dt * 1000);
        currDayEl.textContent = `${
          currentDate.getMonth() + 1
        }\\${currentDate.getDate()}\\${currentDate.getFullYear()}`;
  
        let weatherImgEl = document.getElementById("weather-icon");
        weatherImgEl.setAttribute(
          "src",
          `${weatherIcon}${data.weather[0].icon}@2x.png`
        );
        weatherImgEl.setAttribute("alt", `${data.weather[0].main}`);
  
        let weatherDescEl = document.getElementById("weather-desc");
        weatherDescEl.textContent = data.weather[0].description;
  
        let humidityEl = document.getElementById("humidity");
        humidityEl.textContent = "Humidity: " + data.main.humidity;
        console.log(humidityEl);
  
        let currentTemp = document.getElementById("temperature");
        currentTemp.textContent = data.main.temp;
  
        let windSpeedEl = document.getElementById("wind-speed");
        windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + "mph";
  
        latitudeEl.textContent = data.coord.lat;
        
        longitudeEl.textContent = data.coord.lon;
        getUVIndex();
      })
  
   
    .catch((err) => {
      console.log(err);
    });

    //const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIKey}&units=imperial`;

}

function getUVIndex() {
  let uvIndexEl = document.getElementById("uv-index");
  let lat = latitudeEl.textContent;
  let lon = longitudeEl.textContent;
  const uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  fetch(uvURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      uvIndexEl.textContent = "UV Index: " + data.current.uvi;
      
    })
    .catch((err) => {});
}

// function getCoOrdinates() {
//     let locationEl = document.getElementById("location-input");
//     //const current = `https://api.openweathermap.org/data/2.5/weather?q=${locationEl.value}&appid=${APIKey}&units=imperial`;

//     const locTag = `http://api.positionstack.com/v1/forward?access_key=${LocAPIKey}&query=${locationEl.value}`;

//     fetch(locTag)
//     .then((response) => {
//         return response.json();
//     })

//     .then((data) => {
//         console.log(data);
//         // let latitudeEl = document.getElementById("latitude");

//         // let longitudeEl = document.getElementById("longitude");
//         // longitudeEl = data.longitude

//     })}
