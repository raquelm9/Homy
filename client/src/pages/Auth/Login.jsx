import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, } from "formik";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './auth.css';

import { fetchUser } from '../../actions/userActions';

function Login() {

    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector(state => state.userReducer.loggedIn)

    useEffect(() => {
        if (loggedIn) history.push('/resident-request');
    }, [loggedIn, history])

    return (
        <div className="container register__centered">

            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={data => dispatch(fetchUser({ email: data.email, password: data.password }))}
                validate={values => {
                    const errors = {}
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address";
                    }
                    if (!values.password) {
                        errors.password = "Required"
                    } else if (values.password.length < 5) {
                        errors.password = "Password must at least 5 characters long"
                    }

                    return errors
                }}
            >
                <Form>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="">Login</h1>
                        </div>
                    </div>
                    <div className="form-group row">
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
                                render={msg => <span className="error-msg">{msg}</span>}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
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
                                render={msg => <span className="error-msg">{msg}</span>}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
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

        </div >
    );
}

export default Login;
