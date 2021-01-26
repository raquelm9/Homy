import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MngrEachOrder from "../MngrEachOrder/MngrEachOrder";
// import HttpService from "../../services/http-service";
import './MngrShowOrders.css'

function ResidentRequestList() {
    const [orders, setOrders] = useState([]);
    const loggedIn = useSelector((state) => state.userReducer.loggedIn);
    useEffect(() => {
        if (loggedIn) {
            loadData();
        }
    }, [loggedIn]);

    const loadData = () => {
        fetch('http://localhost:3008/api/shop/orders')
            .then(resp => resp.json())
            .then(data => setOrders(data))
    };

    function listOfOrders(order) {
        return (
            <MngrEachOrder
                id={order._id}
                key={order._id}
                date={order.createdAt}
                unit={order.unit_num}
                name={order.name}
                type={order.type}
                image={order.image}
                comments={order.comments}
            />
        );
    }//datae

    return (
        <div className="row">
            {/* <div className="col"></div> */}
            {/* <div className="col-md-10"> */}
            <div className="">
                <table className="table table-hover margin-table ">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>{orders.map(listOfOrders)}</tbody>
                </table>
            </div>

            {/* </div> */}
            {/* <div className="col"></div> */}
        </div>
    );
}

export default ResidentRequestList;
