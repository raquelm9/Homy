import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { residentRequestValidationSchema } from "./validations/resident_request_validations";
import HttpService from "../../services/http-service";
import { useHistory } from "react-router-dom";

import "./ResidentRequestForm.css";

function ResidentRequestForm() {
  const history = useHistory();

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
        initialValues={{ subject: "", description: "" }}
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
            <div className="form-group row">
              <label htmlFor="subject" className="col-sm-2 col-form-label">
                Subject
              </label>
              <div className="col-sm-10">
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
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
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

              <div className="col-2"></div>
              <div className="col-8">
                <button
                  onClick={goBackToRequest}
                  type="button"
                  className="btn btn-light btn-lg btn-block button-center"
                >
                  Cancel
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
