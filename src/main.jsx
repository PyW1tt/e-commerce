import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import { AddProductProvide } from "./context/addProduct.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <AddProductProvide>
      <App />
    </AddProductProvide>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
