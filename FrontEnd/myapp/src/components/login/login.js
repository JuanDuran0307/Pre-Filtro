

import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import styles from "./styles.module.scss";



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
      const response = await axios.post('http://localhost:3763/shop/login', { email, password })
      .then(()=>{
        history.push('/productos');
      })
      console.log(response);
   
    } catch (error) {
      console.error(error, "xdxdxdxd"); // Credenciales incorrectas
    } 
  };
  

  return (
    <div className={styles.logincontainer}>
      <h1>Login</h1>
      <form>
        <div className={styles.formgroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div className={styles.formgroup}>
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
