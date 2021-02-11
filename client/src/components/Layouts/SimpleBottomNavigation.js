import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import './SimpleBottomNavigation.css'
import HttpService from "../../services/http-service";
import PostModal from "../PostModal/PostModal"
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

// const useStyles = makeStyles({
//   root: {
//     width: 500,
//   },
// });

export default function SimpleBottomNavigation() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [showPostModal, setShowPostModal] = useState(false);
  
  const handleClose = () => setShowPostModal(false);
  const handleShow = () => setShowPostModal(true);

  const submitPost = (username, caption, isManager) => {
    const newHttpRequest = new HttpService();
      // username = username;
      // caption = caption;
      // isManager = isManager;

    return newHttpRequest.createPost(username, caption, isManager)
    // .finally(() => {
      //history.push("/post");
    // });
  };

  
  


  const createPost = () => {
    setShowPostModal(true)
    
    
    return (
      <PostModal
      handleShow={handleShow}
      handleClose={handleClose}
      />
    )


    }
    
    console.log("button worked")

    //submitPost("Ilyas", "Hohoho", false)
    
    // PostModal()
    
  


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
      <BottomNavigationAction 
      // label="Home"
      value="home" 
      icon={<HomeRoundedIcon />} 
      />
      <BottomNavigationAction 
      // label="Post"
      value="post" 
      icon={<AddRoundedIcon />}
      onClick={createPost} 
      />
      <BottomNavigationAction 
      // label="Profile"
      value="profile"
      icon={<PersonRoundedIcon />} 
      />
    </BottomNavigation>
  );
}