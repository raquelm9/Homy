import React, { useState, useEffect } from "react";
//import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import WeartherCard from "../../../components/WeatherCard/WeatherCard";
import "./HomePage.css";
import { fetchNotificationDone } from "../../../actions/userActions";

function HomePage() {
  const userName = useSelector((state) => state.userReducer.user.name);
  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {//look if there's DONE notification
    if (isLoggedIn) dispatch(fetchNotificationDone());
  }, []);

  const serviceOptions = [
    "GO TO COMMUNITY",
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
    } else if (serviceOption === "GO TO COMMUNITY") {
      history.push("/community");
    }
  };

  const cardHistory = (serviceOption, index) => {
    return (
      <div className="row" key={serviceOption + index}>
        <div className="col"></div>
        <div className="col-md-8 col-sm-10 space-text-center">
          <div
            className="card card-style card-hoover-option"
            onClick={() => ChangeRoute(serviceOption)}
          >
            <div className="card-body card-body-style">{serviceOption}</div>
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
            <h1 className="resident-request-title home-page">
              Welcome, {userName}!
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12 center-service-title">
            <p className="resident-request-title home-page-second">
              WHAT IS ON YOUR MIND TODAY?
            </p>
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
