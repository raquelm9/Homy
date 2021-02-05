import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsManager,
} from "../../selectors/userSelectors";
import "./auth.css";

import { fetchUser, fetchUserAsManager } from "../../actions/userActions";

const loginOptions = {
  resident: "RESIDENT",
  manager: "MANAGER",
};

function Login(props) {
  const [whoAmI, setWhoAmI] = useState(loginOptions.resident);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isManager = useSelector(selectIsManager);
  const dispatch = useDispatch();
  const history = useHistory();

  const [checkIfManager, setCheckIfManager] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigateToDashboard();
    }
  }, [isLoggedIn]);

  const navigateToDashboard = () => {
    if (isManager) {
      history.push("/manager");
    } else {
      history.push("/home");
    }
  };

  const login = (email, password) => {
    // if (!checkIfManager) {
      dispatch(fetchUser({ email: email, password: password }));
    // } else {
    //   dispatch(fetchUserAsManager({ email: email, password: password }));
    // }
  };

  const checkIfChange = () => {
    checkIfManager ? setCheckIfManager(false) : setCheckIfManager(true);
  };

  return (
    <>
      <div className="container register__centered">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(data) => {
            login(data.email, data.password);
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 5) {
              errors.password = "Password must at least 5 characters long";
            }

            return errors;
          }}
        >
          <Form>
            <div className="row">
              <div className="col-12">
                <h1 className="text-center">Login</h1>
              </div>
            </div>
            <div className="form-group row input-style">
              <label htmlFor="email" className="col-sm-3 col-form-label">
                Email
              </label>
              <div className="col-md-9 col-sm-10">
                <Field
                  placeholder="Email"
                  name="email"
                  type="text"
                  className="form-control"
                  id="email"
                />

                <ErrorMessage
                  name="email"
                  render={(msg) => <span className="error-msg">{msg}</span>}
                />
              </div>
            </div>
            <div className="form-group row input-style">
              <label htmlFor="password" className="col-sm-3 col-form-label">
                Password
              </label>
              <div className="col-md-9 col-sm-10">
                <Field
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <span className="error-msg">{msg}</span>}
                />
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-9 col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    defaultChecked={checkIfManager}
                    onChange={checkIfChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    I'm a manager
                  </label>
                </div>
              </div>
            </div> */}

            <div className="form-group row input-style">
              <div className="col"></div>
              <div className="center-button">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block button-center"
                >
                  Submit
                </button>
              </div>
              <div className="col"></div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Login;
