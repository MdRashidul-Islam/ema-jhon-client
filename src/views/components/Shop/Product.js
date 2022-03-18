import Rating from "@mui/material/Rating";
import React from "react";
import styled from "styled-components";

const Product = ({ product, handleAddToCart, handleRemove }) => {
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
    <ProductStyled>
      <div className="product">
        <div className="left">
          <img src={img} alt="" />
        </div>
        <div className="right">
          <div className="info">
            <h3>{name}</h3>
            <br />
            <h5>{handleRemove ? `Sold by: ${seller}` : `by: ${seller}`}</h5>
            <br />
            <h3>${price}</h3>
            <br />
            {handleRemove ? (
              <h4>Quantity:{quantity}</h4>
            ) : (
              <h6>Only {stock} left in stock - order soon</h6>
            )}
            <br />

            {handleAddToCart ? (
              <button
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                Add to cart
              </button>
            ) : (
              <button
                onClick={() => {
                  handleRemove(key);
                }}
              >
                Remove
              </button>
            )}
          </div>
          {handleAddToCart && (
            <div className="features">
              <Rating name="read-only" value={star} readOnly />
              <h3 style={{ color: "#f3a847", margin: "5px 0px" }}>Features</h3>
              {features.map((feature) => (
                <div className="feature" key={feature.key}>
                  <h6>• {feature?.description} </h6>
                  <h6> : {feature?.value}</h6>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProductStyled>
  );
};

const ProductStyled = styled.div`
  .product {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    padding: 20px;
    @media (max-width: 700px) {
      flex-direction: column;
    }
    .info {
      width: 60%;
      @media (max-width: 700px) {
        width: 100%;
        h3 {
          text-align: justify;
        }
      }
    }
    .left {
      margin-left: 20px;
      img {
        width: 200px;
        object-fit: contain;
      }
    }
    .right {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 40px;
      @media (max-width: 700px) {
        margin-left: 0px;
      }
      .features {
        margin-top: 20px;
        width: 40%;
        @media (max-width: 700px) {
          padding: 10px;
        }
        .feature {
          display: flex;
        }
      }
    }
  }
`;

export default Product;
