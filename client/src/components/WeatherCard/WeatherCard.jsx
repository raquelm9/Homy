import React, { useState, useEffect } from "react";
import "./WeatherCard.css";
import { config } from "../../config/config";

const api = {
  key: config.WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherCard() {
  const [cityc, setCityC] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [daytime, setDayTime] = useState("");

  useEffect(() => {
    fetch(`${api.base}weather?q=${"Calgary"}&units=metric&appid=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then((weather) => {
        setCityC(weather.name);
        setCountry(weather.sys.country);
        setTemperature(weather.main.temp);
        setDayTime(weather.weather[0].main);
        setTempMin(weather.main.temp_min);
        setTempMax(weather.main.temp_max);
      });
  }, []);

  let cityCountry = `${cityc} ${country}`;

  return (
    <>
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
