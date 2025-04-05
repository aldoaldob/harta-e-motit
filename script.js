const cities = [
  { name: "Tirana", lat: 41.3275, lon: 19.8189 },
  { name: "Prishtina", lat: 42.6629, lon: 21.1655 },
  { name: "Shkodra", lat: 42.0683, lon: 19.5126 },
  { name: "Durrës", lat: 41.3231, lon: 19.4414 }
];

const apiKey = '00ae0431e834e8a6d4df723da2bca6e9';
const map = L.map('map').setView([41.3275, 19.8189], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markers = [];

function fetchWeather(dayIndex) {
  // Hiq markerët ekzistues
  markers.forEach(marker => map.removeLayer(marker));
  markers.length = 0;

  cities.forEach(city => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const weather = data.list[dayIndex];
        const popupContent = `
          <strong>${city.name}</strong><br/>
          Temperatura: ${weather.main.temp}°C<br/>
          Kushtet: ${weather.weather[0].description}
        `;

        const marker = L.marker([city.lat, city.lon])
          .addTo(map)
          .bindPopup(popupContent);

        markers.push(marker);
      });
  });
}

// Fillimisht shfaq “Sot”
fetchWeather(0);

// Kur klikohet buton
function changeDay(index) {
  fetchWeather(index);
}

  