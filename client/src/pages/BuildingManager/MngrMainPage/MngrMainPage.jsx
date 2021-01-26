import React from 'react';
import { Link } from 'react-router-dom'
// import {useState, useEffect} from 'react';
import './MngrMainPage.css';
import { Container, Row, Col } from 'react-bootstrap';
import MngrRequestList from '../../../components/MngrRequestList/MngrRequestList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MngrRequestListOfResidents from '../../../components/MngrRequestListOfResidents/MngrRequestListOfResidents';
import MngrNavbarBs from '../../../components/Layouts/MngrNavbarBs';
import MngrHomeView from '../../../components/MngrHomeView/MngrHomeView';
import MngrShowOrders from '../../../components/MngrShowOrders/MngrShowOrders';


const MngrMainPage = () => {
    return (

                <div>
                    <Container fluid>
                        <Row>
                            <MngrNavbarBs />
                            <div>
                            </div>
                        </Row>
                        <Row>
                            <Col sm={3} md={3} className="menu-window">
                                <Link className="menu-link" to='/manager/request-list-of-services' >
                                    <h2>Requests</h2>
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