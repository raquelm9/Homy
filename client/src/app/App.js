import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//Pages
import MainPage from "../pages/Residents/MainPage/MainPage";
import ResidentServiceRequest from "../pages/Residents/ResidentServiceRequest/ResidentServiceRequest";
import ResidentRequest from "../pages/Residents/ResidentRequest/ResidentRequest";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/resident-request" component={ResidentRequest} />
        <Route
          exact
          path="/resident-service-request"
          component={ResidentServiceRequest}
        />
      </Switch>
    </Router>
  );
}

export default App;
