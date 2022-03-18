import { Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import CheckoutPage from "./views/pages/CheckoutPage";
import HomePage from "./views/pages/HomePage";
import Login from "./views/pages/Login";
import OrderReview from "./views/pages/OrderReview";
import Register from "./views/pages/Register";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./views/pages/Payment";

const promise = loadStripe(
  "pk_test_51K84IgEzVopus8oCtPl0mGu2K9SP3t8eveXXgIjd6nOacllgwSIvP93ok66XRu01yPq0eDJKCvrReIdaQ4R3XRdm00qJ0oOhTI"
);

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<HomePage />} />
          <Route
            path="orderReview"
            element={
              <PrivateRoute>
                <OrderReview />
              </PrivateRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route
            path="checkout"
            element={
              <Elements stripe={promise}>
                <CheckoutPage />
              </Elements>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
