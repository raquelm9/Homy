import React from "react";
import { Formik, Form, Field } from "formik";

function ResidentRequestForm() {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Service Request</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div className="form-group">
              <label>Subject: </label>
              <input type="email" name="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Request: </label>
              <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResidentRequestForm;
