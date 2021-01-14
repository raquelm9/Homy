import React, { useState, useEffect } from "react";
import ResidentEachService from "../ResidentEachService/ResidentEachService";
import HttpService from "../../services/http-service";

function ResidentRequestList() {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    new HttpService().getRequests().then(
      (data) => {
        setRequest(data);
      },
      (err) => {}
    );
  };

  function listOfServices(service) {
    console.log(service);
    return (
      <ResidentEachService
        id={service.id}
        type={service.type}
        subject={service.subject}
        description={service.description}
        date={service.date}
      ></ResidentEachService>
    );
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Type</th>
          <th scope="col">Subject</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>{request.map(listOfServices)}</tbody>
    </table>
  );
}

export default ResidentRequestList;
