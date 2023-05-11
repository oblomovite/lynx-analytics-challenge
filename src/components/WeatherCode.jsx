import React from "react";
import { FaSun, FaCloud, FaCloudSun } from "react-icons/fa";
import {
  BsCloudDrizzle,
  BsCloudRain,
  BsCloudRainHeavy,
  BsCloudSnow,
  BsCloudFog,
  BsCloudy,
} from "react-icons/bs";

const WeatherIcon = ({ wmoCode }) => {
  const getWeatherIcon = (wmoCode) => {
    switch (wmoCode) {
      case 0:
        return <FaSun />;
      case 1:
        return <FaCloudSun />;
      case 2:
        return <FaCloud />;
      case 3:
        return <BsCloudy />;
      case 45:
        return <BsCloudFog />;
      case 48:
        return <BsCloudFog />;
      case 51:
        return <BsCloudDrizzle />;
      case 53:
        return <BsCloudRain />;
      case 55:
        return <BsCloudRainHeavy />;
      case 56:
        return <BsCloudDrizzle />;
      case 57:
        return <BsCloudRain />;
      case 61:
        return <BsCloudDrizzle />;
      case 63:
        return <BsCloudRain />;
      case 65:
        return <BsCloudRainHeavy />;
      case 66:
        return <BsCloudRain />;
      case 67:
        return <BsCloudRainHeavy />;
      case 71:
        return <BsCloudSnow />;
      case 73:
        return <BsCloudSnow />;
      case 75:
        return <BsCloudSnow />;
      case 77:
        return <BsCloudSnow />;
      case 81:
        return <BsCloudDrizzle />;
      case 82:
        return <BsCloudRain />;
      case 83:
        return <BsCloudRainHeavy />;
      case 85:
        return <BsCloudSnow />;
      case 86:
        return <BsCloudSnow />;
      default:
        return null;
    }
  };

  const weatherIcon = getWeatherIcon(wmoCode);

  return <div>
    {weatherIcon}
    </div>;
};

export default WeatherIcon;
