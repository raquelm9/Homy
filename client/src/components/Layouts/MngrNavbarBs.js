import {Navbar, Nav} from 'react-bootstrap';
/**
 * 
 */
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../../actions/userActions";

const MngrNavbarBs = () => {

    /**
     * 
     */
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.userReducer.loggedIn);
    const location = useLocation();


    return ( 
    <Navbar bg="light" expand="md" className="container-fluid">
        <Navbar.Brand href="/manager" className="homyTextNavbar">homy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <Nav.Link href="/manager">Home</Nav.Link>
                <Nav.Link href="/manager/request-list-of-services" >Requests</Nav.Link>
                <span>
                {loggedIn ? (
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={() => dispatch(logUserOut())}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  </ul>
                )}
              </span>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
     );
}
 




export default MngrNavbarBs;