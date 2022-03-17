import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import useCart from "./hooks/useCart";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./views/components/common/Header";
import HomePage from "./views/pages/HomePage";
import Login from "./views/pages/Login";
import ManageInventory from "./views/pages/ManageInventory";
import OrderedList from "./views/pages/OrderedList";
import OrderReview from "./views/pages/OrderReview";
import PlaceOrder from "./views/pages/PlaceOrder";
import Register from "./views/pages/Register";
import ShippingPage from "./views/pages/ShippingPage";

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

          <Route path="manageInventory" element={<ManageInventory />} />
          <Route path="placeOrder" element={<PlaceOrder />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="orderedList" element={<OrderedList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
