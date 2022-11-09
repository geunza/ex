import React from "react";
import styles from "scss/components/Home/HomeModal.module.scss";

const EventModal = ({ setModalOn, modalOpener, numb, AAA }) => {
  console.log(setModalOn);
  console.log(modalOpener);
  console.log(numb);
  console.log(AAA);
  return (
    <div className={`modalWrap ${styles.EventModal}`}>
      <div className="modalInner">
        <div className={styles.contArea}>
          <div style={{ backgroundColor: "#fff" }}>
            <p>numb : {numb}</p>
            <p>AAA : {AAA}</p>
          </div>
        </div>
        <div className={styles.confirmArea}>
          <button
            type="button"
            name="Modal2"
            className={styles.btnClose}
            value={false}
            onClick={modalOpener}
          >
            닫기
          </button>
          <button type="button" className={styles.btnSubmit}>
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventModal;
