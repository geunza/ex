import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/components/home/HomeModal.module.scss";
const EventModal = ({ modalOpener, modalTab }) => {
  return (
    <div className={`modalWrap ${styles.EventModal}`}>
      <div className="modalInner">
        <div className={styles.contArea}>
          {modalTab === 0 && (
            <>
              <div className={styles.tab01}>CONT0</div>
            </>
          )}
          {modalTab === 1 && (
            <>
              <div className={styles.tab02}>CONT1</div>
            </>
          )}
          {modalTab === 2 && (
            <>
              <div className={styles.tab03}>CONT2</div>
            </>
          )}
          {modalTab === 3 && (
            <>
              <div className={styles.tab04}>CONT3</div>
            </>
          )}
        </div>
        <div className={`confirmArea ${styles.confirmArea}`}>
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
