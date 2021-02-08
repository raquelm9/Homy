import React, { useState, useEffect } from "react";
import { config } from "../../config/config";
import MessageSection from "../MessageSection/MessageSection";
import "./DetailModal.css";
import { VIEWED, INPROGRESS, DONE, statusTEXT } from "../../constants/status";
import { useSelector } from "react-redux";
import HttpService from "../../services/http-service";

function DetailModal(props) {
  const currentUser = useSelector((state) => state.userReducer.user);

  const handleClickChangeStatus = () => {
    switch (props.status) {
      case VIEWED:
        new HttpService()
          .updateStatusOnRequestAsManager(props.request.id, INPROGRESS)
          .then((data) => {
            props.onChangeStatus(data.status);
            console.log(data);
          });
        break;
      case INPROGRESS:
        new HttpService()
          .updateStatusOnRequestAsManager(props.request.id, DONE)
          .then((data) => {
            props.onChangeStatus(data.status);
          });
        break;
      default:
        break;
    }
  };

  const CheckUnitAndName = () => {
    if (props.unit_num) {
      return (
        <>
          <p className="titles-modal">Unit:</p>
          <p> {props.unit_num}</p>

          <p className="titles-modal">Requested by:</p>
          <p> {props.resident_name}</p>
        </>
      );
    } else {
      return null;
    }
  };

  const getImagePath = () => {
    if (props.image.includes("http")) {
      return props.image;
    }

    return `${config.SERVER_URL}/${props.image}`;
  };

  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Service Requested Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="titles-modal">Status:</p>
            <p> {statusTEXT[props.status]}</p>
            {currentUser.isManager &&
              (props.status === VIEWED || props.status === INPROGRESS) && (
                <>
                  <p className="titles-modal">Change Status To:</p>
                  <button
                    type="button"
                    className="btn-dark btn-sm"
                    //
                    onClick={() => handleClickChangeStatus()}
                  >
                    {statusTEXT[props.status + 1]}
                  </button>
                </>
              )}
            <p className="titles-modal">Subject:</p>
            <p> {props.subject}</p>
            <CheckUnitAndName />{" "}
            {/* Checks if there are unit number and name in props passed */}
            {/* <p className="titles-modal">props.</p>
            <p>{props.props.}</p> */}
            <p className="titles-modal">Description:</p>
            <p>{props.description}</p>
            <p className="titles-modal">Reference Number:</p>
            <p>{props.id}</p>
            <hr></hr>
            <MessageSection
              comments={props.comments}
              requestId={props.id}
            ></MessageSection>
            <br></br>
            {props.image ? (
              <img src={getImagePath()} className="img-fluid" alt="images" />
            ) : null}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
