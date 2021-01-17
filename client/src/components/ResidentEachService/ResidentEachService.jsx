import React from "react";

function ResidentEachService(props) {

  const handleOnClick = () => {
    fetch(`http://localhost:3008/api/service-requests/${props.id}`, {
      method: 'DELETE'
    })

    window.location.reload();
  }
  const handleDate = () => {
    let dateObject = new Date(props.date)
    const canFormat = new Intl.DateTimeFormat('en-CA', { dateStyle: 'short', timeStyle: 'short' }).format(dateObject)

    return canFormat
  }
  return (
    <>
      <tr>
        <th scope="col">{props.id}</th>
        <td>{handleDate()}</td>
        <td>{props.type}</td>
        <td>{props.subject}</td>
        <td>{props.description}</td>
        <td>{props.image}</td>
        <td><button
          className="btn btn-secondary"
          onClick={handleOnClick}
        >Delete</button></td>
      </tr>
    </>
  );
}

export default ResidentEachService;
