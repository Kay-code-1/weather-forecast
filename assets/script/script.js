const APIKey = "7f73e548f4acafe9c628ae333ee106f5";

//Function to view weather by city name only

function weatherCityName(){
    let locationEl = document.getElementById("location-input");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationEl.value}&appid=${APIKey}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let locNameEl = document.getElementById("location-name");
            let currDayEl = document.getElementById("current-day");
            let weatherImgEl = document.getElementById("weather-pic");
            let humidityEl = document.getElementById("humidity");
            let windSpeedEl = document.getElementById("wind-speed");
        
            locNameEl.textContent = "Weather for location: " + data.name;
            //convert date to string - currDayEl.textContent = (data.dt).toDateString();
        })
    .catch((err) => {
        console.log(err);
    })
}