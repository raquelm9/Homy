import React, { useEffect } from "react";
import ResidentRequestList from "../../../components/ResidentRequestList/ResidentRequestList";
import { fetchNotificationDone } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

function ResidentListRequest() {

  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {//look if there's DONE notification
    if (isLoggedIn) dispatch(fetchNotificationDone());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="resident-request-title">SERVICE REQUESTED</h1>
        </div>
      </div>
      <ResidentRequestList></ResidentRequestList>
    </div>
  );
}

export default ResidentListRequest;
