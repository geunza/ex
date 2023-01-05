import styles from "scss/components/App.module.scss";
import "scss/reset.scss";
import "scss/global.scss";
import { useState } from "react";
import {
  signIn,
  setSupportInfoDefault,
  setUserInfo,
  setSupportItemReady,
} from "redux/store";
import AppRouter from "components/Router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import {
  setSupportItem,
  setCompanyInfo,
  setSupportInfoModal,
  setIsMobile,
} from "redux/store";
import { useMediaQuery } from "react-responsive";
function App() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: "1023px" });
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportInfo = useSelector((state) => state.supportInfo);
  const userCompany = useSelector((state) => state.userCompany);
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
    getFilterData("biz_type_cd"); // 기업형태
    getFilterData("spt_cd"); // 지원분야
    getFilterData("biz_cd"); // 사업분야
    getFilterData("tech_cd"); // 기술분야
    getFilterData("loc_cd"); // 지역
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
      headers: { userId: id },
    }).then((res) => {
      const data = res.data;
      const id = data.id;
      sessionStorage.setItem("userId", id);
      dispatch(setUserInfo(data));
    });
  };
  const getUserCompany = () => {
    axios({
      url: "/user/getCompanyInfo",
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
    }).then((res) => {
      if (res.data == null) return false;
      dispatch(setCompanyInfo(res.data));
    });
  };
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      getUserCompany(userInfo.id);
    }
  }, [userInfo]);
  useEffect(() => {
    let itemContain = 0;
    for (let key in supportItem) {
      if (supportItem[key].length > 0) {
        itemContain++;
      }
    }
    if (Object.keys(userCompany).length > 0 && itemContain >= 7) {
      const itemArr = {
        business_type: "bizp_type_cd",
        company_type: "biz_type_cd",
        start_period: "prd_cd",
        support_type: "spt_cd",
        business_ctg: "biz_cd",
        tech_ctg: "tech_cd",
        loc_ctg: "loc_cd",
      };
      const obj = { ...userCompany };
      for (let key in itemArr) {
        const name = itemArr[key];
        const origin = supportItem[name];
        const arr = obj[key].split(",");
        const newArr = arr.map((v) => {
          return origin.find((x) => x.code == v);
        });
        dispatch(
          setSupportInfoModal({
            name: name,
            datas: newArr,
          })
        );
      }
      // const business_typeArr = obj.business_type.split(",");
      // const business_typeList = business_typeArr;

      // {
      //     "business_type": "02",사업자형태
      //     "company_type": "01,02",기업형태1
      //     "start_period": "10",창업기간
      //     "support_type": "01,02",지원분야
      //     "business_ctg": "01,03",사업분야
      //     "tech_ctg": "01,03,04"기술분야
      //     "loc_ctg": "C82,C032,C033,C042",지역
      // }

      //bizp_type_cd:사업자형태
      //biz_type_cd:기업형태
      //prd_cd:창업기간
      //spt_cd:지원분야
      //biz_cd:사업분야
      //tech_cd:기술분야
      //loc_cd:지역
    }
  }, [userCompany]);
  useEffect(() => {
    if (Object.keys(supportItem).length == 7) {
      dispatch(setSupportItemReady(true));
    }
  }, [supportItem]);
  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile]);
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(
        setSupportInfoDefault({
          bizp_type_cd: {
            name: "사업자형태",
            multiply: false,
            require: true,
            datas: [
              {
                code_nm: "법인사업자",
                code: "03",
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
            require: true,
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
            require: true,
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
            require: false,
            datas: [
              {
                code_nm: "지역무관",
                code: "C82",
                ctg_cd: "loc_cd",
                ctg_nm: "지역",
              },
            ],
          },
        })
      );
    }
  }, [isLoggedIn]);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
