import React, { useState } from "react";
import { Modal, Button} from "react-bootstrap";
// import { Formik, Field, Form } from "formik";

// import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
// import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import RecordVoiceOverRoundedIcon  from '@material-ui/icons/RecordVoiceOverRounded';
import "./SimpleBottomNavigation.css";
// import HttpService from "../../services/http-service";
// import PostModal from "../PostModal/PostModal";
import MngrPostForm from "../MngrPostForm/MngrPostForm";
import Announcements from "../../pages/Residents/CommunityPage/Announcements";

export default function SimpleBottomNavigationManager() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

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


          <MngrPostForm/>

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
        value="announcement"
        icon={<RecordVoiceOverRoundedIcon/>}
      />
      <BottomNavigationAction
        // label="Post"
        value="post"
        icon={<AddRoundedIcon />}
        onClick={handleShow}
      />
      {/* <BottomNavigationAction
        // label="Profile"
        value="profile"
        icon={<PersonRoundedIcon />}
      /> */}
    </BottomNavigation>
  );
}
