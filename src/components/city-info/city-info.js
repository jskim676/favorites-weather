import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './city-info.css';
import { getWeatherData } from '../api';

const CityInfo = ({ cityCoords }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const cityName = new URLSearchParams(location.search).get('cityName');
    const [weatherData, setWeatherData] = useState(null);
    const [favoritesCity, setFavoritesCity] = useState(false);

    const latitude = cityCoords ? cityCoords.latitude : null;
    const longitude = cityCoords ? cityCoords.longitude : null;

    const goToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await getWeatherData(latitude, longitude);
                setWeatherData(data);
                localStorage.setItem('weatherData', JSON.stringify(data));
            } catch (error) {
                console.log(error);
            }
        };
    
        const storedWeatherData = JSON.parse(localStorage.getItem('weatherData'));
        if (storedWeatherData) {
            setWeatherData(storedWeatherData);
        }
    
        const favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];
        setFavoritesCity(favoritesList.includes(cityName));
    
        if (cityCoords) {
            fetchWeatherData();
        }
    }, [cityCoords, latitude, longitude, cityName]);


    const toggleFavorites = () => {
        const favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];
        const {coord: { lon: longitude, lat: latitude } } = weatherData.weather;
        const cityData = { cityName, latitude, longitude };
        if (favoritesCity) {
            const updatedFavoritesCities = favoritesList.filter(city => city.cityName !== cityName);
            localStorage.setItem('favoritesList', JSON.stringify(updatedFavoritesCities));
        } else {
            const updatedFavoritesCities = [...favoritesList, cityData];
            localStorage.setItem('favoritesList', JSON.stringify(updatedFavoritesCities));
        }
        setFavoritesCity(!favoritesCity);
    };

    return (
        <div className="city-info">
            <div>
                <h2>{cityName}의 정보</h2>
                <p>위도: {latitude}</p>
                <p>경도: {longitude}</p>
            </div>
            <button onClick={toggleFavorites}>
                {favoritesCity ? '즐겨찾기 제거' : '즐겨찾기 추가'}
            </button>
            <button onClick={goToHome}>홈</button>
        </div>
    );
};

export default CityInfo;
