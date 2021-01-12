import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import MainPage from "../pages/Residents/MainPage/MainPage";
import ResidentRequest from "../pages/Residents/ResidentRequest/ResidentRequest";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/resident-request" component={ResidentRequest} />
      </Switch>
    </Router>
  );
}

export default App;
