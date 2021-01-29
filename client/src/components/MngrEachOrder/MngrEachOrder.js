import React from "react";
// import DetailModal from "../DetailModal/DetailModal";
import { useHistory } from "react-router-dom";

function ResidentEachService(props) {
    // const modalId = `request-${props.id}`;
    const history = useHistory();
    const handleOnClick = () => {
        fetch(`http://localhost:3008/api/shop/orders/${props.id}`, {
            method: "DELETE",
            headers: {
                "x-auth-token": `${localStorage.getItem("token")}`,
            },
        });
        history.go(0);
    };

    const handleDate = () => {

        let dateObject = new Date(props.date).toLocaleDateString("en-CA", {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        return dateObject;
    };

    const styleButton = {
        'fontWeight': 'bold', 
        // "color" : "#eaff00"
        "color" : "white"
    }
    return (
        <>
            <tr>
                <td>{props.date && handleDate()}</td>
                <td>{props.type}</td>
                <td>{props.name}</td>
                <td>{props.unit}</td>
                <td style={{verticalAlign:'middle'}}>
                    <button
                        onClick={handleOnClick}
                        type="button"
                        className="btn btn-dark btn-outline-success"
                    >
                        <span style={styleButton}>Fulfilled</span>
                        </button></td>
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
