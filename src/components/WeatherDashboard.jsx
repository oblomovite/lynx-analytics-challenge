import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WeatherDashboard = () => {
  // define state variables
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedVariables, setSelectedVariables] = useState([]);

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
  }, []);

  // helper function to convert between datepicker and open meteo formats
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // define state change handlers
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
    setWeatherData();
    setIsCelsius(!isCelsius);
  };
  const handleVariableSelection = (event) => {
    setWeatherData();
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedVariables(selectedOptions);
  };

  // format open meteo data into something recharts can use 
  const convertObjectToArrayOfObjects = (obj) => {
    const keys = Object.keys(obj);
    const valuesArrays = Object.values(obj);

    const maxLength = Math.max(...valuesArrays.map((arr) => arr.length));

    const result = Array.from({ length: maxLength }, (_, index) => {
      const newObj = {};

      keys.forEach((key, i) => {
        const values = valuesArrays[i];
        newObj[key] = values[index] || null;
      });

      return newObj;
    });

    return result;
  };

  // fetch open meteo data
  const handleSubmit = async (event) => {
    // reset state
    setWeatherData();
    event.preventDefault();
    setLoading(true);
    const date = formatDate(selectedDate);
    const unit = isCelsius ? "celsius" : "fahrenheit";

    try {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast?",
        {
          params: {
            current_weather: "false",
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            timezone: "auto",
            // hourly: "temperature_2m,relativehumidity_2m,apparent_temperature,cloudcover,windspeed_10m,precipitation,snowfall,precipitation_probability,visibility,is_day,snow_depth",
            hourly: selectedVariables.join(","), // Use the selected variables in the API request
            start_date: `${date}`,
            end_date: `${date}`,
            temperature_unit: `${unit}`,
          },
        }
      );
      const hourly = convertObjectToArrayOfObjects(response.data.hourly);
      setWeatherData(hourly);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  return (
    <div className="container inline-flex">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto mt-8 p-4 bg-gray-200 rounded-md shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Weather App</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Latitude</label>
          <input
            required
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
            required
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
              className="sr-only peer"
              checked={isCelsius}
              onChange={toggleTemperature}
            />

            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isCelsius ? "Celsius" : "Fahrenheit"}
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-700">
            Select which weather metrics to display:
          </label>
          <select
            required
            multiple
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={handleVariableSelection}
          >
            <option value="temperature_2m">Temperature</option>
            <option value="precipitation_probability">Chance of Rain</option>
            <option value="precipitation">Precipitation</option>
            <option value="relativehumidity_2m">Humidity</option>
            <option value="windspeed_10m">Wind Speed</option>
            <option value="visibility">Visibility</option>
            <option value="cloudcover">Cloud Cover</option>
            {/* Add more available variables */}
          </select>
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

      {weatherData && selectedVariables.length > 0 && (
        <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={800}
              data={weatherData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <XAxis dataKey={weatherData.time} />
              <YAxis />
              <Legend />
              {selectedVariables.map((variable, index) => (
                <Line
                  key={variable}
                  type="monotone"
                  dataKey={variable}
                  stroke={`#${(index + 1) * 333}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
