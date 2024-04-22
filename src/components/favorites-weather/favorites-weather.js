import React, { useState, useEffect } from 'react';
import moment from "moment";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import "./favorites-weather.css"

const FavoritesWeather = () => {
    const [favoritesWeatherList, setFavoritesWeatherList] = useState([]);

    useEffect(() => {
        const fetchDataForLocation = async (location, city) => {
            const [latitude, longitude] = location.split(",");
            try {
                const response = await fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
                const weatherResponse = await response.json();
                return { city, ...weatherResponse };
            } catch (error) {
                console.error("Error fetching weather data:", error);
                return null;
            }
        };

        const fetchFavoritesWeatherData = async () => {
            const favoritesWeatherData = [];
            for (let i = 1; i <= 6; i++) {
                const location = localStorage.getItem(`favorites${i}Location`);
                const city = localStorage.getItem(`favorites${i}City`);
                if (location && city) {
                    const weatherData = await fetchDataForLocation(location, city);
                    favoritesWeatherData.push(weatherData);
                }
            }
            setFavoritesWeatherList(favoritesWeatherData);
        };

        fetchFavoritesWeatherData();
    }, []); 

    const formatTimeForLocation = (timezone) => {
        const timezoneInMinutes = Number(timezone) / 60;
        return moment().utcOffset(timezoneInMinutes).format("A h:mm");
    };

    return (
        <div className="favorites-weather">
            <div className="favorites-weather-list">
                {favoritesWeatherList.map((favoritesWeather, index) => (
                    favoritesWeather && (
                        <div key={index} className="favorites-weather-item">
                            <img className="favorites-weather-icon" src={`icon/clear-day.svg`} alt="weather icon" />
                            <div className="weather-info">
                                <div className="section">
                                    <p className="city-info">{favoritesWeather.city}</p>
                                    <p className="temperature-info">{Math.round(favoritesWeather.main.temp)}°C</p>
                                </div>
                                <p className="time-info">{formatTimeForLocation(favoritesWeather.timezone)}</p>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default FavoritesWeather;
