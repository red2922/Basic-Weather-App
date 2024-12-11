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
const testing = document.getElementById("testing");
let weatherData = {};
let latitude = 40.69;
let longitude = -99.08;

let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver`;

async function getWeatherData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

async function setWeatherData() {
  weatherData = await getWeatherData();
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
    console.log(weatherData.daily.weather_code[i + 1]);
    document.getElementById(`card-${i + 1}-text`).innerHTML = `
<img class="weatherImage" src="${setWeatherPhoto(
      weatherData.daily.weather_code[i + 1]
    )}"/>
<div>High: ${weatherData.daily.temperature_2m_max[i + 1]} °F</div>
<div>Low: ${weatherData.daily.temperature_2m_min[i + 1]} °F</div> `;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      //updateUI();
    });
  } else {
    alert("Not able to get the current location");
  }
}

function setWeatherPhoto(code) {
  if (code <= 2) {
    return "Assets/sun.png";
  } else if (code === 3) {
    return "Assets/cloudy-day.png";
  } else if (code <= 21) {
    return "Assets/rain.png";
  } else if (code <= 50) {
    return "Assets/snowfall.png";
  } else if (code <= 60) {
    return "Assets/windy-rain.png";
  } else {
    return "Assets/sun.png";
  }
}

async function updateUI() {
  await setWeatherData();
  setWeekDayCards();
  setWeatherUI();
}

//Main Running Stuff
updateUI();
