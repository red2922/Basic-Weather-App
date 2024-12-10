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

const url =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver";

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

getWeatherData();

function tryingStuff() {
  setWeekDayCards();
  console.log(weatherData);
  testing.innerHTML = `<div>${weatherData.daily.temperature_2m_max[0]}</div>`;
}
