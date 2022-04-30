import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from '../constants/userConstants'
import axios from 'axios'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const { data } = await axios.post('http://127.0.0.1:8000/login', { username, password })
        //console.log(password)
        localStorage.setItem('user', JSON.stringify(data))
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('user')
    dispatch({ type: USER_LOGOUT })
}

export const register = (email, username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const { data } = await axios.post('http://127.0.0.1:8000/register', { email, username, password })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch(login())
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}