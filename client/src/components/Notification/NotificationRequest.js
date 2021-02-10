import React, { useState, useEffect } from "react";
import { config } from "../../config/config";
import { Link } from "react-router-dom";
import "./NotificationRequest.css";
const { statusTEXT } = require("../../constants/status");

function NotificationRequest({ match }) {
  const [notification, setNotification] = useState({
    type: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    fetch(
      `${config.SERVER_URL}/api/service-requests/notification/${match.params.token}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => setNotification(data));
  }, [match.params.token]);
  return (
    <div className="notification">
      <div>
        <h3>Hello.</h3>
      </div>
      <div className="messageText">
        <p>
          This update is to let you know that the request about{" "}
          {notification.type} issue has been updated
        </p>
      </div>
      <div className="messageText">
        <p>Description: {notification.description}</p>
      </div>
      <div className="messageText">
        <p>This request status now is {statusTEXT[notification.status]}</p>
      </div>
      <Link to="/login" className="btn-dark btn-lg btn-block button-center">
        Continue
      </Link>
    </div>
  );
}

export default NotificationRequest;
