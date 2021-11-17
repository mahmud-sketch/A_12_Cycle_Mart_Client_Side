import React, { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { TextField } from '@mui/material';
// import { getAuth } from "firebase/auth";

function Registration() {
    const { signInUsingGoogle, registerUsingMailandPassword, setUserName, errMessage, setIsLoading } = useAuth();
    // const auth = getAuth();

    const location = useLocation();
    const history = useHistory();

    const redirect_uri = location.state?.from || '/home';
    const [registerData, setRegisterData] = useState({});

    const handleOnChange = e => {

        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData }
        newRegisterData[field] = value;
        console.log(newRegisterData);
        setRegisterData(newRegisterData)

    }


    const handleRegister = e => {
        if (registerData.password !== registerData.password2) {
            alert('password dont match!');
            e.preventDefault();
            return
        }
        registerUsingMailandPassword(registerData.name, registerData.email, registerData.password, history);
        // setUserName(registerData.name);
        // history.push(redirect_uri);
        e.preventDefault();
    }

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
            <Link to='/home'>Home</Link><br />
            <h2>Registration</h2>
            {
                <p>{errMessage}</p>
            }

            <br /><br />

            <form onSubmit={handleRegister}>
                <TextField id="outlined-basic" onChange={handleOnChange} name="name" label="Name" variant="outlined" /><br />
                <TextField id="outlined-basic" onChange={handleOnChange} name="email" label="email" variant="outlined" /><br />
                <TextField id="outlined-basic" onChange={handleOnChange} name="password" label="password" variant="outlined" /><br />
                <TextField id="outlined-basic" onChange={handleOnChange} name="password2" label="retype password" variant="outlined" /><br />
                <button type="submit">register</button><br /><br />
                <p>-------------------</p>


            </form>
            <Link to="/login">Already registered? Click to go to log in page.</Link><br /><br /><hr />
            <button onClick={handleGoogleLogin} className="bg-indigo-900 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-3 ease-linear transition-all duration-150"
            >Google Sign In</button>
        </div >
    )
}
export default Registration