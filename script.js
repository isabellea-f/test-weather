const searchField = document.getElementById("search-field");
const submitButton = document.getElementById("submit-button");
const locationContainer = document.querySelector(".location-container");
const temperatureContainer = document.querySelector(".temperature-container");
const forecastContainer = document.querySelector(".forecast-container");
const prevContainer = document.getElementById("search-cont");

const API_KEY = "079841c7855444b89b2102255250411";

const backgrounds = {
  1000: "sun.jpg",

    
    1003: "partlyCloudy.jpg",
    1006: "cloudy.jpg",
    1009: "overcast.jpg",


    1030: "mist.jpg",
    1063: "rainycloud.jpg",
    1066: "rainycloud.jpg",
    1069: "rainycloud.jpg",
    1072:"rainycloud.jpg",

    1087: "stormy.jpg",
    1114: "snowy.jpg",
    1117: "snowy.jpg",
    1135: "foggy.jpg",
    1147: "foggy.jpg",

    1150: "rain.jpg",
    1153: "rain.jpg",
    1168: "rain.jpg",
    1171: "rain.jpg",
    1180: "rain.jpg",
    1183: "rain.jpg",
    1186: "rain.jpg",
    1189: "rain.jpg",
    1192: "rain.jpg",
    1195: "rain.jpg",
    1198: "rain.jpg",
    1201: "rain.jpg",
    1204: "rain.jpg",
    1207: "rain.jpg",
    
    1210: "snowy.jpg",
    1213: "snowy.jpg",
    1216: "snowy.jpg",
    1219: "snowy.jpg",
    1222: "snowy.jpg",
    1225: "snowy.jpg",
    1237: "icy.jpg",
    1240: "rain.jpg",
    1243: "rain.jpg",
    1246: "rain.jpg",
    1249: "rain.jpg",
    1252: "rain.jpg",
    1255: "snow.jpg",
    1258: "snow.jpg",
    1261: "rain.jpg",
    1264: "rain.jpg",
    1273: "rain.jpg",
    1276: "stormy.jpg",
    1279: "snowy.jpg",
    1282: "snowy.jpg"
};

function submit(event) {
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter")
  ) {
    event.preventDefault();
    city = searchField.value;
    console.log(city);
    getWeather(city);
    getFutureWeather(city);
  }
}

submitButton.addEventListener("click", submit);
searchField.addEventListener("keydown", submit);

/* Location on load */
const options = {
  minimumAge: 0, //dont use cached results, refresh position
  enableHighAccuracy: false, //faster, less precise position
  timeout: 15000, //max time before error callback
};

const success = (pos) => {
  const coords = pos.coords;
  getWeatherByLocation(coords.latitude, coords.longitude);
};

const error = (err) => {
  console.log(err);
};

navigator.geolocation.getCurrentPosition(success, error, options);
async function getWeatherByLocation(lat, long) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();

    renderWeather(result);
    getFutureWeather(`${lat},${long}`);
  } catch (error) {
    console.error(error.message);
  }
}

/* Current weather */
async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    renderWeather(result);
  } catch (error) {
    console.error(error.message);
  }
}

/* Render current weather to DOM */
function renderWeather(result) {
  locationContainer.innerHTML = "";
  temperatureContainer.innerHTML = "";

  console.log(result);

  const cityName = document.createElement("h2");
  cityName.textContent = result.location.name;

  const cityRegion = document.createElement("h3");
  cityRegion.textContent = result.location.region;

  const cityCountry = document.createElement("p");
  cityCountry.textContent = result.location.country;

  locationContainer.appendChild(cityName);
  locationContainer.appendChild(cityRegion);
  locationContainer.appendChild(cityCountry);

  const currentTemp = document.createElement("p");
  currentTemp.classList.add("current-temp");
  currentTemp.innerHTML =
    result.current.temp_c + "<span class='degree'>°C</span>";

  const currentCondition = document.createElement("p");
  currentCondition.textContent = result.current.condition.text;

  temperatureContainer.appendChild(currentTemp);
  temperatureContainer.appendChild(currentCondition);

  /* Dynamic background */
  const currentConditionCode = result.current.condition.code;
  let background = backgrounds[currentConditionCode];

  document.body.style.backgroundImage = "url('images/" + background + "')";

  new Searched(result.location.name, background);
}

/* Fetch forecast */
async function getFutureWeather(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const forecastResult = await response.json();
    console.log(forecastResult);
    renderForecast(forecastResult);
  } catch (error) {
    console.error(error.message);
  }
}

/* Render forecast to DOM */
function renderForecast(result) {
  forecastContainer.innerHTML = "";

  result.forecast.forecastday.forEach((day) => {
    const forecastDate = document.createElement("p");
    forecastDate.textContent = day.date;

    const forecastCondition = document.createElement("p");
    forecastCondition.textContent = day.day.condition.text;

    const forecastIcon = document.createElement("img");
    forecastIcon.src = "https:" + day.day.condition.icon;

    const forecastTemp = document.createElement("p");
    forecastTemp.textContent = day.day.avgtemp_c;

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.appendChild(forecastDate);
    forecastCard.appendChild(forecastIcon);
    forecastCard.appendChild(forecastCondition);
    forecastCard.appendChild(forecastTemp);

    forecastContainer.appendChild(forecastCard);
  });
}

/* Previous searches */
class Searched {
  constructor(city, background) {
    const el = document.createElement("div");
    el.classList.add("prev-searched");
    el.textContent = city;
    el.style.backgroundImage = "url('images/" + background + "')";
    el.style.backgroundSize = "cover";
    el.style.color = "white";

    el.addEventListener("click", () => {
      getWeather(city);
      getFutureWeather(city);
    });

    document.getElementById("search-cont").append(el);
  }
}
