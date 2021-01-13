import React from "react";
import ServiceType from "../../../components/ServiceType/ServiceType";
import { TypesOfServices } from "../../../components/TypesOfServices/TypesOfServices";
import "./ResidentRequest.css";

function ResidentRequestType() {
  const typesOfServices = TypesOfServices;

  function showTypeOptions(type) {
    return (
      <ServiceType
        key={type.key}
        icon={type.icon}
        type={type.type}
      ></ServiceType>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="resident-request-title">REQUEST A SERVICE</h1>
        </div>
      </div>
      <div className="list-group">
        <div className="row">{typesOfServices.map(showTypeOptions)}</div>
        <div className="row">
          <div className="col-12">
            <a href="#" className="list-group-item size-type">
              REQUESTED SERVICES
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResidentRequestType;
