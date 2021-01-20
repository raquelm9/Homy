import { SET_USER, LOG_OUT } from './types';

const setUser = payload => ({ type: SET_USER, payload })

export const logUserOut = () => ({ type: LOG_OUT })

export const fetchUser = userInfo => dispatch => {
    fetch(`http://localhost:3008/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    })
        .then(res => {
            localStorage.setItem("token", res.headers.get('x-auth-token'))
            return res.json()
        })
        .then(data => dispatch(setUser(data)))
}

export const register = userInfo => dispatch => {
    console.log(userInfo)
    fetch(`http://localhost:3008/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    })
        .then(res => {
            localStorage.setItem("token", res.headers.get('x-auth-token'))
            return res.json()
        })
        .then(data => dispatch(setUser(data)))

}

export const autoLogin = () => dispatch => {
    if (localStorage.getItem('token')) {
        fetch(`http://localhost:3008/api/login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-auth-token": `${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                localStorage.setItem("token", res.headers.get('x-auth-token'))
                return res.json()
            })
            .then(data => dispatch(setUser(data)))
    }

}
