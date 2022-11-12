import { createSlice } from "@reduxjs/toolkit";
let supportInfo = createSlice({
  name: "supportInfo",
  initialState: {
    businessType: { text: "예비창업자", order: 0 },
    businessperiod: { text: "전체", order: 0 },
    corporateType: [{ text: "전체", order: 0 }],
    objective: [{ text: "전체", order: 0 }],
    businessArea: [{ text: "전체", order: 0 }],
    techArea: [{ text: "전체", order: 0 }],
    region: [{ text: "전국", order: 0 }],
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
        if (obj[name].includes(value)) {
          obj[name] = [...obj[name]].filter((item) => item != value);
        } else {
          obj[name] = [...obj[name], value];
        }
      } else {
        obj[name] = { text: value, order: order };
      }
      console.log(obj);
      return obj;
    },
    removeSupportInfo(state, action) {
      console.log(state);
      console.log(action.payload);
      return true;
    },
  },
});
export let { setSupportInfo, removeSupportInfo } = supportInfo.actions;
export default supportInfo;
