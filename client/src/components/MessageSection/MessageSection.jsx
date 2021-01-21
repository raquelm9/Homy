import React, { useState } from "react";
import "./MessageSection.css";
import { useSelector } from "react-redux";
import MessageCard from "../MessageCard/MessageCard";

function MessageSection(props) {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const name = useSelector((state) => state.userReducer.user.name);

  const myChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const showMessageCard = () => {
    return (
      <div className="row">
        <span
          className="test"
          style={{
            width: "auto",
            backgroundColor: "beige",
          }}
        >
          {message}
        </span>
      </div>
    );
  };

  const handleSubmit = (event) => {
    setShowMessage(true);

    event.preventDefault();

    // console.log("User Name", name);
    // console.log("Message", message);
    // console.log("Request Id", props.requestId);
  };

  return (
    <>
      <p className="titles-modal">Comments:</p>

      {showMessage ? showMessageCard() : null}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              className="comment-input-section input-custom-details"
              type="text"
              onChange={myChangeHandler}
            />
          </div>
          <div className="col-2">
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-sm"
            >
              Send
            </button>
          </div>
        </div>
      </form>
      <handleSubmit />
    </>
  );
}

export default MessageSection;
