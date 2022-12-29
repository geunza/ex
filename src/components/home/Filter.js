import React, { useState, useEffect } from "react";
import styles from "scss/components/Filter.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSupportItem, setSupportInfo } from "redux/store";
import FilterButton from "components/home/FilterButton";
import { redirect, useNavigate } from "react-router-dom";
import FilterModal from "components/home/FilterModal";
import SupportFilter from "components/SupportFilter";
import { setLoginCheck } from "redux/store";
const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const supportInfo = useSelector((state) => state.supportInfo);
  const userInfo = useSelector((state) => state.userInfo);
  const companySubmit = () => {
    // dispatch(loadingStart());
    let paramUrl = "";
    const obj = {
      startPeriod: supportInfo.prd_cd.datas.map((v) => v.code).toString(), //창업기간 prd_cd
      locCtg: supportInfo.loc_cd.datas.map((v) => v.code).toString(), // 지역 loc_cd
      companyType: supportInfo.biz_type_cd.datas.map((v) => v.code).toString(), //기업형태 biz_type_cd
      businessType: supportInfo.bizp_type_cd.datas
        .map((v) => v.code)
        .toString(), //사업자형태 bizp_type_cd
      supportType: supportInfo.spt_cd.datas.map((v) => v.code).toString(), //지원분야 spt_cd
      businessCtg: supportInfo.biz_cd.datas.map((v) => v.code).toString(), //사업분야 biz_cd
      techCtg: supportInfo.tech_cd.datas.map((v) => v.code).toString(), //기술분야 tech_cd
    };
    for (let key in obj) {
      if (obj[key] == "" || obj[key] == undefined || obj[key] == null) {
        continue;
      }
      paramUrl += `${key}=${obj[key]}&`;
    }
    axios({
      url: "/user/updateCompanyInfo?" + paramUrl,
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
    }).then((res) => {
      // dispatch(loadingEnd());
      navigate("/support/supportList");
    });
  };
  return (
    <>
      <div className={styles.Filter}>
        {!isMobile && <h3>맞춤 지원사업 조회</h3>}
        {isMobile && (
          <div className={styles.titArea}>
            {isLoggedIn && <h3>{userInfo.usernickname} 대표님</h3>}
            <p>지원사업 조건을 설정하시면 맞춤 정보가 제공됩니다.</p>
          </div>
        )}
        <div className={styles.custom}>
          <div className={styles.topArea}>
            <SupportFilter styles={styles} />
          </div>
          <div className={styles.bottomArea}>
            <button
              name="login"
              onClick={() => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                companySubmit();
              }}
            >
              {!isLoggedIn
                ? isMobile
                  ? "저장 후 지원사업 조회"
                  : "로그인하고 맞춤 지원사업 조회하기"
                : "맞춤 지원사업 조회하기"}
            </button>
            {!isLoggedIn && (
              <button
                name="noLogin"
                onClick={() => {
                  navigate("/support/supportList");
                }}
              >
                비회원으로 조회하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
