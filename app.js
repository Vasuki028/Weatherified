// async function getWeather() {
//     const city = document.getElementById("city").value;
//     const apiKey = "USE_YOUR_API_KEY";

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     const response = await fetch(url);
//     const data = await response.json();

//     document.getElementById("result").innerHTML =
//         `<h3>${data.name}</h3>
//          <p>Temperature: ${data.main.temp} °C</p>
//          <p>Weather: ${data.weather[0].description}</p>`;
// }

let map;

// Setup map once
function initMap() {
    map = L.map('map').setView([20, 78], 5); // Center on India initially

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}

async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "54cf3d8181a4386dd1f65ca02ed32629";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    const lat = data.coord.lat;
    const lon = data.coord.lon;

    // Move map to the location
    map.setView([lat, lon], 10);

    // Create marker + popup
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`
            <b>${data.name}</b><br>
            Temperature: ${data.main.temp} °C<br>
            Weather: ${data.weather[0].description}
        `)
        .openPopup();
}

// Initialize the map when page loads
initMap();

