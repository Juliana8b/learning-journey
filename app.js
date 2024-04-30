function showTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("h1.current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}`;
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  conditionElement.innerHTML = `${condition}`;
  let humidityElement = document.querySelector("#currentHumidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;
  let windElement = document.querySelector(".current-wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind}`;
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("h1.current-city");
  cityName.innerHTML = cityInput.value;
  let apiKey = "a0db461tcf90de7688b6aab936fao1ed";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(showTemperature);
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

  let curTime = `${day} ${hour}:${minute}`;
  let currentDetails = document.querySelector("#day-time");
  currentDetails.innerHTML = curTime;
}
dateTime();

let selectCity = document.querySelector("#search-form");
selectCity.addEventListener("submit", changeCity);
