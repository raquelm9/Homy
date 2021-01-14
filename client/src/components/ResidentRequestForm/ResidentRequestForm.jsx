import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { residentRequestValidationSchema } from "./validations/resident_request_validations";
import HttpService from "../../services/http-service";
import { useHistory, useLocation } from "react-router-dom";

import "./ResidentRequestForm.css";

function ResidentRequestForm() {
  const history = useHistory();
  const location = useLocation();

  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const typeRequest = urlParams.get("type");

  const goBackToRequest = () => {
    history.push("/resident-request");
  };

  const submitServiceRequest = (data) => {
    const newHttpRequest = new HttpService();
    return newHttpRequest.addServiceRequest(data);
  };

  return (
    <div>
      <Formik
        initialValues={{
          date: new Date(),
          type: typeRequest,
          subject: "",
          description: "",
        }}
        validationSchema={residentRequestValidationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // make async call
          submitServiceRequest(data).then(() => {
            setSubmitting(false);
            resetForm();
          });
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {/* Type */}
            <div className="form-group row">
              <label htmlFor="type" className="col-sm-2 col-form-label">
                Type
              </label>
              <div className="col-md-8 col-sm-10">
                <Field
                  name="type"
                  type="text"
                  className="form-control"
                  id="inputType"
                  value={typeRequest}
                />
                <ErrorMessage name="type" />
              </div>
            </div>

            {/* Date */}
            <div className="form-group row">
              <label htmlFor="date" className="col-sm-2 col-form-label">
                Date
              </label>
              <div className="col-md-8 col-sm-10">
                <Field
                  name="date"
                  type="text"
                  className="form-control"
                  id="inputDate"
                  value={new Date()}
                />
                <ErrorMessage name="date" />
              </div>
            </div>

            {/* Subject */}
            <div className="form-group row">
              <label htmlFor="subject" className="col-sm-2 col-form-label">
                Subject
              </label>
              <div className="col-md-8 col-sm-10">
                <Field
                  placeholder="Subject"
                  name="subject"
                  type="text"
                  className="form-control"
                  id="inputSubject"
                />
                <ErrorMessage name="subject" />
              </div>
            </div>

            {/* Description */}
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-md-8 col-sm-10">
                <Field
                  placeholder="Description"
                  name="description"
                  type="text"
                  className="form-control"
                  id="inputDescription"
                />
                <ErrorMessage name="description" />
              </div>
            </div>

            {/* Submit */}
            <div className="form-group row">
              <div className="col-2"></div>
              <div className="col-8">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block button-center"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
              <div className="col-2"></div>

              {/* Previous */}
              <div className="col-2"></div>
              <div className="col-8">
                <button
                  onClick={goBackToRequest}
                  type="button"
                  className="btn btn-light btn-lg btn-block button-center"
                >
                  Previous
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResidentRequestForm;
