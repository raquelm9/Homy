import React from 'react';
// import {useState, useEffect} from 'react';
import MngrNavbar from '../../../components/Layouts/MngrNavbar';
import './MngrMainPage.css';
import {Container, Row, Col} from 'react-bootstrap';
import MngrRequestList from '../../../components/MngrRequestList/MngrRequestList';




const MngrMainPage = () => {

    return (  
        <div>
            <Container fluid>
                <Row>
                    <MngrNavbar />
                    <div>
                    </div>
                </Row>
                <Row>
                    <Col sm={3} md={3} className="menu-window">
                        <h2>Requests</h2>
                        <h2>Units</h2>
                        <h2>Reports</h2>
                        <h2>Announcements</h2>
                    </Col>
                    <Col sm={9} md={9} className="service-window">
                        <h2>Service Requests</h2>
                        <MngrRequestList/>
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
}
 
export default MngrMainPage;