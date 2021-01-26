import React from "react";
import { useHistory } from "react-router-dom";

import "./ServiceType.css";

function ServiceType({ type, icon }) {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: "/resident-service-request/",
      search: "type=" + type,
    });
  };

  return (
    <>
      <div className="col-md-5 col-sm-12">
        <div onClick={handleClick} className="list-group-item size-type">
          <div className="row">
            <div className="col-4">
              <i className={`${icon} icon-adjust-size`}></i>
            </div>
            <div className="col-8">
              <p>{type}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceType;
