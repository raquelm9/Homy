import React, { useEffect } from "react";
import ResidentRequestList from "../../../components/ResidentRequestList/ResidentRequestList";
import { fetchNotificationDone } from '../../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { FormHelperText } from "@material-ui/core";
import BackButton from '../../../components/BackButton/BackButton';

function ResidentListRequest() {

  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {//look if there's DONE notification
    if (isLoggedIn) dispatch(fetchNotificationDone());
  }, []);

  return (
    <div className="container-fluid">
      <BackButton />
      <div className="row">
        <div className="col-12">
          <h1 style={TITLE_STYLE} className="resident-request-title">SERVICE REQUESTED</h1>
        </div>
      </div>
      <ResidentRequestList></ResidentRequestList>
    </div>
  );
}

export default ResidentListRequest;

const TITLE_STYLE = {
  marginTop: "0",
  paddingTop: "0"
}