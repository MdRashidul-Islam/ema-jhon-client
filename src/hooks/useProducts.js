import { useEffect, useState } from "react";

const useProducts = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://immense-harbor-60117.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProduct(data.products));
  }, []);
  return [product, setProduct];
};

export default useProducts;
