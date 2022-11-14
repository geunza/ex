import { createSlice } from "@reduxjs/toolkit";
let supportInfo = createSlice({
  name: "supportInfo",
  initialState: {
    사업자형태: { text: "예비창업자", order: 0 },
    창업기간: { text: "전체", order: 0 },
    기업형태: [{ text: "전체", order: 0 }],
    지원분야: [{ text: "전체", order: 0 }],
    사업분야: [{ text: "전체", order: 0 }],
    기술분야: [{ text: "전체", order: 0 }],
    지역: [{ text: "전국", order: 0 }],
  },
  reducers: {
    setSupportInfo(state, action) {
      // console.log(state);
      // console.log(action.payload);
      let obj = { ...state };
      const data = action.payload;
      const name = data.name;
      const value = data.value;
      const multiply = data.multiply;
      const order = data.order;
      if (multiply) {
        obj[name].some((item) => item.text == value)
          ? (obj[name] = obj[name].filter((item) => item.text != value))
          : (obj[name] = [...obj[name], { text: value, order: order }].sort(
              (a, b) => a.order - b.order
            ));
      } else {
        obj[name] = { text: value, order: order };
      }
      return obj;
    },
    setSupportInfoModal(state, action) {
      return { ...state, ...action.payload };
    },
  },
});
export let { setSupportInfo, setSupportInfoModal } = supportInfo.actions;
export default supportInfo;
