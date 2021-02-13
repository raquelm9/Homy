import React, { useState } from "react";
import { Modal, Button} from "react-bootstrap";
// import { Formik, Field, Form } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import "./SimpleBottomNavigation.css";
import HttpService from "../../services/http-service";
import PostModal from "../PostModal/PostModal";
import ResidentPostForm from "../ResidentPostForm/ResidentPostForm";

export default function SimpleBottomNavigation() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitPost = (username, caption, isManager) => {
    const newHttpRequest = new HttpService();
    // username = username;
    // caption = caption;
    // isManager = isManager;

    return newHttpRequest.createPost(username, caption, isManager);
    // .finally(() => {
    //history.push("/post");
    // });
  };

  const CreatePost = () => {
    console.log("button worked");
    // submitPost()
    return (
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header 
          // closeButton
          >
          <Modal.Title>CREATE A POST</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <ResidentPostForm/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      // <PostModal/>
    );
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // showLabels
      // className={classes.root}
      className="SimpleBottomNavigation"
    >
      <CreatePost />

      {/* <PostModal show={show} handleShow/> */}
      <BottomNavigationAction
        // label="Home"
        value="home"
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        // label="Post"
        value="post"
        icon={<AddRoundedIcon />}
        onClick={handleShow}
      />
      <BottomNavigationAction
        // label="Profile"
        value="profile"
        icon={<PersonRoundedIcon />}
      />
    </BottomNavigation>
  );
}
