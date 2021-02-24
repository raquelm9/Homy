import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HttpService from "../../services/http-service";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ResidentPostForm() {
  const history = useHistory();
  const location = useLocation();
  const unit_num = useSelector((state) => state.userReducer.user.unit_num);
  const name = useSelector((state) => state.userReducer.user.name);
  const isManager = useSelector((state) => state.userReducer.user.isManager);

  // const [caption, setCaption] = useState("")

  const submitPost = (data) => {
    const newHttpRequest = new HttpService();
    // data.unit_num = unit_num;
    data.username = name;
    // data.isManager = isManager;
    
    console.log(data)
    return newHttpRequest.createPost(data)
      .then(() => {
        console.log("history is " + history)
      history.push("/");
    })
    .finally(() => {
      console.log("history is " + history)
    history.push("/manager/commune");
  })
    
    
  };

  // const submitPost = (username, caption, isManager) => {
  //   const newHttpRequest = new HttpService();
  //   // username = username;
  //   // caption = caption;
  //   // isManager = isManager;

  //   return newHttpRequest.createPost(username, caption, isManager);
  //   // .finally(() => {
  //   //history.push("/post");
  //   // });
  // };

  const initialValues = {
    caption: "",
    image:""
    // file: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          console.log("this is data " + data.caption);

          setSubmitting(true);
          // make async call
          submitPost(data).then(() => {
            setSubmitting(false);
            resetForm();
          });
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Field
              className="col-sm-8"
              name="caption"
              placeholder="Please add a caption..."
            />
            <label htmlFor="image" className="col-sm-8 col-form-label">
              <h4>Image</h4>
            </label>
            <Field
              className="col-md-8 col-sm-10"
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
                console.log(event.currentTarget.files[0].path)
              }}
            />
            <div className="col-12 text-center space-button-form">
              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block button-center"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResidentPostForm;
