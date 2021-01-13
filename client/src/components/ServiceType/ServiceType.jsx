import React from "react";
import { useHistory } from "react-router-dom";

import "./ServiceType.css";

function ServiceType(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/resident-service-request");
  };

  return (
    <div className="col-md-6 col-sm-12">
      <a onClick={handleClick} className="list-group-item size-type">
        <div className="row">
          <div className="col-4">
            <i className={`${props.icon} icon-adjust-size`}></i>
          </div>
          <div className="col-8">
            <p>{props.type}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ServiceType;
