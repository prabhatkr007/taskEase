
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css"

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function register(ev) {
        ev.preventDefault();
     
      
        try {
          const response = await fetch('api/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
          const {error, message} = await response.json();

          if(!response.ok){
            window.alert(error);
          }else{
            window.alert(message);
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
        
        }
      }
 
    return(
      <div className='form-container'>
    <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text"
            placeholder="username"
            value={username}
            onChange={ev => setUsername(ev.target.value)} />
        <input type="password" 
            placeholder="password" 
            value={password}
            onChange={ev => setPassword(ev.target.value)}/>
        <button>Register</button>

    </form>
    </div>
    )
}