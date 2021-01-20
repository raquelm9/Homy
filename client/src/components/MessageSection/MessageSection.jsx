import React, { useState } from "react";

function MessageSection() {
  const [message, setMessage] = useState("");

  const myChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(message);
    event.preventDefault();
  };

  return (
    <>
      <p className="titles-modal">Comments:</p>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              className="comment-input-section"
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
