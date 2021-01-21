import React from "react";
import DetailModal from "../DetailModal/DetailModal";

function MngrEachService(props) {
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

  const showButtonImage = () => {
    if (props.image) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          Image
        </button>
      );
    }
  };

  return (
    <>
      <tr>
        <th scope="row">{props.requestNumber + 1}</th>
        <td>{handleDate()}</td>
        <td>{props.type}</td>
        <td>{props.subject}</td>
        <td>{showButtonImage()}</td>
        <td>
          <button className="btn btn-secondary" onClick={handleOnClick}>
            Delete
          </button>
        </td>
        <td>
          <DetailModal id={modalId} image={props.image} />
        </td>
      </tr>
    </>
  );
}

export default MngrEachService;
