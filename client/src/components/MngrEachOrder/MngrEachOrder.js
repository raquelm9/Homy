import React, { useEffect } from "react";
// import DetailModal from "../DetailModal/DetailModal";
// import { useHistory } from "react-router-dom";

function ResidentEachService(props) {
    // const modalId = `request-${props.id}`;
    // const history = useHistory();
    // const handleOnClick = () => {
    //     fetch(`http://localhost:3008/api/service-requests/${props.id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "x-auth-token": `${localStorage.getItem("token")}`,
    //         },
    //     });
    //     history.go(0);
    // };

    const handleDate = () => {

        let dateObject = new Date(props.date).toLocaleDateString("en-CA", {
            month: 'long',
            day: 'numeric',
            hour: 'numeric'
        });
        return dateObject;
    };

    return (
        <>
            <tr>
                <td>{props.date && handleDate()}</td>
                <td>{props.type}</td>
                <td>{props.name}</td>
                <td>{props.unit}</td>
                {/* <td>
                    <button
                        type="button"
                        className="btn btn-dark"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                    >
                        Details
          </button>
                </td> */}
                {/* <td> */}
                {/* <i className="fas fa-trash-alt" onClick={handleOnClick}></i> */}
                {/* </td> */}
                {/* <td>
                    <DetailModal
                        // id={modalId}
                        image={props.image}
                        subject={props.subject}
                        description={props.description}
                        comments={props.comments}
                    />
                </td> */}
            </tr>
        </>
    );
}

export default ResidentEachService;
