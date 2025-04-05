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
  
  cities.forEach(city => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const day1 = data.list[0];
        const day2 = data.list[8];
        const day3 = data.list[16];
  
        const popupContent = `
          <strong>${city.name}</strong><br/>
          📅 Sot: ${day1.main.temp}°C, ${day1.weather[0].description}<br/>
          📅 Nesër: ${day2.main.temp}°C, ${day2.weather[0].description}<br/>
          📅 Pasnesër: ${day3.main.temp}°C, ${day3.weather[0].description}
        `;
  
        L.marker([city.lat, city.lon])
          .addTo(map)
          .bindPopup(popupContent);
      })
      .catch(error => console.error(`Gabim për ${city.name}:`, error));
  });
  