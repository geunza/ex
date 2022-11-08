import React from "react";
import styles from "scss/components/Home/LoginArea.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SnsLogin = ({}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <div className={styles.SnsLogin}>
        {isLoggedIn ? (
          <div className={styles.loggedIn}>
            <p>
              <span>주식회사 씨티엔에스 대표님.</span>
              <span>지원 가능한 지원 사업을 찾으시나요?</span>
            </p>
            <Link to="###">기업 정보 입력하고 혜택 받자! &gt;</Link>
            <div className={styles.dibs}>
              <button type="button">찜</button>
              <button type="button">기업정보</button>
            </div>
          </div>
        ) : (
          <div className={styles.noLoggedIn}>
            <h4>
              <span>기업의 성공에 한발짝</span>
              <span>가까워지는 방법!</span>
            </h4>
            <p>1초만에 로그인하기</p>
            <div className={styles.sns}>
              <button type="button" className={styles.btnKakao}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/Home/sns_kakao.png"
                  }
                  alt="Kakao Icon"
                />
                <span>카카오로그인</span>
              </button>
              <button type="button" className={styles.btnApple}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/Home/sns_apple.png"
                  }
                  alt="Apple Icon"
                />
                <span>Apple로그인</span>
              </button>
            </div>
            <div className={styles.dibs}>
              <button type="button" className={styles.btnDib}>
                찜
              </button>
              <button type="button" className={styles.btnCompany}>
                기업정보
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SnsLogin;
