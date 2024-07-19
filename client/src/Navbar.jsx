import { Link, NavLink } from "react-router-dom";
import React from 'react'
function Navbar() {
    return (
        <div className="wrapper">
            <div className="header">
                <div className="logo">
                    <Link to="/">Post App</Link>
                </div>
                <nav className="navbar">
                    <ul>
                        <li><NavLink to="/" className="services">Home</NavLink></li>
                        <li><NavLink to="/view" className="services">View Post</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
export default Navbar