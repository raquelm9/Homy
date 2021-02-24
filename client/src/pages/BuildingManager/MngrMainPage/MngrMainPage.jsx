import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import {useState, useEffect} from 'react';
import './MngrMainPage.css';
import { Container, Row, Col } from 'react-bootstrap';
import MngrRequestList from '../../../components/MngrRequestList/MngrRequestList';
import {Route} from "react-router-dom";
import MngrRequestListOfResidents from '../../../components/MngrRequestListOfResidents/MngrRequestListOfResidents';
// import MngrNavbarBs from '../../../components/Layouts/MngrNavbarBs';
import MngrHomeView from '../../../components/MngrHomeView/MngrHomeView';
import MngrShowOrders from '../../../components/MngrShowOrders/MngrShowOrders';
import MngrCommuneView from '../../../components/MngrCommuneView/MngrCommuneView';
import HttpService from "../../../services/http-service";
import {
    NEW,
    // VIEWED,
    // INPROGRESS,
    // DONE,
    // VERIFIED,
    // ARCHIVED,
    // statusTEXT,
  } from "../../../constants/status";


const MngrMainPage = () => {
    // const [allRequests, setAllRequests] = useState([]);
    const [showNewRequestTag, setShowNewRequestTag] = useState(false);
    // const [numberOfNewRequests, setNumberOfNewRequests] = useState(0);

    useEffect(() => {
        // loadData();
        loadAllData();
        // console.log("useEffect with loadAllData fires");
      }, []);

    const loadAllData = () => {
        setShowNewRequestTag(false)
        new HttpService().getAllServiceRequests().then(
          (data) => {
            // sortManagerList(data);
            // setAllRequests(data);
            return data;
            // save all requests in allRequests state variables
            // console.log("data : ", data)
            // filterRequestList(data);
          },
          (err) => {}
        ).then((requests) => {
            if (requests) {
                // console.log(requests)
                requests.map((request, key) => {
                    // console.log(request.status)
                    if (request.status === NEW) {
                        // console.log('there are new')
                        setShowNewRequestTag(true)
                    }
                    
                })
            }
            
        },
        (err) => {})
      };

    return (

                <div>
                    <Container fluid>
                        {/* <Row>
                            <MngrNavbarBs />
                            <div>
                            </div>
                        </Row> */}
                        <Row>
                            <Col sm={3} md={3} className="menu-window">
                                <Link className="menu-link" to='/manager/commune' >
                                    <h2>Commune</h2>
                                </Link>
                                <Link className="menu-link" to='/manager/request-list-of-services' >
                                    <h2>Requests   
                                        {showNewRequestTag && <span className="badge bg-secondary badge__new">new</span>}
                                    
                                    </h2>
                                </Link>
                                <Link className="menu-link" to='/manager/orders' >
                                    <h2>Orders</h2>
                                </Link>
                                {/* <Link to='/manager/request-list-of-residents'>
                                    <h2 style={{color:'black'}}>Residents</h2>
                                </Link> */}
                                <h2 style={{ color: 'lightgrey' }}>Residents</h2>
                                <h2 style={{ color: 'lightgrey' }}>Units</h2>
                                <h2 style={{ color: 'lightgrey' }}>Reports</h2>

                            </Col>
                            <Col sm={9} md={9} className="service-window">
                                <Route exact path='/manager' component={MngrHomeView}></Route>
                                <Route exact path='/manager/commune' component={MngrCommuneView}></Route>
                                <Route exact path="/manager/request-list-of-services" component={MngrRequestList} />
                                <Route exact path="/manager/request-list-of-residents" component={MngrRequestListOfResidents} />
                                <Route exact path="/manager/orders" component={MngrShowOrders} />
                            </Col>
                        </Row>
                    </Container>
                </div>


    );
}

export default MngrMainPage;