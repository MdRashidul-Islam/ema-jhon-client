import React from "react";
import styled from "styled-components";

const CheckoutProduct = ({ product }) => {
  const {
    _id,
    key,
    name,
    img,
    stock,
    seller,
    price,
    star,
    features,
    quantity,
  } = product;
  return (
    <CheckoutProductStyled>
      <div className="checkout_product">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="info">
          <h6>{name}</h6> <br />
          <h6>$ {price}</h6> <br />
          <h6>Quantity: {quantity}</h6>
        </div>
      </div>
    </CheckoutProductStyled>
  );
};

const CheckoutProductStyled = styled.div`
  .checkout_product {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
    border-bottom: 1px solid lightgrey;
    @media (max-width: 700px) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 40vh;
    }
    img {
      width: 150px;
      object-fit: contain;
      padding-right: 20px;
    }
    .info {
      width: 50%;
      @media (max-width: 700px) {
        width: 100%;
        padding: 20px;
      }
    }
  }
`;

export default CheckoutProduct;
