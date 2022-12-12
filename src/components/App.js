import styles from "scss/components/App.module.scss";
import "scss/reset.scss";
import "scss/global.scss";
import { useState } from "react";
import { signIn, setUserInfo } from "redux/store";
import AppRouter from "components/Router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setSupportItem } from "redux/store";
function App() {
  const dispatch = useDispatch();
  const getFilterData = (code) => {
    axios({
      url: `/common/codeDtlList?ctgCd=${code}`,
      method: "POST",
    }).then((res) => {
      dispatch(setSupportItem({ cate: code, arr: res.data }));
    });
  };
  useEffect(() => {
    getFilterData("bizp_type_cd"); // 사업자형태
    getFilterData("prd_cd"); // 창업기간
    getFilterData("biz_type_cd"); // 사업형태
    getFilterData("spt_cd"); // 지원분야
    getFilterData("biz_cd"); // 사업분야
    getFilterData("tech_cd"); // 기술분야
    getFilterData("loc_cd"); // 지역
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      const userId = JSON.parse(sessionStorage.getItem("userId"));
      defaultSignIn(userId);
      dispatch(signIn());
    }
  }, []);
  const defaultSignIn = (id) => {
    axios({
      url: "/user/getUserInfo",
      method: "POST",
      headers: { userId: parseInt(id) },
    }).then((res) => {
      const data = res.data;
      const id = data.id;
      sessionStorage.setItem("userId", id);
      dispatch(setUserInfo(data));
    });
  };
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
