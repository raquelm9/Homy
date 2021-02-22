import React from 'react'
import { useHistory } from 'react-router';

function BackButton() {
    const history = useHistory();

    return (
        <>
            <i
                onClick={() => history.goBack()}
                style={BACK_BUTTON_STYLE}
                className='fas fa-arrow-circle-left icon-adjust-size'
            ></i>
        </>
    )
}

export default BackButton

const BACK_BUTTON_STYLE = {
    margin: "20px 20px",
    cursor: "pointer"

}