import React from "react";
import styles from "scss/pages/Home.module.scss";
import { Link } from "react-router-dom";
import EventModal from "components/home/EventModal";
import { useState, useEffect } from "react";
import { setLoginCheck } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
const Event = ({ setModalOn, modalOn, modalOpener, Modal2 }) => {
  const [modalTab, setModalTab] = useState(0);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                modalTabControl(e);
                modalOpener(e);
              }}
            >
              <img
                src={require("assets/img/home/event_01.png")}
                alt="지원사업 정기배송"
              />
              <span>
                <mark>지원사업</mark> <mark>정기배송</mark>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={1}
              onClick={(e) => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                modalTabControl(e);
                modalOpener(e);
              }}
            >
              <img
                src={require("assets/img/home/event_02.png")}
                alt="키워드 알림"
              />
              <span>
                <mark>키워드</mark> <mark>알림</mark>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={2}
              onClick={(e) => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                modalTabControl(e);
                modalOpener(e);
              }}
            >
              <img
                src={require("assets/img/home/event_03.png")}
                alt="창업자 네트워킹"
              />
              <span>
                <mark>창업자</mark> <mark>네트워킹</mark>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              name="Modal2"
              value={true}
              data-tab={3}
              onClick={(e) => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                modalTabControl(e);
                modalOpener(e);
              }}
            >
              <img
                src={require("assets/img/home/event_04.png")}
                alt="사업계획서 교육"
              />
              <span>
                <mark>사업계획서</mark> <mark>교육</mark>
              </span>
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
