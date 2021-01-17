import React from "react";
import ImageModal from "../ImageModal/ImageModal";

function ResidentEachService(props) {
  const modalId = `request-${props.id}`;

  return (
    <>
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.date}</td>
        <td>{props.type}</td>
        <td>{props.subject}</td>
        <td>{props.description}</td>

        <td>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            Image
          </button>
        </td>
      </tr>

      <ImageModal id={modalId} image={props.image} />
    </>
  );
}

export default ResidentEachService;
