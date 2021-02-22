import React, {useEffect} from "react";
import ResidentRequestForm from "../../../components/ResidentRequestForm/ResidentRequestForm";
import { fetchNotificationDone } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import "./ResidentServiceRequest.css";

function ResidentServiceRequest() {

  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {//look if there's DONE notification
    if (isLoggedIn) dispatch(fetchNotificationDone());
  }, []);

  return (
    <div className="container-fluid">
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
