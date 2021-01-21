import {Navbar, Nav} from 'react-bootstrap';


const MngrNavbarBs = () => {
    return ( 
    <Navbar bg="light" expand="md" className="container-fluid">
        <Navbar.Brand href="/manager" className="homyTextNavbar">homy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify-content-end>
                <Nav.Link href="/manager">Home</Nav.Link>
                <Nav.Link href="/manager/request-list-of-services" >Requests</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
     );
}
 




export default MngrNavbarBs;