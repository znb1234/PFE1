import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ component: Component, restricted, ...rest }) {

    const isauth = useSelector(state => state.authentication.isauth)

    return (
        <Route {...rest} render={props => (
            isauth && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    )
}

export default PublicRoute