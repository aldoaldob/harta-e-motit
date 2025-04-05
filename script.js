const cities = [
  { name: "Tirana", lat: 41.3275, lon: 19.8189 },
  { name: "Prishtina", lat: 42.6629, lon: 21.1655 },
  { name: "Shkodra", lat: 42.0683, lon: 19.5126 },
  { name: "Durrës", lat: 41.3231, lon: 19.4414 },
  { name: "Gjirokastër", lat: 40.0758, lon: 20.1389 },
  { name: "Elbasan", lat: 41.1125, lon: 20.0821 },
  { name: "Vlorë", lat: 40.4667, lon: 19.4897 },
  { name: "Berat", lat: 40.7058, lon: 19.9522 }
];

const apiKey = '00ae0431e834e8a6d4df723da2bca6e9';
let selectedDayIndex = 0;

const map = L.map('map').setView([41.3275, 19.8189], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function changeDay(index) {
  selectedDayIndex = index;
  loadWeatherData();
}

function showDetails(cityName, forecastList) {
  const modal = document.getElementById("weatherModal");
  const cityTitle = document.getElementById("modalCityName");
  const modalDetails = document.getElementById("modalDetails");

  cityTitle.innerText = `Detajet për ${cityName}`;
  modalDetails.innerHTML = "";

  forecastList.forEach(item => {
    const hour = new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    modalDetails.innerHTML += `
      <div style="margin-bottom: 10px;">
        <strong>${hour}</strong> - 🌡️ ${item.main.temp}°C - ${item.weather[0].description}
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
      </div>
    `;
  });

  modal.classList.remove("hidden");
}

document.querySelector(".close").onclick = () => {
  document.getElementById("weatherModal").classList.add("hidden");
};

function loadWeatherData() {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  cities.forEach(city => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const forecastList = data.list;
        const dayIndex = selectedDayIndex * 8;
        const current = forecastList[dayIndex];

        const icon = current.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

        const popupContent = `
          <strong>${city.name}</strong><br/>
          <img src="${iconUrl}" alt="weather icon"><br/>
          🌡️ ${current.main.temp}°C, ${current.weather[0].description}<br/>
          <button onclick='showDetails("${city.name}", ${JSON.stringify(forecastList.slice(dayIndex, dayIndex + 8))})'>
            Shfaq detajet
          </button>
        `;

        L.marker([city.lat, city.lon])
          .addTo(map)
          .bindPopup(popupContent);
      });
  });
}

loadWeatherData();




  