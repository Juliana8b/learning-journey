function showTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("h1.current-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#currentHumidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon "/>`;
}

let now = new Date();
function dateTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, "0");
  let currentDetails = document.querySelector("#day-time");
  currentDetails.innerHTML = `${day} ${hour}:${minute}`;
}

function citySearch(city) {
  let apiKey = "a0db461tcf90de7688b6aab936fao1ed";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  citySearch(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

function displayForecast() {
  let currentDate = new Date();
  let currentDayIndex = currentDate.getDay();

  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  for (let i = 1; i <= 5; i++) {
    let nextDayIndex = (currentDayIndex + i) % 7;
    let nextDay = weekdays[nextDayIndex];

    forecastHtml += `
      <div class="col-2">
        <div class="weather-forecast-day">${nextDay}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
          class="weather-forecast-icon"
        />
        <div class="weather-forecast-temp">
          <div class="weather-forecast-temp-max">12°</div>
          <div class="weather-forecast-temp-min">9°</div>
        </div>
      </div>
    `;
  }

  const forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

citySearch("Toronto");
dateTime();
displayForecast();
