import { LinearProgress } from '@mui/material';
import React from 'react'
import { Redirect, Route } from 'react-router'
import useAuth from '../hooks/useAuth'

function AdminRoute({ children, ...rest }) {
    const { user, admin, isLoading } = useAuth();
    if (isLoading) {
        return <>
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
        </>
    }

    return (
        <Route
            {...rest}
            render={({ location }) => user.email && admin ?
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

export default AdminRoute
