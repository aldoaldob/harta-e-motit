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

function getWeatherIcon(description) {
  const desc = description.toLowerCase();
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("storm") || desc.includes("thunder")) return "⛈️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("fog") || desc.includes("mist")) return "🌫️";
  if (desc.includes("drizzle")) return "🌦️";
  return "🌈";
}

cities.forEach(city => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const day1 = data.list[0];
      const day2 = data.list[8];
      const day3 = data.list[16];

      const icon1 = getWeatherIcon(day1.weather[0].description);
      const icon2 = getWeatherIcon(day2.weather[0].description);
      const icon3 = getWeatherIcon(day3.weather[0].description);

      const popupContent = `
        <strong>${city.name}</strong><br/>
        Sot: ${icon1} ${day1.main.temp}°C, ${day1.weather[0].description}<br/>
        Nesër: ${icon2} ${day2.main.temp}°C, ${day2.weather[0].description}<br/>
        Pasnesër: ${icon3} ${day3.main.temp}°C, ${day3.weather[0].description}
      `;

      L.marker([city.lat, city.lon])
        .addTo(map)
        .bindPopup(popupContent);
    });
});


  