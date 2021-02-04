import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import HttpService from './../../services/http-service';

function NotificationRequest({ match }) {
    const [notification, setNotification] = useState({
        type: '',
        description: '',
        status: ''
    });
    const history = useHistory();

    useEffect(() => {

        fetch(`http://localhost:3008/api/service-requests/notification/${match.params.token}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${localStorage.getItem("token")}`,
            }
        })
            .then(resp => resp.json())
            .then(data => setNotification(data))
    }, [])
    return (
        <div>
            <div><p>This update is to let you know than the request about {notification.type} issue has been updated</p></div>
            <div><p>This {notification.status}</p></div>
            <div>Description</div>
            
        </div>
    )
}


export default NotificationRequest
