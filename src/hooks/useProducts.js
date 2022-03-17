import { useEffect, useState } from "react";

const useProducts = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProduct(data.products));
  }, []);
  return [product, setProduct];
};

export default useProducts;
