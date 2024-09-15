import React, { Profiler, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContex";
import { assets } from "../../assets/asstes";
const NavBar = () => {
  const context = useContext(StoreContext);
  if (!context) return <div>Context not found</div>;

  const { setShowLogin, token, setToken } = context;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowLogin(true);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav
        className="navbar navbar-light d-flex align-items-center"
        style={{ backgroundColor: "#272d3e13" }}
      >
        <a className="navbar-brand ms-3" href="#">
          <img
            src="https://play-lh.googleusercontent.com/QhQaJhzdWrZ08HfrsqylDUFIzMjcUxh0UNvFqeZRSpGsTSLC3UyLLq5u9ggKOr-8tQ"
            width="30"
            height="30"
            alt="Logo"
          />
        </a>
        <h4 className="navbarText ms-auto me-auto">Todo-app</h4>
        {!token ? (
          <button
            type="button"
            className="btn btn-outline-info me-3"
            onClick={handleSubmit}
          >
            Login
          </button>
        ) : (
          <div className="navbar-profile me-3">
            <img src={assets.profile_icon} alt="" onClick={logout} />
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
