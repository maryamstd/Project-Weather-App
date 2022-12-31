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
  let fTemp = (14 * 9) / 5 + 32;
  let newTemp = document.querySelector(".tempTwo");
  newTemp.innerHTML = Math.round(fTemp);
}

let fahrenheitLink = document.querySelector("#f-l");
fahrenheitLink.addEventListener("click", fahrenheit);

search("New York");
