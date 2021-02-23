import React, { useEffect } from "react";
import ServiceType from "../../../components/ServiceType/ServiceType";
import { TypesOfServices } from "../../../components/TypesOfServices/TypesOfServices";
import { useHistory } from "react-router-dom";
import { fetchNotificationDone } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../../../components/BackButton/BackButton';

import "./ResidentRequest.css";

function ResidentRequestType() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);

  const typesOfServices = TypesOfServices;

  useEffect(() => {//look if there's DONE notification
    if (isLoggedIn) dispatch(fetchNotificationDone());
  }, []);

  const goToRequestList = () => {
    history.push("/resident-list-request");
  };

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
    <div className="container-fluid">
      <BackButton />
      <div className="row">
        <div className="col-12">
          <h1 style={TITLE_STYLE} className="resident-request-title">REQUEST A SERVICE</h1>
        </div>
      </div>
      <div className="list-group">
        <div className="row content-center">
          {typesOfServices.map(showTypeOptions)}
        </div>
        <div className="row align-items-center">
          <div className="col" />
          <div className="col-md-6 col-sm-12">
            <div
              onClick={goToRequestList}
              className="list-group-item size-type"
            >
              REQUESTED SERVICES
            </div>
          </div>
          <div className="col" />
        </div>
      </div>
    </div>
  );
}

export default ResidentRequestType;

const TITLE_STYLE = {
  marginTop: "0",
  paddingTop: "0"
}