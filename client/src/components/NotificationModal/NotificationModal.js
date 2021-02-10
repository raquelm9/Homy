import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from "react-redux";
import HttpService from '../../services/http-service';
import { INPROGRESS, ARCHIVED } from '../../constants/status';
import { setUserNotification } from '../../actions/userActions';
import { Formik, Form, Field, ErrorMessage } from "formik";
function NotificationModal({ open }) {

    const [request, setRequest] = useState({});
    const [date, setDate] = useState(null);
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.userReducer.user);
    const isLoggedIn = useSelector(state => state.userReducer.loggedIn);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            new HttpService()
                .getRequestsById(user.notification_req_id)
                .then((data) => setRequest(data));
        }
    }, [isLoggedIn, user])

    const onClickHandle = (toBeArchived) => {
        if (toBeArchived) {
            new HttpService()
                .updateStatusOnRequest(user.notification_req_id, ARCHIVED)
                .then((data) => dispatch(setUserNotification(false)))
        } else {
            if (comment.length) {
                new HttpService()
                    .updateStatusOnRequest(user.notification_req_id, INPROGRESS)
                    .then((data) => {
                        new HttpService()
                            .commentOnRequest(user.notification_req_id, user.name, comment)
                            .then(data => dispatch(setUserNotification(false)))
                    })
            }

        }
    }

    useEffect(() => {
        if (request.date) {

            let dateObject = new Date(request.date);
            const canFormat = new Intl.DateTimeFormat("en-CA", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(dateObject);
            setDate(canFormat);
        }

    }, [request])


    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLE} >
                <div style={MODAL_STYLES}>
                    <div style={GREETING_STYLE}>
                        <h3>Hello, {user.name}!</h3>
                    </div>
                    <hr />
                    <div style={TEXT_STYLE}>
                        <p>
                            One of your request as been given a status of DONE by your building manager.
                            If you don't agree with him, you can click the button "Unsatified". Please add a comment to
                            explain how you're not satisfied.
                            And the request will remain active.
                        </p>
                    </div>
                    <hr />
                    <div style={REQUEST_STYLE}>

                        <p> The request is:</p>
                        <p>Of type {request.type}</p>
                        <p>About {request.description}</p>
                        <p>Dating of {date}</p>

                    </div>
                    <hr />
                    <div >
                        <Formik
                            initialValues={{ comment: comment }}
                            onSubmit={(data) => {
                                onClickHandle(false);
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!comment) {
                                    errors.comment = "Required";
                                }

                                return errors;
                            }}
                        >
                            <Form>
                                <div style={TEXT_AREA_STYLE}>
                                    <p>Please add a comment if your are not happy about your experience</p>
                                    <Field
                                        id="comment"
                                        name="comment"
                                        as="textarea"
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                    />
                                    <ErrorMessage
                                        name="comment"
                                        render={(msg) => <span>{msg}</span>}// className="error-msg"
                                    />

                                </div>
                                <div style={BUTTON_STYLE}>
                                    <button
                                        className="btn btn-light"
                                        type="submit" >Refused</button>
                                    <button
                                        className="btn btn-light"
                                        onClick={() => onClickHandle(true)}>Verified</button>

                                </div>
                            </Form>
                        </Formik>

                    </div>


                </div>
            </div>
        </>
        , document.getElementById('portal')

    )
}

export default NotificationModal

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '$FFF',
    padding: '5%',
    zIndex: 1000,
    color: "white",

    width: "80%",
    heigth: "80%",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.8)',
    zIndex: 1000
}

const GREETING_STYLE = {
    display: 'flex',
    justifyContent: 'center'
}

const TEXT_STYLE = {
    display: 'flex',
    justifyContent: 'center'
}

const REQUEST_STYLE = {
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column'
}

const TEXT_AREA_STYLE = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '10px'
}

const BUTTON_STYLE = {
    display: 'flex',
    justifyContent: 'space-around',

}

