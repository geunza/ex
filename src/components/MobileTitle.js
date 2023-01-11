import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "scss/components/MobileTitle.module.scss";
import SearchForm from "components/SearchForm";
import {
  signIn,
  signOut,
  setUserInfo,
  removeUserInfo,
  setLoginCheck,
} from "redux/store";
import {
  KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URI,
  KAKAO_LOGOUT_REDIRECT_URI,
} from "pages/login/LoginData";
import { useEffect } from "react";
const MobileTitle = ({ title, title2, link }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const isMobile = useSelector((state) => state.isMobile);
  const isTitle2 = title2 ?? false;
  const isLink = link ?? false;
  const dispatch = useDispatch();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const handleLogin = () => {
    dispatch(setLoginCheck(true));
  };
  const handleLogout = () => {
    sessionStorage.setItem("kakaoRedirectPath", window.location.pathname);
    if (window.confirm("로그아웃 하시겠습니까?")) {
      if (userInfo.id.length == 10) {
        //카카오
        const token = localStorage.getItem("kakaoToken");
        console.log(token);
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_REST_API_KEY}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}`;
      }
    }
  };
  return (
    isMobile && (
      <>
        <div className={styles.MobileTitle}>
          <button
            className={styles.btnBack}
            onClick={() => {
              isLink == false ? navigate(-1) : navigate(isLink);
            }}
          >
            <img
              src={require("assets/img/global/btn/btn_back_mobile.png")}
              alt="Back"
            />
          </button>
          <h3>{title ?? "TITLE"}</h3>
          <button
            className={styles.btnMobileSearch}
            onClick={() => {
              setMobileSearchOpen((prev) => !prev);
            }}
          >
            <img
              src={require("assets/img/global/ico/ico_search_black.png")}
              alt="모바일 서치폼 오픈"
            />
          </button>
          <div className={styles.loginArea}>
            {isLoggedIn ? (
              <Link to="/myPage">
                <img
                  src={require("assets/img/global/ico/ico_user_black.png")}
                  alt="myPage"
                  className={styles.myPageImg}
                />
              </Link>
            ) : (
              <>
                <button onClick={handleLogin} className={styles.btnLogIn}>
                  로그인
                </button>
              </>
            )}
          </div>
          {mobileSearchOpen && (
            <SearchForm
              styles={styles}
              setMobileSearchOpen={setMobileSearchOpen}
            />
          )}
        </div>
        {isTitle2 && <div className={styles.mobileSubTitle}>{title2}</div>}
      </>
    )
  );
};
export default MobileTitle;
