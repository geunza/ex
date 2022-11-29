import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";

import { Provider } from "react-redux";
import store from "redux/store.js";

// import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import configureStore from "redux/store";
// import { rootReducer } from "redux/store/index";

// const store = createStore(rootReducer);
// const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("exito")
);
