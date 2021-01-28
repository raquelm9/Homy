import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

import ResidentShopPage from "../pages/Residents/ResidentShopPage/ResidentShopPage";
import CheckoutForm from "../pages/Residents/CheckoutForm/CheckoutForm";

import MainLogin from "../pages/Auth/MainLogin";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Unauthorized from "../components/Unauthorized/Unauthorized";
// import { selectIsManager } from "../selectors/userSelectors";
import { AppHeader } from "./AppHeader";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (

    <Router>
      <AppHeader />
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

        <ProtectedRoute path="/manager" component={MngrMainPage} />

        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/shop" component={ResidentShopPage} />
        <Route path="/checkout" component={CheckoutForm} />
      </Switch>
    </Router>

  );
}

export default App;
