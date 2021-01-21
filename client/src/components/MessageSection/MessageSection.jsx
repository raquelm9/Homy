import React, { useState } from "react";
import "./MessageSection.css";
import { useSelector } from "react-redux";
import MessageCard from "../MessageCard/MessageCard";

function MessageSection(props) {
  const [message, setMessage] = useState("");

  const name = useSelector((state) => state.userReducer.user.name);

  const myChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    <div className="alert alert-primary" role="alert">
      {message}
    </div>;

    // <MessageCard message={message}></MessageCard>;

    // console.log("User Name", name);
    // console.log("Message", message);
    // console.log("Request Id", props.requestId);

    event.preventDefault();
  };

  return (
    <>
      <p className="titles-modal">Comments:</p>
      <div className="alert alert-primary" role="alert">
        Hello
      </div>
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
    </>
  );
}

export default MessageSection;
