import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import FavoritesWeather from './components/favorites-weather/favorites-weather';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CityInfo from './components/city-info/city-info';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AppHomePage />} />
          <Route path="/cityinfo" element={<CityInfo />} />
        </Routes>
    </Router>
  );
}

const AppHomePage = () => {
  return (
    <div className="container">
        <SearchBar/>
        <FavoritesWeather/>
    </div>
  );
};

export default App;
