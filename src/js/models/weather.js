const API_KEY = "d3266cfba0c5344764223d0179b3c0f5";
const API_KEY2 = "62b2f952a4bc5d135f7767b59ec51095";
const site = "https://api.openweathermap.org/data/2.5/weather";

const callbacks = {
  onUpdateWeather: (weather) => {},
};

const curPosition = {};
const weatherData = {};

function updateWeather() {
  if (curPosition.lat === undefined || curPosition.lon === undefined) {
    return;
  }

  const lat = curPosition.lat;
  const lon = curPosition.lon;
  fetch(`${site}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      const city = data.name;
      const text = data.weather[0].main;
      const icon = data.weather[0].icon;
      const temp = data.main.temp;
      weatherData.city = city;
      weatherData.text = text;
      weatherData.icon = icon;
      weatherData.temp = (parseInt(temp) - 273.15).toFixed(1);
      callbacks.onUpdateWeather(weatherData);
    });
}

function onGeoOk(position) {
  const {
    coords: { latitude: lat, longitude: lon },
  } = position;

  curPosition.lat = lat;
  curPosition.lon = lon;
  updateWeather();
}

function onGeoError() {}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
export default {
  title: "Today weather",
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
  getWeather: () => {
    updateWeather();
    return weatherData;
  },
};
