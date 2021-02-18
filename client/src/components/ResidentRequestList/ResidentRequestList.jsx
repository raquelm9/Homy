import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ResidentEachService from "../ResidentEachService/ResidentEachService";
import HttpService from "../../services/http-service";
import { Link } from "react-router-dom";

function ResidentRequestList() {
  const [request, setRequest] = useState([]);
  const [fetched, setFetched] = useState(false);
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      loadData();
    }
  }, [loggedIn]);

  const loadData = () => {
    new HttpService().getRequests().then(
      (data) => {
        setRequest(data);
        setFetched(true);
      },
      (err) => {}
    );
  };

  const startNewRequestOrShowRequests = () => {
    if (!fetched) {
      return null;
    }

    if (request.length === 0) {
      return (
        <div className="alert alert-danger" role="alert">
          You have no service requested.{" "}
          <Link to={"/resident-request"} className="alert-link"></Link>
          <a href="/resident-request">Click here</a> if you would like to
          request a new service.
        </div>
      );
    }

    return (
      <>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Details</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{request.map(listOfServices)}</tbody>
      </>
    );
  };

  function listOfServices(service) {
    return (
      <ResidentEachService
        id={service._id}
        key={service._id}
        type={service.type}
        subject={service.subject}
        description={service.description}
        date={service.date}
        image={service.image}
        comments={service.comments}
        status={service.status}
      />
    );
  }

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-md-7">
        <table className="table table-hover margin-table">
          {startNewRequestOrShowRequests()}
        </table>
      </div>
      <div className="col"></div>
    </div>
  );
}

export default ResidentRequestList;
