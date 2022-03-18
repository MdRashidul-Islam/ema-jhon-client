import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Toast from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { addToDb } from "../../../utilities/fakedb";
import Cart from "../common/Cart";
import Header from "../common/Header";
import Spinner from "../custom/Spinner";
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

  //add to shopping cart
  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd._id === product._id);

    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd._id !== product._id);
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
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    setCart(newCart);

    addToDb(product.key);
  };

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
