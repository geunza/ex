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
        <ul>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/Home/event_01.png"
                }
                alt="지원사업 정기배송"
              />
              <span>지원사업 정기배송</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/Home/event_02.png"
                }
                alt="키워드 정기배송"
              />
              <span>키워드 정기배송</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/Home/event_03.png"
                }
                alt="창업자 네트워킹"
              />
              <span>창업자 네트워킹</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={btnModal} value="modal_01">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/Home/event_04.png"
                }
                alt="사업계획서 교육"
              />
              <span>사업계획서 교육</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Event;
