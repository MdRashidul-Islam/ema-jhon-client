import React from "react";
import styled from "styled-components";

const Cart = (props) => {
  const { cart } = props;
  // console.log(props);

  //total
  let total = 0;
  let totalQuantity = 0;
  for (const product of cart) {
    product.quantity = !product.quantity ? 1 : product.quantity;
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  }

  // const totalQuantity = cart.reduce(
  //   (previous, product) => previous + product.quantity,
  //   0
  // );

  // const total = cart.reduce((previous, product) => previous + product.price, 0);

  const shipping = 15;

  const tax = ((total + shipping) * 10) / 100;

  const grandTotal = total + shipping + tax;

  return (
    <CartStyled>
      <h3 style={{ textAlign: "center" }}>Order Summary</h3>
      <h4 style={{ textAlign: "center" }}>Items Quantity : {totalQuantity}</h4>
      <div className="calculation">
        <div className="card_title">
          <h5>Items</h5>
          <h5>Shipping & Handling</h5>
          <h5>Total before tax</h5>

          <h4 style={{ color: "crimson" }}>Order Total</h4>
        </div>
        <div className="card_value">
          <h5>: $ {total.toFixed(2)}</h5>
          <h5>: $ {cart.length ? shipping : 0}</h5>
          <h5>: $ {cart.length ? tax.toFixed(2) : 0}</h5>

          <hr />
          <h4 style={{ color: "crimson" }}>
            : ${cart.length ? grandTotal.toFixed(2) : 0}
          </h4>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>{props.children}</div>
    </CartStyled>
  );
};

const CartStyled = styled.div`
  .calculation {
    margin-left: 10px;
    margin-top: 20px;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
`;

export default Cart;
