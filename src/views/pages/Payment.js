import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useCart from "../../hooks/useCart";
import axios from "../../axios";

const Payment = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [cart] = useCart();
  const stripe = useStripe();
  const elements = useElements();

  let total = 0;
  let totalQuantity = 0;
  for (const product of cart) {
    product.quantity = !product.quantity ? 1 : product.quantity;
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  }
  const shipping = 15;

  const tax = ((total + shipping) * 10) / 100;

  const grandTotal = total + shipping + tax;

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        url: `/payments/create?total=${grandTotal * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <div className="payment_Container">
          <button disabled={processing || disabled || succeeded}>
            <span>
              {processing ? <p>Processing</p> : `Pay : $ ${total.toFixed(2)}`}
            </span>
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Payment;
