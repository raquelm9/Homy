import React from "react";

function ResidentEachService(props) {
  return (
    <>
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.date}</td>
        <td>{props.type}</td>
        <td>{props.subject}</td>
        <td>{props.description}</td>
        <td>{props.image}</td>
      </tr>
    </>
  );
}

export default ResidentEachService;
