const date = new Date();
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var testing = document.getElementById("testing");
var weatherData = {};
var latitude = 40.69;
var longitude = -99.08;

var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver`;

async function getWeatherData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    weatherData = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

function setWeekDayCards() {
  let firstDay = date.getDay();
  for (let i = 0; i < 5; i++) {
    document.getElementById(`card${i + 1}`).innerText =
      weekDays[(i + firstDay) % 7];
  }
}

function setWeatherUI() {
  for (let i = 0; i < 5; i++) {
    document.getElementById(`card-${i + 1}-text`).innerHTML = `<div>High: ${
      weatherData.daily.temperature_2m_max[i + 1]
    }</div><div>Low: ${weatherData.daily.temperature_2m_min[i + 1]}</div>`;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      updateUI();
    });
  } else {
    alert("Not able to get the current location");
  }
}

function updateUI() {
  console.log(weatherData);
  getWeatherData();
  setWeekDayCards();
  setWeatherUI();
}

//Main Running Stuff
window.onload = () => {
  getWeatherData();
};
updateUI();
