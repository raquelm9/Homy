import React from "react";
import { config } from "../../config/config";
import MessageSection from "../MessageSection/MessageSection";
import "./ImageModal.css";

function ImageModal(props) {
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
            {props.image ? (
              <img
                src={`${config.SERVER_URL}/${props.image}`}
                className="img-fluid"
                alt="images"
              />
            ) : null}
            <p className="titles-modal">Subject:</p>
            <p> {props.subject}</p>

            <p className="titles-modal">Description:</p>
            <p>{props.description}</p>
            <p className="titles-modal">Reference Number:</p>
            <p>{props.id}</p>
            <hr></hr>
            <MessageSection></MessageSection>
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

export default ImageModal;
