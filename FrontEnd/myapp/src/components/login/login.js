
import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import './login.css'



const Login = ({db}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3763/shop/login', { email, password })
      .then(()=>{
        history.push('/productos');
        console.log(response);
      })
   
    } catch (error) {
      console.error(error, "402"); // Credenciales incorrectas
    } 
  };
  

  return (
  <div className="login">
	<h1>Login</h1>
    <form>
    	<input type="text"value={email} placeholder="Username"  onChange={handleUsernameChange}/>
        <input type="password"value={password} placeholder="Password"  onChange={handlePasswordChange}/>
        <button onClick={handleLogin} type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
    </form>
</div>
  );
};

export default Login;
