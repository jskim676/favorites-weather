import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './city-info.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../api';

const CityInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cityName = new URLSearchParams(location.search).get('cityName');
    const latitude = new URLSearchParams(location.search).get('latitude');
    const longitude = new URLSearchParams(location.search).get('longitude');

    const goToHome = () => {
        navigate('/');
    };

    const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        console.log(weatherResponse);
        console.log(forecastResponse)
        })
        .catch((err) => console.log(err));

    return (
        <div className="city-info">
            <div>
                <h2>{cityName}의 정보</h2>
                <p>위도: {latitude}</p>
                <p>경도: {longitude}</p>
            </div>
            <button onClick={goToHome}>홈</button>
        </div>
    );
};

export default CityInfo;
