import React from "react";
import useCart from "../../hooks/useCart";
import Navigation from "../components/common/Navigation";
import Product from "../components/Shop/Product";
import CheckoutProduct from "./CheckoutProduct";
import Payment from "./Payment";
import styled from "styled-components";
import Cart from "../components/common/Cart";

const CheckoutPage = () => {
  const [cart] = useCart();

  return (
    <CheckoutPageStyled>
      <Navigation cart={cart} />

      <div className="product_section">
        {cart.map((product) => (
          <CheckoutProduct
            key={product._id}
            product={product}
          ></CheckoutProduct>
        ))}
      </div>
      <div className="payment">
        <Payment />
      </div>
    </CheckoutPageStyled>
  );
};

const CheckoutPageStyled = styled.div`
  .product_section {
    margin-top: 60px;
    height: 80vh;
    overflow: scroll;
    @media (max-width: 700px) {
      margin-top: 80px;
    }
  }
  .payment {
    width: 50%;
    height: 10vh;
    padding: 10px;
    margin: 40px 0px;
    position: fixed;
    bottom: 0;
    background: white;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
`;

export default CheckoutPage;
