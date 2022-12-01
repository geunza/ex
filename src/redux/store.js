import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

// 로딩창
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

// 모달온오프
let modalState = createSlice({
  name: "modalState",
  initialState: false,
  reducers: {
    modalOverflow(state, action) {
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

// 로그인여부
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

// 유저정보
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

// 공통코드
let supportInfo1 = createSlice({
  name: "supportInfo1",
  initialState: {
    spt_cd: {
      name: "지원분야",
      datas: [],
    },
    biz_cd: {
      name: "사업분야",
      datas: [],
    },
    tech_cd: {
      name: "기술분야",
      datas: [],
    },
    loc_cd: {
      name: "지역",
      datas: [],
    },
  },
  reducers: {
    setSupportInfo1(state, action) {
      let obj = { ...state };
      const data = action.payload;
      console.log(data);
    },
    setSupportInfoModal1(state, action) {
      //
    },
  },
});
export let { setSupportInfo1, setSupportInfoModal1 } = supportInfo1.actions;
let supportInfo2 = createSlice({
  name: "supportInfo2",
  initialState: {
    //
  },
  reducers: {
    setSupportInfo2(state, action) {
      //
    },
    setSupportInfoModal2(state, action) {
      //
    },
  },
});
export default configureStore({
  reducer: {
    // cart: cart.reducer,
    isLoggedIn: isLoggedIn.reducer,
    isLoading: isLoading.reducer,
    userInfo: userInfo.reducer,
    supportInfo1: supportInfo1.reducer,
    supportInfo2: supportInfo2.reducer,
    modalState: modalState.reducer,
  },
});
