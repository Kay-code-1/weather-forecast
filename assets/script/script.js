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
            locNameEl.textContent = "Weather for location: " + data.name;

            let currDayEl = document.getElementById("current-day");
            let weatherImgEl = document.getElementById("weather-pic");
            //convert date to string - currDayEl.textContent = (data.dt).toDateString();
            // weatherImgEl.addClass = data.weather.icon;

            let humidityEl = document.getElementById("humidity");
            humidityEl.textContent = "Humidity: " + data.main.humidity;
            console.log(humidityEl);
            
            // let windSpeedEl = document.getElementById("wind-container");
            // let windDetails = [data.wind].map((w) => {
            //     return `<tr><td>${w.speed}</td><td>${w.deg}</td><td>${w.gust}</td>`;
            // windSpeedEl.innerHTML = windDetails.join('');
            // })

        
            console.log(windDetails);
        })
    .catch((err) => {
        console.log(err);
    })
}