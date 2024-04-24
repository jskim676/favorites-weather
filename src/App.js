// App.js
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import FavoritesWeather from './components/favorites-weather/favorites-weather';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CityInfo from './components/city-info/city-info';

function App() {
  const [cityCoords, setCityCoords] = useState(null);

  const updateCityCoords = (coords) => {
    setCityCoords(coords);
  };

  const page = (coords) => {
    setCityCoords(coords);
  }



  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <SearchBar updateCityCoords={updateCityCoords} />
            <FavoritesWeather clickCity={page}/>
          </div>
        } />
        <Route path="/cityinfo" element={<CityInfo cityCoords={cityCoords} />} />
      </Routes>
    </Router>
  );
}

export default App;
