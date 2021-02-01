import React from "react";
import { config } from "../../config/config";
import MessageSection from "../MessageSection/MessageSection";
import "./DetailModal.css";

function DetailModal(props) {
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
            <p className="titles-modal">Subject:</p>
            <p> {props.subject}</p>
            <CheckUnitAndName />{" "}
            {/* Checks if there are unit number and name in props passed */}
            <p className="titles-modal">Status</p>
            <p>{props.status}</p>
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
              <img
                src={`${config.SERVER_URL}/${props.image}`}
                className="img-fluid"
                alt="images"
              />
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
