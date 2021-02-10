import React from 'react'

function ResidentPostComment({username, comment}) {
    return (
        <div>
            <p>{username} : {comment}</p>
        </div>
    )
}

export default ResidentPostComment
