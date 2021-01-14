import React from "react";
import ResidentRequestForm from "../../../components/ResidentRequestForm/ResidentRequestForm";
import "./ResidentServiceRequest.css";

function ResidentServiceRequest() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="resident-request-title">PLEASE PROVIDE DETAILS</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ResidentRequestForm></ResidentRequestForm>
        </div>
      </div>
    </div>
  );
}

export default ResidentServiceRequest;
