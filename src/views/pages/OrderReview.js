import React, { useState } from "react";
import Navigation from "../components/common/Navigation";
import styled from "styled-components";
import useProducts from "../../hooks/useProducts";
import useCart from "../../hooks/useCart";
import Cart from "../components/common/Cart";
import Product from "../components/Shop/Product";
import { clearTheCart, removeFromDb } from "../../utilities/fakedb";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Toast from "sweetalert2";

const OrderReview = () => {
  const [product] = useProducts();
  const [cart, setCart] = useCart(product);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    const newCart = cart.filter((product) => product.key !== id);
    setCart(newCart);
    removeFromDb(id);
    Toast.fire({
      icon: "success",
      title: "Product Remove Successfully",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  const handleShipping = () => {
    navigate("/shipping");
    // clearTheCart();
  };

  return (
    <OrderReviewStyled>
      <Navigation cart={cart} setCart={setCart} products={product} />

      <div className="shop_container">
        <div className="products_section">
          <div className="products">
            {cart.length
              ? cart?.map((product) => (
                  <Product
                    key={product.key}
                    product={product}
                    handleRemove={handleRemove}
                  ></Product>
                ))
              : "No Order Found"}
          </div>
        </div>
        <div className="card">
          <Cart cart={cart}>
            <button onClick={handleShipping}>Shipping</button>
          </Cart>
        </div>
      </div>
    </OrderReviewStyled>
  );
};

const OrderReviewStyled = styled.div`
  height: 100vh;
  overflow: hidden;
  .shop_container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 700px) {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }

    .products_section {
      width: 80%;
      border-right: 1px solid gray;
      @media (max-width: 700px) {
        width: 100%;
        border-right: 0px solid gray;
      }

      .products {
        overflow-y: scroll;
        height: 520px;
        @media (max-width: 700px) {
          height: 580px;
        }
      }
    }
    .card {
      width: 20%;

      min-height: 100vh;
      @media (max-width: 700px) {
        width: 100%;
        min-height: 10vh;
      }
    }
  }
`;

export default OrderReview;
