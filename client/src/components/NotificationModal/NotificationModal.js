import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from "react-redux";




function NotificationModal({ open, onClose }) {
    const userName = useSelector((state) => state.userReducer.user.name);
    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLE} >
                <div style={MODAL_STYLES}>
                    <div style={GREETING_STYLE}>
                        <h3>Hello, {userName}!</h3>
                    </div>
                    <div style={TEXT_STYLE}>
                        <p>
                            One of your request as been given a status of DONE by your building manager.
                            Please feel free to review. If you don't agree with him, you can click the button "Disagree".
                            And the request will remain active.
                        </p>
                    </div>
                    <div style={REQUEST_STYLE}>
                        <p> The request is:</p>
                        <p>Of type</p>
                        <p>About</p>
                        <p>Dating of</p>

                    </div>
                    <div style={BUTTON_STYLE}>
                        <button onClick={onClose}>Disagree</button>
                        <button onClick={onClose}>Agree</button>

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
    backgroundColor: 'rgba(0,0,0,.7)',
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

const BUTTON_STYLE = {
    display: 'flex',
    justifyContent: 'center'
}