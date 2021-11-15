import React from 'react'
// import { Link } from 'react-router-dom';
import './Header.css';
import useAuth from '../hooks/useAuth';
// import headerlogo from "../images/cruiseCopy.jpg";

function Header() {
    const { user, logout } = useAuth();
    return (
        <div>
            <h2>header</h2>


        </div>
    )
}

export default Header


