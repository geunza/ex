import {
  current,
  configureStore,
  createSlice,
  combineReducers,
} from "@reduxjs/toolkit";
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
  initialState: {},
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
let supportInfo = createSlice({
  name: "supportInfo",
  initialState: {
    prd_cd: {
      name: "창업기간",
      multiply: false,
      datas: [
        {
          code_nm: "전체",
          code: "999",
          ctg_cd: "prd_cd",
          ctg_nm: "창업기간",
        },
      ],
    },
    spt_cd: {
      name: "지원분야",
      multiply: true,
      datas: [
        {
          code_nm: "전체",
          code: "01",
          ctg_cd: "spt_cd",
          ctg_nm: "지원분야",
        },
      ],
    },
    biz_cd: {
      name: "사업분야",
      multiply: true,
      datas: [
        {
          code_nm: "전체",
          code: "01",
          ctg_cd: "biz_cd",
          ctg_nm: "사업분야",
        },
      ],
    },
    tech_cd: {
      name: "기술분야",
      multiply: true,
      datas: [
        {
          code_nm: "전체",
          code: "01",
          ctg_cd: "tech_cd",
          ctg_nm: "기술분야",
        },
      ],
    },
    loc_cd: {
      name: "지역",
      multiply: true,
      datas: [
        {
          code_nm: "전국",
          code: "C82",
          ctg_cd: "loc_cd",
          ctg_nm: "지역",
        },
      ],
    },
  },
  reducers: {
    setSupportInfo(state, action) {
      // const obj = { ...state };
      const item = action.payload;
      const cate = item.ctg_cd;
      const stateCate = state[cate];
      const multiply = stateCate.multiply;
      if (multiply) {
        if (someItem(stateCate.datas, item)) {
          stateCate.datas = filterItem(stateCate.datas, item);
        } else {
          stateCate.datas = [...stateCate.datas, item];
        }
      } else {
        if (someItem(stateCate.datas, item)) {
          stateCate.datas = [];
        } else {
          stateCate.datas = [item];
        }
      }
      function someItem(target, item) {
        return target.some(
          (x) => Object.entries(x).toString() == Object.entries(item).toString()
        );
      }
      function filterItem(target, item) {
        return target.filter(
          (x) => Object.entries(x).toString() != Object.entries(item).toString()
        );
      }
    },
    setSupportInfoModal(state, action) {
      //
    },
  },
});
export let { setSupportInfo, setSupportInfoModal } = supportInfo.actions;

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
