// DOM elements
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-term");
const msg = document.querySelector(".form-msg");
const list = document.querySelector(".cities");

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputVal = input.value.trim();
  
    if (inputVal === '') {
      showMessage('Please enter a city name');
      return;
    }
  
    const existingCity = getExistingCity(inputVal);
    if (existingCity) {
      showMessage(`You already know the weather for ${existingCity.name} ...otherwise be more specific by providing the country code as well 😉`);
      form.reset();
      input.focus();
      return;
    }
  
    showMessage('Loading...');
    
  
    try {
      const weatherData = await getWeatherData(inputVal);
      displayWeatherData(weatherData);
      form.reset();
      input.focus();
    } catch (error) {
      showMessage('Failed to fetch weather data. Please try again.');
    }
  });