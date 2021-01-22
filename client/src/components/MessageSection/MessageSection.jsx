import React, { useState } from "react";
import "./MessageSection.css";
import { useSelector } from "react-redux";
import MessageCard from "../MessageCard/MessageCard";

function MessageSection(props) {
  // const globalMessages = ["a", "b", "c"];
  // const [message, setMessage] = useState("");


  const [newMessage, setNewMessage] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);

  const myChangeHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    setCurrentMessages((currentMessages) => [...currentMessages, newMessage]);
    setNewMessage('');
    event.preventDefault();
  };

  const ShowMessageCard = (props) => {
    return props.messageArray.map((msg) => (
      <div className="row">
        <span
          className="test"
          style={{
            width: "auto",
            backgroundColor: "lightgrey",
            borderRadius: '12px'
          }}
        >
          <span style={{
            color: '#f1356d'
          }}>{props.resident_name}:</span> {msg}
        </span>
      </div>
    ));
  };

  return (
    <>
      <p className="titles-modal">Comments:</p>
      <ShowMessageCard messageArray={currentMessages} resident_name={props.resident_name} />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              className="comment-input-section input-custom-details"
              type="text"
              value={newMessage}
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
