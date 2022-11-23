import { configureStore, createSlice } from "@reduxjs/toolkit";
import supportInfo from "store/supportInfoSlice";
/*
createSlice({
  name : 'state이름~~',
  initialState:'값'
})
let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, action) {
      const id = action.payload.id;
      state.find((e) => e.id == id).count += 1;
    },
  },
});
export let { changeCount } = cart.actions;
*/

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
      console.log(state);
      console.log(action.payload);
      return true;
    },
    signOut(state, action) {
      console.log(state);
      console.log(action.payload);
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
      return {
        id: "2464295270",
        usernickname: "뇽뇽타",
        useremail: "safa940812@gmail.com",
      };
      // return action.payload;
    },
    removeUserInfo(state, action) {
      return { id: "", usernickname: "", useremail: "" };
    },
  },
});
export let { setUserInfo, removeUserInfo } = userInfo.actions;

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
