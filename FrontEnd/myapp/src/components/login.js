
import '../styles/login.css';
import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 



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

/*   const handleLogin = () => {
    // Aquí puedes agregar la lógica para verificar las credenciales del usuario
    // y realizar la autenticación.
    // Por ahora, solo mostraremos los valores en la consola.
    console.log('Username:', username);
    console.log('Password:', password);
  }; */
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3763/shop/login', { email, password });
      console.log(response); // Autenticación exitosa
      // Puedes redirigir al usuario a la página de inicio después de la autenticación.
      history.push('/dashboard');
    } catch (error) {
      console.error(error, "xdxdxdxd"); // Credenciales incorrectas
    } 
  };
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
