import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ResidentEachService from "../ResidentEachService/ResidentEachService";
import HttpService from "../../services/http-service";

function ResidentRequestList() {
  const [request, setRequest] = useState([]);
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  useEffect(() => {

    if (loggedIn) {
      loadData();
    }
  }, [loggedIn]);

  const loadData = () => {
    new HttpService().getRequests().then(
      (data) => {
        setRequest(data);
      },
      (err) => { }
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
      />
    );
  }

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-md-7">
        <table className="table table-hover margin-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{request.map(listOfServices)}</tbody>
        </table>
      </div>
      <div className="col"></div>
    </div>
  );
}

export default ResidentRequestList;
