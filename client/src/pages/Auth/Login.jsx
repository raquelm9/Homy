import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";

import { fetchUser, fetchUserAsManager } from "../../actions/userActions";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);
  const [loginPath, setLoginPath] = useState(null)


  useEffect(() => {

    if (loggedIn) history.push("/home");
    if (!location.state) history.push('/mainlogin');
    if (location.state.loginPath) setLoginPath(location.state.loginPath);
  }, [loggedIn, history]);


  return (

    <div className="container register__centered">

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(data) => {
          if (loginPath === 'Resident') return dispatch(fetchUser({ email: data.email, password: data.password }))
          if (loginPath === 'Manager') return dispatch(fetchUserAsManager({ email: data.email, password: data.password }))
        }
        }
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
              <h1 className="">{loginPath} Login</h1>
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
                type="text"
                className="form-control"
                id="password"
              />
              <ErrorMessage
                name="password"
                render={(msg) => <span className="error-msg">{msg}</span>}
              />
            </div>
          </div>

          <div className="form-group row input-style">
            <div className="col-2"></div>
            <div className="col-8">
              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block button-center"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>

  );


}

export default Login;

// A computer shall not harm your work orientation, 
// through inactivity
// or allow your work to come to harm

//Heaven and hell

//A computer shall not waste your time 
//or require you to domore work thab is striclty neccesary

//Unnecessary clicking or navigation or asking you to go back or relogin