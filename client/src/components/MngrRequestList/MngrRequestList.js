import { useState, useEffect } from "react";
import MngrEachService from "../MngrEachService/MngrEachService";
import HttpService from "../../services/http-service";
import { table } from "react-bootstrap";

function MngrRequestList() {
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    loadData();
    loadAllData();
  }, []);

  const loadData = () => {
    new HttpService().getRequests().then(
      (data) => {
        setRequests(data);
      },
      (err) => {}
    );
  };

  const loadAllData = () => {
    new HttpService().getAllServiceRequests().then(
      (data) => {
        setAllRequests(data);
      },
      (err) => {}
    );
  };

  const listOfServices = (service, i) => {
    return (
      <MngrEachService
        id={service._id}
        key={service._id}
        requestNumber={i}
        type={service.type}
        subject={service.subject}
        date={service.date}
        image={service.image}
        unit_num={service.unit_num}
        resident_name={service.resident_name}
        description={service.description}
        comments={service.comments}
      />
    );
  };

  return (
    <div>
      <h2>Service Requests</h2>
      <div className="table-responsive">
        <table className="table table-stripped table-hover table-condensed ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Subject</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{allRequests.map(listOfServices)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MngrRequestList;
