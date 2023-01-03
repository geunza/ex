import React, { useState, useEffect } from "react";
import styles from "scss/components/Filter.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSupportItem, setSupportInfo } from "redux/store";
import FilterButton from "components/home/FilterButton";
import { redirect, useNavigate } from "react-router-dom";
import FilterModal from "components/home/FilterModal";
import HomeSupportFilter from "components/HomeSupportFilter";
import { setLoginCheck } from "redux/store";
import { REST_API_KEY, REDIRECT_URI } from "pages/login/KakaoLoginData";
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
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleKakao = () => {
    sessionStorage.setItem("kakaoRedirectPath", window.location.pathname);
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <>
      <div className={styles.Filter}>
        {!isMobile && <h3>맞춤 지원사업 조회</h3>}
        {isMobile && isLoggedIn && (
          <div className={styles.titArea}>
            <h3>{userInfo.usernickname} 대표님</h3>
            <p>지원사업 조건을 설정하시면 맞춤 정보가 제공됩니다.</p>
          </div>
        )}
        {!isMobile ? (
          <div className={styles.custom}>
            <div className={styles.topArea}>
              <HomeSupportFilter styles={styles} />
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
        ) : isLoggedIn ? (
          <div className={styles.custom}>
            <div className={styles.topArea}>
              <HomeSupportFilter styles={styles} />
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
        ) : (
          <div className={styles.noLogin}>
            <p>로그인하시면 맞춤 지원사업을 이용할 수 있어요.</p>
            <div className={styles.sns}>
              <button
                type="button"
                className={styles.btnKakao}
                onClick={handleKakao}
              >
                <img
                  src={require("assets/img/home/sns_kakao.png")}
                  alt="Kakao Icon"
                />
                <span>카카오 로그인</span>
                <img
                  src={require("assets/img/home/sns_kakao.png")}
                  alt="Kakao Icon"
                />
              </button>
              <button type="button" className={styles.btnApple}>
                <img
                  src={require("assets/img/home/sns_apple.png")}
                  alt="Apple Icon"
                />
                <span>Apple 로그인</span>
                <img
                  src={require("assets/img/home/sns_apple.png")}
                  alt="Apple Icon"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Filter;
