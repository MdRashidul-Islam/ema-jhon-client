import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Toast from "sweetalert2";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../components/common/Cart";
import Navigation from "../components/common/Navigation";
import Product from "../components/Shop/Product";

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

  return (
    <OrderReviewStyled>
      <Navigation cart={cart} setCart={setCart} products={product} />

      <div className="shop_container">
        <div className="products_section">
          <div className="products">
            {cart.length
              ? cart?.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    handleRemove={handleRemove}
                  ></Product>
                ))
              : "No Order Found"}
          </div>
        </div>
        <div className="card">
          <Cart cart={cart}>
            <Link to="/checkout">
              <button>CheckOut</button>
            </Link>
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
        margin-top: 60px;
        overflow-y: scroll;
        height: 90vh;
        @media (max-width: 700px) {
          height: 580px;
        }
      }
    }
    .card {
      width: 20%;
      min-height: 100vh;

      @media (max-width: 700px) {
        position: fixed;
        bottom: 20px;
        width: 100%;
        min-height: 10vh;
        background-color: white;
      }
    }
  }
`;

export default OrderReview;
