import React, { useState } from "react";
import styles from "scss/components/Home/Event.module.scss";
import { Link } from "react-router-dom";
const Event = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const btnModal = (e) => {
    const {
      target: { value },
    } = e;
  };
  return (
    <>
      <div className={styles.Event}>
        <h4>엑시토 이벤트</h4>
        <ul>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              지원사업 메일링 서비스
            </button>
          </li>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              APP/WEB 제작
            </button>
          </li>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              창업자 네트워킹
            </button>
          </li>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              사업계획서 교육
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Event;
