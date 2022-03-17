import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import Header from "../components/common/Header";
import "./Login.css";
import logo from "../../assets/img/logo2.png";

const Login = () => {
  const { signWithEmail, googleSignIn } = useAuth();
  const [loginData, setLoginData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSignIn(location, navigate);
  };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleLogin = (e) => {
    signWithEmail(loginData.email, loginData.password, location, navigate);
    e.preventDefault();
  };

  return (
    <>
      <div className="login">
        <Link to="/">
          <img className="login_logo" src={logo} alt="" />
        </Link>
        <div className="login_container">
          <h1>Sign-in</h1>
          <form onSubmit={handleLogin}>
            <h5>E-mail</h5>
            <input name="email" onBlur={handleOnBlur} type="email" />
            <h5>Password</h5>
            <input name="password" onBlur={handleOnBlur} type="password" />
            <button type="submit" className="login_signInButton">
              Sign In
            </button>
          </form>
          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
          <Link to="/register">
            <button className="login_registerButton">
              Create your Amazon Account
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
