import React, { useState } from "react";
import "./MessageSection.css";
import { useSelector } from "react-redux";
import MessageCard from "../MessageCard/MessageCard";

function MessageSection(props) {
  const globalMessages = ["a", "b", "c"];
  const [message, setMessage] = useState("");

  // const name = useSelector((state) => state.userReducer.user.name);

  const myChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const ShowMessageCard = (props) => {
    return props.messageArray.map((msg) => (
      <div className="row">
        <span
          className="test"
          style={{
            width: "auto",
            backgroundColor: "beige",
          }}
        >
          {msg}
        </span>
      </div>
    ));
  };

  const handleSubmit = (event) => {
    globalMessages.push(message);
    setMessage("");
    event.preventDefault();

    // console.log("User Name", name);
    // console.log("Message", message);
    // console.log("Request Id", props.requestId);
  };
  return (
    <>
      <p className="titles-modal">Comments:</p>

      <ShowMessageCard messageArray={globalMessages} />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              className="comment-input-section input-custom-details"
              type="text"
              value={message}
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
