import React, { useContext, useState } from "react";
import { assets } from "../../assets/asstes";

import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContex";
import axios from "axios";

const LoginPopup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [state, setState] = useState("Login");
  const getContext = useContext(StoreContext);

  if (!getContext) {
    return <div>Context not available</div>;
  }

  const { setShowLogin, serverUrl } = getContext;

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    let newUrl = serverUrl;
    if (state === "Login") {
      newUrl += "/api/user/login";
    } else if (state === "Sign up") {
      newUrl += "/api/user/signup";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      window.location.reload();
    } else {
      alert(response.data.message);
    }
  };

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="login-popup">
        <form action="" className="popup-container" onSubmit={handleOnSubmit}>
          <div className="login-popup-tittle">
            <h2>Login</h2>
            <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
          </div>
          <div className="login-popup-inputs">
            {state === "Login" ? (
              <></>
            ) : (
              <input
                onChange={onChangeHandler}
                value={data.name}
                name="name"
                type="text"
                placeholder="Your name"
                required
              ></input>
            )}

            <input
              type="email"
              onChange={onChangeHandler}
              value={data.email}
              name="email"
              placeholder="Your email"
              required
            />

            <input
              type="password"
              onChange={onChangeHandler}
              value={data.password}
              name="password"
              placeholder="Your password"
              required
            />
          </div>
          <button type="submit">
            {state === "Sign up" ? "Create Account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {state === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => setState("Sign up")}>Click Here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setState("Login")}>Click Here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
