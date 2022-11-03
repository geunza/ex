import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "scss/components/Home/HomeModal.module.scss";
const EventModal = ({ modalOpener }) => {
  return (
    <div className={`modalWrap ${styles.FilterModal}`}>
      <div className="modalInner">
        <div className={styles.contArea}></div>
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
