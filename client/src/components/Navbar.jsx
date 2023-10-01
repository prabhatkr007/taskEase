import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import { useAuth } from '../reducer/useReducer';

function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth(); 

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      const { error, message } = await response.json();

      if (!response.ok) {
        window.alert(error);
      } else {
        dispatch({ type: 'USER_LOGGED_OUT' });
        window.alert(message);
        navigate("/login");
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
          {!state ? ( 
            <li>
              <NavLink to="/login" activeClassName="active-link">
                Login
              </NavLink>
            </li>
          ) : null}
          {!state ? ( 
          <li>
            <NavLink to="/signup" activeClassName="active-link">
              Sign Up
            </NavLink>
          </li>
          ) : null}
          {state ? (
            <li className="logout-button" onClick={handleLogout}>
              Logout
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
