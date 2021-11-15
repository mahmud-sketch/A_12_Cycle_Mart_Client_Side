import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login() {
    const { signInUsingGoogle, setIsLoading, errMessage } = useAuth();
    // console.log(useAuth());

    const location = useLocation();
    const history = useHistory();

    const redirect_uri = location.state?.from || '/home';

    const handleGoogleLogin = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then((result) => {
                // console.log(result);
                history.push(redirect_uri);
                // setUser(result.user);
                console.log(result.user);
            }).catch((err => {
                // setError(err.message);
            })).finally(() => { setIsLoading(false) })
    }

    return (
        <div>
            <h2>Please Login</h2>
            {
                <p>{errMessage}</p>
            }
            <br /><br />
            <button onClick={handleGoogleLogin} className="bg-indigo-900 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button">Google Sign In</button>
            <br />
            <hr />
            <Link to="/registration">New User?Click to Register page</Link>
        </div >
    )
}

export default Login