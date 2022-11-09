import React from "react";
import styles from "scss/components/Home/Event.module.scss";
import { Link } from "react-router-dom";
import EventModal from "components/Home/EventModal";
import { useState, useEffect } from "react";
const Event = ({ setModalOn, modalOn, modalOpener, Modal2 }) => {
  const [modalTab, setModalTab] = useState(0);
  const modalTabControl = (e) => {
    const {
      currentTarget: {
        dataset: { tab },
      },
    } = e;
    setModalTab(tab);
  };
  return (
    <>
      <div className={styles.Event}>
        <ul>
          <li>
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={0}
              onClick={(e) => {
                modalTabControl(e);
                modalOpener(e);
              }}
            >
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
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={1}
              onClick={(e) => {
                modalTabControl(e);
                modalOpener(e);
              }}
            >
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
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={2}
              onClick={(e) => {
                modalTabControl(e);
                modalOpener(e);
              }}
            >
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
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={3}
              onClick={(e) => {
                modalTabControl(e);
                modalOpener(e);
              }}
            >
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

      {modalOn && Modal2 ? (
        <EventModal modalOpener={modalOpener} modalTab={parseInt(modalTab)} />
      ) : null}
    </>
  );
};
export default Event;
