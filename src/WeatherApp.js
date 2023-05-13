import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;

                const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
                const geoCodeResponse = await axios.get(geoCodeUrl);

                if (geoCodeResponse.data.length > 0) {
                    const { lat, lon } = geoCodeResponse.data[0];
                    setLatitude(lat);
                    setLongitude(lon);

                    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                    const weatherResponse = await axios.get(weatherUrl);

                    setWeatherData(weatherResponse.data);
                } else {
                    // Handle case when no coordinates are found for the entered city
                    setLatitude('');
                    setLongitude('');
                    setWeatherData(null);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    return (
        <div>
            <div className='container'>
            <div className='top'>
                <div className='location'>
                    <p>London</p>
                </div>
                <div className='temp'>
                    <h1>12°C</h1>
                </div>
                <div className='description'>
                    <p>Clouds</p>
                </div>
            </div>

            <div className='bottom'>
                <div className='feels'>
                    <p>12°C</p>
                </div>
                <div className='humidity'>
                    <p>20%</p>
                </div>
                <div className='wind'>
                    <p>2 kmph</p>
                </div>
            </div>
            </div>
            {/* <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city name"
            />
            {latitude && longitude && (
                <div>
                    <h2>Coordinates: {latitude}, {longitude}</h2>
                </div>
            )}
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                </div>
            )} */}
        </div>
    );
};

export default WeatherApp;