import React, { useState } from "react";
import HttpService from "../../services/http-service";
import "./MessageSection.css";
import { useStore } from "react-redux";
import moment from "moment";

function MessageSection(props) {
  const store = useStore();
  const name = store.getState().userReducer.user.name;
  const requestId = props.requestId.split("-")[1];
  const [newMessage, setNewMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState(props.comments || []);

  const myChangeHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      comment: newMessage,
      name,
      createdAt: moment().toString(),
    };
    new HttpService().commentOnRequest(requestId, name, newMessage).then(() => {
      setCurrentMessages([newComment, ...currentMessages]);
      setNewMessage("");
    });
  };

  const showStyleOfCard = (item) => {
    if (item.name !== "Manager") {
      return (
        <div className="row">
          <span className="style-tag-resident">
            {item.name}
            {item.comment}
            {moment(item.createdAt).fromNow()}
          </span>
        </div>
      );
    } else {
      return (
        <div className="row d-flex justify-content-end">
          <span className="style-tag-manager">
            {item.name}
            {item.comment}
            {moment(item.createdAt).fromNow()}
          </span>
        </div>
      );
    }
  };

  const ShowMessageCard = (props) => {
    return props.comments.map((item) => showStyleOfCard(item));
  };

  return (
    <>
      <p className="titles-modal">Comments:</p>
      <ShowMessageCard comments={currentMessages} />
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
