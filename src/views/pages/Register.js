import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logo2.png";

import "./Login.css";

const Register = () => {
  const { registerUser, isLoading } = useAuth();
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (loginData.password !== loginData.password2) {
      Swal.fire("Opps!", "Passwords do not match", "error");
      return;
    }

    registerUser(loginData.name, loginData.email, loginData.password, navigate);
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" src={logo} alt="" />
      </Link>
      <div className="login_container">
        <h1>Sign-Up</h1>
        <form onSubmit={handleRegister}>
          <h5>Name</h5>
          <input name="name" onBlur={handleOnBlur} type="text" />
          <h5>E-mail</h5>
          <input name="email" onBlur={handleOnBlur} type="email" />
          <h5>Password</h5>
          <input name="password" onBlur={handleOnBlur} type="password" />
          <h5>Re-type Password</h5>
          <input name="password2" onBlur={handleOnBlur} type="password" />
          <button type="submit" className="login_signInButton">
            Sign Up
          </button>
        </form>
        <Link to="/login">Already have an account? please log in.</Link>
      </div>
    </div>
  );
};

export default Register;
