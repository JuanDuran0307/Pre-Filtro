import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { editItemToCart } = useContext(CartContext);

  /* Desestructuramos el item para sacar solo la id */
  const { stock } = item;
  console.log(stock);

  return (
    <div className={styles.cartItem}>
      <img src={item.imagen} alt={item.nombre} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.nombre}</p>
          <div className={styles.buttons}>
            <button onClick={() => editItemToCart(item._id,"add", stock  )}>
              AGREGAR
            </button>
            <button onClick={() => editItemToCart(item._id,"del", stock  )}>
              ELIMINAR
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.stock}</div>
          <p>Total: ${item.stock * item.precio}</p>
        </div>
      </div>
    </div>
  );
};