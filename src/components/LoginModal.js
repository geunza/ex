import React from "react";
import { useDispatch } from "react-redux";
import styles from "scss/components/Modal.module.scss";
import { modalOverflow, setLoginCheck } from "redux/store";
import { useEffect } from "react";
import { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } from "pages/login/LoginData";
import AppleLoginBtn from "pages/login/AppleLoginBtn";
const LoginModal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(modalOverflow(true));
    return () => {
      dispatch(modalOverflow(false));
    };
  }, []);
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const handleKakao = () => {
    sessionStorage.setItem("kakaoRedirectPath", window.location.pathname);
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalInner} style={{ maxWidth: "500px" }}>
        <div className={styles.LoginModal}>
          <div className={styles.modalTop}>
            <div className={styles.tit}>
              <p>로그인이 필요한 서비스입니다.</p>
            </div>
            <button
              type="button"
              value={false}
              className={styles.btn_close}
              onClick={() => {
                dispatch(setLoginCheck(false));
              }}
            >
              <img
                priority="true"
                src={require("assets/img/global/btn/btn_close_black.png")}
                alt="닫기"
              />
            </button>
          </div>
          <div className={styles.modalCont}>
            <div className={styles.imgArea}>
              <img
                src={require("assets/img/global/ico/ico_login.png")}
                alt="로그인하기"
              />
              <p>
                <span>1초</span>만에 로그인하기
              </p>
            </div>
            <div className={styles.loginRoute}>
              <div className={styles.sns}>
                <button
                  type="button"
                  className="btnLogin btnKakaoLogin"
                  onClick={handleKakao}
                >
                  <img
                    src={require("assets/img/global/ico/ico_kakao.png")}
                    alt="kakao icon"
                  />
                  <span>Kakao로 로그인</span>
                </button>
                <AppleLoginBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;
