import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTemperatureLow, FaTint } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


const WeatherDashboard = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCelsius, setIsCelsius] = useState(true);

  // auto populate longitude and latitude using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [latitude, longitude]);

  // helper function to convert between datepicker and open meteo formats
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };


  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const date = formatDate(selectedDate);

    const unit = isCelsius ? "celsius" : "fahrenheit";
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true&daily=temperature_2m_max,temperature_2m_min&start_date=${date}&end_date=${date}&temperature_unit=${unit}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto mt-8 p-4 bg-gray-200 rounded-md shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Weather App</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Latitude</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={latitude}
            onChange={handleLatitudeChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Longitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date</label>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="p-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              checked={isCelsius}
              onChange={toggleTemperature}
            />

            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isCelsius ? "Celsius" : "Fahrenheit"}
            </span>
          </label>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Get Weather
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && weatherData.daily && (
        <div>
          <h2>Weather Information</h2>
          <div>
            <strong>Temperature:</strong>{" "}
            {weatherData.daily.temperature_2m_min[0]}
            {isCelsius ? "°C" : "°F"} -{" "}
            {weatherData.daily.temperature_2m_max[0]}
            {isCelsius ? "°C" : "°F"}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
