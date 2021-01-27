import React, { useState } from "react";
import "./WeatherCard.css";

function WeatherCard() {
  const [cityc, setCityC] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [daytime, setDayTime] = useState("");

  const api = {
    key: "db3f6ff73b4f0cdf3272eb723f1bf455",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const getResults = (city) => {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  };

  const displayResults = (weather) => {
    console.log(weather);
    setCityC(weather.name);
    setCountry(weather.sys.country);
    setTemperature(weather.main.temp);
    setDayTime(weather.weather[0].main);
    setTempMin(weather.main.temp_min);
    setTempMax(weather.main.temp_max);
  };

  let cityCountry = `${cityc} ${country}`;

  return (
    <>
      {getResults("Calgary")}
      <div className="row">
        <div className="col"></div>
        <div className="col-md-8 col-sm-10">
          <div className="card card-margin">
            <div className="card-body">
              <div className="row">
                <div className="col-6 space-content">
                  <div className="row">
                    <div className="city">{cityCountry}</div>
                    <div className="daytime">{daytime}</div>

                    <div className="current">
                      <div className="hi-low">
                        {tempMax} {!!tempMax && <span>°C / </span>} {tempMin}
                        {!!tempMin && <span>°C</span>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 center-temp">
                  <div className="temp">
                    {temperature} {!!temperature && <span>°C</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default WeatherCard;
