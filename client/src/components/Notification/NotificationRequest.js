import React from 'react'

function NotificationRequest({ match }) {
    return (
        <div>
            Notification Request: {match.params.token}
        </div>
    )
}

export default NotificationRequest
