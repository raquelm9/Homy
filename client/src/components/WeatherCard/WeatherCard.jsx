import React from "react";
import "./WeatherCard.css";

function WeatherCard() {
  const api = {
    key: "db3f6ff73b4f0cdf3272eb723f1bf455",
    baseurl: "https://api.openweathermap.org/data/2.5/",
  };
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-md-8 col-sm-10">
        <div class="card">
          <div class="card-body">
            <div className="row">
              <div className="col"></div>
              <div className="col-10">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Search for city..."
                  />
                </div>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="city">Northampton, GB</div>
                  <div className="daytime">Sunny</div>

                  <div className="current">
                    <div className="hi-low">
                      13<span>°C</span> / 16<span>°C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="temp">
                  15<span>°C</span>
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
