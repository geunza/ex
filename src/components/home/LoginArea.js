import React from "react";
import styles from "scss/components/home/LoginArea.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SnsLogin = ({}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.SnsLogin}>
        {isLoggedIn ? (
          <div className={`${styles.loggedIn} ${styles.loginBox}`}>
            <h4>
              <span>{userInfo.usernickname} 대표님.</span>
              <span>지원 가능한 지원 사업을 찾으시나요?</span>
            </h4>
            <button type="button" className={styles.btnSelect}>
              기업 정보 입력하고 혜택 받자! &gt;
            </button>

            <div className={styles.zzim}>
              <button
                type="button"
                className={styles.btnDib}
                onClick={() => {
                  navigate("/saved?cate=save");
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_zzim.png"
                  }
                  alt="Apple Icon"
                />
                <span>찜</span>
              </button>
              <button
                type="button"
                className={styles.btnCompany}
                onClick={() => {
                  navigate("/myPage");
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_setting.png"
                  }
                  alt="Apple Icon"
                />
                <span>기업정보</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={`${styles.noLoggedIn} ${styles.loginBox}`}>
            <h4>
              <span>기업의 성공에 한발짝</span>
              <span>가까워지는 방법!</span>
            </h4>
            <div className={styles.sns}>
              <button type="button" className={styles.btnKakao}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/home/sns_kakao.png"
                  }
                  alt="Kakao Icon"
                />
                <span>카카오로그인</span>
              </button>
              <button type="button" className={styles.btnApple}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/home/sns_apple.png"
                  }
                  alt="Apple Icon"
                />
                <span>Apple로그인</span>
              </button>
            </div>
            <div className={styles.zzim}>
              <button
                type="button"
                className={styles.btnDib}
                onClick={() => {
                  //CHECK :
                  alert("로그인이 필요합니다");
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_zzim.png"
                  }
                  alt="Apple Icon"
                />
                <span>찜</span>
              </button>
              <button
                type="button"
                className={styles.btnCompany}
                onClick={() => {
                  //CHECK :
                  alert("로그인이 필요합니다");
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_setting.png"
                  }
                  alt="Apple Icon"
                />
                <span>기업정보</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SnsLogin;
