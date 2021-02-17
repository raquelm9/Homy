import React, { useState, useEffect } from "react";
import DetailModal from "../DetailModal/DetailModal";
import { useHistory } from "react-router-dom";
import HttpService from "../../services/http-service";
import { NEW, VIEWED, statusTEXT } from "../../constants/status";
import { config } from "../../config/config";

function MngrEachService(props) {
  const modalId = `request-${props.id}`;
  const history = useHistory();
  const [status, setStatus] = useState(props.status);
  const [request, setRequest] = useState(props);

  useEffect(() => {
    props.onItemStatusChange(status);
  }, [status]);

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

  const handleOnClickStatus = () => {
    if (status === NEW) {
      console.log("Was 0 changed to 1");
      new HttpService()
        .updateStatusOnRequestAsManager(props.id, VIEWED)
        .then((data) => {
          setStatus(data.status);
        });
    }
  };

  // const handleOnClickStatusFlow = () => {
  //   if (status === VIEWED) {
  //     new HttpService().updateStatusOnRequestAsManager(props.id, 2).then((data) => {
  //       console.log(data)
  //       setStatus(data.status)
  //     })
  //   } else if (status === INPROGRESS) {
  //     new HttpService().updateStatusOnRequestAsManager(props.id, 3).then((data) => {
  //       console.log(data)
  //       setStatus(data.status)
  //     })
  //   } else if (status === DONE) {
  //     new HttpService().updateStatusOnRequestAsManager(props.id, 4).then((data) => {
  //       console.log(data)
  //       setStatus(data.status)
  //     })
  //   } else if (status === VERIFIED) {
  //     new HttpService().updateStatusOnRequestAsManager(props.id, 0).then((data) => {
  //       console.log(data)
  //       setStatus(data.status)
  //     })
  //   }
  // }

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
    fontWeight: "bold",
    // "color" : "white"
  };
  const styleButtonRemove = {
    fontWeight: "bold",
    // "color" :   "#fe7369"
  };

  const ShowBadgeStatus = () => {
    return "Hello";
  };

  return (
    <>
      <tr>
        <th scope="row">{props.requestNumber + 1}</th>
        <td>{handleDate()}</td>
        <td>{props.type}</td>
        <td>{props.subject}</td>
        {/* <td>{showButtonImage()}</td> */}
        <td style={{ verticalAlign: "middle" }}>
          <button
            style={styleButton}
            type="button"
            className="btn btn-dark btn-outline-warning"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
            onClick={handleOnClickStatus}
          >
            Details
          </button>
          <DetailModal
            id={modalId}
            date={handleDate()}
            request={request}
            requestId={props.id}
            image={props.image}
            subject={props.subject}
            description={props.description}
            unit_num={props.unit_num}
            resident_name={props.resident_name}
            comments={props.comments}
            status={status}
            onChangeStatus={(status) => setStatus(status)}
          />
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <i
            className="fas fa-trash-alt fa-lg"
            onClick={handleOnClick}
            id="trashIcon"
          ></i>
          {/* <button style = {styleButtonRemove} className="btn btn-dark btn-outline-danger" onClick={handleOnClick}>
            Remove
          </button> */}
          {/* <td><ImageModal id={modalId} image={props.image} /></td>  */}
        </td>
        <td>
          <ShowBadgeStatus />
          {/* <span onClick={handleOnClickStatusFlow} className="badge bg-secondary">{statusTEXT[status]}</span> */}
          <span className="badge bg-secondary">{statusTEXT[status]}</span>
          {/* <h1>{statusTEXT[status]}</h1> */}
        </td>
      </tr>
    </>
  );
}

export default MngrEachService;
