import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import ResidentEachService from "../ResidentEachService/ResidentEachService";
// import HttpService from "../../services/http-service";


const orders = [{
    id: "1",
    unit_num: "401",
    name: "John Smith",
    type: "Garage Keys",
    date: new Date(),
    image: "",
    comments: ""
}]
function ResidentRequestList() {
    // const [request, setRequest] = useState([]);
    // const loggedIn = useSelector((state) => state.userReducer.loggedIn);
    // useEffect(() => {
    //     if (loggedIn) {
    //         loadData();
    //     }
    // }, [loggedIn]);

    // const loadData = () => {
    //     new HttpService().getRequests().then(
    //         (data) => {
    //             setRequest(data);
    //         },
    //         (err) => { }
    //     );
    // };

    function listOfOrders(order) {
        return (
            <ResidentEachService
                id={order._id}
                key={order._id}
                unitNum={order.unit_num}
                name={order.name}
                type={order.type}
                date={order.date}
                image={order.image}
                comments={order.comments}
            />
        );
    }

    return (
        <div className="row">
            <div className="col"></div>
            <div className="col-md-7">
                <table className="table table-hover margin-table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Details</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>{orders.map(listOfOrders)}</tbody>
                </table>
            </div>
            <div className="col"></div>
        </div>
    );
}

export default ResidentRequestList;
