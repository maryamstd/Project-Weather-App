let now = new Date();
let today = document.querySelector(".date");
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
today.innerHTML = `${year}.${month}.${date}.${day}`;

let clock = document.querySelector(".time");
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
clock.innerHTML = `${hours}:${minutes}`;

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-sm-1">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${forecastDate(
                  forecastDay.temperature.day
                )}</h5>
                
                <p class="card-text">May 15</p>
              
                <p class="Weather">
                  <span class="Wday"
                    ><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png" alt="" width="70" />
                  </span>
                  <br />
                  <span class="Dday"
                    ><span class="min-temp">${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>/<span class="max-temp"
                      >${Math.round(forecastDay.temperature.maximum)}°</span
                    ></span
                  >
                </p>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "8a6bf741308e4c9b4o546fct97561f29";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  let mainTemp = Math.round(response.data.main.temp);
  document.querySelector(".degree").innerHTML = mainTemp;
  document.querySelector(".weatherType").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".tempTwo").innerHTML = mainTemp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celtemp = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "da9d6445cc8219090c0c21ead21a8c28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function cityChange(event) {
  event.preventDefault();
  let city = document.querySelector("#city_name").value;
  search(city);
}
let form = document.querySelector("#searchCity");
form.addEventListener("submit", cityChange);

function searchCurrentLocation(position) {
  let apiKey = "da9d6445cc8219090c0c21ead21a8c28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#current_location_button");
currentLocationButton.addEventListener("click", currentWeather);

function fahrenheit(event) {
  event.preventDefault();
  let newTemp = document.querySelector(".tempTwo");
  celsiusLink.classList.remove("c-l");
  fahrenheitLink.classList.add("c-l");
  let fTemp = (celtemp * 9) / 5 + 32;
  newTemp.innerHTML = Math.round(fTemp);
}
function celsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("c-l");
  fahrenheitLink.classList.remove("c-l");
  let newTemp = document.querySelector(".tempTwo");
  newTemp.innerHTML = celtemp;
}
let celtemp = null;

let fahrenheitLink = document.querySelector("#f-l");
fahrenheitLink.addEventListener("click", fahrenheit);
let celsiusLink = document.querySelector("#c-l");
celsiusLink.addEventListener("click", celsius);

search("New York");
