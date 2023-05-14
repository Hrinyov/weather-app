import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherApp = () => {
    const [city, setCity] = useState('Uzhorod');
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

        const fetchWeatherData = async () => {
            try {
                const apiKey = process.env.REACT_APP_KEY;

                const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
                const geoCodeResponse = await axios.get(geoCodeUrl);

                if (geoCodeResponse.data.length > 0) {
                    const { lat, lon } = geoCodeResponse.data[0];
                    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                    const weatherResponse = await axios.get(weatherUrl);
                    console.log(weatherData);
                    setWeatherData(weatherResponse.data);
                } else {
                    setWeatherData(null);
                }
            } catch (error) {
                console.log(error);
            }
        };
    useEffect(() => {
        fetchWeatherData();
    }, []); 

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
                    {weatherData ? (
                    <>
                    <div className='location'>
                        <p>{weatherData.name}</p>
                    </div>
                    <div className='temp'>
                        <h1>{weatherData.main.temp.toFixed(1)}°C</h1>
                    </div>
                    <div className='description'>
                        <p>{weatherData.weather[0].main}</p>
                        <p className='descript'>{weatherData.weather[0].description}</p>
                    </div>
                    </>
                    ) : (
                    <div className='location'>
                        <p>No weather data available</p>
                    </div>
                    )}
            </div>

            <div className='bottom'>
                <div className='feels'>
                    <p className='bold'>{weatherData?.main.feels_like.toFixed(1)}°C</p>
                    <p>Feels like</p>
                </div>
                <div className='humidity'>
                    <p className='bold'>{weatherData?.main.humidity.toFixed(1)}%</p>
                    <p>Humidity</p>
                </div>
                <div className='wind'>
                    <p className='bold'>{weatherData?.wind.speed.toFixed(1)} km/h</p>
                    <p>Wind speed</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default WeatherApp;