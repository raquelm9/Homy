import React from 'react'
import { useHistory } from 'react-router-dom';

function MainLogin() {

    const history = useHistory();

    return (
        <div>
            <div className="container loggin__centered">
                <button
                    id="resident"
                    className="loggin__box"
                    onClick={e => history.push({
                        pathname: '/login',
                        state: { loginPath: 'Resident' }
                    })}
                ><h4>Login As A Resident</h4></button>
                <button
                    id='manager'
                    className="loggin__box"
                    onClick={e => history.push({
                        pathname: '/login',
                        state: { loginPath: 'Manager' }
                    })}
                ><h4>Login As A Manager</h4></button>
            </div>
        </div >
    )
}

export default MainLogin
