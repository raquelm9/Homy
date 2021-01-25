import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../../actions/userActions";

import "./ResidentNavbar.css";

function ResidentNavbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      {location.pathname === "/" ? null : (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to='/'>
              Homy
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resident-request">
                    New Request
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resident-list-request">
                    Services
                  </Link>
                </li>
              </ul>
              <span className="navbar-text">
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
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default ResidentNavbar;
