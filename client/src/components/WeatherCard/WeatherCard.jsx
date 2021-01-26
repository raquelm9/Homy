import React, { useState } from "react";
import "./WeatherCard.css";

function WeatherCard() {
  const [city, setCity] = useState("");
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

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getResults(city);
  };

  const getResults = (query) => {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
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
    <div className="row">
      <div className="col"></div>
      <div className="col-md-8 col-sm-10">
        <div className="card">
          <div className="card-body">
            <h1 className="center-title">Weather</h1>
            <div className="row">
              <div className="col"></div>
              <div className="col-md-10 col-sm-12">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Search for city..."
                      value={city}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-8">
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
              <div className="col-4">
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
  );
}

export default WeatherCard;
