import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from '../constants/userConstants'
import axios from 'axios'

export const login = (username, password) => async (dispatch) => {

        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const { data } = await axios.post('http://127.0.0.1:8000/login', { username, password })
         .then(res =>
        //  {if (res.data.status === 200)
        //   {
        //console.log(password)
        {if (res.data.status === 200)
              {
            //var username_value = sessionStorage.getItem("username_key");// Assign value to a key
            // sessionStorage.setItem("username_key", username);
            //  if (res.data.username===("admin1"))
            //      {  setLoading(true);  history.push('/users'); history.go(0)}
        localStorage.setItem('user', JSON.stringify(data))
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data })}
              else
                  dispatch({
            type: USER_LOGIN_FAIL,
          //  payload: error.response && error.response.data.message
            //    ? error.response.data.message
              //  : error.message,
        })

})}

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