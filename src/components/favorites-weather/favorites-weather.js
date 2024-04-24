import React, { useState, useEffect } from 'react';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { getWeatherData } from "../api";
import "./favorites-weather.css";

const FavoritesWeather = ({ clickCity }) => {
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];
    const [weatherData, setWeatherData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataForFavorites = async () => {
            const weatherData = {};
            for (const city of favoritesList) {
                const { cityName, latitude, longitude } = city;
                // 위도와 경도가 유효한 값인지 확인
                if (latitude !== null && longitude !== null) {
                    try {
                        const data = await getWeatherData(latitude, longitude);
                        weatherData[cityName] = data;
                    } catch (error) {
                        console.log(`Error fetching weather data for ${cityName}:`, error);
                    }
                } else {
                    console.log(`Invalid latitude or longitude for ${cityName}`);
                }
            }
            setWeatherData(weatherData);
        };

        fetchDataForFavorites();
    }, []);

    const handleCityClick = (cityName) => {
        const city = favoritesList.find(city => city.cityName === cityName);
        if (city) {
            const cityCoords = {
                latitude: city.latitude,
                longitude: city.longitude
            };
            clickCity(cityCoords);
            navigate(`/cityinfo?cityName=${encodeURIComponent(cityName)}`);
        }
    };

    return (
        <div className="favorites-weather">
            <div className="favorites-weather-list">
                {Object.keys(weatherData).map((cityName, index) => (
                    <div key={index} className="favorites-weather-item" onClick={() => handleCityClick(cityName)}>
                        <img className="favorites-weather-icon" alt="weather icon" />
                        <div className="weather-info">
                            <div className="section">
                                <p className="city-info">{cityName}</p>
                                <p className="temperature-info"></p>
                            </div>
                            <p className="time-info"></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesWeather;
