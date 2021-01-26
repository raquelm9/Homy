import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import WeartherCard from "../../../components/WeatherCard/WeatherCard";
import "./HomePage.css";

function HomePage() {
  const userName = useSelector((state) => state.userReducer.user.name);
  const history = useHistory();

  const serviceOptions = [
    "REQUEST A SERVICE",
    "CHECK REQUEST HISTORY",
    "GO TO SHOP",
  ];

  const ChangeRoute = (serviceOption) => {
    if (serviceOption === "REQUEST A SERVICE") {
      history.push("/resident-request");
    } else if (serviceOption === "CHECK REQUEST HISTORY") {
      history.push("/resident-list-request");
    } else if (serviceOption === "GO TO SHOP") {
      history.push("/shop");
    }
  };

  const cardHistory = (serviceOption, index) => {
    return (
      <div className="row" key={serviceOption + index}>
        <div className="col"></div>
        <div className="col-md-8 col-sm-10 space-text-center">
          <div className="card" onClick={() => ChangeRoute(serviceOption)}>
            <div className="card-body">{serviceOption}</div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="space-weather-card">
          <WeartherCard></WeartherCard>
        </div>

        <div className="row">
          <div className="col-12 center-service-title">
            <h1 className="greeting-info">Welcome, {userName}!</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12 center-service-title">
            <p className="greeting-second">WHAT IS ON YOUR MIND TODAY?</p>
          </div>
        </div>

        {serviceOptions.map((serviceOption, index) =>
          cardHistory(serviceOption, index)
        )}
      </div>
    </>
  );
}

export default HomePage;
