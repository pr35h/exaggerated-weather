async function getWeather() {
    const location = document.getElementById('location').value;
    const resultDiv = document.getElementById('result');

    if (location === '') {
        resultDiv.innerHTML = 'Please enter a location.';
        return;
    }

    try {
        // i have no idea if my api key here is safe or not but ehhh :skull:
        const geoResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=815aee739add481f96091a61f6b59813`);
        const geoData = await geoResponse.json();

        if (geoData.results.length === 0) {
            resultDiv.innerHTML = 'Location not found. Please try again.';
            return;
        }

        const lat = geoData.results[0].geometry.lat;
        const lng = geoData.results[0].geometry.lng;

        // Get weather data from Open-Meteo API
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current_weather.temperature;
        const description = temperature > 15 ? 'ITS BOILING!!!!' : 'ITS FREEZING!!!!';

        resultDiv.innerHTML = `The temperature in ${geoData.results[0].formatted} is ${temperature}°C. ${description}`;
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching the weather data. Please try again later.';
        console.error('Error:', error);
    }
}
