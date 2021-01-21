import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

//Pages
import MainPage from "../pages/Residents/MainPage/MainPage";
import ResidentServiceRequest from "../pages/Residents/ResidentServiceRequest/ResidentServiceRequest";
import ResidentRequest from "../pages/Residents/ResidentRequest/ResidentRequest";
import ResidentListRequest from "../pages/Residents/ResidentListRequest/ResidentListRequest";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import { autoLogin } from "../actions/userActions";
import MngrMainPage from "../pages/BuildingManager/MngrMainPage/MngrMainPage";

import ResidentNavbar from '../components/Layouts/ResidentNavbar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (

    <Router>
      <ResidentNavbar />
      <Switch>
        <Route exact path="/" component={MainPage} />
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
        <Route exact path="/login" component={Login} />

        <Route path="/manager" component={MngrMainPage} />

      </Switch>
    </Router>

  );
}

export default App;
