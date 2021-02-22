import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { residentRequestValidationSchema } from "./validations/resident_request_validations";
import HttpService from "../../services/http-service";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectFile from '../SelectFile/SelectFile';


import "./ResidentRequestForm.css";

function ResidentRequestForm() {
  // const [selectedFile, setSelectedFile] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const unit_num = useSelector((state) => state.userReducer.user.unit_num);
  const name = useSelector((state) => state.userReducer.user.name);

  const [notification, setNotification] = useState('none');


  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const typeRequest = urlParams.get("type");

  const submitServiceRequest = (data) => {
    const newHttpRequest = new HttpService();
    data.unit_num = unit_num;
    data.resident_name = name;
    data.notification = notification;

    return newHttpRequest.addServiceRequest(data).finally(() => {
      history.push("/resident-list-request");
    });
  };

  const handleDate = () => {
    let dateObject = new Date();
    const canFormat = new Intl.DateTimeFormat("en-CA", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(dateObject);

    return canFormat;
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
          notification: notification
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
            <div className="row">
              <div className="col"></div>
              <div className="col-md-7 col-sm-12 center-content">
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
                      value={handleDate()}
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
                <div className="form-group row input-margin mt-5">
                  <label
                    htmlFor=""
                    className="col-sm-2 col-form-label"
                  >
                    Image
                  </label>
                  <div className="col-md-8 col-sm-10">
                    <SelectFile
                      onFileSelect={imgData => setFieldValue("image", imgData)}
                    />
                  </div>

                </div>


                {/* Notification type */}
                <div className="form-group row input-margin">
                  <label htmlFor="" className="col-sm-2 col-form-label">
                    Notification
                  </label>
                  <div className="col-sm-10 col-md-8 " role="group" aria-label="Basic radio toggle button group">
                    <input
                      className="radio"
                      id="notification-none"
                      type="radio"
                      name="notification"
                      value="none"
                      onChange={e => setNotification(e.target.value)}
                      checked={notification === 'none'}
                    />
                    <label htmlFor="notification-none" className="btn radio-label">None</label>
                    <input
                      className="radio"
                      id="notification-email"
                      type="radio"
                      name="notification"
                      value="email"
                      onChange={e => setNotification(e.target.value)}
                      checked={notification === 'email'}
                    />
                    <label htmlFor="notification-email" className="btn radio-label">Email</label>
                    <input
                      className="radio"
                      id="notification-phone"
                      type="radio"
                      name="notification"
                      value="phone"
                      onChange={e => setNotification(e.target.value)}
                      checked={notification === 'phone'}
                    />
                    <label htmlFor="notification-sms" className="btn radio-label">Phone Message</label>
                  </div>

                </div>
                {/* Submit */}
                <div className="row">
                  <div className="col-12 text-center space-button-form">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg btn-block button-center"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}

export default ResidentRequestForm;

