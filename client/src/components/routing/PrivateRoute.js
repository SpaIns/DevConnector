import React from 'react'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// Take the component and any other params passed in
const PrivateRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => ( 
    // Create a route - if not auth'd and not loading, redirect to login
    // Otherwise, redirect to whatever our component was, passing down the props
    <Route {...rest} 
    render={props => !isAuthenticated && !loading ? 
        <Redirect to='/login'/>
        : (<Component {...props} />)
    }/>
 )

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, null)(PrivateRoute)
