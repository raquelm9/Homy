import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

//Pages
import HomePage from "../pages/Residents/HomePage/HomePage";
import MainPage from "../pages/Residents/MainPage/MainPage";
import ResidentServiceRequest from "../pages/Residents/ResidentServiceRequest/ResidentServiceRequest";
import ResidentRequest from "../pages/Residents/ResidentRequest/ResidentRequest";
import ResidentListRequest from "../pages/Residents/ResidentListRequest/ResidentListRequest";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import { autoLogin } from "../actions/userActions";
import MngrMainPage from "../pages/BuildingManager/MngrMainPage/MngrMainPage";

import ResidentNavbar from "../components/Layouts/ResidentNavbar";
import ResidentShopPage from "../pages/Residents/ResidentShopPage/ResidentShopPage";
import CheckoutForm from "../pages/Residents/CheckoutForm/CheckoutForm";
import NavbarCommon from "../components/Layouts/MngrNavbar";

import MainLogin from '../pages/Auth/MainLogin';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Unauthorized from '../components/Unauthorized/Unauthorized';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    dispatch(autoLogin());

  }, [dispatch]);

  return (
    <Router>
      {!location.pathname.includes("/manager") && <ResidentNavbar />}
      {location.pathname.includes("/manager") && <NavbarCommon />}
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/resident-request" component={ResidentRequest} />
        <Route
          exact
          path="/resident-service-request"
          component={ResidentServiceRequest}
        />
        <Route
          exact
          path="/resident-list-request"
          component={ResidentListRequest}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/mainlogin" component={MainLogin} />
        <Route exact path="/login" component={Login} />

        <ProtectedRoute path="/manager" user={useSelector(state => state.userReducer.user.isManager)} component={MngrMainPage} />
        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/shop" component={ResidentShopPage} />
        <Route path="/checkout" component={CheckoutForm} />

      </Switch>
    </Router>
  );
}

export default App;
