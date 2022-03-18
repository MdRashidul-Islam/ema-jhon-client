import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getStoredCart();
    const keys = Object.keys(savedCart);

    fetch("https://immense-harbor-60117.herokuapp.com/products/keys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(keys),
    })
      .then((res) => res.json())
      .then((products) => {
        if (products.length) {
          const storedCart = [];
          for (const key in savedCart) {
            const selectedProduct = products?.find(
              (product) => product.key === key
            );

            if (selectedProduct) {
              const quantity = savedCart[key];
              selectedProduct.quantity = quantity;
              storedCart.push(selectedProduct);
            }
          }
          setCart(storedCart);
        }
      });
  }, []);
  return [cart, setCart];
};

export default useCart;
