import axios from 'axios'
import * as types from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

// Load User using token
export const loadUser = () => async dispatch => {
    // Setup axios header
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: types.USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: types.AUTH_ERROR
        })
    }
}

// Register the user
export const register = ({name, email, password}) => async dispatch => {

    // Config/body might not be required
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password})

    try {
        // Get out token
        const res = await axios.post('/api/users', body, config)

        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        // Check if error response contains any 'legible' errors
        const errors = error.response.data.errors
        if (errors) {
            // Set an alert for all errors that came back
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        // Start fail reducer
        dispatch({
            type: types.REGISTER_FAIL,
        })
    }
}

export const login = ({email, password}) => async dispatch => {

    // Config/body might not be required
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        // Get out token
        const res = await axios.post('/api/auth', body, config)

        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        // Check if error response contains any 'legible' errors
        const errors = error.response.data.errors
        if (errors) {
            // Set an alert for all errors that came back
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        // Start fail reducer
        dispatch({
            type: types.LOGIN_FAIL,
        })
    }
}