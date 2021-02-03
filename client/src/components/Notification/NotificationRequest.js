import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import HttpService from './../../services/http-service';

function NotificationRequest({ match }) {
    const [requestId, setRequestId] = useState(null);
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
            .then(data => history.push('/resident-list-request'))
    }, [])
    return (
        <div>
            Redirecting your request. Please wait!
        </div>
    )
}

export default NotificationRequest
