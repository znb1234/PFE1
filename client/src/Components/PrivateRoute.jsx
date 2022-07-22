
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    // const { isAuthenticated, user} = useContext(AuthContext);
    const isauth = useSelector(state => state.authentication.isauth)
    const role = useSelector(state => state.authentication.role)

    return (
        <Route {...rest} render={props => {
            if (!isauth)
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />

            if (!roles.includes(role))
                return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;