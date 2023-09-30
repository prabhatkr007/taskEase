import React,{ useState} from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../reducer/useReducer';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state, dispatch } = useAuth(); 

  async function login(ev) {
    ev.preventDefault();

    try {
     const response =  await fetch("api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const {error, message} = await response.json();

      if (!response.ok) {
        window.alert(error); 
      }else{
        dispatch({ type: 'USER_AUTHENTICATED' });
        window.alert(message);
        navigate("/")
      }
    } catch (error) {
      console.error(error);
    
    }
  }


  return (
    <div className='form-container'>
    <form className="login" onSubmit={login}>
      <h1>Login</h1>

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
      <button>Login</button>
    </form>
    </div>
  );
}