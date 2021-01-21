import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../../actions/userActions";

import "./ResidentNavbar.css";

function ResidentNavbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? null : (
        <div className="navbar-container">
          <nav className="navbar navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              {loggedIn ? (
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    to="/"
                    onClick={() => dispatch(logUserOut())}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link " to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default ResidentNavbar;
