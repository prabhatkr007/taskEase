import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import '../styles/loader.css'
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { error, message } = await response.json();

      if (!response.ok) {
        window.alert(error);
      } else {
        window.alert(message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      {isLoading ? ( 
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <form className="register" onSubmit={register}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button>Register</button>
        </form>
      )}
    </div>
  );
}
