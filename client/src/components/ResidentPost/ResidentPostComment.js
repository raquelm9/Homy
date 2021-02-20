import React from 'react'

function ResidentPostComment({username, comment}) {
    return (
        <div className="post__comment__text">
            <p><strong>{username}</strong> {comment}</p>
        </div>
    )
}

export default ResidentPostComment;
