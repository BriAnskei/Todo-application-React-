import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For the modal form input design in MDBootstrap (Material Design for Bootstrap)

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ContextProvider from "./context/StoreContex";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
