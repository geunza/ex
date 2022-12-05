import React from "react";
import styles from "scss/components/Modal.module.scss";

const MyPageModal = () => {
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalInner} style={{ maxWidth: "500px" }}>
        <div className={styles.communityModal}>
          <div className={styles.modalTop}>
            <div className={styles.tit}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_alarm.png"
                }
                alt="알림설정"
              />
              <p>알림설정</p>
            </div>
            <button
              type="button"
              value={false}
              onClick={() => {}}
              className={styles.btn_close}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/btn/btn_close_black.png"
                }
                alt="닫기"
              />
            </button>
          </div>
          <div className={styles.modalCont}>
            <p className={styles.subTit}>
              <span>마케팅 정보 수신동의 및 Push알림을 설정할 수 있어요.</span>
            </p>
            <ul className={styles.blockedList}></ul>
            <div className={styles.btns}></div>
          </div>
          <div className={styles.modalSubmit}>
            <button type="button" onClick={() => {}}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPageModal;
