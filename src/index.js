import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App";
import { Provider } from "react-redux";
import store from "store.js";

const root = ReactDOM.createRoot(document.getElementById("exito"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
