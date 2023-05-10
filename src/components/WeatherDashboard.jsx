import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTemperatureLow, FaTint } from "react-icons/fa";

const WeatherDashboard = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true&daily=temperature_2m_max,temperature_2m_min`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={handleLatitudeChange} />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </label>
        <br />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {
        // TODO debug
      console.log(weatherData)
      }

      {
        // TODO debug
        weatherData &&
      console.log(weatherData.daily)
      }

      {weatherData && (
        <div>
          <h2>Weather Information</h2>
          <div>
            <strong>Temperature:</strong>{" "}
            {weatherData.daily.temperature_2m_min[0]}°C -{" "}
            {weatherData.daily.temperature_2m_max[0]}°C
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
