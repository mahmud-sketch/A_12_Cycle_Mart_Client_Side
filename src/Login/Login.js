import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login() {
    const { signInUsingGoogle, setIsLoading, errMessage, processLogin, loginErrMsg, loginSucMsg } = useAuth();
    // console.log(useAuth());

    const [loginData, setLoginData] = useState({});

    const location = useLocation();
    const history = useHistory();

    const redirect_uri = location.state?.from || '/home';

    const handleGoogleLogin = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then((result) => {
                // console.log(result);
                saveUser(result.user.email, result.user.displayName, 'PUT');
                history.push(redirect_uri);
                // setUser(result.user);
                console.log(result.user);
            }).catch((err => {
                // setError(err.message);
            })).finally(() => { setIsLoading(false) })
    }

    const handleOnChange = e => {

        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(loginData)

    }


    const handleLoginSubmit = e => {

        processLogin(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return (
        <div>
            <h2>Please Login</h2>
            {
                <p>{loginErrMsg}</p>
            }
            {
                <p>{loginSucMsg}</p>
            }

            <br /><br />
            <form onSubmit={handleLoginSubmit}>
                <TextField id="outlined-basic" onChange={handleOnChange} name="email" label="Email" variant="outlined" /><br />
                <TextField id="outlined-basic" onChange={handleOnChange} name="password" label="password" variant="outlined" /><br />
                <button type="submit">login</button><br /><br />
                <p>-------------------</p>


            </form>
            <button onClick={handleGoogleLogin} type="button">Google Sign In</button>
            <br />
            <hr />
            <Link to="/registration">New User?Click to Register page</Link>
        </div >
    )
}

export default Login