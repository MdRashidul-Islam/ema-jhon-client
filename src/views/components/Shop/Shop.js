import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useCart from "../../../hooks/useCart";
import useProducts from "../../../hooks/useProducts";
import { addToDb, getStoredCart } from "../../../utilities/fakedb";
import Cart from "../common/Cart";
import Header from "../common/Header";
import Spinner from "../custom/Spinner";
import Toast from "sweetalert2";

import Product from "./Product";

const Shop = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  // let size = 10;

  // const [products, setProducts] = useProducts();

  useEffect(() => {
    console.log(size);
    fetch(`http://localhost:4000/products?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplayProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.key === product.key);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.key !== product.key);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    Toast.fire({
      icon: "success",
      title: "Product Added Successfully",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    setCart(newCart);
    addToDb(product.key);
  };

  // useEffect(() => {
  //   if (products.length) {
  //     const savedCart = getStoredCart();
  //     const storedCart = [];
  //     for (const key in savedCart) {
  //       const selectedProduct = products.find((product) => product.key === key);
  //       if (selectedProduct) {
  //         const quantity = savedCart[key];
  //         selectedProduct.quantity = quantity;
  //         storedCart.push(selectedProduct);
  //       }
  //     }
  //     setCart(storedCart);
  //   }
  // }, [products]);

  return (
    <ShopStyled>
      <Header
        cart={cart}
        products={products}
        setDisplayProducts={setDisplayProducts}
        setSize={setSize}
        setProducts={setProducts}
      />
      <div className="shop_container">
        <div className="products_section">
          <div className="products">
            {displayProducts.length ? (
              displayProducts.map((product) => (
                <Product
                  key={product.key}
                  product={product}
                  handleAddToCart={handleAddToCart}
                ></Product>
              ))
            ) : (
              <Spinner />
            )}
          </div>
          <div className="pagination">
            {/* <Pagination
                onClick={() => {
                  pageCount.map((number) => setPage(number));
                }}
                count={pageCount}
                color="primary"
              /> */}
            {[...Array(pageCount).keys()].map((number) => (
              <button
                className={number === page ? "selected" : " "}
                key={number}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <Cart cart={cart}>
            <Link to="/orderReview">
              <button>Review Your order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </ShopStyled>
  );
};

const ShopStyled = styled.div`
  .shop_container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 70px;
    @media (max-width: 700px) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .products_section {
      width: 80%;
      border-right: 1px solid gray;
      @media (max-width: 700px) {
        width: 100%;
        border-right: 0px solid gray;
      }
      .products {
        min-height: 100vh;
        /* overflow-y: scroll; */

        @media (max-width: 700px) {
          min-height: 100vh;
        }
      }
      .pagination {
        text-align: center;
        margin-bottom: 30px;
        @media (max-width: 700px) {
          height: 150px;
          margin-bottom: -50px;
          margin-top: 20px;
        }

        button {
          padding: 8px;
          margin: 10px;
          border: 1px solid #eea546;
          background: none;
          color: black;
          @media (max-width: 700px) {
            margin: 10px 6px;
          }
        }
        .selected {
          background: #eea546;
          color: white;
        }
      }
    }
    .card {
      width: 20%;
      min-height: 100vh;
      position: fixed;
      right: 0;
      @media (max-width: 700px) {
        display: none;
      }
    }
  }

  //responsive
`;

export default Shop;
