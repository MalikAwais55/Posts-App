import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/signIn")
  }
  return (
    <div className="wrapper">
      <div className="header">
        <div className="logo">
          <Link to="/">Post App</Link>
        </div>
        <nav className="navbar">
          <ul>
            <li><NavLink to="/" className="services">Home</NavLink></li>
            {token && <li><NavLink to="/view" className="services">View Post</NavLink></li>}
            {!token && <li><NavLink to="/signUp" className="services">SignUp</NavLink></li>}
            {!token && <li><NavLink to="/signIn" className="services">SignIn</NavLink></li>}
            {token && <button className="button1" onClick={handleLogout}>Logout</button>}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
