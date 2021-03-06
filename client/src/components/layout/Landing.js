import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const Landing = (props) => {
    // Redirect the user from the landing page to the dashboard if they're logged in
    if (props.isAuth) {
        return (<Redirect to='/dashboard'/>)
    }
    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
                Create a developer profile/portfolio, share posts and get help from
                other developers
            </p>
            <div className="buttons">
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                <Link href="/login" className="btn btn-light">Login</Link>
            </div>
            </div>
        </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthenticated,
    }
}

Landing.propTypes = {
    isAuth: PropTypes.bool,
}

export default connect(mapStateToProps, null)(Landing)