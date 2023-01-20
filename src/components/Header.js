import React, { useCallback, useState } from "react";
import styles from "scss/components/Header.module.scss";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  signOut,
  setUserInfo,
  removeUserInfo,
  setLoginCheck,
} from "redux/store";
import axios from "axios";
import { useEffect } from "react";

import {
  KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URI,
  KAKAO_LOGOUT_REDIRECT_URI,
} from "pages/login/LoginData";
import SearchForm from "components/SearchForm";
const Header = () => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const handleLogin = () => {
    dispatch(setLoginCheck(true));
    // axios({
    //   url: process.env.REACT_APP_API_RESOURCE + "/user/getUserInfo",
    //   method: "POST",
    //   // headers: { userId: "2300105629" },
    //   headers: { userId: userInfo.id },
    // }).then((res) => {
    //   const data = res.data;
    //   const id = data.id;
    //   sessionStorage.setItem("userId", id);
    //   dispatch(setUserInfo(data));
    //   dispatch(signIn(data));
    // });
  };
  const temporarysignOut = () => {
    dispatch(removeUserInfo());
    dispatch(signOut());
  };

  const handleLogout = () => {
    sessionStorage.setItem("kakaoRedirectPath", window.location.pathname);
    const oAuthType = sessionStorage.getItem("oAuthType");
    if (window.confirm("로그아웃 하시겠습니까?")) {
      if (oAuthType == "kakao") {
        //카카오
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_REST_API_KEY}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}`;
      } else if (oAuthType == "apple") {
        temporarysignOut();
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className={styles.Header}>
        <h1 className={styles.headerLogo}>
          <Link to="/">
            <img src={require("assets/img/LOGO.png")} alt="EXITO LOGO" />
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link
                to="/saved?cate=save"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    dispatch(setLoginCheck(true));
                    return false;
                  }
                  navigate(e.currentTarget.getAttribute("to"));
                }}
              >
                찜
              </Link>
            </li>
            <li>
              <Link to="/support/supportList">지원사업</Link>
            </li>
            <li>
              <Link to="/community/communityList">커뮤니티</Link>
            </li>
            <li>
              <Link to="/notice/noticeList">공지사항</Link>
            </li>
          </ul>
        </nav>
        {isMobile && (
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
        )}
        {!isMobile ? (
          <SearchForm styles={styles} />
        ) : (
          mobileSearchOpen && (
            <SearchForm
              styles={styles}
              setMobileSearchOpen={setMobileSearchOpen}
            />
          )
        )}

        <div className={styles.loginArea}>
          {isLoggedIn ? (
            <>
              <Link to="/myPage">
                {isMobile ? (
                  <img
                    src={require("assets/img/global/ico/ico_user_black.png")}
                    alt="myPage"
                    className={styles.myPageImg}
                  />
                ) : (
                  <img
                    src={require("assets/img/global/ico/ico_user.png")}
                    alt="myPage"
                    className={styles.myPageImg}
                  />
                )}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.btnLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className={styles.btnLogIn}>
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
