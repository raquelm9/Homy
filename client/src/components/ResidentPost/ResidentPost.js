import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './ResidentPost.css'


function ResidentPost({ username, caption, imageUrl, userAvatarUrl }) {
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
            {/* username + avatar */}
            {/* image */}
            {/* caption */}
            
        </div>
    )
}

export default ResidentPost
