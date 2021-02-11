import React from "react";
import DetailModal from "../DetailModal/DetailModal";
import { useHistory } from "react-router-dom";
import { statusTEXT } from "../../constants/status";
import { config } from "../../config/config";
import "./ResidentEachService.css";

function ResidentEachService(props) {
  const modalId = `request-${props.id}`;
  const history = useHistory();
  const handleOnClick = async () => {
    await fetch(`${config.SERVER_URL}/api/service-requests/${props.id}`, {
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

  return (
    <>
      <tr>
        <td className="font-adjustment">{props.type}</td>
        <td className="font-adjustment">
          {props.status ? statusTEXT[props.status] : null}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-dark btn-sm"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            Details
          </button>
        </td>
        <td>
          <i className="fas fa-trash-alt" onClick={handleOnClick}></i>
        </td>
        <td>
          <DetailModal
            id={modalId}
            image={props.image}
            subject={props.subject}
            description={props.description}
            comments={props.comments}
            status={props.status}
            date={handleDate()}
          />
        </td>
      </tr>
    </>
  );
}

export default ResidentEachService;
