import React from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../../actions/userActions";
import './MngrNavbar.css'

const NavbarCommon = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.userReducer.loggedIn);
    // const location = useLocation();
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/manager'><span className='homyTextNavbar'>homy</span></Link>
                <button className="navbar-toggler btn-outline-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to='/manager/request-list-of-services'>Requests</Link>   
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/manager/orders'>Orders</Link>   
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to='/manager/orders'>Units</Link>   
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to='/manager/orders'>Residents</Link>   
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link  disabled" to='/manager/orders'>Reports</Link>   
                    </li>
                    {/* <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li> */}
                    {/* <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li> */}
                </ul>
            <span className="d-flex">
            <span>
                {loggedIn ? (
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/login"
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
            </span>
            </div>
        </div>
        </nav>
            </>
    )
}

export default NavbarCommon;