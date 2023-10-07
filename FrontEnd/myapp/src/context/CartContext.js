import { createContext, useEffect, useState } from "react";
import axios from "axios";

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);


  const getProducts = async () => {
    await axios
      .get("http://localhost:3763/shop/get-productos")
      .then((response) => {
      console.log(response.data.result);
      setProducts(response.data.result)
      }); 
      
  };

  const getProductsCart = async () => {
    return await axios
      .get("http://localhost:3763/shop/get-productos-carrito")
      .then((response) => {
        console.log(response.data.result);
        setCartItems(response.data.result)
      }); 
      
      
  };


  useEffect(() => {
    getProducts();
    getProductsCart();
  }, []);

  const addItemToCart = async (product) => {
    const {nombre, imagen, precio } = product;

    await axios.post("http://localhost:3763/shop/add-productos-carrito", {nombre, imagen, precio });

  getProducts();
  getProductsCart();
};






const editItemToCart = async (id, query, stock) => {
  if (query === "del" && stock === 1) {
    await axios
      .delete(`http://localhost:3763/shop/delProductos/${id}`)
      .then(({ data }) => console.log(data));
  } else {
    await axios
      .put(`http://localhost:3763/shop/updateProductoCarrito/${id}?query=${query}`, {
        stock,
      })
      .then(({ data }) => console.log(data));
  }

  getProducts();
  getProductsCart();
};
  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart, editItemToCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;