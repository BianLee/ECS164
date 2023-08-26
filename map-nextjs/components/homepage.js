"use client";

import { useState } from "react";
import USMap from "./usmap";
import CityInput from "./cityinput";
import citiesData from "../data/data.json";

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [newCityFound, setNewCityFound] = useState(true);

  const handleCityAdded = (city) => {
    if (getCityCoordinates(city)[0] != 0 && getCityCoordinates(city)[1] != 0) {
      const newCity = { name: city, coordinates: getCityCoordinates(city) };
      setCities((prevCities) => [...prevCities, newCity]);
      console.log(newCity);
    }
  };
  const getCityCoordinates = (cityName) => {
    const city = citiesData.find((city) => city.city === cityName);

    if (city) {
      //  const { latitude, longitude } = city.coordinates;
      const latitude = city.latitude;
      const longitude = city.longitude;
      console.log(latitude);
      setNewCityFound(true);
      return [longitude, latitude];
    } else {
      return [0, 0];
    }

    // Return null if the city is not found

    /* 
    const cityCoordinates = {
      "New York": [-74.0059, 40.7128],
      "Los Angeles": [-118.2437, 34.0522],
      Fresno: [-119.7725868, 36.7468422],

      // Add more city coordinates here
    };
    return cityCoordinates[city] || null;
    */
  };

  return (
    <div>
      <CityInput onCityAdded={handleCityAdded} />
      <USMap cities={cities} />
    </div>
  );
};

export default HomePage;
