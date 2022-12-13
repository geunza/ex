import React from "react";
import { useDispatch } from "react-redux";
import styles from "scss/components/Modal.module.scss";
import { setLoginCheck } from "redux/store";
const LoginModal = () => {
  const dispatch = useDispatch();
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
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/btn/btn_close_black.png"
                }
                alt="닫기"
              />
            </button>
          </div>
          <div className={styles.modalCont}>
            <p className={styles.subTit}>1초만에 로그인하기</p>
            <div className={styles.loginRoute}>
              <div className={styles.sns}>
                <button type="button" className={styles.btnKakao}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/home/sns_kakao.png"
                    }
                    alt="Kakao Icon"
                  />
                  <span>Kakao</span>
                </button>
                <button type="button" className={styles.btnApple}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/home/sns_apple.png"
                    }
                    alt="Apple Icon"
                  />
                  <span>Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;
