import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
// import { getAuth } from "firebase/auth";

function Registration() {
    const { signInUsingGoogle, errMessage } = useAuth();
    // const auth = getAuth();
    return (
        <div>
            <h2>Registration</h2>
            {
                <p>{errMessage}</p>
            }
            <br /><br />
            <Link to="/login">Already registered? Click to go to log in page.</Link><br /><br /><hr />
            <button onClick={signInUsingGoogle} className="bg-indigo-900 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-3 ease-linear transition-all duration-150"
            >Google Sign In</button>
        </div >
    )
}
export default Registration