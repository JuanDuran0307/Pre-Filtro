import './App.css';
import React from 'react';
import Home from './components/Home/home';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './components/login/login'


import { CartProvider } from './context/CartContext';

function App() {
  return (

    <Router>
       <CartProvider>
          <Route path="/" exact component={Login} />
          <Route path="/productos" exact component={Home} />
          {/* Agrega más rutas según sea necesario */}
  
      </CartProvider>
    </Router>



    

  );  
}

export default App;
