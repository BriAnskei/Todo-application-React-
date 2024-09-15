import { useContext, useState } from "react";
import Todo from "./Todo";
import LoginPopup from "./components/LoginPopUp/LoginPopup";
import { StoreContext } from "./context/StoreContex";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const context = useContext(StoreContext);
  if (!context) return <div>Context not found</div>;

  const { showLogin } = context;

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup />}
      <Todo />
    </>
  );
}
export default App;
