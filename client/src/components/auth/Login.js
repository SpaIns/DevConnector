import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as authActions from '../../actions/auth'
import * as alertActions from '../../actions/alert'

export const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // Deconstruct form data
    const {email, password} = formData

    // Generic onChange handler for our form
    //uses the 'name' field of the input to determine which field to update in our state
    const changeHandler = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // Remember, needs to be async b/c we need to do DB stuff
    const submitHandler = async (event) => {
        event.preventDefault()
        if (!password) {
            props.setAlert('Invalid credentials', 'danger')
        }
        else {
            props.login({email, password})
        }
    }
    
    // Redirect if logged in
    if (props.isAuth) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" onChange={changeHandler}/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={changeHandler}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/login">Register</Link>
            </p>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(authActions.login(credentials)),
        setAlert: (msg, type) => dispatch(alertActions.setAlert(msg, type)),
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)