import React from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "react-redux";
import WeartherCard from "../../../components/WeatherCard/WeatherCard";
import "./HomePage.css";

function HomePage() {
  const store = useStore();
  const name = store.getState().userReducer.user.name;
  const history = useHistory();

  const serviceOptions = [
    "REQUEST A SERVICE",
    "CHECK REQUEST HISTORY",
    "GO TO SHOP",
  ];

  const cardHistory = (serviceOption) => {
    return (
      <div className="row">
        <div className="col"></div>
        <div className="col-md-8 col-sm-10 space-text-center">
          <div class="card">
            <div class="card-body">{serviceOption}</div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="space-weather-card">
        <WeartherCard></WeartherCard>
      </div>

      <div className="row">
        <div className="col-12 center-service-title">
          <h1 className="greeting-info">Welcome, {name}!</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12 center-service-title">
          <p className="greeting-second">WHAT IS ON YOUR MIND TODAY</p>
        </div>
      </div>

      {serviceOptions.map((serviceOption) => cardHistory(serviceOption))}
    </div>
  );
}

export default HomePage;
