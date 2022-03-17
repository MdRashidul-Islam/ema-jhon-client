import React, { createContext } from "react";
import useCart from "../hooks/useCart";
import useFirebase from "../hooks/useFirebase";
import useProducts from "../hooks/useProducts";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allContexts = useFirebase();
  return (
    <AuthContext.Provider value={allContexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
