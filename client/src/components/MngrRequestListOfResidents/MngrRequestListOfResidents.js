import { useState, useEffect } from "react";
// import MngrEachService from "../MngrEachService/MngrEachService";
import HttpService from "../../services/http-service";
import MngrEachResident from "../MngrEachResident/MngrEachResident";
// import {table} from 'react-bootstrap';

function MngrRequestListOfResidents() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    new HttpService().getResidents().then(
      (data) => {
        console.log(data);
        setResidents(data);
      },
      (err) => {}
    );
  };

  const listOfResidents = (resident, i) => {
    return (
      <MngrEachResident
        id={resident._id}
        key={resident._id}
        residentNumber={i}
        residentName={resident.name}
        residentEmail={resident.email}
        residentUnit={resident.unit_num}
      />
    );
  }

  return (
    <div className="table-responsive">
    <table className="table table-bordered table-hover table-condensed ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Unit</th>
          <th scope="col">Email</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>{residents.map(listOfResidents)}</tbody>
    </table>
    </div>
  );
}

export default MngrRequestListOfResidents;
