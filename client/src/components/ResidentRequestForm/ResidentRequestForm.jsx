import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { residentRequestValidationSchema } from "./validations/resident_request_validations";
import HttpService from "../../services/http-service";
import { useHistory, useLocation } from "react-router-dom";

import "./ResidentRequestForm.css";

function ResidentRequestForm() {
  // const [selectedFile, setSelectedFile] = useState(null);

  const history = useHistory();
  console.log(history);
  const location = useLocation();

  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const typeRequest = urlParams.get("type");

  const goBackToRequest = () => {
    history.push("/resident-request");
  };

  const submitServiceRequest = (data) => {
    const newHttpRequest = new HttpService();
    return newHttpRequest.addServiceRequest(data).finally(() => {
      history.push("/resident-list-request");
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          date: new Date(),
          type: typeRequest,
          subject: "",
          description: "",
          image: "",
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
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="center-content">
              {/* Type */}
              <div className="form-group row input-margin">
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
              <div className="form-group row input-margin">
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
              <div className="form-group row input-margin">
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
              <div className="form-group row input-margin">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
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

              {/* Image */}
              <div className="form-group row input-margin">
                <label htmlFor="image">Image</label>
                <br />
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </div>

              {/* Submit */}
              <div className="form-group row input-margin">
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResidentRequestForm;
