import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './ResidentPost.css'
import ResidentPostComment from './ResidentPostComment';
import { useHistory } from "react-router-dom";
import HttpService from "../../services/http-service";
import { config } from "../../config/config";
import { useSelector} from "react-redux";
import {selectUser} from "../../selectors/userSelectors";



function ResidentPost({ username, caption, image, userAvatarUrl, comments }) {
    const [allPosts, setAllPosts] = useState([])
    const [newComment, setNewComment] =useState([]);

    const history = useHistory();
     //const loggedIn = useSelector((state) => state.userReducer.loggedIn);


//   useEffect(() => {
//     if (loggedIn) {
//       postComment();
//     }
//   }, [loggedIn]);

// useEffect(() => {
//     postComment();
//   }, []);

const currentUser = useSelector(selectUser);
  const name = currentUser.name;
  
  const postComment = (event) => {
      event.preventDefault();
      const newComment = {
          name,
          comment: newComment,
      };

    new HttpService().getComments( name, newComment)
    .then(
      (data) => {
        setNewComment(data);
      },
      (err) => {}
    );

  };




    // const postComment = async (event) => {
    //    event.preventDefault();
    //     await fetch(`${config.SERVER_URL}/api/post/${comment}`, {
    //       method: "PUT",
    //       headers: {
    //         "x-auth-token": `${localStorage.getItem("token")}`,
    //       },
    //     });
    //     history.go(0);

    //     const newHttpRequest = new HttpService();

    //     return newHttpRequest.postComment({comment})

    
        
    //   };
       
      

    

    // const newHttpRequest = new HttpService();

    // return newHttpRequest.postComment({comment})
    //     .finally(() => {
    //     history.push("/post");


    // })

    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setNewComment(event.target.value);
    };
    
    // const postComments = (event) => {
    //     event.preventDefault();
    //     // const recentComment = event.target.value
    //     console.log(comment);
        

    //     }


    const allComments = (comments) => {
        return (
        comments.map((comment, key) => (
            <ResidentPostComment username={comment.name} comment={comment.comment} key={key}/>
        ))
        )
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
