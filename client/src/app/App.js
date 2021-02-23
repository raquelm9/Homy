import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import HomePage from "../pages/Residents/HomePage/HomePage";
import MainPage from "../pages/Residents/MainPage/MainPage";
import ResidentServiceRequest from "../pages/Residents/ResidentServiceRequest/ResidentServiceRequest";
import ResidentRequest from "../pages/Residents/ResidentRequest/ResidentRequest";
import ResidentListRequest from "../pages/Residents/ResidentListRequest/ResidentListRequest";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import { autoLogin, fetchNotificationDone } from "../actions/userActions";
import MngrMainPage from "../pages/BuildingManager/MngrMainPage/MngrMainPage";


import ResidentShopPage from "../pages/Residents/ResidentShopPage/ResidentShopPage";
import CheckoutForm from "../pages/Residents/CheckoutForm/CheckoutForm";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Unauthorized from "../components/Unauthorized/Unauthorized";
// import { selectIsManager } from "../selectors/userSelectors";
import { AppHeader } from "./AppHeader";

import NotificationRequest from '../components/Notification/NotificationRequest';
import NotificationModal from "../components/NotificationModal/NotificationModal";
import CommunityPage from "../pages/Residents/CommunityPage/CommunityPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const loggedIn = useSelector(state => state.userReducer.loggedIn);
  
  useEffect(() => {
    dispatch(autoLogin());
    if (loggedIn) {
      dispatch(fetchNotificationDone());
    }
  }, [dispatch, loggedIn]);



  return (

    <Router>
      <AppHeader />
      <NotificationModal open={user && !user.isManager && user.notification_active} />
      <Switch>

        <Route exact path="/" component={MainPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/community" component={CommunityPage} />
        <Route
          onEnter={() => dispatch(fetchNotificationDone())}
          exact path="/resident-request" component={ResidentRequest} />
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
        <Route path="/register" component={Register} />
        {/* <Route exact path="/mainlogin" component={MainLogin} /> */}
        <Route path="/login" component={Login} />

        <ProtectedRoute path="/manager" component={MngrMainPage} />

        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/shop" component={ResidentShopPage} />
        <Route path="/checkout" component={CheckoutForm} />

        <Route path="/notification/requests/:token" component={NotificationRequest} />

      </Switch>
    </Router>

  );
}

export default App;
