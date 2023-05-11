import React from "react";
import {RiCelsiusFill, RiFahrenheitFill} from "react-icons/ri"
import { FaTemperatureHigh, FaTemperatureLow} from "react-icons/fa"
import WeatherCode from './WeatherCode'

const WeatherInfo = ({info}) => {

    // format timezones from B/A to A, B for readability
    const formattedTimezone = (timezone) => {
        const index = timezone.indexOf("/");
        if (index !== -1) {
          const prefix = timezone.slice(0, index)
          const suffix = timezone.slice(index + 1);
          return `${suffix}, ${prefix}`.replace(/_/," ");
        }
        return timezone;
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Weather Information</h2>
      {info ? (
        <div>
          <div className="inline-flex">
            <p className="text-lg font-semibold">
                Timezone: {formattedTimezone(info.timezone)}
                </p>
          </div>
          <br />

            <div className="mb-2 inline-flex">
            <FaTemperatureLow style={{ color: "blue" }} /> 
            Low: {info.daily.temperature_2m_min}
            {info.unit === "celsius" ? <RiCelsiusFill /> : <RiFahrenheitFill />}
            </div>

          <br />
            <div className="mb-2 inline-flex">
            <FaTemperatureHigh style={{ color: "red" }} />
            High: {info.daily.temperature_2m_max}
            {info.unit === "celsius" ? <RiCelsiusFill /> : <RiFahrenheitFill />}
            </div>

          <br />
            <div className="mb-2 inline-flex">
            <p> Weather Condition: </p>
            <span className="ml-2"/>
            <WeatherCode wmoCode={info.daily.weathercode[0]} />
            </div>

          <br />
            <div className="mb-2 inline-flex">
            Chance of Rain: {info.daily.precipitation_probability_mean}%
            </div>

          <br />
          <p>Wind Speed: {info.daily.windspeed_10m_max} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherInfo
