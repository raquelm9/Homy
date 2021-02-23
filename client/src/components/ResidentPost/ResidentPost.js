import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './ResidentPost.css'
import ResidentPostComment from './ResidentPostComment';
import { useHistory } from "react-router-dom";
import HttpService from "../../services/http-service";
import { config } from "../../config/config";
import { useSelector} from "react-redux";
import {selectUser} from "../../selectors/userSelectors";



function ResidentPost({ postId,username, caption, image, userAvatarUrl, comments }) {
  
    const [newComment, setNewComment] =useState([]);

    const [commentsToDisplay, setCommentsToDisplay] = useState(null);

     

    
    

const currentUser = useSelector(selectUser);
  const name = currentUser.name;
  
  const postComment = (event) => {
      console.log(event.target.value)
      console.log("comment is " + newComment)
      event.preventDefault();
      // const commentToPost = {
      //     username: name,
      //     comment: newComment,
      // };

    new HttpService().createComment( postId, name, newComment )
    .then(
      (data) => {
        console.log(data)
        setCommentsToDisplay(data)
        setNewComment('')
        
      },
     
      (err) => {}
    );

  };

  




    const handleChange = (event) => {
        event.preventDefault();
        setNewComment(event.target.value);
    };
    
    

    const allComments = (comments) => {
      
      
      if (!commentsToDisplay) {
          console.log("original")
          return (
            
            comments.map((comment, key) => (
                <ResidentPostComment username={comment.username} comment={comment.comment} key={key}/>
            ))
            )
        } else {
          console.log("non-original")
          return (
            commentsToDisplay.map((comment, key) => (
                <ResidentPostComment username={comment.username} comment={comment.comment} key={key}/>
            ))
            )
        }
    }

    const displayComments = (comments) => {
      if (comments.length > 0) {
        if (comments.length >= 3) {
          return <p className="post__comment__text">See More</p>
        } else {
          return <p className="post__comment__text">There are less than 3</p>
        } 
      }
    
    }




    

    const getImagePath = () => {
        if (image.includes("http")) {
          return image;
        }
    
        return `${config.SERVER_URL}/${image}`;
      };


    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                className='post__avatar'
                alt={username}
                src={userAvatarUrl}
                />
                <h4>{username}</h4>
            </div>

            {image ? (
              <img src={getImagePath()} className="img-fluid" alt="images" />
            ) : null}

            {/* <img className="post__image" src={`/${image}`} alt="username"/> */}
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
            <div>{allComments(comments)}</div>
            {/* <div>{displayComments(comments)}</div> */}
            <form className="post__commentBox">
                <input
                    className="post__comment"
                    placeholder="add a comment..."
                    type="text"
                    value={newComment}
                    onChange={handleChange}
                />
                <button
                    disabled={!newComment}
                    className="post__button"
                    type="submit"
                    onClick={postComment}
                
                >Post</button>
            </form>
            {/* username + avatar */}
            {/* image */}
            {/* caption */}
            {/* comment section */}
            
        </div>
    )
}

export default ResidentPost
