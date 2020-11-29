import React from "react";

function WeatherContainer({
  liveTemperature,
  minTemperature,
  maxTemperature,
  flagImage,
  iconImage,
  cityName,
}) {
  return (
    <div className="mainContainer__userContainer">
      <h3 className="mainContainer__cityName">{cityName}</h3>
      <div className="mainContainer__flagContainer">
        <img src={flagImage} alt="" />
      </div>
      <h1 className="mainContainer__liveTemperature">
        <b>{liveTemperature}</b>
        <sup>0</sup>c
      </h1>
      <p className="mainContainer__minTemperature">
        <b>{minTemperature}</b>
        <sup>0</sup>c
      </p>

      <div className="mainContainer__iconContainer">
        <img src={iconImage} alt="" />
      </div>
      <p className="mainContainer__maxTemperature">
        <b>{maxTemperature}</b>
        <sup>0</sup>c
      </p>
    </div>
  );
}

export default WeatherContainer;
