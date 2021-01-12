import React from "react";
import "./ResidentRequestType.css";

function ResidentRequestType() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="resident-request-title">Request a service</h1>
        </div>
      </div>
      <div className="list-group">
        <div className="row">
          <div className="col-6">
            <a
              href="#"
              className="list-group-item list-group-item-action active"
            >
              Cras justo odio
            </a>
          </div>
          <div className="col-6">
            <a href="#" className="list-group-item list-group-item-action">
              Dapibus ac facilisis in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResidentRequestType;
