import './App.css';
import React from 'react';
import Home from './components/Home/home';
//import Login from './components/login/login'

import { CartProvider } from './context/CartContext';

function App() {
  return (

    <CartProvider>
      <Home />
    </CartProvider>

    
    
  );
}

export default App;
