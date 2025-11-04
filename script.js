const searchField = document.getElementById("search-field");
const submitButton = document.getElementById("submit-button");
const locationContainer = document.querySelector(".location-container");
const temperatureContainer = document.querySelector(".temperature-container");

let city = "";

submitButton.addEventListener("click", () => {
  city = searchField.value;
  console.log(city);
  getWeather();
});

API_KEY = "079841c7855444b89b2102255250411";

async function getWeather() {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    locationContainer.innerHTML = "";
    temperatureContainer.innerHTML = "";

    const result = await response.json();
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
    currentTemp.textContent = result.current.temp_c;

    const currentCondition = document.createElement("p");
    currentCondition.textContent = result.current.condition.text;

    temperatureContainer.appendChild(currentTemp);
    temperatureContainer.appendChild(currentCondition);
  } catch (error) {
    console.error(error.message);
  }
}
