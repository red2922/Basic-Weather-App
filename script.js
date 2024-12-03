const card1 = document.getElementById("card1");
const weatherData = {};

async function getWeatherData() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver";
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


console.log(weatherData);

card1.textContent = `${weatherData.daily.time[0]}`;