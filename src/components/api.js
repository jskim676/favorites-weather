export const geoApiOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "be2080d1camshcf367130ec12ebfp11f61ajsndfda5ca98fff",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "70135ab8545840dbe1ab0adde9276285";

export const getWeatherData = async (latitude, longitude) => {
    const currentWeatherResponse = await fetch(
        `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    return { weather: currentWeatherData, forecast: forecastData };
};
