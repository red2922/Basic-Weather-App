const date = new Date();
const longitudeInput = document.getElementById("longitude");
const latitudeInput = document.getElementById("latitude");

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weatherData = {
  daily: {
    weather_code: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
  },
};

async function getWeatherData(lat = 40.69, long = -99.08) {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver`;

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

async function setWeatherData(lat = 40.69, long = -99.08) {
  weatherData = await getWeatherData(lat, long);
}

function setWeekDayCards() {
  let firstDay = date.getDay();
  for (let i = 0; i < 5; i++) {
    document.getElementById(`card${i + 1}`).innerText =
      weekDays[(i + firstDay) % 7];
  }
}

function setWeatherUI() {
  if (!weatherData || !weatherData.daily) {
    console.error("Weather data is not available");
    return;
  }

  for (let i = 0; i < 5; i++) {
    document.getElementById(`card-${i + 1}-text`).innerHTML = `
      <img class="weatherImage" src="${
        setWeatherPhoto(weatherData.daily.weather_code[i + 1]) ||
        "Assets/default.png"
      }"/>
      <div>High: ${
        weatherData.daily.temperature_2m_max[i + 1] || "N/A"
      } °F</div>
      <div>Low: ${
        weatherData.daily.temperature_2m_min[i + 1] || "N/A"
      } °F</div>`;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      updateUI(position.coords.latitude, position.coords.longitude);
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

async function updateUI(lat = 40.69, long = -99.08) {
  console.log(lat);
  console.log(long);
  await setWeatherData(lat, long);
  setWeekDayCards();
  setWeatherUI();
}

async function getInput() {
  var long = longitudeInput.value;
  var lat = latitudeInput.value;

  if (long === "" || lat === "") {
    alert("Your entry is missing data");
  } else {
    await updateUI(lat, long);
  }

  console.log(weatherData);
}

//Main Running Stuff
updateUI();
