import React from "react";
import ImageModal from "../ImageModal/ImageModal";

function ResidentEachService(props) {
  const modalId = `request-${props.id}`;

  const handleOnClick = () => {
    fetch(`http://localhost:3008/api/service-requests/${props.id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  const handleDate = () => {
    let dateObject = new Date(props.date);
    const canFormat = new Intl.DateTimeFormat("en-CA", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(dateObject);

    return canFormat;
  };

  return (
    <>
      <tr>
        <td>{handleDate()}</td>
        <td>{props.type}</td>

        <td>
          <button
            type="button"
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            Details
          </button>
        </td>
        <td>
          <i className="fas fa-trash-alt" onClick={handleOnClick}></i>
        </td>
      </tr>

      <ImageModal
        id={modalId}
        image={props.image}
        subject={props.subject}
        description={props.description}
      />
    </>
  );
}

export default ResidentEachService;
