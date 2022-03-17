import React, { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";

import Navigation from "../components/common/Navigation";
import Product from "../components/Shop/Product";

const OrderedList = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [product] = useProducts();
  const [cart, setCart] = useCart(product);
  console.log(cart);

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((res) => res.json())
      .then((data) => setOrderedProducts(data));
  }, []);

  return (
    <div>
      <Navigation />
      {cart.map((product) => (
        <Product product={product}></Product>
      ))}
    </div>
  );
};

export default OrderedList;
