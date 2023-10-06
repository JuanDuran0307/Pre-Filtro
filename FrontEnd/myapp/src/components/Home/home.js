import React from 'react';
import Cart from '../carrito/carrito';
import Products from '../Productos/productos';
import styles from './styles.module.scss'

const Home = () => {

  return (
    <div className={styles.home}>
    <Cart />
    <Products />
  </div>
  );
};

export default Home;


