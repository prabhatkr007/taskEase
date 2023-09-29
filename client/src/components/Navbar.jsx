import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async() => {

    try {
      const response =  await fetch("api/logout", {
         method: "POST",
       });
       const {error, message} = await response.json();

       if (!response.ok) {
         window.alert(error); 
       }else{
         window.alert(message);
         navigate("/login")
       }
     } catch (error) {
       console.error(error);
     }
   
   
  };

  return (
    <nav>
      <div className="navbar-container">
        <h1>Todo App</h1>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active-link">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" activeClassName="active-link">
              Sign Up
            </NavLink>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
