import React from "react";
import styles from "scss/components/support/SupportFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo, setSupportInfoModal } from "redux/store";
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";
import { modalOverflow } from "redux/store";
import FilterModal from "components/support/FilterModal";
const SupportFilter = ({ supportInfo }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [supportInfoArr, setSupportInfoArr] = useState([]);
  const [currentModal, setCurrentModal] = useState("지원분야");
  const [modalOn, setModalOn] = useState(false);
  const [dummyInfo, setDummyInfo] = useState({ ...supportInfo });
  const modalControl = (boo, name = "") => {
    setCurrentModal(name);
    setModalOn(boo);
    dispatch(modalOverflow(boo));
  };
  const infoBtnClick = (e, infoName, multiply, order, required) => {
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
    const obj = { ...dummyInfo };
    if (multiply) {
      if (obj[infoName].some((item) => item.text == value)) {
        if (multiply && obj[infoName].length == 1 && required) {
          alert("한가지 이상 선택해주세요.");
        } else {
          obj[infoName] = obj[infoName].filter((item) => item.text != value);
        }
      } else {
        obj[infoName] = [...obj[infoName], { text: value, order: order }].sort(
          (a, b) => a.order - b.order
        );
      }
    } else {
      obj[infoName] = { text: value, order: order };
    }
    setDummyInfo(obj);

    /*
        dispatch(
          setSupportInfo({
            name: infoName,
            value: value,
            multiply: multiply,
            order: order,
          })
        );*/
  };

  const modalClose = () => {
    setDummyInfo({ ...supportInfo });
    modalControl(false);
  };
  const modalSubmit = () => {
    dispatch(setSupportInfoModal({ ...dummyInfo }));
    modalControl(false);
  };
  useEffect(() => {
    let arr = [];
    for (let data in supportInfo) {
      if (data == "사업분야") continue;
      arr.push({
        name: data,
        data: supportInfo[data],
      });
    }
    setSupportInfoArr(arr);
  }, [supportInfo]);
  return (
    <>
      <div className={styles.SupportFilter}>
        <h4>조회 필터 </h4>
        <div className={styles.chkArea}>
          <input type="checkbox" id="chkAll" />
          <label htmlFor="chkAll">전체 지원사업 보기</label>
        </div>
        <div className={styles.filterBox}>
          <ul className={styles.filterList}>
            {supportInfoArr.map((item, idx) => {
              return (
                <li className={styles.filterItem} key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      isLoggedIn
                        ? modalControl(true, item.name)
                        : alert("로그인이 필요합니다.");
                    }}
                  >
                    <div className={styles.itemTit}>
                      <span>{item.name}</span>
                      <div className={styles.arr}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/public_assets/img/global/btn/btn_arr.png"
                          }
                          alt="Select"
                        />
                      </div>
                    </div>
                    <p>
                      {Array.isArray(item.data)
                        ? item.data.length > 1
                          ? `${item.data[0].text} 외 ${item.data.length - 1}건`
                          : item.data.length == 1
                          ? item.data[0].text
                          : "없어용"
                        : item.data.text}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.submitArea}>
            <button type="button">
              <span>조회</span>
            </button>
          </div>
        </div>
      </div>
      {modalOn && (
        <FilterModal
          currentModal={currentModal}
          dummyInfo={dummyInfo}
          infoBtnClick={infoBtnClick}
          modalClose={modalClose}
          modalSubmit={modalSubmit}
        />
      )}
    </>
  );
};
export default SupportFilter;
