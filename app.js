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

function showMessage(message) {
    msg.textContent = message;
    msg.classList.add('visible');
}
  
function clearResults() {
    list.innerHTML = '';
}

function getExistingCity(searchValue) {
    const listItems = Array.from(list.querySelectorAll('.cities li'));
    return listItems.find((item) => {
      const cityName = item.querySelector('.city__name').textContent.toLowerCase();
      const cityCountry = item.querySelector('.city__country').textContent.toLowerCase();
      const [inputCity, inputCountry] = searchValue.toLowerCase().split(',');
  
      if (inputCountry) {
        return cityName === inputCity && cityCountry === inputCountry;
      } else {
        return cityName === inputCity;
      }
    });
}

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (response.ok) {
      return data;
    } else {
      throw new Error(`${data.cod}, ${data.message}`);
    }
  }