import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../selectors/userSelectors";
import "./auth.css";

import { fetchUser } from "../../actions/userActions";

// const loginOptions = {
//   resident: "RESIDENT",
//   manager: "MANAGER",
// };

function Login(props) {
  // const [whoAmI, setWhoAmI] = useState(loginOptions.resident);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isManager = useSelector(selectIsManager);
  const currentUser = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch();
  const history = useHistory();

  // const [checkIfManager, setCheckIfManager] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // navigateToDashboard();
      if (currentUser.isManager) {
        history.push("/manager");
      } else {
        history.push("/community");
      }
    }
  }, [isLoggedIn, currentUser.isManager, history]);

  // const navigateToDashboard = () => {
  //   if (currentUser.isManager) {
  //     history.push("/manager");
  //   } else {
  //     history.push("/home");
  //   }
  // };

  const login = (email, password) => {

    dispatch(fetchUser({ email: email, password: password }));

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
            const emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$', 'i')
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !emailRegex.test(values.email)
              // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
