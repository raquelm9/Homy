import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './ResidentPost.css'
import ResidentPostComment from './ResidentPostComment';
import { useHistory } from "react-router-dom";
import HttpService from "../../services/http-service";



function ResidentPost({ username, caption, imageUrl, userAvatarUrl, comments }) {
    const [allPosts, setAllPosts] = useState([])
    const [comment, setComment] =useState('');

    const history = useHistory();

    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setComment(event.target.value)
    };

    const postComment = (event) => {
        event.preventDefault();
        console.log(comment);
        const newHttpRequest = new HttpService();

        return newHttpRequest.postComment(comment)
        .finally(() => {
        history.push("/post");


    })}


    const allComments = (comments) => {
        return (
        comments.map((comment, key) => (
            <ResidentPostComment username={comment.name} comment={comment.comment} key={key}/>
        ))
        )
    }
    

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
            <img className="post__image" src={imageUrl} alt="username"/>
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
            <div>{allComments(comments)}</div>
            <form className="post__commentBox">
                <input
                    className="post__comment"
                    placeholder="add a comment..."
                    type="text"
                    value={comment}
                    onChange={handleChange}
                />
                <button
                    disabled={!comment}
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
