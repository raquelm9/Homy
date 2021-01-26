import React from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "react-redux";
import "./HomePage.css";
import HomeCarousel from "../../../components/HomeCarousel/HomeCarousel";

function HomePage() {
  const store = useStore();
  const name = store.getState().userReducer.user.name;
  const history = useHistory();

  //   const goToServiceRequest = () => {
  //     history.push("/resident-request");
  //   };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 center-service-title">
          <h1 className="greeting-info">Welcome, {name}!</h1>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-12">
          <HomeCarousel></HomeCarousel>
        </div>
      </div>

      <div className="row">
        <div className="col"></div>
        <div className="col-12 center-service-title">SITE SERVICES</div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-10">
          <div className="row">
            <div className="col-md-4 col-sm-12 adjust-card-services">
              <div className="spacing-components">
                <i className="far fa-star space-star"></i>
                <p className="service-request-title">Create Service Request</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <button type="button" className="btn btn-dark">
                  Request
                </button>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 adjust-card-services">
              <div className="spacing-components">
                <i className="far fa-star space-star"></i>
                <p className="service-request-title">Service Request History</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <button type="button" className="btn btn-dark">
                  History
                </button>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 adjust-card-services">
              <div className="spacing-components">
                <i className="far fa-star space-star"></i>
                <p className="service-request-title">Create Shopping Request</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <button type="button" className="btn btn-dark">
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div> */}
    </div>
  );
}

export default HomePage;
