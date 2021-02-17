import React from 'react'

function ResidentPostComment({username, comment}) {
    return (
        <div>
            <p><strong>{username}</strong> {comment}</p>
        </div>
    )
}

export default ResidentPostComment
