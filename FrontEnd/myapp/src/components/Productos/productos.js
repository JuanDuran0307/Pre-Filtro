import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";
import Navbar from "../NavBar/NavBar";

const Products = () => {
  /* Traemos del context la funcion para agregar un producto */
  const { addItemToCart, products} = useContext(CartContext);

  return (
<div>
  <div>
    <Navbar/>
  </div>


    <div className={styles.productsContainer}>

      {products &&
        products.map((product, i) => (
          <div key={i} className={styles.product}>
            <img src={product.imagen} alt={product.nombre} />
            <div>
              <p>
                {product.nombre} - ${product.precio}
              </p>
            </div>
            {!product.inCart ? (
              <button className={styles.buttonanimated} onClick={() => addItemToCart(product)}>
                Add to Cart
              </button>
            ) :  (
              <button className={styles.buttonanimated}>En el carrito</button>
            )}
          </div>
        ))}
    </div>
</div>
  );
};

export default Products;