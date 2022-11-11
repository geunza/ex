import { createSlice } from "@reduxjs/toolkit";
const supportObj1 = [
  {
    name: "사업자형태",
    btns: [
      { text: "예비창업자", value: "예비창업자", order: 1 },
      { text: "법인사업자", value: "법인사업자", order: 2 },
      { text: "개인사업자", value: "개인사업자", order: 3 },
    ],
  },
  {
    name: "창업기간",
    btns: [
      { text: "전체", value: "전체", order: 1 },
      { text: "1년 미만", value: "1년 미만", order: 2 },
      { text: "3년 미만", value: "3년 미만", order: 3 },
      { text: "7년 미만", value: "7년 미만", order: 4 },
      { text: "7년 이상", value: "7년 이상", order: 5 },
    ],
  },
  {
    name: "기업형태",
    btns: [
      { text: "전체", value: "전체", order: 1 },
      { text: "중소기업", value: "중소기업", order: 2 },
      { text: "소기업", value: "소기업", order: 3 },
      { text: "소상공인", value: "소상공인", order: 4 },
      { text: "1인기업", value: "1인기업", order: 5 },
      { text: "여성기업", value: "여성기업", order: 6 },
      { text: "장애인기업", value: "장애인기업", order: 7 },
      { text: "사회적기업", value: "사회적기업", order: 8 },
    ],
  },
];
const supportObj2 = [
  {
    data: [
      {
        name: "지원분야",
        btns: [
          { text: "전체", value: "전체", order: 1 },
          { text: "사업화 지원", value: "사업화 지원", order: 2 },
          { text: "시설공간", value: "시설공간", order: 3 },
          { text: "인건비 지원", value: "인건비 지원", order: 4 },
          { text: "마케팅 홍보", value: "마케팅 홍보", order: 5 },
          { text: "멘토링·교육", value: "멘토링·교육", order: 6 },
          { text: "대출·융자", value: "대출·융자", order: 7 },
          { text: "R&D", value: "R&D", order: 8 },
          { text: "행사", value: "행사", order: 9 },
          { text: "기타", value: "기타", order: 10 },
        ],
      },
    ],
  },
  {
    data: [
      {
        name: "사업분야",
        btns: [
          { text: "전체", value: "전체", order: 1 },
          { text: "제조", value: "제조", order: 2 },
          { text: "지식서비스", value: "지식서비스", order: 3 },
          { text: "융합", value: "융합", order: 4 },
        ],
      },
      {
        name: "기술분야",
        btns: [
          { text: "전체", value: "전체", order: 1 },
          { text: "딥테크", value: "딥테크", order: 2 },
          { text: "ICT", value: "ICT", order: 3 },
          { text: "제조/하드웨어", value: "제조/하드웨어", order: 4 },
          { text: "푸드/농업", value: "푸드/농업", order: 5 },
          { text: "커머스", value: "커머스", order: 6 },
          { text: "물류/유통", value: "물류/유통", order: 7 },
          { text: "헬스케어/바이오", value: "헬스케어/바이오", order: 8 },
          { text: "환경/에너지", value: "환경/에너지", order: 9 },
          { text: "3D 프린팅", value: "3D 프린팅", order: 10 },
          { text: "R&D", value: "R&D", order: 11 },
          { text: "교육", value: "교육", order: 12 },
          { text: "홈리빙/펫", value: "홈리빙/펫", order: 13 },
          { text: "여행/레저/스포츠", value: "여행/레저/스포츠", order: 14 },
          { text: "금융/보험/핀테크", value: "금융/보험/핀테크", order: 15 },
          {
            text: "자동차/모빌리티/교통",
            value: "자동차/모빌리티/교통",
            order: 16,
          },
          { text: "통신/보안/데이터", value: "통신/보안/데이터", order: 17 },
          { text: "공예/디자인", value: "공예/디자인", order: 18 },
          { text: "기타", value: "기타", order: 19 },
        ],
      },
    ],
  },
  {
    data: [
      {
        name: "지역",
        btns: [
          { text: "전국", value: "전국", order: 1 },
          { text: "서울", value: "서울", order: 2 },
          { text: "경기", value: "경기", order: 3 },
          { text: "인천", value: "인천", order: 4 },
          { text: "강원", value: "강원", order: 5 },
          { text: "부산", value: "부산", order: 6 },
          { text: "대구", value: "대구", order: 7 },
          { text: "대전", value: "대전", order: 8 },
          { text: "광주", value: "광주", order: 9 },
          { text: "경북", value: "경북", order: 10 },
          { text: "경남", value: "경남", order: 11 },
          { text: "충북", value: "충북", order: 12 },
          { text: "충남", value: "충남", order: 13 },
          { text: "전북", value: "전북", order: 14 },
          { text: "전남", value: "전남", order: 15 },
          { text: "울산", value: "울산", order: 16 },
          { text: "세종", value: "세종", order: 17 },
          { text: "제주", value: "제주", order: 18 },
          { text: "전체", value: "전체", order: 19 },
        ],
      },
    ],
  },
];
let supportInfo = createSlice({
  name: "supportInfo",
  initialState: {
    target: ["aa"],
    period: [],
    category: [],
    region: [],
    field: [],
  },
  reducers: {
    setSupportInfo(state, action) {
      // console.log(state);
      // console.log(action.payload);
      let obj = { ...state };
      const data = action.payload;
      const name = data.name;
      const value = data.value;
      obj[name] = value;
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
export let data1 = supportObj1;
export let data2 = supportObj2;
export default [supportInfo];
