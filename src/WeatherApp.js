import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [city, setCity] = useState('Uzhorod');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

        const fetchWeatherData = async () => {
            try {
                const apiKey = 'f368f0713d293c43f48f399695bb6c7e';

                const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
                const geoCodeResponse = await axios.get(geoCodeUrl);

                if (geoCodeResponse.data.length > 0) {
                    const { lat, lon } = geoCodeResponse.data[0];
                    setLatitude(lat);
                    setLongitude(lon);

                    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                    const weatherResponse = await axios.get(weatherUrl);
                    console.log(weatherData);
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

    return (
        <div>
            <div className='input'>
                <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                />
                <button onClick={fetchWeatherData}>Search</button>    
            </div>
            <div className='container'>
            <div className='top'>
                <div className='location'>
                    <p>{weatherData?.name}</p>
                </div>
                <div className='temp'>
                    <h1>{weatherData?.main.temp}°C</h1>
                </div>
                <div className='description'>
                    <p>{weatherData?.weather[0].main}</p>
                </div>
            </div>

            <div className='bottom'>
                <div className='feels'>
                    <p className='bold'>{weatherData?.main.feels_like}°C</p>
                    <p>Feels like</p>
                </div>
                <div className='humidity'>
                    <p className='bold'>{weatherData?.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
                <div className='wind'>
                    <p className='bold'>{weatherData?.wind.speed} km/h</p>
                    <p>Wind speed</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default WeatherApp;