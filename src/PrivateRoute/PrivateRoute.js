import { LinearProgress } from '@mui/material';
import React from 'react'
import { Redirect, Route } from 'react-router'
import useAuth from '../hooks/useAuth'

function PrivateRoute({ children, ...rest }) {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <LinearProgress color="secondary" />
    }

    return (
        <Route
            {...rest}
            render={({ location }) => user.displayName ?
                children :
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                ></Redirect>}
        >

        </Route>


    )
}

export default PrivateRoute
