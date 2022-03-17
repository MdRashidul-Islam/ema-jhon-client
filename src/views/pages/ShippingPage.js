import React from "react";
import Navigation from "../components/common/Navigation";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { getStoredCart } from "../../utilities/fakedb";
import Toast from "sweetalert2";

const ShippingPage = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const savedCart = getStoredCart();
    data.cart = savedCart;

    fetch("http://localhost:4000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Toast.fire({
            icon: "success",
            title: "Product Remove Successfully",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
        }
      });
  };
  return (
    <ShippingPageStyled>
      <Navigation />
      <div className="shipping">
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} defaultValue={user?.displayName} />
            <input {...register("email")} defaultValue={user?.email} />

            <input type="number" {...register("phone")} placeholder="Phone" />
            <textarea {...register("address")} placeholder="Address" />
            <input type="submit" />
          </form>
        </div>
      </div>
    </ShippingPageStyled>
  );
};

const ShippingPageStyled = styled.div`
  .shipping {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
      width: 30%;
      form {
        display: flex;
        flex-direction: column;
        input {
          height: 40px;
          margin-bottom: 5px;
          padding-left: 5px;
        }
        textarea {
          height: 70px;
          margin-bottom: 5px;
          padding-left: 5px;
        }
      }
    }
  }
`;

export default ShippingPage;
