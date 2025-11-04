API_KEY = "079841c7855444b89b2102255250411";

addEventListener("load", (event) => {
  async function getWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Stockholm`;

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
      currentTemp.innerHTML =
        result.current.temp_c + "<span class='degree'>°C</span>";

      const currentCondition = document.createElement("p");
      currentCondition.textContent = result.current.condition.text;

      temperatureContainer.appendChild(currentTemp);
      temperatureContainer.appendChild(currentCondition);

      const currentConditionCode = result.current.condition.code;
      let background = backgrounds[currentConditionCode];

      document.body.style.backgroundImage = "url('images/" + background + "')";
    } catch (error) {
      console.error(error.message);
    }
  }

  getWeather();
});

/* Forecast */
async function getFutureWeather() {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Stockholm&days=3`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const forecastResult = await response.json();
    console.log(forecastResult);

    forecastContainer.innerHTML = "";

    forecastResult.forecast.forecastday.forEach((day) => {
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
  } catch (error) {
    console.error(error.message);
  }
}

getFutureWeather();
