import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from './api';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleOnChange = async (selectedOption) => {
        if (selectedOption) {
            const cityName = selectedOption.label.split(',')[0];
            const cityCoords = {
                latitude: selectedOption.value.split(' ')[0],
                longitude: selectedOption.value.split(' ')[1]
            };
            navigate(`/cityinfo?cityName=${encodeURIComponent(cityName)}&latitude=${encodeURIComponent(cityCoords.latitude)}&longitude=${encodeURIComponent(cityCoords.longitude)}`);
        }
    };

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            );
            const responseData = await response.json();
            if (responseData.data) {
                return {
                    options: responseData.data.map((city) => ({
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.country}`
                    }))
                };
            } else {
                return {
                    options: []
                };
            }
        } catch (error) {
            console.error(error);
            return {
                options: []
            };
        }
    };

    return ( 
        <AsyncPaginate 
            placeholder="city"
            onChange={handleOnChange}
            loadOptions={loadOptions}
            debounceTimeout={1000}
        />
    );
};

export default SearchBar;
