import React from 'react';
import {Link} from 'react-router-dom'
// import {useState, useEffect} from 'react';
import MngrNavbar from '../../../components/Layouts/MngrNavbar';
import './MngrMainPage.css';
import {Container, Row, Col} from 'react-bootstrap';
import MngrRequestList from '../../../components/MngrRequestList/MngrRequestList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MngrRequestListOfResidents from '../../../components/MngrRequestListOfResidents/MngrRequestListOfResidents';
import MngrNavbarBs from '../../../components/Layouts/MngrNavbarBs';



const MngrMainPage = () => {
    return (  
        <Router>
            <Switch>
                <div>
                    <Container fluid>
                        <Row>
                            <MngrNavbarBs/>
                            <div>
                            </div>
                        </Row>
                        <Row>
                            <Col sm={3} md={3} className="menu-window">
                                <Link className="menu-link" to='/manager/request-list-of-services' >
                                    <h2>Requests</h2>
                                </Link>
                                {/* <Link to='/manager/request-list-of-residents'>
                                    <h2 style={{color:'black'}}>Residents</h2>
                                </Link> */}
                                <h2 style={{color:'lightgrey'}}>Residents</h2>
                                <h2 style={{color:'lightgrey'}}>Units</h2>
                                <h2 style={{color:'lightgrey'}}>Reports</h2>
                            </Col>
                            <Col sm={9} md={9} className="service-window">
                                        <Route exact path="/manager/request-list-of-services" component=        {MngrRequestList}/>
                                        <Route exact path="/manager/request-list-of-residents" component=        {MngrRequestListOfResidents}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Switch>
        </Router>

    );
}
 
export default MngrMainPage;