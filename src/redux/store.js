import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import supportInfo from "redux/store/supportInfoSlice";

let isLoading = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    loadingStart() {
      return true;
    },
    loadingEnd() {
      return false;
    },
  },
});
export let { loadingStart, loadingEnd } = isLoading.actions;

let isLoggedIn = createSlice({
  name: "isLoggedIn",
  initialState: false,
  reducers: {
    signIn(state, action) {
      localStorage.setItem("isLoggedIn", "true");
      return true;
    },
    signOut(state, action) {
      localStorage.removeItem("isLoggedIn");
      return false;
    },
  },
});
export let { signIn, signOut } = isLoggedIn.actions;

let userInfo = createSlice({
  name: "userInfo",
  initialState: {
    id: "",
    usernickname: "",
    useremail: "",
  },
  reducers: {
    setUserInfo(state, action) {
      const infoString = JSON.stringify(action.payload.id);
      localStorage.setItem("userId", infoString);
      return action.payload;
    },
    removeUserInfo(state, action) {
      localStorage.removeItem("userId");
      return { id: "", usernickname: "", useremail: "" };
    },
  },
});
export let { setUserInfo, removeUserInfo, setDefaultSetup } = userInfo.actions;

let modalState = createSlice({
  name: "modalState",
  initialState: false,
  reducers: {
    modalOverflow(state, action) {
      console.log(action.payload);
      if (action.payload) {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;
        `;
      } else {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
      return false;
    },
  },
});
export let { modalOverflow } = modalState.actions;
export default configureStore({
  reducer: {
    // cart: cart.reducer,
    isLoggedIn: isLoggedIn.reducer,
    isLoading: isLoading.reducer,
    userInfo: userInfo.reducer,
    supportInfo: supportInfo.reducer,
    modalState: modalState.reducer,
  },
});
