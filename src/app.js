function showTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("h1.current-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#currentHumidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#current-temperature-icon");
  let options = { weekday: "long", hour: "numeric", minute: "numeric" };
  let localTimeString = new Intl.DateTimeFormat([], options).format(new Date());
  let timeElement = document.querySelector("#day-time");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = localTimeString;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon "/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "a0db461tcf90de7688b6aab936fao1ed";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2">
        <div class="weather-forecast-day">${formatDay(day.time)}</div>
         <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temp">
          <div class="weather-forecast-temp-max">${Math.round(
            day.temperature.maximum
          )}º</div>
          <div class="weather-forecast-temp-min">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

citySearch("Toronto");
