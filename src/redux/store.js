import { current, configureStore, createSlice } from "@reduxjs/toolkit";
import logger from "redux-logger";
import supportItems from "db/supportItems.json";
import { isCompositeComponent } from "react-dom/test-utils";
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
      sessionStorage.setItem("isLoggedIn", "true");
      return true;
    },
    signOut(state, action) {
      sessionStorage.removeItem("isLoggedIn");
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
      sessionStorage.setItem("userId", infoString);
      return action.payload;
    },
    removeUserInfo(state, action) {
      sessionStorage.removeItem("userId");
      return { id: "", usernickname: "", useremail: "" };
    },
  },
});
export let { setUserInfo, removeUserInfo, setDefaultSetup } = userInfo.actions;

// 기업정보
let userCompany = createSlice({
  name: "userCompany",
  initialState: {},
  reducers: {
    setCompanyInfo(state, action) {
      return action.payload;
    },
  },
});
export let { setCompanyInfo } = userCompany.actions;

let supportItem = createSlice({
  name: "supportItem",
  initialState: {},
  reducers: {
    setSupportItem(state, action) {
      const data = action.payload;
      const cate = data.cate;
      const arr = data.arr;
      state[cate] = arr;
    },
  },
});
export let { setSupportItem } = supportItem.actions;
let supportItemReady = createSlice({
  name: "supportItemReady",
  initialState: false,
  reducers: {
    setSupportItemReady(state, action) {
      return action.payload;
    },
  },
});

export let { setSupportItemReady } = supportItemReady.actions;
// 공통코드
let supportInfo = createSlice({
  name: "supportInfo",
  initialState: {
    bizp_type_cd: {
      name: "사업자형태",
      multiply: true,
      require: true,
      datas: [
        {
          code_nm: "예비창업자",
          code: "02",
          ctg_cd: "bizp_type_cd",
          ctg_nm: "사업자형태",
        },
      ],
    },
    biz_type_cd: {
      name: "기업형태",
      multiply: true,
      require: true,
      datas: [
        {
          code_nm: "중소기업",
          code: "02",
          ctg_cd: "biz_type_cd",
          ctg_nm: "사업형태",
        },
      ],
    },
    prd_cd: {
      name: "창업기간",
      multiply: false,
      require: true,
      datas: [
        {
          code_nm: "1년 미만",
          code: "10",
          ctg_cd: "prd_cd",
          ctg_nm: "창업기간",
        },
      ],
    },
    spt_cd: {
      name: "지원분야",
      multiply: true,
      require: true,
      datas: [
        {
          code_nm: "사업화 지원",
          code: "02",
          ctg_cd: "spt_cd",
          ctg_nm: "지원분야",
        },
      ],
    },
    biz_cd: {
      name: "사업분야",
      multiply: true,
      require: true,
      datas: [
        {
          code_nm: "제조",
          code: "02",
          ctg_cd: "biz_cd",
          ctg_nm: "사업분야",
        },
      ],
    },
    tech_cd: {
      name: "기술분야",
      multiply: true,
      require: true,
      datas: [
        {
          code_nm: "딥테크",
          code: "02",
          ctg_cd: "tech_cd",
          ctg_nm: "기술분야",
        },
      ],
    },
    loc_cd: {
      name: "지역",
      multiply: true,
      require: false,
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
      const name = item.code_nm;
      const cate = item.ctg_cd;
      const stateCate = state[cate];
      const require = stateCate.require;
      const multiply = stateCate.multiply;
      if (multiply) {
        if (name == "전체" || name == "전국") {
          if (
            stateCate.datas
              .filter((x) => x.code_nm != "전체")
              .filter((x) => x.code_nm != "전국").length == 0
          ) {
            alert("한가지 이상 선택해주세요.");
          }
          stateCate.datas = [item];
        } else {
          stateCate.datas = stateCate.datas
            .filter((x) => x.code_nm != "전체")
            .filter((x) => x.code_nm != "전국");
          if (someItem(stateCate.datas, item)) {
            if (require && stateCate.datas.length == 1) {
              alert("한가지 이상 선택해주세요.");
            } else {
              stateCate.datas = filterItem(stateCate.datas, item);
            }
          } else {
            stateCate.datas = addItem(stateCate.datas, item);
          }
        }
      } else {
        if (someItem(stateCate.datas, item)) {
          if (require) {
            alert("한가지 이상 선택해주세요.");
          }
        } else {
          stateCate.datas = [item];
        }
      }
      console.log([stateCate.datas]);
      function someItem(target, item) {
        if (target.length > 0) {
          return target.some(
            (x) =>
              Object.entries(x).toString() == Object.entries(item).toString()
          );
        } else {
          return true;
        }
      }
      function filterItem(target, item) {
        return target.filter(
          (x) => Object.entries(x).toString() != Object.entries(item).toString()
        );
      }
      function addItem(target, item) {
        return [...target, item].sort((a, b) => {
          return a.code - b.code;
        });
      }
    },
    setSupportInfoModal(state, action) {
      const data = action.payload;
      const cate = data.name;
      const datas = data.datas;
      state[cate].datas = datas;
    },
    setSupportInfoDefault(state, action) {
      return action.payload;
    },
  },
});
export let { setSupportInfo, setSupportInfoModal, setSupportInfoDefault } =
  supportInfo.actions;

// 지원 리스트 데이터
let supportData = createSlice({
  name: "supportData",
  initialState: [],
  reducers: {
    setSupportData(state, action) {
      return action.payload;
    },
  },
});
export let { setSupportData } = supportData.actions;

let loginCheck = createSlice({
  name: "loginCheck",
  initialState: false,
  reducers: {
    setLoginCheck(state, action) {
      return action.payload;
    },
  },
});
export let { setLoginCheck } = loginCheck.actions;

let kakaoInform = createSlice({
  name: "kakaoInform",
  initialState: { state: false, datas: {} },
  reducers: {
    setKakaoInform(state, action) {
      return action.payload;
    },
  },
});
export let { setKakaoInform } = kakaoInform.actions;
export default configureStore({
  reducer: {
    // cart: cart.reducer,
    isLoggedIn: isLoggedIn.reducer,
    isLoading: isLoading.reducer,
    userInfo: userInfo.reducer,
    userCompany: userCompany.reducer,
    supportInfo: supportInfo.reducer,
    supportItem: supportItem.reducer,
    supportItemReady: supportItemReady.reducer,
    modalState: modalState.reducer,
    supportData: supportData.reducer,
    loginCheck: loginCheck.reducer,
    kakaoInform: kakaoInform.reducer,
  },
});
