import React from "react";
import DetailModal from "../DetailModal/DetailModal";
import { useHistory, useLocation } from "react-router-dom";


function MngrEachService(props) {
  const modalId = `request-${props.id}`;
  const history = useHistory();
  const location = useLocation();
  const handleOnClick = () => {
    
    fetch(`http://localhost:3008/api/service-requests/${props.id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });
    history.go(0);
  };

  const handleDate = () => {
    let dateObject = new Date(props.date);
    const canFormat = new Intl.DateTimeFormat("en-CA", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(dateObject);

    return canFormat;
  };

  // const showButtonImage = () => {
  //   if (props.image) {
  //     return (
  //       <button
  //         type="button"
  //         className="btn btn-primary"
  //         data-bs-toggle="modal"
  //         data-bs-target={`#${modalId}`}
  //       >
  //         Image
  //       </button>
  //     );
  //   }
  // };

  const styleButton = {
    'fontWeight': 'bold', 
    // "color" : "white"
}
const styleButtonRemove = {
  'fontWeight': 'bold', 
  // "color" :   "#fe7369"

}

  return (
    <>
      <tr>
        <th scope="row">{props.requestNumber + 1}</th>
        <td>{handleDate()}</td>
        <td>{props.type}</td>
        <td>{props.subject}</td>
        {/* <td>{showButtonImage()}</td> */}
        <td style={{verticalAlign:'middle'}}>
          <button
            style = {styleButton}
            type="button"
            className="btn btn-dark btn-outline-warning"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            Details
          </button>
          <DetailModal
            id={modalId}
            image={props.image}
            subject={props.subject}
            description={props.description}
            unit_num={props.unit_num}
            resident_name={props.resident_name}
            comments={props.comments}
          />
        </td>
        <td style={{verticalAlign:'middle'}}>
        <i className="fas fa-trash-alt fa-lg" onClick={handleOnClick} id="trashIcon"></i>
          {/* <button style = {styleButtonRemove} className="btn btn-dark btn-outline-danger" onClick={handleOnClick}>
            Remove
          </button> */}
          {/* <td><ImageModal id={modalId} image={props.image} /></td> */}
        </td>
        <td>

        </td>
      </tr>
    </>
  );
}

export default MngrEachService;
