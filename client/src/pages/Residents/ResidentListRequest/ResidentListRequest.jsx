import React from "react";
import ResidentRequestList from "../../../components/ResidentRequestList/ResidentRequestList";

function ResidentListRequest() {
  return (
    <div className="container-fluid">
      <>
        <div className="row">
          <div className="col-12">
            <h1 className="resident-request-title">SERVICE REQUESTED</h1>
          </div>
        </div>
        <ResidentRequestList></ResidentRequestList>
      </>
    </div>
  );
}

export default ResidentListRequest;
